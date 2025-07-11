
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

export const TURKISH_CONTENT: { [categoryName: string]: CategoryContent } = {
    alphabet: {
        words: [
            { word: "a", translation: "أ", pronunciation: "a", emoji: "🍎" },
            { word: "b", translation: "ب", pronunciation: "be", emoji: "🎈" },
            { word: "c", translation: "ج", pronunciation: "ce", emoji: "👛" },
            { word: "ç", translation: "تش", pronunciation: "çe", emoji: "🍓" },
            { word: "d", translation: "د", pronunciation: "de", emoji: "🎲" },
            { word: "e", translation: "إيه", pronunciation: "e", emoji: "🏠" },
            { word: "f", translation: "ف", pronunciation: "fe", emoji: "🐘" },
            { word: "g", translation: "غ", pronunciation: "ge", emoji: "☀️" },
            { word: "ğ", translation: "يوموشاك غ (غ مخففة)", pronunciation: "yumuşak ge", emoji: "☁️" },
            { word: "h", translation: "ه", pronunciation: "he", emoji: "🥕" },
            { word: "ı", translation: "إه (مفخمة)", pronunciation: "ı", emoji: "💡" },
            { word: "i", translation: "إي (مرققة)", pronunciation: "i", emoji: "🐄" },
            { word: "j", translation: "ژ", pronunciation: "je", emoji: "🛩️" },
            { word: "k", translation: "ك", pronunciation: "ke", emoji: "🔑" },
            { word: "l", translation: "ل", pronunciation: "le", emoji: "🍋" },
            { word: "m", translation: "م", pronunciation: "me", emoji: "🐒" },
            { word: "n", translation: "ن", pronunciation: "ne", emoji: "👃" },
            { word: "o", translation: "أو (مفخمة)", pronunciation: "o", emoji: "🚌" },
            { word: "ö", translation: "أو (مرققة)", pronunciation: "ö", emoji: "🦆" },
            { word: "p", translation: "پ", pronunciation: "pe", emoji: "🐧" },
            { word: "r", translation: "ر", pronunciation: "re", emoji: "🤖" },
            { word: "s", translation: "س", pronunciation: "se", emoji: "🐍" },
            { word: "ş", translation: "ش", pronunciation: "şe", emoji: "🧢" },
            { word: "t", translation: "ت", pronunciation: "te", emoji: "🐢" },
            { word: "u", translation: "أو (مضمومة)", pronunciation: "u", emoji: "🪁" },
            { word: "ü", translation: "أو (مضمومة مرققة)", pronunciation: "ü", emoji: "🍇" },
            { word: "v", translation: "ڤ", pronunciation: "ve", emoji: "🎻" },
            { word: "y", translation: "ي", pronunciation: "ye", emoji: "⭐" },
            { word: "z", translation: "ز", pronunciation: "ze", emoji: "🦓" },
        ],
        readingExercises: [
            readingExercise("a, b, c, ç, d", "أول 5 حروف", "أ، ب، ج، تش، د", ["e, f, g, ğ, h", "l, m, n, o, ö", "v, y, z"]),
            readingExercise("Bu bir araba.", "مثال على حرف 'a'", "هذه سيارة.", ["هذا منزل.", "هذه طاولة.", "هذا كرسي."])
        ],
        listeningExercises: [
            listeningExercise("e", "الحرف المستخدم في كلمة 'ev' (منزل)", ["a", "ı", "i"]),
            listeningExercise("ş", "الحرف المستخدم في كلمة 'şapka' (قبعة)", ["s", "ç", "c"])
        ]
    },
    basics: {
        words: [
            { word: "Ben", translation: "أنا", pronunciation: "ben", emoji: "👤" },
            { word: "Sen", translation: "أنت", pronunciation: "sen", emoji: "👥" },
            { word: "O", translation: "هو/هي", pronunciation: "o", emoji: "🧑" },
            { word: "Biz", translation: "نحن", pronunciation: "biz", emoji: "👨‍👩‍👧‍👦" },
            { word: "Siz", translation: "أنتم", pronunciation: "siz", emoji: "👨‍👩‍👧‍👦" },
            { word: "Onlar", translation: "هم", pronunciation: "on-lar", emoji: "👨‍👩‍👧‍👦" },
            { word: "Ne", translation: "ماذا", pronunciation: "ne", emoji: "❓" },
            { word: "Kim", translation: "من", pronunciation: "kim", emoji: "❓" },
            { word: "Nerede", translation: "أين", pronunciation: "ne-re-de", emoji: "📍" },
            { word: "Ne zaman", translation: "متى", pronunciation: "ne za-man", emoji: "⏰" },
            { word: "Neden", translation: "لماذا", pronunciation: "ne-den", emoji: "🤔" },
            { word: "Nasıl", translation: "كيف", pronunciation: "na-suhl", emoji: "🤔" },
            { word: "Evet", translation: "نعم", pronunciation: "e-vet", emoji: "👍" },
            { word: "Hayır", translation: "لا", pronunciation: "ha-yuhr", emoji: "👎" },
            { word: "Belki", translation: "ربما", pronunciation: "bel-ki", emoji: "🤷" },
            { word: "Lütfen", translation: "من فضلك", pronunciation: "lütfen", emoji: "🙏" },
            { word: "Teşekkür ederim", translation: "شكراً لك", pronunciation: "te-shek-kür e-de-rim", emoji: "😊" },
            { word: "Üzgünüm", translation: "آسف", pronunciation: "üz-gü-nüm", emoji: "😔" },
            { word: "Pardon", translation: "اعذرني", pronunciation: "par-don", emoji: "✋" },
            { word: "Ve", translation: "و", pronunciation: "ve", emoji: "&" },
            { word: "Ama", translation: "لكن", pronunciation: "a-ma", emoji: "↔️" },
            { word: "Veya", translation: "أو", pronunciation: "ve-ya", emoji: "🤷‍♀️" },
            { word: "Çünkü", translation: "لأن", pronunciation: "çün-kü", emoji: "👉" },
        ],
        readingExercises: [
            readingExercise("Bugün mutluyum ama hava çok soğuk.", "ابحث عن ترجمة 'mutlu' و 'soğuk'.", "أنا سعيد اليوم، لكن الجو بارد جداً.", ["O üzgün çünkü hava sıcak.", "İyi misin? Evet, teşekkürler.", "Bu kolay ve şu zor."]),
            readingExercise("Büyük evin küçük bir bahçesi var.", "ترجم 'büyük ev' و 'küçük bahçe'.", "البيت الكبير له حديقة صغيرة.", ["Kedi süt içer.", "Bana yardım edebilir misin?", "Bu benim kitabım."])
        ],
        listeningExercises: [
            listeningExercise("Teşekkür ederim", "عبارة شكر شائعة.", ["Üzgünüm", "Lütfen", "Merhaba"]),
            listeningExercise("Günaydın", "تحية تقال في الصباح.", ["İyi geceler", "Güle güle", "Merhaba"])
        ]
    },
    greetings: {
        words: [
            { word: "Merhaba", translation: "مرحباً", pronunciation: "mer-ha-ba", emoji: "👋" },
            { word: "Selam", translation: "أهلاً", pronunciation: "se-lam", emoji: "👋" },
            { word: "Günaydın", translation: "صباح الخير", pronunciation: "gün-ay-dın", emoji: "☀️" },
            { word: "Tünaydın", translation: "مساء الخير (بعد الظهر)", pronunciation: "tün-ay-dın", emoji: "🌇" },
            { word: "İyi akşamlar", translation: "مساء الخير", pronunciation: "ee ak-sham-lar", emoji: "🌃" },
            { word: "İyi geceler", translation: "تصبح على خير", pronunciation: "ee ge-je-ler", emoji: "🌙" },
            { word: "Hoşça kal", translation: "مع السلامة", pronunciation: "hoş-ça kal", emoji: "👋" },
            { word: "Görüşürüz", translation: "أراك لاحقاً", pronunciation: "gö-rü-shü-rüz", emoji: "👀" },
            { word: "Nasılsın?", translation: "كيف حالك؟", pronunciation: "na-sıl-sın", emoji: "❓" },
            { word: "İyiyim, teşekkürler.", translation: "أنا بخير، شكراً لك.", pronunciation: "ee-yim, te-şek-kür-ler", emoji: "😊" },
            { word: "Ya sen?", translation: "وأنت؟", pronunciation: "ya sen", emoji: "❓" },
            { word: "Adın ne?", translation: "ما اسمك؟", pronunciation: "a-dın ne", emoji: "❓" },
            { word: "Benim adım...", translation: "اسمي هو...", pronunciation: "be-nim a-dım...", emoji: "🏷️" },
            { word: "Tanıştığıma memnun oldum.", translation: "سررت بلقائك.", pronunciation: "ta-nış-tı-ğı-ma mem-nun ol-dum", emoji: "🤝" },
            { word: "Hoş geldiniz", translation: "أهلاً بك", pronunciation: "hoş gel-di-niz", emoji: "🎉" },
        ],
        readingExercises: [
            readingExercise("Günaydın, nasılsın?", "ابحث عن التحية الصباحية والسؤال عن الحال.", "صباح الخير، كيف حالك؟", ["İyi geceler, yarın görüşürüz.", "Adın ne ve nerelisin?", "İyiyim, teşekkürler."]),
            readingExercise("Adın ne? Benim adım Ahmed.", "ابحث عن السؤال عن الاسم والإجابة.", "ما اسمك؟ اسمي أحمد.", ["Nasılsın? İyiyim.", "Nerelisin? Mısırlıyım.", "Tanıştığıma memnun oldum."])
        ],
        listeningExercises: [
            listeningExercise("Adın ne?", "سؤال للاستفسار عن اسم الشخص.", ["Nasılsın?", "Hoşça kal", "Günaydın"]),
            listeningExercise("Tanıştığıma memnun oldum", "عبارة تقال عند مقابلة شخص لأول مرة.", ["Teşekkür ederim", "Merhaba", "Üzgünüm"])
        ]
    },
    numbers: {
        words: [
            { word: "Sıfır", translation: "صفر", pronunciation: "suh-fuhr", emoji: "0️⃣" },
            { word: "Bir", translation: "واحد", pronunciation: "beer", emoji: "1️⃣" },
            { word: "İki", translation: "اثنان", pronunciation: "ee-kee", emoji: "2️⃣" },
            { word: "Üç", translation: "ثلاثة", pronunciation: "ewch", emoji: "3️⃣" },
            { word: "Dört", translation: "أربعة", pronunciation: "durt", emoji: "4️⃣" },
            { word: "Beş", translation: "خمسة", pronunciation: "besh", emoji: "5️⃣" },
            { word: "Altı", translation: "ستة", pronunciation: "ahl-tuh", emoji: "6️⃣" },
            { word: "Yedi", translation: "سبعة", pronunciation: "yeh-dee", emoji: "7️⃣" },
            { word: "Sekiz", translation: "ثمانية", pronunciation: "seh-keez", emoji: "8️⃣" },
            { word: "Dokuz", translation: "تسعة", pronunciation: "doh-kooz", emoji: "9️⃣" },
            { word: "On", translation: "عشرة", pronunciation: "ohn", emoji: "🔟" },
            { word: "On bir", translation: "أحد عشر", pronunciation: "ohn beer", emoji: "1️⃣1️⃣" },
            { word: "On iki", translation: "اثنا عشر", pronunciation: "ohn ee-kee", emoji: "1️⃣2️⃣" },
            { word: "Yirmi", translation: "عشرون", pronunciation: "yeer-mee", emoji: "2️⃣0️⃣" },
            { word: "Otuz", translation: "ثلاثون", pronunciation: "oh-tooz", emoji: "3️⃣0️⃣" },
            { word: "Kırk", translation: "أربعون", pronunciation: "kurk", emoji: "4️⃣0️⃣" },
            { word: "Elli", translation: "خمسون", pronunciation: "el-lee", emoji: "5️⃣0️⃣" },
            { word: "Yüz", translation: "مئة", pronunciation: "yewz", emoji: "💯" },
            { word: "Bin", translation: "ألف", pronunciation: "been", emoji: "1️⃣0️⃣0️⃣0️⃣" },
        ],
        readingExercises: [
            readingExercise("İki elim ve on parmağım var.", "ابحث عن الأرقام 2 و 10.", "لدي يدان وعشرة أصابع.", ["Üç kitabım ve beş kalemim var.", "Birden ona kadar sayabilir misin?", "O sekiz yaşında."]),
            readingExercise("Bayrakta elli yıldız var.", "ابحث عن الرقم 50.", "يوجد خمسون نجمة على العلم.", ["Yirmi dolarım var.", "İlk yüz gün önemlidir.", "Bir artı iki üç eder."])
        ],
        listeningExercises: [
            listeningExercise("Beş", "الرقم الذي يأتي بعد أربعة.", ["Dört", "Bir", "On"]),
            listeningExercise("Yirmi", "ضعف الرقم عشرة.", ["On iki", "İki", "On"])
        ]
    },
    colors: {
        words: [
            { word: "Renk", translation: "لون", pronunciation: "renk", emoji: "🎨" },
            { word: "Kırmızı", translation: "أحمر", pronunciation: "kır-mı-zı", emoji: "🔴" },
            { word: "Yeşil", translation: "أخضر", pronunciation: "ye-şil", emoji: "🟢" },
            { word: "Mavi", translation: "أزرق", pronunciation: "ma-vi", emoji: "🔵" },
            { word: "Sarı", translation: "أصفر", pronunciation: "sa-rı", emoji: "🟡" },
            { word: "Siyah", translation: "أسود", pronunciation: "si-yah", emoji: "⚫" },
            { word: "Beyaz", translation: "أبيض", pronunciation: "be-yaz", emoji: "⚪" },
            { word: "Turuncu", translation: "برتقالي", pronunciation: "tu-run-ju", emoji: "🟠" },
            { word: "Mor", translation: "بنفسجي", pronunciation: "mor", emoji: "🟣" },
            { word: "Kahverengi", translation: "بني", pronunciation: "kah-ve-ren-gi", emoji: "🟤" },
            { word: "Pembe", translation: "وردي", pronunciation: "pem-be", emoji: "🌸" },
            { word: "Gri", translation: "رمادي", pronunciation: "gri", emoji: "🐘" },
        ],
        readingExercises: [
            readingExercise("Gökyüzü mavi ve çimenler yeşil.", "ركز على ترجمة 'mavi' و 'yeşil'.", "السماء زرقاء والعشب أخضر.", ["Elma kırmızı ve muz sarı.", "Siyah ve beyazı seviyorum.", "Onun yeni arabası kırmızı."]),
            readingExercise("Pembe bir elbisesi ve beyaz ayakkabıları var.", "ابحث عن 'pembe' و 'beyaz'.", "لديها فستان وردي وحذاء أبيض.", ["Kedi siyah ve köpek kahverengi.", "Mor rengini sever misin?", "Altın ve gümüş değerli metallerdir."])
        ],
        listeningExercises: [
            listeningExercise("Kırmızı", "لون الدم أو الفراولة.", ["Mavi", "Yeşil", "Sarı"]),
            listeningExercise("Siyah", "عكس اللون الأبيض.", ["Beyaz", "Mavi", "Gri"])
        ]
    },
    family: {
        words: [
            { word: "Aile", translation: "عائلة", pronunciation: "a-i-le", emoji: "👨‍👩‍👧‍👦" },
            { word: "Baba", translation: "أب", pronunciation: "ba-ba", emoji: "👨" },
            { word: "Anne", translation: "أم", pronunciation: "an-ne", emoji: "👩" },
            { word: "Ebeveynler", translation: "والدين", pronunciation: "e-be-veyn-ler", emoji: "👨‍👩‍👧" },
            { word: "Oğul", translation: "ابن", pronunciation: "o-ul", emoji: "👦" },
            { word: "Kız", translation: "ابنة", pronunciation: "kız", emoji: "👧" },
            { word: "Çocuk", translation: "طفل", pronunciation: "ço-cuk", emoji: "👶" },
            { word: "Kardeş", translation: "أخ/أخت", pronunciation: "kar-deş", emoji: "🧑" },
            { word: "Abi", translation: "أخ أكبر", pronunciation: "a-bi", emoji: "👱‍♂️" },
            { word: "Abla", translation: "أخت كبرى", pronunciation: "ab-la", emoji: "👱‍♀️" },
            { word: "Dede", translation: "جد", pronunciation: "de-de", emoji: "👴" },
            { word: "Nine", translation: "جدة", pronunciation: "ni-ne", emoji: "👵" },
            { word: "Amca", translation: "عم", pronunciation: "am-ca", emoji: "👨‍" },
            { word: "Teyze", translation: "خالة", pronunciation: "tey-ze", emoji: "👩‍" },
            { word: "Kuzen", translation: "ابن/بنت العم/الخال", pronunciation: "ku-zen", emoji: "🧑" },
            { word: "Koca", translation: "زوج", pronunciation: "ko-ca", emoji: "🤵" },
            { word: "Karı", translation: "زوجة", pronunciation: "ka-rı", emoji: "👰" },
        ],
        readingExercises: [
            readingExercise("Babam ve annem benim ebeveynlerimdir.", "ابحث عن ترجمة 'baba', 'anne', و 'ebeveynler'.", "أبي وأمي هما والديّ.", ["Kardeşlerim birlikte oynuyor.", "Dedem ve ninem büyük bir evde yaşıyor.", "Bu oğlum ve bu kızım."]),
            readingExercise("Ablam abimden daha genç.", "ركز على المقارنة بين 'abla' و 'abi'.", "أختي أصغر من أخي.", ["Ailem çok büyük.", "Kuzenim başka bir şehirde yaşıyor.", "Dedem okumayı sever."])
        ],
        listeningExercises: [
            listeningExercise("Kardeş", "شقيق أو شقيقة.", ["Abi", "Baba", "Anne"]),
            listeningExercise("Anne", "الكلمة التركية التي تعني 'أم'.", ["Baba", "Kız", "Oğul"])
        ]
    },
    food: {
        words: [
            { word: "Yemek", translation: "طعام", pronunciation: "ye-mek", emoji: "🍔" },
            { word: "İçecek", translation: "شراب", pronunciation: "i-çe-cek", emoji: "🥤" },
            { word: "Su", translation: "ماء", pronunciation: "su", emoji: "💧" },
            { word: "Kahve", translation: "قهوة", pronunciation: "kah-ve", emoji: "☕" },
            { word: "Çay", translation: "شاي", pronunciation: "çay", emoji: "🍵" },
            { word: "Meyve suyu", translation: "عصير", pronunciation: "mey-ve su-yu", emoji: "🧃" },
            { word: "Süt", translation: "حليب", pronunciation: "süt", emoji: "🥛" },
            { word: "Ekmek", translation: "خبز", pronunciation: "ek-mek", emoji: "🍞" },
            { word: "Peynir", translation: "جبن", pronunciation: "pey-nir", emoji: "🧀" },
            { word: "Pirinç", translation: "أرز", pronunciation: "pi-rinç", emoji: "🍚" },
            { word: "Tavuk", translation: "دجاج", pronunciation: "ta-vuk", emoji: "🍗" },
            { word: "Et", translation: "لحم", pronunciation: "et", emoji: "🥩" },
            { word: "Balık", translation: "سمك", pronunciation: "ba-lık", emoji: "🐟" },
            { word: "Meyve", translation: "فاكهة", pronunciation: "mey-ve", emoji: "🍎" },
            { word: "Elma", translation: "تفاحة", pronunciation: "el-ma", emoji: "🍎" },
            { word: "Muz", translation: "موزة", pronunciation: "muz", emoji: "🍌" },
            { word: "Portakal", translation: "برتقالة", pronunciation: "por-ta-kal", emoji: "🍊" },
            { word: "Sebze", translation: "خضروات", pronunciation: "seb-ze", emoji: "🥕" },
            { word: "Havuç", translation: "جزرة", pronunciation: "ha-vuç", emoji: "🥕" },
            { word: "Patates", translation: "بطاطس", pronunciation: "pa-ta-tes", emoji: "🥔" },
            { word: "Domates", translation: "طماطم", pronunciation: "do-ma-tes", emoji: "🍅" },
            { word: "Şeker", translation: "سكر", pronunciation: "şe-ker", emoji: "🍬" },
            { word: "Tuz", translation: "ملح", pronunciation: "tuz", emoji: "🧂" },
            { word: "Kahvaltı", translation: "فطور", pronunciation: "kah-val-tı", emoji: "🍳" },
            { word: "Öğle yemeği", translation: "غداء", pronunciation: "öğ-le ye-me-ği", emoji: "🍱" },
            { word: "Akşam yemeği", translation: "عشاء", pronunciation: "ak-şam ye-me-ği", emoji: "🍝" },
        ],
        readingExercises: [
            readingExercise("Karnım aç. Ekmek ve peynir yemek istiyorum.", "ركز على كلمتي 'ekmek' و 'peynir'.", "أنا جائع. أريد أن آكل الخبز والجبن.", ["Susamışım. Su içmek istiyorum.", "Yemek çok lezzetli.", "Menüyü alabilir miyim lütfen?"]),
            readingExercise("Kahvaltıda kahve ve bir elma severim.", "ابحث عن طعام وشراب الفطور.", "في الفطور، أحب القهوة وتفاحة.", ["Öğle yemeğinde pilav ve tavuk yerim.", "Akşam yemeği saat yedide hazır.", "Bu meyve suyu taze ve lezzetli."])
        ],
        listeningExercises: [
            listeningExercise("Elma", "نوع من الفاكهة، غالبًا ما يكون أحمر أو أخضر.", ["Portakal", "Su", "Ekmek"]),
            listeningExercise("Su", "شراب أساسي وشفاف.", ["Süt", "Meyve suyu", "Çay"])
        ]
    },
    time: {
        words: [
            { word: "Zaman", translation: "وقت", pronunciation: "za-man", emoji: "⏰" },
            { word: "Saat", translation: "ساعة", pronunciation: "sa-at", emoji: "⏳" },
            { word: "Dakika", translation: "دقيقة", pronunciation: "da-ki-ka", emoji: "⏱️" },
            { word: "Saniye", translation: "ثانية", pronunciation: "sa-ni-ye", emoji: "⏱️" },
            { word: "Gün", translation: "يوم", pronunciation: "gün", emoji: "📅" },
            { word: "Hafta", translation: "أسبوع", pronunciation: "haf-ta", emoji: "🗓️" },
            { word: "Ay", translation: "شهر", pronunciation: "ay", emoji: "🈷️" },
            { word: "Yıl", translation: "سنة", pronunciation: "yıl", emoji: "🎉" },
            { word: "Pazartesi", translation: "الإثنين", pronunciation: "pa-zar-te-si", emoji: " M" },
            { word: "Salı", translation: "الثلاثاء", pronunciation: "sa-lı", emoji: "T" },
            { word: "Çarşamba", translation: "الأربعاء", pronunciation: "çar-şam-ba", emoji: "W" },
            { word: "Perşembe", translation: "الخميس", pronunciation: "per-şem-be", emoji: "T" },
            { word: "Cuma", translation: "الجمعة", pronunciation: "cu-ma", emoji: "F" },
            { word: "Cumartesi", translation: "السبت", pronunciation: "cu-mar-te-si", emoji: "S" },
            { word: "Pazar", translation: "الأحد", pronunciation: "pa-zar", emoji: "S" },
            { word: "Bugün", translation: "اليوم", pronunciation: "bu-gün", emoji: "👇" },
            { word: "Yarın", translation: "غداً", pronunciation: "ya-rın", emoji: "➡️" },
            { word: "Dün", translation: "أمس", pronunciation: "dün", emoji: "⬅️" },
            { word: "Sabah", translation: "صباح", pronunciation: "sa-bah", emoji: "🌅" },
            { word: "Öğleden sonra", translation: "بعد الظهر", pronunciation: "öğ-le-den son-ra", emoji: "☀️" },
            { word: "Akşam", translation: "مساء", pronunciation: "ak-şam", emoji: "🌇" },
            { word: "Gece", translation: "ليل", pronunciation: "ge-ce", emoji: "🌃" },
        ],
        readingExercises: [
            readingExercise("Bugün Pazartesi ve yarın Salı.", "ترجم 'Bugün', 'Pazartesi', 'yarın', 'Salı'.", "اليوم هو الإثنين، وغداً هو الثلاثاء.", ["Dün Pazar'dı.", "Cuma günü bir toplantım var.", "Bir ayda dört hafta var."]),
            readingExercise("Toplantı sabah saat on'da.", "ابحث عن الوقت والجزء من اليوم.", "الاجتماع في الساعة العاشرة صباحاً.", ["Akşam görüşürüz.", "Bir dakika bekle lütfen.", "Bir yılda on iki ay vardır."])
        ],
        listeningExercises: [
            listeningExercise("Cuma", "اليوم الذي يسبق عطلة نهاية الأسبوع.", ["Pazartesi", "Pazar", "Hafta"]),
            listeningExercise("Yarın", "اليوم الذي يأتي بعد اليوم.", ["Bugün", "Dün", "Gün"])
        ]
    },
    weather: {
        words: [
            { word: "Hava durumu", translation: "الطقس", pronunciation: "ha-va du-ru-mu", emoji: "🌦️" },
            { word: "Güneş", translation: "شمس", pronunciation: "gü-neş", emoji: "☀️" },
            { word: "Güneşli", translation: "مشمس", pronunciation: "gü-neş-li", emoji: "☀️" },
            { word: "Bulut", translation: "غيمة", pronunciation: "bu-lut", emoji: "☁️" },
            { word: "Bulutlu", translation: "غائم", pronunciation: "bu-lut-lu", emoji: "☁️" },
            { word: "Yağmur", translation: "مطر", pronunciation: "yağ-mur", emoji: "🌧️" },
            { word: "Yağmurlu", translation: "ممطر", pronunciation: "yağ-mur-lu", emoji: "🌧️" },
            { word: "Rüzgar", translation: "رياح", pronunciation: "rüz-gar", emoji: "💨" },
            { word: "Rüzgarlı", translation: "عاصف", pronunciation: "rüz-gar-lı", emoji: "💨" },
            { word: "Kar", translation: "ثلج", pronunciation: "kar", emoji: "❄️" },
            { word: "Karlı", translation: "مثلج", pronunciation: "kar-lı", emoji: "❄️" },
            { word: "Sıcak", translation: "حار", pronunciation: "sı-cak", emoji: "🌡️" },
            { word: "Soğuk", translation: "بارد", pronunciation: "so-ğuk", emoji: "🥶" },
            { word: "Ilık", translation: "دافئ", pronunciation: "ı-lık", emoji: "😊" },
            { word: "Serin", translation: "معتدل البرودة", pronunciation: "se-rin", emoji: "😎" },
            { word: "Fırtına", translation: "عاصفة", pronunciation: "fır-tı-na", emoji: "⛈️" },
            { word: "Sis", translation: "ضباب", pronunciation: "sis", emoji: "🌫️" },
        ],
        readingExercises: [
            readingExercise("Bugün hava güneşli ve sıcak.", "ابحث عن الكلمات التي تصف الشمس والحرارة.", "الجو مشمس وحار اليوم.", ["Hava bulutlu ve soğuk.", "Yarın yağmur yağacak.", "Karlı havayı severim."]),
            readingExercise("Kışın hava soğuk olur ve kar yağar.", "ابحث عن كلمات الشتاء.", "في الشتاء، يكون الجو بارداً ويتساقط الثلج.", ["Bugün rüzgar çok şiddetli.", "Şemsiyeni al, yağmur yağıyor.", "Sabahları hava sisli oluyor."])
        ],
        listeningExercises: [
            listeningExercise("Yağmurlu", "عندما يسقط الماء من السماء.", ["Güneşli", "Bulutlu", "Rüzgarlı"]),
            listeningExercise("Soğuk", "عكس كلمة 'حار'.", ["Sıcak", "Ilık", "Serin"])
        ]
    },
    home: {
        words: [
            { word: "Ev", translation: "منزل/بيت", pronunciation: "ev", emoji: "🏠" },
            { word: "Daire", translation: "شقة", pronunciation: "da-i-re", emoji: "🏢" },
            { word: "Oda", translation: "غرفة", pronunciation: "o-da", emoji: "🚪" },
            { word: "Yatak odası", translation: "غرفة نوم", pronunciation: "ya-tak o-da-sı", emoji: "🛏️" },
            { word: "Banyo", translation: "حمام", pronunciation: "ban-yo", emoji: "🛁" },
            { word: "Mutfak", translation: "مطبخ", pronunciation: "mut-fak", emoji: "🍳" },
            { word: "Oturma odası", translation: "غرفة معيشة", pronunciation: "o-tur-ma o-da-sı", emoji: "🛋️" },
            { word: "Yemek odası", translation: "غرفة طعام", pronunciation: "ye-mek o-da-sı", emoji: "🍽️" },
            { word: "Bahçe", translation: "حديقة", pronunciation: "bah-çe", emoji: "🌳" },
            { word: "Kapı", translation: "باب", pronunciation: "ka-pı", emoji: "🚪" },
            { word: "Pencere", translation: "نافذة", pronunciation: "pen-ce-re", emoji: "🪟" },
            { word: "Zemin", translation: "أرضية", pronunciation: "ze-min", emoji: "👣" },
            { word: "Çatı", translation: "سقف", pronunciation: "ça-tı", emoji: "🧱" },
            { word: "Duvar", translation: "جدار", pronunciation: "du-var", emoji: "🧱" },
            { word: "Masa", translation: "طاولة", pronunciation: "ma-sa", emoji: "🪵" },
            { word: "Sandalye", translation: "كرسي", pronunciation: "san-dal-ye", emoji: "🪑" },
            { word: "Yatak", translation: "سرير", pronunciation: "ya-tak", emoji: "🛏️" },
            { word: "Koltuk", translation: "أريكة", pronunciation: "kol-tuk", emoji: "🛋️" },
            { word: "Lamba", translation: "مصباح", pronunciation: "lam-ba", emoji: "💡" },
            { word: "Anahtar", translation: "مفتاح", pronunciation: "a-nah-tar", emoji: "🔑" },
        ],
        readingExercises: [
            readingExercise("Mutfakta bir masa ve bir pencere var.", "ترجم 'mutfak', 'masa', و 'pencere'.", "المطبخ به طاولة ونافذة.", ["Yatak odasında bir yatak ve bir kapı var.", "Oturma odasında bir sandalye var.", "Evin anahtarı bahçede."]),
            readingExercise("Yatak odasında uyurum ve oturma odasında TV izlerim.", "ابحث عن أماكن النوم ومشاهدة التلفاز.", "أنا أنام في غرفة النوم وأشاهد التلفاز في غرفة المعيشة.", ["Yemek odasında yemek yeriz.", "Banyo koridorun sonunda.", "Daire üçüncü katta."])
        ],
        listeningExercises: [
            listeningExercise("Mutfak", "المكان الذي نطبخ فيه الطعام.", ["Yatak odası", "Banyo", "Bahçe"]),
            listeningExercise("Kapı", "تستخدمه للدخول والخروج من غرفة.", ["Pencere", "Masa", "Yatak"])
        ]
    },
    shopping: {
        words: [
            { word: "Mağaza", translation: "متجر", pronunciation: "ma-ğa-za", emoji: "🏬" },
            { word: "Dükkan", translation: "محل", pronunciation: "dük-kan", emoji: "🛍️" },
            { word: "Pazar", translation: "سوق", pronunciation: "pa-zar", emoji: "🛒" },
            { word: "Süpermarket", translation: "سوبر ماركت", pronunciation: "sü-per-mar-ket", emoji: "🏪" },
            { word: "Para", translation: "مال", pronunciation: "pa-ra", emoji: "💰" },
            { word: "Fiyat", translation: "سعر", pronunciation: "fi-yat", emoji: "💲" },
            { word: "Satın almak", translation: "يشتري", pronunciation: "sa-tın al-mak", emoji: "🛍️" },
            { word: "Satmak", translation: "يبيع", pronunciation: "sat-mak", emoji: "🏷️" },
            { word: "Ödemek", translation: "يدفع", pronunciation: "ö-de-mek", emoji: "💳" },
            { word: "Pahalı", translation: "غالي", pronunciation: "pa-ha-lı", emoji: "💎" },
            { word: "Ucuz", translation: "رخيص", pronunciation: "u-cuz", emoji: "🪙" },
            { word: "Fatura", translation: "فاتورة", pronunciation: "fa-tu-ra", emoji: "🧾" },
            { word: "Fiş", translation: "إيصال", pronunciation: "fiş", emoji: "🧾" },
            { word: "Nakit", translation: "نقد", pronunciation: "na-kit", emoji: "💵" },
            { word: "Kredi kartı", translation: "بطاقة ائتمان", pronunciation: "kre-di kar-tı", emoji: "💳" },
            { word: "Müşteri", translation: "زبون", pronunciation: "müş-te-ri", emoji: "🙋" },
        ],
        readingExercises: [
            readingExercise("Bu ne kadar? Fiyatı çok pahalı.", "ابحث عن السؤال عن السعر ووصفه بأنه 'pahalı'.", "كم سعر هذا؟ السعر غالي جداً.", ["Bunu satın almak istiyorum lütfen.", "Kartla ödeyebilir miyim?", "Bu dükkan çok ucuz."]),
            readingExercise("Kredi kartıyla ödeyeceğim, lütfen fişi verin.", "ابحث عن طريقة الدفع والوثيقة المطلوبة.", "سأدفع ببطاقة الائتمان، من فضلك أعطني الإيصال.", ["Nakit kabul ediyor musunuz?", "Bu pazar çok büyük.", "Müşteri her zaman haklıdır."])
        ],
        listeningExercises: [
            listeningExercise("Para", "ما تستخدمه للشراء.", ["Fiyat", "Mağaza", "Fatura"]),
            listeningExercise("Satın almak", "فعل الحصول على شيء مقابل المال.", ["Satmak", "Ödemek", "Sahip olmak"])
        ]
    },
    body: {
        words: [
            { word: "Vücut", translation: "جسم", pronunciation: "vü-cut", emoji: "🧍" },
            { word: "Baş", translation: "رأس", pronunciation: "baş", emoji: "👤" },
            { word: "Yüz", translation: "وجه", pronunciation: "yüz", emoji: "😊" },
            { word: "Göz", translation: "عين", pronunciation: "göz", emoji: "👁️" },
            { word: "Burun", translation: "أنف", pronunciation: "bu-run", emoji: "👃" },
            { word: "Ağız", translation: "فم", pronunciation: "a-ğız", emoji: "👄" },
            { word: "Kulak", translation: "أذن", pronunciation: "ku-lak", emoji: "👂" },
            { word: "Saç", translation: "شعر", pronunciation: "saç", emoji: "👱" },
            { word: "Diş", translation: "سن", pronunciation: "diş", emoji: "🦷" },
            { word: "Boyun", translation: "رقبة", pronunciation: "bo-yun", emoji: "🦒" },
            { word: "Omuz", translation: "كتف", pronunciation: "o-muz", emoji: "🤷" },
            { word: "Kol", translation: "ذراع", pronunciation: "kol", emoji: "💪" },
            { word: "El", translation: "يد", pronunciation: "el", emoji: "✋" },
            { word: "Parmak", translation: "إصبع", pronunciation: "par-mak", emoji: "👆" },
            { word: "Bacak", translation: "ساق", pronunciation: "ba-cak", emoji: "🦵" },
            { word: "Ayak", translation: "قدم", pronunciation: "a-yak", emoji: "🦶" },
            { word: "Kalp", translation: "قلب", pronunciation: "kalp", emoji: "❤️" },
            { word: "Mide", translation: "معدة", pronunciation: "mi-de", emoji: "🍔" },
        ],
        readingExercises: [
            readingExercise("İki gözüm, bir burnum ve bir ağzım var.", "عد أجزاء الوجه المذكورة.", "لدي عينان وأنف واحد وفم واحد.", ["Ellerimi su ve sabunla yıkarım.", "Başım ağrıyor.", "Onun siyah saçı ve mavi gözleri var."]),
            readingExercise("Yemekten sonra midem ağrıyor.", "ابحث عن الجزء الذي يؤلم.", "معدتي تؤلمني بعد الأكل.", ["Kalbim hızlı atıyor.", "Her elimde beş parmak var.", "Kolum güçlü."])
        ],
        listeningExercises: [
            listeningExercise("El", "الجزء من الجسم الذي به خمسة أصابع.", ["Ayak", "Baş", "Göz"]),
            listeningExercise("Saç", "ينمو على الرأس.", ["Yüz", "Burun", "Kulak"])
        ]
    },
    clothing: {
        words: [
            { word: "Kıyafet", translation: "ملابس", pronunciation: "kı-ya-fet", emoji: "👕" },
            { word: "Gömlek", translation: "قميص", pronunciation: "göm-lek", emoji: "👕" },
            { word: "Tişört", translation: "تي شيرت", pronunciation: "ti-şört", emoji: "👕" },
            { word: "Pantolon", translation: "بنطال", pronunciation: "pan-to-lon", emoji: "👖" },
            { word: "Kot", translation: "جينز", pronunciation: "kot", emoji: "👖" },
            { word: "Şort", translation: "شورت", pronunciation: "şort", emoji: "🩳" },
            { word: "Elbise", translation: "فستان", pronunciation: "el-bi-se", emoji: "👗" },
            { word: "Etek", translation: "تنورة", pronunciation: "e-tek", emoji: "👗" },
            { word: "Ceket", translation: "سترة", pronunciation: "ce-ket", emoji: "🧥" },
            { word: "Palto", translation: "معطف", pronunciation: "pal-to", emoji: "🧥" },
            { word: "Kazak", translation: "سترة صوفية", pronunciation: "ka-zak", emoji: "🧶" },
            { word: "Ayakkabı", translation: "حذاء", pronunciation: "a-yak-ka-bı", emoji: "👟" },
            { word: "Bot", translation: "حذاء طويل", pronunciation: "bot", emoji: "👢" },
            { word: "Çorap", translation: "جوارب", pronunciation: "ço-rap", emoji: "🧦" },
            { word: "Şapka", translation: "قبعة", pronunciation: "şap-ka", emoji: "🧢" },
            { word: "Atkı", translation: "وشاح", pronunciation: "at-kı", emoji: "🧣" },
            { word: "Eldiven", translation: "قفازات", pronunciation: "el-di-ven", emoji: "🧤" },
        ],
        readingExercises: [
            readingExercise("Mavi bir gömlek ve siyah bir pantolon giyiyorum.", "ابحث عن 'gömlek' و 'pantolon' وألوانها.", "أنا أرتدي قميصاً أزرق وبنطالاً أسود.", ["Yeni ayakkabılarım beyaz.", "Kış için bir ceket almam gerekiyor.", "Bu şapka çok güzel."]),
            readingExercise("Kışın palto, atkı ve eldiven giyerim.", "ابحث عن ملابس الشتاء.", "في الشتاء، أرتدي معطفًا ووشاحًا وقفازات.", ["O güzel bir kırmızı elbise giyiyor.", "Çoraplarımı gördün mü?", "Bu tişört çok büyük."])
        ],
        listeningExercises: [
            listeningExercise("Ayakkabı", "ما ترتديه في قدميك.", ["Gömlek", "Şapka", "Çorap"]),
            listeningExercise("Ceket", "ترتديه فوق قميصك عندما يكون الجو باردًا.", ["Pantolon", "Elbise", "Çorap"])
        ]
    },
    verbs: {
        words: [
            { word: "olmak", translation: "يكون", pronunciation: "ol-mak", emoji: "🧘" },
            { word: "sahip olmak", translation: "يملك", pronunciation: "sa-hip ol-mak", emoji: "🤲" },
            { word: "yapmak", translation: "يفعل", pronunciation: "yap-mak", emoji: "💪" },
            { word: "demek", translation: "يقول", pronunciation: "de-mek", emoji: "🗣️" },
            { word: "gitmek", translation: "يذهب", pronunciation: "git-mek", emoji: "🚶" },
            { word: "almak", translation: "يحصل على/يأخذ", pronunciation: "al-mak", emoji: "🎁" },
            { word: "bilmek", translation: "يعرف", pronunciation: "bil-mek", emoji: "🧠" },
            { word: "düşünmek", translation: "يفكر", pronunciation: "dü-şün-mek", emoji: "🤔" },
            { word: "görmek", translation: "يرى", pronunciation: "gör-mek", emoji: "👀" },
            { word: "gelmek", translation: "يأتي", pronunciation: "gel-mek", emoji: "👋" },
            { word: "istemek", translation: "يريد", pronunciation: "is-te-mek", emoji: "🙋" },
            { word: "bakmak", translation: "ينظر", pronunciation: "bak-mak", emoji: "🧐" },
            { word: "kullanmak", translation: "يستخدم", pronunciation: "kul-lan-mak", emoji: "📲" },
            { word: "bulmak", translation: "يجد", pronunciation: "bul-mak", emoji: "🔍" },
            { word: "vermek", translation: "يعطي", pronunciation: "ver-mek", emoji: "🎁" },
            { word: "anlatmak", translation: "يخبر/يشرح", pronunciation: "an-lat-mak", emoji: "💬" },
            { word: "çalışmak", translation: "يعمل", pronunciation: "ça-lış-mak", emoji: "💼" },
            { word: "aramak", translation: "يتصل/يبحث", pronunciation: "a-ra-mak", emoji: "📞" },
            { word: "denemek", translation: "يحاول", pronunciation: "de-ne-mek", emoji: "🏃" },
            { word: "sormak", translation: "يسأل", pronunciation: "sor-mak", emoji: "❓" },
            { word: "ihtiyaç duymak", translation: "يحتاج", pronunciation: "ih-ti-yaç duy-mak", emoji: "🙏" },
            { word: "hissetmek", translation: "يشعر", pronunciation: "his-set-mek", emoji: "❤️" },
            { word: "başlamak", translation: "يبدأ", pronunciation: "baş-la-mak", emoji: "▶️" },
            { word: "yardım etmek", translation: "يساعد", pronunciation: "yar-dım et-mek", emoji: "🤝" },
            { word: "konuşmak", translation: "يتحدث", pronunciation: "ko-nuş-mak", emoji: "💬" },
            { word: "oynamak", translation: "يلعب", pronunciation: "oy-na-mak", emoji: "🎮" },
            { word: "koşmak", translation: "يجري", pronunciation: "koş-mak", emoji: "🏃‍♀️" },
            { word: "yaşamak", translation: "يعيش", pronunciation: "ya-şa-mak", emoji: "🏡" },
            { word: "inanmak", translation: "يصدق", pronunciation: "i-nan-mak", emoji: "🙏" },
            { word: "yazmak", translation: "يكتب", pronunciation: "yaz-mak", emoji: "✍️" },
            { word: "oturmak", translation: "يجلس", pronunciation: "o-tur-mak", emoji: "🪑" },
            { word: "ödemek", translation: "يدفع", pronunciation: "ö-de-mek", emoji: "💵" },
            { word: "tanışmak", translation: "يقابل", pronunciation: "ta-nış-mak", emoji: "🤝" },
            { word: "öğrenmek", translation: "يتعلم", pronunciation: "öğ-ren-mek", emoji: "🎓" },
            { word: "anlamak", translation: "يفهم", pronunciation: "an-la-mak", emoji: "💡" },
            { word: "izlemek", translation: "يشاهد", pronunciation: "iz-le-mek", emoji: "📺" },
            { word: "durmak", translation: "يتوقف", pronunciation: "dur-mak", emoji: "🛑" },
            { word: "okumak", translation: "يقرأ", pronunciation: "o-ku-mak", emoji: "📖" },
            { word: "büyümek", translation: "ينمو", pronunciation: "bü-yü-mek", emoji: "🌱" },
            { word: "açmak", translation: "يفتح", pronunciation: "aç-mak", emoji: "🚪" },
            { word: "yürümek", translation: "يمشي", pronunciation: "yü-rü-mek", emoji: "🚶‍♂️" },
            { word: "kazanmak", translation: "يفوز", pronunciation: "ka-zan-mak", emoji: "🏆" },
            { word: "hatırlamak", translation: "يتذكر", pronunciation: "ha-tır-la-mak", emoji: "🧠" },
            { word: "sevmek", translation: "يحب", pronunciation: "sev-mek", emoji: "❤️" },
            { word: "beklemek", translation: "ينتظر", pronunciation: "bek-le-mek", emoji: "⏳" },
            { word: "göndermek", translation: "يرسل", pronunciation: "gön-der-mek", emoji: "📤" },
            { word: "kalmak", translation: "يبقى", pronunciation: "kal-mak", emoji: "🏨" },
            { word: "düşmek", translation: "يسقط", pronunciation: "düş-mek", emoji: "🍂" },
            { word: "kesmek", translation: "يقطع", pronunciation: "kes-mek", emoji: "✂️" },
            { word: "karar vermek", translation: "يقرر", pronunciation: "ka-rar ver-mek", emoji: "⚖️" },
            { word: "taşımak", translation: "يحمل", pronunciation: "ta-şı-mak", emoji: "🎒" },
            { word: "yemek", translation: "يأكل", pronunciation: "ye-mek", emoji: "🍔" },
            { word: "seçmek", translation: "يختار", pronunciation: "seç-mek", emoji: "☑️" },
        ],
        readingExercises: [
            readingExercise("İşe gitmem gerekiyor ama evde kalmak istiyorum.", "ابحث عن الأفعال المتناقضة.", "أنا بحاجة للذهاب إلى العمل، لكني أريد أن أبقى في المنزل.", ["O her şeyi görür ve duyar.", "Bunu taşımama yardım edebilir misin?", "Yeni bir dil öğrenmeye çalışıyor."]),
            readingExercise("Üç dilde okuyup yazabiliyor.", "ابحث عن المهارات اللغوية.", "هو يستطيع القراءة والكتابة بثلاث لغات.", ["Aynı anda hem konuşup hem yeme.", "Bir saat sonra döneceğim.", "Onlar her zaman oynar ve kazanır."])
        ],
        listeningExercises: [
            listeningExercise("anlamak", "القدرة على إدراك معنى شيء ما.", ["anlatmak", "karar vermek", "sormak"]),
            listeningExercise("yemek", "فعل وضع الطعام في الفم.", ["içmek", "uyumak", "koşmak"])
        ]
    },
    adjectives: {
        words: [
            { word: "iyi", translation: "جيد", pronunciation: "i-yi", emoji: "👍" },
            { word: "kötü", translation: "سيء", pronunciation: "kö-tü", emoji: "👎" },
            { word: "yeni", translation: "جديد", pronunciation: "ye-ni", emoji: "✨" },
            { word: "eski", translation: "قديم", pronunciation: "es-ki", emoji: "📜" },
            { word: "büyük", translation: "كبير", pronunciation: "bü-yük", emoji: "🐘" },
            { word: "küçük", translation: "صغير", pronunciation: "kü-çük", emoji: "🐭" },
            { word: "uzun", translation: "طويل", pronunciation: "u-zun", emoji: "📏" },
            { word: "kısa", translation: "قصير", pronunciation: "kı-sa", emoji: "📏" },
            { word: "yüksek", translation: "عالي", pronunciation: "yük-sek", emoji: "📈" },
            { word: "düşük", translation: "منخفض", pronunciation: "dü-şük", emoji: "📉" },
            { word: "sıcak", translation: "حار", pronunciation: "sı-cak", emoji: "🔥" },
            { word: "soğuk", translation: "بارد", pronunciation: "so-ğuk", emoji: "❄️" },
            { word: "mutlu", translation: "سعيد", pronunciation: "mut-lu", emoji: "😄" },
            { word: "üzgün", translation: "حزين", pronunciation: "üz-gün", emoji: "😢" },
            { word: "kolay", translation: "سهل", pronunciation: "ko-lay", emoji: "✅" },
            { word: "zor", translation: "صعب", pronunciation: "zor", emoji: "❌" },
            { word: "güzel", translation: "جميل", pronunciation: "gü-zel", emoji: "😍" },
            { word: "çirkin", translation: "قبيح", pronunciation: "çir-kin", emoji: "🤢" },
            { word: "hızlı", translation: "سريع", pronunciation: "hız-lı", emoji: "🏃" },
            { word: "yavaş", translation: "بطيء", pronunciation: "ya-vaş", emoji: "🐢" },
            { word: "önemli", translation: "مهم", pronunciation: "ö-nem-li", emoji: "⭐" },
            { word: "güçlü", translation: "قوي", pronunciation: "güç-lü", emoji: "💪" },
            { word: "zayıf", translation: "ضعيف", pronunciation: "za-yıf", emoji: "🤕" },
            { word: "doğru", translation: "صحيح", pronunciation: "doğ-ru", emoji: "➡️" },
            { word: "yanlış", translation: "خاطئ", pronunciation: "yan-lış", emoji: "❌" },
            { word: "dolu", translation: "ممتلئ", pronunciation: "do-lu", emoji: "🈵" },
            { word: "boş", translation: "فارغ", pronunciation: "boş", emoji: "🈳" },
            { word: "temiz", translation: "نظيف", pronunciation: "te-miz", emoji: "🧼" },
            { word: "kirli", translation: "متسخ", pronunciation: "kir-li", emoji: "💩" },
            { word: "genç", translation: "شاب", pronunciation: "genç", emoji: "👶" },
            { word: "yaşlı", translation: "عجوز", pronunciation: "yaş-lı", emoji: "👴" },
            { word: "erken", translation: "مبكر", pronunciation: "er-ken", emoji: "🌅" },
            { word: "geç", translation: "متأخر", pronunciation: "geç", emoji: "🌃" },
        ],
        readingExercises: [
            readingExercise("Yeni araba hızlı ama eski araba yavaş.", "ابحث عن الصفات المتضادة.", "السيارة الجديدة سريعة، لكن السيارة القديمة بطيئة.", ["Bu kitap iyi, o ise kötü.", "Soru kolay mı zor mu?", "Bugün hava çok sıcak."]),
            readingExercise("Onun güzel bir sesi ve nazik bir kalbi var.", "ابحث عن الصفات الإيجابية.", "لديها صوت جميل وقلب لطيف.", ["Güçlü adam zayıf adama yardım eder.", "Oda şimdi temiz.", "Hikaye uzun ama önemli değil."])
        ],
        listeningExercises: [
            listeningExercise("önemli", "صفة لشيء ذي قيمة أو أهمية كبيرة.", ["kolay", "farklı", "yanlış"]),
            listeningExercise("mutlu", "الشعور بالفرح أو الرضا.", ["üzgün", "kızgın", "yorgun"])
        ]
    },
    places: {
        words: [
            { word: "yer", translation: "مكان", pronunciation: "yer", emoji: "📍" },
            { word: "şehir", translation: "مدينة", pronunciation: "şe-hir", emoji: "🏙️" },
            { word: "ülke", translation: "دولة", pronunciation: "ül-ke", emoji: "🇹🇷" },
            { word: "dünya", translation: "عالم", pronunciation: "dün-ya", emoji: "🌍" },
            { word: "okul", translation: "مدرسة", pronunciation: "o-kul", emoji: "🏫" },
            { word: "üniversite", translation: "جامعة", pronunciation: "ü-ni-ver-si-te", emoji: "🎓" },
            { word: "hastane", translation: "مستشفى", pronunciation: "has-ta-ne", emoji: "🏥" },
            { word: "restoran", translation: "مطعم", pronunciation: "res-to-ran", emoji: "🍔" },
            { word: "otel", translation: "فندق", pronunciation: "o-tel", emoji: "🏨" },
            { word: "havaalanı", translation: "مطار", pronunciation: "ha-va-a-la-nı", emoji: "✈️" },
            { word: "istasyon", translation: "محطة", pronunciation: "is-tas-yon", emoji: "🚉" },
            { word: "park", translation: "حديقة عامة", pronunciation: "park", emoji: "🌳" },
            { word: "plaj", translation: "شاطئ", pronunciation: "plaj", emoji: "🏖️" },
            { word: "kütüphane", translation: "مكتبة", pronunciation: "kü-tüp-ha-ne", emoji: "📚" },
            { word: "banka", translation: "بنك", pronunciation: "ban-ka", emoji: "🏦" },
            { word: "ofis", translation: "مكتب", pronunciation: "o-fis", emoji: "🏢" },
            { word: "sokak", translation: "شارع", pronunciation: "so-kak", emoji: "🛣️" },
            { word: "yol", translation: "طريق", pronunciation: "yol", emoji: "🛤️" },
            { word: "çiftlik", translation: "مزرعة", pronunciation: "çift-lik", emoji: "🚜" },
            { word: "orman", translation: "غابة", pronunciation: "or-man", emoji: "🌲" },
            { word: "dağ", translation: "جبل", pronunciation: "dağ", emoji: "⛰️" },
            { word: "nehir", translation: "نهر", pronunciation: "ne-hir", emoji: "🏞️" },
            { word: "deniz", translation: "بحر", pronunciation: "de-niz", emoji: "🌊" },
            { word: "bina", translation: "مبنى", pronunciation: "bi-na", emoji: "🏢" },
            { word: "cami", translation: "مسجد", pronunciation: "ca-mi", emoji: "🕌" },
        ],
        readingExercises: [
            readingExercise("Otobüsle okula, sonra kütüphaneye gidiyorum.", "ابحث عن أماكن التعلم.", "أذهب إلى المدرسة بالحافلة، ثم أذهب إلى المكتبة.", ["Hastane bankanın yanında.", "Bu şehirde iyi bir restoran var mı?", "Büyük bir binada bir dairede yaşıyoruz."]),
            readingExercise("Yazın plaja veya parka gitmeyi severiz.", "ابحث عن أماكن الترفيه الصيفية.", "في الصيف، نحب أن نذهب إلى الشاطئ أو الحديقة.", ["Havaalanı şehir merkezinden uzak.", "Bir sonraki sokakta yeni bir pazar var.", "Otel nehrin üzerinde yer almaktadır."])
        ],
        listeningExercises: [
            listeningExercise("hastane", "المكان الذي تذهب إليه عندما تكون مريضاً.", ["okul", "otel", "banka"]),
            listeningExercise("şehir", "مكان كبير به الكثير من الناس والمباني.", ["köy", "çiftlik", "ülke"])
        ]
    },
    nature: {
        words: [
            { word: "doğa", translation: "طبيعة", pronunciation: "do-ğa", emoji: "🏞️" },
            { word: "ağaç", translation: "شجرة", pronunciation: "a-ğaç", emoji: "🌳" },
            { word: "çiçek", translation: "زهرة", pronunciation: "çi-çek", emoji: "🌸" },
            { word: "bitki", translation: "نبات", pronunciation: "bit-ki", emoji: "🌱" },
            { word: "çimen", translation: "عشب", pronunciation: "çi-men", emoji: "🌿" },
            { word: "güneş", translation: "شمس", pronunciation: "gü-neş", emoji: "☀️" },
            { word: "ay", translation: "قمر", pronunciation: "ay", emoji: "🌙" },
            { word: "yıldız", translation: "نجمة", pronunciation: "yıl-dız", emoji: "⭐" },
            { word: "gökyüzü", translation: "سماء", pronunciation: "gök-yü-zü", emoji: "☁️" },
            { word: "ateş", translation: "نار", pronunciation: "a-teş", emoji: "🔥" },
            { word: "toprak", translation: "أرض/تراب", pronunciation: "top-rak", emoji: "🌍" },
            { word: "hava", translation: "هواء", pronunciation: "ha-va", emoji: "💨" },
            { word: "buz", translation: "جليد", pronunciation: "buz", emoji: "🧊" },
            { word: "okyanus", translation: "محيط", pronunciation: "ok-ya-nus", emoji: "🌊" },
            { word: "göl", translation: "بحيرة", pronunciation: "göl", emoji: "🏞️" },
            { word: "tepe", translation: "تل", pronunciation: "te-pe", emoji: "🌄" },
            { word: "ada", translation: "جزيرة", pronunciation: "a-da", emoji: "🏝️" },
            { word: "çöl", translation: "صحراء", pronunciation: "çöl", emoji: "🏜️" },
            { word: "hayvan", translation: "حيوان", pronunciation: "hay-van", emoji: "🐾" },
            { word: "köpek", translation: "كلب", pronunciation: "kö-pek", emoji: "🐕" },
            { word: "kedi", translation: "قطة", pronunciation: "ke-di", emoji: "🐈" },
            { word: "kuş", translation: "طائر", pronunciation: "kuş", emoji: "🐦" },
            { word: "kaya", translation: "صخرة", pronunciation: "ka-ya", emoji: "🪨" },
            { word: "kum", translation: "رمل", pronunciation: "kum", emoji: "🏖️" },
        ],
        readingExercises: [
            readingExercise("Güneş gökyüzünde, balık denizde.", "ابحث عن مكونات السماء والبحر.", "الشمس في السماء، والسمكة في البحر.", ["Dağ yüksek ve nehir uzun.", "Ormandaki ağaçlar yeşil.", "Yağmur ve rüzgarın sesini seviyorum."]),
            readingExercise("Küçük bir kuş büyük bir ağacın üzerinde oturuyor.", "ابحث عن الكائن الصغير والكبير.", "طائر صغير يجلس على شجرة كبيرة.", ["Kedi topla oynuyor.", "İlkbaharda çiçekler güzeldir.", "Çöl sıcak ve kurudur."])
        ],
        listeningExercises: [
            listeningExercise("ağaç", "نبات كبير له جذع وأغصان.", ["çiçek", "çimen", "dağ"]),
            listeningExercise("su", "سائل شفاف ضروري للحياة.", ["ateş", "hava", "kum"])
        ]
    },
    hobbies: {
        words: [
            { word: "hobi", translation: "هواية", pronunciation: "ho-bi", emoji: "🎨" },
            { word: "okumak", translation: "قراءة", pronunciation: "o-ku-mak", emoji: "📖" },
            { word: "yazmak", translation: "كتابة", pronunciation: "yaz-mak", emoji: "✍️" },
            { word: "müzik", translation: "موسيقى", pronunciation: "mü-zik", emoji: "🎵" },
            { word: "sanat", translation: "فن", pronunciation: "sa-nat", emoji: "🖼️" },
            { word: "çizim", translation: "رسم", pronunciation: "çi-zim", emoji: "✏️" },
            { word: "boyama", translation: "تلوين", pronunciation: "bo-ya-ma", emoji: "🎨" },
            { word: "spor", translation: "رياضة", pronunciation: "spor", emoji: "⚽" },
            { word: "yüzme", translation: "سباحة", pronunciation: "yüz-me", emoji: "🏊" },
            { word: "koşu", translation: "جري", pronunciation: "ko-şu", emoji: "🏃" },
            { word: "yemek yapmak", translation: "طبخ", pronunciation: "ye-mek yap-mak", emoji: "🍳" },
            { word: "film izlemek", translation: "مشاهدة أفلام", pronunciation: "film iz-le-mek", emoji: "🎬" },
            { word: "oyun oynamak", translation: "لعب ألعاب", pronunciation: "o-yun oy-na-mak", emoji: "🎮" },
            { word: "seyahat etmek", translation: "سفر", pronunciation: "se-ya-hat et-mek", emoji: "✈️" },
            { word: "dans etmek", translation: "رقص", pronunciation: "dans et-mek", emoji: "💃" },
            { word: "şarkı söylemek", translation: "غناء", pronunciation: "şar-kı söy-le-mek", emoji: "🎤" },
            { word: "fotoğrafçılık", translation: "تصوير فوتوغرافي", pronunciation: "fo-toğ-raf-çı-lık", emoji: "📸" },
            { word: "bahçıvanlık", translation: "بستنة", pronunciation: "bah-çı-van-lık", emoji: "🪴" },
        ],
        readingExercises: [
            readingExercise("Hobim kitap okumak ve müzik dinlemek.", "ابحث عن الهوايات المذكورة.", "هوايتي هي قراءة الكتب والاستماع إلى الموسيقى.", ["Spor yapmayı ve yüzmeyi sever.", "Yemek yapmakta ve çizimde iyidir.", "Seyahat etmeyi ve oyun oynamayı sever misin?"]),
            readingExercise("Film izlemek eğlencelidir ama dışarıda koşmayı tercih ederim.", "ابحث عن الهواية الداخلية والخارجية.", "مشاهدة الأفلام ممتعة، لكني أفضل الجري في الخارج.", ["Şarkı söylemek ve dans etmek yetenek gerektirir.", "Yazmak yaratıcı bir hobidir.", "Fotoğrafçılık güzel anları yakalar."])
        ],
        listeningExercises: [
            listeningExercise("müzik", "فن تنظيم الأصوات في الوقت المناسب.", ["sanat", "spor", "okumak"]),
            listeningExercise("yemek yapmak", "تحضير الطعام عن طريق تسخينه.", ["yüzme", "yazmak", "seyahat etmek"])
        ]
    },
    emotions: {
        words: [
            { word: "duygu", translation: "شعور", pronunciation: "duy-gu", emoji: "❤️" },
            { word: "mutlu", translation: "سعيد", pronunciation: "mut-lu", emoji: "😄" },
            { word: "üzgün", translation: "حزين", pronunciation: "üz-gün", emoji: "😢" },
            { word: "kızgın", translation: "غاضب", pronunciation: "kız-gın", emoji: "😠" },
            { word: "şaşırmış", translation: "متفاجئ", pronunciation: "şa-şır-mış", emoji: "😲" },
            { word: "korkmuş", translation: "خائف", pronunciation: "kork-muş", emoji: "😨" },
            { word: "yorgun", translation: "متعب", pronunciation: "yor-gun", emoji: "😴" },
            { word: "sıkılmış", translation: "ملل", pronunciation: "sı-kıl-mış", emoji: "😒" },
            { word: "heyecanlı", translation: "متحمس", pronunciation: "he-ye-can-lı", emoji: "🤩" },
            { word: "aşk", translation: "حب", pronunciation: "aşk", emoji: "❤️" },
            { word: "nefret", translation: "كره", pronunciation: "nef-ret", emoji: "💔" },
            { word: "umut", translation: "أمل", pronunciation: "u-mut", emoji: "🙏" },
            { word: "korku", translation: "خوف", pronunciation: "kor-ku", emoji: "😨" },
            { word: "sevinç", translation: "فرح", pronunciation: "se-vinç", emoji: "😊" },
            { word: "gururlu", translation: "فخور", pronunciation: "gu-rur-lu", emoji: "ภูมิใจ" },
            { word: "utangaç", translation: "خجول", pronunciation: "u-tan-gaç", emoji: "😊" },
            { word: "sakin", translation: "هادئ", pronunciation: "sa-kin", emoji: "😌" },
            { word: "endişeli", translation: "قلق", pronunciation: "en-di-şe-li", emoji: "😟" },
        ],
        readingExercises: [
            readingExercise("Arkadaşlarımı görünce mutlu oluyorum ama ayrılınca üzülüyorum.", "ابحث عن المشاعر المتضادة.", "أشعر بالسعادة عندما أرى أصدقائي، لكني حزين للمغادرة.", ["Geç kaldıkları için kızgın.", "Korkma, her şey yoluna girecek.", "Yolculuk için çok heyecanlıyım."]),
            readingExercise("Hediyeye şaşırdı ve büyük bir sevinç duydu.", "ابحث عن المشاعر الإيجابية.", "لقد تفاجأت بالهدية وشعرت بفرح كبير.", ["Çocuk yorgun ve uyumak istiyor.", "Başarınla gurur duyuyorum.", "Endişelenme, sakin ol."])
        ],
        listeningExercises: [
            listeningExercise("kızgın", "الشعور أو إظهار الاستياء الشديد.", ["mutlu", "üzgün", "yorgun"]),
            listeningExercise("aşk", "شعور عميق بالمودة والمحبة.", ["nefret", "korku", "umut"])
        ]
    },
    work: {
        words: [
            { word: "İş", translation: "عمل/وظيفة", pronunciation: "iş", emoji: "🏢" },
            { word: "Ofis", translation: "مكتب", pronunciation: "o-fis", emoji: "🏢" },
            { word: "Şirket", translation: "شركة", pronunciation: "şir-ket", emoji: "🏭" },
            { word: "Müdür", translation: "مدير", pronunciation: "mü-dür", emoji: "👨‍💼" },
            { word: "Çalışan", translation: "موظف", pronunciation: "ça-lı-şan", emoji: "🧑‍💼" },
            { word: "Meslektaş", translation: "زميل", pronunciation: "mes-lek-taş", emoji: "👥" },
            { word: "Maaş", translation: "راتب", pronunciation: "ma-aş", emoji: "💵" },
            { word: "Toplantı", translation: "اجتماع", pronunciation: "top-lan-tı", emoji: "🤝" },
            { word: "E-posta", translation: "بريد إلكتروني", pronunciation: "e-pos-ta", emoji: "📧" },
            { word: "Bilgisayar", translation: "حاسوب", pronunciation: "bil-gi-sa-yar", emoji: "💻" },
            { word: "Telefon", translation: "هاتف", pronunciation: "te-le-fon", emoji: "📱" },
            { word: "Proje", translation: "مشروع", pronunciation: "pro-je", emoji: "📈" },
            { word: "Son teslim tarihi", translation: "موعد نهائي", pronunciation: "son tes-lim ta-ri-hi", emoji: "⏳" },
            { word: "Görev", translation: "مهمة", pronunciation: "gö-rev", emoji: "📋" },
            { word: "Kariyer", translation: "مهنة", pronunciation: "ka-ri-yer", emoji: "🚀" },
        ],
        readingExercises: [
            readingExercise("Müdürün ofiste bir toplantısı var.", "ابحث عن كلمات 'müdür', 'toplantı', 'ofis'.", "المدير لديه اجتماع في المكتب.", ["Çalışan bilgisayarda çalışıyor.", "Bu işin maaşı iyi.", "Sana bir e-posta gönderdim."]),
            readingExercise("Meslektaşım projeyi son teslim tarihinden önce bitirmeme yardım etti.", "ابحث عن كلمات العمل الجماعي والوقت.", "زميلي ساعدني في إنهاء المشروع قبل الموعد النهائي.", ["E-postaları kontrol etmek için telefonumu kullanıyorum.", "Bu görev çok zor.", "Sana başarılı bir kariyer dilerim."])
        ],
        listeningExercises: [
            listeningExercise("Ofis", "مكان العمل المكتبي.", ["Otel", "Okul", "Havaalanı"]),
            listeningExercise("Bilgisayar", "جهاز إلكتروني لمعالجة البيانات.", ["Telefon", "Kitap", "Kalem"])
        ]
    },
    travel: {
        words: [
            { word: "Seyahat", translation: "سفر", pronunciation: "se-ya-hat", emoji: "🌍" },
            { word: "Gezi", translation: "رحلة", pronunciation: "ge-zi", emoji: "✈️" },
            { word: "Tatil", translation: "عطلة", pronunciation: "ta-til", emoji: "🏖️" },
            { word: "Havaalanı", translation: "مطار", pronunciation: "ha-va-a-la-nı", emoji: "✈️" },
            { word: "Uçak", translation: "طائرة", pronunciation: "u-çak", emoji: "✈️" },
            { word: "Pasaport", translation: "جواز سفر", pronunciation: "pa-sa-port", emoji: "🛂" },
            { word: "Bilet", translation: "تذكرة", pronunciation: "bi-let", emoji: "🎟️" },
            { word: "Otel", translation: "فندق", pronunciation: "o-tel", emoji: "🏨" },
            { word: "Tren", translation: "قطار", pronunciation: "tren", emoji: "🚆" },
            { word: "Araba", translation: "سيارة", pronunciation: "a-ra-ba", emoji: "🚗" },
            { word: "Otobüs", translation: "حافلة", pronunciation: "o-to-büs", emoji: "🚌" },
            { word: "Taksi", translation: "سيارة أجرة", pronunciation: "tak-si", emoji: "🚕" },
            { word: "Harita", translation: "خريطة", pronunciation: "ha-ri-ta", emoji: "🗺️" },
            { word: "Bavul", translation: "حقيبة سفر", pronunciation: "ba-vul", emoji: "🧳" },
            { word: "Bagaj", translation: "أمتعة", pronunciation: "ba-gaj", emoji: "🧳" },
            { word: "Turist", translation: "سائح", pronunciation: "tu-rist", emoji: "📸" },
            { word: "Varış noktası", translation: "وجهة", pronunciation: "va-rış nok-ta-sı", emoji: "📍" },
        ],
        readingExercises: [
            readingExercise("Uçak için bir pasaport ve bir bilete ihtiyacım var.", "ترجم الكلمات 'pasaport', 'bilet', و 'uçak'.", "أحتاج جواز سفر وتذكرة للطائرة.", ["Otel tren istasyonuna yakın.", "Bu senin yeni araban mı?", "Haritayı ve bavulu unutma."]),
            readingExercise("Varış noktamız tatil için güzel bir ada.", "ابحث عن مكان ونوع الرحلة.", "وجهتنا هي جزيرة جميلة لقضاء العطلة.", ["Turist çok fotoğraf çekiyor.", "Bagajım çok ağır.", "Havaalanına taksiyle gideceğim."])
        ],
        listeningExercises: [
            listeningExercise("Pasaport", "وثيقة رسمية للسفر الدولي.", ["Bilet", "Bavul", "Otel"]),
            listeningExercise("Araba", "وسيلة نقل خاصة بأربع عجلات.", ["Otobüs", "Tren", "Uçak"])
        ]
    }
};

export const TURKISH_GAMES: GamesCollection = {
    games: [
        {
            type: 'match',
            title: 'Kelime Eşleştirme',
            description: 'Türkçe kelimeyi Arapça çevirisiyle eşleştirin.',
            items: [
                { id: 'tr_match_1', word: 'Ev', translation: 'منزل' },
                { id: 'tr_match_2', word: 'Kedi', translation: 'قطة' },
                { id: 'tr_match_3', word: 'Kitap', translation: 'كتاب' },
                { id: 'tr_match_4', word: 'Yemek', translation: 'طعام' },
            ]
        },
        {
            type: 'missing_word',
            title: 'Eksik Kelime',
            description: 'Cümleyi tamamlamak için doğru kelimeyi seçin.',
            sentence: 'Güneş {blank} ve sıcaktır.',
            correctWord: 'sarı',
            options: ['sarı', 'mavi', 'soğuk', 'üzgün']
        }
    ]
};
