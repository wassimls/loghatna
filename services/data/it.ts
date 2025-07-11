
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
            { word: "a", translation: "آ", pronunciation: "/a/", emoji: "✈️" },
            { word: "b", translation: "بي", pronunciation: "/bi/", emoji: "🎈" },
            { word: "c", translation: "تشي", pronunciation: "/tʃi/", emoji: "🍰" },
            { word: "d", translation: "دي", pronunciation: "/di/", emoji: "🎲" },
            { word: "e", translation: "إيه", pronunciation: "/e/", emoji: "🐘" },
            { word: "f", translation: "إفّي", pronunciation: "/ˈɛffe/", emoji: "🌸" },
            { word: "g", translation: "جي", pronunciation: "/dʒi/", emoji: "🦒" },
            { word: "h", translation: "آكّا", pronunciation: "(صامت)", emoji: "🏨" },
            { word: "i", translation: "إي", pronunciation: "/i/", emoji: "🏝️" },
            { word: "l", translation: "إلّي", pronunciation: "/ˈɛlle/", emoji: "🌙" },
            { word: "m", translation: "إمّي", pronunciation: "/ˈɛmme/", emoji: "🍎" },
            { word: "n", translation: "إنّي", pronunciation: "/ˈɛnne/", emoji: "👃" },
            { word: "o", translation: "أو", pronunciation: "/o/", emoji: "🍊" },
            { word: "p", translation: "پي", pronunciation: "/pi/", emoji: "🍕" },
            { word: "q", translation: "كو", pronunciation: "/ku/", emoji: "👑" },
            { word: "r", translation: "إرّي", pronunciation: "/ˈɛrre/", emoji: "🤖" },
            { word: "s", translation: "إسّي", pronunciation: "/ˈɛsse/", emoji: "☀️" },
            { word: "t", translation: "تي", pronunciation: "/ti/", emoji: "🐢" },
            { word: "u", translation: "أو", pronunciation: "/u/", emoji: "🍇" },
            { word: "v", translation: "ڤو/ڤي", pronunciation: "/vu/", emoji: "🎻" },
            { word: "z", translation: "دزيتا", pronunciation: "/ˈdzɛta/", emoji: "🦓" },
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
            { word: "Come", translation: "كيف", pronunciation: "كومي", emoji: "🤔" },
            { word: "Sì", translation: "نعم", pronunciation: "سي", emoji: "👍" },
            { word: "No", translation: "لا", pronunciation: "نو", emoji: "👎" },
            { word: "Forse", translation: "ربما", pronunciation: "فورسي", emoji: "🤷" },
            { word: "Per favore", translation: "من فضلك", pronunciation: "بير فافوري", emoji: "🙏" },
            { word: "Grazie", translation: "شكراً", pronunciation: "غراتسييه", emoji: "😊" },
            { word: "Mi dispiace", translation: "آسف", pronunciation: "مي ديسبياتشي", emoji: "😔" },
            { word: "Scusi", translation: "اعذرني", pronunciation: "سكوزي", emoji: "✋" },
            { word: "E", translation: "و", pronunciation: "إيه", emoji: "&" },
            { word: "Ma", translation: "لكن", pronunciation: "ما", emoji: "↔️" },
            { word: "O", translation: "أو", pronunciation: "أو", emoji: "🤷‍♀️" },
            { word: "Perché", translation: "لأن", pronunciation: "بيركيه", emoji: "👉" },
        ],
        readingExercises: [
            readingExercise("Oggi sono felice, ma fa molto freddo.", "ابحث عن ترجمة 'felice' و 'freddo'.", "أنا سعيد اليوم، لكن الجو بارد جداً.", ["Lui è triste perché fa caldo.", "Stai bene? Sì, grazie.", "Questo è facile e quello è difficile."]),
            readingExercise("La casa grande ha un piccolo giardino.", "ترجم 'casa grande' و 'piccolo giardino'.", "البيت الكبير له حديقة صغيرة.", ["Il gatto beve il latte.", "Puoi aiutarmi?", "Questo è il mio libro."])
        ],
        listeningExercises: [
            listeningExercise("Grazie", "كلمة شائعة لإظهار الامتنان.", ["Mi dispiace", "Per favore", "Ciao"]),
            listeningExercise("Buongiorno", "تحية تقال في الصباح.", ["Buonanotte", "Arrivederci", "Ciao"])
        ]
    },
    greetings: {
        words: [
            { word: "Ciao", translation: "مرحباً/وداعاً", pronunciation: "تشاو", emoji: "👋" },
            { word: "Buongiorno", translation: "صباح الخير", pronunciation: "بونجورنو", emoji: "☀️" },
            { word: "Buonasera", translation: "مساء الخير", pronunciation: "بوناسيرا", emoji: "🌃" },
            { word: "Buonanotte", translation: "تصبح على خير", pronunciation: "بونانوتي", emoji: "🌙" },
            { word: "Arrivederci", translation: "إلى اللقاء", pronunciation: "آريڤيديرتشي", emoji: "👋" },
            { word: "A presto", translation: "أراك قريباً", pronunciation: "آ بريستو", emoji: "👀" },
            { word: "Come stai?", translation: "كيف حالك؟", pronunciation: "كومي ستاي؟", emoji: "❓" },
            { word: "Sto bene, grazie.", translation: "أنا بخير، شكراً لك.", pronunciation: "ستو بيني، غراتسييه", emoji: "😊" },
            { word: "E tu?", translation: "وأنت؟", pronunciation: "إيه تو؟", emoji: "❓" },
            { word: "Come ti chiami?", translation: "ما اسمك؟", pronunciation: "كومي تي كيامي؟", emoji: "❓" },
            { word: "Mi chiamo...", translation: "اسمي هو...", pronunciation: "مي كيامو...", emoji: "🏷️" },
            { word: "Piacere di conoscerti", translation: "سررت بلقائك.", pronunciation: "بياتشيري دي كونوشيرتي", emoji: "🤝" },
            { word: "Benvenuto", translation: "أهلاً بك", pronunciation: "بينڤينوتو", emoji: "🎉" },
        ],
        readingExercises: [
            readingExercise("Buongiorno, come stai?", "ابحث عن التحية الصباحية والسؤال عن الحال.", "صباح الخير، كيف حالك؟", ["Buonanotte, a domani.", "Come ti chiami e di dove sei?", "Sto bene, grazie."]),
            readingExercise("Come ti chiami? Mi chiamo Ahmed.", "ابحث عن السؤال عن الاسم والإجابة.", "ما اسمك؟ اسمي أحمد.", ["Come stai? Sto bene.", "Di dove sei? Sono egiziano.", "Piacere."])
        ],
        listeningExercises: [
            listeningExercise("Come ti chiami?", "سؤال للاستفسار عن اسم الشخص.", ["Come stai?", "Arrivederci", "Buongiorno"]),
            listeningExercise("Piacere", "عبارة تقال عند مقابلة شخص لأول مرة.", ["Grazie", "Ciao", "Mi dispiace"])
        ]
    },
    numbers: {
        words: [
            { word: "Zero", translation: "صفر", pronunciation: "دزيرو", emoji: "0️⃣" },
            { word: "Uno", translation: "واحد", pronunciation: "أونو", emoji: "1️⃣" },
            { word: "Due", translation: "اثنان", pronunciation: "دويه", emoji: "2️⃣" },
            { word: "Tre", translation: "ثلاثة", pronunciation: "تريه", emoji: "3️⃣" },
            { word: "Quattro", translation: "أربعة", pronunciation: "كواترو", emoji: "4️⃣" },
            { word: "Cinque", translation: "خمسة", pronunciation: "تشينكوي", emoji: "5️⃣" },
            { word: "Sei", translation: "ستة", pronunciation: "سيي", emoji: "6️⃣" },
            { word: "Sette", translation: "سبعة", pronunciation: "سيتي", emoji: "7️⃣" },
            { word: "Otto", translation: "ثمانية", pronunciation: "أوتو", emoji: "8️⃣" },
            { word: "Nove", translation: "تسعة", pronunciation: "نوفي", emoji: "9️⃣" },
            { word: "Dieci", translation: "عشرة", pronunciation: "دييتشي", emoji: "🔟" },
            { word: "Undici", translation: "أحد عشر", pronunciation: "أونديتشي", emoji: "1️⃣1️⃣" },
            { word: "Dodici", translation: "اثنا عشر", pronunciation: "دوديتشي", emoji: "1️⃣2️⃣" },
            { word: "Venti", translation: "عشرون", pronunciation: "ڤينتي", emoji: "2️⃣0️⃣" },
            { word: "Trenta", translation: "ثلاثون", pronunciation: "ترينتا", emoji: "3️⃣0️⃣" },
            { word: "Quaranta", translation: "أربعون", pronunciation: "كوارانتا", emoji: "4️⃣0️⃣" },
            { word: "Cinquanta", translation: "خمسون", pronunciation: "تشينكوانتا", emoji: "5️⃣0️⃣" },
            { word: "Cento", translation: "مئة", pronunciation: "تشينتو", emoji: "💯" },
            { word: "Mille", translation: "ألف", pronunciation: "ميللي", emoji: "1️⃣0️⃣0️⃣0️⃣" },
        ],
        readingExercises: [
            readingExercise("Ho due mani e dieci dita.", "ابحث عن الأرقام 2 و 10.", "لدي يدان وعشرة أصابع.", ["Ho tre libri e cinque penne.", "Puoi contare da uno a dieci?", "Lui ha otto anni."]),
            readingExercise("Ci sono cinquanta stelle sulla bandiera.", "ابحث عن الرقم 50.", "يوجد خمسون نجمة على العلم.", ["Ho venti dollari.", "I primi cento giorni sono importanti.", "Uno più due fa tre."])
        ],
        listeningExercises: [
            listeningExercise("Cinque", "الرقم الذي يأتي بعد أربعة.", ["Quattro", "Uno", "Dieci"]),
            listeningExercise("Venti", "ضعف الرقم عشرة.", ["Dodici", "Due", "Dieci"])
        ]
    },
    colors: {
        words: [
            { word: "Colore", translation: "لون", pronunciation: "كولوري", emoji: "🎨" },
            { word: "Rosso", translation: "أحمر", pronunciation: "روسّو", emoji: "🔴" },
            { word: "Verde", translation: "أخضر", pronunciation: "ڤيردي", emoji: "🟢" },
            { word: "Blu", translation: "أزرق", pronunciation: "بلو", emoji: "🔵" },
            { word: "Giallo", translation: "أصفر", pronunciation: "جالّو", emoji: "🟡" },
            { word: "Nero", translation: "أسود", pronunciation: "نيرو", emoji: "⚫" },
            { word: "Bianco", translation: "أبيض", pronunciation: "بيانكو", emoji: "⚪" },
            { word: "Arancione", translation: "برتقالي", pronunciation: "آرانتشوني", emoji: "🟠" },
            { word: "Viola", translation: "بنفسجي", pronunciation: "ڤيولا", emoji: "🟣" },
            { word: "Marrone", translation: "بني", pronunciation: "مارّوني", emoji: "🟤" },
            { word: "Rosa", translation: "وردي", pronunciation: "روزا", emoji: "🌸" },
            { word: "Grigio", translation: "رمادي", pronunciation: "غريجو", emoji: "🐘" },
        ],
        readingExercises: [
            readingExercise("Il cielo è blu e l'erba è verde.", "ركز على ترجمة 'blu' و 'verde'.", "السماء زرقاء والعشب أخضر.", ["La mela è rossa e la banana è gialla.", "Mi piacciono il bianco e il nero.", "La sua nuova macchina è rossa."]),
            readingExercise("Lei ha un vestito rosa e scarpe bianche.", "ابحث عن 'rosa' و 'bianche'.", "لديها فستان وردي وحذاء أبيض.", ["Il gatto è nero e il cane è marrone.", "Ti piace il colore viola?", "L'oro e l'argento sono metalli preziosi."])
        ],
        listeningExercises: [
            listeningExercise("Rosso", "لون الدم أو الفراولة.", ["Blu", "Verde", "Giallo"]),
            listeningExercise("Nero", "عكس اللون الأبيض.", ["Bianco", "Blu", "Grigio"])
        ]
    },
    family: {
        words: [
            { word: "Famiglia", translation: "عائلة", pronunciation: "فاميليا", emoji: "👨‍👩‍👧‍👦" },
            { word: "Padre", translation: "أب", pronunciation: "بادري", emoji: "👨" },
            { word: "Madre", translation: "أم", pronunciation: "مادري", emoji: "👩" },
            { word: "Genitori", translation: "والدين", pronunciation: "جينيتوري", emoji: "👨‍👩‍👧" },
            { word: "Figlio", translation: "ابن", pronunciation: "فيليو", emoji: "👦" },
            { word: "Figlia", translation: "ابنة", pronunciation: "فيليا", emoji: "👧" },
            { word: "Bambino", translation: "طفل", pronunciation: "بامبينو", emoji: "👶" },
            { word: "Fratello", translation: "أخ", pronunciation: "فراتيلّو", emoji: "👱‍♂️" },
            { word: "Sorella", translation: "أخت", pronunciation: "سوريلا", emoji: "👱‍♀️" },
            { word: "Nonno", translation: "جد", pronunciation: "نونو", emoji: "👴" },
            { word: "Nonna", translation: "جدة", pronunciation: "نونا", emoji: "👵" },
            { word: "Zio", translation: "عم/خال", pronunciation: "دزيو", emoji: "👨‍" },
            { word: "Zia", translation: "عمة/خالة", pronunciation: "دزيا", emoji: "👩‍" },
            { word: "Cugino/Cugina", translation: "ابن/بنت العم/الخال", pronunciation: "كوجينو/كوجينا", emoji: "🧑" },
            { word: "Marito", translation: "زوج", pronunciation: "ماريتو", emoji: "🤵" },
            { word: "Moglie", translation: "زوجة", pronunciation: "موليه", emoji: "👰" },
        ],
        readingExercises: [
            readingExercise("Mio padre e mia madre sono i miei genitori.", "ابحث عن ترجمة 'padre', 'madre', و 'genitori'.", "أبي وأمي هما والديّ.", ["Mio fratello e mia sorella giocano insieme.", "Mio nonno e mia nonna vivono in una grande casa.", "Questo è mio figlio e questa è mia figlia."]),
            readingExercise("Mia sorella è più giovane di mio fratello.", "ركز على المقارنة بين 'sorella' و 'fratello'.", "أختي أصغر من أخي.", ["La mia famiglia è molto grande.", "Mio cugino vive in un'altra città.", "A mio nonno piace leggere."])
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
            { word: "Succo", translation: "عصير", pronunciation: "سوكّو", emoji: "🧃" },
            { word: "Latte", translation: "حليب", pronunciation: "لاتيه", emoji: "🥛" },
            { word: "Pane", translation: "خبز", pronunciation: "پاني", emoji: "🍞" },
            { word: "Formaggio", translation: "جبن", pronunciation: "فورماجو", emoji: "🧀" },
            { word: "Riso", translation: "أرز", pronunciation: "ريزو", emoji: "🍚" },
            { word: "Pollo", translation: "دجاج", pronunciation: "پولّو", emoji: "🍗" },
            { word: "Carne", translation: "لحم", pronunciation: "كارني", emoji: "🥩" },
            { word: "Pesce", translation: "سمك", pronunciation: "بيشي", emoji: "🐟" },
            { word: "Frutta", translation: "فاكهة", pronunciation: "فروتا", emoji: "🍎" },
            { word: "Mela", translation: "تفاحة", pronunciation: "ميلا", emoji: "🍎" },
            { word: "Banana", translation: "موزة", pronunciation: "بنانا", emoji: "🍌" },
            { word: "Arancia", translation: "برتقالة", pronunciation: "آرانشا", emoji: "🍊" },
            { word: "Verdura", translation: "خضروات", pronunciation: "ڤيردورا", emoji: "🥕" },
            { word: "Carota", translation: "جزرة", pronunciation: "كاروتا", emoji: "🥕" },
            { word: "Patata", translation: "بطاطس", pronunciation: "پاتاتا", emoji: "🥔" },
            { word: "Pomodoro", translation: "طماطم", pronunciation: "پومودورو", emoji: "🍅" },
            { word: "Zucchero", translation: "سكر", pronunciation: "دزوكّيرو", emoji: "🍬" },
            { word: "Sale", translation: "ملح", pronunciation: "سالي", emoji: "🧂" },
            { word: "Colazione", translation: "فطور", pronunciation: "كولاتسيوني", emoji: "🍳" },
            { word: "Pranzo", translation: "غداء", pronunciation: "پراندزو", emoji: "🍱" },
            { word: "Cena", translation: "عشاء", pronunciation: "تشينا", emoji: "🍝" },
        ],
        readingExercises: [
            readingExercise("Ho fame. Voglio mangiare pane e formaggio.", "ركز على كلمتي 'pane' و 'formaggio'.", "أنا جائع. أريد أن آكل الخبز والجبن.", ["Ho sete. Voglio bere acqua.", "Il cibo è delizioso.", "Posso avere il menù, per favore?"]),
            readingExercise("Per colazione, mi piace il caffè e una mela.", "ابحث عن طعام وشراب الفطور.", "في الفطور، أحب القهوة وتفاحة.", ["Mangio riso e pollo a pranzo.", "La cena è pronta alle sette.", "Questo succo è fresco e delizioso."])
        ],
        listeningExercises: [
            listeningExercise("Mela", "نوع من الفاكهة، غالبًا ما يكون أحمر أو أخضر.", ["Arancia", "Acqua", "Pane"]),
            listeningExercise("Acqua", "شراب أساسي وشفاف.", ["Latte", "Succo", "Tè"])
        ]
    },
    time: {
        words: [
            { word: "Tempo", translation: "وقت", pronunciation: "تيمپو", emoji: "⏰" },
            { word: "Ora", translation: "ساعة", pronunciation: "أورا", emoji: "⏳" },
            { word: "Minuto", translation: "دقيقة", pronunciation: "مينوتو", emoji: "⏱️" },
            { word: "Secondo", translation: "ثانية", pronunciation: "سيكوندو", emoji: "⏱️" },
            { word: "Giorno", translation: "يوم", pronunciation: "جورنو", emoji: "📅" },
            { word: "Settimana", translation: "أسبوع", pronunciation: "سيتّيمانا", emoji: "🗓️" },
            { word: "Mese", translation: "شهر", pronunciation: "ميزي", emoji: "🈷️" },
            { word: "Anno", translation: "سنة", pronunciation: "آنّو", emoji: "🎉" },
            { word: "Lunedì", translation: "الإثنين", pronunciation: "لونيدي", emoji: " M" },
            { word: "Martedì", translation: "الثلاثاء", pronunciation: "مارتيدي", emoji: "T" },
            { word: "Mercoledì", translation: "الأربعاء", pronunciation: "ميركوليدي", emoji: "W" },
            { word: "Giovedì", translation: "الخميس", pronunciation: "جوڤيدي", emoji: "T" },
            { word: "Venerdì", translation: "الجمعة", pronunciation: "ڤينيردي", emoji: "F" },
            { word: "Sabato", translation: "السبت", pronunciation: "ساباتو", emoji: "S" },
            { word: "Domenica", translation: "الأحد", pronunciation: "دومينيكا", emoji: "S" },
            { word: "Oggi", translation: "اليوم", pronunciation: "أودجي", emoji: "👇" },
            { word: "Domani", translation: "غداً", pronunciation: "دوماني", emoji: "➡️" },
            { word: "Ieri", translation: "أمس", pronunciation: "ييري", emoji: "⬅️" },
            { word: "Mattina", translation: "صباح", pronunciation: "ماتينا", emoji: "🌅" },
            { word: "Pomeriggio", translation: "بعد الظهر", pronunciation: "پوميريدجو", emoji: "☀️" },
            { word: "Sera", translation: "مساء", pronunciation: "سيرا", emoji: "🌇" },
            { word: "Notte", translation: "ليل", pronunciation: "نوتي", emoji: "🌃" },
        ],
        readingExercises: [
            readingExercise("Oggi è lunedì e domani è martedì.", "ترجم 'Oggi', 'lunedì', 'domani', 'martedì'.", "اليوم هو الإثنين، وغداً هو الثلاثاء.", ["Ieri era domenica.", "Ho una riunione venerdì.", "Un mese ha quattro settimane."]),
            readingExercise("La riunione è alle dieci di mattina.", "ابحث عن الوقت والجزء من اليوم.", "الاجتماع في الساعة العاشرة صباحاً.", ["Ci vediamo stasera.", "Aspetta un minuto, per favore.", "Un anno ha dodici mesi."])
        ],
        listeningExercises: [
            listeningExercise("Venerdì", "اليوم الذي يسبق عطلة نهاية الأسبوع.", ["Lunedì", "Domenica", "Settimana"]),
            listeningExercise("Domani", "اليوم الذي يأتي بعد اليوم.", ["Oggi", "Ieri", "Giorno"])
        ]
    },
    weather: {
        words: [
            { word: "Tempo", translation: "الطقس", pronunciation: "تيمپو", emoji: "🌦️" },
            { word: "Sole", translation: "شمس", pronunciation: "سولي", emoji: "☀️" },
            { word: "Soleggiato", translation: "مشمس", pronunciation: "سوليجاتو", emoji: "☀️" },
            { word: "Nuvola", translation: "غيمة", pronunciation: "نوڤولا", emoji: "☁️" },
            { word: "Nuvoloso", translation: "غائم", pronunciation: "نوڤولوزو", emoji: "☁️" },
            { word: "Pioggia", translation: "مطر", pronunciation: "پيودجا", emoji: "🌧️" },
            { word: "Piovoso", translation: "ممطر", pronunciation: "پيوڤوزو", emoji: "🌧️" },
            { word: "Vento", translation: "رياح", pronunciation: "ڤينتو", emoji: "💨" },
            { word: "Ventoso", translation: "عاصف", pronunciation: "ڤينتوزو", emoji: "💨" },
            { word: "Neve", translation: "ثلج", pronunciation: "نيڤي", emoji: "❄️" },
            { word: "Nevoso", translation: "مثلج", pronunciation: "نيڤوزو", emoji: "❄️" },
            { word: "Caldo", translation: "حار", pronunciation: "كالدو", emoji: "🌡️" },
            { word: "Freddo", translation: "بارد", pronunciation: "فريدّو", emoji: "🥶" },
            { word: "Mite", translation: "دافئ", pronunciation: "ميتي", emoji: "😊" },
            { word: "Fresco", translation: "معتدل البرودة", pronunciation: "فريسك", emoji: "😎" },
            { word: "Tempesta", translation: "عاصفة", pronunciation: "تيمپيستا", emoji: "⛈️" },
            { word: "Nebbia", translation: "ضباب", pronunciation: "نيبّيا", emoji: "🌫️" },
        ],
        readingExercises: [
            readingExercise("Oggi c'è il sole e fa caldo.", "ابحث عن الكلمات التي تصف الشمس والحرارة.", "الجو مشمس وحار اليوم.", ["È nuvoloso e fa freddo.", "Domani pioverà.", "Mi piace il tempo nevoso."]),
            readingExercise("In inverno fa freddo e nevica.", "ابحث عن كلمات الشتاء.", "في الشتاء، يكون الجو بارداً ويتساقط الثلج.", ["Il vento è forte oggi.", "Prendi l'ombrello, sta piovendo.", "C'è nebbia al mattino."])
        ],
        listeningExercises: [
            listeningExercise("Piovoso", "عندما يسقط الماء من السماء.", ["Soleggiato", "Nuvoloso", "Ventoso"]),
            listeningExercise("Freddo", "عكس كلمة 'حار'.", ["Caldo", "Mite", "Fresco"])
        ]
    },
    home: {
        words: [
            { word: "Casa", translation: "منزل/بيت", pronunciation: "كازا", emoji: "🏠" },
            { word: "Appartamento", translation: "شقة", pronunciation: "آپارتامينتو", emoji: "🏢" },
            { word: "Stanza", translation: "غرفة", pronunciation: "ستانتسا", emoji: "🚪" },
            { word: "Camera da letto", translation: "غرفة نوم", pronunciation: "كاميرا دا ليتّو", emoji: "🛏️" },
            { word: "Bagno", translation: "حمام", pronunciation: "بانيو", emoji: "🛁" },
            { word: "Cucina", translation: "مطبخ", pronunciation: "كوتشينا", emoji: "🍳" },
            { word: "Soggiorno", translation: "غرفة معيشة", pronunciation: "سودجورنو", emoji: "🛋️" },
            { word: "Sala da pranzo", translation: "غرفة طعام", pronunciation: "سالا دا پراندزو", emoji: "🍽️" },
            { word: "Giardino", translation: "حديقة", pronunciation: "جاردينو", emoji: "🌳" },
            { word: "Porta", translation: "باب", pronunciation: "پورتا", emoji: "🚪" },
            { word: "Finestra", translation: "نافذة", pronunciation: "فينيسترا", emoji: "🪟" },
            { word: "Pavimento", translation: "أرضية", pronunciation: "پاڤيمينتو", emoji: "👣" },
            { word: "Tetto", translation: "سقف", pronunciation: "تيتّو", emoji: "🧱" },
            { word: "Muro", translation: "جدار", pronunciation: "مورو", emoji: "🧱" },
            { word: "Tavolo", translation: "طاولة", pronunciation: "تاڤولو", emoji: "🪵" },
            { word: "Sedia", translation: "كرسي", pronunciation: "سيديا", emoji: "🪑" },
            { word: "Letto", translation: "سرير", pronunciation: "ليتّو", emoji: "🛏️" },
            { word: "Divano", translation: "أريكة", pronunciation: "ديڤانو", emoji: "🛋️" },
            { word: "Lampada", translation: "مصباح", pronunciation: "لامپادا", emoji: "💡" },
            { word: "Chiave", translation: "مفتاح", pronunciation: "كياڤي", emoji: "🔑" },
        ],
        readingExercises: [
            readingExercise("La cucina ha un tavolo e una finestra.", "ترجم 'cucina', 'tavolo', و 'finestra'.", "المطبخ به طاولة ونافذة.", ["La camera da letto ha un letto e una porta.", "Il soggiorno ha una sedia.", "La chiave di casa è in giardino."]),
            readingExercise("Dormo in camera da letto e guardo la TV in soggiorno.", "ابحث عن أماكن النوم ومشاهدة التلفاز.", "أنا أنام في غرفة النوم وأشاهد التلفاز في غرفة المعيشة.", ["Mangiamo in sala da pranzo.", "Il bagno è in fondo al corridoio.", "L'appartamento è al terzo piano."])
        ],
        listeningExercises: [
            listeningExercise("Cucina", "المكان الذي نطبخ فيه الطعام.", ["Camera da letto", "Bagno", "Giardino"]),
            listeningExercise("Porta", "تستخدمه للدخول والخروج من غرفة.", ["Finestra", "Tavolo", "Letto"])
        ]
    },
    shopping: {
        words: [
            { word: "Negozio", translation: "متجر/محل", pronunciation: "نيغوتسيو", emoji: "🏬" },
            { word: "Mercato", translation: "سوق", pronunciation: "ميركاتو", emoji: "🛒" },
            { word: "Supermercato", translation: "سوبر ماركت", pronunciation: "سوپرميركاتو", emoji: "🏪" },
            { word: "Soldi", translation: "مال", pronunciation: "سولدي", emoji: "💰" },
            { word: "Prezzo", translation: "سعر", pronunciation: "پريتسو", emoji: "💲" },
            { word: "Comprare", translation: "يشتري", pronunciation: "كومبراري", emoji: "🛍️" },
            { word: "Vendere", translation: "يبيع", pronunciation: "ڤيندي", emoji: "🏷️" },
            { word: "Pagare", translation: "يدفع", pronunciation: "پاغاري", emoji: "💳" },
            { word: "Costoso", translation: "غالي", pronunciation: "كوستوزو", emoji: "💎" },
            { word: "Economico", translation: "رخيص", pronunciation: "إيكونوميكو", emoji: "🪙" },
            { word: "Fattura", translation: "فاتورة", pronunciation: "فاتّورا", emoji: "🧾" },
            { word: "Scontrino", translation: "إيصال", pronunciation: "سكونترينو", emoji: "🧾" },
            { word: "Contanti", translation: "نقد", pronunciation: "كونتانتي", emoji: "💵" },
            { word: "Carta di credito", translation: "بطاقة ائتمان", pronunciation: "كارتا دي كريديتو", emoji: "💳" },
            { word: "Cliente", translation: "زبون", pronunciation: "كليينتي", emoji: "🙋" },
        ],
        readingExercises: [
            readingExercise("Quanto costa questo? Il prezzo è molto costoso.", "ابحث عن السؤال عن السعر ووصفه بأنه 'costoso'.", "كم سعر هذا؟ السعر غالي جداً.", ["Vorrei comprare questo, per favore.", "Posso pagare con la carta?", "Questo negozio è molto economico."]),
            readingExercise("Pagherò con la carta di credito, mi dia lo scontrino per favore.", "ابحث عن طريقة الدفع والوثيقة المطلوبة.", "سأدفع ببطاقة الائتمان، من فضلك أعطني الإيصال.", ["Accettate contanti?", "Questo mercato è molto grande.", "Il cliente ha sempre ragione."])
        ],
        listeningExercises: [
            listeningExercise("Soldi", "ما تستخدمه للشراء.", ["Prezzo", "Negozio", "Fattura"]),
            listeningExercise("Comprare", "فعل الحصول على شيء مقابل المال.", ["Vendere", "Pagare", "Avere"])
        ]
    },
    body: {
        words: [
            { word: "Corpo", translation: "جسم", pronunciation: "كورپو", emoji: "🧍" },
            { word: "Testa", translation: "رأس", pronunciation: "تيستا", emoji: "👤" },
            { word: "Viso", translation: "وجه", pronunciation: "ڤيزو", emoji: "😊" },
            { word: "Occhio", translation: "عين", pronunciation: "أوكّيو", emoji: "👁️" },
            { word: "Naso", translation: "أنف", pronunciation: "نازو", emoji: "👃" },
            { word: "Bocca", translation: "فم", pronunciation: "بوكّا", emoji: "👄" },
            { word: "Orecchio", translation: "أذن", pronunciation: "أوريكّيو", emoji: "👂" },
            { word: "Capelli", translation: "شعر", pronunciation: "كاپيلّي", emoji: "👱" },
            { word: "Dente", translation: "سن", pronunciation: "دينتي", emoji: "🦷" },
            { word: "Collo", translation: "رقبة", pronunciation: "كولّو", emoji: "🦒" },
            { word: "Spalla", translation: "كتف", pronunciation: "سپالّا", emoji: "🤷" },
            { word: "Braccio", translation: "ذراع", pronunciation: "براتشو", emoji: "💪" },
            { word: "Mano", translation: "يد", pronunciation: "مانو", emoji: "✋" },
            { word: "Dito", translation: "إصبع", pronunciation: "ديتو", emoji: "👆" },
            { word: "Gamba", translation: "ساق", pronunciation: "غامبا", emoji: "🦵" },
            { word: "Piede", translation: "قدم", pronunciation: "پييدي", emoji: "🦶" },
            { word: "Cuore", translation: "قلب", pronunciation: "كووري", emoji: "❤️" },
            { word: "Stomaco", translation: "معدة", pronunciation: "ستوماكو", emoji: "🍔" },
        ],
        readingExercises: [
            readingExercise("Ho due occhi, un naso e una bocca.", "عد أجزاء الوجه المذكورة.", "لدي عينان وأنف واحد وفم واحد.", ["Mi lavo le mani con acqua e sapone.", "Mi fa male la testa.", "Lui ha i capelli neri e gli occhi blu."]),
            readingExercise("Mi fa male lo stomaco dopo aver mangiato.", "ابحث عن الجزء الذي يؤلم.", "معدتي تؤلمني بعد الأكل.", ["Il mio cuore batte forte.", "Ho cinque dita per ogni mano.", "Il mio braccio è forte."])
        ],
        listeningExercises: [
            listeningExercise("Mano", "الجزء من الجسم الذي به خمسة أصابع.", ["Piede", "Testa", "Occhio"]),
            listeningExercise("Capelli", "ينمو على الرأس.", ["Viso", "Naso", "Orecchio"])
        ]
    },
    clothing: {
        words: [
            { word: "Vestiti", translation: "ملابس", pronunciation: "ڤيستيتي", emoji: "👕" },
            { word: "Camicia", translation: "قميص", pronunciation: "كاميتشا", emoji: "👕" },
            { word: "Maglietta", translation: "تي شيرت", pronunciation: "مالييتّا", emoji: "👕" },
            { word: "Pantaloni", translation: "بنطال", pronunciation: "پانتالوني", emoji: "👖" },
            { word: "Jeans", translation: "جينز", pronunciation: "جينز", emoji: "👖" },
            { word: "Pantaloncini", translation: "شورت", pronunciation: "پانتالونتيني", emoji: "🩳" },
            { word: "Vestito", translation: "فستان", pronunciation: "ڤيستيتو", emoji: "👗" },
            { word: "Gonna", translation: "تنورة", pronunciation: "غونّا", emoji: "👗" },
            { word: "Giacca", translation: "سترة", pronunciation: "جاكّا", emoji: "🧥" },
            { word: "Cappotto", translation: "معطف", pronunciation: "كاپّوتّو", emoji: "🧥" },
            { word: "Maglione", translation: "سترة صوفية", pronunciation: "ماليوني", emoji: "🧶" },
            { word: "Scarpe", translation: "حذاء", pronunciation: "سكارپي", emoji: "👟" },
            { word: "Stivali", translation: "حذاء طويل", pronunciation: "ستيڤالي", emoji: "👢" },
            { word: "Calzini", translation: "جوارب", pronunciation: "كالتسيني", emoji: "🧦" },
            { word: "Cappello", translation: "قبعة", pronunciation: "كاپّيلّو", emoji: "🧢" },
            { word: "Sciarpa", translation: "وشاح", pronunciation: "شارپا", emoji: "🧣" },
            { word: "Guanti", translation: "قفازات", pronunciation: "غوانتي", emoji: "🧤" },
        ],
        readingExercises: [
            readingExercise("Indosso una camicia blu e pantaloni neri.", "ابحث عن 'camicia' و 'pantaloni' وألوانها.", "أنا أرتدي قميصاً أزرق وبنطالاً أسود.", ["Le mie scarpe nuove sono bianche.", "Devo comprare una giacca per l'inverno.", "Questo cappello è molto carino."]),
            readingExercise("In inverno, indosso un cappotto, una sciarpa e guanti.", "ابحث عن ملابس الشتاء.", "في الشتاء، أرتدي معطفًا ووشاحًا وقفازات.", ["Lei indossa un bel vestito rosso.", "Hai visto i miei calzini?", "Questa maglietta è troppo grande."])
        ],
        listeningExercises: [
            listeningExercise("Scarpe", "ما ترتديه في قدميك.", ["Camicia", "Cappello", "Calzini"]),
            listeningExercise("Giacca", "ترتديه فوق قميصك عندما يكون الجو باردًا.", ["Pantaloni", "Vestito", "Calzini"])
        ]
    },
    verbs: {
        words: [
            { word: "essere", translation: "يكون", pronunciation: "إيسّيري", emoji: "🧘" },
            { word: "avere", translation: "يملك", pronunciation: "آڤيري", emoji: "🤲" },
            { word: "fare", translation: "يفعل/يصنع", pronunciation: "فاري", emoji: "💪" },
            { word: "dire", translation: "يقول", pronunciation: "ديري", emoji: "🗣️" },
            { word: "andare", translation: "يذهب", pronunciation: "آنداري", emoji: "🚶" },
            { word: "potere", translation: "يستطيع", pronunciation: "پوتيري", emoji: "🏋️" },
            { word: "volere", translation: "يريد", pronunciation: "ڤوليري", emoji: "🙋" },
            { word: "sapere", translation: "يعرف", pronunciation: "ساپيري", emoji: "🧠" },
            { word: "vedere", translation: "يرى", pronunciation: "ڤيديري", emoji: "👀" },
            { word: "venire", translation: "يأتي", pronunciation: "ڤينيري", emoji: "👋" },
            { word: "dovere", translation: "يجب", pronunciation: "دوڤيري", emoji: "📋" },
            { word: "credere", translation: "يصدق", pronunciation: "كريديري", emoji: "🙏" },
            { word: "trovare", translation: "يجد", pronunciation: "تروڤاري", emoji: "🔍" },
            { word: "dare", translation: "يعطي", pronunciation: "داري", emoji: "🎁" },
            { word: "prendere", translation: "يأخذ", pronunciation: "پرينديري", emoji: "✋" },
            { word: "parlare", translation: "يتحدث", pronunciation: "پارلاري", emoji: "💬" },
            { word: "amare", translation: "يحب", pronunciation: "آماري", emoji: "❤️" },
            { word: "pensare", translation: "يفكر", pronunciation: "پينساري", emoji: "🤔" },
            { word: "mangiare", translation: "يأكل", pronunciation: "مانجاري", emoji: "🍔" },
            { word: "bere", translation: "يشرب", pronunciation: "بيري", emoji: "🥤" },
        ],
        readingExercises: [
            readingExercise("Devo andare al lavoro, ma voglio restare a casa.", "ابحث عن الأفعال المتناقضة.", "يجب أن أذهب إلى العمل، لكني أريد أن أبقى في المنزل.", ["Lui può vedere e sentire tutto.", "Puoi aiutarmi a portare questo?", "Lei cerca di imparare una nuova lingua."]),
            readingExercise("Sa leggere e scrivere in tre lingue.", "ابحث عن المهارات اللغوية.", "هو يعرف القراءة والكتابة بثلاث لغات.", ["Non parlare e mangiare allo stesso tempo.", "Tornerò tra un'ora.", "Loro giocano e vincono sempre."])
        ],
        listeningExercises: [
            listeningExercise("pensare", "استخدام العقل للتفكير في شيء ما.", ["mangiare", "dormire", "parlare"]),
            listeningExercise("amare", "الشعور بالحب أو المودة القوية.", ["odiare", "avere", "essere"])
        ]
    },
    adjectives: {
        words: [
            { word: "buono", translation: "جيد", pronunciation: "بوونو", emoji: "👍" },
            { word: "cattivo", translation: "سيء", pronunciation: "كاتّيڤو", emoji: "👎" },
            { word: "nuovo", translation: "جديد", pronunciation: "نووڤو", emoji: "✨" },
            { word: "vecchio", translation: "قديم/عجوز", pronunciation: "ڤيكّيو", emoji: "📜" },
            { word: "grande", translation: "كبير", pronunciation: "غراندي", emoji: "🐘" },
            { word: "piccolo", translation: "صغير", pronunciation: "پيكّولو", emoji: "🐭" },
            { word: "lungo", translation: "طويل", pronunciation: "لونغو", emoji: "📏" },
            { word: "corto", translation: "قصير", pronunciation: "كورتو", emoji: "📏" },
            { word: "alto", translation: "عالي/طويل", pronunciation: "آلتو", emoji: "📈" },
            { word: "basso", translation: "منخفض/قصير", pronunciation: "باسّو", emoji: "📉" },
            { word: "caldo", translation: "حار", pronunciation: "كالدو", emoji: "🔥" },
            { word: "freddo", translation: "بارد", pronunciation: "فريدّو", emoji: "❄️" },
            { word: "felice", translation: "سعيد", pronunciation: "فيليتشي", emoji: "😄" },
            { word: "triste", translation: "حزين", pronunciation: "تريستي", emoji: "😢" },
            { word: "facile", translation: "سهل", pronunciation: "فاتشيلي", emoji: "✅" },
            { word: "difficile", translation: "صعب", pronunciation: "ديفّيتشيلي", emoji: "❌" },
            { word: "bello", translation: "جميل", pronunciation: "بيلّو", emoji: "😍" },
            { word: "brutto", translation: "قبيح", pronunciation: "بروتّو", emoji: "🤢" },
            { word: "veloce", translation: "سريع", pronunciation: "ڤيلوتشي", emoji: "🏃" },
            { word: "lento", translation: "بطيء", pronunciation: "لينتو", emoji: "🐢" },
        ],
        readingExercises: [
            readingExercise("La macchina nuova è veloce, ma la macchina vecchia è lenta.", "ابحث عن الصفات المتضادة.", "السيارة الجديدة سريعة، لكن السيارة القديمة بطيئة.", ["Questo libro è buono e quello è cattivo.", "La domanda è facile o difficile?", "Oggi fa molto caldo."]),
            readingExercise("Lei ha una bella voce e un cuore buono.", "ابحث عن الصفات الإيجابية.", "لديها صوت جميل وقلب طيب.", ["L'uomo forte aiuta l'uomo debole.", "La stanza è pulita adesso.", "La storia è lunga ma non importante."])
        ],
        listeningExercises: [
            listeningExercise("importante", "صفة لشيء ذي قيمة أو أهمية كبيرة.", ["facile", "diverso", "sbagliato"]),
            listeningExercise("felice", "الشعور بالفرح أو الرضا.", ["triste", "arrabbiato", "stanco"])
        ]
    },
    places: {
        words: [
            { word: "posto", translation: "مكان", pronunciation: "پوستو", emoji: "📍" },
            { word: "città", translation: "مدينة", pronunciation: "تشيتّا", emoji: "🏙️" },
            { word: "paese", translation: "دولة/قرية", pronunciation: "پاييزي", emoji: "🇮🇹" },
            { word: "mondo", translation: "عالم", pronunciation: "موندو", emoji: "🌍" },
            { word: "scuola", translation: "مدرسة", pronunciation: "سكوولا", emoji: "🏫" },
            { word: "università", translation: "جامعة", pronunciation: "اونيڤيرسيتا", emoji: "🎓" },
            { word: "ospedale", translation: "مستشفى", pronunciation: "أوسپيدالي", emoji: "🏥" },
            { word: "ristorante", translation: "مطعم", pronunciation: "ريستورانتي", emoji: "🍔" },
            { word: "albergo", translation: "فندق", pronunciation: "آلبيرغو", emoji: "🏨" },
            { word: "aeroporto", translation: "مطار", pronunciation: "آيروپورتو", emoji: "✈️" },
            { word: "stazione", translation: "محطة", pronunciation: "ستاتسيوني", emoji: "🚉" },
            { word: "parco", translation: "حديقة عامة", pronunciation: "پاركو", emoji: "🌳" },
            { word: "spiaggia", translation: "شاطئ", pronunciation: "سپيادجا", emoji: "🏖️" },
            { word: "biblioteca", translation: "مكتبة", pronunciation: "بيبليوتيكا", emoji: "📚" },
            { word: "banca", translation: "بنك", pronunciation: "بانكا", emoji: "🏦" },
            { word: "ufficio", translation: "مكتب", pronunciation: "اوفّيتشو", emoji: "🏢" },
            { word: "strada", translation: "شارع/طريق", pronunciation: "سترادا", emoji: "🛣️" },
            { word: "fattoria", translation: "مزرعة", pronunciation: "فاتّوريا", emoji: "🚜" },
            { word: "foresta", translation: "غابة", pronunciation: "فوريستا", emoji: "🌲" },
            { word: "montagna", translation: "جبل", pronunciation: "مونتانيا", emoji: "⛰️" },
            { word: "fiume", translation: "نهر", pronunciation: "فيومي", emoji: "🏞️" },
            { word: "mare", translation: "بحر", pronunciation: "ماري", emoji: "🌊" },
            { word: "edificio", translation: "مبنى", pronunciation: "إيديفيتشو", emoji: "🏢" },
            { word: "chiesa", translation: "كنيسة", pronunciation: "كييزا", emoji: "⛪" },
            { word: "moschea", translation: "مسجد", pronunciation: "موسكيا", emoji: "🕌" },
        ],
        readingExercises: [
            readingExercise("Vado a scuola in autobus, e poi vado in biblioteca.", "ابحث عن أماكن التعلم.", "أذهب إلى المدرسة بالحافلة، ثم أذهب إلى المكتبة.", ["L'ospedale è accanto alla banca.", "C'è un buon ristorante in questa città?", "Abitiamo in un appartamento in un grande edificio."]),
            readingExercise("In estate, ci piace andare in spiaggia o al parco.", "ابحث عن أماكن الترفيه الصيفية.", "في الصيف، نحب أن نذهب إلى الشاطئ أو الحديقة.", ["L'aeroporto è lontano dal centro della città.", "C'è un nuovo mercato nella strada successiva.", "L'albergo si trova sul fiume."])
        ],
        listeningExercises: [
            listeningExercise("ospedale", "المكان الذي تذهب إليه عندما تكون مريضاً.", ["scuola", "albergo", "banca"]),
            listeningExercise("città", "مكان كبير به الكثير من الناس والمباني.", ["paese", "fattoria", "mondo"])
        ]
    },
    nature: {
        words: [
            { word: "natura", translation: "طبيعة", pronunciation: "ناتورا", emoji: "🏞️" },
            { word: "albero", translation: "شجرة", pronunciation: "آلبيرو", emoji: "🌳" },
            { word: "fiore", translation: "زهرة", pronunciation: "فيوري", emoji: "🌸" },
            { word: "pianta", translation: "نبات", pronunciation: "پيانتا", emoji: "🌱" },
            { word: "erba", translation: "عشب", pronunciation: "إيربا", emoji: "🌿" },
            { word: "luna", translation: "قمر", pronunciation: "لونا", emoji: "🌙" },
            { word: "stella", translation: "نجمة", pronunciation: "ستيلّا", emoji: "⭐" },
            { word: "cielo", translation: "سماء", pronunciation: "تشيلو", emoji: "☁️" },
            { word: "fuoco", translation: "نار", pronunciation: "فووكو", emoji: "🔥" },
            { word: "terra", translation: "أرض", pronunciation: "تيرّا", emoji: "🌍" },
            { word: "aria", translation: "هواء", pronunciation: "آريا", emoji: "💨" },
            { word: "ghiaccio", translation: "جليد", pronunciation: "غياتشو", emoji: "🧊" },
            { word: "oceano", translation: "محيط", pronunciation: "أوتشيانو", emoji: "🌊" },
            { word: "lago", translation: "بحيرة", pronunciation: "لاغو", emoji: "🏞️" },
            { word: "collina", translation: "تل", pronunciation: "كولّينا", emoji: "🌄" },
            { word: "isola", translation: "جزيرة", pronunciation: "إيزولا", emoji: "🏝️" },
            { word: "deserto", translation: "صحراء", pronunciation: "ديزيرتو", emoji: "🏜️" },
            { word: "animale", translation: "حيوان", pronunciation: "أنيمالي", emoji: "🐾" },
            { word: "cane", translation: "كلب", pronunciation: "كاني", emoji: "🐕" },
            { word: "gatto", translation: "قطة", pronunciation: "غاتّو", emoji: "🐈" },
            { word: "uccello", translation: "طائر", pronunciation: "اوتشيلّو", emoji: "🐦" },
            { word: "roccia", translation: "صخرة", pronunciation: "روتشا", emoji: "🪨" },
            { word: "sabbia", translation: "رمل", pronunciation: "سابّيا", emoji: "🏖️" },
        ],
        readingExercises: [
            readingExercise("Il sole è nel cielo, e il pesce è nel mare.", "ابحث عن مكونات السماء والبحر.", "الشمس في السماء، والسمكة في البحر.", ["La montagna è alta e il fiume è lungo.", "Gli alberi sono verdi nella foresta.", "Mi piace il suono della pioggia e del vento."]),
            readingExercise("Un piccolo uccello siede su un grande albero.", "ابحث عن الكائن الصغير والكبير.", "طائر صغير يجلس على شجرة كبيرة.", ["Il gatto gioca con la palla.", "I fiori sono belli in primavera.", "Il deserto è caldo e secco."])
        ],
        listeningExercises: [
            listeningExercise("albero", "نبات كبير له جذع وأغصان.", ["fiore", "erba", "montagna"]),
            listeningExercise("acqua", "سائل شفاف ضروري للحياة.", ["fuoco", "aria", "sabbia"])
        ]
    },
    hobbies: {
        words: [
            { word: "hobby", translation: "هواية", pronunciation: "أوبّي", emoji: "🎨" },
            { word: "lettura", translation: "قراءة", pronunciation: "ليتّورا", emoji: "📖" },
            { word: "scrittura", translation: "كتابة", pronunciation: "سكريتّورا", emoji: "✍️" },
            { word: "musica", translation: "موسيقى", pronunciation: "موزيكا", emoji: "🎵" },
            { word: "arte", translation: "فن", pronunciation: "آرتي", emoji: "🖼️" },
            { word: "disegno", translation: "رسم", pronunciation: "ديزينيو", emoji: "✏️" },
            { word: "pittura", translation: "تلوين", pronunciation: "پيتّورا", emoji: "🎨" },
            { word: "sport", translation: "رياضة", pronunciation: " سپورت", emoji: "⚽" },
            { word: "nuoto", translation: "سباحة", pronunciation: "نووتو", emoji: "🏊" },
            { word: "corsa", translation: "جري", pronunciation: "كورسا", emoji: "🏃" },
            { word: "cucinare", translation: "طبخ", pronunciation: "كوتشيناري", emoji: "🍳" },
            { word: "guardare film", translation: "مشاهدة أفلام", pronunciation: "غوارداری فيلم", emoji: "🎬" },
            { word: "giocare ai videogiochi", translation: "لعب ألعاب", pronunciation: "جوكاري آي فيديوجوكي", emoji: "🎮" },
            { word: "viaggiare", translation: "سفر", pronunciation: "ڤيادجاري", emoji: "✈️" },
            { word: "ballare", translation: "رقص", pronunciation: "بالّاري", emoji: "💃" },
            { word: "cantare", translation: "غناء", pronunciation: "كانتاري", emoji: "🎤" },
            { word: "fotografia", translation: "تصوير فوتوغرافي", pronunciation: "فوتوغرافيا", emoji: "📸" },
            { word: "giardinaggio", translation: "بستنة", pronunciation: "جاردينادجو", emoji: "🪴" },
        ],
        readingExercises: [
            readingExercise("Il mio hobby è leggere libri e ascoltare musica.", "ابحث عن الهوايات المذكورة.", "هوايتي هي قراءة الكتب والاستماع للموسيقى.", ["A lui piace fare sport e nuotare.", "Lei è brava a cucinare e a disegnare.", "Ti piace viaggiare e giocare ai videogiochi?"]),
            readingExercise("Guardare film è divertente, ma preferisco correre fuori.", "ابحث عن الهواية الداخلية والخارجية.", "مشاهدة الأفلام ممتعة، لكني أفضل الجري في الخارج.", ["Cantare e ballare richiedono talento.", "La scrittura è un hobby creativo.", "La fotografia cattura bei momenti."])
        ],
        listeningExercises: [
            listeningExercise("musica", "فن تنظيم الأصوات في الوقت المناسب.", ["arte", "sport", "lettura"]),
            listeningExercise("cucinare", "تحضير الطعام عن طريق تسخينه.", ["nuoto", "scrittura", "viaggiare"])
        ]
    },
    emotions: {
        words: [
            { word: "emozione", translation: "شعور", pronunciation: "إيموتسيوني", emoji: "❤️" },
            { word: "felice", translation: "سعيد", pronunciation: "فيليتشي", emoji: "😄" },
            { word: "triste", translation: "حزين", pronunciation: "تريستي", emoji: "😢" },
            { word: "arrabbiato", translation: "غاضب", pronunciation: "آرّابّياتو", emoji: "😠" },
            { word: "sorpreso", translation: "متفاجئ", pronunciation: "سورپريزو", emoji: "😲" },
            { word: "spaventato", translation: "خائف", pronunciation: "سپاڤينتاتو", emoji: "😨" },
            { word: "stanco", translation: "متعب", pronunciation: "ستانكو", emoji: "😴" },
            { word: "annoiato", translation: "ملل", pronunciation: "آنّوياتو", emoji: "😒" },
            { word: "eccitato", translation: "متحمس", pronunciation: "إيتشيتاتو", emoji: "🤩" },
            { word: "amore", translation: "حب", pronunciation: "آموري", emoji: "❤️" },
            { word: "odio", translation: "كره", pronunciation: "أوديو", emoji: "💔" },
            { word: "speranza", translation: "أمل", pronunciation: "سپيرانسا", emoji: "🙏" },
            { word: "paura", translation: "خوف", pronunciation: "پاورا", emoji: "😨" },
            { word: "gioia", translation: "فرح", pronunciation: "جويا", emoji: "😊" },
            { word: "orgoglioso", translation: "فخور", pronunciation: "أورغوليووزو", emoji: "ภูมิใจ" },
            { word: "timido", translation: "خجول", pronunciation: "تيميدو", emoji: "😊" },
            { word: "calmo", translation: "هادئ", pronunciation: "كالما", emoji: "😌" },
            { word: "preoccupato", translation: "قلق", pronunciation: "پريوكّوپاتو", emoji: "😟" },
        ],
        readingExercises: [
            readingExercise("Mi sento felice quando vedo i miei amici, ma sono triste di andarmene.", "ابحث عن المشاعر المتضادة.", "أشعر بالسعادة عندما أرى أصدقائي، لكني حزين للمغادرة.", ["Lui è arrabbiato perché sono in ritardo.", "Non avere paura, andrà tutto bene.", "Sono molto eccitato per il viaggio."]),
            readingExercise("È rimasta sorpresa dal regalo e ha provato una grande gioia.", "ابحث عن المشاعر الإيجابية.", "لقد تفاجأت بالهدية وشعرت بفرح كبير.", ["Il bambino è stanco e vuole dormire.", "Sono orgoglioso del tuo successo.", "Non preoccuparti, stai calmo."])
        ],
        listeningExercises: [
            listeningExercise("arrabbiato", "الشعور أو إظهار الاستياء الشديد.", ["felice", "triste", "stanco"]),
            listeningExercise("amore", "شعور عميق بالمودة والمحبة.", ["odio", "paura", "speranza"])
        ]
    },
    work: {
        words: [
            { word: "Lavoro", translation: "عمل", pronunciation: "لاڤورو", emoji: "🏢" },
            { word: "Impiego", translation: "وظيفة", pronunciation: "إيمپييغو", emoji: "💼" },
            { word: "Ufficio", translation: "مكتب", pronunciation: "اوفّيتشو", emoji: "🏢" },
            { word: "Azienda", translation: "شركة", pronunciation: "آدزيندا", emoji: "🏭" },
            { word: "Manager", translation: "مدير", pronunciation: "ماناجير", emoji: "👨‍💼" },
            { word: "Impiegato", translation: "موظف", pronunciation: "إيمپييغاتو", emoji: "🧑‍💼" },
            { word: "Collega", translation: "زميل", pronunciation: "كولّيغا", emoji: "👥" },
            { word: "Stipendio", translation: "راتب", pronunciation: "ستيپينديو", emoji: "💵" },
            { word: "Riunione", translation: "اجتماع", pronunciation: "ريونيوني", emoji: "🤝" },
            { word: "Email", translation: "بريد إلكتروني", pronunciation: "إيميل", emoji: "📧" },
            { word: "Computer", translation: "حاسوب", pronunciation: "كومپيوتر", emoji: "💻" },
            { word: "Telefono", translation: "هاتف", pronunciation: "تيليفونو", emoji: "📱" },
            { word: "Progetto", translation: "مشروع", pronunciation: "پروجيتّو", emoji: "📈" },
            { word: "Scadenza", translation: "موعد نهائي", pronunciation: "سكادينتسا", emoji: "⏳" },
            { word: "Compito", translation: "مهمة", pronunciation: "كومپيتو", emoji: "📋" },
            { word: "Carriera", translation: "مهنة", pronunciation: "كارّييرا", emoji: "🚀" },
        ],
        readingExercises: [
            readingExercise("Il manager ha una riunione in ufficio.", "ابحث عن كلمات 'manager', 'riunione', 'ufficio'.", "المدير لديه اجتماع في المكتب.", ["L'impiegato lavora al computer.", "Lo stipendio per questo impiego è buono.", "Ti ho inviato un'email."]),
            readingExercise("Il mio collega mi ha aiutato a finire il progetto prima della scadenza.", "ابحث عن كلمات العمل الجماعي والوقت.", "زميلي ساعدني في إنهاء المشروع قبل الموعد النهائي.", ["Uso il mio telefono per controllare le email.", "Questo compito è molto difficile.", "Ti auguro una carriera di successo."])
        ],
        listeningExercises: [
            listeningExercise("Ufficio", "مكان العمل المكتبي.", ["Albergo", "Scuola", "Aeroporto"]),
            listeningExercise("Computer", "جهاز إلكتروني لمعالجة البيانات.", ["Telefono", "Libro", "Penna"])
        ]
    },
    travel: {
        words: [
            { word: "Viaggio", translation: "سفر", pronunciation: "ڤيادجو", emoji: "🌍" },
            { word: "Vacanza", translation: "عطلة", pronunciation: "ڤاكانتسا", emoji: "🏖️" },
            { word: "Aeroporto", translation: "مطار", pronunciation: "آيروپورتو", emoji: "✈️" },
            { word: "Aereo", translation: "طائرة", pronunciation: "آيريو", emoji: "✈️" },
            { word: "Passaporto", translation: "جواز سفر", pronunciation: "پاسّاپورتو", emoji: "🛂" },
            { word: "Biglietto", translation: "تذكرة", pronunciation: "بيلييتّو", emoji: "🎟️" },
            { word: "Albergo", translation: "فندق", pronunciation: "آلبيرغو", emoji: "🏨" },
            { word: "Treno", translation: "قطار", pronunciation: "ترينو", emoji: "🚆" },
            { word: "Macchina", translation: "سيارة", pronunciation: "ماكّينا", emoji: "🚗" },
            { word: "Autobus", translation: "حافلة", pronunciation: "آوتوبوس", emoji: "🚌" },
            { word: "Taxi", translation: "سيارة أجرة", pronunciation: "تاكسي", emoji: "🚕" },
            { word: "Mappa", translation: "خريطة", pronunciation: "ماپّا", emoji: "🗺️" },
            { word: "Valigia", translation: "حقيبة سفر", pronunciation: "ڤاليجا", emoji: "🧳" },
            { word: "Bagaglio", translation: "أمتعة", pronunciation: "باغاليو", emoji: "🧳" },
            { word: "Turista", translation: "سائح", pronunciation: "توريستا", emoji: "📸" },
            { word: "Destinazione", translation: "وجهة", pronunciation: "ديستيناتسيوني", emoji: "📍" },
        ],
        readingExercises: [
            readingExercise("Ho bisogno di un passaporto e di un biglietto per l'aereo.", "ترجم الكلمات 'passaporto', 'biglietto', و 'aereo'.", "أحتاج جواز سفر وتذكرة للطائرة.", ["L'albergo è vicino alla stazione dei treni.", "È questa la tua macchina nuova?", "Non dimenticare la mappa e la valigia."]),
            readingExercise("La nostra destinazione è una bellissima isola per la vacanza.", "ابحث عن مكان ونوع الرحلة.", "وجهتنا هي جزيرة جميلة لقضاء العطلة.", ["Il turista scatta molte foto.", "Il mio bagaglio è molto pesante.", "Prenderò un taxi per l'aeroporto."])
        ],
        listeningExercises: [
            listeningExercise("Passaporto", "وثيقة رسمية للسفر الدولي.", ["Biglietto", "Valigia", "Albergo"]),
            listeningExercise("Macchina", "وسيلة نقل خاصة بأربع عجلات.", ["Autobus", "Treno", "Aereo"])
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
