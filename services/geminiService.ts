
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { GamesCollection, ChatMessage, PlacementTestQuestion } from '../types.ts';

// State for round-robin key selection.
// In a client-side context, this state persists for the duration of the user's session in the browser tab.
let keyIndex = 0;

/**
 * Selects an API key from a comma-separated list in environment variables
 * using a round-robin strategy and initializes a Gemini client.
 * @returns {GoogleGenAI} An initialized GoogleGenAI client instance.
 */
const getAiClient = (): GoogleGenAI => {
    // 1. Get API keys from environment variables.
    const geminiApiKeys = process.env.API_KEY!;
    if (!geminiApiKeys) {
        throw new Error('لم يتم العثور على متغير بيئة مفتاح API. الرجاء التأكد من تكوينه.');
    }
    
    // 2. Split the string into an array of keys, trimming whitespace and removing empty entries.
    const keys = geminiApiKeys.split(',').map(k => k.trim()).filter(Boolean);
    if (keys.length === 0) {
        throw new Error('لم يتم العثور على مفاتيح API صالحة في متغير البيئة.');
    }

    // 3. Select an API key using a round-robin strategy.
    const apiKey = keys[keyIndex];
    keyIndex = (keyIndex + 1) % keys.length; // Move to the next key for the subsequent call.

    // 4. Initialize and return the Gemini AI client with the selected key.
    return new GoogleGenAI({ apiKey });
};


/**
 * Parses a JSON string from the model response, handling potential markdown code fences.
 * @param jsonString The raw string from the API.
 * @returns The parsed JSON object, or null if parsing fails.
 */
const parseJsonResponse = <T>(jsonString: string): T | null => {
    let processedString = jsonString.trim();
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = processedString.match(fenceRegex);

    if (match && match.length > 1) {
        processedString = match[1].trim();
    }

    try {
        return JSON.parse(processedString) as T;
    } catch (e) {
        console.error("Failed to parse JSON response:", e);
        console.error("Original string:", jsonString);
        return null;
    }
};

export const generateGamesForLanguage = async (language: string): Promise<GamesCollection | null> => {
    const ai = getAiClient(); // Get a client for this request
    const GEMINI_MODEL = 'gemini-2.5-flash';

    const systemInstruction = `You are a creative game designer. Your response MUST be a single, valid, minified JSON object with a 'games' key for an Arabic-speaking audience. All titles and descriptions must be in Arabic. Adhere strictly to JSON format rules.`;
    const userPrompt = `
        Generate a collection of THREE DIFFERENT mini-games for learning "${language}".
        Randomly choose three different game types from this list: 'match', 'missing_word', 'sentence_scramble', 'quiz'.
        The final output MUST be a single JSON object with a "games" key.
        Example Structures:
        - For 'match': { "type": "match", "title": "لعبة المطابقة", "description": "طابق الكلمة بترجمتها الصحيحة.", "items": [ { "id": "...", "word": "...", "translation": "..." }, ... ] }
        - For 'missing_word': { "type": "missing_word", "title": "أكمل الجملة", "description": "اختر الكلمة الصحيحة لإكمال الجملة.", "sentence": "... {blank} ...", "correctWord": "...", "options": ["...", "...", "..."] }
        - For 'sentence_scramble': { "type": "sentence_scramble", "title": "رتب الجملة", "description": "رتب الكلمات لتكوين جملة صحيحة.", "words": ["...", "...", "..."], "correctSentence": "..." }
        - For 'quiz': { "type": "quiz", "title": "اختبار سريع", "description": "اختر الإجابة الصحيحة على السؤال.", "question": "...", "options": ["...", "...", "..."], "correctAnswer": "..." }
        Guidelines:
        - Create exactly THREE different games.
        - "match" game: 4 word pairs. 'word' in ${language}, 'translation' in Arabic.
        - "missing_word" game: A simple sentence in ${language} with '{blank}'. Provide 'correctWord' and 3 other 'options' in ${language}.
        - "sentence_scramble" game: Shuffled words for a simple sentence in ${language} and the 'correctSentence'.
        - "quiz" game: A vocabulary or simple grammar question for learning ${language}. For example, "ما هي ترجمة كلمة 'House'؟" or "أي من هذه الكلمات هو فعل؟". The 'question' MUST be in Arabic. Provide 4 'options' and one 'correctAnswer' in ${language}.
    `;

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: userPrompt,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
            }
        });
        
        const content = response.text;
        return parseJsonResponse<GamesCollection>(content);
    } catch (error) {
        console.error("Error generating games with Gemini:", error);
        if (error instanceof Error) {
            throw new Error(`حدث خطأ أثناء الاتصال بالذكاء الاصطناعي: ${error.message}`);
        }
        throw new Error("حدث خطأ أثناء توليد الألعاب.");
    }
};

