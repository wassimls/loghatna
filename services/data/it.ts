

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

export const ITALIAN_CONTENT: { [categoryName: string]: CategoryContent; } = {
    alphabet: {
        words: [
            { word: "a", translation: "آ", pronunciation: "a", emoji: "✈️" },
            { word: "b", translation: "بي", pronunciation: "bi", emoji: "🎈" },
            { word: "c", translation: "تشي", pronunciation: "tʃi", emoji: "🍰" },
            { word: "d", translation: "دي", pronunciation: "di", emoji: "🎲" },
            { word: "e", translation: "إيه", pronunciation: "e", emoji: "🐘" },
            { word: "f", translation: "إفّي", pronunciation: "ˈɛffe", emoji: "🌸" },
            { word: "g", translation: "جي", pronunciation: "dʒi", emoji: "🦒" },
            { word: "h", translation: "آكّا", pronunciation: "(صامت)", emoji: "🏨" },
            { word: "i", translation: "إي", pronunciation: "i", emoji: "🏝️" },
            { word: "l", translation: "إلّي", pronunciation: "ˈɛlle", emoji: "🌙" },
            { word: "m", translation: "إمّي", pronunciation: "ˈɛmme", emoji: "🍎" },
            { word: "n", translation: "إنّي", pronunciation: "ˈɛnne", emoji: "👃" },
            { word: "o", translation: "أو", pronunciation: "o", emoji: "🍊" },
            { word: "p", translation: "پي", pronunciation: "pi", emoji: "🍕" },
            { word: "q", translation: "كو", pronunciation: "ku", emoji: "👑" },
            { word: "r", translation: "إرّي", pronunciation: "ˈɛrre", emoji: "🤖" },
            { word: "s", translation: "إسّي", pronunciation: "ˈɛsse", emoji: "☀️" },
            { word: "t", translation: "تي", pronunciation: "ti", emoji: "🐢" },
            { word: "u", translation: "أو", pronunciation: "u", emoji: "🍇" },
            { word: "v", translation: "ڤو/ڤي", pronunciation: "vu", emoji: "🎻" },
            { word: "z", translation: "دزيتا", pronunciation: "ˈdzɛta", emoji: "🦓" },
        ],
        readingExercises: [
            readingExercise("a come ancona", "حرف الألف في الإيطالية", "a مثل ancona", ["b come bologna", "c come como", "d come domodossola"]),
            readingExercise("z come zara", "حرف الزاي في الإيطالية", "z مثل zara", ["b come bari", "r come roma", "p come pisa"])
        ],
        listeningExercises: [
            listeningExercise("a", "La prima lettera dell'alfabeto.", ["b", "e", "o"]),
            listeningExercise("z", "L'ultima lettera dell'alfabeto.", ["s", "t", "v"])
        ]
    },
    basics: {
        words: [
            { word: "Io", translation: "أنا", pronunciation: "إيو", emoji: "👤" },
            { word: "Tu", translation: "أنت", pronunciation: "تو", emoji: "👥" },
            { word: "Lui/Lei", translation: "هو/هي", pronunciation: "لوي/لي", emoji: "🧑" },
            { word: "Noi", translation: "نحن", pronunciation: "نوي", emoji: "👨‍👩‍👧‍👦" },
            { word: "Voi", translation: "أنتم", pronunciation: "ڤوي", emoji: "👨‍👩‍👧‍👦" },
            { word: "Loro", translation: "هم", pronunciation: "لورو", emoji: "👨‍👩‍👧‍👦" },
            { word: "Cosa", translation: "ماذا", pronunciation: "كوزا", emoji: "❓" },
            { word: "Chi", translation: "من", pronunciation: "كي", emoji: "❓" },
            { word: "Dove", translation: "أين", pronunciation: "دوفي", emoji: "📍" },
            { word: "Quando", translation: "متى", pronunciation: "كواندو", emoji: "⏰" },
            { word: "Perché", translation: "لماذا", pronunciation: "بيركيه", emoji: "🤔" },
            { word: "Come", translation: "كيف", pronunciation: "كوميه", emoji: "🤔" },
            { word: "Sì", translation: "نعم", pronunciation: "سي", emoji: "👍" },
            { word: "No", translation: "لا", pronunciation: "نو", emoji: "👎" },
            { word: "Forse", translation: "ربما", pronunciation: "فورسي", emoji: "🤷" },
            { word: "Per favore", translation: "من فضلك", pronunciation: "بير فافوري", emoji: "🙏" },
            { word: "Grazie", translation: "شكراً", pronunciation: "غراتسييه", emoji: "😊" },
            { word: "Scusa", translation: "آسف/اعذرني", pronunciation: "سكوزا", emoji: "😔" },
            { word: "E", translation: "و", pronunciation: "إيه", emoji: "&" },
            { word: "Ma", translation: "لكن", pronunciation: "ما", emoji: "↔️" },
            { word: "O", translation: "أو", pronunciation: "أو", emoji: "🤷‍♀️" },
        ],
        readingExercises: [
            readingExercise("Io sono felice, ma fa molto freddo.", "ابحث عن ترجمة 'felice' و 'freddo'.", "أنا سعيد، لكن الجو بارد جداً.", ["هو حزين لأن الجو حار.", "هل أنت بخير؟ نعم، شكراً.", "هذا سهل وذلك صعب."]),
            readingExercise("La grande casa ha un piccolo giardino.", "ترجم 'grande casa' و 'piccolo giardino'.", "البيت الكبير له حديقة صغيرة.", ["القطة تشرب الحليب.", "هل يمكنك مساعدتي؟", "هذا كتابي."])
        ],
        listeningExercises: [
            listeningExercise("Grazie", "كلمة شائعة لإظهار الامتنان.", ["Scusa", "Per favore", "Ciao"]),
            listeningExercise("Buongiorno", "تحية تقال في الصباح.", ["Buonanotte", "Arrivederci", "Ciao"])
        ]
    },
    greetings: {
        words: [
            { word: "Ciao", translation: "مرحباً / وداعاً", pronunciation: "تشاو", emoji: "👋" },
            { word: "Buongiorno", translation: "صباح الخير", pronunciation: "بونجورنو", emoji: "☀️" },
            { word: "Buon pomeriggio", translation: "مساء الخير (بعد الظهر)", pronunciation: "بون بوميريدجو", emoji: "🌇" },
            { word: "Buonasera", translation: "مساء الخير", pronunciation: "بوناسيرا", emoji: "🌃" },
            { word: "Buonanotte", translation: "تصبح على خير", pronunciation: "بونانوتيه", emoji: "🌙" },
            { word: "Arrivederci", translation: "إلى اللقاء", pronunciation: "آريڤيديرتشي", emoji: "👋" },
            { word: "A dopo", translation: "أراك لاحقاً", pronunciation: "آ دوبو", emoji: "👀" },
            { word: "Come stai?", translation: "كيف حالك؟", pronunciation: "كوميه ستاي؟", emoji: "❓" },
            { word: "Sto bene, grazie.", translation: "أنا بخير، شكراً.", pronunciation: "ستو بينيه، غراتسييه", emoji: "😊" },
            { word: "E tu?", translation: "وأنت؟", pronunciation: "إيه تو؟", emoji: "❓" },
            { word: "Come ti chiami?", translation: "ما اسمك؟", pronunciation: "كوميه تي كيامي؟", emoji: "❓" },
            { word: "Mi chiamo...", translation: "اسمي هو...", pronunciation: "مي كيامو...", emoji: "🏷️" },
            { word: "Piacere di conoscerti", translation: "سررت بلقائك.", pronunciation: "بياتشيريه دي كونوشيرتي", emoji: "🤝" },
            { word: "Benvenuto", translation: "أهلاً بك", pronunciation: "بينڤينوتو", emoji: "🎉" },
        ],
        readingExercises: [
            readingExercise("Buongiorno, come stai?", "ابحث عن التحية الصباحية والسؤال عن الحال.", "صباح الخير، كيف حالك؟", ["تصبح على خير، أراك غداً.", "ما اسمك ومن أين أنت؟", "أنا بخير، شكراً لك."]),
            readingExercise("Mi chiamo Ahmed. E tu?", "ابحث عن السؤال عن الاسم والإجابة.", "اسمي أحمد. وأنت؟", ["كيف حالك؟ أنا بخير.", "من أين أنت؟ أنا من مصر.", "سررت بلقائك."])
        ],
        listeningExercises: [
            listeningExercise("Come ti chiami?", "سؤال للاستفسار عن اسم الشخص.", ["Come stai?", "Arrivederci", "Buongiorno"]),
            listeningExercise("Piacere", "جزء من عبارة 'سررت بلقائك'.", ["Grazie", "Ciao", "Scusa"])
        ]
    },
    numbers: {
        words: [
            { word: "Zero", translation: "صفر", pronunciation: "دزيرو", emoji: "0️⃣" },
            { word: "Uno", translation: "واحد", pronunciation: "أونو", emoji: "1️⃣" },
            { word: "Due", translation: "اثنان", pronunciation: "دويه", emoji: "2️⃣" },
            { word: "Tre", translation: "ثلاثة", pronunciation: "تريه", emoji: "3️⃣" },
            { word: "Quattro", translation: "أربعة", pronunciation: "كواترو", emoji: "4️⃣" },
            { word: "Cinque", translation: "خمسة", pronunciation: "تشينكويه", emoji: "5️⃣" },
            { word: "Sei", translation: "ستة", pronunciation: "سيي", emoji: "6️⃣" },
            { word: "Sette", translation: "سبعة", pronunciation: "سيتيه", emoji: "7️⃣" },
            { word: "Otto", translation: "ثمانية", pronunciation: "أوتو", emoji: "8️⃣" },
            { word: "Nove", translation: "تسعة", pronunciation: "نوفيه", emoji: "9️⃣" },
            { word: "Dieci", translation: "عشرة", pronunciation: "دييتشي", emoji: "🔟" },
            { word: "Venti", translation: "عشرون", pronunciation: "فينتي", emoji: "2️⃣0️⃣" },
            { word: "Trenta", translation: "ثلاثون", pronunciation: "ترينتا", emoji: "3️⃣0️⃣" },
            { word: "Cento", translation: "مئة", pronunciation: "تشينتو", emoji: "💯" },
            { word: "Mille", translation: "ألف", pronunciation: "ميلليه", emoji: "1️⃣0️⃣0️⃣0️⃣" },
        ],
        readingExercises: [
            readingExercise("Ho due mani e dieci dita.", "ابحث عن الأرقام 2 و 10.", "لدي يدان وعشرة أصابع.", ["لدي ثلاثة كتب وخمسة أقلام.", "هل يمكنك العد من واحد إلى عشرة؟", "هو عمره ثمان سنوات."]),
            readingExercise("Questo costa venti euro.", "ابحث عن الرقم 20.", "هذا يكلف عشرين يورو.", ["لدي خمسون صديقاً.", "المئة يوم الأولى مهمة.", "واحد زائد اثنين يساوي ثلاثة."])
        ],
        listeningExercises: [
            listeningExercise("Cinque", "الرقم الذي يأتي بعد أربعة.", ["Quattro", "Uno", "Dieci"]),
            listeningExercise("Venti", "ضعف الرقم عشرة.", ["Dodici", "Due", "Dieci"])
        ]
    },
    colors: {
        words: [
            { word: "Colore", translation: "لون", pronunciation: "كولوريه", emoji: "🎨" },
            { word: "Rosso", translation: "أحمر", pronunciation: "روسو", emoji: "🔴" },
            { word: "Verde", translation: "أخضر", pronunciation: "فيرديه", emoji: "🟢" },
            { word: "Blu", translation: "أزرق", pronunciation: "بلو", emoji: "🔵" },
            { word: "Giallo", translation: "أصفر", pronunciation: "جاللو", emoji: "🟡" },
            { word: "Nero", translation: "أسود", pronunciation: "نيرو", emoji: "⚫" },
            { word: "Bianco", translation: "أبيض", pronunciation: "بيانكو", emoji: "⚪" },
            { word: "Arancione", translation: "برتقالي", pronunciation: "آرانتشونيه", emoji: "🟠" },
            { word: "Viola", translation: "بنفسجي", pronunciation: "ڤيولا", emoji: "🟣" },
            { word: "Marrone", translation: "بني", pronunciation: "مارونيه", emoji: "🟤" },
            { word: "Rosa", translation: "وردي", pronunciation: "روزا", emoji: "🌸" },
            { word: "Grigio", translation: "رمادي", pronunciation: "غريدجو", emoji: "🐘" },
        ],
        readingExercises: [
            readingExercise("Il cielo è blu e l'erba è verde.", "ركز على ترجمة 'blu' و 'verde'.", "السماء زرقاء والعشب أخضر.", ["التفاحة حمراء والموزة صفراء.", "أحب اللون الأبيض والأسود.", "سيارته الجديدة حمراء."]),
            readingExercise("Ha un vestito rosa e scarpe bianche.", "ابحث عن 'rosa' و 'bianche'.", "لديها فستان وردي وحذاء أبيض.", ["القط أسود والكلب بني.", "هل تحب اللون البنفسجي؟", "الذهب والفضة معادن ثمينة."])
        ],
        listeningExercises: [
            listeningExercise("Rosso", "لون الدم أو الفراولة.", ["Blu", "Verde", "Giallo"]),
            listeningExercise("Nero", "عكس اللون الأبيض.", ["Bianco", "Blu", "Grigio"])
        ]
    },
    family: {
        words: [
            { word: "Famiglia", translation: "عائلة", pronunciation: "فاميليا", emoji: "👨‍👩‍👧‍👦" },
            { word: "Padre", translation: "أب", pronunciation: "بادريه", emoji: "👨" },
            { word: "Madre", translation: "أم", pronunciation: "مادريه", emoji: "👩" },
            { word: "Genitori", translation: "والدين", pronunciation: "جينيتوري", emoji: "👨‍👩‍👧" },
            { word: "Figlio", translation: "ابن", pronunciation: "فيليو", emoji: "👦" },
            { word: "Figlia", translation: "ابنة", pronunciation: "فيليا", emoji: "👧" },
            { word: "Bambino", translation: "طفل", pronunciation: "بامبينو", emoji: "👶" },
            { word: "Fratello", translation: "أخ", pronunciation: "فراتيلو", emoji: "👱‍♂️" },
            { word: "Sorella", translation: "أخت", pronunciation: "سوريلا", emoji: "👱‍♀️" },
            { word: "Nonno", translation: "جد", pronunciation: "نونو", emoji: "👴" },
            { word: "Nonna", translation: "جدة", pronunciation: "نونا", emoji: "👵" },
            { word: "Zio", translation: "عم/خال", pronunciation: "دزيو", emoji: "👨‍" },
            { word: "Zia", translation: "عمة/خالة", pronunciation: "دزيا", emoji: "👩‍" },
            { word: "Cugino/a", translation: "ابن/بنت العم/الخال", pronunciation: "كوجينو/ا", emoji: "🧑" },
            { word: "Marito", translation: "زوج", pronunciation: "ماريتو", emoji: "🤵" },
            { word: "Moglie", translation: "زوجة", pronunciation: "موليه", emoji: "👰" },
        ],
        readingExercises: [
            readingExercise("Mio padre e mia madre sono i miei genitori.", "ابحث عن ترجمة 'padre', 'madre', و 'genitori'.", "أبي وأمي هما والديّ.", ["أخي وأختي يلعبان معاً.", "جدي وجدتي يعيشان في منزل كبير.", "هذا ابني وهذه ابنتي."]),
            readingExercise("Mia sorella è più giovane di mio fratello.", "ركز على المقارنة بين 'sorella' و 'fratello'.", "أختي أصغر من أخي.", ["عائلتي كبيرة جداً.", "ابن عمي يعيش في مدينة أخرى.", "جدي يحب القراءة."])
        ],
        listeningExercises: [
            listeningExercise("Fratello", "شقيق ذكر.", ["Sorella", "Padre", "Madre"]),
            listeningExercise("Madre", "الكلمة الإيطالية التي تعني 'أم'.", ["Padre", "Figlia", "Figlio"])
        ]
    },
    food: {
        words: [
            { word: "Cibo", translation: "طعام", pronunciation: "تشيبو", emoji: "🍔" },
            { word: "Bevanda", translation: "شراب", pronunciation: "بيڤاندا", emoji: "🥤" },
            { word: "Acqua", translation: "ماء", pronunciation: "أكوا", emoji: "💧" },
            { word: "Caffè", translation: "قهوة", pronunciation: "كافيه", emoji: "☕" },
            { word: "Tè", translation: "شاي", pronunciation: "تيه", emoji: "🍵" },
            { word: "Succo", translation: "عصير", pronunciation: "سوكو", emoji: "🧃" },
            { word: "Latte", translation: "حليب", pronunciation: "لاتيه", emoji: "🥛" },
            { word: "Pane", translation: "خبز", pronunciation: "پانيه", emoji: "🍞" },
            { word: "Formaggio", translation: "جبن", pronunciation: "فورمادجو", emoji: "🧀" },
            { word: "Riso", translation: "أرز", pronunciation: "ريزو", emoji: "🍚" },
            { word: "Pollo", translation: "دجاج", pronunciation: "بولو", emoji: "🍗" },
            { word: "Carne", translation: "لحم", pronunciation: "كارنيه", emoji: "🥩" },
            { word: "Pesce", translation: "سمك", pronunciation: "بيشيه", emoji: "🐟" },
            { word: "Frutta", translation: "فاكهة", pronunciation: "فروتا", emoji: "🍎" },
            { word: "Mela", translation: "تفاحة", pronunciation: "ميلا", emoji: "🍎" },
            { word: "Banana", translation: "موزة", pronunciation: "بنانا", emoji: "🍌" },
            { word: "Verdura", translation: "خضروات", pronunciation: "ڤيردورا", emoji: "🥕" },
            { word: "Zucchero", translation: "سكر", pronunciation: "دزوكيرو", emoji: "🍬" },
            { word: "Sale", translation: "ملح", pronunciation: "ساليه", emoji: "🧂" },
            { word: "Colazione", translation: "فطور", pronunciation: "كولاتسيونيه", emoji: "🍳" },
            { word: "Pranzo", translation: "غداء", pronunciation: "براندزو", emoji: "🍱" },
            { word: "Cena", translation: "عشاء", pronunciation: "تشينا", emoji: "🍝" },
        ],
        readingExercises: [
            readingExercise("Ho fame. Voglio mangiare pane e formaggio.", "ركز على كلمتي 'pane' و 'formaggio'.", "أنا جائع. أريد أن آكل الخبز والجبن.", ["أنا عطشان. أريد أن أشرب الماء.", "الطعام لذيذ.", "هل يمكنني الحصول على القائمة من فضلك؟"]),
            readingExercise("A colazione, mi piace il caffè e una mela.", "ابحث عن طعام وشراب الفطور.", "في الفطور، أحب القهوة وتفاحة.", ["أنا آكل الأرز والدجاج على الغداء.", "العشاء جاهز الساعة السابعة.", "هذا العصير طازج ولذيذ."])
        ],
        listeningExercises: [
            listeningExercise("Mela", "نوع من الفاكهة، غالبًا ما يكون أحمر أو أخضر.", ["Arancia", "Acqua", "Pane"]),
            listeningExercise("Acqua", "شراب أساسي وشفاف.", ["Latte", "Succo", "Tè"])
        ]
    },
    time: {
        words: [
            { word: "Tempo", translation: "وقت", pronunciation: "تيمبو", emoji: "⏰" },
            { word: "Ora", translation: "ساعة", pronunciation: "أورا", emoji: "⏳" },
            { word: "Minuto", translation: "دقيقة", pronunciation: "مينوتو", emoji: "⏱️" },
            { word: "Secondo", translation: "ثانية", pronunciation: "سيكوندو", emoji: "⏱️" },
            { word: "Giorno", translation: "يوم", pronunciation: "جورنو", emoji: "📅" },
            { word: "Settimana", translation: "أسبوع", pronunciation: "سيتيمانا", emoji: "🗓️" },
            { word: "Mese", translation: "شهر", pronunciation: "ميزيه", emoji: "🈷️" },
            { word: "Anno", translation: "سنة", pronunciation: "آنو", emoji: "🎉" },
            { word: "Lunedì", translation: "الإثنين", pronunciation: "لونيدي", emoji: " M" },
            { word: "Domenica", translation: "الأحد", pronunciation: "دومينيكا", emoji: "S" },
            { word: "Oggi", translation: "اليوم", pronunciation: "أودجي", emoji: "👇" },
            { word: "Domani", translation: "غداً", pronunciation: "دوماني", emoji: "➡️" },
            { word: "Ieri", translation: "أمس", pronunciation: "ييري", emoji: "⬅️" },
            { word: "Mattina", translation: "صباح", pronunciation: "ماتينا", emoji: "🌅" },
            { word: "Pomeriggio", translation: "بعد الظهر", pronunciation: "بوميريدجو", emoji: "☀️" },
            { word: "Sera", translation: "مساء", pronunciation: "سيرا", emoji: "🌇" },
            { word: "Notte", translation: "ليل", pronunciation: "نوتيه", emoji: "🌃" },
        ],
        readingExercises: [
            readingExercise("Oggi è lunedì, e domani è martedì.", "ترجم 'Oggi', 'lunedì', 'domani'.", "اليوم هو الإثنين، وغداً هو الثلاثاء.", ["أمس كان الأحد.", "لدي اجتماع يوم الجمعة.", "الشهر فيه أربعة أسابيع."]),
            readingExercise("La riunione è alle dieci di mattina.", "ابحث عن الوقت والجزء من اليوم.", "الاجتماع في الساعة العاشرة صباحاً.", ["أراك في المساء.", "انتظر دقيقة من فضلك.", "السنة بها اثنا عشر شهراً."])
        ],
        listeningExercises: [
            listeningExercise("Venerdì", "اليوم الذي يسبق عطلة نهاية الأسبوع.", ["Lunedì", "Domenica", "Settimana"]),
            listeningExercise("Domani", "اليوم الذي يأتي بعد اليوم.", ["Oggi", "Ieri", "Giorno"])
        ]
    },
    weather: {
        words: [
            { word: "Tempo", translation: "الطقس", pronunciation: "تيمبو", emoji: "🌦️" },
            { word: "Sole", translation: "شمس", pronunciation: "سوليه", emoji: "☀️" },
            { word: "Nuvoloso", translation: "غائم", pronunciation: "نوڤولوزو", emoji: "☁️" },
            { word: "Pioggia", translation: "مطر", pronunciation: "بيودجا", emoji: "🌧️" },
            { word: "Vento", translation: "رياح", pronunciation: "ڤينتو", emoji: "💨" },
            { word: "Neve", translation: "ثلج", pronunciation: "نيڤيه", emoji: "❄️" },
            { word: "Caldo", translation: "حار", pronunciation: "كالدو", emoji: "🌡️" },
            { word: "Freddo", translation: "بارد", pronunciation: "فريدو", emoji: "🥶" },
            { word: "Tempesta", translation: "عاصفة", pronunciation: "تيمبيستا", emoji: "⛈️" },
        ],
        readingExercises: [
            readingExercise("Oggi c'è il sole e fa caldo.", "ابحث عن الكلمات التي تصف الشمس والحرارة.", "الجو مشمس وحار اليوم.", ["الجو غائم وبارد.", "غداً ستمطر.", "أنا أحب الطقس المثلج."]),
            readingExercise("In inverno fa freddo e nevica.", "ابحث عن كلمات الشتاء.", "في الشتاء، يكون الجو بارداً ويتساقط الثلج.", ["الرياح قوية اليوم.", "أحضر مظلتك، إنها تمطر.", "الجو ضبابي في الصباح."])
        ],
        listeningExercises: [
            listeningExercise("Pioggia", "عندما يسقط الماء من السماء.", ["Sole", "Nuvola", "Vento"]),
            listeningExercise("Freddo", "عكس كلمة 'حار'.", ["Caldo", "Tiepido", "Fresco"])
        ]
    },
    home: {
        words: [
            { word: "Casa", translation: "منزل/بيت", pronunciation: "كازا", emoji: "🏠" },
            { word: "Appartamento", translation: "شقة", pronunciation: "أبارتامينتو", emoji: "🏢" },
            { word: "Stanza", translation: "غرفة", pronunciation: "ستانتسا", emoji: "🚪" },
            { word: "Camera da letto", translation: "غرفة نوم", pronunciation: "كاميرا دا ليتو", emoji: "🛏️" },
            { word: "Bagno", translation: "حمام", pronunciation: "بانيو", emoji: "🛁" },
            { word: "Cucina", translation: "مطبخ", pronunciation: "كوتشينا", emoji: "🍳" },
            { word: "Soggiorno", translation: "غرفة معيشة", pronunciation: "سودجورنو", emoji: "🛋️" },
            { word: "Porta", translation: "باب", pronunciation: "بورتا", emoji: "🚪" },
            { word: "Finestra", translation: "نافذة", pronunciation: "فينيسترا", emoji: "🪟" },
            { word: "Tavolo", translation: "طاولة", pronunciation: "تاڤولو", emoji: "🪵" },
            { word: "Sedia", translation: "كرسي", pronunciation: "سيديا", emoji: "🪑" },
            { word: "Letto", translation: "سرير", pronunciation: "ليتو", emoji: "🛏️" },
            { word: "Chiave", translation: "مفتاح", pronunciation: "كياڤيه", emoji: "🔑" },
        ],
        readingExercises: [
            readingExercise("La cucina ha un tavolo e una finestra.", "ترجم 'cucina', 'tavolo', و 'finestra'.", "المطبخ به طاولة ونافذة.", ["غرفة النوم بها سرير وباب.", "غرفة المعيشة بها كرسي.", "مفتاح المنزل في الحديقة."]),
            readingExercise("Dormo nella camera da letto.", "ابحث عن مكان النوم.", "أنا أنام في غرفة النوم.", ["نحن نأكل في غرفة الطعام.", "الحمام في نهاية الممر.", "الشقة في الطابق الثالث."])
        ],
        listeningExercises: [
            listeningExercise("Cucina", "المكان الذي نطبخ فيه الطعام.", ["Camera da letto", "Bagno", "Giardino"]),
            listeningExercise("Porta", "تستخدمه للدخول والخروج من غرفة.", ["Finestra", "Tavolo", "Letto"])
        ]
    },
    shopping: {
        words: [
            { word: "Negozio", translation: "متجر", pronunciation: "نيغوتسيو", emoji: "🏬" },
            { word: "Mercato", translation: "سوق", pronunciation: "ميركاتو", emoji: "🛒" },
            { word: "Soldi", translation: "مال", pronunciation: "سولدي", emoji: "💰" },
            { word: "Prezzo", translation: "سعر", pronunciation: "بريتسو", emoji: "💲" },
            { word: "Comprare", translation: "يشتري", pronunciation: "كومبراريه", emoji: "🛍️" },
            { word: "Vendere", translation: "يبيع", pronunciation: "فينديريه", emoji: "🏷️" },
            { word: "Pagare", translation: "يدفع", pronunciation: "باغاريه", emoji: "💳" },
            { word: "Costoso", translation: "غالي", pronunciation: "كوستوزو", emoji: "💎" },
            { word: "Economico", translation: "رخيص", pronunciation: "إيكونوميكو", emoji: "🪙" },
            { word: "Conto", translation: "فاتورة", pronunciation: "كونتو", emoji: "🧾" },
            { word: "Contanti", translation: "نقد", pronunciation: "كونتانتي", emoji: "💵" },
            { word: "Carta di credito", translation: "بطاقة ائتمان", pronunciation: "كارتا دي كريديتو", emoji: "💳" },
        ],
        readingExercises: [
            readingExercise("Quanto costa? Il prezzo è molto costoso.", "ابحث عن السؤال عن السعر ووصفه بأنه 'costoso'.", "كم سعر هذا؟ السعر غالي جداً.", ["أريد شراء هذا من فضلك.", "هل يمكنني الدفع بالبطاقة؟", "هذا المتجر رخيص جداً."]),
            readingExercise("Pago con la carta di credito.", "ابحث عن طريقة الدفع.", "سأدفع ببطاقة الائتمان.", ["هل تقبلون الدفع نقدًا؟", "هذا السوق كبير جدًا.", "الزبون دائمًا على حق."])
        ],
        listeningExercises: [
            listeningExercise("Soldi", "ما تستخدمه للشراء.", ["Prezzo", "Negozio", "Conto"]),
            listeningExercise("Comprare", "فعل الحصول على شيء مقابل المال.", ["Vendere", "Pagare", "Avere"])
        ]
    },
    body: {
        words: [
            { word: "Corpo", translation: "جسم", pronunciation: "كوربو", emoji: "🧍" },
            { word: "Testa", translation: "رأس", pronunciation: "تيستا", emoji: "👤" },
            { word: "Faccia", translation: "وجه", pronunciation: "فاتشا", emoji: "😊" },
            { word: "Occhio", translation: "عين", pronunciation: "أوكيو", emoji: "👁️" },
            { word: "Naso", translation: "أنف", pronunciation: "نازو", emoji: "👃" },
            { word: "Bocca", translation: "فم", pronunciation: "بوكا", emoji: "👄" },
            { word: "Orecchio", translation: "أذن", pronunciation: "أوريكيو", emoji: "👂" },
            { word: "Capelli", translation: "شعر", pronunciation: "كابيللي", emoji: "👱" },
            { word: "Dente", translation: "سن", pronunciation: "دينتيه", emoji: "🦷" },
            { word: "Braccio", translation: "ذراع", pronunciation: "براتشو", emoji: "💪" },
            { word: "Mano", translation: "يد", pronunciation: "مانو", emoji: "✋" },
            { word: "Dito", translation: "إصبع", pronunciation: "ديتو", emoji: "👆" },
            { word: "Gamba", translation: "ساق", pronunciation: "غامبا", emoji: "🦵" },
            { word: "Piede", translation: "قدم", pronunciation: "بييديه", emoji: "🦶" },
            { word: "Cuore", translation: "قلب", pronunciation: "كووريه", emoji: "❤️" },
            { word: "Stomaco", translation: "معدة", pronunciation: "ستوماكو", emoji: "🍔" },
        ],
        readingExercises: [
            readingExercise("Ho due occhi, un naso e una bocca.", "عد أجزاء الوجه المذكورة.", "لدي عينان وأنف واحد وفم واحد.", ["أنا أغسل يدي.", "رأسي يؤلمني.", "هو لديه شعر أسود."]),
            readingExercise("Mi fa male lo stomaco.", "ابحث عن الجزء الذي يؤلم.", "معدتي تؤلمني.", ["قلبي ينبض.", "لدي خمسة أصابع.", "ذراعي قوية."])
        ],
        listeningExercises: [
            listeningExercise("Mano", "الجزء من الجسم الذي به خمسة أصابع.", ["Piede", "Testa", "Occhio"]),
            listeningExercise("Capelli", "ينمو على الرأس.", ["Faccia", "Naso", "Orecchio"])
        ]
    },
    clothing: {
        words: [
            { word: "Vestiti", translation: "ملابس", pronunciation: "فيستيتي", emoji: "👕" },
            { word: "Camicia", translation: "قميص", pronunciation: "كاميتشا", emoji: "👕" },
            { word: "Maglietta", translation: "تي شيرت", pronunciation: "مالييتا", emoji: "👕" },
            { word: "Pantaloni", translation: "بنطال", pronunciation: "بانتالوني", emoji: "👖" },
            { word: "Gonna", translation: "تنورة", pronunciation: "غونا", emoji: "👗" },
            { word: "Giacca", translation: "سترة", pronunciation: "جاكا", emoji: "🧥" },
            { word: "Cappotto", translation: "معطف", pronunciation: "كابوتو", emoji: "🧥" },
            { word: "Scarpe", translation: "حذاء", pronunciation: "سكاربيه", emoji: "👟" },
            { word: "Calzini", translation: "جوارب", pronunciation: "كالتسيني", emoji: "🧦" },
            { word: "Cappello", translation: "قبعة", pronunciation: "كابيلو", emoji: "🧢" },
        ],
        readingExercises: [
            readingExercise("Indosso una camicia blu e pantaloni neri.", "ابحث عن 'camicia' و 'pantaloni' وألوانها.", "أنا أرتدي قميصاً أزرق وبنطالاً أسود.", ["حذائي الجديد لونه أبيض.", "أحتاج شراء سترة للشتاء.", "هذه القبعة جميلة."]),
            readingExercise("In inverno, indosso un cappotto.", "ابحث عن ملابس الشتاء.", "في الشتاء، أرتدي معطفًا.", ["إنها ترتدي تنورة حمراء.", "هل رأيت جواربي؟", "هذا التي شيرت كبير."])
        ],
        listeningExercises: [
            listeningExercise("Scarpe", "ما ترتديه في قدميك.", ["Camicia", "Cappello", "Calzini"]),
            listeningExercise("Giacca", "ترتديه فوق قميصك عندما يكون الجو باردًا.", ["Pantaloni", "Gonna", "Calzini"])
        ]
    },
    verbs: {
        words: [
            { word: "essere", translation: "يكون", pronunciation: "إيسيريه", emoji: "🧘" },
            { word: "avere", translation: "يملك", pronunciation: "أڤيريه", emoji: "🤲" },
            { word: "fare", translation: "يفعل/يصنع", pronunciation: "فاريه", emoji: "💪" },
            { word: "dire", translation: "يقول", pronunciation: "ديريه", emoji: "🗣️" },
            { word: "andare", translation: "يذهب", pronunciation: "أنداريه", emoji: "🚶" },
            { word: "potere", translation: "يستطيع", pronunciation: "بوتيريه", emoji: "🏋️" },
            { word: "volere", translation: "يريد", pronunciation: "ڤوليريه", emoji: "🙋" },
            { word: "sapere", translation: "يعرف", pronunciation: "سإبيريه", emoji: "🧠" },
            { word: "vedere", translation: "يرى", pronunciation: "ڤيديريه", emoji: "👀" },
            { word: "venire", translation: "يأتي", pronunciation: "ڤينيريه", emoji: "👋" },
            { word: "mangiare", translation: "يأكل", pronunciation: "مانجاريه", emoji: "🍔" },
            { word: "bere", translation: "يشرب", pronunciation: "بيريه", emoji: "🥤" },
            { word: "parlare", translation: "يتحدث", pronunciation: "بارلاريه", emoji: "💬" },
            { word: "leggere", translation: "يقرأ", pronunciation: "ليدجيريه", emoji: "📖" },
            { word: "scrivere", translation: "يكتب", pronunciation: "سكريڤيريه", emoji: "✍️" },
        ],
        readingExercises: [
            readingExercise("Devo andare al lavoro, ma voglio restare a casa.", "ابحث عن الأفعال المتناقضة.", "يجب أن أذهب إلى العمل، لكني أريد أن أبقى في المنزل.", ["هو يرى ويسمع كل شيء.", "هل يمكنك مساعدتي؟", "هي تحاول تعلم لغة جديدة."]),
            readingExercise("Lui sa leggere e scrivere in italiano.", "ابحث عن المهارات اللغوية.", "هو يستطيع القراءة والكتابة بالإيطالية.", ["لا تتكلم وتأكل في نفس الوقت.", "سأعود بعد ساعة.", "هم يلعبون ويفوزون."])
        ],
        listeningExercises: [
            listeningExercise("pensare", "يفكر", ["mangiare", "dormire", "parlare"]),
            listeningExercise("amare", "يحب", ["odiare", "avere", "essere"])
        ]
    },
    adjectives: {
        words: [
            { word: "buono", translation: "جيد", pronunciation: "بوونو", emoji: "👍" },
            { word: "cattivo", translation: "سيء", pronunciation: "كاتيڤو", emoji: "👎" },
            { word: "nuovo", translation: "جديد", pronunciation: "نووڤو", emoji: "✨" },
            { word: "vecchio", translation: "قديم/عجوز", pronunciation: "ڤيكيو", emoji: "📜" },
            { word: "grande", translation: "كبير", pronunciation: "غرانديه", emoji: "🐘" },
            { word: "piccolo", translation: "صغير", pronunciation: "بيكولو", emoji: "🐭" },
            { word: "lungo", translation: "طويل", pronunciation: "لونغو", emoji: "📏" },
            { word: "corto", translation: "قصير", pronunciation: "كورتو", emoji: "📏" },
            { word: "caldo", translation: "حار", pronunciation: "كالدو", emoji: "🔥" },
            { word: "freddo", translation: "بارد", pronunciation: "فريدو", emoji: "❄️" },
            { word: "felice", translation: "سعيد", pronunciation: "فيليتشيه", emoji: "😄" },
            { word: "triste", translation: "حزين", pronunciation: "تريستيه", emoji: "😢" },
            { word: "facile", translation: "سهل", pronunciation: "فاتشيليه", emoji: "✅" },
            { word: "difficile", translation: "صعب", pronunciation: "ديفيتشيليه", emoji: "❌" },
            { word: "bello", translation: "جميل", pronunciation: "بيلو", emoji: "😍" },
            { word: "veloce", translation: "سريع", pronunciation: "ڤيلوتشيه", emoji: "🏃" },
            { word: "lento", translation: "بطيء", pronunciation: "لينتو", emoji: "🐢" },
        ],
        readingExercises: [
            readingExercise("La macchina nuova è veloce, ma la macchina vecchia è lenta.", "ابحث عن الصفات المتضادة.", "السيارة الجديدة سريعة، لكن السيارة القديمة بطيئة.", ["هذا الكتاب جيد وذلك سيء.", "هل السؤال سهل أم صعب؟", "الجو حار جدًا اليوم."]),
            readingExercise("Ha una bella voce.", "ابحث عن الصفة الإيجابية.", "لديها صوت جميل.", ["الرجل القوي يساعد الرجل الضعيف.", "الغرفة نظيفة.", "القصة طويلة."])
        ],
        listeningExercises: [
            listeningExercise("importante", "مهم", ["facile", "difficile", "sbagliato"]),
            listeningExercise("felice", "سعيد", ["triste", "arrabbiato", "stanco"])
        ]
    },
    places: {
        words: [
            { word: "Posto", translation: "مكان", pronunciation: "بوستو", emoji: "📍" },
            { word: "Città", translation: "مدينة", pronunciation: "تشيتا", emoji: "🏙️" },
            { word: "Paese", translation: "دولة/بلدة", pronunciation: "بايزيه", emoji: "🇮🇹" },
            { word: "Scuola", translation: "مدرسة", pronunciation: "سكولا", emoji: "🏫" },
            { word: "Ospedale", translation: "مستشفى", pronunciation: "أوسبيداليه", emoji: "🏥" },
            { word: "Ristorante", translation: "مطعم", pronunciation: "ريستورانتيه", emoji: "🍔" },
            { word: "Albergo", translation: "فندق", pronunciation: "ألبيرغو", emoji: "🏨" },
            { word: "Aeroporto", translation: "مطار", pronunciation: "آيروبورتو", emoji: "✈️" },
            { word: "Stazione", translation: "محطة", pronunciation: "ستاتسيونيه", emoji: "🚉" },
            { word: "Parco", translation: "حديقة عامة", pronunciation: "باركو", emoji: "🌳" },
            { word: "Spiaggia", translation: "شاطئ", pronunciation: "سبياجا", emoji: "🏖️" },
            { word: "Banca", translation: "بنك", pronunciation: "بانكا", emoji: "🏦" },
            { word: "Ufficio", translation: "مكتب", pronunciation: "أوفيتشو", emoji: "🏢" },
            { word: "Strada", translation: "شارع", pronunciation: "سترادا", emoji: "🛣️" },
        ],
        readingExercises: [
            readingExercise("Vado a scuola e poi in biblioteca.", "ابحث عن أماكن التعلم.", "أذهب إلى المدرسة ثم إلى المكتبة.", ["المستشفى بجوار البنك.", "هل يوجد مطعم جيد في هذه المدينة؟", "نحن نعيش في شقة."]),
            readingExercise("In estate, ci piace andare in spiaggia.", "ابحث عن أماكن الترفيه الصيفية.", "في الصيف، نحب أن نذهب إلى الشاطئ.", ["المطار بعيد عن وسط المدينة.", "هناك سوق جديد في الشارع.", "الفندق يقع على النهر."])
        ],
        listeningExercises: [
            listeningExercise("Ospedale", "المكان الذي تذهب إليه عندما تكون مريضاً.", ["Scuola", "Albergo", "Banca"]),
            listeningExercise("Città", "مكان كبير به الكثير من الناس والمباني.", ["Paese", "Villaggio", "Fattoria"])
        ]
    },
    nature: {
        words: [
            { word: "Natura", translation: "طبيعة", pronunciation: "ناتورا", emoji: "🏞️" },
            { word: "Albero", translation: "شجرة", pronunciation: "ألبيرو", emoji: "🌳" },
            { word: "Fiore", translation: "زهرة", pronunciation: "فيوريه", emoji: "🌸" },
            { word: "Sole", translation: "شمس", pronunciation: "سوليه", emoji: "☀️" },
            { word: "Luna", translation: "قمر", pronunciation: "لونا", emoji: "🌙" },
            { word: "Stella", translation: "نجمة", pronunciation: "ستيللا", emoji: "⭐" },
            { word: "Cielo", translation: "سماء", pronunciation: "تشيلو", emoji: "☁️" },
            { word: "Acqua", translation: "ماء", pronunciation: "أكوا", emoji: "💧" },
            { word: "Fuoco", translation: "نار", pronunciation: "فووكو", emoji: "🔥" },
            { word: "Montagna", translation: "جبل", pronunciation: "مونتانيا", emoji: "⛰️" },
            { word: "Fiume", translation: "نهر", pronunciation: "فيوميه", emoji: "🏞️" },
            { word: "Mare", translation: "بحر", pronunciation: "ماريه", emoji: "🌊" },
            { word: "Animale", translation: "حيوان", pronunciation: "أنيماليه", emoji: "🐾" },
            { word: "Cane", translation: "كلب", pronunciation: "كانيه", emoji: "🐕" },
            { word: "Gatto", translation: "قطة", pronunciation: "غاتو", emoji: "🐈" },
            { word: "Uccello", translation: "طائر", pronunciation: "أوتشيلو", emoji: "🐦" },
        ],
        readingExercises: [
            readingExercise("Il sole è nel cielo e il pesce è nel mare.", "ابحث عن مكونات السماء والبحر.", "الشمس في السماء، والسمكة في البحر.", ["الجبل عالٍ والنهر طويل.", "الأشجار خضراء في الغابة.", "أحب صوت المطر والرياح."]),
            readingExercise("Un piccolo uccello siede su un grande albero.", "ابحث عن الكائن الصغير والكبير.", "طائر صغير يجلس على شجرة كبيرة.", ["القطة تلعب بالكرة.", "الزهور جميلة في الربيع.", "الصحراء حارة وجافة."])
        ],
        listeningExercises: [
            listeningExercise("Albero", "نبات كبير له جذع وأغصان.", ["Fiore", "Erba", "Montagna"]),
            listeningExercise("Acqua", "سائل شفاف ضروري للحياة.", ["Fuoco", "Aria", "Sabbia"])
        ]
    },
    hobbies: {
        words: [
            { word: "Hobby", translation: "هواية", pronunciation: "أوبي", emoji: "🎨" },
            { word: "Leggere", translation: "قراءة", pronunciation: "ليدجيريه", emoji: "📖" },
            { word: "Ascoltare musica", translation: "الاستماع للموسيقى", pronunciation: "أسكولتاريه موزيكا", emoji: "🎵" },
            { word: "Guardare film", translation: "مشاهدة أفلام", pronunciation: "غوارداره فيلم", emoji: "🎬" },
            { word: "Sport", translation: "رياضة", pronunciation: "سبورت", emoji: "⚽" },
            { word: "Viaggiare", translation: "سفر", pronunciation: "ڤيادجاريه", emoji: "✈️" },
            { word: "Cucinare", translation: "طبخ", pronunciation: "كوتشيناريه", emoji: "🍳" },
            { word: "Giocare", translation: "لعب", pronunciation: "جيوكاريه", emoji: "🎮" },
            { word: "Ballare", translation: "رقص", pronunciation: "بالاريه", emoji: "💃" },
            { word: "Cantare", translation: "غناء", pronunciation: "كانتاريه", emoji: "🎤" },
        ],
        readingExercises: [
            readingExercise("Il mio hobby è leggere e ascoltare musica.", "ابحث عن الهوايات المذكورة.", "هوايتي هي القراءة والاستماع للموسيقى.", ["هو يحب ممارسة الرياضة.", "هل تحب السفر؟", "هي جيدة في الطبخ."]),
            readingExercise("Guardiamo un film questo fine settimana.", "اقتراح نشاط", "سنشاهد فيلما في نهاية الأسبوع.", ["هو يحب لعب ألعاب الكمبيوتر.", "الرقص هواية جيدة.", "أخي يحب الغناء."])
        ],
        listeningExercises: [
            listeningExercise("Sport", "نشاط بدني مثل كرة القدم أو السباحة.", ["Musica", "Film", "Leggere"]),
            listeningExercise("Cucinare", "تحضير الطعام.", ["Viaggiare", "Dipingere", "Cantare"])
        ]
    },
    emotions: {
        words: [
            { word: "Sentimento", translation: "شعور", pronunciation: "سنتيمينتو", emoji: "❤️" },
            { word: "Felice", translation: "سعيد", pronunciation: "فيليتشيه", emoji: "😄" },
            { word: "Triste", translation: "حزين", pronunciation: "تريستيه", emoji: "😢" },
            { word: "Arrabbiato", translation: "غاضب", pronunciation: "آرّابياتو", emoji: "😠" },
            { word: "Stanco", translation: "متعب", pronunciation: "ستانكو", emoji: "😴" },
            { word: "Annoiato", translation: "ملل", pronunciation: "أنوياتو", emoji: "😒" },
            { word: "Emozionato", translation: "متحمس", pronunciation: "إيموتسيوناتو", emoji: "🤩" },
            { word: "Amore", translation: "حب", pronunciation: "آموريه", emoji: "❤️" },
            { word: "Paura", translation: "خوف", pronunciation: "باورا", emoji: "😨" },
        ],
        readingExercises: [
            readingExercise("Sono felice di vederti.", "التعبير عن السعادة", "أنا سعيد لرؤيتك.", ["لماذا أنت غاضب؟", "لا تخف.", "أنا متعب قليلاً."]),
            readingExercise("È triste perché non ha superato l'esame.", "سبب الحزن", "هو حزين لأنه لم ينجح في الامتحان.", ["لا تقلق.", "أنا متحمس للرحلة.", "هذا الفيلم ممل."])
        ],
        listeningExercises: [
            listeningExercise("Felice", "الشعور بالسعادة.", ["Triste", "Arrabbiato", "Stanco"]),
            listeningExercise("Stanco", "عندما تحتاج إلى الراحة.", ["Sveglio", "Affamato", "Assetato"]),
            listeningExercise("Amore", "شعور قوي بالمودة.", ["Odio", "Paura", "Speranza"])
        ]
    },
    work: {
        words: [
            { word: "Lavoro", translation: "عمل", pronunciation: "لاڤورو", emoji: "🏢" },
            { word: "Ufficio", translation: "مكتب", pronunciation: "أوفيتشو", emoji: "🏢" },
            { word: "Azienda", translation: "شركة", pronunciation: "أدزيندا", emoji: "🏭" },
            { word: "Capo", translation: "مدير", pronunciation: "كابو", emoji: "👨‍💼" },
            { word: "Collega", translation: "زميل", pronunciation: "كوليگا", emoji: "👥" },
            { word: "Stipendio", translation: "راتب", pronunciation: "ستيبينديو", emoji: "💵" },
            { word: "Computer", translation: "حاسوب", pronunciation: "كومبيوتر", emoji: "💻" },
            { word: "Progetto", translation: "مشروع", pronunciation: "بروجيتو", emoji: "📈" },
            { word: "Compito", translation: "مهمة", pronunciation: "كومبيتو", emoji: "📋" },
        ],
        readingExercises: [
            readingExercise("Lavoro in un'azienda italiana.", "مكان العمل", "أنا أعمل في شركة إيطالية.", ["المدير في اجتماع.", "راتبي ليس مرتفعاً.", "أنا مشغول هذا الأسبوع."]),
            readingExercise("Per favore, dammi il tuo numero di telefono.", "طلب معلومات الاتصال", "من فضلك أعطني رقم هاتفك.", ["زميلي لطيف جداً.", "لدينا مشروع جديد.", "غداً سآخذ إجازة."])
        ],
        listeningExercises: [
            listeningExercise("Lavoro", "الكلمة العامة للعمل أو الوظيفة.", ["Azienda", "Scuola", "Casa"]),
            listeningExercise("Capo", "الشخص المسؤول في العمل.", ["Collega", "Cliente", "Insegnante"]),
            listeningExercise("Ufficio", "المكان الذي يعمل فيه الموظفون عادة.", ["Cucina", "Parco", "Cinema"])
        ]
    },
    travel: {
        words: [
            { word: "Viaggio", translation: "سفر/رحلة", pronunciation: "ڤيادجو", emoji: "🌍" },
            { word: "Vacanza", translation: "عطلة", pronunciation: "ڤاكانتسا", emoji: "🏖️" },
            { word: "Aeroporto", translation: "مطار", pronunciation: "آيروبورتو", emoji: "✈️" },
            { word: "Aereo", translation: "طائرة", pronunciation: "آيريو", emoji: "✈️" },
            { word: "Passaporto", translation: "جواز سفر", pronunciation: "باسابورتو", emoji: "🛂" },
            { word: "Biglietto", translation: "تذكرة", pronunciation: "بيلييتو", emoji: "🎟️" },
            { word: "Albergo", translation: "فندق", pronunciation: "ألبيرغو", emoji: "🏨" },
            { word: "Treno", translation: "قطار", pronunciation: "ترينو", emoji: "🚆" },
            { word: "Macchina", translation: "سيارة", pronunciation: "ماكينا", emoji: "🚗" },
            { word: "Autobus", translation: "حافلة", pronunciation: "أوتوبوس", emoji: "🚌" },
            { word: "Taxi", translation: "سيارة أجرة", pronunciation: "تاكسي", emoji: "🚕" },
            { word: "Mappa", translation: "خريطة", pronunciation: "مابا", emoji: "🗺️" },
            { word: "Valigia", translation: "حقيبة سفر", pronunciation: "ڤاليجا", emoji: "🧳" },
            { word: "Turista", translation: "سائح", pronunciation: "توريستا", emoji: "📸" },
        ],
        readingExercises: [
            readingExercise("Devo comprare un biglietto del treno per Roma.", "شراء تذكرة", "أحتاج تذكرة قطار إلى روما.", ["أين جواز سفري؟", "لقد حجزت فندقاً.", "المطار بعيد."]),
            readingExercise("Andiamo in vacanza in Sicilia.", "وجهة العطلة", "نحن نقضي عطلتنا في صقلية.", ["هناك الكثير من السياح هنا.", "أمتعتي ثقيلة.", "سآخذ سيارة أجرة."])
        ],
        listeningExercises: [
            listeningExercise("Viaggio", "فعل السفر أو السياحة.", ["Lavoro", "Studio", "Cibo"]),
            listeningExercise("Aereo", "وسيلة نقل تطير في السماء.", ["Treno", "Macchina", "Nave"]),
            listeningExercise("Albergo", "المكان الذي تقيم فيه عند السفر.", ["Casa", "Scuola", "Ospedale"])
        ]
    },
    animals: {
        words: [
            { word: "Animale", translation: "حيوان", pronunciation: "أنيماليه", emoji: "🐾" },
            { word: "Cane", translation: "كلب", pronunciation: "كانيه", emoji: "🐕" },
            { word: "Gatto", translation: "قطة", pronunciation: "غاتو", emoji: "🐈" },
            { word: "Leone", translation: "أسد", pronunciation: "ليونيه", emoji: "🦁" },
            { word: "Tigre", translation: "نمر", pronunciation: "تيغريه", emoji: "🐅" },
            { word: "Elefante", translation: "فيل", pronunciation: "إليفانتيه", emoji: "🐘" },
            { word: "Scimmia", translation: "قرد", pronunciation: "شيميا", emoji: "🐒" },
            { word: "Cavallo", translation: "حصان", pronunciation: "كافالو", emoji: "🐎" },
            { word: "Uccello", translation: "طائر", pronunciation: "أوتشيلو", emoji: "🐦" },
            { word: "Pesce", translation: "سمكة", pronunciation: "بيشيه", emoji: "🐟" },
        ],
        readingExercises: [
            readingExercise("Il leone è il re degli animali.", "وصف حيوان", "الأسد هو ملك الحيوانات.", ["القطة تشرب الحليب.", "أحب الكلاب كثيرا.", "الفيل حيوان كبير جدا."]),
        ],
        listeningExercises: [
            listeningExercise("Elefante", "حيوان كبير له خرطوم.", ["Cane", "Gatto", "Scimmia"]),
        ]
    },
    transportation: {
        words: [
            { word: "Trasporto", translation: "مواصلات", pronunciation: "تراسبورتو", emoji: "🚦" },
            { word: "Macchina", translation: "سيارة", pronunciation: "ماكينا", emoji: "🚗" },
            { word: "Autobus", translation: "حافلة", pronunciation: "أوتوبوس", emoji: "🚌" },
            { word: "Treno", translation: "قطار", pronunciation: "ترينو", emoji: "🚆" },
            { word: "Aereo", translation: "طائرة", pronunciation: "آيريو", emoji: "✈️" },
            { word: "Bicicletta", translation: "دراجة هوائية", pronunciation: "بيتشيكليتا", emoji: "🚲" },
            { word: "Motocicletta", translation: "دراجة نارية", pronunciation: "موتوتشيكليتا", emoji: "🏍️" },
            { word: "Nave", translation: "سفينة", pronunciation: "ناڤيه", emoji: "🚢" },
            { word: "Taxi", translation: "سيارة أجرة", pronunciation: "تاكسي", emoji: "🚕" },
            { word: "Metropolitana", translation: "مترو الأنفاق", pronunciation: "ميتروبوليتانا", emoji: "🚇" },
        ],
        readingExercises: [
            readingExercise("Vado al lavoro in autobus.", "وسيلة النقل", "أذهب إلى العمل بالحافلة.", ["القطار سريع جدا.", "هل يمكنك قيادة سيارة؟", "السفر بالطائرة مريح."]),
        ],
        listeningExercises: [
            listeningExercise("Treno", "وسيلة نقل تسير على قضبان.", ["Macchina", "Autobus", "Aereo"]),
        ]
    },
    education: {
        words: [
            { word: "Istruzione", translation: "تعليم", pronunciation: "إيسترونتسيونيه", emoji: "🎓" },
            { word: "Scuola", translation: "مدرسة", pronunciation: "سكولا", emoji: "🏫" },
            { word: "Università", translation: "جامعة", pronunciation: "أونيفرسيتا", emoji: "🎓" },
            { word: "Insegnante", translation: "معلم", pronunciation: "إنسينيانتيه", emoji: "👨‍🏫" },
            { word: "Studente", translation: "طالب", pronunciation: "ستودينتيه", emoji: "🧑‍🎓" },
            { word: "Libro", translation: "كتاب", pronunciation: "ليبرو", emoji: "📚" },
            { word: "Penna", translation: "قلم", pronunciation: "بينّا", emoji: "🖊️" },
            { word: "Esame", translation: "امتحان", pronunciation: "إزاميه", emoji: "📝" },
            { word: "Compiti", translation: "واجب منزلي", pronunciation: "كومبيتي", emoji: "📓" },
            { word: "Classe", translation: "فصل دراسي", pronunciation: "كلاسّيه", emoji: "🧑‍🏫" },
        ],
        readingExercises: [
            readingExercise("L'insegnante è in classe.", "وصف مشهد دراسي", "المعلم في الفصل الدراسي.", ["لدي امتحان صعب غدا.", "يجب أن أفعل واجبي.", "الطلاب يقرؤون الكتب."]),
        ],
        listeningExercises: [
            listeningExercise("Libro", "شيء تقرأه.", ["Penna", "Esame", "Scuola"]),
        ]
    },
    health: {
        words: [
            { word: "Salute", translation: "صحة", pronunciation: "سالوتيه", emoji: "💪" },
            { word: "Medico", translation: "طبيب", pronunciation: "ميديكو", emoji: "🧑‍⚕️" },
            { word: "Infermiere", translation: "ممرض", pronunciation: "إنفيرمييريه", emoji: "👩‍⚕️" },
            { word: "Ospedale", translation: "مستشفى", pronunciation: "أوسبيداليه", emoji: "🏥" },
            { word: "Medicina", translation: "دواء", pronunciation: "ميديتشينا", emoji: "💊" },
            { word: "Malato", translation: "مريض", pronunciation: "مالاتو", emoji: "🤒" },
            { word: "Sano", translation: "صحي", pronunciation: "سانو", emoji: "💪" },
            { word: "Mal di testa", translation: "صداع", pronunciation: "مال دي تيستا", emoji: "🤕" },
            { word: "Mal di stomaco", translation: "ألم في المعدة", pronunciation: "مال دي ستوماكو", emoji: "🤢" },
            { word: "Febbre", translation: "حمى", pronunciation: "فيبريه", emoji: "🌡️" },
        ],
        readingExercises: [
            readingExercise("Sono malato, devo andare dal medico.", "وصف حالة صحية", "أنا مريض، أحتاج لرؤية طبيب.", ["خذ هذا الدواء.", "المستشفى كبير ونظيف.", "لدي حمى وصداع."]),
        ],
        listeningExercises: [
            listeningExercise("Medico", "الشخص الذي تذهب إليه عندما تكون مريضا.", ["Infermiere", "Insegnante", "Studente"]),
        ]
    },
    technology: {
        words: [
            { word: "Tecnologia", translation: "تقنية", pronunciation: "تكنولوجييا", emoji: "💡" },
            { word: "Computer", translation: "حاسوب", pronunciation: "كومبيوتر", emoji: "💻" },
            { word: "Telefono", translation: "هاتف", pronunciation: "تيليفونو", emoji: "📱" },
            { word: "Internet", translation: "إنترنت", pronunciation: "إنترنت", emoji: "🌐" },
            { word: "Email", translation: "بريد إلكتروني", pronunciation: "إيميل", emoji: "📧" },
            { word: "Sito web", translation: "موقع إلكتروني", pronunciation: "سيتو ويب", emoji: "🕸️" },
            { word: "Password", translation: "كلمة المرور", pronunciation: "باسورد", emoji: "🔒" },
            { word: "Tastiera", translation: "لوحة مفاتيح", pronunciation: "تاستييرا", emoji: "⌨️" },
            { word: "Mouse", translation: "فأرة", pronunciation: "ماوس", emoji: "🖱️" },
            { word: "Software", translation: "برنامج", pronunciation: "سوفتوير", emoji: "💿" },
        ],
        readingExercises: [
            readingExercise("Uso internet ogni giorno sul mio computer.", "استخدام التكنولوجيا", "أستخدم الإنترنت كل يوم على حاسوبي.", ["لقد نسيت كلمة المرور الخاصة بي.", "أرسل لي بريداً إلكترونياً.", "هذا الموقع مفيد جدا."]),
        ],
        listeningExercises: [
            listeningExercise("Internet", "شبكة عالمية تربط الحواسيب.", ["Computer", "Telefono", "Email"]),
        ]
    },
    restaurant: {
        words: [
            { word: "Ristorante", translation: "مطعم", pronunciation: "ريستورانتيه", emoji: "🍴" },
            { word: "Menu", translation: "قائمة طعام", pronunciation: "مينو", emoji: "📜" },
            { word: "Cameriere", translation: "نادل", pronunciation: "كاميرييريه", emoji: "🤵" },
            { word: "Conto", translation: "فاتورة", pronunciation: "كونتو", emoji: "🧾" },
            { word: "Ordinare", translation: "يطلب", pronunciation: "أورديناريه", emoji: "✍️" },
            { word: "Delizioso", translation: "لذيذ", pronunciation: "ديليتسيوزو", emoji: "😋" },
            { word: "Forchetta", translation: "شوكة", pronunciation: "فوركيتا", emoji: "🍴" },
            { word: "Cucchiaio", translation: "ملعقة", pronunciation: "كوكيايو", emoji: "🥄" },
            { word: "Coltello", translation: "سكين", pronunciation: "كولتيلو", emoji: "🔪" },
            { word: "Piatto", translation: "طبق", pronunciation: "بياتو", emoji: "🍽️" },
        ],
        readingExercises: [
            readingExercise("Cameriere, il menu per favore.", "في المطعم", "يا نادل، القائمة من فضلك.", ["الطعام لذيذ.", "أريد أن أطلب الآن.", "الفاتورة من فضلك."]),
        ],
        listeningExercises: [
            listeningExercise("Menu", "قائمة الأطباق في المطعم.", ["Conto", "Cameriere", "Forchetta"]),
        ]
    },
    daily_routines: {
        words: [
            { word: "Svegliarsi", translation: "يستيقظ", pronunciation: "زڤيليارسي", emoji: "⏰" },
            { word: "Fare colazione", translation: "يأكل الفطور", pronunciation: "فاريه كولاتسيونيه", emoji: "🍳" },
            { word: "Andare al lavoro", translation: "يذهب للعمل", pronunciation: "أنداريه آل لاڤورو", emoji: "💼" },
            { word: "Studiare", translation: "يدرس", pronunciation: "ستودياريه", emoji: "📚" },
            { word: "Pranzare", translation: "يأكل الغداء", pronunciation: "براندزاريه", emoji: "🍱" },
            { word: "Tornare a casa", translation: "يعود للمنزل", pronunciation: "تورناريه آ كازا", emoji: "🏡" },
            { word: "Cucinare la cena", translation: "يطبخ العشاء", pronunciation: "كوتشيناريه لا تشينا", emoji: "🍝" },
            { word: "Guardare la TV", translation: "يشاهد التلفاز", pronunciation: "غوارداره لا تي ڤو", emoji: "📺" },
            { word: "Leggere un libro", translation: "يقرأ كتاباً", pronunciation: "ليدجيريه أون ليبرو", emoji: "📖" },
            { word: "Andare a letto", translation: "يذهب للنوم", pronunciation: "أنداريه آ ليتو", emoji: "😴" },
        ],
        readingExercises: [
            readingExercise("Mi sveglio alle 7 ogni mattina.", "روتين يومي", "أستيقظ الساعة 7 صباحاً كل يوم.", ["هو يذهب إلى العمل بالسيارة.", "بعد العشاء، أشاهد التلفاز.", "أنا أدرس في المساء."]),
        ],
        listeningExercises: [
            listeningExercise("Svegliarsi", "أول شيء تفعله في الصباح.", ["Dormire", "Mangiare", "Studiare"]),
        ]
    },
    countries: {
        words: [
            { word: "Paese", translation: "دولة", pronunciation: "بايزيه", emoji: "🌍" },
            { word: "Nazionalità", translation: "جنسية", pronunciation: "ناتسيوناليتا", emoji: "🆔" },
            { word: "Italia", translation: "إيطاليا", pronunciation: "إيطاليا", emoji: "🇮🇹" },
            { word: "Egitto", translation: "مصر", pronunciation: "إجيتو", emoji: "🇪🇬" },
            { word: "Francia", translation: "فرنسا", pronunciation: "فرانتشا", emoji: "🇫🇷" },
            { word: "America", translation: "أمريكا", pronunciation: "أميريكا", emoji: "🇺🇸" },
            { word: "Germania", translation: "ألمانيا", pronunciation: "جيرمانيا", emoji: "🇩🇪" },
            { word: "Spagna", translation: "إسبانيا", pronunciation: "سبانيا", emoji: "🇪🇸" },
            { word: "Giappone", translation: "اليابان", pronunciation: "جابونيه", emoji: "🇯🇵" },
            { word: "Capitale", translation: "عاصمة", pronunciation: "كابيتاليه", emoji: "🏛️" },
        ],
        readingExercises: [
            readingExercise("Roma è la capitale d'Italia.", "عواصم الدول", "روما هي عاصمة إيطاليا.", ["أنا من مصر.", "هو يتحدث الفرنسية.", "نيويورك مدينة كبيرة في أمريكا."]),
        ],
        listeningExercises: [
            listeningExercise("Italia", "بلد البيتزا والباستا.", ["Egitto", "Francia", "America"]),
        ]
    },
    sports: {
        words: [
            { word: "Sport", translation: "رياضة", pronunciation: "سبورت", emoji: "🏅" },
            { word: "Calcio", translation: "كرة القدم", pronunciation: "كالتشو", emoji: "⚽" },
            { word: "Pallacanestro", translation: "كرة السلة", pronunciation: "بالاكانسترو", emoji: "🏀" },
            { word: "Tennis", translation: "تنس", pronunciation: "تنس", emoji: "🎾" },
            { word: "Nuoto", translation: "سباحة", pronunciation: "نووتو", emoji: "🏊" },
            { word: "Corsa", translation: "جري", pronunciation: "كورسا", emoji: "🏃" },
            { word: "Giocare", translation: "يلعب", pronunciation: "جيوكاريه", emoji: "🤸" },
            { word: "Vincere", translation: "يفوز", pronunciation: "ڤينتشيريه", emoji: "🏆" },
            { word: "Perdere", translation: "يخسر", pronunciation: "بيرديريه", emoji: "👎" },
            { word: "Squadra", translation: "فريق", pronunciation: "سكوادرا", emoji: "👥" },
        ],
        readingExercises: [
            readingExercise("Il mio sport preferito è il calcio.", "رياضة مفضلة", "رياضتي المفضلة هي كرة القدم.", ["هو يلعب التنس كل نهاية أسبوع.", "فريقنا فاز بالمباراة.", "أذهب للسباحة مرتين في الأسبوع."]),
        ],
        listeningExercises: [
            listeningExercise("Calcio", "رياضة بها 11 لاعباً وكرة.", ["Pallacanestro", "Tennis", "Nuoto"]),
        ]
    },
    music_arts: {
        words: [
            { word: "Musica", translation: "موسيقى", pronunciation: "موزيكا", emoji: "🎵" },
            { word: "Arte", translation: "فن", pronunciation: "آرتيه", emoji: "🖼️" },
            { word: "Canzone", translation: "أغنية", pronunciation: "كانتسونيه", emoji: "🎶" },
            { word: "Artista", translation: "فنان", pronunciation: "آرتيستا", emoji: "🧑‍🎨" },
            { word: "Dipingere", translation: "يرسم/يلون", pronunciation: "ديبينجيريه", emoji: "🎨" },
            { word: "Cantare", translation: "يغني", pronunciation: "كانتاريه", emoji: "🎤" },
            { word: "Ballare", translation: "يرقص", pronunciation: "بالاريه", emoji: "💃" },
            { word: "Museo", translation: "متحف", pronunciation: "موزيو", emoji: "🏛️" },
            { word: "Teatro", translation: "مسرح", pronunciation: "تياترو", emoji: "🎭" },
            { word: "Film", translation: "فيلم", pronunciation: "فيلم", emoji: "🎬" },
        ],
        readingExercises: [
            readingExercise("Mi piace ascoltare la musica classica.", "تفضيلات فنية", "أحب الاستماع إلى الموسيقى الكلاسيكية.", ["هي فنانة موهوبة.", "لنذهب إلى المتحف يوم السبت.", "هذه الأغنية مشهورة جدا."]),
        ],
        listeningExercises: [
            listeningExercise("Musica", "فن الأصوات.", ["Arte", "Film", "Canzone"]),
        ]
    }
};

export const ITALIAN_GAMES: GamesCollection = {
    games: [
        {
            type: 'match',
            title: 'Gioco di Abbinamento',
            description: 'Abbina la parola italiana alla sua traduzione araba.',
            items: [
                { id: 'it_match_1', word: 'Casa', translation: 'منزل' },
                { id: 'it_match_2', word: 'Gatto', translation: 'قطة' },
                { id: 'it_match_3', word: 'Libro', translation: 'كتاب' },
                { id: 'it_match_4', word: 'Mangiare', translation: 'يأكل' },
            ]
        },
        {
            type: 'missing_word',
            title: 'Parola Mancante',
            description: 'Scegli la parola corretta per completare la frase.',
            sentence: 'Il sole è {blank} e caldo.',
            correctWord: 'giallo',
            options: ['giallo', 'blu', 'freddo', 'triste']
        }
    ]
};