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

export const KOREAN_CONTENT: { [categoryName: string]: CategoryContent; } = {
    basics: {
        words: [
            { word: "저", translation: "أنا (رسمي)", pronunciation: "jeo", emoji: "👤" },
            { word: "나", translation: "أنا (غير رسمي)", pronunciation: "na", emoji: "👤" },
            { word: "당신", translation: "أنت", pronunciation: "dangsin", emoji: "👥" },
            { word: "그", translation: "هو", pronunciation: "geu", emoji: "👨" },
            { word: "그녀", translation: "هي", pronunciation: "geunyeo", emoji: "👩" },
            { word: "네", translation: "نعم", pronunciation: "ne", emoji: "👍" },
            { word: "아니요", translation: "لا", pronunciation: "aniyo", emoji: "👎" },
            { word: "감사합니다", translation: "شكراً", pronunciation: "gamsahamnida", emoji: "😊" },
            { word: "죄송합니다", translation: "آسف", pronunciation: "joesonghamnida", emoji: "😔" },
            { word: "뭐", translation: "ماذا", pronunciation: "mwo", emoji: "❓" },
            { word: "어디", translation: "أين", pronunciation: "eodi", emoji: "📍" },
            { word: "왜", translation: "لماذا", pronunciation: "wae", emoji: "🤔" },
        ],
        readingExercises: [
            readingExercise("나와 당신", "ضمائر", "أنا وأنت", ["هو وهي", "هم ونحن", "هذا وذاك"]),
            readingExercise("감사합니다", "عبارة شكر", "شكراً", ["آسف", "من فضلك", "مرحباً"])
        ],
        listeningExercises: [
            listeningExercise("감사합니다", "تُستخدم للتعبير عن الامتنان.", ["안녕하세요", "죄송합니다", "안녕히 가세요"]),
            listeningExercise("뭐", "كلمة استفهام تعني 'ماذا'.", ["어디", "누구", "왜"])
        ]
    },
    greetings: {
        words: [
            { word: "안녕하세요", translation: "مرحباً", pronunciation: "annyeonghaseyo", emoji: "👋" },
            { word: "좋은 아침입니다", translation: "صباح الخير", pronunciation: "joeun achimimnida", emoji: "☀️" },
            { word: "안녕히 주무세요", translation: "تصبح على خير", pronunciation: "annyeonghi jumuseyo", emoji: "🌙" },
            { word: "안녕히 가세요", translation: "مع السلامة (لمن يغادر)", pronunciation: "annyeonghi gaseyo", emoji: "👋" },
            { word: "안녕히 계세요", translation: "مع السلامة (لمن يبقى)", pronunciation: "annyeonghi gyeseyo", emoji: "👋" },
            { word: "잘 지내세요?", translation: "كيف حالك؟", pronunciation: "jal jinaeseyo?", emoji: "❓" },
            { word: "잘 지내요", translation: "أنا بخير", pronunciation: "jal jinaeyo", emoji: "😊" },
            { word: "이름이 뭐예요?", translation: "ما اسمك؟", pronunciation: "ireumi mwoyeyo?", emoji: "❓" },
            { word: "제 이름은...", translation: "اسمي هو...", pronunciation: "je ireumeun...", emoji: "🏷️" },
            { word: "만나서 반갑습니다", translation: "سررت بلقائك", pronunciation: "mannaseo bangapseumnida", emoji: "🤝" },
        ],
        readingExercises: [
            readingExercise("잘 지내세요? 잘 지내요.", "سؤال عن الحال وإجابته", "كيف حالك؟ أنا بخير.", ["ما اسمك؟ اسمي...", "صباح الخير. مساء الخير.", "شكراً. عفواً."]),
            readingExercise("안녕하세요, 이름이 뭐예요?", "تحية وسؤال عن الاسم", "مرحباً، ما اسمك؟", ["تصبح على خير، أراك غداً.", "كيف حالك ومن أين أنت؟", "مع السلامة."])
        ],
        listeningExercises: [
            listeningExercise("안녕하세요", "التحية الأكثر شيوعاً.", ["안녕히 가세요", "감사합니다", "잘 지내요"]),
            listeningExercise("안녕히 가세요", "تقال عند المغادرة.", ["안녕하세요", "좋은 아침입니다", "만나서 반갑습니다"])
        ]
    },
};

export const KOREAN_GAMES: GamesCollection = {
    games: []
};