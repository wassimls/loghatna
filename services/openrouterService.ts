import { GamesCollection, ChatMessage } from '../types';

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "qwen/qwen3-14b:free";

const executeRequest = async (apiKey: string, body: object) => {
    if (!apiKey) {
        throw new Error("مفتاح API الخاص بـ OpenRouter غير متوفر. يرجى إضافته في الإعدادات.");
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://loghatna.info', // Required by OpenRouter free tier
            'X-Title': 'Loghatna', // Required by OpenRouter free tier
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        console.error("OpenRouter API Error:", errorBody);
        const errorMessage = errorBody?.error?.message || `Request failed with status ${response.status}`;
        throw new Error(`خطأ في واجهة برمجة التطبيقات: ${errorMessage}`);
    }

    return response;
};

const parseJsonResponse = <T>(jsonString: string): T | null => {
    let processedString = jsonString.trim();
    if (processedString.startsWith('```json')) {
        processedString = processedString.substring(7, processedString.length - 3).trim();
    } else if (processedString.startsWith('```')) {
        processedString = processedString.substring(3, processedString.length - 3).trim();
    }

    try {
        return JSON.parse(processedString) as T;
    } catch (e) {
        console.error("Failed to parse JSON response:", e, "Original string:", jsonString);
        return null;
    }
};

export const generateGamesForLanguage = async (language: string, apiKey: string): Promise<GamesCollection | null> => {
    const systemPrompt = `You are a creative game designer. Your response MUST be a single, valid, minified JSON object with a 'games' key for an Arabic-speaking audience. All titles and descriptions must be in Arabic. Adhere strictly to JSON format rules.`;
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
        const response = await executeRequest(apiKey, {
            model: MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" },
        });

        const data = await response.json();
        const content = data.choices[0]?.message?.content;
        
        if (!content) {
             throw new Error("لم يتم استلام محتوى من الواجهة البرمجية.");
        }
        
        return parseJsonResponse<GamesCollection>(content);

    } catch (error) {
        console.error("Error generating games with OpenRouter:", error);
        if (error instanceof Error) {
            throw new Error(`حدث خطأ أثناء الاتصال بالذكاء الاصطناعي: ${error.message}`);
        }
        throw new Error("حدث خطأ أثناء توليد الألعاب.");
    }
};

export async function* streamChatResponse(apiKey: string, history: ChatMessage[], systemInstruction: string): AsyncGenerator<string> {
    const messages = [
        { role: "system", content: systemInstruction },
        ...history
    ];
    
    try {
        const response = await executeRequest(apiKey, {
            model: MODEL,
            messages: messages,
            stream: true,
        });

        const reader = response.body!.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            const chunk = decoder.decode(value);
            const lines = chunk.split("\n").filter(line => line.trim().startsWith("data: "));

            for (const line of lines) {
                const jsonStr = line.replace("data: ", "");
                if (jsonStr === "[DONE]") {
                    return;
                }
                try {
                    const parsed = JSON.parse(jsonStr);
                    const delta = parsed.choices[0]?.delta?.content;
                    if (delta) {
                        yield delta;
                    }
                } catch (e) {
                    console.error("Error parsing stream chunk:", e, "Chunk:", jsonStr);
                }
            }
        }
    } catch (error) {
        console.error("Error streaming chat response from OpenRouter:", error);
        if (error instanceof Error) {
           throw new Error(`حدث خطأ أثناء الدردشة مع الذكاء الاصطناعي: ${error.message}`);
        }
        throw new Error("حدث خطأ غير معروف أثناء الدردشة.");
    }
}

export const translateText = async (apiKey: string, text: string, sourceLang: string, targetLang: string): Promise<string> => {
    const systemPrompt = `You are an expert translator. Provide ONLY the direct translation of the user's text, with no extra commentary, explanations, or quotation marks.`;
    const userPrompt = `Translate the following text from ${sourceLang} to ${targetLang}:\n\n"${text}"`;

    try {
        const response = await executeRequest(apiKey, {
            model: MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ]
        });

        const data = await response.json();
        return data.choices[0]?.message?.content.trim() || "فشل في الترجمة.";
    } catch (error) {
        console.error(`Error translating text with OpenRouter:`, error);
        if (error instanceof Error) {
           throw new Error(`حدث خطأ أثناء الترجمة: ${error.message}`);
        }
        throw new Error("حدث خطأ غير معروف أثناء الترجمة.");
    }
};
