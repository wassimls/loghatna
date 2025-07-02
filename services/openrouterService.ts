import { GamesCollection, ChatMessage } from '../types';

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = 'qwen/qwen3-14b:free';

const commonHeaders = (apiKey: string) => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
    "HTTP-Referer": `https://loghatna.app`, // Replace with your site URL
    "X-Title": `Loghatna`, // Replace with your site name
});

export const generateGamesForLanguage = async (apiKey: string, language: string): Promise<GamesCollection | null> => {
    if (!apiKey) throw new Error("مفتاح OpenRouter API غير موجود. يرجى إضافته في الإعدادات.");
    
    const system_prompt = `You are a creative game designer. Your response MUST be a single, valid, minified JSON object with a 'games' key for an Arabic-speaking audience. All titles and descriptions must be in Arabic. Adhere strictly to JSON format rules.`;
    const user_prompt = `Generate a collection of TWO DIFFERENT mini-games for learning "${language}". Randomly choose two different game types from this list: 'match', 'missing_word', 'sentence_scramble'. The final output MUST be a single JSON object with a "games" key. Example Structures: - For 'match': { "type": "match", "title": "لعبة المطابقة", "description": "طابق الكلمة بترجمتها الصحيحة.", "items": [ { "id": "...", "word": "...", "translation": "..." }, ... ] } - For 'missing_word': { "type": "missing_word", "title": "أكمل الجملة", "description": "اختر الكلمة الصحيحة لإكمال الجملة.", "sentence": "... {blank} ...", "correctWord": "...", "options": ["...", "...", "..."] } - For 'sentence_scramble': { "type": "sentence_scramble", "title": "رتب الجملة", "description": "رتب الكلمات لتكوين جملة صحيحة.", "words": ["...", "...", "..."], "correctSentence": "..." } Guidelines: - Create exactly TWO different games. - "match" game: 4 word pairs. 'word' in ${language}, 'translation' in Arabic. - "missing_word" game: A simple sentence in ${language} with '{blank}'. Provide 'correctWord' and 3 other 'options' in ${language}. - "sentence_scramble" game: Shuffled words for a simple sentence in ${language} and the 'correctSentence'.`;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: commonHeaders(apiKey),
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: "system", content: system_prompt },
                    { role: "user", content: user_prompt }
                ],
                response_format: { type: "json_object" }
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const content = data.choices[0].message.content;
        
        return JSON.parse(content) as GamesCollection;

    } catch (error) {
        console.error("Error generating games with OpenRouter:", error);
        if (error instanceof Error) {
            throw new Error(`حدث خطأ أثناء الاتصال بـ OpenRouter: ${error.message}`);
        }
        throw new Error("حدث خطأ أثناء توليد الألعاب.");
    }
};

export async function* streamChatResponse(apiKey: string, history: ChatMessage[], systemInstruction: string): AsyncGenerator<string> {
    if (!apiKey) throw new Error("مفتاح OpenRouter API غير موجود. يرجى إضافته في الإعدادات.");

    // Map the history from {role, text} to the API-expected {role, content}
    const apiHistory = history.map(msg => ({
        role: msg.role,
        content: msg.text
    }));

    const messages = [{ role: "system", content: systemInstruction }, ...apiHistory];

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: commonHeaders(apiKey),
            body: JSON.stringify({
                model: MODEL,
                messages,
                stream: true,
            }),
        });
        
        if (!response.ok || !response.body) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const dataStr = line.substring(6);
                    if (dataStr === '[DONE]') {
                        return;
                    }
                    try {
                        const data = JSON.parse(dataStr);
                        const content = data.choices[0]?.delta?.content;
                        if (content) {
                            yield content;
                        }
                    } catch (e) {
                        console.error('Error parsing stream data:', e, "Original line:", line);
                    }
                }
            }
        }

    } catch(error) {
        console.error("Error streaming chat response from OpenRouter:", error);
         if (error instanceof Error) {
           throw new Error(`حدث خطأ أثناء الدردشة مع OpenRouter: ${error.message}`);
        }
        throw new Error("حدث خطأ غير معروف أثناء الدردشة.");
    }
}

export const translateText = async (apiKey: string, text: string, sourceLang: string, targetLang: string): Promise<string> => {
    if (!apiKey) throw new Error("مفتاح OpenRouter API غير موجود. يرجى إضافته في الإعدادات.");

    const system_prompt = `You are an expert translator. Provide ONLY the direct translation of the user's text, with no extra commentary, explanations, or quotation marks.`;
    const user_prompt = `Translate the following text from ${sourceLang} to ${targetLang}:\n\n"${text}"`;
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: commonHeaders(apiKey),
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: "system", content: system_prompt },
                    { role: "user", content: user_prompt }
                ]
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error(`Error translating text with OpenRouter:`, error);
        if (error instanceof Error) {
           throw new Error(`حدث خطأ أثناء الترجمة: ${error.message}`);
        }
        throw new Error("حدث خطأ غير معروف أثناء الترجمة.");
    }
};