import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { GamesCollection, ChatMessage, PlacementTestQuestion } from '../types.ts';

const getApiKey = (): string | null => {
    // Retrieves the API key from the browser's local storage.
    return localStorage.getItem('gemini_api_key');
};

const getGenAIClient = (): GoogleGenAI => {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("يرجى إعداد مفتاح Gemini API الخاص بك في الإعدادات.");
    }
    // Initializes the GoogleGenAI client with the user-provided key.
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

const handleApiError = (error: unknown, context: string): never => {
    console.error(`Error in ${context}:`, error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            throw new Error(`مفتاح API غير صالح. يرجى التحقق منه في الإعدادات.`);
        }
        if (error.message.includes('400')) {
             throw new Error(`حدث خطأ في الطلب (400). قد يكون هناك مشكلة في البيانات المرسلة. ${error.message}`);
        }
        throw new Error(`حدث خطأ أثناء الاتصال بالذكاء الاصطناعي: ${error.message}`);
    }
    throw new Error(`حدث خطأ غير معروف في ${context}.`);
};


export const generateGamesForLanguage = async (language: string): Promise<GamesCollection | null> => {
    const ai = getGenAIClient();
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
        handleApiError(error, "generateGamesForLanguage");
    }
};

export async function* streamChatResponse(history: ChatMessage[], systemInstruction: string): AsyncGenerator<string> {
    const ai = getGenAIClient();
    
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
            if (error.message.includes('API key not valid')) {
                 throw new Error(`مفتاح API غير صالح. يرجى التحقق منه في الإعدادات.`);
            }
            throw new Error(`حدث خطأ أثناء الدردشة مع الذكاء الاصطناعي: ${error.message}`);
        }
        throw new Error("حدث خطأ غير معروف أثناء الدردشة.");
    }
}

export const translateText = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
    const ai = getGenAIClient();
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
       handleApiError(error, "translateText");
    }
};

export const getPronunciationFeedback = async (
    originalText: string, 
    userTranscript: string, 
    languageName: string
): Promise<{ score: number; feedback: string; }> => {
    const ai = getGenAIClient();
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
        handleApiError(error, "getPronunciationFeedback");
    }
};

export const generateAudioStory = async (
    languageName: string,
    genre: string
): Promise<string | null> => {
    const ai = getGenAIClient();
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
        handleApiError(error, "generateAudioStory");
    }
};


export const generatePlacementTest = async (language: string): Promise<PlacementTestQuestion[] | null> => {
    const ai = getGenAIClient();
    const GEMINI_MODEL = 'gemini-2.5-flash';

    const systemInstruction = `You are an expert language test creator for Arabic-speaking users. Your entire response MUST be a single, valid, minified JSON array of objects that strictly adheres to the provided schema. Do not use markdown.`;
    
    const userPrompt = `...`; // same prompt
    
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
        handleApiError(error, "generatePlacementTest");
    }
};

export const generateVideoScript = async (
    videoId: string,
    languageName: string
): Promise<string[] | null> => {
    const ai = getGenAIClient();
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
        handleApiError(error, "generateVideoScript");
    }
};
