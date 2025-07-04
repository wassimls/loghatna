import { GoogleGenAI, Content } from "@google/genai";
import { GamesCollection, ChatMessage } from '../types';

// The API key is sourced from environment variables, as per security best practices.
// The hosting environment (e.g., Vercel, Netlify, or a custom server) should be configured
// with the `API_KEY` environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const GEMINI_MODEL = 'gemini-2.5-flash-preview-04-17';

/**
 * Parses a JSON string from the model response, handling potential markdown code fences.
 * @param jsonString The raw string from the API.
 * @returns The parsed JSON object, or null if parsing fails.
 */
const parseJsonResponse = <T>(jsonString: string): T | null => {
    let processedString = jsonString.trim();
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = processedString.match(fenceRegex);
    if (match && match[2]) {
        processedString = match[2].trim();
    }

    try {
        // A simple cleanup for trailing commas which can invalidate JSON.
        const validJsonString = processedString.replace(/,\s*([}\]])/g, "$1");
        return JSON.parse(validJsonString) as T;
    } catch (e) {
        console.error("Failed to parse JSON response:", e);
        console.error("Original string:", jsonString);
        return null;
    }
};


export const generateGamesForLanguage = async (language: string): Promise<GamesCollection | null> => {
    const systemInstruction = `You are a creative game designer. Your response MUST be a single, valid, minified JSON object with a 'games' key for an Arabic-speaking audience. All titles and descriptions must be in Arabic. Adhere strictly to JSON format rules.`;
    const userPrompt = `
        Generate a collection of TWO DIFFERENT mini-games for learning "${language}".
        Randomly choose two different game types from this list: 'match', 'missing_word', 'sentence_scramble'.
        The final output MUST be a single JSON object with a "games" key.
        Example Structures:
        - For 'match': { "type": "match", "title": "لعبة المطابقة", "description": "طابق الكلمة بترجمتها الصحيحة.", "items": [ { "id": "...", "word": "...", "translation": "..." }, ... ] }
        - For 'missing_word': { "type": "missing_word", "title": "أكمل الجملة", "description": "اختر الكلمة الصحيحة لإكمال الجملة.", "sentence": "... {blank} ...", "correctWord": "...", "options": ["...", "...", "..."] }
        - For 'sentence_scramble': { "type": "sentence_scramble", "title": "رتب الجملة", "description": "رتب الكلمات لتكوين جملة صحيحة.", "words": ["...", "...", "..."], "correctSentence": "..." }
        Guidelines:
        - Create exactly TWO different games.
        - "match" game: 4 word pairs. 'word' in ${language}, 'translation' in Arabic.
        - "missing_word" game: A simple sentence in ${language} with '{blank}'. Provide 'correctWord' and 3 other 'options' in ${language}.
        - "sentence_scramble" game: Shuffled words for a simple sentence in ${language} and the 'correctSentence'.
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
        throw new Error("حدث خطأ أثناء توليد الألعاب. تحقق من إعدادات مفتاح API الخاص بك.");
    }
};

export async function* streamChatResponse(history: ChatMessage[], systemInstruction: string): AsyncGenerator<string> {
    
    // Map the simple ChatMessage array to the Gemini Content array format.
    const contents: Content[] = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));

    try {
        const responseStream = await ai.models.generateContentStream({
            model: GEMINI_MODEL,
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            },
        });

        for await (const chunk of responseStream) {
            // In streaming, we get text directly from the chunk.
            if (chunk.text) {
                yield chunk.text;
            }
        }
    } catch(error) {
        console.error("Error streaming chat response from Gemini:", error);
         if (error instanceof Error) {
           throw new Error(`حدث خطأ أثناء الدردشة مع الذكاء الاصطناعي: ${error.message}`);
        }
        throw new Error("حدث خطأ غير معروف أثناء الدردشة.");
    }
}

export const translateText = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
    const systemInstruction = `You are an expert translator. Provide ONLY the direct translation of the user's text, with no extra commentary, explanations, or quotation marks.`;
    const userPrompt = `Translate the following text from ${sourceLang} to ${targetLang}:\n\n"${text}"`;

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: userPrompt,
            config: {
                systemInstruction
            }
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