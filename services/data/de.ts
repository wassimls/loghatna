

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
            { word: "Hallo", translation: "مرحباً", pronunciation: "halo", emoji: "👋" },
            { word: "Guten Morgen", translation: "صباح الخير", pronunciation: "guten mor-gen", emoji: "☀️" },
            { word: "Guten Tag", translation: "نهارك سعيد", pronunciation: "guten taak", emoji: "🌇" },
            { word: "Guten Abend", translation: "مساء الخير", pronunciation: "guten aa-bent", emoji: "🌃" },
            { word: "Gute Nacht", translation: "تصبح على خير", pronunciation: "gute nakht", emoji: "🌙" },
            { word: "Tschüss", translation: "وداعاً (غير رسمي)", pronunciation: "chüss", emoji: "👋" },
            { word: "Auf Wiedersehen", translation: "إلى اللقاء (رسمي)", pronunciation: "auf vee-der-zeen", emoji: "👋" },
            { word: "Wie geht es Ihnen?", translation: "كيف حال حضرتك؟", pronunciation: "vee gate es ee-nen", emoji: "❓" },
            { word: "Wie geht's?", translation: "كيف حالك؟", pronunciation: "vee gates", emoji: "❓" },
            { word: "Mir geht es gut, danke.", translation: "أنا بخير، شكراً.", pronunciation: "meer gate es goot, dan-ke", emoji: "😊" },
            { word: "Und Ihnen?", translation: "وحضرتك؟", pronunciation: "unt ee-nen", emoji: "❓" },
            { word: "Wie heißen Sie?", translation: "ما اسم حضرتك؟", pronunciation: "vee hai-sen zee", emoji: "❓" },
            { word: "Ich heiße...", translation: "اسمي هو...", pronunciation: "ish hai-se...", emoji: "🏷️" },
            { word: "Willkommen", translation: "أهلاً بك", pronunciation: "vil-ko-men", emoji: "🎉" },
        ],
        readingExercises: [
            readingExercise("Guten Morgen, wie geht es Ihnen?", "ابحث عن التحية الصباحية والسؤال عن الحال.", "صباح الخير، كيف حال حضرتك؟", ["Gute Nacht, bis morgen.", "Wie heißen Sie?", "Mir geht es gut, danke."]),
            readingExercise("Ich heiße Maria. Und Sie?", "تقديم النفس والسؤال عن الآخر", "اسمي ماريا. وحضرتك؟", ["أنا من ألمانيا.", "إلى اللقاء.", "أنا أتعلم الألمانية."])
        ],
        listeningExercises: [
            listeningExercise("Wie heißen Sie?", "سؤال للاستفسار عن اسم الشخص.", ["Wie geht es Ihnen?", "Auf Wiedersehen", "Guten Morgen"]),
            listeningExercise("Hallo", "التحية الأكثر شيوعاً.", ["Tschüss", "Danke", "Ja"])
        ]
    },
    numbers: {
        words: [
            { word: "Null", translation: "صفر", pronunciation: "nul", emoji: "0️⃣" },
            { word: "Eins", translation: "واحد", pronunciation: "ayns", emoji: "1️⃣" },
            { word: "Zwei", translation: "اثنان", pronunciation: "tsvai", emoji: "2️⃣" },
            { word: "Drei", translation: "ثلاثة", pronunciation: "drai", emoji: "3️⃣" },
            { word: "Vier", translation: "أربعة", pronunciation: "feer", emoji: "4️⃣" },
            { word: "Fünf", translation: "خمسة", pronunciation: "fünf", emoji: "5️⃣" },
            { word: "Sechs", translation: "ستة", pronunciation: "zeks", emoji: "6️⃣" },
            { word: "Sieben", translation: "سبعة", pronunciation: "zee-ben", emoji: "7️⃣" },
            { word: "Acht", translation: "ثمانية", pronunciation: "akht", emoji: "8️⃣" },
            { word: "Neun", translation: "تسعة", pronunciation: "noyn", emoji: "9️⃣" },
            { word: "Zehn", translation: "عشرة", pronunciation: "tsehn", emoji: "🔟" },
            { word: "Zwanzig", translation: "عشرون", pronunciation: "tsvan-tsish", emoji: "2️⃣0️⃣" },
            { word: "Dreißig", translation: "ثلاثون", pronunciation: "drai-sish", emoji: "3️⃣0️⃣" },
            { word: "Hundert", translation: "مئة", pronunciation: "hun-dert", emoji: "💯" },
            { word: "Tausend", translation: "ألف", pronunciation: "tau-zent", emoji: "1️⃣0️⃣0️⃣0️⃣" },
        ],
        readingExercises: [
            readingExercise("Ich habe zwei Katzen und einen Hund.", "ابحث عن الأرقام.", "لدي قطتان وكلب واحد.", ["لدي ثلاثة كتب.", "هناك عشرة طلاب.", "هذا يكلف خمسة يورو."]),
            readingExercise("Einundzwanzig", "لاحظ طريقة تركيب الأرقام (واحد وعشرون)", "21", ["12", "20", "22"])
        ],
        listeningExercises: [
            listeningExercise("Acht", "الرقم 8", ["Eins", "Drei", "Zehn"]),
            listeningExercise("Hundert", "الرقم 100", ["Tausend", "Zwanzig", "Null"])
        ]
    },
    colors: {
        words: [
            { word: "Farbe", translation: "لون", pronunciation: "far-be", emoji: "🎨" },
            { word: "Rot", translation: "أحمر", pronunciation: "roht", emoji: "🔴" },
            { word: "Grün", translation: "أخضر", pronunciation: "grün", emoji: "🟢" },
            { word: "Blau", translation: "أزرق", pronunciation: "blau", emoji: "🔵" },
            { word: "Gelb", translation: "أصفر", pronunciation: "gelp", emoji: "🟡" },
            { word: "Schwarz", translation: "أسود", pronunciation: "shvarts", emoji: "⚫" },
            { word: "Weiß", translation: "أبيض", pronunciation: "vais", emoji: "⚪" },
            { word: "Orange", translation: "برتقالي", pronunciation: "o-ran-zhe", emoji: "🟠" },
            { word: "Lila", translation: "بنفسجي", pronunciation: "lee-la", emoji: "🟣" },
            { word: "Braun", translation: "بني", pronunciation: "braun", emoji: "🟤" },
            { word: "Rosa", translation: "وردي", pronunciation: "ro-za", emoji: "🌸" },
            { word: "Grau", translation: "رمادي", pronunciation: "grau", emoji: "🐘" },
        ],
        readingExercises: [
            readingExercise("Der Himmel ist blau und das Gras ist grün.", "ركز على ترجمة 'blau' و 'grün'.", "السماء زرقاء والعشب أخضر.", ["التفاحة حمراء.", "أحب اللون الأبيض والأسود.", "سيارته سوداء."]),
            readingExercise("Sie hat ein rosa Kleid.", "ابحث عن 'rosa'.", "لديها فستان وردي.", ["القطة رمادية.", "هل تحب اللون الأصفر؟", "الشمس صفراء."])
        ],
        listeningExercises: [
            listeningExercise("Rot", "لون الدم.", ["Blau", "Grün", "Gelb"]),
            listeningExercise("Schwarz", "عكس اللون الأبيض.", ["Weiß", "Grau", "Braun"])
        ]
    },
    family: {
        words: [
            { word: "Familie", translation: "عائلة", pronunciation: "fa-mee-lye", emoji: "👨‍👩‍👧‍👦" },
            { word: "Vater", translation: "أب", pronunciation: "faa-ter", emoji: "👨" },
            { word: "Mutter", translation: "أم", pronunciation: "mu-ter", emoji: "👩" },
            { word: "Eltern", translation: "والدين", pronunciation: "el-tern", emoji: "👨‍👩‍👧" },
            { word: "Sohn", translation: "ابن", pronunciation: "zohn", emoji: "👦" },
            { word: "Tochter", translation: "ابنة", pronunciation: "tokh-ter", emoji: "👧" },
            { word: "Kind", translation: "طفل", pronunciation: "kint", emoji: "👶" },
            { word: "Bruder", translation: "أخ", pronunciation: "broo-der", emoji: "👱‍♂️" },
            { word: "Schwester", translation: "أخت", pronunciation: "shves-ter", emoji: "👱‍♀️" },
            { word: "Großvater", translation: "جد", pronunciation: "grohs-faa-ter", emoji: "👴" },
            { word: "Großmutter", translation: "جدة", pronunciation: "grohs-mu-ter", emoji: "👵" },
            { word: "Onkel", translation: "عم/خال", pronunciation: "on-kel", emoji: "👨‍" },
            { word: "Tante", translation: "عمة/خالة", pronunciation: "tan-te", emoji: "👩‍" },
            { word: "Cousin/Cousine", translation: "ابن/بنت العم/الخال", pronunciation: "ku-zan/ku-zee-ne", emoji: "🧑" },
            { word: "Ehemann", translation: "زوج", pronunciation: "e-he-man", emoji: "🤵" },
            { word: "Ehefrau", translation: "زوجة", pronunciation: "e-he-frau", emoji: "👰" },
        ],
        readingExercises: [
            readingExercise("Mein Vater und meine Mutter sind meine Eltern.", "ابحث عن ترجمة 'Vater', 'Mutter', و 'Eltern'.", "أبي وأمي هما والديّ.", ["أخي وأختي يلعبان.", "جدي يعيش في ميونخ.", "هذا ابني."]),
            readingExercise("Meine Schwester ist älter als mein Bruder.", "ركز على المقارنة بين 'Schwester' و 'Bruder'.", "أختي أكبر من أخي.", ["عائلتي كبيرة.", "ابن عمي لطيف.", "زوجها طبيب."])
        ],
        listeningExercises: [
            listeningExercise("Bruder", "شقيق ذكر.", ["Schwester", "Vater", "Mutter"]),
            listeningExercise("Mutter", "الكلمة الألمانية التي تعني 'أم'.", ["Vater", "Tochter", "Sohn"])
        ]
    },
    food: {
        words: [
            { word: "Essen", translation: "طعام", pronunciation: "es-sen", emoji: "🍔" },
            { word: "Getränk", translation: "شراب", pronunciation: "ge-trenk", emoji: "🥤" },
            { word: "Wasser", translation: "ماء", pronunciation: "vas-ser", emoji: "💧" },
            { word: "Kaffee", translation: "قهوة", pronunciation: "ka-fee", emoji: "☕" },
            { word: "Tee", translation: "شاي", pronunciation: "tee", emoji: "🍵" },
            { word: "Saft", translation: "عصير", pronunciation: "zaft", emoji: "🧃" },
            { word: "Milch", translation: "حليب", pronunciation: "milsh", emoji: "🥛" },
            { word: "Brot", translation: "خبز", pronunciation: "broht", emoji: "🍞" },
            { word: "Käse", translation: "جبن", pronunciation: "keh-ze", emoji: "🧀" },
            { word: "Reis", translation: "أرز", pronunciation: "rais", emoji: "🍚" },
            { word: "Hähnchen", translation: "دجاج", pronunciation: "hen-shen", emoji: "🍗" },
            { word: "Fleisch", translation: "لحم", pronunciation: "flaish", emoji: "🥩" },
            { word: "Fisch", translation: "سمك", pronunciation: "fish", emoji: "🐟" },
            { word: "Obst", translation: "فاكهة", pronunciation: "ohpst", emoji: "🍎" },
            { word: "Apfel", translation: "تفاحة", pronunciation: "ap-fel", emoji: "🍎" },
            { word: "Banane", translation: "موزة", pronunciation: "ba-naa-ne", emoji: "🍌" },
            { word: "Gemüse", translation: "خضروات", pronunciation: "ge-mü-ze", emoji: "🥕" },
            { word: "Karotte", translation: "جزرة", pronunciation: "ka-ro-te", emoji: "🥕" },
            { word: "Kartoffel", translation: "بطاطس", pronunciation: "kar-to-fel", emoji: "🥔" },
            { word: "Zucker", translation: "سكر", pronunciation: "tsu-ker", emoji: "🍬" },
            { word: "Salz", translation: "ملح", pronunciation: "zalts", emoji: "🧂" },
            { word: "Frühstück", translation: "فطور", pronunciation: "früh-shtük", emoji: "🍳" },
            { word: "Mittagessen", translation: "غداء", pronunciation: "mit-taag-es-sen", emoji: "🍱" },
            { word: "Abendessen", translation: "عشاء", pronunciation: "aa-bent-es-sen", emoji: "🍝" },
        ],
        readingExercises: [
            readingExercise("Ich bin hungrig. Ich möchte Brot und Käse essen.", "ركز على كلمتي 'Brot' و 'Käse'.", "أنا جائع. أريد أن آكل الخبز والجبن.", ["أنا عطشان. أريد أن أشرب الماء.", "الطعام لذيذ.", "هل يمكنني الحصول على القائمة؟"]),
            readingExercise("Zum Frühstück mag ich Kaffee und einen Apfel.", "ابحث عن طعام وشراب الفطور.", "في الفطور، أحب القهوة وتفاحة.", ["أنا آكل الأرز والدجاج على الغداء.", "العشاء جاهز الساعة السابعة.", "هذا العصير طازج."])
        ],
        listeningExercises: [
            listeningExercise("Apfel", "نوع من الفاكهة، غالبًا ما يكون أحمر أو أخضر.", ["Banane", "Wasser", "Brot"]),
            listeningExercise("Wasser", "شراب أساسي وشفاف.", ["Milch", "Saft", "Tee"])
        ]
    },
    time: {
        words: [
            { word: "Zeit", translation: "وقت", pronunciation: "tsait", emoji: "⏰" },
            { word: "Stunde", translation: "ساعة", pronunciation: "shtun-de", emoji: "⏳" },
            { word: "Minute", translation: "دقيقة", pronunciation: "mee-noo-te", emoji: "⏱️" },
            { word: "Sekunde", translation: "ثانية", pronunciation: "ze-kun-de", emoji: "⏱️" },
            { word: "Tag", translation: "يوم", pronunciation: "taak", emoji: "📅" },
            { word: "Woche", translation: "أسبوع", pronunciation: "vo-khe", emoji: "🗓️" },
            { word: "Monat", translation: "شهر", pronunciation: "mo-nat", emoji: "🈷️" },
            { word: "Jahr", translation: "سنة", pronunciation: "yaar", emoji: "🎉" },
            { word: "Montag", translation: "الإثنين", pronunciation: "mohn-taak", emoji: " M" },
            { word: "Dienstag", translation: "الثلاثاء", pronunciation: "deens-taak", emoji: "T" },
            { word: "Mittwoch", translation: "الأربعاء", pronunciation: "mit-vokh", emoji: "W" },
            { word: "Donnerstag", translation: "الخميس", pronunciation: "do-ners-taak", emoji: "T" },
            { word: "Freitag", translation: "الجمعة", pronunciation: "frai-taak", emoji: "F" },
            { word: "Samstag", translation: "السبت", pronunciation: "zams-taak", emoji: "S" },
            { word: "Sonntag", translation: "الأحد", pronunciation: "zon-taak", emoji: "S" },
            { word: "Heute", translation: "اليوم", pronunciation: "hoy-te", emoji: "👇" },
            { word: "Morgen", translation: "غداً", pronunciation: "mor-gen", emoji: "➡️" },
            { word: "Gestern", translation: "أمس", pronunciation: "ges-tern", emoji: "⬅️" },
        ],
        readingExercises: [
            readingExercise("Heute ist Montag und morgen ist Dienstag.", "ترجم 'Heute', 'Montag', 'morgen', 'Dienstag'.", "اليوم هو الإثنين، وغداً هو الثلاثاء.", ["أمس كان الأحد.", "لدي اجتماع يوم الجمعة.", "الشهر فيه أربعة أسابيع."]),
            readingExercise("Das Treffen ist um zehn Uhr.", "ابحث عن الوقت.", "الاجتماع في الساعة العاشرة.", ["أراك في المساء.", "انتظر دقيقة من فضلك.", "السنة بها اثنا عشر شهراً."])
        ],
        listeningExercises: [
            listeningExercise("Freitag", "اليوم الذي يسبق عطلة نهاية الأسبوع.", ["Montag", "Sonntag", "Woche"]),
            listeningExercise("Morgen", "اليوم الذي يأتي بعد اليوم.", ["Heute", "Gestern", "Tag"])
        ]
    },
    weather: {
        words: [
            { word: "Wetter", translation: "الطقس", pronunciation: "vet-ter", emoji: "🌦️" },
            { word: "Sonne", translation: "شمس", pronunciation: "zon-ne", emoji: "☀️" },
            { word: "Sonnig", translation: "مشمس", pronunciation: "zo-nish", emoji: "☀️" },
            { word: "Wolke", translation: "غيمة", pronunciation: "vol-ke", emoji: "☁️" },
            { word: "Bewölkt", translation: "غائم", pronunciation: "be-völkt", emoji: "☁️" },
            { word: "Regen", translation: "مطر", pronunciation: "re-gen", emoji: "🌧️" },
            { word: "Wind", translation: "رياح", pronunciation: "vint", emoji: "💨" },
            { word: "Schnee", translation: "ثلج", pronunciation: "shnee", emoji: "❄️" },
            { word: "Heiß", translation: "حار", pronunciation: "hais", emoji: "🌡️" },
            { word: "Kalt", translation: "بارد", pronunciation: "kalt", emoji: "🥶" },
            { word: "Warm", translation: "دافئ", pronunciation: "varm", emoji: "😊" },
            { word: "Kühl", translation: "معتدل البرودة", pronunciation: "kühl", emoji: "😎" },
            { word: "Sturm", translation: "عاصفة", pronunciation: "shturm", emoji: "⛈️" },
        ],
        readingExercises: [
            readingExercise("Es ist sonnig und heiß heute.", "ابحث عن الكلمات التي تصف الشمس والحرارة.", "الجو مشمس وحار اليوم.", ["الجو غائم وبارد.", "غداً ستمطر.", "أنا أحب الطقس المثلج."]),
            readingExercise("Im Winter ist es kalt und es schneit.", "ابحث عن كلمات الشتاء.", "في الشتاء، يكون الجو بارداً ويتساقط الثلج.", ["الرياح قوية اليوم.", "أحضر مظلتك، إنها تمطر.", "الجو ضبابي في الصباح."])
        ],
        listeningExercises: [
            listeningExercise("Regen", "عندما يسقط الماء من السماء.", ["Sonne", "Wolke", "Wind"]),
            listeningExercise("Kalt", "عكس كلمة 'حار'.", ["Heiß", "Warm", "Kühl"])
        ]
    },
    home: {
        words: [
            { word: "Haus", translation: "منزل", pronunciation: "haus", emoji: "🏠" },
            { word: "Wohnung", translation: "شقة", pronunciation: "vo-nung", emoji: "🏢" },
            { word: "Zimmer", translation: "غرفة", pronunciation: "tsi-mer", emoji: "🚪" },
            { word: "Schlafzimmer", translation: "غرفة نوم", pronunciation: "shlaf-tsi-mer", emoji: "🛏️" },
            { word: "Badezimmer", translation: "حمام", pronunciation: "baa-de-tsi-mer", emoji: "🛁" },
            { word: "Küche", translation: "مطبخ", pronunciation: "kü-she", emoji: "🍳" },
            { word: "Wohnzimmer", translation: "غرفة معيشة", pronunciation: "vohn-tsi-mer", emoji: "🛋️" },
            { word: "Tür", translation: "باب", pronunciation: "tür", emoji: "🚪" },
            { word: "Fenster", translation: "نافذة", pronunciation: "fens-ter", emoji: "🪟" },
            { word: "Tisch", translation: "طاولة", pronunciation: "tish", emoji: "🪵" },
            { word: "Stuhl", translation: "كرسي", pronunciation: "shtool", emoji: "🪑" },
            { word: "Bett", translation: "سرير", pronunciation: "bet", emoji: "🛏️" },
            { word: "Schlüssel", translation: "مفتاح", pronunciation: "shlüs-sel", emoji: "🔑" },
        ],
        readingExercises: [
            readingExercise("Die Küche hat einen Tisch und ein Fenster.", "ترجم 'Küche', 'Tisch', و 'Fenster'.", "المطبخ به طاولة ونافذة.", ["غرفة النوم بها سرير وباب.", "غرفة المعيشة بها كرسي.", "مفتاح المنزل في الحديقة."]),
            readingExercise("Ich schlafe im Schlafzimmer.", "ابحث عن مكان النوم.", "أنا أنام في غرفة النوم.", ["نحن نأكل في غرفة الطعام.", "الحمام في نهاية الممر.", "الشقة في الطابق الثالث."])
        ],
        listeningExercises: [
            listeningExercise("Küche", "المكان الذي نطبخ فيه الطعام.", ["Schlafzimmer", "Badezimmer", "Garten"]),
            listeningExercise("Tür", "تستخدمه للدخول والخروج من غرفة.", ["Fenster", "Tisch", "Bett"])
        ]
    },
    shopping: {
        words: [
            { word: "Geschäft", translation: "متجر", pronunciation: "ge-sheft", emoji: "🏬" },
            { word: "Markt", translation: "سوق", pronunciation: "markt", emoji: "🛒" },
            { word: "Geld", translation: "مال", pronunciation: "gelt", emoji: "💰" },
            { word: "Preis", translation: "سعر", pronunciation: "prais", emoji: "💲" },
            { word: "Kaufen", translation: "يشتري", pronunciation: "kau-fen", emoji: "🛍️" },
            { word: "Verkaufen", translation: "يبيع", pronunciation: "fer-kau-fen", emoji: "🏷️" },
            { word: "Bezahlen", translation: "يدفع", pronunciation: "be-tsaa-len", emoji: "💳" },
            { word: "Teuer", translation: "غالي", pronunciation: "toy-er", emoji: "💎" },
            { word: "Billig", translation: "رخيص", pronunciation: "bi-lish", emoji: "🪙" },
            { word: "Rechnung", translation: "فاتورة", pronunciation: "resh-nung", emoji: "🧾" },
            { word: "Bargeld", translation: "نقد", pronunciation: "bar-gelt", emoji: "💵" },
            { word: "Kreditkarte", translation: "بطاقة ائتمان", pronunciation: "kre-dit-kar-te", emoji: "💳" },
        ],
        readingExercises: [
            readingExercise("Was kostet das? Der Preis ist sehr teuer.", "ابحث عن السؤال عن السعر ووصفه بأنه 'teuer'.", "كم سعر هذا؟ السعر غالي جداً.", ["أريد شراء هذا من فضلك.", "هل يمكنني الدفع بالبطاقة؟", "هذا المتجر رخيص جداً."]),
            readingExercise("Ich bezahle mit Kreditkarte.", "ابحث عن طريقة الدفع.", "سأدفع ببطاقة الائتمان.", ["هل تقبلون الدفع نقدًا؟", "هذا السوق كبير جدًا.", "الزبون دائمًا على حق."])
        ],
        listeningExercises: [
            listeningExercise("Geld", "ما تستخدمه للشراء.", ["Preis", "Geschäft", "Rechnung"]),
            listeningExercise("Kaufen", "فعل الحصول على شيء مقابل المال.", ["Verkaufen", "Bezahlen", "Haben"])
        ]
    },
    body: {
        words: [
            { word: "Körper", translation: "جسم", pronunciation: "kör-per", emoji: "🧍" },
            { word: "Kopf", translation: "رأس", pronunciation: "kopf", emoji: "👤" },
            { word: "Gesicht", translation: "وجه", pronunciation: "ge-zisht", emoji: "😊" },
            { word: "Auge", translation: "عين", pronunciation: "au-ge", emoji: "👁️" },
            { word: "Nase", translation: "أنف", pronunciation: "naa-ze", emoji: "👃" },
            { word: "Mund", translation: "فم", pronunciation: "munt", emoji: "👄" },
            { word: "Ohr", translation: "أذن", pronunciation: "ohr", emoji: "👂" },
            { word: "Haar", translation: "شعر", pronunciation: "haar", emoji: "👱" },
            { word: "Zahn", translation: "سن", pronunciation: "tsaan", emoji: "🦷" },
            { word: "Arm", translation: "ذراع", pronunciation: "arm", emoji: "💪" },
            { word: "Hand", translation: "يد", pronunciation: "hant", emoji: "✋" },
            { word: "Finger", translation: "إصبع", pronunciation: "fing-er", emoji: "👆" },
            { word: "Bein", translation: "ساق", pronunciation: "bain", emoji: "🦵" },
            { word: "Fuß", translation: "قدم", pronunciation: "foos", emoji: "🦶" },
            { word: "Herz", translation: "قلب", pronunciation: "herts", emoji: "❤️" },
            { word: "Magen", translation: "معدة", pronunciation: "maa-gen", emoji: "🍔" },
        ],
        readingExercises: [
            readingExercise("Ich habe zwei Augen, eine Nase und einen Mund.", "عد أجزاء الوجه المذكورة.", "لدي عينان وأنف واحد وفم واحد.", ["أنا أغسل يدي.", "رأسي يؤلمني.", "هو لديه شعر أسود."]),
            readingExercise("Mein Magen tut weh.", "ابحث عن الجزء الذي يؤلم.", "معدتي تؤلمني.", ["قلبي ينبض.", "لدي خمسة أصابع.", "ذراعي قوية."])
        ],
        listeningExercises: [
            listeningExercise("Hand", "الجزء من الجسم الذي به خمسة أصابع.", ["Fuß", "Kopf", "Auge"]),
            listeningExercise("Haar", "ينمو على الرأس.", ["Gesicht", "Nase", "Ohr"])
        ]
    },
    clothing: {
        words: [
            { word: "Kleidung", translation: "ملابس", pronunciation: "klai-dung", emoji: "👕" },
            { word: "Hemd", translation: "قميص", pronunciation: "hemt", emoji: "👕" },
            { word: "T-Shirt", translation: "تي شيرت", pronunciation: "tee-shirt", emoji: "👕" },
            { word: "Hose", translation: "بنطال", pronunciation: "ho-ze", emoji: "👖" },
            { word: "Rock", translation: "تنورة", pronunciation: "rok", emoji: "👗" },
            { word: "Jacke", translation: "سترة", pronunciation: "ya-ke", emoji: "🧥" },
            { word: "Mantel", translation: "معطف", pronunciation: "man-tel", emoji: "🧥" },
            { word: "Schuhe", translation: "حذاء", pronunciation: "shoo-e", emoji: "👟" },
            { word: "Socken", translation: "جوارب", pronunciation: "zo-ken", emoji: "🧦" },
            { word: "Hut", translation: "قبعة", pronunciation: "hoot", emoji: "🧢" },
        ],
        readingExercises: [
            readingExercise("Ich trage ein blaues Hemd und eine schwarze Hose.", "ابحث عن 'Hemd' و 'Hose' وألوانها.", "أنا أرتدي قميصاً أزرق وبنطالاً أسود.", ["حذائي الجديد لونه أبيض.", "أحتاج شراء سترة للشتاء.", "هذه القبعة جميلة."]),
            readingExercise("Im Winter trage ich einen Mantel.", "ابحث عن ملابس الشتاء.", "في الشتاء، أرتدي معطفًا.", ["إنها ترتدي تنورة حمراء.", "هل رأيت جواربي؟", "هذا التي شيرت كبير."])
        ],
        listeningExercises: [
            listeningExercise("Schuhe", "ما ترتديه في قدميك.", ["Hemd", "Hut", "Socken"]),
            listeningExercise("Jacke", "ترتديه فوق قميصك عندما يكون الجو باردًا.", ["Hose", "Rock", "Socken"])
        ]
    },
    verbs: {
        words: [
            { word: "sein", translation: "يكون", pronunciation: "zain", emoji: "🧘" },
            { word: "haben", translation: "يملك", pronunciation: "haa-ben", emoji: "🤲" },
            { word: "machen", translation: "يفعل/يصنع", pronunciation: "ma-khen", emoji: "💪" },
            { word: "sagen", translation: "يقول", pronunciation: "zaa-gen", emoji: "🗣️" },
            { word: "gehen", translation: "يذهب", pronunciation: "ge-en", emoji: "🚶" },
            { word: "können", translation: "يستطيع", pronunciation: "kö-nen", emoji: "🏋️" },
            { word: "wollen", translation: "يريد", pronunciation: "vo-len", emoji: "🙋" },
            { word: "wissen", translation: "يعرف", pronunciation: "vis-sen", emoji: "🧠" },
            { word: "sehen", translation: "يرى", pronunciation: "ze-en", emoji: "👀" },
            { word: "kommen", translation: "يأتي", pronunciation: "ko-men", emoji: "👋" },
            { word: "essen", translation: "يأكل", pronunciation: "es-sen", emoji: "🍔" },
            { word: "trinken", translation: "يشرب", pronunciation: "trin-ken", emoji: "🥤" },
            { word: "sprechen", translation: "يتحدث", pronunciation: "shpre-shen", emoji: "💬" },
            { word: "lesen", translation: "يقرأ", pronunciation: "le-zen", emoji: "📖" },
            { word: "schreiben", translation: "يكتب", pronunciation: "shrai-ben", emoji: "✍️" },
        ],
        readingExercises: [
            readingExercise("Ich muss zur Arbeit gehen, aber ich will zu Hause bleiben.", "ابحث عن الأفعال المتناقضة.", "يجب أن أذهب إلى العمل، لكني أريد أن أبقى في المنزل.", ["هو يرى ويسمع كل شيء.", "هل يمكنك مساعدتي؟", "هي تحاول تعلم لغة جديدة."]),
            readingExercise("Er kann auf Deutsch lesen und schreiben.", "ابحث عن المهارات اللغوية.", "هو يستطيع القراءة والكتابة بالألمانية.", ["لا تتكلم وتأكل في نفس الوقت.", "سأعود بعد ساعة.", "هم يلعبون ويفوزون."])
        ],
        listeningExercises: [
            listeningExercise("denken", "يفكر", ["essen", "schlafen", "sprechen"]),
            listeningExercise("lieben", "يحب", ["hassen", "haben", "sein"])
        ]
    },
    adjectives: {
        words: [
            { word: "gut", translation: "جيد", pronunciation: "goot", emoji: "👍" },
            { word: "schlecht", translation: "سيء", pronunciation: "shlesht", emoji: "👎" },
            { word: "neu", translation: "جديد", pronunciation: "noy", emoji: "✨" },
            { word: "alt", translation: "قديم/عجوز", pronunciation: "alt", emoji: "📜" },
            { word: "groß", translation: "كبير", pronunciation: "grohs", emoji: "🐘" },
            { word: "klein", translation: "صغير", pronunciation: "klain", emoji: "🐭" },
            { word: "lang", translation: "طويل", pronunciation: "lang", emoji: "📏" },
            { word: "kurz", translation: "قصير", pronunciation: "kurts", emoji: "📏" },
            { word: "heiß", translation: "حار", pronunciation: "hais", emoji: "🔥" },
            { word: "kalt", translation: "بارد", pronunciation: "kalt", emoji: "❄️" },
            { word: "glücklich", translation: "سعيد", pronunciation: "glük-lish", emoji: "😄" },
            { word: "traurig", translation: "حزين", pronunciation: "trau-rish", emoji: "😢" },
            { word: "einfach", translation: "سهل", pronunciation: "ain-fakh", emoji: "✅" },
            { word: "schwierig", translation: "صعب", pronunciation: "shvee-rish", emoji: "❌" },
            { word: "schön", translation: "جميل", pronunciation: "shön", emoji: "😍" },
            { word: "schnell", translation: "سريع", pronunciation: "shnel", emoji: "🏃" },
            { word: "langsam", translation: "بطيء", pronunciation: "lang-zam", emoji: "🐢" },
        ],
        readingExercises: [
            readingExercise("Das neue Auto ist schnell, aber das alte Auto ist langsam.", "ابحث عن الصفات المتضادة.", "السيارة الجديدة سريعة، لكن السيارة القديمة بطيئة.", ["هذا الكتاب جيد وذلك سيء.", "هل السؤال سهل أم صعب؟", "الجو حار جدًا اليوم."]),
            readingExercise("Sie hat eine schöne Stimme.", "ابحث عن الصفة الإيجابية.", "لديها صوت جميل.", ["الرجل القوي يساعد الرجل الضعيف.", "الغرفة نظيفة.", "القصة طويلة."])
        ],
        listeningExercises: [
            listeningExercise("wichtig", "مهم", ["einfach", "schwierig", "falsch"]),
            listeningExercise("glücklich", "سعيد", ["traurig", "wütend", "müde"])
        ]
    },
    places: {
        words: [
            { word: "Ort", translation: "مكان", pronunciation: "ort", emoji: "📍" },
            { word: "Stadt", translation: "مدينة", pronunciation: "shtat", emoji: "🏙️" },
            { word: "Land", translation: "دولة/ريف", pronunciation: "lant", emoji: "🇩🇪" },
            { word: "Schule", translation: "مدرسة", pronunciation: "shoo-le", emoji: "🏫" },
            { word: "Krankenhaus", translation: "مستشفى", pronunciation: "kran-ken-haus", emoji: "🏥" },
            { word: "Restaurant", translation: "مطعم", pronunciation: "res-to-rant", emoji: "🍔" },
            { word: "Hotel", translation: "فندق", pronunciation: "ho-tel", emoji: "🏨" },
            { word: "Flughafen", translation: "مطار", pronunciation: "floog-haa-fen", emoji: "✈️" },
            { word: "Bahnhof", translation: "محطة قطار", pronunciation: "baan-hohf", emoji: "🚉" },
            { word: "Park", translation: "حديقة عامة", pronunciation: "park", emoji: "🌳" },
            { word: "Strand", translation: "شاطئ", pronunciation: "shtrant", emoji: "🏖️" },
            { word: "Bank", translation: "بنك", pronunciation: "bank", emoji: "🏦" },
            { word: "Büro", translation: "مكتب", pronunciation: "bü-ro", emoji: "🏢" },
            { word: "Straße", translation: "شارع", pronunciation: "shtra-se", emoji: "🛣️" },
        ],
        readingExercises: [
            readingExercise("Ich gehe zur Schule und dann zur Bibliothek.", "ابحث عن أماكن التعلم.", "أذهب إلى المدرسة ثم إلى المكتبة.", ["المستشفى بجوار البنك.", "هل يوجد مطعم جيد في هذه المدينة؟", "نحن نعيش في شقة."]),
            readingExercise("Im Sommer gehen wir gerne an den Strand.", "ابحث عن أماكن الترفيه الصيفية.", "في الصيف، نحب أن نذهب إلى الشاطئ.", ["المطار بعيد عن وسط المدينة.", "هناك سوق جديد في الشارع.", "الفندق يقع على النهر."])
        ],
        listeningExercises: [
            listeningExercise("Krankenhaus", "المكان الذي تذهب إليه عندما تكون مريضاً.", ["Schule", "Hotel", "Bank"]),
            listeningExercise("Stadt", "مكان كبير به الكثير من الناس والمباني.", ["Dorf", "Land", "Bauernhof"])
        ]
    },
    nature: {
        words: [
            { word: "Natur", translation: "طبيعة", pronunciation: "na-toor", emoji: "🏞️" },
            { word: "Baum", translation: "شجرة", pronunciation: "baum", emoji: "🌳" },
            { word: "Blume", translation: "زهرة", pronunciation: "bloo-me", emoji: "🌸" },
            { word: "Sonne", translation: "شمس", pronunciation: "zon-ne", emoji: "☀️" },
            { word: "Mond", translation: "قمر", pronunciation: "mohnt", emoji: "🌙" },
            { word: "Stern", translation: "نجمة", pronunciation: "shtern", emoji: "⭐" },
            { word: "Himmel", translation: "سماء", pronunciation: "him-mel", emoji: "☁️" },
            { word: "Wasser", translation: "ماء", pronunciation: "vas-ser", emoji: "💧" },
            { word: "Feuer", translation: "نار", pronunciation: "foy-er", emoji: "🔥" },
            { word: "Berg", translation: "جبل", pronunciation: "berk", emoji: "⛰️" },
            { word: "Fluss", translation: "نهر", pronunciation: "flus", emoji: "🏞️" },
            { word: "Meer", translation: "بحر", pronunciation: "meer", emoji: "🌊" },
            { word: "Tier", translation: "حيوان", pronunciation: "teer", emoji: "🐾" },
            { word: "Hund", translation: "كلب", pronunciation: "hunt", emoji: "🐕" },
            { word: "Katze", translation: "قطة", pronunciation: "kat-se", emoji: "🐈" },
            { word: "Vogel", translation: "طائر", pronunciation: "fo-gel", emoji: "🐦" },
        ],
        readingExercises: [
            readingExercise("Die Sonne ist am Himmel und der Fisch ist im Meer.", "ابحث عن مكونات السماء والبحر.", "الشمس في السماء، والسمكة في البحر.", ["الجبل عالٍ والنهر طويل.", "الأشجار خضراء في الغابة.", "أحب صوت المطر والرياح."]),
            readingExercise("Ein kleiner Vogel sitzt auf einem großen Baum.", "ابحث عن الكائن الصغير والكبير.", "طائر صغير يجلس على شجرة كبيرة.", ["القطة تلعب بالكرة.", "الزهور جميلة في الربيع.", "الصحراء حارة وجافة."])
        ],
        listeningExercises: [
            listeningExercise("Baum", "نبات كبير له جذع وأغصان.", ["Blume", "Gras", "Berg"]),
            listeningExercise("Wasser", "سائل شفاف ضروري للحياة.", ["Feuer", "Luft", "Sand"])
        ]
    },
    hobbies: {
        words: [
            { word: "Hobby", translation: "هواية", pronunciation: "ho-bi", emoji: "🎨" },
            { word: "Lesen", translation: "قراءة", pronunciation: "le-zen", emoji: "📖" },
            { word: "Musik hören", translation: "الاستماع للموسيقى", pronunciation: "moo-zeek hö-ren", emoji: "🎵" },
            { word: "Filme sehen", translation: "مشاهدة أفلام", pronunciation: "fil-me ze-en", emoji: "🎬" },
            { word: "Sport", translation: "رياضة", pronunciation: "shport", emoji: "⚽" },
            { word: "Reisen", translation: "سفر", pronunciation: "rai-zen", emoji: "✈️" },
            { word: "Kochen", translation: "طبخ", pronunciation: "ko-khen", emoji: "🍳" },
            { word: "Spielen", translation: "لعب", pronunciation: "shpee-len", emoji: "🎮" },
            { word: "Tanzen", translation: "رقص", pronunciation: "tan-tsen", emoji: "💃" },
            { word: "Singen", translation: "غناء", pronunciation: "zing-en", emoji: "🎤" },
        ],
        readingExercises: [
            readingExercise("Mein Hobby ist Lesen und Musik hören.", "ابحث عن الهوايات المذكورة.", "هوايتي هي القراءة والاستماع للموسيقى.", ["هو يحب ممارسة الرياضة.", "هل تحب السفر؟", "هي جيدة في الطبخ."]),
            readingExercise("Wir sehen am Wochenende einen Film.", "اقتراح نشاط", "سنشاهد فيلما في نهاية الأسبوع.", ["هو يحب لعب ألعاب الكمبيوتر.", "الرقص هواية جيدة.", "أخي يحب الغناء."])
        ],
        listeningExercises: [
            listeningExercise("Sport", "نشاط بدني مثل كرة القدم أو السباحة.", ["Musik", "Film", "Lesen"]),
            listeningExercise("Kochen", "تحضير الطعام.", ["Reisen", "Malen", "Singen"])
        ]
    },
    emotions: {
        words: [
            { word: "Gefühl", translation: "شعور", pronunciation: "ge-fühl", emoji: "❤️" },
            { word: "Glücklich", translation: "سعيد", pronunciation: "glük-lish", emoji: "😄" },
            { word: "Traurig", translation: "حزين", pronunciation: "trau-rish", emoji: "😢" },
            { word: "Wütend", translation: "غاضب", pronunciation: "vü-tent", emoji: "😠" },
            { word: "Müde", translation: "متعب", pronunciation: "mü-de", emoji: "😴" },
            { word: "Gelangweilt", translation: "ملل", pronunciation: "ge-lang-vailt", emoji: "😒" },
            { word: "Aufgeregt", translation: "متحمس", pronunciation: "auf-ge-regt", emoji: "🤩" },
            { word: "Liebe", translation: "حب", pronunciation: "lee-be", emoji: "❤️" },
            { word: "Angst", translation: "خوف", pronunciation: "angst", emoji: "😨" },
        ],
        readingExercises: [
            readingExercise("Ich bin glücklich, dich zu sehen.", "التعبير عن السعادة", "أنا سعيد لرؤيتك.", ["لماذا أنت غاضب؟", "لا تخف.", "أنا متعب قليلاً."]),
            readingExercise("Er ist traurig, weil er die Prüfung nicht bestanden hat.", "سبب الحزن", "هو حزين لأنه لم ينجح في الامتحان.", ["لا تقلق.", "أنا متحمس للرحلة.", "هذا الفيلم ممل."])
        ],
        listeningExercises: [
            listeningExercise("Glücklich", "الشعور بالسعادة.", ["Traurig", "Wütend", "Müde"]),
            listeningExercise("Müde", "عندما تحتاج إلى الراحة.", ["Wach", "Hungrig", "Durstig"]),
            listeningExercise("Liebe", "شعور قوي بالمودة.", ["Hass", "Angst", "Hoffnung"])
        ]
    },
    work: {
        words: [
            { word: "Arbeit", translation: "عمل", pronunciation: "ar-bait", emoji: "🏢" },
            { word: "Beruf", translation: "وظيفة", pronunciation: "be-roof", emoji: "💼" },
            { word: "Büro", translation: "مكتب", pronunciation: "bü-ro", emoji: "🏢" },
            { word: "Firma", translation: "شركة", pronunciation: "fir-ma", emoji: "🏭" },
            { word: "Chef", translation: "مدير", pronunciation: "shef", emoji: "👨‍💼" },
            { word: "Kollege", translation: "زميل", pronunciation: "ko-le-ge", emoji: "👥" },
            { word: "Gehalt", translation: "راتب", pronunciation: "ge-halt", emoji: "💵" },
            { word: "Computer", translation: "حاسوب", pronunciation: "kom-pyu-ter", emoji: "💻" },
            { word: "Projekt", translation: "مشروع", pronunciation: "pro-yekt", emoji: "📈" },
            { word: "Aufgabe", translation: "مهمة", pronunciation: "auf-ga-be", emoji: "📋" },
        ],
        readingExercises: [
            readingExercise("Ich arbeite in einer deutschen Firma.", "مكان العمل", "أنا أعمل في شركة ألمانية.", ["المدير في اجتماع.", "راتبي ليس مرتفعاً.", "أنا مشغول هذا الأسبوع."]),
            readingExercise("Bitte gib mir deine Telefonnummer.", "طلب معلومات الاتصال", "من فضلك أعطني رقم هاتفك.", ["زميلي لطيف جداً.", "لدينا مشروع جديد.", "غداً سآخذ إجازة."])
        ],
        listeningExercises: [
            listeningExercise("Arbeit", "الكلمة العامة للعمل أو الوظيفة.", ["Firma", "Schule", "Haus"]),
            listeningExercise("Chef", "الشخص المسؤول في العمل.", ["Kollege", "Kunde", "Lehrer"]),
            listeningExercise("Büro", "المكان الذي يعمل فيه الموظفون عادة.", ["Küche", "Park", "Kino"])
        ]
    },
    travel: {
        words: [
            { word: "Reise", translation: "سفر/رحلة", pronunciation: "rai-ze", emoji: "🌍" },
            { word: "Urlaub", translation: "عطلة", pronunciation: "ur-laub", emoji: "🏖️" },
            { word: "Flughafen", translation: "مطار", pronunciation: "floog-haa-fen", emoji: "✈️" },
            { word: "Flugzeug", translation: "طائرة", pronunciation: "floog-tsoyg", emoji: "✈️" },
            { word: "Pass", translation: "جواز سفر", pronunciation: "pas", emoji: "🛂" },
            { word: "Ticket", translation: "تذكرة", pronunciation: "ti-ket", emoji: "🎟️" },
            { word: "Hotel", translation: "فندق", pronunciation: "ho-tel", emoji: "🏨" },
            { word: "Zug", translation: "قطار", pronunciation: "tsook", emoji: "🚆" },
            { word: "Auto", translation: "سيارة", pronunciation: "au-to", emoji: "🚗" },
            { word: "Bus", translation: "حافلة", pronunciation: "bus", emoji: "🚌" },
            { word: "Taxi", translation: "سيارة أجرة", pronunciation: "tak-si", emoji: "🚕" },
            { word: "Karte", translation: "خريطة", pronunciation: "kar-te", emoji: "🗺️" },
            { word: "Koffer", translation: "حقيبة سفر", pronunciation: "ko-fer", emoji: "🧳" },
            { word: "Tourist", translation: "سائح", pronunciation: "tu-rist", emoji: "📸" },
        ],
        readingExercises: [
            readingExercise("Ich brauche ein Ticket für den Zug nach Berlin.", "شراء تذكرة", "أحتاج تذكرة قطار إلى برلين.", ["أين جواز سفري؟", "لقد حجزت فندقاً.", "المطار بعيد."]),
            readingExercise("Wir machen Urlaub in Italien.", "وجهة العطلة", "نحن نقضي عطلتنا في إيطاليا.", ["هناك الكثير من السياح هنا.", "أمتعتي ثقيلة.", "سآخذ سيارة أجرة."])
        ],
        listeningExercises: [
            listeningExercise("Reise", "فعل السفر أو السياحة.", ["Arbeit", "Studium", "Essen"]),
            listeningExercise("Flugzeug", "وسيلة نقل تطير في السماء.", ["Zug", "Auto", "Schiff"]),
            listeningExercise("Hotel", "المكان الذي تقيم فيه عند السفر.", ["Haus", "Schule", "Krankenhaus"])
        ]
    },
    animals: {
        words: [
            { word: "Tier", translation: "حيوان", pronunciation: "teer", emoji: "🐾" },
            { word: "Hund", translation: "كلب", pronunciation: "hunt", emoji: "🐕" },
            { word: "Katze", translation: "قطة", pronunciation: "kat-se", emoji: "🐈" },
            { word: "Löwe", translation: "أسد", pronunciation: "lö-ve", emoji: "🦁" },
            { word: "Tiger", translation: "نمر", pronunciation: "tee-ger", emoji: "🐅" },
            { word: "Elefant", translation: "فيل", pronunciation: "e-le-fant", emoji: "🐘" },
            { word: "Affe", translation: "قرد", pronunciation: "af-fe", emoji: "🐒" },
            { word: "Pferd", translation: "حصان", pronunciation: "pfert", emoji: "🐎" },
            { word: "Vogel", translation: "طائر", pronunciation: "fo-gel", emoji: "🐦" },
            { word: "Fisch", translation: "سمكة", pronunciation: "fish", emoji: "🐟" },
        ],
        readingExercises: [
            readingExercise("Der Löwe ist der König der Tiere.", "وصف حيوان", "الأسد هو ملك الحيوانات.", ["القطة تشرب الحليب.", "أحب الكلاب.", "الفيل كبير جداً."]),
        ],
        listeningExercises: [
            listeningExercise("Elefant", "حيوان كبير له خرطوم.", ["Hund", "Katze", "Affe"]),
        ]
    },
    transportation: {
        words: [
            { word: "Verkehr", translation: "مواصلات", pronunciation: "fer-kehr", emoji: "🚦" },
            { word: "Auto", translation: "سيارة", pronunciation: "au-to", emoji: "🚗" },
            { word: "Bus", translation: "حافلة", pronunciation: "bus", emoji: "🚌" },
            { word: "Zug", translation: "قطار", pronunciation: "tsook", emoji: "🚆" },
            { word: "Flugzeug", translation: "طائرة", pronunciation: "floog-tsoyg", emoji: "✈️" },
            { word: "Fahrrad", translation: "دراجة هوائية", pronunciation: "far-rat", emoji: "🚲" },
            { word: "Motorrad", translation: "دراجة نارية", pronunciation: "mo-to-rat", emoji: "🏍️" },
            { word: "Schiff", translation: "سفينة", pronunciation: "shif", emoji: "🚢" },
            { word: "Taxi", translation: "سيارة أجرة", pronunciation: "tak-si", emoji: "🚕" },
            { word: "U-Bahn", translation: "مترو الأنفاق", pronunciation: "oo-baan", emoji: "🚇" },
        ],
        readingExercises: [
            readingExercise("Ich fahre mit dem Bus zur Arbeit.", "وسيلة النقل", "أذهب إلى العمل بالحافلة.", ["القطار سريع جداً.", "هل يمكنك قيادة سيارة؟", "السفر بالطائرة مريح."]),
        ],
        listeningExercises: [
            listeningExercise("Zug", "وسيلة نقل تسير على قضبان.", ["Auto", "Bus", "Flugzeug"]),
        ]
    },
    education: {
        words: [
            { word: "Bildung", translation: "تعليم", pronunciation: "bil-dung", emoji: "🎓" },
            { word: "Schule", translation: "مدرسة", pronunciation: "shoo-le", emoji: "🏫" },
            { word: "Universität", translation: "جامعة", pronunciation: "u-ni-ver-si-tet", emoji: "🎓" },
            { word: "Lehrer", translation: "معلم", pronunciation: "leh-rer", emoji: "👨‍🏫" },
            { word: "Schüler", translation: "طالب", pronunciation: "shü-ler", emoji: "🧑‍🎓" },
            { word: "Buch", translation: "كتاب", pronunciation: "bookh", emoji: "📚" },
            { word: "Stift", translation: "قلم", pronunciation: "shtift", emoji: "🖊️" },
            { word: "Prüfung", translation: "امتحان", pronunciation: "prü-fung", emoji: "📝" },
            { word: "Hausaufgabe", translation: "واجب منزلي", pronunciation: "haus-auf-ga-be", emoji: "📓" },
            { word: "Klassenzimmer", translation: "فصل دراسي", pronunciation: "klas-sen-tsi-mer", emoji: "🧑‍🏫" },
        ],
        readingExercises: [
            readingExercise("Der Lehrer ist im Klassenzimmer.", "وصف مشهد دراسي", "المعلم في الفصل الدراسي.", ["لدي امتحان صعب غداً.", "يجب أن أفعل واجبي.", "الطلاب يقرؤون الكتب."]),
        ],
        listeningExercises: [
            listeningExercise("Buch", "شيء تقرأه.", ["Stift", "Prüfung", "Schule"]),
        ]
    },
    health: {
        words: [
            { word: "Gesundheit", translation: "صحة", pronunciation: "ge-zund-hait", emoji: "💪" },
            { word: "Arzt", translation: "طبيب", pronunciation: "artst", emoji: "🧑‍⚕️" },
            { word: "Krankenschwester", translation: "ممرضة", pronunciation: "kran-ken-shves-ter", emoji: "👩‍⚕️" },
            { word: "Krankenhaus", translation: "مستشفى", pronunciation: "kran-ken-haus", emoji: "🏥" },
            { word: "Medikament", translation: "دواء", pronunciation: "me-di-ka-ment", emoji: "💊" },
            { word: "Krank", translation: "مريض", pronunciation: "krank", emoji: "🤒" },
            { word: "Gesund", translation: "صحي", pronunciation: "ge-zund", emoji: "💪" },
            { word: "Kopfschmerzen", translation: "صداع", pronunciation: "kopf-shmer-tsen", emoji: "🤕" },
            { word: "Bauchschmerzen", translation: "ألم في المعدة", pronunciation: "baukh-shmer-tsen", emoji: "🤢" },
            { word: "Fieber", translation: "حمى", pronunciation: "fee-ber", emoji: "🌡️" },
        ],
        readingExercises: [
            readingExercise("Ich bin krank, ich muss zum Arzt gehen.", "وصف حالة صحية", "أنا مريض، أحتاج لرؤية طبيب.", ["خذ هذا الدواء.", "المستشفى كبير ونظيف.", "لدي حمى وصداع."]),
        ],
        listeningExercises: [
            listeningExercise("Arzt", "الشخص الذي تذهب إليه عندما تكون مريضاً.", ["Krankenschwester", "Lehrer", "Schüler"]),
        ]
    },
    technology: {
        words: [
            { word: "Technologie", translation: "تقنية", pronunciation: "tesh-no-lo-gee", emoji: "💡" },
            { word: "Computer", translation: "حاسوب", pronunciation: "kom-pyu-ter", emoji: "💻" },
            { word: "Handy", translation: "هاتف محمول", pronunciation: "han-di", emoji: "📱" },
            { word: "Internet", translation: "إنترنت", pronunciation: "in-ter-net", emoji: "🌐" },
            { word: "E-Mail", translation: "بريد إلكتروني", pronunciation: "ee-mail", emoji: "📧" },
            { word: "Webseite", translation: "موقع إلكتروني", pronunciation: "veb-zai-te", emoji: "🕸️" },
            { word: "Passwort", translation: "كلمة المرور", pronunciation: "pas-vort", emoji: "🔒" },
            { word: "Tastatur", translation: "لوحة مفاتيح", pronunciation: "tas-ta-toor", emoji: "⌨️" },
            { word: "Maus", translation: "فأرة", pronunciation: "maus", emoji: "🖱️" },
            { word: "Software", translation: "برنامج", pronunciation: "soft-ver", emoji: "💿" },
        ],
        readingExercises: [
            readingExercise("Ich benutze jeden Tag das Internet auf meinem Computer.", "استخدام التكنولوجيا", "أستخدم الإنترنت كل يوم على حاسوبي.", ["لقد نسيت كلمة المرور.", "أرسل لي بريداً إلكترونياً.", "هذا الموقع مفيد."]),
        ],
        listeningExercises: [
            listeningExercise("Internet", "شبكة عالمية تربط الحواسيب.", ["Computer", "Handy", "E-Mail"]),
        ]
    },
    restaurant: {
        words: [
            { word: "Restaurant", translation: "مطعم", pronunciation: "res-to-rant", emoji: "🍴" },
            { word: "Speisekarte", translation: "قائمة طعام", pronunciation: "shpai-ze-kar-te", emoji: "📜" },
            { word: "Kellner", translation: "نادل", pronunciation: "kel-ner", emoji: "🤵" },
            { word: "Rechnung", translation: "فاتورة", pronunciation: "resh-nung", emoji: "🧾" },
            { word: "Bestellen", translation: "يطلب", pronunciation: "be-shte-len", emoji: "✍️" },
            { word: "Lecker", translation: "لذيذ", pronunciation: "le-ker", emoji: "😋" },
            { word: "Gabel", translation: "شوكة", pronunciation: "gaa-bel", emoji: "🍴" },
            { word: "Löffel", translation: "ملعقة", pronunciation: "löf-fel", emoji: "🥄" },
            { word: "Messer", translation: "سكين", pronunciation: "mes-ser", emoji: "🔪" },
            { word: "Teller", translation: "طبق", pronunciation: "tel-ler", emoji: "🍽️" },
        ],
        readingExercises: [
            readingExercise("Kellner, die Speisekarte, bitte!", "في المطعم", "يا نادل، القائمة من فضلك!", ["الطعام لذيذ.", "أريد أن أطلب الآن.", "الفاتورة من فضلك."]),
        ],
        listeningExercises: [
            listeningExercise("Speisekarte", "قائمة الأطباق في المطعم.", ["Rechnung", "Kellner", "Gabel"]),
        ]
    },
    daily_routines: {
        words: [
            { word: "Aufstehen", translation: "يستيقظ", pronunciation: "auf-shte-hen", emoji: "⏰" },
            { word: "Frühstücken", translation: "يأكل الفطور", pronunciation: "früh-shtü-ken", emoji: "🍳" },
            { word: "Zur Arbeit gehen", translation: "يذهب للعمل", pronunciation: "tsur ar-bait ge-hen", emoji: "💼" },
            { word: "Lernen", translation: "يدرس", pronunciation: "ler-nen", emoji: "📚" },
            { word: "Mittagessen", translation: "يأكل الغداء", pronunciation: "mit-taag-es-sen", emoji: "🍱" },
            { word: "Nach Hause kommen", translation: "يعود للمنزل", pronunciation: "nakh hau-ze ko-men", emoji: "🏡" },
            { word: "Abendessen kochen", translation: "يطبخ العشاء", pronunciation: "aa-bent-es-sen ko-khen", emoji: "🍝" },
            { word: "Fernsehen", translation: "يشاهد التلفاز", pronunciation: "fern-ze-hen", emoji: "📺" },
            { word: "Ein Buch lesen", translation: "يقرأ كتاباً", pronunciation: "ain bookh le-zen", emoji: "📖" },
            { word: "Schlafen gehen", translation: "يذهب للنوم", pronunciation: "shlaa-fen ge-hen", emoji: "😴" },
        ],
        readingExercises: [
            readingExercise("Ich stehe jeden Morgen um 7 Uhr auf.", "روتين يومي", "أستيقظ الساعة 7 صباحاً كل يوم.", ["هو يذهب إلى العمل بالسيارة.", "بعد العشاء، أشاهد التلفاز.", "أنا أدرس في المساء."]),
        ],
        listeningExercises: [
            listeningExercise("Aufstehen", "أول شيء تفعله في الصباح.", ["Schlafen gehen", "Frühstücken", "Lernen"]),
        ]
    },
    countries: {
        words: [
            { word: "Land", translation: "دولة", pronunciation: "lant", emoji: "🌍" },
            { word: "Nationalität", translation: "جنسية", pronunciation: "na-tsyo-na-li-tet", emoji: "🆔" },
            { word: "Deutschland", translation: "ألمانيا", pronunciation: "doych-lant", emoji: "🇩🇪" },
            { word: "Ägypten", translation: "مصر", pronunciation: "e-güp-ten", emoji: "🇪🇬" },
            { word: "Frankreich", translation: "فرنسا", pronunciation: "frank-raish", emoji: "🇫🇷" },
            { word: "USA", translation: "أمريكا", pronunciation: "oo-es-a", emoji: "🇺🇸" },
            { word: "Italien", translation: "إيطاليا", pronunciation: "i-ta-lyen", emoji: "🇮🇹" },
            { word: "Spanien", translation: "إسبانيا", pronunciation: "shpa-nyen", emoji: "🇪🇸" },
            { word: "Hauptstadt", translation: "عاصمة", pronunciation: "haupt-shtat", emoji: "🏛️" },
        ],
        readingExercises: [
            readingExercise("Berlin ist die Hauptstadt von Deutschland.", "عواصم الدول", "برلين هي عاصمة ألمانيا.", ["أنا من مصر.", "هو يتحدث الفرنسية.", "نيويورك مدينة كبيرة في أمريكا."]),
        ],
        listeningExercises: [
            listeningExercise("Deutschland", "بلد السيارات والبيرة.", ["Ägypten", "Frankreich", "USA"]),
        ]
    },
    sports: {
        words: [
            { word: "Sport", translation: "رياضة", pronunciation: "shport", emoji: "🏅" },
            { word: "Fußball", translation: "كرة القدم", pronunciation: "foos-bal", emoji: "⚽" },
            { word: "Basketball", translation: "كرة السلة", pronunciation: "bas-ket-bal", emoji: "🏀" },
            { word: "Tennis", translation: "تنس", pronunciation: "ten-nis", emoji: "🎾" },
            { word: "Schwimmen", translation: "سباحة", pronunciation: "shvim-men", emoji: "🏊" },
            { word: "Laufen", translation: "جري", pronunciation: "lau-fen", emoji: "🏃" },
            { word: "Spielen", translation: "يلعب", pronunciation: "shpee-len", emoji: "🤸" },
            { word: "Gewinnen", translation: "يفوز", pronunciation: "ge-vin-nen", emoji: "🏆" },
            { word: "Verlieren", translation: "يخسر", pronunciation: "fer-lee-ren", emoji: "👎" },
            { word: "Mannschaft", translation: "فريق", pronunciation: "man-shaft", emoji: "👥" },
        ],
        readingExercises: [
            readingExercise("Mein Lieblingssport ist Fußball.", "رياضة مفضلة", "رياضتي المفضلة هي كرة القدم.", ["هو يلعب التنس كل نهاية أسبوع.", "فريقنا فاز بالمباراة.", "أذهب للسباحة مرتين في الأسبوع."]),
        ],
        listeningExercises: [
            listeningExercise("Fußball", "رياضة بها 11 لاعباً وكرة.", ["Basketball", "Tennis", "Schwimmen"]),
        ]
    },
    music_arts: {
        words: [
            { word: "Musik", translation: "موسيقى", pronunciation: "moo-zeek", emoji: "🎵" },
            { word: "Kunst", translation: "فن", pronunciation: "kunst", emoji: "🖼️" },
            { word: "Lied", translation: "أغنية", pronunciation: "leet", emoji: "🎶" },
            { word: "Künstler", translation: "فنان", pronunciation: "künst-ler", emoji: "🧑‍🎨" },
            { word: "Malen", translation: "يرسم/يلون", pronunciation: "maa-len", emoji: "🎨" },
            { word: "Singen", translation: "يغني", pronunciation: "zing-en", emoji: "🎤" },
            { word: "Tanzen", translation: "يرقص", pronunciation: "tan-tsen", emoji: "💃" },
            { word: "Museum", translation: "متحف", pronunciation: "moo-ze-um", emoji: "🏛️" },
            { word: "Theater", translation: "مسرح", pronunciation: "te-aa-ter", emoji: "🎭" },
            { word: "Film", translation: "فيلم", pronunciation: "film", emoji: "🎬" },
        ],
        readingExercises: [
            readingExercise("Ich höre gerne klassische Musik.", "تفضيلات فنية", "أحب الاستماع إلى الموسيقى الكلاسيكية.", ["هي فنانة موهوبة.", "لنذهب إلى المتحف يوم السبت.", "هذه الأغنية مشهورة."]),
        ],
        listeningExercises: [
            listeningExercise("Musik", "فن الأصوات.", ["Kunst", "Film", "Lied"]),
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