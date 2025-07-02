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

export const CHINESE_CONTENT: { [categoryName: string]: CategoryContent; } = {
    basics: {
        words: [
            { word: "我", translation: "أنا", pronunciation: "wǒ", emoji: "👤" },
            { word: "你", translation: "أنت", pronunciation: "nǐ", emoji: "👥" },
            { word: "他", translation: "هو", pronunciation: "tā", emoji: "👨" },
            { word: "她", translation: "هي", pronunciation: "tā", emoji: "👩" },
            { word: "是", translation: "يكون / نعم", pronunciation: "shì", emoji: "👍" },
            { word: "不", translation: "لا", pronunciation: "bù", emoji: "👎" },
            { word: "谢谢", translation: "شكراً", pronunciation: "xièxie", emoji: "😊" },
            { word: "对不起", translation: "آسف", pronunciation: "duìbuqǐ", emoji: "😔" },
            { word: "什么", translation: "ماذا", pronunciation: "shénme", emoji: "❓" },
            { word: "哪里", translation: "أين", pronunciation: "nǎlǐ", emoji: "📍" },
            { word: "为什么", translation: "لماذا", pronunciation: "wèishénme", emoji: "🤔" },
            { word: "和", translation: "و", pronunciation: "hé", emoji: "&" },
        ],
        readingExercises: [
            readingExercise("你和我", "ضمائر", "أنت وأنا", ["هو وهي", "هم ونحن", "هذا وذاك"]),
            readingExercise("谢谢你", "عبارة شكر", "شكراً لك", ["أنا آسف", "من فضلك", "مرحباً"])
        ],
        listeningExercises: [
            listeningExercise("谢谢", "تُستخدم للتعبير عن الامتنان.", ["你好", "对不起", "再见"]),
            listeningExercise("什么", "كلمة استفهام تعني 'ماذا'.", ["哪里", "谁", "为什么"])
        ]
    },
    greetings: {
        words: [
            { word: "你好", translation: "مرحباً", pronunciation: "nǐ hǎo", emoji: "👋" },
            { word: "早上好", translation: "صباح الخير", pronunciation: "zǎoshang hǎo", emoji: "☀️" },
            { word: "晚上好", translation: "مساء الخير", pronunciation: "wǎnshang hǎo", emoji: "🌃" },
            { word: "晚安", translation: "تصبح على خير", pronunciation: "wǎn'ān", emoji: "🌙" },
            { word: "再见", translation: "مع السلامة", pronunciation: "zàijiàn", emoji: "👋" },
            { word: "你好吗？", translation: "كيف حالك؟", pronunciation: "nǐ hǎo ma?", emoji: "❓" },
            { word: "我很好", translation: "أنا بخير", pronunciation: "wǒ hěn hǎo", emoji: "😊" },
            { word: "你叫什么名字？", translation: "ما اسمك؟", pronunciation: "nǐ jiào shénme míngzì?", emoji: "❓" },
            { word: "我叫...", translation: "اسمي هو...", pronunciation: "wǒ jiào...", emoji: "🏷️" },
            { word: "很高兴认识你", translation: "سررت بلقائك", pronunciation: "hěn gāoxìng rènshi nǐ", emoji: "🤝" },
        ],
        readingExercises: [
            readingExercise("你好吗？我很好。", "سؤال عن الحال وإجابته", "كيف حالك؟ أنا بخير.", ["ما اسمك؟ اسمي...", "صباح الخير. مساء الخير.", "شكراً. عفواً."]),
            readingExercise("早上好，你叫什么名字？", "تحية وسؤال عن الاسم", "صباح الخير، ما اسمك؟", ["تصبح على خير، أراك غداً.", "كيف حالك ومن أين أنت؟", "مع السلامة."])
        ],
        listeningExercises: [
            listeningExercise("你好", "التحية الأكثر شيوعاً.", ["再见", "谢谢", "晚安"]),
            listeningExercise("再见", "تقال عند المغادرة.", ["你好", "早上好", "我很好"])
        ]
    },
};

export const CHINESE_GAMES: GamesCollection = {
    games: []
};