export async function* streamChatResponse(history: ChatMessage[], systemInstruction: string): AsyncGenerator<string> {
    const ai = getAiClient(); // Get a client for this request
    const contents = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));

    try {
        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: { systemInstruction },
        });

        for await (const chunk of responseStream) {
            yield chunk.text;
        }

    } catch (error) {
        console.error("Error streaming chat response from Gemini:", error);
        if (error instanceof Error) {
            throw new Error(`حدث خطأ أثناء الدردشة مع الذكاء الاصطناعي: ${error.message}`);
        }
        throw new Error("حدث خطأ غير معروف أثناء الدردشة.");
    }
}

export const translateText = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
    const ai = getAiClient(); // Get a client for this request
    const GEMINI_MODEL = 'gemini-2.5-flash';

    const systemInstruction = `You are an expert translator. Provide ONLY the direct translation of the user's text, with no extra commentary, explanations, or quotation marks.`;
    const userPrompt = `Translate the following text from ${sourceLang} to ${targetLang}:\n\n"${text}"`;

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: userPrompt,
            config: { systemInstruction }
        });
        
        return response.text.trim();
    } catch (error) {
        console.error(`Error translating text with Gemini:`, error);
        if (error instanceof Error) {
           throw new Error(`حدث خطأ أثناء الترجمة: ${error.message}`);
        }
        throw new Error("حدث خطأ غير معروف أثناء الترجمة.");
    }
};

export const getPronunciationFeedback = async (
    originalText: string, 
    userTranscript: string, 
    languageName: string
): Promise<{ score: number; feedback: string; }> => {
    const ai = getAiClient(); // Get a client for this request
    const GEMINI_MODEL = 'gemini-2.5-flash';

    const systemInstruction = `You are a language pronunciation coach for an Arabic-speaking user learning ${languageName}.
    Your task is to compare the user's spoken transcription to the original target sentence.
    Provide a score from 0 to 10 based on how closely the transcription matches the target sentence in terms of wording and structure.
    Also, provide a short, encouraging, and constructive feedback in ARABIC, highlighting one or two words to improve, if any.
    If the transcription is perfect, give a score of 10 and positive feedback.
    If the transcription is very different, give a low score and helpful advice.
    Your entire response MUST be a single, valid, minified JSON object matching the provided schema. Do not include markdown fences.`;

    const userPrompt = `
    Target Sentence (${languageName}): "${originalText}"
    User's Transcription: "${userTranscript}"
    `;

    const schema = {
        type: Type.OBJECT,
        properties: {
            score: {
                type: Type.INTEGER,
                description: "A score from 0 (very bad) to 10 (perfect) for pronunciation accuracy based on the transcription."
            },
            feedback: {
                type: Type.STRING,
                description: "Short, encouraging feedback in Arabic. Mention specific words to improve if necessary."
            }
        },
        required: ["score", "feedback"]
    };

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: userPrompt,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: schema,
            }
        });

        const content = response.text;
        const parsedResult = parseJsonResponse<{ score: number; feedback: string; }>(content);

        if (!parsedResult) {
            return { score: 0, feedback: "لم أتمكن من تقييم نطقك. حاول مرة أخرى." };
        }
        
        return parsedResult;

    } catch (error) {
        console.error("Error getting pronunciation feedback from Gemini:", error);
        if (error instanceof Error) {
            throw new Error(`حدث خطأ أثناء تقييم النطق: ${error.message}`);
        }
        throw new Error("حدث خطأ غير معروف أثناء تقييم النطق.");
    }
};

export const generateAudioStory = async (
    languageName: string,
    genre: string
): Promise<string | null> => {
    const ai = getAiClient(); // Get a client for this request
    const GEMINI_MODEL = 'gemini-2.5-flash';

    const systemInstruction = `You are a creative storyteller for language learners who are native Arabic speakers.
    Generate a short, simple story (around 100-150 words) in ${languageName}.
    The story must be easy to understand for a beginner to intermediate learner.
    Use common vocabulary and simple sentence structures.
    Your response MUST ONLY contain the story text. Do not add titles, headings, markdown, or any introductory phrases like "Here is a story:".`;

    const userPrompt = `Please write a story in the "${genre}" genre.`;

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: userPrompt,
            config: { systemInstruction }
        });
        
        const story = response.text.trim();
        if (story && story.split(' ').length > 10) {
            return story;
        }
        return null;
    } catch (error) {
        console.error("Error generating story with Gemini:", error);
        if (error instanceof Error) {
            throw new Error(`حدث خطأ أثناء الاتصال بالذكاء الاصطناعي: ${error.message}`);
        }
        throw new Error("حدث خطأ أثناء توليد القصة.");
    }
};


