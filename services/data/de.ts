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

export const GERMAN_CONTENT: { [categoryName: string]: CategoryContent; } = {
    alphabet: {
        words: [
            { word: "a", translation: "آ", pronunciation: "a", emoji: "🚗" },
            { word: "b", translation: "ب", pronunciation: "be", emoji: "🎈" },
            { word: "c", translation: "تسيه", pronunciation: "tse", emoji: "💻" },
            { word: "d", translation: "د", pronunciation: "de", emoji: "🇩🇪" },
            { word: "e", translation: "إيه", pronunciation: "e", emoji: "🐘" },
            { word: "f", translation: "ف", pronunciation: "ef", emoji: "🐟" },
            { word: "g", translation: "گ", pronunciation: "ge", emoji: "🎸" },
            { word: "h", translation: "هـ", pronunciation: "ha", emoji: "🏠" },
            { word: "i", translation: "إي", pronunciation: "i", emoji: "🏝️" },
            { word: "j", translation: "يوت", pronunciation: "yot", emoji: "🧥" },
            { word: "k", translation: "ك", pronunciation: "ka", emoji: "👑" },
            { word: "l", translation: "ل", pronunciation: "el", emoji: "🦁" },
            { word: "m", translation: "م", pronunciation: "em", emoji: "🐭" },
            { word: "n", translation: "ن", pronunciation: "en", emoji: "👃" },
            { word: "o", translation: "أو", pronunciation: "o", emoji: "🍊" },
            { word: "p", translation: "پ", pronunciation: "pe", emoji: "🐧" },
            { word: "q", translation: "كو", pronunciation: "ku", emoji: "🤔" },
            { word: "r", translation: "ر", pronunciation: "er", emoji: "🤖" },
            { word: "s", translation: "س", pronunciation: "es", emoji: "☀️" },
            { word: "t", translation: "ت", pronunciation: "te", emoji: "🐢" },
            { word: "u", translation: "أو (مضمومة)", pronunciation: "u", emoji: "🚇" },
            { word: "v", translation: "فاو", pronunciation: "fau", emoji: "🐦" },
            { word: "w", translation: "ڤيه", pronunciation: "ve", emoji: "💧" },
            { word: "x", translation: "إكس", pronunciation: "iks", emoji: " xylophone" },
            { word: "y", translation: "إبسيلون", pronunciation: "üpsilon", emoji: "🧘" },
            { word: "z", translation: "تست", pronunciation: "tset", emoji: "🦓" },
            { word: "ä", translation: "إيه (مفتوحة)", pronunciation: "A-Umlaut", emoji: "👩‍⚕️" },
            { word: "ö", translation: "أو (مرققة)", pronunciation: "O-Umlaut", emoji: "🪔" },
            { word: "ü", translation: "أو (مرققة مضمومة)", pronunciation: "U-Umlaut", emoji: "🚪" },
            { word: "ß", translation: "إس تسيت", pronunciation: "Eszett", emoji: "🛣️" },
        ],
        readingExercises: [
            readingExercise("Das ist ein Apfel.", "مثال على حرف 'a'", "هذه تفاحة.", ["هذا كتاب.", "هذا قط.", "هذه سيارة."]),
            readingExercise("Die Straße ist groß.", "لاحظ حرف 'ß'", "الشارع كبير.", ["المنزل صغير.", "الطقس جميل.", "أنا أقرأ كتاباً."])
        ],
        listeningExercises: [
            listeningExercise("e", "الحرف المستخدم في كلمة 'Elefant' (فيل)", ["a", "i", "o"]),
            listeningExercise("ü", "الحرف المستخدم في كلمة 'Tür' (باب)", ["u", "ö", "ä"])
        ]
    },
    basics: {
        words: [
            { word: "Ich", translation: "أنا", pronunciation: "إيش", emoji: "👤" },
            { word: "Du", translation: "أنت (غير رسمي)", pronunciation: "دو", emoji: "👥" },
            { word: "Er/Sie/Es", translation: "هو/هي/هو (محايد)", pronunciation: "إر/زي/إس", emoji: "🧑" },
            { word: "Wir", translation: "نحن", pronunciation: "ڤير", emoji: "👨‍👩‍👧‍👦" },
            { word: "Ihr", translation: "أنتم", pronunciation: "إير", emoji: "👨‍👩‍👧‍👦" },
            { word: "Sie", translation: "هم/حضرتك", pronunciation: "زي", emoji: "👨‍👩‍👧‍👦" },
            { word: "Was", translation: "ماذا", pronunciation: "ڤاس", emoji: "❓" },
            { word: "Wer", translation: "من", pronunciation: "ڤير", emoji: "❓" },
            { word: "Wo", translation: "أين", pronunciation: "ڤو", emoji: "📍" },
            { word: "Wann", translation: "متى", pronunciation: "ڤان", emoji: "⏰" },
            { word: "Warum", translation: "لماذا", pronunciation: "ڤاروم", emoji: "🤔" },
            { word: "Wie", translation: "كيف", pronunciation: "ڤي", emoji: "🤔" },
            { word: "Ja", translation: "نعم", pronunciation: "يا", emoji: "👍" },
            { word: "Nein", translation: "لا", pronunciation: "ناين", emoji: "👎" },
            { word: "Vielleicht", translation: "ربما", pronunciation: "فيللايشت", emoji: "🤷" },
            { word: "Bitte", translation: "من فضلك/عفواً", pronunciation: "بيته", emoji: "🙏" },
            { word: "Danke", translation: "شكراً", pronunciation: "دانكه", emoji: "😊" },
            { word: "Entschuldigung", translation: "آسف/اعذرني", pronunciation: "إنتشولديغونغ", emoji: "😔" },
            { word: "Und", translation: "و", pronunciation: "أوند", emoji: "&" },
            { word: "Aber", translation: "لكن", pronunciation: "آبر", emoji: "↔️" },
            { word: "Oder", translation: "أو", pronunciation: "أودر", emoji: "🤷‍♀️" },
            { word: "Weil", translation: "لأن", pronunciation: "ڤايل", emoji: "👉" },
        ],
        readingExercises: [
            readingExercise("Heute bin ich glücklich, aber es ist sehr kalt.", "ابحث عن ترجمة 'glücklich' و 'kalt'.", "أنا سعيد اليوم، لكن الجو بارد جداً.", ["Er ist traurig, weil es heiß ist.", "Geht es dir gut? Ja, danke.", "Das ist einfach und das ist schwer."]),
            readingExercise("Das große Haus hat einen kleinen Garten.", "ترجم 'großes Haus' و 'kleinen Garten'.", "البيت الكبير له حديقة صغيرة.", ["Die Katze trinkt Milch.", "Kannst du mir helfen?", "Das ist mein Buch."])
        ],
        listeningExercises: [
            listeningExercise("Danke", "كلمة شائعة لإظهار الامتنان.", ["Entschuldigung", "Bitte", "Hallo"]),
            listeningExercise("Guten Morgen", "تحية تقال في الصباح.", ["Gute Nacht", "Tschüss", "Hallo"])
        ]
    },
     greetings: { words: [], readingExercises: [], listeningExercises: [] },
    numbers: { words: [], readingExercises: [], listeningExercises: [] },
    colors: { words: [], readingExercises: [], listeningExercises: [] },
    family: { words: [], readingExercises: [], listeningExercises: [] },
    food: { words: [], readingExercises: [], listeningExercises: [] },
    time: { words: [], readingExercises: [], listeningExercises: [] },
    weather: { words: [], readingExercises: [], listeningExercises: [] },
    home: { words: [], readingExercises: [], listeningExercises: [] },
    shopping: { words: [], readingExercises: [], listeningExercises: [] },
    body: { words: [], readingExercises: [], listeningExercises: [] },
    clothing: { words: [], readingExercises: [], listeningExercises: [] },
    verbs: { words: [], readingExercises: [], listeningExercises: [] },
    adjectives: { words: [], readingExercises: [], listeningExercises: [] },
    places: { words: [], readingExercises: [], listeningExercises: [] },
    nature: { words: [], readingExercises: [], listeningExercises: [] },
    hobbies: { words: [], readingExercises: [], listeningExercises: [] },
    emotions: { words: [], readingExercises: [], listeningExercises: [] },
    work: { words: [], readingExercises: [], listeningExercises: [] },
    travel: { words: [], readingExercises: [], listeningExercises: [] },
};

export const GERMAN_GAMES: GamesCollection = {
    games: [
        {
            type: 'match',
            title: 'Wörter verbinden',
            description: 'Verbinde das deutsche Wort mit seiner arabischen Übersetzung.',
            items: [
                { id: 'de_match_1', word: 'Haus', translation: 'منزل' },
                { id: 'de_match_2', word: 'Katze', translation: 'قطة' },
                { id: 'de_match_3', word: 'Buch', translation: 'كتاب' },
                { id: 'de_match_4', word: 'essen', translation: 'يأكل' },
            ]
        },
        {
            type: 'missing_word',
            title: 'Fehlendes Wort',
            description: 'Wähle das richtige Wort, um den Satz zu vervollständigen.',
            sentence: 'Die Sonne ist {blank} und heiß.',
            correctWord: 'gelb',
            options: ['gelb', 'blau', 'kalt', 'traurig']
        }
    ]
};