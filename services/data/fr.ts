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

export const FRENCH_CONTENT: { [categoryName: string]: CategoryContent; } = {
    alphabet: {
        words: [
            { word: "a", translation: "آ", pronunciation: "/a/", emoji: "✈️" },
            { word: "b", translation: "بيه", pronunciation: "/be/", emoji: "🎈" },
            { word: "c", translation: "سيه", pronunciation: "/se/", emoji: "🍰" },
            { word: "d", translation: "ديه", pronunciation: "/de/", emoji: "🎲" },
            { word: "e", translation: "أو", pronunciation: "/ə/", emoji: "🐘" },
            { word: "f", translation: "إف", pronunciation: "/ɛf/", emoji: "🌸" },
            { word: "g", translation: "جيه", pronunciation: "/ʒe/", emoji: "🦒" },
            { word: "h", translation: "آش", pronunciation: "(صامت)", emoji: "🏨" },
            { word: "i", translation: "إي", pronunciation: "/i/", emoji: "🏝️" },
            { word: "j", translation: "جي", pronunciation: "/ʒi/", emoji: " Jardin" },
            { word: "k", translation: "كا", pronunciation: "/ka/", emoji: "🥝" },
            { word: "l", translation: "إل", pronunciation: "/ɛl/", emoji: "🌙" },
            { word: "m", translation: "إم", pronunciation: "/ɛm/", emoji: " Maison" },
            { word: "n", translation: "إن", pronunciation: "/ɛn/", emoji: "👃" },
            { word: "o", translation: "أو", pronunciation: "/o/", emoji: "🍊" },
            { word: "p", translation: "پيه", pronunciation: "/pe/", emoji: "🐧" },
            { word: "q", translation: "كو", pronunciation: "/ky/", emoji: "👑" },
            { word: "r", translation: "إر", pronunciation: "/ɛʁ/", emoji: "🤖" },
            { word: "s", translation: "إس", pronunciation: "/ɛs/", emoji: "☀️" },
            { word: "t", translation: "تيه", pronunciation: "/te/", emoji: "🐢" },
            { word: "u", translation: "أو", pronunciation: "/y/", emoji: "🍇" },
            { word: "v", translation: "ڤيه", pronunciation: "/ve/", emoji: "🎻" },
            { word: "w", translation: "دوبل ڤيه", pronunciation: "/dublə ve/", emoji: " Wagon" },
            { word: "x", translation: "إكس", pronunciation: "/iks/", emoji: " xylophone" },
            { word: "y", translation: "إيغريك", pronunciation: "/iɡʁɛk/", emoji: " yogurt" },
            { word: "z", translation: "زد", pronunciation: "/zɛd/", emoji: "🦓" },
            { word: "é", translation: "أو (accent aigu)", pronunciation: "/e/", emoji: " école" },
            { word: "è", translation: "إي (accent grave)", pronunciation: "/ɛ/", emoji: " mère" },
            { word: "ç", translation: "س (cédille)", pronunciation: "/s/", emoji: " garçon" },
        ],
        readingExercises: [
            readingExercise("leçon (lesson)", "Notice the cédille on 'ç'.", "درس", ["lecon", "leson", "lekon"]),
            readingExercise("père (father)", "Notice the accent grave on 'è'.", "أب", ["pere", "pére", "perè"])
        ],
        listeningExercises: [
            listeningExercise("a", "The first letter.", ["b", "e", "o"]),
            listeningExercise("z", "The last letter.", ["s", "t", "y"])
        ]
    },
    basics: {
        words: [
            { word: "Je", translation: "أنا", pronunciation: "جو", emoji: "👤" },
            { word: "Tu", translation: "أنت", pronunciation: "تو", emoji: "👥" },
            { word: "Il/Elle", translation: "هو/هي", pronunciation: "إيل/إل", emoji: "🧑" },
            { word: "Nous", translation: "نحن", pronunciation: "نو", emoji: "👨‍👩‍👧‍👦" },
            { word: "Vous", translation: "أنتم", pronunciation: "ڤو", emoji: "👨‍👩‍👧‍👦" },
            { word: "Ils/Elles", translation: "هم/هن", pronunciation: "إيل/إل", emoji: "👨‍👩‍👧‍👦" },
            { word: "Quoi", translation: "ماذا", pronunciation: "كوا", emoji: "❓" },
            { word: "Qui", translation: "من", pronunciation: "كي", emoji: "❓" },
            { word: "Où", translation: "أين", pronunciation: "أوو", emoji: "📍" },
            { word: "Quand", translation: "متى", pronunciation: "كون", emoji: "⏰" },
            { word: "Pourquoi", translation: "لماذا", pronunciation: "بوركوا", emoji: "🤔" },
            { word: "Comment", translation: "كيف", pronunciation: "كومون", emoji: "🤔" },
            { word: "Oui", translation: "نعم", pronunciation: "وي", emoji: "👍" },
            { word: "Non", translation: "لا", pronunciation: "نون", emoji: "👎" },
            { word: "Peut-être", translation: "ربما", pronunciation: "بوت-إيتر", emoji: "🤷" },
            { word: "S'il vous plaît", translation: "من فضلك", pronunciation: "سيل ڤو بليه", emoji: "🙏" },
            { word: "Merci", translation: "شكراً", pronunciation: "ميرسي", emoji: "😊" },
            { word: "Désolé(e)", translation: "آسف(ة)", pronunciation: "ديزوليه", emoji: "😔" },
            { word: "Pardon", translation: "اعذرني", pronunciation: "باردون", emoji: "✋" },
            { word: "Et", translation: "و", pronunciation: "إيه", emoji: "&" },
            { word: "Mais", translation: "لكن", pronunciation: "ميه", emoji: "↔️" },
            { word: "Ou", translation: "أو", pronunciation: "أوو", emoji: "🤷‍♀️" },
            { word: "Parce que", translation: "لأن", pronunciation: "بارس-كو", emoji: "👉" },
        ],
        readingExercises: [
            readingExercise("Je suis content aujourd'hui, mais il fait très froid.", "ابحث عن ترجمة 'content' و 'froid'.", "أنا سعيد اليوم، لكن الجو بارد جداً.", ["Il est triste parce qu'il fait chaud.", "Ça va ? Oui, merci.", "C'est facile et ça c'est difficile."]),
            readingExercise("La grande maison a un petit jardin.", "ترجم 'grande maison' و 'petit jardin'.", "البيت الكبير له حديقة صغيرة.", ["Le chat boit du lait.", "Pouvez-vous m'aider ?", "C'est mon livre."])
        ],
        listeningExercises: [
            listeningExercise("Merci", "كلمة شائعة لإظهار الامتنان.", ["Désolé", "S'il vous plaît", "Bonjour"]),
            listeningExercise("Bonjour", "تحية تقال في الصباح.", ["Bonne nuit", "Au revoir", "Salut"])
        ]
    },
    greetings: {
        words: [
            { word: "Bonjour", translation: "صباح الخير/مرحباً", pronunciation: "بون-جور", emoji: "☀️" },
            { word: "Salut", translation: "أهلاً", pronunciation: "سالو", emoji: "👋" },
            { word: "Bonsoir", translation: "مساء الخير", pronunciation: "بون-سوار", emoji: "🌃" },
            { word: "Bonne nuit", translation: "تصبح على خير", pronunciation: "بون نوي", emoji: "🌙" },
            { word: "Au revoir", translation: "مع السلامة", pronunciation: "أو ريڤوار", emoji: "👋" },
            { word: "À bientôt", translation: "أراك قريباً", pronunciation: "آ بيان-تو", emoji: "👀" },
            { word: "Comment ça va ?", translation: "كيف حالك؟", pronunciation: "كومون سا ڤا؟", emoji: "❓" },
            { word: "Ça va bien, merci.", translation: "أنا بخير، شكراً.", pronunciation: "سا ڤا بيان، ميرسي", emoji: "😊" },
            { word: "Et toi ?", translation: "وأنت؟", pronunciation: "إيه توا؟", emoji: "❓" },
            { word: "Comment tu t'appelles ?", translation: "ما اسمك؟", pronunciation: "كومون تو ت'ابيل؟", emoji: "❓" },
            { word: "Je m'appelle...", translation: "اسمي هو...", pronunciation: "جو م'ابيل...", emoji: "🏷️" },
            { word: "Enchanté(e)", translation: "سررت بلقائك.", pronunciation: "أون-شون-تيه", emoji: "🤝" },
            { word: "Bienvenue", translation: "أهلاً بك", pronunciation: "بيان-ڤينو", emoji: "🎉" },
        ],
        readingExercises: [
            readingExercise("Bonjour, comment ça va ?", "ابحث عن التحية الصباحية والسؤال عن الحال.", "صباح الخير، كيف حالك؟", ["Bonne nuit, à demain.", "Comment tu t'appelles et d'où viens-tu ?", "Je vais bien, merci."]),
            readingExercise("Comment tu t'appelles ? Je m'appelle Ahmed.", "ابحث عن السؤال عن الاسم والإجابة.", "ما اسمك؟ اسمي أحمد.", ["Comment ça va ? Ça va bien.", "D'où viens-tu ? Je viens d'Égypte.", "Enchanté."])
        ],
        listeningExercises: [
            listeningExercise("Comment tu t'appelles ?", "سؤال للاستفسار عن اسم الشخص.", ["Comment ça va ?", "Au revoir", "Bonjour"]),
            listeningExercise("Enchanté", "عبارة تقال عند مقابلة شخص لأول مرة.", ["Merci", "Salut", "Désolé"])
        ]
    },
    numbers: {
        words: [
            { word: "Zéro", translation: "صفر", pronunciation: "زيرو", emoji: "0️⃣" },
            { word: "Un", translation: "واحد", pronunciation: "آن", emoji: "1️⃣" },
            { word: "Deux", translation: "اثنان", pronunciation: "دو", emoji: "2️⃣" },
            { word: "Trois", translation: "ثلاثة", pronunciation: "تروا", emoji: "3️⃣" },
            { word: "Quatre", translation: "أربعة", pronunciation: "كاتر", emoji: "4️⃣" },
            { word: "Cinq", translation: "خمسة", pronunciation: "سانك", emoji: "5️⃣" },
            { word: "Six", translation: "ستة", pronunciation: "سيس", emoji: "6️⃣" },
            { word: "Sept", translation: "سبعة", pronunciation: "سيت", emoji: "7️⃣" },
            { word: "Huit", translation: "ثمانية", pronunciation: "ويت", emoji: "8️⃣" },
            { word: "Neuf", translation: "تسعة", pronunciation: "نوف", emoji: "9️⃣" },
            { word: "Dix", translation: "عشرة", pronunciation: "ديس", emoji: "🔟" },
            { word: "Onze", translation: "أحد عشر", pronunciation: "أونز", emoji: "1️⃣1️⃣" },
            { word: "Douze", translation: "اثنا عشر", pronunciation: "دوز", emoji: "1️⃣2️⃣" },
            { word: "Vingt", translation: "عشرون", pronunciation: "ڤان", emoji: "2️⃣0️⃣" },
            { word: "Trente", translation: "ثلاثون", pronunciation: "ترونت", emoji: "3️⃣0️⃣" },
            { word: "Quarante", translation: "أربعون", pronunciation: "كارونت", emoji: "4️⃣0️⃣" },
            { word: "Cinquante", translation: "خمسون", pronunciation: "سانكونت", emoji: "5️⃣0️⃣" },
            { word: "Cent", translation: "مئة", pronunciation: "صون", emoji: "💯" },
            { word: "Mille", translation: "ألف", pronunciation: "ميل", emoji: "1️⃣0️⃣0️⃣0️⃣" },
        ],
        readingExercises: [
            readingExercise("J'ai deux mains et dix doigts.", "ابحث عن الأرقام 2 و 10.", "لدي يدان وعشرة أصابع.", ["J'ai trois livres et cinq stylos.", "Peux-tu compter de un à dix ?", "Il a huit ans."]),
            readingExercise("Il y a cinquante étoiles sur le drapeau.", "ابحث عن الرقم 50.", "يوجد خمسون نجمة على العلم.", ["J'ai vingt dollars.", "Les cent premiers jours sont importants.", "Un plus deux égale trois."])
        ],
        listeningExercises: [
            listeningExercise("Cinq", "الرقم الذي يأتي بعد أربعة.", ["Quatre", "Un", "Dix"]),
            listeningExercise("Vingt", "ضعف الرقم عشرة.", ["Douze", "Deux", "Dix"])
        ]
    },
    colors: {
        words: [
            { word: "Couleur", translation: "لون", pronunciation: "كولور", emoji: "🎨" },
            { word: "Rouge", translation: "أحمر", pronunciation: "روج", emoji: "🔴" },
            { word: "Vert", translation: "أخضر", pronunciation: "ڤير", emoji: "🟢" },
            { word: "Bleu", translation: "أزرق", pronunciation: "بلو", emoji: "🔵" },
            { word: "Jaune", translation: "أصفر", pronunciation: "جون", emoji: "🟡" },
            { word: "Noir", translation: "أسود", pronunciation: "نوار", emoji: "⚫" },
            { word: "Blanc", translation: "أبيض", pronunciation: "بلون", emoji: "⚪" },
            { word: "Orange", translation: "برتقالي", pronunciation: "أورانج", emoji: "🟠" },
            { word: "Violet", translation: "بنفسجي", pronunciation: "ڤيوليه", emoji: "🟣" },
            { word: "Marron", translation: "بني", pronunciation: "مارون", emoji: "🟤" },
            { word: "Rose", translation: "وردي", pronunciation: "روز", emoji: "🌸" },
            { word: "Gris", translation: "رمادي", pronunciation: "غري", emoji: "🐘" },
        ],
        readingExercises: [
            readingExercise("Le ciel est bleu et l'herbe est verte.", "ركز على ترجمة 'bleu' و 'verte'.", "السماء زرقاء والعشب أخضر.", ["La pomme est rouge et la banane est jaune.", "J'aime le noir et le blanc.", "Sa nouvelle voiture est rouge."]),
            readingExercise("Elle a une robe rose et des chaussures blanches.", "ابحث عن 'rose' و 'blanches'.", "لديها فستان وردي وحذاء أبيض.", ["Le chat est noir et le chien est marron.", "Aimes-tu la couleur violette ?", "L'or et l'argent sont des métaux précieux."])
        ],
        listeningExercises: [
            listeningExercise("Rouge", "لون الدم أو الفراولة.", ["Bleu", "Vert", "Jaune"]),
            listeningExercise("Noir", "عكس اللون الأبيض.", ["Blanc", "Bleu", "Gris"])
        ]
    },
    family: {
        words: [
            { word: "Famille", translation: "عائلة", pronunciation: "فامي", emoji: "👨‍👩‍👧‍👦" },
            { word: "Père", translation: "أب", pronunciation: "پير", emoji: "👨" },
            { word: "Mère", translation: "أم", pronunciation: "مير", emoji: "👩" },
            { word: "Parents", translation: "والدين", pronunciation: "پارون", emoji: "👨‍👩‍👧" },
            { word: "Fils", translation: "ابن", pronunciation: "فيس", emoji: "👦" },
            { word: "Fille", translation: "ابنة", pronunciation: "في", emoji: "👧" },
            { word: "Enfant", translation: "طفل", pronunciation: "أونفون", emoji: "👶" },
            { word: "Frère", translation: "أخ", pronunciation: "فرير", emoji: "👱‍♂️" },
            { word: "Sœur", translation: "أخت", pronunciation: "سور", emoji: "👱‍♀️" },
            { word: "Grand-père", translation: "جد", pronunciation: "غرون-پير", emoji: "👴" },
            { word: "Grand-mère", translation: "جدة", pronunciation: "غرون-مير", emoji: "👵" },
            { word: "Oncle", translation: "عم/خال", pronunciation: "أونكل", emoji: "👨‍" },
            { word: "Tante", translation: "عمة/خالة", pronunciation: "تونت", emoji: "👩‍" },
            { word: "Cousin/Cousine", translation: "ابن/بنت العم/الخال", pronunciation: "كوزان/كوزين", emoji: "🧑" },
            { word: "Mari", translation: "زوج", pronunciation: "ماري", emoji: "🤵" },
            { word: "Femme", translation: "زوجة", pronunciation: "فام", emoji: "👰" },
        ],
        readingExercises: [
            readingExercise("Mon père et ma mère sont mes parents.", "ابحث عن ترجمة 'père', 'mère', و 'parents'.", "أبي وأمي هما والديّ.", ["Mon frère et ma sœur jouent ensemble.", "Mon grand-père et ma grand-mère vivent dans une grande maison.", "Ceci est mon fils et ceci est ma fille."]),
            readingExercise("Ma sœur est plus jeune que mon frère.", "ركز على المقارنة بين 'sœur' و 'frère'.", "أختي أصغر من أخي.", ["Ma famille est très grande.", "Mon cousin habite dans une autre ville.", "Mon grand-père aime lire."])
        ],
        listeningExercises: [
            listeningExercise("Frère", "شقيق ذكر.", ["Sœur", "Père", "Mère"]),
            listeningExercise("Mère", "الكلمة الفرنسية التي تعني 'أم'.", ["Père", "Fille", "Fils"])
        ]
    },
    food: {
        words: [
            { word: "Nourriture", translation: "طعام", pronunciation: "نوريتور", emoji: "🍔" },
            { word: "Boisson", translation: "شراب", pronunciation: "بواسون", emoji: "🥤" },
            { word: "Eau", translation: "ماء", pronunciation: "أو", emoji: "💧" },
            { word: "Café", translation: "قهوة", pronunciation: "كافيه", emoji: "☕" },
            { word: "Thé", translation: "شاي", pronunciation: "تيه", emoji: "🍵" },
            { word: "Jus", translation: "عصير", pronunciation: "جو", emoji: "🧃" },
            { word: "Lait", translation: "حليب", pronunciation: "ليه", emoji: "🥛" },
            { word: "Pain", translation: "خبز", pronunciation: "پان", emoji: "🍞" },
            { word: "Fromage", translation: "جبن", pronunciation: "فروماج", emoji: "🧀" },
            { word: "Riz", translation: "أرز", pronunciation: "ري", emoji: "🍚" },
            { word: "Poulet", translation: "دجاج", pronunciation: "بوليه", emoji: "🍗" },
            { word: "Viande", translation: "لحم", pronunciation: "ڤيوند", emoji: "🥩" },
            { word: "Poisson", translation: "سمك", pronunciation: "بواسون", emoji: "🐟" },
            { word: "Fruit", translation: "فاكهة", pronunciation: "فروي", emoji: "🍎" },
            { word: "Pomme", translation: "تفاحة", pronunciation: "پوم", emoji: "🍎" },
            { word: "Banane", translation: "موزة", pronunciation: "بانان", emoji: "🍌" },
            { word: "Orange", translation: "برتقالة", pronunciation: "أورانج", emoji: "🍊" },
            { word: "Légume", translation: "خضروات", pronunciation: "ليغوم", emoji: "🥕" },
            { word: "Carotte", translation: "جزرة", pronunciation: "كاروت", emoji: "🥕" },
            { word: "Pomme de terre", translation: "بطاطس", pronunciation: "پوم دو تير", emoji: "🥔" },
            { word: "Tomate", translation: "طماطم", pronunciation: "تومات", emoji: "🍅" },
            { word: "Sucre", translation: "سكر", pronunciation: "سوكر", emoji: "🍬" },
            { word: "Sel", translation: "ملح", pronunciation: "سيل", emoji: "🧂" },
            { word: "Petit-déjeuner", translation: "فطور", pronunciation: "بوتي-ديجونيه", emoji: "🍳" },
            { word: "Déjeuner", translation: "غداء", pronunciation: "ديجونيه", emoji: "🍱" },
            { word: "Dîner", translation: "عشاء", pronunciation: "دينيه", emoji: "🍝" },
        ],
        readingExercises: [
            readingExercise("J'ai faim. Je veux manger du pain et du fromage.", "ركز على كلمتي 'pain' و 'fromage'.", "أنا جائع. أريد أن آكل الخبز والجبن.", ["J'ai soif. Je veux boire de l'eau.", "La nourriture est délicieuse.", "Puis-je avoir le menu, s'il vous plaît ?"]),
            readingExercise("Pour le petit-déjeuner, j'aime le café et une pomme.", "ابحث عن طعام وشراب الفطور.", "في الفطور، أحب القهوة وتفاحة.", ["Je mange du riz et du poulet pour le déjeuner.", "Le dîner est prêt à sept heures.", "Ce jus est frais et délicieux."])
        ],
        listeningExercises: [
            listeningExercise("Pomme", "نوع من الفاكهة، غالبًا ما يكون أحمر أو أخضر.", ["Orange", "Eau", "Pain"]),
            listeningExercise("Eau", "شراب أساسي وشفاف.", ["Lait", "Jus", "Thé"])
        ]
    },
    time: {
        words: [
            { word: "Temps", translation: "وقت", pronunciation: "تون", emoji: "⏰" },
            { word: "Heure", translation: "ساعة", pronunciation: "أور", emoji: "⏳" },
            { word: "Minute", translation: "دقيقة", pronunciation: "مينوت", emoji: "⏱️" },
            { word: "Seconde", translation: "ثانية", pronunciation: "سوكوند", emoji: "⏱️" },
            { word: "Jour", translation: "يوم", pronunciation: "جور", emoji: "📅" },
            { word: "Semaine", translation: "أسبوع", pronunciation: "سومين", emoji: "🗓️" },
            { word: "Mois", translation: "شهر", pronunciation: "موا", emoji: "🈷️" },
            { word: "An", translation: "سنة", pronunciation: "آن", emoji: "🎉" },
            { word: "Lundi", translation: "الإثنين", pronunciation: "لوندي", emoji: " M" },
            { word: "Mardi", translation: "الثلاثاء", pronunciation: "ماردي", emoji: "T" },
            { word: "Mercredi", translation: "الأربعاء", pronunciation: "ميركرودي", emoji: "W" },
            { word: "Jeudi", translation: "الخميس", pronunciation: "جودي", emoji: "T" },
            { word: "Vendredi", translation: "الجمعة", pronunciation: "ڤوندرودي", emoji: "F" },
            { word: "Samedi", translation: "السبت", pronunciation: "سامدي", emoji: "S" },
            { word: "Dimanche", translation: "الأحد", pronunciation: "ديمونش", emoji: "S" },
            { word: "Aujourd'hui", translation: "اليوم", pronunciation: "أوجوردوي", emoji: "👇" },
            { word: "Demain", translation: "غداً", pronunciation: "دومان", emoji: "➡️" },
            { word: "Hier", translation: "أمس", pronunciation: "إيير", emoji: "⬅️" },
            { word: "Matin", translation: "صباح", pronunciation: "ماتان", emoji: "🌅" },
            { word: "Après-midi", translation: "بعد الظهر", pronunciation: "أبريه-ميدي", emoji: "☀️" },
            { word: "Soir", translation: "مساء", pronunciation: "سوار", emoji: "🌇" },
            { word: "Nuit", translation: "ليل", pronunciation: "نوي", emoji: "🌃" },
        ],
        readingExercises: [
            readingExercise("Aujourd'hui c'est lundi, et demain c'est mardi.", "ترجم 'Aujourd'hui', 'lundi', 'demain', 'mardi'.", "اليوم هو الإثنين، وغداً هو الثلاثاء.", ["Hier c'était dimanche.", "J'ai une réunion vendredi.", "Un mois a quatre semaines."]),
            readingExercise("La réunion est à dix heures du matin.", "ابحث عن الوقت والجزء من اليوم.", "الاجتماع في الساعة العاشرة صباحاً.", ["Je te vois ce soir.", "Attends une minute s'il te plaît.", "Une année a douze mois."])
        ],
        listeningExercises: [
            listeningExercise("Vendredi", "اليوم الذي يسبق عطلة نهاية الأسبوع.", ["Lundi", "Dimanche", "Semaine"]),
            listeningExercise("Demain", "اليوم الذي يأتي بعد اليوم.", ["Aujourd'hui", "Hier", "Jour"])
        ]
    },
    weather: {
        words: [
            { word: "Météo", translation: "الطقس", pronunciation: "ميتيو", emoji: "🌦️" },
            { word: "Soleil", translation: "شمس", pronunciation: "سولي", emoji: "☀️" },
            { word: "Ensoleillé", translation: "مشمس", pronunciation: "أونسولييه", emoji: "☀️" },
            { word: "Nuage", translation: "غيمة", pronunciation: "نواج", emoji: "☁️" },
            { word: "Nuageux", translation: "غائم", pronunciation: "نواجو", emoji: "☁️" },
            { word: "Pluie", translation: "مطر", pronunciation: "بلوي", emoji: "🌧️" },
            { word: "Pluvieux", translation: "ممطر", pronunciation: "بلويڤيو", emoji: "🌧️" },
            { word: "Vent", translation: "رياح", pronunciation: "ڤون", emoji: "💨" },
            { word: "Venteux", translation: "عاصف", pronunciation: "ڤونتو", emoji: "💨" },
            { word: "Neige", translation: "ثلج", pronunciation: "نيج", emoji: "❄️" },
            { word: "Neigeux", translation: "مثلج", pronunciation: "نيجو", emoji: "❄️" },
            { word: "Chaud", translation: "حار", pronunciation: "شو", emoji: "🌡️" },
            { word: "Froid", translation: "بارد", pronunciation: "فروا", emoji: "🥶" },
            { word: "Doux", translation: "دافئ", pronunciation: "دو", emoji: "😊" },
            { word: "Frais", translation: "معتدل البرودة", pronunciation: "فريه", emoji: "😎" },
            { word: "Orage", translation: "عاصفة", pronunciation: "أوراج", emoji: "⛈️" },
            { word: "Brouillard", translation: "ضباب", pronunciation: "برويار", emoji: "🌫️" },
        ],
        readingExercises: [
            readingExercise("Il fait ensoleillé et chaud aujourd'hui.", "ابحث عن الكلمات التي تصف الشمس والحرارة.", "الجو مشمس وحار اليوم.", ["Il fait nuageux et froid.", "Il va pleuvoir demain.", "J'aime le temps neigeux."]),
            readingExercise("En hiver, il fait froid et il neige.", "ابحث عن كلمات الشتاء.", "في الشتاء، يكون الجو بارداً ويتساقط الثلج.", ["Le vent est fort aujourd'hui.", "Prends ton parapluie, il pleut.", "Il y a du brouillard le matin."])
        ],
        listeningExercises: [
            listeningExercise("Pluvieux", "عندما يسقط الماء من السماء.", ["Ensoleillé", "Nuageux", "Venteux"]),
            listeningExercise("Froid", "عكس كلمة 'حار'.", ["Chaud", "Doux", "Frais"])
        ]
    },
    home: {
        words: [
            { word: "Maison", translation: "منزل", pronunciation: "ميزون", emoji: "🏠" },
            { word: "Appartement", translation: "شقة", pronunciation: "أبارتومون", emoji: "🏢" },
            { word: "Chambre", translation: "غرفة", pronunciation: "شومبر", emoji: "🚪" },
            { word: "Chambre à coucher", translation: "غرفة نوم", pronunciation: "شومبر آ كوشيه", emoji: "🛏️" },
            { word: "Salle de bain", translation: "حمام", pronunciation: "سال دو بان", emoji: "🛁" },
            { word: "Cuisine", translation: "مطبخ", pronunciation: "كويزين", emoji: "🍳" },
            { word: "Salon", translation: "غرفة معيشة", pronunciation: "صالون", emoji: "🛋️" },
            { word: "Salle à manger", translation: "غرفة طعام", pronunciation: "سال آ مونجيه", emoji: "🍽️" },
            { word: "Jardin", translation: "حديقة", pronunciation: "جاردان", emoji: "🌳" },
            { word: "Porte", translation: "باب", pronunciation: "پورت", emoji: "🚪" },
            { word: "Fenêtre", translation: "نافذة", pronunciation: "فونيتر", emoji: "🪟" },
            { word: "Sol", translation: "أرضية", pronunciation: "صول", emoji: "👣" },
            { word: "Toit", translation: "سقف", pronunciation: "توا", emoji: "🧱" },
            { word: "Mur", translation: "جدار", pronunciation: "مور", emoji: "🧱" },
            { word: "Table", translation: "طاولة", pronunciation: "تابل", emoji: "🪵" },
            { word: "Chaise", translation: "كرسي", pronunciation: "شيز", emoji: "🪑" },
            { word: "Lit", translation: "سرير", pronunciation: "لي", emoji: "🛏️" },
            { word: "Canapé", translation: "أريكة", pronunciation: "كناپيه", emoji: "🛋️" },
            { word: "Lampe", translation: "مصباح", pronunciation: "لومب", emoji: "💡" },
            { word: "Clé", translation: "مفتاح", pronunciation: "كليه", emoji: "🔑" },
        ],
        readingExercises: [
            readingExercise("La cuisine a une table et une fenêtre.", "ترجم 'cuisine', 'table', و 'fenêtre'.", "المطبخ به طاولة ونافذة.", ["La chambre à coucher a un lit et une porte.", "Le salon a une chaise.", "La clé de la maison est dans le jardin."]),
            readingExercise("Je dors dans la chambre et je regarde la télé dans le salon.", "ابحث عن أماكن النوم ومشاهدة التلفاز.", "أنا أنام في غرفة النوم وأشاهد التلفاز في غرفة المعيشة.", ["Nous mangeons dans la salle à manger.", "La salle de bain est au bout du couloir.", "L'appartement est au troisième étage."])
        ],
        listeningExercises: [
            listeningExercise("Cuisine", "المكان الذي نطبخ فيه الطعام.", ["Chambre à coucher", "Salle de bain", "Jardin"]),
            listeningExercise("Porte", "تستخدمه للدخول والخروج من غرفة.", ["Fenêtre", "Table", "Lit"])
        ]
    },
    shopping: {
        words: [
            { word: "Magasin", translation: "متجر/محل", pronunciation: "ماغازان", emoji: "🏬" },
            { word: "Marché", translation: "سوق", pronunciation: "مارشيه", emoji: "🛒" },
            { word: "Supermarché", translation: "سوبر ماركت", pronunciation: "سوپرمارشيه", emoji: "🏪" },
            { word: "Argent", translation: "مال", pronunciation: "أرجون", emoji: "💰" },
            { word: "Prix", translation: "سعر", pronunciation: "پري", emoji: "💲" },
            { word: "Acheter", translation: "يشتري", pronunciation: "آشتيه", emoji: "🛍️" },
            { word: "Vendre", translation: "يبيع", pronunciation: "ڤوندر", emoji: "🏷️" },
            { word: "Payer", translation: "يدفع", pronunciation: "پييه", emoji: "💳" },
            { word: "Cher", translation: "غالي", pronunciation: "شير", emoji: "💎" },
            { word: "Bon marché", translation: "رخيص", pronunciation: "بون مارشيه", emoji: "🪙" },
            { word: "Facture", translation: "فاتورة", pronunciation: "فاكتور", emoji: "🧾" },
            { word: "Reçu", translation: "إيصال", pronunciation: "روسو", emoji: "🧾" },
            { word: "Espèces", translation: "نقد", pronunciation: "إسبيس", emoji: "💵" },
            { word: "Carte de crédit", translation: "بطاقة ائتمان", pronunciation: "كارت دو كريدي", emoji: "💳" },
            { word: "Client", translation: "زبون", pronunciation: "كليون", emoji: "🙋" },
        ],
        readingExercises: [
            readingExercise("Combien ça coûte ? Le prix est très cher.", "ابحث عن السؤال عن السعر ووصفه بأنه 'cher'.", "كم سعر هذا؟ السعر غالي جداً.", ["Je voudrais acheter ceci, s'il vous plaît.", "Puis-je payer par carte ?", "Ce magasin est très bon marché."]),
            readingExercise("Je vais payer par carte de crédit, donnez-moi le reçu s'il vous plaît.", "ابحث عن طريقة الدفع والوثيقة المطلوبة.", "سأدفع ببطاقة الائتمان، من فضلك أعطني الإيصال.", ["Acceptez-vous les espèces ?", "Ce marché est très grand.", "Le client est roi."])
        ],
        listeningExercises: [
            listeningExercise("Argent", "ما تستخدمه للشراء.", ["Prix", "Magasin", "Facture"]),
            listeningExercise("Acheter", "فعل الحصول على شيء مقابل المال.", ["Vendre", "Payer", "Avoir"])
        ]
    },
    body: {
        words: [
            { word: "Corps", translation: "جسم", pronunciation: "كور", emoji: "🧍" },
            { word: "Tête", translation: "رأس", pronunciation: "تيت", emoji: "👤" },
            { word: "Visage", translation: "وجه", pronunciation: "ڤيزاج", emoji: "😊" },
            { word: "Œil", translation: "عين", pronunciation: "أوي", emoji: "👁️" },
            { word: "Nez", translation: "أنف", pronunciation: "نيه", emoji: "👃" },
            { word: "Bouche", translation: "فم", pronunciation: "بوش", emoji: "👄" },
            { word: "Oreille", translation: "أذن", pronunciation: "أوري", emoji: "👂" },
            { word: "Cheveux", translation: "شعر", pronunciation: "شوڤو", emoji: "👱" },
            { word: "Dent", translation: "سن", pronunciation: "دون", emoji: "🦷" },
            { word: "Cou", translation: "رقبة", pronunciation: "كو", emoji: "🦒" },
            { word: "Épaule", translation: "كتف", pronunciation: "إيپول", emoji: "🤷" },
            { word: "Bras", translation: "ذراع", pronunciation: "برا", emoji: "💪" },
            { word: "Main", translation: "يد", pronunciation: "مان", emoji: "✋" },
            { word: "Doigt", translation: "إصبع", pronunciation: "دوا", emoji: "👆" },
            { word: "Jambe", translation: "ساق", pronunciation: "جومب", emoji: "🦵" },
            { word: "Pied", translation: "قدم", pronunciation: "پييه", emoji: "🦶" },
            { word: "Cœur", translation: "قلب", pronunciation: "كور", emoji: "❤️" },
            { word: "Estomac", translation: "معدة", pronunciation: "إستوما", emoji: "🍔" },
        ],
        readingExercises: [
            readingExercise("J'ai deux yeux, un nez et une bouche.", "عد أجزاء الوجه المذكورة.", "لدي عينان وأنف واحد وفم واحد.", ["Je me lave les mains avec de l'eau et du savon.", "J'ai mal à la tête.", "Il a les cheveux noirs et les yeux bleus."]),
            readingExercise("Mon estomac me fait mal après avoir mangé.", "ابحث عن الجزء الذي يؤلم.", "معدتي تؤلمني بعد الأكل.", ["Mon cœur bat vite.", "J'ai cinq doigts à chaque main.", "Mon bras est fort."])
        ],
        listeningExercises: [
            listeningExercise("Main", "الجزء من الجسم الذي به خمسة أصابع.", ["Pied", "Tête", "Œil"]),
            listeningExercise("Cheveux", "ينمو على الرأس.", ["Visage", "Nez", "Oreille"])
        ]
    },
    clothing: {
        words: [
            { word: "Vêtements", translation: "ملابس", pronunciation: "ڤيتمون", emoji: "👕" },
            { word: "Chemise", translation: "قميص", pronunciation: "شوميز", emoji: "👕" },
            { word: "T-shirt", translation: "تي شيرت", pronunciation: "تي-شيرت", emoji: "👕" },
            { word: "Pantalon", translation: "بنطال", pronunciation: "پونتالون", emoji: "👖" },
            { word: "Jean", translation: "جينز", pronunciation: "جين", emoji: "👖" },
            { word: "Short", translation: "شورت", pronunciation: "شورت", emoji: "🩳" },
            { word: "Robe", translation: "فستان", pronunciation: "روب", emoji: "👗" },
            { word: "Jupe", translation: "تنورة", pronunciation: "جوب", emoji: "👗" },
            { word: "Veste", translation: "سترة", pronunciation: "ڤيست", emoji: "🧥" },
            { word: "Manteau", translation: "معطف", pronunciation: "مونتو", emoji: "🧥" },
            { word: "Pull", translation: "سترة صوفية", pronunciation: "پول", emoji: "🧶" },
            { word: "Chaussures", translation: "حذاء", pronunciation: "شوسور", emoji: "👟" },
            { word: "Bottes", translation: "حذاء طويل", pronunciation: "بوت", emoji: "👢" },
            { word: "Chaussettes", translation: "جوارب", pronunciation: "شوسيت", emoji: "🧦" },
            { word: "Chapeau", translation: "قبعة", pronunciation: "شاپو", emoji: "🧢" },
            { word: "Écharpe", translation: "وشاح", pronunciation: "إيشارب", emoji: "🧣" },
            { word: "Gants", translation: "قفازات", pronunciation: "غون", emoji: "🧤" },
        ],
        readingExercises: [
            readingExercise("Je porte une chemise bleue et un pantalon noir.", "ابحث عن 'chemise' و 'pantalon' وألوانها.", "أنا أرتدي قميصاً أزرق وبنطالاً أسود.", ["Mes nouvelles chaussures sont blanches.", "Je dois acheter une veste pour l'hiver.", "Ce chapeau est très joli."]),
            readingExercise("En hiver, je porte un manteau, une écharpe et des gants.", "ابحث عن ملابس الشتاء.", "في الشتاء، أرتدي معطفًا ووشاحًا وقفازات.", ["Elle porte une belle robe rouge.", "As-tu vu mes chaussettes ?", "Ce T-shirt est trop grand."])
        ],
        listeningExercises: [
            listeningExercise("Chaussures", "ما ترتديه في قدميك.", ["Chemise", "Chapeau", "Chaussettes"]),
            listeningExercise("Veste", "ترتديه فوق قميصك عندما يكون الجو باردًا.", ["Pantalon", "Robe", "Chaussettes"])
        ]
    },
    verbs: {
        words: [
            { word: "être", translation: "يكون", pronunciation: "إيتر", emoji: "🧘" },
            { word: "avoir", translation: "يملك", pronunciation: "آڤوار", emoji: "🤲" },
            { word: "faire", translation: "يفعل/يصنع", pronunciation: "فير", emoji: "💪" },
            { word: "dire", translation: "يقول", pronunciation: "دير", emoji: "🗣️" },
            { word: "aller", translation: "يذهب", pronunciation: "آليه", emoji: "🚶" },
            { word: "pouvoir", translation: "يستطيع", pronunciation: "پوڤوار", emoji: "🏋️" },
            { word: "vouloir", translation: "يريد", pronunciation: "ڤولوار", emoji: "🙋" },
            { word: "savoir", translation: "يعرف", pronunciation: "ساڤوار", emoji: "🧠" },
            { word: "voir", translation: "يرى", pronunciation: "ڤوار", emoji: "👀" },
            { word: "venir", translation: "يأتي", pronunciation: "ڤونير", emoji: "👋" },
            { word: "devoir", translation: "يجب", pronunciation: "دوڤوار", emoji: "📋" },
            { word: "croire", translation: "يصدق", pronunciation: "كروار", emoji: "🙏" },
            { word: "trouver", translation: "يجد", pronunciation: "تروڤيه", emoji: "🔍" },
            { word: "donner", translation: "يعطي", pronunciation: "دونيه", emoji: "🎁" },
            { word: "prendre", translation: "يأخذ", pronunciation: "پروندر", emoji: "✋" },
            { word: "parler", translation: "يتحدث", pronunciation: "بارليه", emoji: "💬" },
            { word: "aimer", translation: "يحب", pronunciation: "إيميه", emoji: "❤️" },
            { word: "penser", translation: "يفكر", pronunciation: "پونسيه", emoji: "🤔" },
            { word: "manger", translation: "يأكل", pronunciation: "مونجيه", emoji: "🍔" },
            { word: "boire", translation: "يشرب", pronunciation: "بوار", emoji: "🥤" },
        ],
        readingExercises: [
            readingExercise("Je dois aller au travail, mais je veux rester à la maison.", "ابحث عن الأفعال المتناقضة.", "يجب أن أذهب إلى العمل، لكني أريد أن أبقى في المنزل.", ["Il peut voir et entendre tout.", "Pouvez-vous m'aider à porter cela ?", "Elle essaie d'apprendre une nouvelle langue."]),
            readingExercise("Il sait lire et écrire en trois langues.", "ابحث عن المهارات اللغوية.", "هو يعرف القراءة والكتابة بثلاث لغات.", ["Ne parlez pas et ne mangez pas en même temps.", "Je reviendrai dans une heure.", "Ils jouent et gagnent toujours."])
        ],
        listeningExercises: [
            listeningExercise("penser", "استخدام العقل للتفكير في شيء ما.", ["manger", "dormir", "parler"]),
            listeningExercise("aimer", "الشعور بالحب أو المودة القوية.", ["détester", "avoir", "être"])
        ]
    },
    adjectives: {
        words: [
            { word: "bon", translation: "جيد", pronunciation: "بون", emoji: "👍" },
            { word: "mauvais", translation: "سيء", pronunciation: "موڤيه", emoji: "👎" },
            { word: "nouveau", translation: "جديد", pronunciation: "نوڤو", emoji: "✨" },
            { word: "vieux", translation: "قديم/عجوز", pronunciation: "ڤيو", emoji: "📜" },
            { word: "grand", translation: "كبير", pronunciation: "غرون", emoji: "🐘" },
            { word: "petit", translation: "صغير", pronunciation: "پوتي", emoji: "🐭" },
            { word: "long", translation: "طويل", pronunciation: "لون", emoji: "📏" },
            { word: "court", translation: "قصير", pronunciation: "كور", emoji: "📏" },
            { word: "haut", translation: "عالي", pronunciation: "أو", emoji: "📈" },
            { word: "bas", translation: "منخفض", pronunciation: "با", emoji: "📉" },
            { word: "chaud", translation: "حار", pronunciation: "شو", emoji: "🔥" },
            { word: "froid", translation: "بارد", pronunciation: "فروا", emoji: "❄️" },
            { word: "heureux", translation: "سعيد", pronunciation: "أورو", emoji: "😄" },
            { word: "triste", translation: "حزين", pronunciation: "تريست", emoji: "😢" },
            { word: "facile", translation: "سهل", pronunciation: "فاسيل", emoji: "✅" },
            { word: "difficile", translation: "صعب", pronunciation: "ديفيسيل", emoji: "❌" },
            { word: "beau", translation: "جميل", pronunciation: "بو", emoji: "😍" },
            { word: "laid", translation: "قبيح", pronunciation: "ليه", emoji: "🤢" },
            { word: "rapide", translation: "سريع", pronunciation: "راپيد", emoji: "🏃" },
            { word: "lent", translation: "بطيء", pronunciation: "لون", emoji: "🐢" },
        ],
        readingExercises: [
            readingExercise("La nouvelle voiture est rapide, mais la vieille voiture est lente.", "ابحث عن الصفات المتضادة.", "السيارة الجديدة سريعة، لكن السيارة القديمة بطيئة.", ["Ce livre est bon et celui-là est mauvais.", "La question est-elle facile ou difficile ?", "Il fait très chaud aujourd'hui."]),
            readingExercise("Elle a une belle voix et un cœur bon.", "ابحث عن الصفات الإيجابية.", "لديها صوت جميل وقلب طيب.", ["L'homme fort aide l'homme faible.", "La chambre est propre maintenant.", "L'histoire est longue mais pas importante."])
        ],
        listeningExercises: [
            listeningExercise("important", "صفة لشيء ذي قيمة أو أهمية كبيرة.", ["facile", "différent", "faux"]),
            listeningExercise("heureux", "الشعور بالفرح أو الرضا.", ["triste", "en colère", "fatigué"])
        ]
    },
    places: {
        words: [
            { word: "endroit", translation: "مكان", pronunciation: "أوندورا", emoji: "📍" },
            { word: "ville", translation: "مدينة", pronunciation: "ڤيل", emoji: "🏙️" },
            { word: "pays", translation: "دولة", pronunciation: "پيي", emoji: "🇫🇷" },
            { word: "monde", translation: "عالم", pronunciation: "موند", emoji: "🌍" },
            { word: "école", translation: "مدرسة", pronunciation: "إيكول", emoji: "🏫" },
            { word: "université", translation: "جامعة", pronunciation: "اونيڤيرسيتيه", emoji: "🎓" },
            { word: "hôpital", translation: "مستشفى", pronunciation: "أوپيتال", emoji: "🏥" },
            { word: "restaurant", translation: "مطعم", pronunciation: "ريستورون", emoji: "🍔" },
            { word: "hôtel", translation: "فندق", pronunciation: "أوتيل", emoji: "🏨" },
            { word: "aéroport", translation: "مطار", pronunciation: "آيروپور", emoji: "✈️" },
            { word: "gare", translation: "محطة قطار", pronunciation: "غار", emoji: "🚉" },
            { word: "parc", translation: "حديقة عامة", pronunciation: "بارك", emoji: "🌳" },
            { word: "plage", translation: "شاطئ", pronunciation: "پلاج", emoji: "🏖️" },
            { word: "bibliothèque", translation: "مكتبة", pronunciation: "بيبليوتيك", emoji: "📚" },
            { word: "banque", translation: "بنك", pronunciation: "بونك", emoji: "🏦" },
            { word: "bureau", translation: "مكتب", pronunciation: "بورو", emoji: "🏢" },
            { word: "rue", translation: "شارع", pronunciation: "رو", emoji: "🛣️" },
            { word: "route", translation: "طريق", pronunciation: "روت", emoji: "🛤️" },
            { word: "ferme", translation: "مزرعة", pronunciation: "فيرم", emoji: "🚜" },
            { word: "forêt", translation: "غابة", pronunciation: "فوريه", emoji: "🌲" },
            { word: "montagne", translation: "جبل", pronunciation: "مونتاني", emoji: "⛰️" },
            { word: "rivière", translation: "نهر", pronunciation: "ريڤيير", emoji: "🏞️" },
            { word: "mer", translation: "بحر", pronunciation: "مير", emoji: "🌊" },
            { word: "bâtiment", translation: "مبنى", pronunciation: "باتيمون", emoji: "🏢" },
            { word: "église", translation: "كنيسة", pronunciation: "إيغليز", emoji: "⛪" },
            { word: "mosquée", translation: "مسجد", pronunciation: "موسكيه", emoji: "🕌" },
        ],
        readingExercises: [
            readingExercise("Je vais à l'école en bus, puis je vais à la bibliothèque.", "ابحث عن أماكن التعلم.", "أذهب إلى المدرسة بالحافلة، ثم أذهب إلى المكتبة.", ["L'hôpital est à côté de la banque.", "Y a-t-il un bon restaurant dans cette ville ?", "Nous vivons dans un appartement dans un grand bâtiment."]),
            readingExercise("En été, nous aimons aller à la plage ou au parc.", "ابحث عن أماكن الترفيه الصيفية.", "في الصيف، نحب أن نذهب إلى الشاطئ أو الحديقة.", ["L'aéroport est loin du centre-ville.", "Il y a un nouveau marché dans la rue suivante.", "L'hôtel est situé sur la rivière."])
        ],
        listeningExercises: [
            listeningExercise("hôpital", "المكان الذي تذهب إليه عندما تكون مريضاً.", ["école", "hôtel", "banque"]),
            listeningExercise("ville", "مكان كبير به الكثير من الناس والمباني.", ["village", "ferme", "pays"])
        ]
    },
    nature: {
        words: [
            { word: "nature", translation: "طبيعة", pronunciation: "ناتور", emoji: "🏞️" },
            { word: "arbre", translation: "شجرة", pronunciation: "آربر", emoji: "🌳" },
            { word: "fleur", translation: "زهرة", pronunciation: "فلور", emoji: "🌸" },
            { word: "plante", translation: "نبات", pronunciation: "پلونت", emoji: "🌱" },
            { word: "herbe", translation: "عشب", pronunciation: "إيرب", emoji: "🌿" },
            { word: "lune", translation: "قمر", pronunciation: "لون", emoji: "🌙" },
            { word: "étoile", translation: "نجمة", pronunciation: "إيتوال", emoji: "⭐" },
            { word: "ciel", translation: "سماء", pronunciation: "سييل", emoji: "☁️" },
            { word: "feu", translation: "نار", pronunciation: "فو", emoji: "🔥" },
            { word: "terre", translation: "أرض", pronunciation: "تير", emoji: "🌍" },
            { word: "air", translation: "هواء", pronunciation: "إير", emoji: "💨" },
            { word: "glace", translation: "جليد", pronunciation: "غلاس", emoji: "🧊" },
            { word: "océan", translation: "محيط", pronunciation: "أوسيون", emoji: "🌊" },
            { word: "lac", translation: "بحيرة", pronunciation: "لاك", emoji: "🏞️" },
            { word: "colline", translation: "تل", pronunciation: "كولين", emoji: "🌄" },
            { word: "île", translation: "جزيرة", pronunciation: "إيل", emoji: "🏝️" },
            { word: "désert", translation: "صحراء", pronunciation: "ديزير", emoji: "🏜️" },
            { word: "animal", translation: "حيوان", pronunciation: "أنيمال", emoji: "🐾" },
            { word: "chien", translation: "كلب", pronunciation: "شيان", emoji: "🐕" },
            { word: "chat", translation: "قطة", pronunciation: "شا", emoji: "🐈" },
            { word: "oiseau", translation: "طائر", pronunciation: "وازو", emoji: "🐦" },
            { word: "rocher", translation: "صخرة", pronunciation: "روشيه", emoji: "🪨" },
            { word: "sable", translation: "رمل", pronunciation: "سابل", emoji: "🏖️" },
        ],
        readingExercises: [
            readingExercise("Le soleil est dans le ciel, et le poisson est dans la mer.", "ابحث عن مكونات السماء والبحر.", "الشمس في السماء، والسمكة في البحر.", ["La montagne est haute et la rivière est longue.", "Les arbres sont verts dans la forêt.", "J'aime le son de la pluie et du vent."]),
            readingExercise("Un petit oiseau est assis sur un grand arbre.", "ابحث عن الكائن الصغير والكبير.", "طائر صغير يجلس على شجرة كبيرة.", ["Le chat joue avec la balle.", "Les fleurs sont belles au printemps.", "Le désert est chaud et sec."])
        ],
        listeningExercises: [
            listeningExercise("arbre", "نبات كبير له جذع وأغصان.", ["fleur", "herbe", "montagne"]),
            listeningExercise("eau", "سائل شفاف ضروري للحياة.", ["feu", "air", "sable"])
        ]
    },
    hobbies: {
        words: [
            { word: "passe-temps", translation: "هواية", pronunciation: "پاس-تون", emoji: "🎨" },
            { word: "lecture", translation: "قراءة", pronunciation: "ليكتور", emoji: "📖" },
            { word: "écriture", translation: "كتابة", pronunciation: "إيكريتور", emoji: "✍️" },
            { word: "musique", translation: "موسيقى", pronunciation: "موزيك", emoji: "🎵" },
            { word: "art", translation: "فن", pronunciation: "آر", emoji: "🖼️" },
            { word: "dessin", translation: "رسم", pronunciation: "ديسان", emoji: "✏️" },
            { word: "peinture", translation: "تلوين", pronunciation: "پانتور", emoji: "🎨" },
            { word: "sport", translation: "رياضة", pronunciation: "سپور", emoji: "⚽" },
            { word: "natation", translation: "سباحة", pronunciation: "ناتاسيون", emoji: "🏊" },
            { word: "course", translation: "جري", pronunciation: "كورس", emoji: "🏃" },
            { word: "cuisine", translation: "طبخ", pronunciation: "كويزين", emoji: "🍳" },
            { word: "regarder des films", translation: "مشاهدة أفلام", pronunciation: "روغارديه دي فيلم", emoji: "🎬" },
            { word: "jouer à des jeux", translation: "لعب ألعاب", pronunciation: "جويه آ دي جو", emoji: "🎮" },
            { word: "voyager", translation: "سفر", pronunciation: "ڤواياجيه", emoji: "✈️" },
            { word: "danser", translation: "رقص", pronunciation: "دونسيه", emoji: "💃" },
            { word: "chanter", translation: "غناء", pronunciation: "شونتيه", emoji: "🎤" },
            { word: "photographie", translation: "تصوير فوتوغرافي", pronunciation: "فوتوغرافي", emoji: "📸" },
            { word: "jardinage", translation: "بستنة", pronunciation: "جاردينياج", emoji: "🪴" },
        ],
        readingExercises: [
            readingExercise("Mon passe-temps est la lecture de livres et l'écoute de musique.", "ابحث عن الهوايات المذكورة.", "هوايتي هي قراءة الكتب والاستماع إلى الموسيقى.", ["Il aime faire du sport et nager.", "Elle est douée en cuisine et en dessin.", "Aimes-tu voyager et jouer à des jeux ?"]),
            readingExercise("Regarder des films est amusant, mais je préfère courir dehors.", "ابحث عن الهواية الداخلية والخارجية.", "مشاهدة الأفلام ممتعة، لكني أفضل الجري في الخارج.", ["Chanter et danser demandent du talent.", "L'écriture est un passe-temps créatif.", "La photographie capture de beaux moments."])
        ],
        listeningExercises: [
            listeningExercise("musique", "فن تنظيم الأصوات في الوقت المناسب.", ["art", "sport", "lecture"]),
            listeningExercise("cuisine", "تحضير الطعام عن طريق تسخينه.", ["natation", "écriture", "voyager"])
        ]
    },
    emotions: {
        words: [
            { word: "sentiment", translation: "شعور", pronunciation: "سونتيمون", emoji: "❤️" },
            { word: "heureux", translation: "سعيد", pronunciation: "أورو", emoji: "😄" },
            { word: "triste", translation: "حزين", pronunciation: "تريست", emoji: "😢" },
            { word: "en colère", translation: "غاضب", pronunciation: "أون كولير", emoji: "😠" },
            { word: "surpris", translation: "متفاجئ", pronunciation: "سورپري", emoji: "😲" },
            { word: "effrayé", translation: "خائف", pronunciation: "إيفرييه", emoji: "😨" },
            { word: "fatigué", translation: "متعب", pronunciation: "فاتيغيه", emoji: "😴" },
            { word: "ennuyé", translation: "ملل", pronunciation: "أونوييه", emoji: "😒" },
            { word: "excité", translation: "متحمس", pronunciation: "إكسيتيه", emoji: "🤩" },
            { word: "amour", translation: "حب", pronunciation: "آمور", emoji: "❤️" },
            { word: "haine", translation: "كره", pronunciation: "إين", emoji: "💔" },
            { word: "espoir", translation: "أمل", pronunciation: "إسبوار", emoji: "🙏" },
            { word: "peur", translation: "خوف", pronunciation: "پور", emoji: "😨" },
            { word: "joie", translation: "فرح", pronunciation: "جوا", emoji: "😊" },
            { word: "fier", translation: "فخور", pronunciation: "فيير", emoji: "ภูมิใจ" },
            { word: "timide", translation: "خجول", pronunciation: "تيميد", emoji: "😊" },
            { word: "calme", translation: "هادئ", pronunciation: "كالم", emoji: "😌" },
            { word: "inquiet", translation: "قلق", pronunciation: "إنكييه", emoji: "😟" },
        ],
        readingExercises: [
            readingExercise("Je me sens heureux quand je vois mes amis, mais je suis triste de partir.", "ابحث عن المشاعر المتضادة.", "أشعر بالسعادة عندما أرى أصدقائي، لكني حزين للمغادرة.", ["Il est en colère parce qu'ils sont en retard.", "N'aie pas peur, tout ira bien.", "Je suis très excité pour le voyage."]),
            readingExercise("Elle a été surprise par le cadeau et a ressenti une grande joie.", "ابحث عن المشاعر الإيجابية.", "لقد تفاجأت بالهدية وشعرت بفرح كبير.", ["L'enfant est fatigué et veut dormir.", "Je suis fier de ton succès.", "Ne t'inquiète pas, sois calme."])
        ],
        listeningExercises: [
            listeningExercise("en colère", "الشعور أو إظهار الاستياء الشديد.", ["heureux", "triste", "fatigué"]),
            listeningExercise("amour", "شعور عميق بالمودة والمحبة.", ["haine", "peur", "espoir"])
        ]
    },
    work: {
        words: [
            { word: "Travail", translation: "عمل", pronunciation: "تراڤاي", emoji: "🏢" },
            { word: "Emploi", translation: "وظيفة", pronunciation: "أومبلوا", emoji: "💼" },
            { word: "Bureau", translation: "مكتب", pronunciation: "بورو", emoji: "🏢" },
            { word: "Entreprise", translation: "شركة", pronunciation: "أونترپريز", emoji: "🏭" },
            { word: "Directeur", translation: "مدير", pronunciation: "ديريكتور", emoji: "👨‍💼" },
            { word: "Employé", translation: "موظف", pronunciation: "أومبلواييه", emoji: "🧑‍💼" },
            { word: "Collègue", translation: "زميل", pronunciation: "كوليغ", emoji: "👥" },
            { word: "Salaire", translation: "راتب", pronunciation: "سالير", emoji: "💵" },
            { word: "Réunion", translation: "اجتماع", pronunciation: "ريونيون", emoji: "🤝" },
            { word: "Email", translation: "بريد إلكتروني", pronunciation: "إيميل", emoji: "📧" },
            { word: "Ordinateur", translation: "حاسوب", pronunciation: "أورديناتور", emoji: "💻" },
            { word: "Téléphone", translation: "هاتف", pronunciation: "تيليفون", emoji: "📱" },
            { word: "Projet", translation: "مشروع", pronunciation: "پروجيه", emoji: "📈" },
            { word: "Date limite", translation: "موعد نهائي", pronunciation: "دات ليميت", emoji: "⏳" },
            { word: "Tâche", translation: "مهمة", pronunciation: "تاش", emoji: "📋" },
            { word: "Carrière", translation: "مهنة", pronunciation: "كاريير", emoji: "🚀" },
        ],
        readingExercises: [
            readingExercise("Le directeur a une réunion au bureau.", "ابحث عن كلمات 'directeur', 'réunion', 'bureau'.", "المدير لديه اجتماع في المكتب.", ["L'employé travaille sur l'ordinateur.", "Le salaire pour cet emploi est bon.", "Je t'ai envoyé un email."]),
            readingExercise("Mon collègue m'a aidé à finir le projet avant la date limite.", "ابحث عن كلمات العمل الجماعي والوقت.", "زميلي ساعدني في إنهاء المشروع قبل الموعد النهائي.", ["J'utilise mon téléphone pour vérifier mes emails.", "Cette tâche est très difficile.", "Je te souhaite une carrière réussie."])
        ],
        listeningExercises: [
            listeningExercise("Bureau", "مكان العمل المكتبي.", ["Hôtel", "École", "Aéroport"]),
            listeningExercise("Ordinateur", "جهاز إلكتروني لمعالجة البيانات.", ["Téléphone", "Livre", "Stylo"])
        ]
    },
    travel: {
        words: [
            { word: "Voyage", translation: "سفر", pronunciation: "ڤواياج", emoji: "🌍" },
            { word: "Excursion", translation: "رحلة", pronunciation: "إكسكورسيون", emoji: "✈️" },
            { word: "Vacances", translation: "عطلة", pronunciation: "ڤاكونس", emoji: "🏖️" },
            { word: "Aéroport", translation: "مطار", pronunciation: "آيروپور", emoji: "✈️" },
            { word: "Avion", translation: "طائرة", pronunciation: "آڤيون", emoji: "✈️" },
            { word: "Passeport", translation: "جواز سفر", pronunciation: "پاسپور", emoji: "🛂" },
            { word: "Billet", translation: "تذكرة", pronunciation: "بييه", emoji: "🎟️" },
            { word: "Hôtel", translation: "فندق", pronunciation: "أوتيل", emoji: "🏨" },
            { word: "Train", translation: "قطار", pronunciation: "تران", emoji: "🚆" },
            { word: "Voiture", translation: "سيارة", pronunciation: "ڤواتور", emoji: "🚗" },
            { word: "Bus", translation: "حافلة", pronunciation: "بوس", emoji: "🚌" },
            { word: "Taxi", translation: "سيارة أجرة", pronunciation: "تاكسي", emoji: "🚕" },
            { word: "Carte", translation: "خريطة", pronunciation: "كارت", emoji: "🗺️" },
            { word: "Valise", translation: "حقيبة سفر", pronunciation: "ڤاليز", emoji: "🧳" },
            { word: "Bagages", translation: "أمتعة", pronunciation: "باغاج", emoji: "🧳" },
            { word: "Touriste", translation: "سائح", pronunciation: "توريست", emoji: "📸" },
            { word: "Destination", translation: "وجهة", pronunciation: "ديستيناسيون", emoji: "📍" },
        ],
        readingExercises: [
            readingExercise("J'ai besoin d'un passeport et d'un billet pour l'avion.", "ترجم الكلمات 'passeport', 'billet', و 'avion'.", "أحتاج جواز سفر وتذكرة للطائرة.", ["L'hôtel est près de la gare.", "C'est ta nouvelle voiture ?", "N'oublie pas la carte et la valise."]),
            readingExercise("Notre destination est une belle île pour les vacances.", "ابحث عن مكان ونوع الرحلة.", "وجهتنا هي جزيرة جميلة لقضاء العطلة.", ["Le touriste prend beaucoup de photos.", "Mes bagages sont très lourds.", "Je vais prendre un taxi pour l'aéroport."])
        ],
        listeningExercises: [
            listeningExercise("Passeport", "وثيقة رسمية للسفر الدولي.", ["Billet", "Valise", "Hôtel"]),
            listeningExercise("Voiture", "وسيلة نقل خاصة بأربع عجلات.", ["Bus", "Train", "Avion"])
        ]
    },
    animals: {
        words: [
            { word: "Animal", translation: "حيوان", pronunciation: "أنيمال", emoji: "🐾" },
            { word: "Chien", translation: "كلب", pronunciation: "شيان", emoji: "🐕" },
            { word: "Chat", translation: "قطة", pronunciation: "شا", emoji: "🐈" },
            { word: "Lion", translation: "أسد", pronunciation: "ليون", emoji: "🦁" },
            { word: "Tigre", translation: "نمر", pronunciation: "تيغر", emoji: "🐅" },
            { word: "Éléphant", translation: "فيل", pronunciation: "إليفون", emoji: "🐘" },
            { word: "Singe", translation: "قرد", pronunciation: "سانج", emoji: "🐒" },
            { word: "Cheval", translation: "حصان", pronunciation: "شوفال", emoji: "🐎" },
            { word: "Oiseau", translation: "طائر", pronunciation: "وازو", emoji: "🐦" },
            { word: "Poisson", translation: "سمكة", pronunciation: "بواسون", emoji: "🐟" },
        ],
        readingExercises: [
            readingExercise("Le lion est le roi de la jungle.", "وصف حيوان", "الأسد هو ملك الغابة.", ["Le chat boit du lait.", "J'aime beaucoup les chiens.", "L'éléphant est un très grand animal."]),
        ],
        listeningExercises: [
            listeningExercise("Éléphant", "Un grand animal avec une trompe.", ["Chien", "Chat", "Singe"]),
        ]
    },
    transportation: {
        words: [
            { word: "Voiture", translation: "سيارة", pronunciation: "ڤواتور", emoji: "🚗" },
            { word: "Bus", translation: "حافلة", pronunciation: "بوس", emoji: "🚌" },
            { word: "Train", translation: "قطار", pronunciation: "تران", emoji: "🚆" },
            { word: "Avion", translation: "طائرة", pronunciation: "آڤيون", emoji: "✈️" },
            { word: "Vélo", translation: "دراجة هوائية", pronunciation: "ڤيلو", emoji: "🚲" },
            { word: "Moto", translation: "دراجة نارية", pronunciation: "موتو", emoji: "🏍️" },
            { word: "Bateau", translation: "سفينة/قارب", pronunciation: "باتو", emoji: "⛵" },
            { word: "Taxi", translation: "سيارة أجرة", pronunciation: "تاكسي", emoji: "🚕" },
            { word: "Métro", translation: "مترو الأنفاق", pronunciation: "ميترو", emoji: "🚇" },
        ],
        readingExercises: [
            readingExercise("Je vais au travail en bus.", "وسيلة النقل", "أذهب إلى العمل بالحافلة.", ["Le train est très rapide.", "Sais-tu conduire une voiture ?", "Voyager en avion est confortable."]),
        ],
        listeningExercises: [
            listeningExercise("Train", "Un moyen de transport qui roule sur des rails.", ["Voiture", "Bus", "Avion"]),
        ]
    },
    education: {
        words: [
            { word: "École", translation: "مدرسة", pronunciation: "إيكول", emoji: "🏫" },
            { word: "Université", translation: "جامعة", pronunciation: "أونيڤيرسيتيه", emoji: "🎓" },
            { word: "Professeur", translation: "معلم", pronunciation: "بروفيسور", emoji: "👨‍🏫" },
            { word: "Étudiant", translation: "طالب", pronunciation: "إيتوديون", emoji: "🧑‍🎓" },
            { word: "Livre", translation: "كتاب", pronunciation: "ليڤر", emoji: "📚" },
            { word: "Stylo", translation: "قلم", pronunciation: "ستيلو", emoji: "🖊️" },
            { word: "Examen", translation: "امتحان", pronunciation: "إكزامان", emoji: "📝" },
            { word: "Devoirs", translation: "واجب منزلي", pronunciation: "دوڤوار", emoji: "📓" },
            { word: "Salle de classe", translation: "فصل دراسي", pronunciation: "سال دو كلاس", emoji: "🧑‍🏫" },
            { word: "Apprendre", translation: "يتعلم", pronunciation: "أبروندر", emoji: "🧠" },
        ],
        readingExercises: [
            readingExercise("Le professeur est dans la salle de classe.", "وصف مشهد دراسي", "المعلم في الفصل الدراسي.", ["J'ai un examen difficile demain.", "Je dois faire mes devoirs.", "Les étudiants lisent des livres."]),
        ],
        listeningExercises: [
            listeningExercise("Livre", "Quelque chose que vous lisez.", ["Stylo", "Examen", "École"]),
        ]
    },
    health: {
        words: [
            { word: "Médecin", translation: "طبيب", pronunciation: "ميدسان", emoji: "🧑‍⚕️" },
            { word: "Hôpital", translation: "مستشفى", pronunciation: "أوپيتال", emoji: "🏥" },
            { word: "Médicament", translation: "دواء", pronunciation: "ميديكامون", emoji: "💊" },
            { word: "Malade", translation: "مريض", pronunciation: "مالاد", emoji: "🤒" },
            { word: "En bonne santé", translation: "صحي", pronunciation: "أون بون سانتيه", emoji: "💪" },
            { word: "Mal de tête", translation: "صداع", pronunciation: "مال دو تيت", emoji: "🤕" },
            { word: "Mal de ventre", translation: "ألم في المعدة", pronunciation: "مال دو ڤونتر", emoji: "🤢" },
            { word: "Fièvre", translation: "حمى", pronunciation: "فييڤر", emoji: "🌡️" },
            { word: "Ambulance", translation: "سيارة إسعاف", pronunciation: "أومبيلونس", emoji: "🚑" },
        ],
        readingExercises: [
            readingExercise("Je suis malade, je dois voir un médecin.", "وصف حالة صحية", "أنا مريض، أحتاج لرؤية طبيب.", ["Prenez ce médicament.", "L'hôpital est grand et propre.", "J'ai de la fièvre et un mal de tête."]),
        ],
        listeningExercises: [
            listeningExercise("Médecin", "La personne que vous allez voir quand vous êtes malade.", ["Infirmière", "Professeur", "Étudiant"]),
        ]
    },
    technology: {
        words: [
            { word: "Ordinateur", translation: "حاسوب", pronunciation: "أورديناتور", emoji: "💻" },
            { word: "Téléphone", translation: "هاتف", pronunciation: "تيليفون", emoji: "📱" },
            { word: "Internet", translation: "إنترنت", pronunciation: "إنترنت", emoji: "🌐" },
            { word: "Email", translation: "بريد إلكتروني", pronunciation: "إيميل", emoji: "📧" },
            { word: "Site web", translation: "موقع إلكتروني", pronunciation: "سيت ويب", emoji: "🕸️" },
            { word: "Mot de passe", translation: "كلمة المرور", pronunciation: "مو دو پاس", emoji: "🔒" },
            { word: "Clavier", translation: "لوحة مفاتيح", pronunciation: "كلاڤييه", emoji: "⌨️" },
            { word: "Souris", translation: "فأرة", pronunciation: "سوري", emoji: "🖱️" },
            { word: "Écran", translation: "شاشة", pronunciation: "إكرون", emoji: "🖥️" },
            { word: "Logiciel", translation: "برنامج", pronunciation: "لوجيسيال", emoji: "💿" },
        ],
        readingExercises: [
            readingExercise("J'utilise internet tous les jours sur mon ordinateur.", "استخدام التكنولوجيا", "أستخدم الإنترنت كل يوم على حاسوبي.", ["J'ai oublié mon mot de passe.", "Envoyez-moi un email.", "Ce site web est très utile."]),
        ],
        listeningExercises: [
            listeningExercise("Internet", "Un réseau mondial qui relie les ordinateurs.", ["Ordinateur", "Téléphone", "Email"]),
        ]
    },
    restaurant: {
        words: [
            { word: "Restaurant", translation: "مطعم", pronunciation: "ريستورون", emoji: "🍴" },
            { word: "Menu", translation: "قائمة طعام", pronunciation: "مينو", emoji: "📜" },
            { word: "Serveur", translation: "نادل", pronunciation: "سيرڤور", emoji: "🤵" },
            { word: "Addition", translation: "فاتورة", pronunciation: "أديسيون", emoji: "🧾" },
            { word: "Commander", translation: "يطلب", pronunciation: "كومونديه", emoji: "✍️" },
            { word: "Délicieux", translation: "لذيذ", pronunciation: "ديليسيو", emoji: "😋" },
            { word: "Fourchette", translation: "شوكة", pronunciation: "فورشيت", emoji: "🍴" },
            { word: "Cuillère", translation: "ملعقة", pronunciation: "كويير", emoji: "🥄" },
            { word: "Couteau", translation: "سكين", pronunciation: "كوتو", emoji: "🔪" },
            { word: "Assiette", translation: "طبق", pronunciation: "آسييت", emoji: "🍽️" },
        ],
        readingExercises: [
            readingExercise("Serveur, le menu s'il vous plaît.", "في المطعم", "يا نادل، القائمة من فضلك.", ["La nourriture est délicieuse.", "Je voudrais commander maintenant.", "L'addition, s'il vous plaît."]),
        ],
        listeningExercises: [
            listeningExercise("Menu", "La liste des plats dans un restaurant.", ["Addition", "Serveur", "Fourchette"]),
        ]
    },
    daily_routines: {
        words: [
            { word: "Se réveiller", translation: "يستيقظ", pronunciation: "سو ريڤيييه", emoji: "⏰" },
            { word: "Manger le petit-déjeuner", translation: "يأكل الفطور", pronunciation: "مونجيه لو بوتي ديجونيه", emoji: "🍳" },
            { word: "Aller au travail", translation: "يذهب للعمل", pronunciation: "آليه أو تراڤاي", emoji: "💼" },
            { word: "Étudier", translation: "يدرس", pronunciation: "إيتودييه", emoji: "📚" },
            { word: "Déjeuner", translation: "يأكل الغداء", pronunciation: "ديجونيه", emoji: "🍱" },
            { word: "Rentrer à la maison", translation: "يعود للمنزل", pronunciation: "رونتريه آ لا ميزون", emoji: "🏡" },
            { word: "Dîner", translation: "يتعشى", pronunciation: "دينيه", emoji: "🍝" },
            { word: "Regarder la télé", translation: "يشاهد التلفاز", pronunciation: "روغارديه لا تيليه", emoji: "📺" },
            { word: "Lire un livre", translation: "يقرأ كتاباً", pronunciation: "لير آن ليڤر", emoji: "📖" },
            { word: "Dormir", translation: "ينام", pronunciation: "دورمير", emoji: "😴" },
        ],
        readingExercises: [
            readingExercise("Je me réveille à 7h tous les matins.", "روتين يومي", "أستيقظ الساعة 7 صباحاً كل يوم.", ["Il va au travail en voiture.", "Après le dîner, je regarde la télé.", "J'étudie le soir."]),
        ],
        listeningExercises: [
            listeningExercise("Se réveiller", "La première chose que vous faites le matin.", ["Dormir", "Manger", "Étudier"]),
        ]
    },
    countries: {
        words: [
            { word: "Pays", translation: "دولة", pronunciation: "پيي", emoji: "🌍" },
            { word: "Nationalité", translation: "جنسية", pronunciation: "ناسيوناليتيه", emoji: "🆔" },
            { word: "France", translation: "فرنسا", pronunciation: "فرونس", emoji: "🇫🇷" },
            { word: "Égypte", translation: "مصر", pronunciation: "إيجيبت", emoji: "🇪🇬" },
            { word: "Japon", translation: "اليابان", pronunciation: "جابون", emoji: "🇯🇵" },
            { word: "États-Unis", translation: "أمريكا", pronunciation: "إيتا-زوني", emoji: "🇺🇸" },
            { word: "Italie", translation: "إيطاليا", pronunciation: "إيتالي", emoji: "🇮🇹" },
            { word: "Espagne", translation: "إسبانيا", pronunciation: "إسباني", emoji: "🇪🇸" },
            { word: "Allemagne", translation: "ألمانيا", pronunciation: "ألماني", emoji: "🇩🇪" },
            { word: "Capitale", translation: "عاصمة", pronunciation: "كابيتال", emoji: "🏛️" },
        ],
        readingExercises: [
            readingExercise("Paris est la capitale de la France.", "عواصم الدول", "باريس هي عاصمة فرنسا.", ["Je viens d'Égypte.", "Il parle japonais.", "New York est une grande ville aux États-Unis."]),
        ],
        listeningExercises: [
            listeningExercise("France", "Le pays de la Tour Eiffel.", ["Égypte", "Japon", "États-Unis"]),
        ]
    },
    sports: {
        words: [
            { word: "Sport", translation: "رياضة", pronunciation: "سپور", emoji: "🏅" },
            { word: "Football", translation: "كرة القدم", pronunciation: "فوتبول", emoji: "⚽" },
            { word: "Basketball", translation: "كرة السلة", pronunciation: "باسكتبول", emoji: "🏀" },
            { word: "Tennis", translation: "تنس", pronunciation: "تنيس", emoji: "🎾" },
            { word: "Natation", translation: "سباحة", pronunciation: "ناتاسيون", emoji: "🏊" },
            { word: "Course", translation: "جري", pronunciation: "كورس", emoji: "🏃" },
            { word: "Jouer", translation: "يلعب", pronunciation: "جويه", emoji: "🤸" },
            { word: "Gagner", translation: "يفوز", pronunciation: "غانييه", emoji: "🏆" },
            { word: "Perdre", translation: "يخسر", pronunciation: "بيردر", emoji: "👎" },
            { word: "Équipe", translation: "فريق", pronunciation: "إيكيب", emoji: "👥" },
        ],
        readingExercises: [
            readingExercise("Mon sport préféré est le football.", "رياضة مفضلة", "رياضتي المفضلة هي كرة القدم.", ["Il joue au tennis tous les week-ends.", "Notre équipe a gagné le match.", "Je vais nager deux fois par semaine."]),
        ],
        listeningExercises: [
            listeningExercise("Football", "Un sport avec 11 joueurs et un ballon.", ["Basketball", "Tennis", "Natation"]),
        ]
    },
    music_arts: {
        words: [
            { word: "Musique", translation: "موسيقى", pronunciation: "موزيك", emoji: "🎵" },
            { word: "Art", translation: "فن", pronunciation: "آر", emoji: "🖼️" },
            { word: "Chanson", translation: "أغنية", pronunciation: "شانسون", emoji: "🎶" },
            { word: "Artiste", translation: "فنان", pronunciation: "آرتيست", emoji: "🧑‍🎨" },
            { word: "Peindre", translation: "يرسم/يلون", pronunciation: "پاندر", emoji: "🎨" },
            { word: "Chanter", translation: "يغني", pronunciation: "شانتيه", emoji: "🎤" },
            { word: "Danser", translation: "يرقص", pronunciation: "دونسيه", emoji: "💃" },
            { word: "Musée", translation: "متحف", pronunciation: "موزيه", emoji: "🏛️" },
            { word: "Théâtre", translation: "مسرح", pronunciation: "تياتر", emoji: "🎭" },
            { word: "Film", translation: "فيلم", pronunciation: "فيلم", emoji: "🎬" },
        ],
        readingExercises: [
            readingExercise("J'aime écouter de la musique classique.", "تفضيلات فنية", "أحب الاستماع إلى الموسيقى الكلاسيكية.", ["Elle est une artiste talentueuse.", "Allons au musée samedi.", "Cette chanson est très populaire."]),
        ],
        listeningExercises: [
            listeningExercise("Musique", "L'art des sons.", ["Art", "Film", "Chanson"]),
        ]
    }
};

export const FRENCH_GAMES: GamesCollection = {
    games: [
        {
            type: 'match',
            title: 'Jeu de Correspondance',
            description: 'Associez le mot français à sa traduction arabe.',
            items: [
                { id: 'fr_match_1', word: 'Maison', translation: 'منزل' },
                { id: 'fr_match_2', word: 'Chat', translation: 'قطة' },
                { id: 'fr_match_3', word: 'Livre', translation: 'كتاب' },
                { id: 'fr_match_4', word: 'Manger', translation: 'يأكل' },
            ]
        },
        {
            type: 'missing_word',
            title: 'Mot Manquant',
            description: 'Choisissez le mot correct pour compléter la phrase.',
            sentence: 'Le soleil est {blank} et chaud.',
            correctWord: 'jaune',
            options: ['jaune', 'bleu', 'froid', 'triste']
        }
    ]
};