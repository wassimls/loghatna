
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
    greetings: {
        words: [
            { word: "Hallo", translation: "مرحباً", pronunciation: "هالو", emoji: "👋" },
            { word: "Guten Morgen", translation: "صباح الخير", pronunciation: "غوتن مورغن", emoji: "☀️" },
            { word: "Guten Tag", translation: "نهارك سعيد", pronunciation: "غوتن تاك", emoji: "🌇" },
            { word: "Guten Abend", translation: "مساء الخير", pronunciation: "غوتن آبند", emoji: "🌃" },
            { word: "Gute Nacht", translation: "تصبح على خير", pronunciation: "غوته ناخت", emoji: "🌙" },
            { word: "Auf Wiedersehen", translation: "إلى اللقاء (رسمي)", pronunciation: "أوف فيدرزين", emoji: "👋" },
            { word: "Tschüss", translation: "وداعاً (غير رسمي)", pronunciation: "تشوس", emoji: "👋" },
            { word: "Wie geht es Ihnen?", translation: "كيف حال حضرتك؟", pronunciation: "ڤي غيت إس إينن؟", emoji: "❓" },
            { word: "Wie geht es dir?", translation: "كيف حالك؟", pronunciation: "ڤي غيت إس دير؟", emoji: "❓" },
            { word: "Mir geht es gut, danke.", translation: "أنا بخير، شكراً.", pronunciation: "مير غيت إس غوت، دانكه", emoji: "😊" },
            { word: "Und Ihnen/dir?", translation: "وحضرتك/وأنت؟", pronunciation: "أوند إينن/دير؟", emoji: "❓" },
            { word: "Wie heißen Sie?", translation: "ما اسم حضرتك؟", pronunciation: "ڤي هايسن زي؟", emoji: "❓" },
            { word: "Ich heiße...", translation: "اسمي هو...", pronunciation: "إيش هايسه...", emoji: "🏷️" },
            { word: "Sehr erfreut", translation: "سررت بلقائك.", pronunciation: "زير إرفرويت", emoji: "🤝" },
            { word: "Willkommen", translation: "أهلاً بك", pronunciation: "ڤيلكومن", emoji: "🎉" },
        ],
        readingExercises: [
            readingExercise("Guten Morgen, wie geht es dir?", "ابحث عن التحية الصباحية والسؤال عن الحال.", "صباح الخير، كيف حالك؟", ["Gute Nacht, bis morgen.", "Wie heißt du und woher kommst du?", "Mir geht es gut, danke."]),
            readingExercise("Wie heißen Sie? Ich heiße Ahmed.", "ابحث عن السؤال عن الاسم والإجابة.", "ما اسم حضرتك؟ اسمي أحمد.", ["Wie geht's? Gut.", "Woher kommst du? Ich komme aus Ägypten.", "Sehr erfreut."])
        ],
        listeningExercises: [
            listeningExercise("Wie heißen Sie?", "سؤال للاستفسار عن اسم الشخص بشكل رسمي.", ["Wie geht es Ihnen?", "Tschüss", "Guten Morgen"]),
            listeningExercise("Auf Wiedersehen", "عبارة وداع رسمية.", ["Danke", "Hallo", "Entschuldigung"])
        ]
    },
    numbers: {
        words: [
            { word: "Null", translation: "صفر", pronunciation: "نول", emoji: "0️⃣" },
            { word: "Eins", translation: "واحد", pronunciation: "آينس", emoji: "1️⃣" },
            { word: "Zwei", translation: "اثنان", pronunciation: "تسڤاي", emoji: "2️⃣" },
            { word: "Drei", translation: "ثلاثة", pronunciation: "دراي", emoji: "3️⃣" },
            { word: "Vier", translation: "أربعة", pronunciation: "فير", emoji: "4️⃣" },
            { word: "Fünf", translation: "خمسة", pronunciation: "فونف", emoji: "5️⃣" },
            { word: "Sechs", translation: "ستة", pronunciation: "زيكس", emoji: "6️⃣" },
            { word: "Sieben", translation: "سبعة", pronunciation: "زيبن", emoji: "7️⃣" },
            { word: "Acht", translation: "ثمانية", pronunciation: "آخت", emoji: "8️⃣" },
            { word: "Neun", translation: "تسعة", pronunciation: "نوين", emoji: "9️⃣" },
            { word: "Zehn", translation: "عشرة", pronunciation: "تسين", emoji: "🔟" },
            { word: "Elf", translation: "أحد عشر", pronunciation: "إلف", emoji: "1️⃣1️⃣" },
            { word: "Zwölf", translation: "اثنا عشر", pronunciation: "تسڤولف", emoji: "1️⃣2️⃣" },
            { word: "Zwanzig", translation: "عشرون", pronunciation: "تسڤانتسিশ", emoji: "2️⃣0️⃣" },
            { word: "Einundzwanzig", translation: "واحد وعشرون", pronunciation: "آين أوند تسڤانتسিশ", emoji: "2️⃣1️⃣" },
            { word: "Dreißig", translation: "ثلاثون", pronunciation: "درايسিশ", emoji: "3️⃣0️⃣" },
            { word: "Hundert", translation: "مئة", pronunciation: "هوندرت", emoji: "💯" },
            { word: "Tausend", translation: "ألف", pronunciation: "تاوزند", emoji: "1️⃣0️⃣0️⃣0️⃣" },
        ],
        readingExercises: [
            readingExercise("Ich habe zwei Hände und zehn Finger.", "ابحث عن الأرقام 2 و 10.", "لدي يدان وعشرة أصابع.", ["Ich habe drei Bücher und fünf Stifte.", "Kannst du von eins bis zehn zählen?", "Er ist acht Jahre alt."]),
            readingExercise("Einundzwanzig ist eine Zahl.", "لاحظ طريقة تركيب الأرقام", "واحد وعشرون هو رقم.", ["لدي عشرون يورو.", "المئة يوم الأولى مهمة.", "واحد زائد اثنين يساوي ثلاثة."])
        ],
        listeningExercises: [
            listeningExercise("Fünf", "الرقم الذي يأتي بعد أربعة.", ["Vier", "Eins", "Zehn"]),
            listeningExercise("Zwanzig", "ضعف الرقم عشرة.", ["Zwölf", "Zwei", "Zehn"])
        ]
    },
     colors: {
        words: [
            { word: "Farbe", translation: "لون", pronunciation: "فاربه", emoji: "🎨" },
            { word: "Rot", translation: "أحمر", pronunciation: "روت", emoji: "🔴" },
            { word: "Grün", translation: "أخضر", pronunciation: "غرون", emoji: "🟢" },
            { word: "Blau", translation: "أزرق", pronunciation: "بلاو", emoji: "🔵" },
            { word: "Gelb", translation: "أصفر", pronunciation: "غيلب", emoji: "🟡" },
            { word: "Schwarz", translation: "أسود", pronunciation: "شفارتس", emoji: "⚫" },
            { word: "Weiß", translation: "أبيض", pronunciation: "فايس", emoji: "⚪" },
            { word: "Orange", translation: "برتقالي", pronunciation: "أورانج", emoji: "🟠" },
            { word: "Lila", translation: "بنفسجي", pronunciation: "ليلا", emoji: "🟣" },
            { word: "Braun", translation: "بني", pronunciation: "براون", emoji: "🟤" },
            { word: "Rosa", translation: "وردي", pronunciation: "روزا", emoji: "🌸" },
            { word: "Grau", translation: "رمادي", pronunciation: "غراو", emoji: "🐘" },
        ],
        readingExercises: [
            readingExercise("Der Himmel ist blau und das Gras ist grün.", "ركز على ترجمة 'blau' و 'grün'.", "السماء زرقاء والعشب أخضر.", ["Der Apfel ist rot und die Banane ist gelb.", "Ich mag Schwarz und Weiß.", "Sein neues Auto ist rot."]),
            readingExercise("Sie hat ein rosa Kleid und weiße Schuhe.", "ابحث عن 'rosa' و 'weiß'.", "لديها فستان وردي وحذاء أبيض.", ["Die Katze ist schwarz und der Hund ist braun.", "Magst du die Farbe Lila?", "Gold und Silber sind Edelmetalle."])
        ],
        listeningExercises: [
            listeningExercise("Rot", "لون الدم أو الفراولة.", ["Blau", "Grün", "Gelb"]),
            listeningExercise("Schwarz", "عكس اللون الأبيض.", ["Weiß", "Blau", "Grau"])
        ]
    },
    family: {
        words: [
            { word: "Familie", translation: "عائلة", pronunciation: "فاميلي", emoji: "👨‍👩‍👧‍👦" },
            { word: "Vater", translation: "أب", pronunciation: "فاتر", emoji: "👨" },
            { word: "Mutter", translation: "أم", pronunciation: "موتر", emoji: "👩" },
            { word: "Eltern", translation: "والدين", pronunciation: "إلترن", emoji: "👨‍👩‍👧" },
            { word: "Sohn", translation: "ابن", pronunciation: "زون", emoji: "👦" },
            { word: "Tochter", translation: "ابنة", pronunciation: "تختر", emoji: "👧" },
            { word: "Kind", translation: "طفل", pronunciation: "كيند", emoji: "👶" },
            { word: "Bruder", translation: "أخ", pronunciation: "برودر", emoji: "👱‍♂️" },
            { word: "Schwester", translation: "أخت", pronunciation: "شفستر", emoji: "👱‍♀️" },
            { word: "Großvater", translation: "جد", pronunciation: "غروس-فاتر", emoji: "👴" },
            { word: "Großmutter", translation: "جدة", pronunciation: "غروس-موتر", emoji: "👵" },
            { word: "Onkel", translation: "عم/خال", pronunciation: "أونكل", emoji: "👨‍" },
            { word: "Tante", translation: "عمة/خالة", pronunciation: "تانته", emoji: "👩‍" },
            { word: "Cousin/Cousine", translation: "ابن/بنت العم/الخال", pronunciation: "كوزان/كوزينه", emoji: "🧑" },
            { word: "Ehemann", translation: "زوج", pronunciation: "إيه-مان", emoji: "🤵" },
            { word: "Ehefrau", translation: "زوجة", pronunciation: "إيه-فراو", emoji: "👰" },
        ],
        readingExercises: [
            readingExercise("Mein Vater und meine Mutter sind meine Eltern.", "ابحث عن ترجمة 'Vater', 'Mutter', و 'Eltern'.", "أبي وأمي هما والديّ.", ["Mein Bruder und meine Schwester spielen zusammen.", "Mein Großvater und meine Großmutter leben in einem großen Haus.", "Das ist mein Sohn und das ist meine Tochter."]),
            readingExercise("Meine Schwester ist jünger als mein Bruder.", "ركز على المقارنة بين 'Schwester' و 'Bruder'.", "أختي أصغر من أخي.", ["Meine Familie ist sehr groß.", "Mein Cousin wohnt in einer anderen Stadt.", "Mein Großvater liest gerne."])
        ],
        listeningExercises: [
            listeningExercise("Bruder", "شقيق ذكر.", ["Schwester", "Vater", "Mutter"]),
            listeningExercise("Mutter", "الكلمة الألمانية التي تعني 'أم'.", ["Vater", "Tochter", "Sohn"])
        ]
    },
    food: {
        words: [
            { word: "Essen", translation: "طعام", pronunciation: "إيسن", emoji: "🍔" },
            { word: "Getränk", translation: "شراب", pronunciation: "غيترينك", emoji: "🥤" },
            { word: "Wasser", translation: "ماء", pronunciation: "ڤاسر", emoji: "💧" },
            { word: "Kaffee", translation: "قهوة", pronunciation: "كافيه", emoji: "☕" },
            { word: "Tee", translation: "شاي", pronunciation: "تيه", emoji: "🍵" },
            { word: "Saft", translation: "عصير", pronunciation: "زافت", emoji: "🧃" },
            { word: "Milch", translation: "حليب", pronunciation: "ميلش", emoji: "🥛" },
            { word: "Brot", translation: "خبز", pronunciation: "بروت", emoji: "🍞" },
            { word: "Käse", translation: "جبن", pronunciation: "كيزه", emoji: "🧀" },
            { word: "Reis", translation: "أرز", pronunciation: "رايس", emoji: "🍚" },
            { word: "Hähnchen", translation: "دجاج", pronunciation: "هينشن", emoji: "🍗" },
            { word: "Fleisch", translation: "لحم", pronunciation: "فلايش", emoji: "🥩" },
            { word: "Fisch", translation: "سمك", pronunciation: "فيش", emoji: "🐟" },
            { word: "Obst", translation: "فاكهة", pronunciation: "أوبست", emoji: "🍎" },
            { word: "Apfel", translation: "تفاحة", pronunciation: "أبفل", emoji: "🍎" },
            { word: "Banane", translation: "موزة", pronunciation: "بنانه", emoji: "🍌" },
            { word: "Orange", translation: "برتقالة", pronunciation: "أورانجه", emoji: "🍊" },
            { word: "Gemüse", translation: "خضروات", pronunciation: "غيموزه", emoji: "🥕" },
            { word: "Karotte", translation: "جزرة", pronunciation: "كاروته", emoji: "🥕" },
            { word: "Kartoffel", translation: "بطاطس", pronunciation: "كارتوفل", emoji: "🥔" },
            { word: "Tomate", translation: "طماطم", pronunciation: "توماته", emoji: "🍅" },
            { word: "Zucker", translation: "سكر", pronunciation: "تسوكر", emoji: "🍬" },
            { word: "Salz", translation: "ملح", pronunciation: "زالتس", emoji: "🧂" },
            { word: "Frühstück", translation: "فطور", pronunciation: "فروشتوك", emoji: "🍳" },
            { word: "Mittagessen", translation: "غداء", pronunciation: "ميتاغ-إسن", emoji: "🍱" },
            { word: "Abendessen", translation: "عشاء", pronunciation: "آبند-إسن", emoji: "🍝" },
        ],
        readingExercises: [
            readingExercise("Ich habe Hunger. Ich möchte Brot und Käse essen.", "ركز على كلمتي 'Brot' و 'Käse'.", "أنا جائع. أريد أن آكل الخبز والجبن.", ["Ich habe Durst. Ich möchte Wasser trinken.", "Das Essen ist sehr lecker.", "Kann ich bitte die Speisekarte haben?"]),
            readingExercise("Zum Frühstück mag ich Kaffee und einen Apfel.", "ابحث عن طعام وشراب الفطور.", "في الفطور، أحب القهوة وتفاحة.", ["Ich esse Reis und Hähnchen zum Mittagessen.", "Das Abendessen ist um sieben Uhr fertig.", "Dieser Saft ist frisch und lecker."])
        ],
        listeningExercises: [
            listeningExercise("Apfel", "نوع من الفاكهة، غالبًا ما يكون أحمر أو أخضر.", ["Orange", "Wasser", "Brot"]),
            listeningExercise("Wasser", "شراب أساسي وشفاف.", ["Milch", "Saft", "Tee"])
        ]
    }
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
