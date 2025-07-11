

import { GeneratedContent, GamesCollection, CategoryId, CategoryContent, Quiz, QuizQuestion, Word } from '../types';
import { CATEGORIES } from '../constants';
import * as openrouterService from './openrouterService';
import { ENGLISH_CONTENT } from './data/en';
import { FRENCH_CONTENT } from './data/fr';
import { SPANISH_CONTENT } from './data/es';
import { ITALIAN_CONTENT } from './data/it';
import { GERMAN_CONTENT } from './data/de';
import { RUSSIAN_CONTENT } from './data/ru';
import { TURKISH_CONTENT } from './data/tr';
import { CHINESE_CONTENT } from './data/zh';
import { JAPANESE_CONTENT } from './data/ja';
import { KOREAN_CONTENT } from './data/ko';

// Helper to shuffle an array
const shuffle = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Map language codes to their static content
const languageContentMap: { [key: string]: { [key: string]: CategoryContent } } = {
    'en-US': ENGLISH_CONTENT,
    'fr-FR': FRENCH_CONTENT,
    'es-ES': SPANISH_CONTENT,
    'it-IT': ITALIAN_CONTENT,
    'de-DE': GERMAN_CONTENT,
    'ru-RU': RUSSIAN_CONTENT,
    'tr-TR': TURKISH_CONTENT,
    'zh-CN': CHINESE_CONTENT,
    'ja-JP': JAPANESE_CONTENT,
    'ko-KR': KOREAN_CONTENT,
};

/**
 * Generates a simple quiz from a list of words.
 * @param words The list of words for the category.
 * @param categoryName The name of the category for the quiz title.
 * @returns A Quiz object.
 */
const generateQuizFromWords = (words: Word[], categoryName: string): Quiz => {
    const shuffledWords = shuffle(words);
    const questions: QuizQuestion[] = [];
    
    // Create up to 2 questions if possible
    const numQuestions = Math.min(2, Math.floor(words.length / 4));
    
    for (let i = 0; i < numQuestions; i++) {
        // Ensure we don't reuse words for questions
        const correctWord = shuffledWords.pop();
        if (!correctWord) continue;

        const otherWords = shuffledWords.filter(w => w.word !== correctWord.word);
        
        if (otherWords.length < 3) continue;

        const wrongOptions = shuffle(otherWords)
            .slice(0, 3)
            .map(w => w.translation);

        const options = shuffle([...wrongOptions, correctWord.translation]);
        
        questions.push({
            questionText: `ما هي ترجمة كلمة "${correctWord.word}"؟`,
            options,
            correctAnswer: correctWord.translation,
        });
    }

    return {
        title: `اختبار سريع: ${categoryName}`,
        questions,
    };
};

/**
 * Gets the learning content for a specific category and language from static files.
 * @param languageCode The BCP 47 code for the language (e.g., "fr-FR").
 * @param categoryId The ID of the category.
 * @returns A GeneratedContent object or null if not found.
 */
export const getCategoryContent = (languageCode: string, categoryId: CategoryId): GeneratedContent | null => {
    const contentPack = languageContentMap[languageCode];
    if (!contentPack) {
        throw new Error(`لا يوجد محتوى ثابت للغة ${languageCode}`);
    }

    const categoryData = contentPack[categoryId];
    if (!categoryData || !categoryData.words || categoryData.words.length === 0) {
        console.warn(`No static content found for language ${languageCode}, category ${categoryId}`);
        return null; // The UI will handle this gracefully.
    }

    const categoryName = CATEGORIES.find(c => c.id === categoryId)?.name || categoryId;

    // Randomly pick one reading and one listening exercise
    const readingExercise = categoryData.readingExercises.length > 0
        ? shuffle(categoryData.readingExercises)[0]
        : { sentence: "Sample sentence for reading.", options: ["خيار ١", "خيار ٢", "خيار ٣", "خيار ٤"], correctAnswer: "خيار ١", hint: "تلميح" };
    
    const listeningExercise = categoryData.listeningExercises.length > 0
        ? shuffle(categoryData.listeningExercises)[0]
        : { audioWord: "Sample", options: ["Sample", "Word", "Test", "Audio"], correctAnswer: "Sample", hint: "تلميح" };

    const quiz = generateQuizFromWords(categoryData.words, categoryName);

    const generatedContent: GeneratedContent = {
        words: categoryData.words,
        readingExercise,
        listeningExercise,
        quiz,
    };
    
    return generatedContent;
};

/**
 * Gets mini-games for a specific language from the AI service.
 * @param language The target language for the games.
 * @param apiKey The OpenRouter API key.
 * @returns A promise that resolves to the games collection.
 */
export const getGames = async (language: string, apiKey: string): Promise<GamesCollection | null> => {
    try {
        const generatedGames = await openrouterService.generateGamesForLanguage(language, apiKey);
        if (generatedGames && generatedGames.games && generatedGames.games.length > 0) {
            return generatedGames;
        }
        throw new Error('فشل الذكاء الاصطناعي في إنشاء ألعاب صالحة. حاول مرة أخرى.');
    } catch (error) {
        console.error('Error fetching games from AI service:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('حدث خطأ غير معروف أثناء جلب الألعاب.');
    }
};