export const generatePlacementTest = async (language: string): Promise<PlacementTestQuestion[] | null> => {
    const ai = getAiClient(); // Get a client for this request
    const GEMINI_MODEL = 'gemini-2.5-flash';

    const systemInstruction = `You are an expert language test creator for Arabic-speaking users. Your entire response MUST be a single, valid, minified JSON array of objects that strictly adheres to the provided schema. Do not use markdown.`;
    
    const userPrompt = `
        Create a high-quality 10-question placement test for an Arabic-speaking user learning ${language}.
        The questions must be practical and test contextual understanding of vocabulary and grammar, not just simple translation.
        
        CRITICAL INSTRUCTIONS:
        1. The "questionText" MUST be in ARABIC. It should provide context or a scenario. For example, instead of asking for a direct translation of 'book', ask "أي كلمة تعني 'كتاب'؟".
        2. The "options" and "correctAnswer" MUST be in ${language}.
        3. All options must be plausible and grammatically correct possibilities, with only one being the correct answer for the question's context. Avoid joke answers.
        4. The difficulty MUST be mixed and progressive:
            - 3 "easy" questions (A1 level): Focus on basic vocabulary (greetings, colors, common objects) and simple sentence completion. Example: "اختر الكلمة المناسبة لإكمال التحية: 'Good ___!'".
            - 4 "medium" questions (A2 level): Focus on everyday scenarios, basic verb conjugations, and prepositions. Example: "أكمل الجملة: 'I am reading a ___.' باللغة ${language}." with options: book, car, tree, pen.
            - 3 "hard" questions (B1 level): Focus on understanding different tenses, more complex sentence structures, and nuanced vocabulary choices. Example: "أي جملة هي الأنسب لوصف شيء حدث بالأمس وانتهى؟" with options being sentences in ${language} using different past tenses.
    `;
    
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                questionText: { type: Type.STRING, description: 'The question in Arabic.' },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.STRING, description: 'The correct option in the target language.' },
                level: { type: Type.STRING, description: 'Difficulty level: "easy", "medium", or "hard".' }
            },
            required: ['questionText', 'options', 'correctAnswer', 'level']
        }
    };

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: userPrompt,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: schema
            }
        });
        
        const questions = parseJsonResponse<PlacementTestQuestion[]>(response.text);
        if (questions && questions.length === 10 && questions.every(q => q.options.length > 1)) {
            return questions;
        }
        return null;

    } catch (error) {
        console.error("Error generating placement test with Gemini:", error);
        if (error instanceof Error) {
            throw new Error(`حدث خطأ أثناء إنشاء الاختبار: ${error.message}`);
        }
        throw new Error("حدث خطأ غير معروف أثناء إنشاء الاختبار.");
    }
};

export const generateVideoScript = async (
    videoId: string,
    languageName: string
): Promise<string[] | null> => {
    const ai = getAiClient(); // Get a client for this request
    const GEMINI_MODEL = 'gemini-2.5-flash';

    const systemInstruction = `You are a helpful assistant that transcribes YouTube videos for language learners.
    Given a YouTube video ID, provide a simplified transcript of the first 2-3 sentences spoken in the video in ${languageName}.
    Your response MUST be a single, valid, minified JSON array of strings, where each string is a sentence.
    If you cannot get a transcript, return an empty array. Do not use markdown.`;

    const userPrompt = `Generate a simplified script for the YouTube video with ID: ${videoId}`;

    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.STRING,
            description: 'A single sentence from the video transcript.'
        }
    };

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: `Create a plausible, simple 3-sentence script in ${languageName} for a video about daily life. The video ID is just a placeholder.`,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: schema
            }
        });

        const script = parseJsonResponse<string[]>(response.text);
        if (script && script.length > 0) {
            return script;
        }
        return null;

    } catch (error) {
        console.error("Error generating video script with Gemini:", error);
        if (error instanceof Error) {
            throw new Error(`حدث خطأ أثناء إنشاء النص: ${error.message}`);
        }
        throw new Error("حدث خطأ غير معروف أثناء إنشاء النص.");
    }
};
