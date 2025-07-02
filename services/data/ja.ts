import { CategoryContent, GamesCollection, ReadingExercise, ListeningExercise } from '../../types';

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => 0.5 - Math.random());

const readingExercise = (sentence: string, hint: string, correctAnswer: string, otherOptions: string[]): ReadingExercise => ({
    sentence,
    hint,
    correctAnswer,
    options: shuffle([correctAnswer, ...otherOptions]),
});

const listeningExercise = (audioWord: string, hint: string, otherOptions: string[]): ListeningExercise => ({
    audioWord,
    hint,
    correctAnswer: audioWord,
    options: shuffle([audioWord, ...otherOptions]),
});

export const JAPANESE_CONTENT: { [categoryName: string]: CategoryContent; } = {
    basics: {
        words: [
            { word: "私", translation: "أنا", pronunciation: "watashi", emoji: "👤" },
            { word: "あなた", translation: "أنت", pronunciation: "anata", emoji: "👥" },
            { word: "彼", translation: "هو", pronunciation: "kare", emoji: "👨" },
            { word: "彼女", translation: "هي", pronunciation: "kanojo", emoji: "👩" },
            { word: "はい", translation: "نعم", pronunciation: "hai", emoji: "👍" },
            { word: "いいえ", translation: "لا", pronunciation: "iie", emoji: "👎" },
            { word: "ありがとう", translation: "شكراً", pronunciation: "arigatō", emoji: "😊" },
            { word: "すみません", translation: "آسف / اعذرني", pronunciation: "sumimasen", emoji: "😔" },
            { word: "何", translation: "ماذا", pronunciation: "nani", emoji: "❓" },
            { word: "どこ", translation: "أين", pronunciation: "doko", emoji: "📍" },
            { word: "なぜ", translation: "لماذا", pronunciation: "naze", emoji: "🤔" },
            { word: "と", translation: "و", pronunciation: "to", emoji: "&" },
        ],
        readingExercises: [
            readingExercise("私とあなた", "ضمائر", "أنا وأنت", ["هو وهي", "هم ونحن", "هذا وذاك"]),
            readingExercise("ありがとう", "عبارة شكر", "شكراً", ["آسف", "من فضلك", "مرحباً"])
        ],
        listeningExercises: [
            listeningExercise("ありがとう", "تُستخدم للتعبير عن الامتنان.", ["こんにちは", "すみません", "さようなら"]),
            listeningExercise("何", "كلمة استفهام تعني 'ماذا'.", ["どこ", "誰", "なぜ"])
        ]
    },
    greetings: {
        words: [
            { word: "こんにちは", translation: "مرحباً", pronunciation: "konnichiwa", emoji: "👋" },
            { word: "おはようございます", translation: "صباح الخير", pronunciation: "ohayō gozaimasu", emoji: "☀️" },
            { word: "こんばんは", translation: "مساء الخير", pronunciation: "konbanwa", emoji: "🌃" },
            { word: "おやすみなさい", translation: "تصبح على خير", pronunciation: "oyasuminasai", emoji: "🌙" },
            { word: "さようなら", translation: "مع السلامة", pronunciation: "sayōnara", emoji: "👋" },
            { word: "お元気ですか？", translation: "كيف حالك؟", pronunciation: "ogenki desu ka?", emoji: "❓" },
            { word: "元気です", translation: "أنا بخير", pronunciation: "genki desu", emoji: "😊" },
            { word: "お名前は何ですか？", translation: "ما اسمك؟", pronunciation: "onamae wa nan desu ka?", emoji: "❓" },
            { word: "私の名前は...", translation: "اسمي هو...", pronunciation: "watashi no namae wa...", emoji: "🏷️" },
            { word: "はじめまして", translation: "سررت بلقائك", pronunciation: "hajimemashite", emoji: "🤝" },
        ],
        readingExercises: [
            readingExercise("お元気ですか？元気です。", "سؤال عن الحال وإجابته", "كيف حالك؟ أنا بخير.", ["ما اسمك؟ اسمي...", "صباح الخير. مساء الخير.", "شكراً. عفواً."]),
            readingExercise("おはようございます、お名前は何ですか？", "تحية وسؤال عن الاسم", "صباح الخير، ما اسمك؟", ["تصبح على خير، أراك غداً.", "كيف حالك ومن أين أنت؟", "مع السلامة."])
        ],
        listeningExercises: [
            listeningExercise("こんにちは", "التحية الأكثر شيوعاً.", ["さようなら", "ありがとう", "おやすみなさい"]),
            listeningExercise("さようなら", "تقال عند المغادرة.", ["こんにちは", "おはようございます", "元気です"])
        ]
    },
};

export const JAPANESE_GAMES: GamesCollection = {
    games: []
};