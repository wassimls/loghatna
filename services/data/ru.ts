
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

export const RUSSIAN_CONTENT: { [categoryName: string]: CategoryContent; } = {
    alphabet: {
        words: [
            { word: "а", translation: "أ", pronunciation: "a", emoji: "🍉" },
            { word: "б", translation: "ب", pronunciation: "be", emoji: "🍌" },
            { word: "в", translation: "ڤ", pronunciation: "ve", emoji: "🐺" },
            { word: "г", translation: "گ", pronunciation: "ge", emoji: "🍇" },
            { word: "д", translation: "د", pronunciation: "de", emoji: "🏡" },
            { word: "е", translation: "ييه", pronunciation: "ye", emoji: "🦔" },
            { word: "ё", translation: "يو", pronunciation: "yo", emoji: "🎄" },
            { word: "ж", translation: "ژ", pronunciation: "zhe", emoji: "🐞" },
            { word: "з", translation: "ز", pronunciation: "ze", emoji: "🦓" },
            { word: "и", translation: "إي", pronunciation: "i", emoji: "🪡" },
            { word: "й", translation: "إي قصيرة", pronunciation: "iy kratkoye", emoji: "🧘" },
            { word: "к", translation: "ك", pronunciation: "ka", emoji: "👑" },
            { word: "л", translation: "ل", pronunciation: "el", emoji: "🍋" },
            { word: "м", translation: "م", pronunciation: "em", emoji: "🐻" },
            { word: "н", translation: "ن", pronunciation: "en", emoji: "👃" },
            { word: "о", translation: "أو", pronunciation: "o", emoji: "🍊" },
            { word: "п", translation: "پ", pronunciation: "pe", emoji: "🐧" },
            { word: "р", translation: "ر", pronunciation: "er", emoji: "🤖" },
            { word: "с", translation: "س", pronunciation: "es", emoji: "☀️" },
            { word: "т", translation: "ت", pronunciation: "te", emoji: "🐢" },
            { word: "у", translation: "أو (مضمومة)", pronunciation: "u", emoji: "🐌" },
            { word: "ф", translation: "ف", pronunciation: "ef", emoji: " фонарь" },
            { word: "х", translation: "خ", pronunciation: "kha", emoji: "🍞" },
            { word: "ц", translation: "تس", pronunciation: "tse", emoji: "👑" },
            { word: "ч", translation: "تش", pronunciation: "che", emoji: " чайник" },
            { word: "ш", translation: "ش", pronunciation: "sha", emoji: " шапка" },
            { word: "щ", translation: "شْشَ", pronunciation: "shcha", emoji: " щётка" },
            { word: "ъ", translation: "علامة التفخيم", pronunciation: "tvordyy znak", emoji: "🧱" },
            { word: "ы", translation: "إي (مفخمة)", pronunciation: "yery", emoji: "🧀" },
            { word: "ь", translation: "علامة الترقيق", pronunciation: "myagkiy znak", emoji: "🪶" },
            { word: "э", translation: "إيه", pronunciation: "e", emoji: " экскаватор" },
            { word: "ю", translation: "يو", pronunciation: "yu", emoji: " юбка" },
            { word: "я", translation: "يا", pronunciation: "ya", emoji: " яблоко" },
        ],
        readingExercises: [
            readingExercise("Это мой дом.", "مثال على حرف 'д'", "هذا منزلي.", ["هذا كتاب.", "هذا قط.", "هذه سيارة."]),
            readingExercise("Мама мыла раму.", "جملة سهلة للقراءة", "الأم غسلت الإطار.", ["القطة تشرب الحليب.", "أنا أقرأ كتاباً.", "هو يلعب بالكرة."])
        ],
        listeningExercises: [
            listeningExercise("а", "أول حرف في الأبجدية.", ["б", "в", "г"]),
            listeningExercise("я", "آخر حرف في الأبجدية.", ["ю", "э", "ь"])
        ]
    },
    basics: {
        words: [
            { word: "Я", translation: "أنا", pronunciation: "يا", emoji: "👤" },
            { word: "Ты", translation: "أنت", pronunciation: "تي", emoji: "👥" },
            { word: "Он/Она", translation: "هو/هي", pronunciation: "أون/آنا", emoji: "🧑" },
            { word: "Мы", translation: "نحن", pronunciation: "مي", emoji: "👨‍👩‍👧‍👦" },
            { word: "Вы", translation: "أنتم", pronunciation: "ڤي", emoji: "👨‍👩‍👧‍👦" },
            { word: "Они", translation: "هم", pronunciation: "آني", emoji: "👨‍👩‍👧‍👦" },
            { word: "Что", translation: "ماذا", pronunciation: "شتو", emoji: "❓" },
            { word: "Кто", translation: "من", pronunciation: "كتو", emoji: "❓" },
            { word: "Где", translation: "أين", pronunciation: "غديه", emoji: "📍" },
            { word: "Когда", translation: "متى", pronunciation: "كاغدا", emoji: "⏰" },
            { word: "Почему", translation: "لماذا", pronunciation: "پاتشيمو", emoji: "🤔" },
            { word: "Как", translation: "كيف", pronunciation: "كاك", emoji: "🤔" },
            { word: "Да", translation: "نعم", pronunciation: "دا", emoji: "👍" },
            { word: "Нет", translation: "لا", pronunciation: "نيت", emoji: "👎" },
            { word: "Может быть", translation: "ربما", pronunciation: "موجيت بيت", emoji: "🤷" },
            { word: "Пожалуйста", translation: "من فضلك", pronunciation: "پاجالستا", emoji: "🙏" },
            { word: "Спасибо", translation: "شكراً", pronunciation: "سپاسيبا", emoji: "😊" },
            { word: "Извините", translation: "آسف/اعذرني", pronunciation: "إزڤينيتي", emoji: "😔" },
            { word: "И", translation: "و", pronunciation: "إي", emoji: "&" },
            { word: "Но", translation: "لكن", pronunciation: "نو", emoji: "↔️" },
            { word: "Или", translation: "أو", pronunciation: "إيلي", emoji: "🤷‍♀️" },
            { word: "Потому что", translation: "لأن", pronunciation: "پاتامو شتو", emoji: "👉" },
        ],
        readingExercises: [
            readingExercise("Сегодня я счастлив, но очень холодно.", "ابحث عن ترجمة 'счастлив' و 'холодно'.", "أنا سعيد اليوم، لكن الجو بارد جداً.", ["Он грустный, потому что жарко.", "Ты в порядке? Да, спасибо.", "Это легко, а то трудно."]),
            readingExercise("У большого дома есть маленький сад.", "ترجم 'большой дом' و 'маленький сад'.", "البيت الكبير له حديقة صغيرة.", ["Кошка пьёт молоко.", "Вы можете мне помочь?", "Это моя книга."])
        ],
        listeningExercises: [
            listeningExercise("Спасибо", "كلمة شائعة لإظهار الامتنان.", ["Извините", "Пожалуйста", "Привет"]),
            listeningExercise("Доброе утро", "تحية تقال في الصباح.", ["Спокойной ночи", "До свидания", "Привет"])
        ]
    },
    greetings: {
        words: [
            { word: "Здравствуйте", translation: "مرحباً (رسمي)", pronunciation: "زدراستڤويتي", emoji: "👋" },
            { word: "Привет", translation: "أهلاً (غير رسمي)", pronunciation: "پريڤيت", emoji: "👋" },
            { word: "Доброе утро", translation: "صباح الخير", pronunciation: "دوبرويه اوترا", emoji: "☀️" },
            { word: "Добрый день", translation: "نهارك سعيد", pronunciation: "دوبري دين", emoji: "🌇" },
            { word: "Добрый вечер", translation: "مساء الخير", pronunciation: "دوبري ڤيتشر", emoji: "🌃" },
            { word: "Спокойной ночи", translation: "تصبح على خير", pronunciation: "سپاكوينوي نوتشي", emoji: "🌙" },
            { word: "До свидания", translation: "إلى اللقاء", pronunciation: "دا سڤيدانيا", emoji: "👋" },
            { word: "Пока", translation: "وداعاً (غير رسمي)", pronunciation: "پاكا", emoji: "👋" },
            { word: "Как дела?", translation: "كيف حالك؟", pronunciation: "كاك ديلا؟", emoji: "❓" },
            { word: "Хорошо, спасибо.", translation: "بخير، شكراً.", pronunciation: "خاراشو، سپاسيبا", emoji: "😊" },
            { word: "А у тебя?", translation: "وأنت؟", pronunciation: "آ أو تيبيا؟", emoji: "❓" },
            { word: "Как тебя зовут?", translation: "ما اسمك؟", pronunciation: "كاك تيبيا زاڤوت؟", emoji: "❓" },
            { word: "Меня зовут...", translation: "اسمي هو...", pronunciation: "مينيا زاڤوت...", emoji: "🏷️" },
            { word: "Очень приятно", translation: "سررت بلقائك.", pronunciation: "أوتشين پرياتنا", emoji: "🤝" },
            { word: "Добро пожаловать", translation: "أهلاً بك", pronunciation: "دابرو پاجالوفات", emoji: "🎉" },
        ],
        readingExercises: [
            readingExercise("Доброе утро, как дела?", "ابحث عن التحية الصباحية والسؤال عن الحال.", "صباح الخير، كيف حالك؟", ["Спокойной ночи, до завтра.", "Как тебя зовут и откуда ты?", "У меня всё хорошо, спасибо."]),
            readingExercise("Как тебя зовут? Меня зовут Ахмед.", "ابحث عن السؤال عن الاسم والإجابة.", "ما اسمك؟ اسمي أحمد.", ["Как дела? Хорошо.", "Откуда ты? Я из Египта.", "Очень приятно."])
        ],
        listeningExercises: [
            listeningExercise("Как тебя зовут?", "سؤال للاستفسار عن اسم الشخص.", ["Как дела?", "До свидания", "Доброе утро"]),
            listeningExercise("Очень приятно", "عبارة تقال عند مقابلة شخص لأول مرة.", ["Спасибо", "Привет", "Извините"])
        ]
    },
    numbers: {
        words: [
            { word: "Ноль", translation: "صفر", pronunciation: "نول", emoji: "0️⃣" },
            { word: "Один", translation: "واحد", pronunciation: "آدين", emoji: "1️⃣" },
            { word: "Два", translation: "اثنان", pronunciation: "دڤا", emoji: "2️⃣" },
            { word: "Три", translation: "ثلاثة", pronunciation: "تري", emoji: "3️⃣" },
            { word: "Четыре", translation: "أربعة", pronunciation: "تشيتيري", emoji: "4️⃣" },
            { word: "Пять", translation: "خمسة", pronunciation: "پيات", emoji: "5️⃣" },
            { word: "Шесть", translation: "ستة", pronunciation: "شيست", emoji: "6️⃣" },
            { word: "Семь", translation: "سبعة", pronunciation: "سيم", emoji: "7️⃣" },
            { word: "Восемь", translation: "ثمانية", pronunciation: "ڤوسيم", emoji: "8️⃣" },
            { word: "Девять", translation: "تسعة", pronunciation: "ديڤيت", emoji: "9️⃣" },
            { word: "Десять", translation: "عشرة", pronunciation: "ديسيت", emoji: "🔟" },
            { word: "Одиннадцать", translation: "أحد عشر", pronunciation: "آدينّادسات", emoji: "1️⃣1️⃣" },
            { word: "Двенадцать", translation: "اثنا عشر", pronunciation: "دڤينادسات", emoji: "1️⃣2️⃣" },
            { word: "Двадцать", translation: "عشرون", pronunciation: "دڤادسات", emoji: "2️⃣0️⃣" },
            { word: "Тридцать", translation: "ثلاثون", pronunciation: "تريدسات", emoji: "3️⃣0️⃣" },
            { word: "Сорок", translation: "أربعون", pronunciation: "سوروك", emoji: "4️⃣0️⃣" },
            { word: "Пятьдесят", translation: "خمسون", pronunciation: "پيادديسيات", emoji: "5️⃣0️⃣" },
            { word: "Сто", translation: "مئة", pronunciation: "ستو", emoji: "💯" },
            { word: "Тысяча", translation: "ألف", pronunciation: "تيسياتشا", emoji: "1️⃣0️⃣0️⃣0️⃣" },
        ],
        readingExercises: [
            readingExercise("У меня две руки и десять пальцев.", "ابحث عن الأرقام 2 و 10.", "لدي يدان وعشرة أصابع.", ["У меня три книги и пять ручек.", "Ты можешь считать от одного до десяти?", "Ему восемь лет."]),
            readingExercise("На флаге пятьдесят звёзд.", "ابحث عن الرقم 50.", "يوجد خمسون نجمة على العلم.", ["У меня есть двадцать долларов.", "Первые сто дней важны.", "Один плюс два равно три."])
        ],
        listeningExercises: [
            listeningExercise("Пять", "الرقم الذي يأتي بعد أربعة.", ["Четыре", "Один", "Десять"]),
            listeningExercise("Двадцать", "ضعف الرقم عشرة.", ["Двенадцать", "Два", "Десять"])
        ]
    },
    colors: {
        words: [
            { word: "Цвет", translation: "لون", pronunciation: "تسڤيت", emoji: "🎨" },
            { word: "Красный", translation: "أحمر", pronunciation: "كراسني", emoji: "🔴" },
            { word: "Зелёный", translation: "أخضر", pronunciation: "زيلوني", emoji: "🟢" },
            { word: "Синий", translation: "أزرق", pronunciation: "سيني", emoji: "🔵" },
            { word: "Жёлтый", translation: "أصفر", pronunciation: "جولتي", emoji: "🟡" },
            { word: "Чёрный", translation: "أسود", pronunciation: "تشيورني", emoji: "⚫" },
            { word: "Белый", translation: "أبيض", pronunciation: "بيلي", emoji: "⚪" },
            { word: "Оранжевый", translation: "برتقالي", pronunciation: "آرانجيڤي", emoji: "🟠" },
            { word: "Фиолетовый", translation: "بنفسجي", pronunciation: "فياليتوڤي", emoji: "🟣" },
            { word: "Коричневый", translation: "بني", pronunciation: "كاريچنيڤي", emoji: "🟤" },
            { word: "Розовый", translation: "وردي", pronunciation: "روزوڤي", emoji: "🌸" },
            { word: "Серый", translation: "رمادي", pronunciation: "سيري", emoji: "🐘" },
        ],
        readingExercises: [
            readingExercise("Небо синее, а трава зелёная.", "ركز على ترجمة 'синее' و 'зелёная'.", "السماء زرقاء والعشب أخضر.", ["Яблоко красное, а банан жёлтый.", "Мне нравится чёрный и белый.", "Его новая машина красная."]),
            readingExercise("У неё розовое платье и белые туфли.", "ابحث عن 'розовое' و 'белые'.", "لديها فستان وردي وحذاء أبيض.", ["Кошка чёрная, а собака коричневая.", "Тебе нравится фиолетовый цвет?", "Золото и серебро - драгоценные металлы."])
        ],
        listeningExercises: [
            listeningExercise("Красный", "لون الدم أو الفراولة.", ["Синий", "Зелёный", "Жёлтый"]),
            listeningExercise("Чёрный", "عكس اللون الأبيض.", ["Белый", "Синий", "Серый"])
        ]
    },
    family: {
        words: [
            { word: "Семья", translation: "عائلة", pronunciation: "سيميا", emoji: "👨‍👩‍👧‍👦" },
            { word: "Отец", translation: "أب", pronunciation: "آتيتس", emoji: "👨" },
            { word: "Мать", translation: "أم", pronunciation: "مات", emoji: "👩" },
            { word: "Родители", translation: "والدين", pronunciation: "راديتيلي", emoji: "👨‍👩‍👧" },
            { word: "Сын", translation: "ابن", pronunciation: "سين", emoji: "👦" },
            { word: "Дочь", translation: "ابنة", pronunciation: "دوتش", emoji: "👧" },
            { word: "Ребёнок", translation: "طفل", pronunciation: "ريبيوناك", emoji: "👶" },
            { word: "Брат", translation: "أخ", pronunciation: "برات", emoji: "👱‍♂️" },
            { word: "Сестра", translation: "أخت", pronunciation: "سيسترا", emoji: "👱‍♀️" },
            { word: "Дедушка", translation: "جد", pronunciation: "ديدوشكا", emoji: "👴" },
            { word: "Бабушка", translation: "جدة", pronunciation: "بابوشكا", emoji: "👵" },
            { word: "Дядя", translation: "عم/خال", pronunciation: "دياديا", emoji: "👨‍" },
            { word: "Тётя", translation: "عمة/خالة", pronunciation: "تيوتيا", emoji: "👩‍" },
            { word: "Двоюродный брат/сестра", translation: "ابن/بنت العم/الخال", pronunciation: "دڤايورودني برات/سيسترا", emoji: "🧑" },
            { word: "Муж", translation: "زوج", pronunciation: "موج", emoji: "🤵" },
            { word: "Жена", translation: "زوجة", pronunciation: "جينا", emoji: "👰" },
        ],
        readingExercises: [
            readingExercise("Мой отец и моя мать - мои родители.", "ابحث عن ترجمة 'отец', 'мать', و 'родители'.", "أبي وأمي هما والديّ.", ["Мой брат и моя сестра играют вместе.", "Мой дедушка и моя бабушка живут в большом доме.", "Это мой сын, а это моя дочь."]),
            readingExercise("Моя сестра младше моего брата.", "ركز على المقارنة بين 'сестра' و 'брат'.", "أختي أصغر من أخي.", ["Моя семья очень большая.", "Мой двоюродный брат живёт в другом городе.", "Мой дедушка любит читать."])
        ],
        listeningExercises: [
            listeningExercise("Брат", "شقيق ذكر.", ["Сестра", "Отец", "Мать"]),
            listeningExercise("Мать", "الكلمة الروسية التي تعني 'أم'.", ["Отец", "Дочь", "Сын"])
        ]
    },
    food: {
        words: [
            { word: "Еда", translation: "طعام", pronunciation: "ييدا", emoji: "🍔" },
            { word: "Напиток", translation: "شراب", pronunciation: "ناپيتاك", emoji: "🥤" },
            { word: "Вода", translation: "ماء", pronunciation: "ڤادا", emoji: "💧" },
            { word: "Кофе", translation: "قهوة", pronunciation: "كوفي", emoji: "☕" },
            { word: "Чай", translation: "شاي", pronunciation: "تشاي", emoji: "🍵" },
            { word: "Сок", translation: "عصير", pronunciation: "سوك", emoji: "🧃" },
            { word: "Молоко", translation: "حليب", pronunciation: "مالاكو", emoji: "🥛" },
            { word: "Хлеб", translation: "خبز", pronunciation: "خليب", emoji: "🍞" },
            { word: "Сыр", translation: "جبن", pronunciation: "سير", emoji: "🧀" },
            { word: "Рис", translation: "أرز", pronunciation: "ريس", emoji: "🍚" },
            { word: "Курица", translation: "دجاج", pronunciation: "كوريتسا", emoji: "🍗" },
            { word: "Мясо", translation: "لحم", pronunciation: "مياسا", emoji: "🥩" },
            { word: "Рыба", translation: "سمك", pronunciation: "ريبا", emoji: "🐟" },
            { word: "Фрукт", translation: "فاكهة", pronunciation: "فروكت", emoji: "🍎" },
            { word: "Яблоко", translation: "تفاحة", pronunciation: "يابلَكا", emoji: "🍎" },
            { word: "Банан", translation: "موزة", pronunciation: "بانان", emoji: "🍌" },
            { word: "Апельсин", translation: "برتقالة", pronunciation: "آپيلسين", emoji: "🍊" },
            { word: "Овощ", translation: "خضروات", pronunciation: "أوڤوش", emoji: "🥕" },
            { word: "Морковь", translation: "جزرة", pronunciation: "ماركوف", emoji: "🥕" },
            { word: "Картофель", translation: "بطاطس", pronunciation: "كارتوفيل", emoji: "🥔" },
            { word: "Помидор", translation: "طماطم", pronunciation: "پاميدور", emoji: "🍅" },
            { word: "Сахар", translation: "سكر", pronunciation: "ساخار", emoji: "🍬" },
            { word: "Соль", translation: "ملح", pronunciation: "سول", emoji: "🧂" },
            { word: "Завтрак", translation: "فطور", pronunciation: "زاڤتراك", emoji: "🍳" },
            { word: "Обед", translation: "غداء", pronunciation: "آبيت", emoji: "🍱" },
            { word: "Ужин", translation: "عشاء", pronunciation: "أوجين", emoji: "🍝" },
        ],
        readingExercises: [
            readingExercise("Я голоден. Я хочу есть хлеб и сыр.", "ركز على كلمتي 'хлеб' و 'сыр'.", "أنا جائع. أريد أن آكل الخبز والجبن.", ["Я хочу пить. Я хочу пить воду.", "Еда вкусная.", "Можно мне меню, пожалуйста?"]),
            readingExercise("На завтрак я люблю кофе и яблоко.", "ابحث عن طعام وشراب الفطور.", "في الفطور، أحب القهوة وتفاحة.", ["Я ем рис и курицу на обед.", "Ужин готов в семь часов.", "Этот сок свежий и вкусный."])
        ],
        listeningExercises: [
            listeningExercise("Яблоко", "نوع من الفاكهة، غالبًا ما يكون أحمر أو أخضر.", ["Апельсин", "Вода", "Хлеб"]),
            listeningExercise("Вода", "شراب أساسي وشفاف.", ["Молоко", "Сок", "Чай"])
        ]
    },
    time: {
        words: [
            { word: "Время", translation: "وقت", pronunciation: "ڤريميا", emoji: "⏰" },
            { word: "Час", translation: "ساعة", pronunciation: "تشاس", emoji: "⏳" },
            { word: "Минута", translation: "دقيقة", pronunciation: "مينوتا", emoji: "⏱️" },
            { word: "Секунда", translation: "ثانية", pronunciation: "سيكُندا", emoji: "⏱️" },
            { word: "День", translation: "يوم", pronunciation: "دين", emoji: "📅" },
            { word: "Неделя", translation: "أسبوع", pronunciation: "نيديليا", emoji: "🗓️" },
            { word: "Месяц", translation: "شهر", pronunciation: "ميسياتس", emoji: "🈷️" },
            { word: "Год", translation: "سنة", pronunciation: "غود", emoji: "🎉" },
            { word: "Понедельник", translation: "الإثنين", pronunciation: "پانيديلنيك", emoji: " M" },
            { word: "Вторник", translation: "الثلاثاء", pronunciation: "فتورنيك", emoji: "T" },
            { word: "Среда", translation: "الأربعاء", pronunciation: "سِریدا", emoji: "W" },
            { word: "Четверг", translation: "الخميس", pronunciation: "تشيتڤيرك", emoji: "T" },
            { word: "Пятница", translation: "الجمعة", pronunciation: "پياتنيتسا", emoji: "F" },
            { word: "Суббота", translation: "السبت", pronunciation: "سوبّوتا", emoji: "S" },
            { word: "Воскресенье", translation: "الأحد", pronunciation: "ڤاسكريسينيه", emoji: "S" },
            { word: "Сегодня", translation: "اليوم", pronunciation: "سيڤودنيا", emoji: "👇" },
            { word: "Завтра", translation: "غداً", pronunciation: "زاڤترا", emoji: "➡️" },
            { word: "Вчера", translation: "أمس", pronunciation: "ڤتشيرا", emoji: "⬅️" },
            { word: "Утро", translation: "صباح", pronunciation: "اوترا", emoji: "🌅" },
            { word: "День", translation: "نهار", pronunciation: "دين", emoji: "☀️" },
            { word: "Вечер", translation: "مساء", pronunciation: "ڤيتشر", emoji: "🌇" },
            { word: "Ночь", translation: "ليل", pronunciation: "نوتش", emoji: "🌃" },
        ],
        readingExercises: [
            readingExercise("Сегодня понедельник, а завтра вторник.", "ترجم 'Сегодня', 'понедельник', 'завтра', 'вторник'.", "اليوم هو الإثنين، وغداً هو الثلاثاء.", ["Вчера было воскресенье.", "У меня встреча в пятницу.", "В месяце четыре недели."]),
            readingExercise("Встреча в десять часов утра.", "ابحث عن الوقت والجزء من اليوم.", "الاجتماع في الساعة العاشرة صباحاً.", ["Увидимся вечером.", "Подожди минуту, пожалуйста.", "В году двенадцать месяцев."])
        ],
        listeningExercises: [
            listeningExercise("Пятница", "اليوم الذي يسبق عطلة نهاية الأسبوع.", ["Понедельник", "Воскресенье", "Неделя"]),
            listeningExercise("Завтра", "اليوم الذي يأتي بعد اليوم.", ["Сегодня", "Вчера", "День"])
        ]
    },
    weather: {
        words: [
            { word: "Погода", translation: "الطقس", pronunciation: "پاغودا", emoji: "🌦️" },
            { word: "Солнце", translation: "شمس", pronunciation: "سولنتسي", emoji: "☀️" },
            { word: "Солнечно", translation: "مشمس", pronunciation: "سولنيتشنا", emoji: "☀️" },
            { word: "Облако", translation: "غيمة", pronunciation: "أوبلاكا", emoji: "☁️" },
            { word: "Облачно", translation: "غائم", pronunciation: "أوبلاتشنا", emoji: "☁️" },
            { word: "Дождь", translation: "مطر", pronunciation: "دوجد", emoji: "🌧️" },
            { word: "Дождливо", translation: "ممطر", pronunciation: "داجدليڤا", emoji: "🌧️" },
            { word: "Ветер", translation: "رياح", pronunciation: "ڤيتر", emoji: "💨" },
            { word: "Ветрено", translation: "عاصف", pronunciation: "ڤيترينا", emoji: "💨" },
            { word: "Снег", translation: "ثلج", pronunciation: "سنييك", emoji: "❄️" },
            { word: "Снежно", translation: "مثلج", pronunciation: "سنيجنا", emoji: "❄️" },
            { word: "Жарко", translation: "حار", pronunciation: "جاركا", emoji: "🌡️" },
            { word: "Холодно", translation: "بارد", pronunciation: "خولادنا", emoji: "🥶" },
            { word: "Тепло", translation: "دافئ", pronunciation: "تيپلو", emoji: "😊" },
            { word: "Прохладно", translation: "معتدل البرودة", pronunciation: "پراخلادنا", emoji: "😎" },
            { word: "Гроза", translation: "عاصفة رعدية", pronunciation: "غرازا", emoji: "⛈️" },
            { word: "Туман", translation: "ضباب", pronunciation: "تومان", emoji: "🌫️" },
        ],
        readingExercises: [
            readingExercise("Сегодня солнечно и жарко.", "ابحث عن الكلمات التي تصف الشمس والحرارة.", "الجو مشمس وحار اليوم.", ["Облачно и холодно.", "Завтра будет дождь.", "Я люблю снежную погоду."]),
            readingExercise("Зимой холодно и идёт снег.", "ابحث عن كلمات الشتاء.", "في الشتاء، يكون الجو بارداً ويتساقط الثلج.", ["Ветер сегодня сильный.", "Возьми зонт, идёт дождь.", "Утром туман."])
        ],
        listeningExercises: [
            listeningExercise("Дождливо", "عندما يسقط الماء من السماء.", ["Солнечно", "Облачно", "Ветрено"]),
            listeningExercise("Холодно", "عكس كلمة 'حار'.", ["Жарко", "Тепло", "Прохладно"])
        ]
    },
    home: {
        words: [
            { word: "Дом", translation: "منزل/بيت", pronunciation: "دوم", emoji: "🏠" },
            { word: "Квартира", translation: "شقة", pronunciation: "كڤارتيرا", emoji: "🏢" },
            { word: "Комната", translation: "غرفة", pronunciation: "كومناتا", emoji: "🚪" },
            { word: "Спальня", translation: "غرفة نوم", pronunciation: "سپالنيا", emoji: "🛏️" },
            { word: "Ванная", translation: "حمام", pronunciation: "ڤانّايا", emoji: "🛁" },
            { word: "Кухня", translation: "مطبخ", pronunciation: "كوخنيا", emoji: "🍳" },
            { word: "Гостиная", translation: "غرفة معيشة", pronunciation: "غاستينايا", emoji: "🛋️" },
            { word: "Столовая", translation: "غرفة طعام", pronunciation: "ستالوڤايا", emoji: "🍽️" },
            { word: "Сад", translation: "حديقة", pronunciation: "ساد", emoji: "🌳" },
            { word: "Дверь", translation: "باب", pronunciation: "دڤير", emoji: "🚪" },
            { word: "Окно", translation: "نافذة", pronunciation: "آكنو", emoji: "🪟" },
            { word: "Пол", translation: "أرضية", pronunciation: "پول", emoji: "👣" },
            { word: "Крыша", translation: "سقف", pronunciation: "كريشا", emoji: "🧱" },
            { word: "Стена", translation: "جدار", pronunciation: "ستينا", emoji: "🧱" },
            { word: "Стол", translation: "طاولة", pronunciation: "ستول", emoji: "🪵" },
            { word: "Стул", translation: "كرسي", pronunciation: "ستول", emoji: "🪑" },
            { word: "Кровать", translation: "سرير", pronunciation: "كراڤات", emoji: "🛏️" },
            { word: "Диван", translation: "أريكة", pronunciation: "ديڤان", emoji: "🛋️" },
            { word: "Лампа", translation: "مصباح", pronunciation: "لامپا", emoji: "💡" },
            { word: "Ключ", translation: "مفتاح", pronunciation: "كليوتش", emoji: "🔑" },
        ],
        readingExercises: [
            readingExercise("На кухне есть стол и окно.", "ترجم 'кухня', 'стол', و 'окно'.", "المطبخ به طاولة ونافذة.", ["В спальне есть кровать и дверь.", "В гостиной есть стул.", "Ключ от дома в саду."]),
            readingExercise("Я сплю в спальне и смотрю телевизор в гостиной.", "ابحث عن أماكن النوم ومشاهدة التلفاز.", "أنا أنام في غرفة النوم وأشاهد التلفاز في غرفة المعيشة.", ["Мы едим в столовой.", "Ванная в конце коридора.", "Квартира на третьем этаже."])
        ],
        listeningExercises: [
            listeningExercise("Кухня", "المكان الذي نطبخ فيه الطعام.", ["Спальня", "Ванная", "Сад"]),
            listeningExercise("Дверь", "تستخدمه للدخول والخروج من غرفة.", ["Окно", "Стол", "Кровать"])
        ]
    },
    shopping: {
        words: [
            { word: "Магазин", translation: "متجر/محل", pronunciation: "ماغازين", emoji: "🏬" },
            { word: "Рынок", translation: "سوق", pronunciation: "ريناك", emoji: "🛒" },
            { word: "Супермаркет", translation: "سوبر ماركت", pronunciation: "سوپرماركت", emoji: "🏪" },
            { word: "Деньги", translation: "مال", pronunciation: "دينگي", emoji: "💰" },
            { word: "Цена", translation: "سعر", pronunciation: "تسينا", emoji: "💲" },
            { word: "Покупать", translation: "يشتري", pronunciation: "پاكوبات", emoji: "🛍️" },
            { word: "Продавать", translation: "يبيع", pronunciation: "پراداڤات", emoji: "🏷️" },
            { word: "Платить", translation: "يدفع", pronunciation: "پلاتيت", emoji: "💳" },
            { word: "Дорогой", translation: "غالي", pronunciation: "داراغوي", emoji: "💎" },
            { word: "Дешёвый", translation: "رخيص", pronunciation: "ديشوڤي", emoji: "🪙" },
            { word: "Счёт", translation: "فاتورة", pronunciation: "شيوت", emoji: "🧾" },
            { word: "Чек", translation: "إيصال", pronunciation: "تشيك", emoji: "🧾" },
            { word: "Наличные", translation: "نقد", pronunciation: "ناليتشنيي", emoji: "💵" },
            { word: "Кредитная карта", translation: "بطاقة ائتمان", pronunciation: "كريديتنايا كارتا", emoji: "💳" },
            { word: "Клиент", translation: "زبون", pronunciation: "كليينت", emoji: "🙋" },
        ],
        readingExercises: [
            readingExercise("Сколько это стоит? Цена очень дорогая.", "ابحث عن السؤال عن السعر ووصفه بأنه 'дорогая'.", "كم سعر هذا؟ السعر غالي جداً.", ["Я хочу купить это, пожалуйста.", "Могу я заплатить картой?", "Этот магазин очень дешёвый."]),
            readingExercise("Я заплачу кредитной картой, дайте, пожалуйста, чек.", "ابحث عن طريقة الدفع والوثيقة المطلوبة.", "سأدفع ببطاقة الائتمان، من فضلك أعطني الإيصال.", ["Вы принимаете наличные?", "Этот рынок очень большой.", "Клиент всегда прав."])
        ],
        listeningExercises: [
            listeningExercise("Деньги", "ما تستخدمه للشراء.", ["Цена", "Магазин", "Счёт"]),
            listeningExercise("Покупать", "فعل الحصول على شيء مقابل المال.", ["Продавать", "Платить", "Иметь"])
        ]
    },
    body: {
        words: [
            { word: "Тело", translation: "جسم", pronunciation: "تيلا", emoji: "🧍" },
            { word: "Голова", translation: "رأس", pronunciation: "غالافا", emoji: "👤" },
            { word: "Лицо", translation: "وجه", pronunciation: "ليتسو", emoji: "😊" },
            { word: "Глаз", translation: "عين", pronunciation: "غلاز", emoji: "👁️" },
            { word: "Нос", translation: "أنف", pronunciation: "نوس", emoji: "👃" },
            { word: "Рот", translation: "فم", pronunciation: "روت", emoji: "👄" },
            { word: "Ухо", translation: "أذن", pronunciation: "أوخا", emoji: "👂" },
            { word: "Волосы", translation: "شعر", pronunciation: "ڤولاسي", emoji: "👱" },
            { word: "Зуб", translation: "سن", pronunciation: "زوب", emoji: "🦷" },
            { word: "Шея", translation: "رقبة", pronunciation: "شييا", emoji: "🦒" },
            { word: "Плечо", translation: "كتف", pronunciation: "پليتشو", emoji: "🤷" },
            { word: "Рука", translation: "ذراع", pronunciation: "روكا", emoji: "💪" },
            { word: "Кисть", translation: "يد", pronunciation: "كيست", emoji: "✋" },
            { word: "Палец", translation: "إصبع", pronunciation: "پاليتس", emoji: "👆" },
            { word: "Нога", translation: "ساق", pronunciation: "ناغا", emoji: "🦵" },
            { word: "Стопа", translation: "قدم", pronunciation: "ستاپا", emoji: "🦶" },
            { word: "Сердце", translation: "قلب", pronunciation: "سيردتسي", emoji: "❤️" },
            { word: "Желудок", translation: "معدة", pronunciation: "جيلوداك", emoji: "🍔" },
        ],
        readingExercises: [
            readingExercise("У меня два глаза, один нос и один рот.", "عد أجزاء الوجه المذكورة.", "لدي عينان وأنف واحد وفم واحد.", ["Я мою руки водой с мылом.", "У меня болит голова.", "У него чёрные волосы и синие глаза."]),
            readingExercise("У меня болит желудок после еды.", "ابحث عن الجزء الذي يؤلم.", "معدتي تؤلمني بعد الأكل.", ["Моё сердце бьётся быстро.", "У меня пять пальцев на каждой руке.", "Моя рука сильная."])
        ],
        listeningExercises: [
            listeningExercise("Кисть", "الجزء من الجسم الذي به خمسة أصابع.", ["Стопа", "Голова", "Глаз"]),
            listeningExercise("Волосы", "ينمو على الرأس.", ["Лицо", "Нос", "Ухо"])
        ]
    },
    clothing: {
        words: [
            { word: "Одежда", translation: "ملابس", pronunciation: "آديجدا", emoji: "👕" },
            { word: "Рубашка", translation: "قميص", pronunciation: "روباشكا", emoji: "👕" },
            { word: "Футболка", translation: "تي شيرت", pronunciation: "فودبولكا", emoji: "👕" },
            { word: "Брюки", translation: "بنطال", pronunciation: "بريوكي", emoji: "👖" },
            { word: "Джинсы", translation: "جينز", pronunciation: "جينسي", emoji: "👖" },
            { word: "Шорты", translation: "شورت", pronunciation: "شورتي", emoji: "🩳" },
            { word: "Платье", translation: "فستان", pronunciation: "پلاتيه", emoji: "👗" },
            { word: "Юбка", translation: "تنورة", pronunciation: "يوبكا", emoji: "👗" },
            { word: "Куртка", translation: "سترة", pronunciation: "كورتكا", emoji: "🧥" },
            { word: "Пальто", translation: "معطف", pronunciation: "پالتو", emoji: "🧥" },
            { word: "Свитер", translation: "سترة صوفية", pronunciation: "سڤيتر", emoji: "🧶" },
            { word: "Обувь", translation: "حذاء", pronunciation: "أوبوڤ", emoji: "👟" },
            { word: "Ботинки", translation: "حذاء طويل", pronunciation: "باتينكي", emoji: "👢" },
            { word: "Носки", translation: "جوارب", pronunciation: "ناسكي", emoji: "🧦" },
            { word: "Шапка", translation: "قبعة", pronunciation: "شاپكا", emoji: "🧢" },
            { word: "Шарф", translation: "وشاح", pronunciation: "شارف", emoji: "🧣" },
            { word: "Перчатки", translation: "قفازات", pronunciation: "پيرتشاتكي", emoji: "🧤" },
        ],
        readingExercises: [
            readingExercise("Я ношу синюю рубашку и чёрные брюки.", "ابحث عن 'рубашку' و 'брюки' وألوانها.", "أنا أرتدي قميصاً أزرق وبنطالاً أسود.", ["Мои новые туфли белые.", "Мне нужно купить куртку на зиму.", "Эта шапка очень красивая."]),
            readingExercise("Зимой я ношу пальто, шарф и перчатки.", "ابحث عن ملابس الشتاء.", "في الشتاء، أرتدي معطفًا ووشاحًا وقفازات.", ["Она носит красивое красное платье.", "Ты видел мои носки?", "Эта футболка слишком большая."])
        ],
        listeningExercises: [
            listeningExercise("Обувь", "ما ترتديه في قدميك.", ["Рубашка", "Шапка", "Носки"]),
            listeningExercise("Куртка", "ترتديه فوق قميصك عندما يكون الجو باردًا.", ["Брюки", "Платье", "Носки"])
        ]
    },
    verbs: {
        words: [
            { word: "быть", translation: "يكون", pronunciation: "بيت", emoji: "🧘" },
            { word: "иметь", translation: "يملك", pronunciation: "إيميت", emoji: "🤲" },
            { word: "делать", translation: "يفعل/يصنع", pronunciation: "ديلات", emoji: "💪" },
            { word: "говорить", translation: "يقول/يتحدث", pronunciation: "گاڤاريت", emoji: "🗣️" },
            { word: "идти", translation: "يذهب/يمشي", pronunciation: "إيدتي", emoji: "🚶" },
            { word: "мочь", translation: "يستطيع", pronunciation: "موتش", emoji: "🏋️" },
            { word: "хотеть", translation: "يريد", pronunciation: "خاتيت", emoji: "🙋" },
            { word: "знать", translation: "يعرف", pronunciation: "زنات", emoji: "🧠" },
            { word: "видеть", translation: "يرى", pronunciation: "ڤيديت", emoji: "👀" },
            { word: "приходить", translation: "يأتي", pronunciation: "پريخاديت", emoji: "👋" },
            { word: "должен", translation: "يجب", pronunciation: "دولجين", emoji: "📋" },
            { word: "верить", translation: "يصدق", pronunciation: "ڤيريت", emoji: "🙏" },
            { word: "находить", translation: "يجد", pronunciation: "ناخاديت", emoji: "🔍" },
            { word: "давать", translation: "يعطي", pronunciation: "داڤات", emoji: "🎁" },
            { word: "брать", translation: "يأخذ", pronunciation: "برات", emoji: "✋" },
            { word: "любить", translation: "يحب", pronunciation: "ليوبيت", emoji: "❤️" },
            { word: "думать", translation: "يفكر", pronunciation: "دومات", emoji: "🤔" },
            { word: "есть", translation: "يأكل", pronunciation: "ييست", emoji: "🍔" },
            { word: "пить", translation: "يشرب", pronunciation: "پيت", emoji: "🥤" },
        ],
        readingExercises: [
            readingExercise("Я должен идти на работу, но хочу остаться дома.", "ابحث عن الأفعال المتناقضة.", "يجب أن أذهب إلى العمل، لكني أريد أن أبقى في المنزل.", ["Он может всё видеть и слышать.", "Ты можешь помочь мне это нести?", "Она пытается выучить новый язык."]),
            readingExercise("Он умеет читать и писать на трёх языках.", "ابحث عن المهارات اللغوية.", "هو يستطيع القراءة والكتابة بثلاث لغات.", ["Не говори и не ешь одновременно.", "Я вернусь через час.", "Они всегда играют и выигрывают."])
        ],
        listeningExercises: [
            listeningExercise("думать", "استخدام العقل للتفكير في شيء ما.", ["есть", "спать", "говорить"]),
            listeningExercise("любить", "الشعور بالحب أو المودة القوية.", ["ненавидеть", "иметь", "быть"])
        ]
    },
    adjectives: {
        words: [
            { word: "хороший", translation: "جيد", pronunciation: "خاروشي", emoji: "👍" },
            { word: "плохой", translation: "سيء", pronunciation: "پلاخوي", emoji: "👎" },
            { word: "новый", translation: "جديد", pronunciation: "نوڤي", emoji: "✨" },
            { word: "старый", translation: "قديم/عجوز", pronunciation: "ستاري", emoji: "📜" },
            { word: "большой", translation: "كبير", pronunciation: "بالشوي", emoji: "🐘" },
            { word: "маленький", translation: "صغير", pronunciation: "مالينكي", emoji: "🐭" },
            { word: "длинный", translation: "طويل", pronunciation: "دلينّي", emoji: "📏" },
            { word: "короткий", translation: "قصير", pronunciation: "كاروتكي", emoji: "📏" },
            { word: "высокий", translation: "عالي/طويل", pronunciation: "ڤيسوكي", emoji: "📈" },
            { word: "низкий", translation: "منخفض/قصير", pronunciation: "نيزكي", emoji: "📉" },
            { word: "горячий", translation: "حار", pronunciation: "غارياتشي", emoji: "🔥" },
            { word: "холодный", translation: "بارد", pronunciation: "خالودني", emoji: "❄️" },
            { word: "счастливый", translation: "سعيد", pronunciation: "شاسليڤي", emoji: "😄" },
            { word: "грустный", translation: "حزين", pronunciation: "غروستني", emoji: "😢" },
            { word: "лёгкий", translation: "سهل", pronunciation: "ليوخكي", emoji: "✅" },
            { word: "трудный", translation: "صعب", pronunciation: "ترودني", emoji: "❌" },
            { word: "красивый", translation: "جميل", pronunciation: "كراسيڤي", emoji: "😍" },
            { word: "уродливый", translation: "قبيح", pronunciation: "اورودليڤي", emoji: "🤢" },
            { word: "быстрый", translation: "سريع", pronunciation: "بيستري", emoji: "🏃" },
            { word: "медленный", translation: "بطيء", pronunciation: "ميدليني", emoji: "🐢" },
        ],
        readingExercises: [
            readingExercise("Новая машина быстрая, а старая машина медленная.", "ابحث عن الصفات المتضادة.", "السيارة الجديدة سريعة، لكن السيارة القديمة بطيئة.", ["Эта книга хорошая, а та плохая.", "Вопрос лёгкий или трудный?", "Сегодня очень жарко."]),
            readingExercise("У неё красивый голос и доброе сердце.", "ابحث عن الصفات الإيجابية.", "لديها صوت جميل وقلب طيب.", ["Сильный человек помогает слабому.", "Комната теперь чистая.", "История длинная, но не важная."])
        ],
        listeningExercises: [
            listeningExercise("важный", "صفة لشيء ذي قيمة أو أهمية كبيرة.", ["лёгкий", "другой", "неправильный"]),
            listeningExercise("счастливый", "الشعور بالفرح أو الرضا.", ["грустный", "сердитый", "усталый"])
        ]
    },
    places: {
        words: [
            { word: "место", translation: "مكان", pronunciation: "ميستا", emoji: "📍" },
            { word: "город", translation: "مدينة", pronunciation: "غوراد", emoji: "🏙️" },
            { word: "страна", translation: "دولة", pronunciation: "سترانا", emoji: "🇷🇺" },
            { word: "мир", translation: "عالم", pronunciation: "مير", emoji: "🌍" },
            { word: "школа", translation: "مدرسة", pronunciation: "شكولا", emoji: "🏫" },
            { word: "университет", translation: "جامعة", pronunciation: "اونيڤيرسيتيت", emoji: "🎓" },
            { word: "больница", translation: "مستشفى", pronunciation: "بالنيتسا", emoji: "🏥" },
            { word: "ресторан", translation: "مطعم", pronunciation: "ريستاران", emoji: "🍔" },
            { word: "отель", translation: "فندق", pronunciation: "أتيل", emoji: "🏨" },
            { word: "аэропорт", translation: "مطار", pronunciation: "آيروپورت", emoji: "✈️" },
            { word: "вокзал", translation: "محطة", pronunciation: "ڤاكزا", emoji: "🚉" },
            { word: "парк", translation: "حديقة عامة", pronunciation: "بارك", emoji: "🌳" },
            { word: "пляж", translation: "شاطئ", pronunciation: "پلياج", emoji: "🏖️" },
            { word: "библиотека", translation: "مكتبة", pronunciation: "بيبليوتيكا", emoji: "📚" },
            { word: "банк", translation: "بنك", pronunciation: "بانك", emoji: "🏦" },
            { word: "офис", translation: "مكتب", pronunciation: "أوفيس", emoji: "🏢" },
            { word: "улица", translation: "شارع", pronunciation: "اوليتسا", emoji: "🛣️" },
            { word: "дорога", translation: "طريق", pronunciation: "داروغا", emoji: "🛤️" },
            { word: "ферма", translation: "مزرعة", pronunciation: "فيرما", emoji: "🚜" },
            { word: "лес", translation: "غابة", pronunciation: "ليس", emoji: "🌲" },
            { word: "гора", translation: "جبل", pronunciation: "غارا", emoji: "⛰️" },
            { word: "река", translation: "نهر", pronunciation: "ريكا", emoji: "🏞️" },
            { word: "море", translation: "بحر", pronunciation: "موريه", emoji: "🌊" },
            { word: "здание", translation: "مبنى", pronunciation: "زدانييه", emoji: "🏢" },
            { word: "церковь", translation: "كنيسة", pronunciation: "تسيركوڤ", emoji: "⛪" },
            { word: "мечеть", translation: "مسجد", pronunciation: "ميتشيت", emoji: "🕌" },
        ],
        readingExercises: [
            readingExercise("Я еду в школу на автобусе, а потом иду в библиотеку.", "ابحث عن أماكن التعلم.", "أذهب إلى المدرسة بالحافلة، ثم أذهب إلى المكتبة.", ["Больница рядом с банком.", "В этом городе есть хороший ресторан?", "Мы живём в квартире в большом здании."]),
            readingExercise("Летом мы любим ходить на пляж или в парк.", "ابحث عن أماكن الترفيه الصيفية.", "في الصيف، نحب أن نذهب إلى الشاطئ أو الحديقة.", ["Аэропорт далеко от центра города.", "На следующей улице есть новый рынок.", "Отель расположен на реке."])
        ],
        listeningExercises: [
            listeningExercise("больница", "المكان الذي تذهب إليه عندما تكون مريضاً.", ["школа", "отель", "банк"]),
            listeningExercise("город", "مكان كبير به الكثير من الناس والمباني.", ["деревня", "ферма", "страна"])
        ]
    },
    nature: {
        words: [
            { word: "природа", translation: "طبيعة", pronunciation: "پريرودا", emoji: "🏞️" },
            { word: "дерево", translation: "شجرة", pronunciation: "ديريڤا", emoji: "🌳" },
            { word: "цветок", translation: "زهرة", pronunciation: "تسڤيتوك", emoji: "🌸" },
            { word: "растение", translation: "نبات", pronunciation: "راستينيه", emoji: "🌱" },
            { word: "трава", translation: "عشب", pronunciation: "تراڤا", emoji: "🌿" },
            { word: "луна", translation: "قمر", pronunciation: "لونا", emoji: "🌙" },
            { word: "звезда", translation: "نجمة", pronunciation: "زڤيزدا", emoji: "⭐" },
            { word: "небо", translation: "سماء", pronunciation: "نيبا", emoji: "☁️" },
            { word: "огонь", translation: "نار", pronunciation: "أگون", emoji: "🔥" },
            { word: "земля", translation: "أرض", pronunciation: "زيمليا", emoji: "🌍" },
            { word: "воздух", translation: "هواء", pronunciation: "ڤوزدوخ", emoji: "💨" },
            { word: "лёд", translation: "جليد", pronunciation: "ليود", emoji: "🧊" },
            { word: "океан", translation: "محيط", pronunciation: "أكيان", emoji: "🌊" },
            { word: "озеро", translation: "بحيرة", pronunciation: "أوزيرا", emoji: "🏞️" },
            { word: "холм", translation: "تل", pronunciation: "خولم", emoji: "🌄" },
            { word: "остров", translation: "جزيرة", pronunciation: "أوستروڤ", emoji: "🏝️" },
            { word: "пустыня", translation: "صحراء", pronunciation: "پوستينيا", emoji: "🏜️" },
            { word: "животное", translation: "حيوان", pronunciation: "جيڤوتنايه", emoji: "🐾" },
            { word: "собака", translation: "كلب", pronunciation: "ساباكا", emoji: "🐕" },
            { word: "кошка", translation: "قطة", pronunciation: "كوشكا", emoji: "🐈" },
            { word: "птица", translation: "طائر", pronunciation: "پتيتسا", emoji: "🐦" },
            { word: "скала", translation: "صخرة", pronunciation: "سكالا", emoji: "🪨" },
            { word: "песок", translation: "رمل", pronunciation: "پيسوك", emoji: "🏖️" },
        ],
        readingExercises: [
            readingExercise("Солнце в небе, а рыба в море.", "ابحث عن مكونات السماء والبحر.", "الشمس في السماء، والسمكة في البحر.", ["Гора высокая, а река длинная.", "Деревья в лесу зелёные.", "Мне нравится звук дождя и ветра."]),
            readingExercise("Маленькая птичка сидит на большом дереве.", "ابحث عن الكائن الصغير والكبير.", "طائر صغير يجلس على شجرة كبيرة.", ["Кошка играет с мячом.", "Цветы весной красивые.", "Пустыня жаркая и сухая."])
        ],
        listeningExercises: [
            listeningExercise("дерево", "نبات كبير له جذع وأغصان.", ["цветок", "трава", "гора"]),
            listeningExercise("вода", "سائل شفاف ضروري للحياة.", ["огонь", "воздух", "песок"])
        ]
    },
    hobbies: {
        words: [
            { word: "хобби", translation: "هواية", pronunciation: "خوبّي", emoji: "🎨" },
            { word: "чтение", translation: "قراءة", pronunciation: "چتينيه", emoji: "📖" },
            { word: "письмо", translation: "كتابة", pronunciation: "پيسمو", emoji: "✍️" },
            { word: "музыка", translation: "موسيقى", pronunciation: "موزيكا", emoji: "🎵" },
            { word: "искусство", translation: "فن", pronunciation: "إيسكوستڤا", emoji: "🖼️" },
            { word: "рисование", translation: "رسم", pronunciation: "ريساڤانيه", emoji: "✏️" },
            { word: "живопись", translation: "تلوين", pronunciation: "جيڤوپيس", emoji: "🎨" },
            { word: "спорт", translation: "رياضة", pronunciation: " سپورت", emoji: "⚽" },
            { word: "плавание", translation: "سباحة", pronunciation: "پلاڤانيه", emoji: "🏊" },
            { word: "бег", translation: "جري", pronunciation: "بيك", emoji: "🏃" },
            { word: "готовить", translation: "طبخ", pronunciation: "گاتوفيت", emoji: "🍳" },
            { word: "смотреть фильмы", translation: "مشاهدة أفلام", pronunciation: "سماتريت فيلمي", emoji: "🎬" },
            { word: "играть в игры", translation: "لعب ألعاب", pronunciation: "إيگرات ڤ'يگري", emoji: "🎮" },
            { word: "путешествовать", translation: "سفر", pronunciation: "پوتيشيستڤوڤات", emoji: "✈️" },
            { word: "танцевать", translation: "رقص", pronunciation: "تانتسيڤات", emoji: "💃" },
            { word: "петь", translation: "غناء", pronunciation: "پيت", emoji: "🎤" },
            { word: "фотография", translation: "تصوير فوتوغرافي", pronunciation: "فاتاگرافيا", emoji: "📸" },
            { word: "садоводство", translation: "بستنة", pronunciation: "ساداڤودستڤا", emoji: "🪴" },
        ],
        readingExercises: [
            readingExercise("Моё хобби - чтение книг и прослушивание музыки.", "ابحث عن الهوايات المذكورة.", "هوايتي هي قراءة الكتب والاستماع إلى الموسيقى.", ["Он любит заниматься спортом и плавать.", "Она хорошо готовит и рисует.", "Ты любишь путешествовать и играть в игры?"]),
            readingExercise("Смотреть фильмы весело, но я предпочитаю бегать на улице.", "ابحث عن الهواية الداخلية والخارجية.", "مشاهدة الأفلام ممتعة، لكني أفضل الجري في الخارج.", ["Пение и танцы требуют таланта.", "Письмо - это творческое хобби.", "Фотография запечатлевает прекрасные моменты."])
        ],
        listeningExercises: [
            listeningExercise("музыка", "فن تنظيم الأصوات في الوقت المناسب.", ["искусство", "спорт", "чтение"]),
            listeningExercise("готовить", "تحضير الطعام عن طريق تسخينه.", ["плавание", "письмо", "путешествовать"])
        ]
    },
    emotions: {
        words: [
            { word: "чувство", translation: "شعور", pronunciation: "چوستڤا", emoji: "❤️" },
            { word: "счастливый", translation: "سعيد", pronunciation: "شاسليڤي", emoji: "😄" },
            { word: "грустный", translation: "حزين", pronunciation: "گروستني", emoji: "😢" },
            { word: "сердитый", translation: "غاضب", pronunciation: "سيرديتي", emoji: "😠" },
            { word: "удивлённый", translation: "متفاجئ", pronunciation: "اوديڤليوني", emoji: "😲" },
            { word: "испуганный", translation: "خائف", pronunciation: "إيسپوگاني", emoji: "😨" },
            { word: "усталый", translation: "متعب", pronunciation: "اوستالي", emoji: "😴" },
            { word: "скучающий", translation: "ملل", pronunciation: "سكوتشايوشي", emoji: "😒" },
            { word: "взволнованный", translation: "متحمس", pronunciation: "ڤزڤالنوڤاني", emoji: "🤩" },
            { word: "любовь", translation: "حب", pronunciation: "ليوبوڤ", emoji: "❤️" },
            { word: "ненависть", translation: "كره", pronunciation: "نيناڤيست", emoji: "💔" },
            { word: "надежда", translation: "أمل", pronunciation: "ناديجدا", emoji: "🙏" },
            { word: "страх", translation: "خوف", pronunciation: "ستراخ", emoji: "😨" },
            { word: "радость", translation: "فرح", pronunciation: "راداست", emoji: "😊" },
            { word: "гордый", translation: "فخور", pronunciation: "گوردي", emoji: "ภูมิใจ" },
            { word: "застенчивый", translation: "خجول", pronunciation: "زاستينچيڤي", emoji: "😊" },
            { word: "спокойный", translation: "هادئ", pronunciation: "سپاكويني", emoji: "😌" },
            { word: "обеспокоенный", translation: "قلق", pronunciation: "أبيسباكويني", emoji: "😟" },
        ],
        readingExercises: [
            readingExercise("Я чувствую себя счастливым, когда вижу друзей, но мне грустно уходить.", "ابحث عن المشاعر المتضادة.", "أشعر بالسعادة عندما أرى أصدقائي، لكني حزين للمغادرة.", ["Он сердится, потому что они опаздывают.", "Не бойся, всё будет хорошо.", "Я очень взволнован поездкой."]),
            readingExercise("Она была удивлена подарку и почувствовала большую радость.", "ابحث عن المشاعر الإيجابية.", "لقد تفاجأت بالهدية وشعرت بفرح كبير.", ["Ребёнок устал и хочет спать.", "Я горжусь твоим успехом.", "Не волнуйся, будь спокоен."])
        ],
        listeningExercises: [
            listeningExercise("сердитый", "الشعور أو إظهار الاستياء الشديد.", ["счастливый", "грустный", "усталый"]),
            listeningExercise("любовь", "شعور عميق بالمودة والمحبة.", ["ненависть", "страх", "надежда"])
        ]
    },
    work: {
        words: [
            { word: "Работа", translation: "عمل", pronunciation: "رابوتا", emoji: "🏢" },
            { word: "Должность", translation: "وظيفة", pronunciation: "دولجناست", emoji: "💼" },
            { word: "Офис", translation: "مكتب", pronunciation: "أوفيس", emoji: "🏢" },
            { word: "Компания", translation: "شركة", pronunciation: "كامپانيا", emoji: "🏭" },
            { word: "Менеджер", translation: "مدير", pronunciation: "مينيدجر", emoji: "👨‍💼" },
            { word: "Сотрудник", translation: "موظف", pronunciation: "ساترودنيك", emoji: "🧑‍💼" },
            { word: "Коллега", translation: "زميل", pronunciation: "كالّيگا", emoji: "👥" },
            { word: "Зарплата", translation: "راتب", pronunciation: "زارپلاتا", emoji: "💵" },
            { word: "Собрание", translation: "اجتماع", pronunciation: "سابرانييه", emoji: "🤝" },
            { word: "Электронная почта", translation: "بريد إلكتروني", pronunciation: "إليكترونايا پوچتا", emoji: "📧" },
            { word: "Компьютер", translation: "حاسوب", pronunciation: "كامپيوتير", emoji: "💻" },
            { word: "Телефон", translation: "هاتف", pronunciation: "تيليفون", emoji: "📱" },
            { word: "Проект", translation: "مشروع", pronunciation: "پرايكت", emoji: "📈" },
            { word: "Срок", translation: "موعد نهائي", pronunciation: "سروك", emoji: "⏳" },
            { word: "Задача", translation: "مهمة", pronunciation: "زاداچا", emoji: "📋" },
            { word: "Карьера", translation: "مهنة", pronunciation: "كارييرا", emoji: "🚀" },
        ],
        readingExercises: [
            readingExercise("У менеджера собрание в офисе.", "ابحث عن كلمات 'менеджер', 'собрание', 'офис'.", "المدير لديه اجتماع في المكتب.", ["Сотрудник работает на компьютере.", "Зарплата на этой работе хорошая.", "Я отправил тебе электронное письмо."]),
            readingExercise("Мой коллега помог мне закончить проект до срока.", "ابحث عن كلمات العمل الجماعي والوقت.", "زميلي ساعدني في إنهاء المشروع قبل الموعد النهائي.", ["Я использую телефон для проверки почты.", "Эта задача очень трудная.", "Желаю тебе успешной карьеры."])
        ],
        listeningExercises: [
            listeningExercise("Офис", "مكان العمل المكتبي.", ["Отель", "Школа", "Аэропорт"]),
            listeningExercise("Компьютер", "Электронное устройство для обработки данных.", ["Телефон", "Книга", "Ручка"])
        ]
    },
    travel: {
        words: [
            { word: "Путешествие", translation: "سفر", pronunciation: "پوتيشيستڤييه", emoji: "🌍" },
            { word: "Поездка", translation: "رحلة", pronunciation: "پاييزدكا", emoji: "✈️" },
            { word: "Отпуск", translation: "عطلة", pronunciation: "أوتپوسك", emoji: "🏖️" },
            { word: "Аэропорт", translation: "مطار", pronunciation: "آيروپورت", emoji: "✈️" },
            { word: "Самолёт", translation: "طائرة", pronunciation: "ساماليوت", emoji: "✈️" },
            { word: "Паспорт", translation: "جواز سفر", pronunciation: "پاسپارت", emoji: "🛂" },
            { word: "Билет", translation: "تذكرة", pronunciation: "بيليت", emoji: "🎟️" },
            { word: "Отель", translation: "فندق", pronunciation: "أتيل", emoji: "🏨" },
            { word: "Поезд", translation: "قطار", pronunciation: "پويزد", emoji: "🚆" },
            { word: "Машина", translation: "سيارة", pronunciation: "ماشينا", emoji: "🚗" },
            { word: "Автобус", translation: "حافلة", pronunciation: "آفتوبوس", emoji: "🚌" },
            { word: "Такси", translation: "سيارة أجرة", pronunciation: "تاكسي", emoji: "🚕" },
            { word: "Карта", translation: "خريطة", pronunciation: "كارتا", emoji: "🗺️" },
            { word: "Чемодан", translation: "حقيبة سفر", pronunciation: "چيمادان", emoji: "🧳" },
            { word: "Багаж", translation: "أمتعة", pronunciation: "باگاج", emoji: "🧳" },
            { word: "Турист", translation: "سائح", pronunciation: "توريست", emoji: "📸" },
            { word: "Пункт назначения", translation: "وجهة", pronunciation: "پونكت نازناتشينيا", emoji: "📍" },
        ],
        readingExercises: [
            readingExercise("Мне нужен паспорт и билет на самолёт.", "ترجم الكلمات 'паспорт', 'билет', و 'самолёт'.", "أحتاج جواز سفر وتذكرة للطائرة.", ["Отель находится рядом с вокзалом.", "Это твоя новая машина?", "Не забудь карту и чемодан."]),
            readingExercise("Наш пункт назначения - красивый остров для отпуска.", "ابحث عن مكان ونوع الرحلة.", "وجهتنا هي جزيرة جميلة لقضاء العطلة.", ["Турист делает много фотографий.", "Мой багаж очень тяжёлый.", "Я возьму такси в аэропорт."])
        ],
        listeningExercises: [
            listeningExercise("Паспорт", "Официальный документ для международных поездок.", ["Билет", "Чемодан", "Отель"]),
            listeningExercise("Машина", "Частное транспортное средство с четырьмя колёсами.", ["Автобус", "Поезд", "Самолёт"])
        ]
    },
    animals: {
        words: [
            { word: "Животное", translation: "حيوان", pronunciation: "جيڤوتنايه", emoji: "🐾" },
            { word: "Собака", translation: "كلب", pronunciation: "ساباكا", emoji: "🐕" },
            { word: "Кошка", translation: "قطة", pronunciation: "كوشكا", emoji: "🐈" },
            { word: "Лев", translation: "أسد", pronunciation: "ليڤ", emoji: "🦁" },
            { word: "Тигр", translation: "نمر", pronunciation: "تيگر", emoji: "🐅" },
            { word: "Слон", translation: "فيل", pronunciation: "سلون", emoji: "🐘" },
            { word: "Обезьяна", translation: "قرد", pronunciation: "أبيزيانا", emoji: "🐒" },
            { word: "Лошадь", translation: "حصان", pronunciation: "لوشاد", emoji: "🐎" },
            { word: "Птица", translation: "طائر", pronunciation: "پتيتسا", emoji: "🐦" },
            { word: "Рыба", translation: "سمكة", pronunciation: "ريبا", emoji: "🐟" },
        ],
        readingExercises: [
            readingExercise("Лев - царь зверей.", "وصف حيوان", "الأسد هو ملك الوحوش.", ["Кошка пьёт молоко.", "Я люблю собак.", "Слон очень большой."]),
        ],
        listeningExercises: [
            listeningExercise("Слон", "Большое животное с хоботом.", ["Собака", "Кошка", "Обезьяна"]),
        ]
    },
    transportation: {
        words: [
            { word: "Транспорт", translation: "مواصلات", pronunciation: "ترانسبورت", emoji: "🚦" },
            { word: "Машина", translation: "سيارة", pronunciation: "ماشينا", emoji: "🚗" },
            { word: "Автобус", translation: "حافلة", pronunciation: "آفتوبوس", emoji: "🚌" },
            { word: "Поезд", translation: "قطار", pronunciation: "پويزد", emoji: "🚆" },
            { word: "Самолёт", translation: "طائرة", pronunciation: "ساماليوت", emoji: "✈️" },
            { word: "Велосипед", translation: "دراجة هوائية", pronunciation: "ڤيلوسيپيد", emoji: "🚲" },
            { word: "Мотоцикл", translation: "دراجة نارية", pronunciation: "موتوتسيكل", emoji: "🏍️" },
            { word: "Корабль", translation: "سفينة", pronunciation: "كارابل", emoji: "🚢" },
            { word: "Такси", translation: "سيارة أجرة", pronunciation: "تاكسي", emoji: "🚕" },
            { word: "Метро", translation: "مترو الأنفاق", pronunciation: "ميترو", emoji: "🚇" },
        ],
        readingExercises: [
            readingExercise("Я еду на работу на автобусе.", "وسيلة النقل", "أذهب إلى العمل بالحافلة.", ["Поезд очень быстрый.", "Ты умеешь водить машину?", "Путешествовать на самолёте удобно."]),
        ],
        listeningExercises: [
            listeningExercise("Поезд", "Транспорт, который едет по рельсам.", ["Машина", "Автобус", "Самолёт"]),
        ]
    },
    education: {
        words: [
            { word: "Образование", translation: "تعليم", pronunciation: "أبرازاڤانييه", emoji: "🎓" },
            { word: "Школа", translation: "مدرسة", pronunciation: "شكولا", emoji: "🏫" },
            { word: "Университет", translation: "جامعة", pronunciation: "اونيڤيرسيتيت", emoji: "🎓" },
            { word: "Учитель", translation: "معلم", pronunciation: "أوتشيتل", emoji: "👨‍🏫" },
            { word: "Студент", translation: "طالب", pronunciation: "ستودينت", emoji: "🧑‍🎓" },
            { word: "Книга", translation: "كتاب", pronunciation: "كنيگا", emoji: "📚" },
            { word: "Ручка", translation: "قلم", pronunciation: "روچكا", emoji: "🖊️" },
            { word: "Экзамен", translation: "امتحان", pronunciation: "إكزامين", emoji: "📝" },
            { word: "Домашнее задание", translation: "واجب منزلي", pronunciation: "داماشنييه زادانييه", emoji: "📓" },
            { word: "Класс", translation: "فصل دراسي", pronunciation: "كلاس", emoji: "🧑‍🏫" },
        ],
        readingExercises: [
            readingExercise("Учитель в классе.", "وصف مشهد دراسي", "المعلم في الفصل الدراسي.", ["У меня завтра трудный экзамен.", "Я должен сделать домашнее задание.", "Студенты читают книги."]),
        ],
        listeningExercises: [
            listeningExercise("Книга", "То, что вы читаете.", ["Ручка", "Экзамен", "Школа"]),
        ]
    },
    health: {
        words: [
            { word: "Здоровье", translation: "صحة", pronunciation: "زداروڤيه", emoji: "💪" },
            { word: "Врач", translation: "طبيب", pronunciation: "ڤراتش", emoji: "🧑‍⚕️" },
            { word: "Медсестра", translation: "ممرضة", pronunciation: "ميدسيسترا", emoji: "👩‍⚕️" },
            { word: "Больница", translation: "مستشفى", pronunciation: "بالنيتسا", emoji: "🏥" },
            { word: "Лекарство", translation: "دواء", pronunciation: "ليكارستڤا", emoji: "💊" },
            { word: "Больной", translation: "مريض", pronunciation: "بالنوي", emoji: "🤒" },
            { word: "Здоровый", translation: "صحي", pronunciation: "زداروڤي", emoji: "💪" },
            { word: "Головная боль", translation: "صداع", pronunciation: "گولوڤنايا بول", emoji: "🤕" },
            { word: "Боль в животе", translation: "ألم في المعدة", pronunciation: "بول ڤ'جيڤوتيه", emoji: "🤢" },
            { word: "Температура", translation: "حمى", pronunciation: "تيمپيراتورا", emoji: "🌡️" },
        ],
        readingExercises: [
            readingExercise("Я болен, мне нужно к врачу.", "وصف حالة صحية", "أنا مريض، أحتاج لرؤية طبيب.", ["Примите это лекарство.", "Больница большая и чистая.", "У меня температура и головная боль."]),
        ],
        listeningExercises: [
            listeningExercise("Врач", "Человек, к которому вы идёте, когда болеете.", ["Медсестра", "Учитель", "Студент"]),
        ]
    },
    technology: {
        words: [
            { word: "Технология", translation: "تقنية", pronunciation: "تكنولوجييا", emoji: "💡" },
            { word: "Компьютер", translation: "حاسوب", pronunciation: "كومپيوتير", emoji: "💻" },
            { word: "Телефон", translation: "هاتف", pronunciation: "تيليفون", emoji: "📱" },
            { word: "Интернет", translation: "إنترنت", pronunciation: "إنترنت", emoji: "🌐" },
            { word: "Электронная почта", translation: "بريد إلكتروني", pronunciation: "إلكترونايا پوچتا", emoji: "📧" },
            { word: "Веб-сайт", translation: "موقع إلكتروني", pronunciation: "ويب-سايت", emoji: "🕸️" },
            { word: "Пароль", translation: "كلمة المرور", pronunciation: "پارول", emoji: "🔒" },
            { word: "Клавиатура", translation: "لوحة مفاتيح", pronunciation: "كلاڤياتورا", emoji: "⌨️" },
            { word: "Мышь", translation: "فأرة", pronunciation: "ميش", emoji: "🖱️" },
            { word: "Программное обеспечение", translation: "برنامج", pronunciation: "پروگرامنوييه أبيسبيتشينييه", emoji: "💿" },
        ],
        readingExercises: [
            readingExercise("Я каждый день пользуюсь интернетом на компьютере.", "استخدام التكنولوجيا", "أستخدم الإنترنت كل يوم على حاسوبي.", ["Я забыл свой пароль.", "Отправь мне электронное письмо.", "Этот веб-сайт очень полезный."]),
        ],
        listeningExercises: [
            listeningExercise("Интернет", "Всемирная сеть, соединяющая компьютеры.", ["Компьютер", "Телефон", "Электронная почта"]),
        ]
    },
    restaurant: {
        words: [
            { word: "Ресторан", translation: "مطعم", pronunciation: "ريستوران", emoji: "🍴" },
            { word: "Меню", translation: "قائمة طعام", pronunciation: "مينيو", emoji: "📜" },
            { word: "Официант", translation: "نادل", pronunciation: "أفيتسيانت", emoji: "🤵" },
            { word: "Счёт", translation: "فاتورة", pronunciation: "شيوت", emoji: "🧾" },
            { word: "Заказывать", translation: "يطلب", pronunciation: "زاكازيڤات", emoji: "✍️" },
            { word: "Вкусный", translation: "لذيذ", pronunciation: "ڤكوسني", emoji: "😋" },
            { word: "Вилка", translation: "شوكة", pronunciation: "ڤيلكا", emoji: "🍴" },
            { word: "Ложка", translation: "ملعقة", pronunciation: "لوشكا", emoji: "🥄" },
            { word: "Нож", translation: "سكين", pronunciation: "نوج", emoji: "🔪" },
            { word: "Тарелка", translation: "طبق", pronunciation: "تاريلكا", emoji: "🍽️" },
        ],
        readingExercises: [
            readingExercise("Официант, можно меню, пожалуйста?", "في المطعم", "يا نادل، هل يمكنني الحصول على القائمة من فضلك؟", ["Еда вкусная.", "Я хочу заказать сейчас.", "Счёт, пожалуйста."]),
        ],
        listeningExercises: [
            listeningExercise("Меню", "Список блюд в ресторане.", ["Счёт", "Официант", "Вилка"]),
        ]
    },
    daily_routines: {
        words: [
            { word: "Просыпаться", translation: "يستيقظ", pronunciation: "پروسيپاتسيا", emoji: "⏰" },
            { word: "Завтракать", translation: "يأكل الفطور", pronunciation: "زاڤتراكات", emoji: "🍳" },
            { word: "Идти на работу", translation: "يذهب للعمل", pronunciation: "إيدتي نا رابوتو", emoji: "💼" },
            { word: "Учиться", translation: "يدرس", pronunciation: "أوتشيتسيا", emoji: "📚" },
            { word: "Обедать", translation: "يأكل الغداء", pronunciation: "أبيدات", emoji: "🍱" },
            { word: "Приходить домой", translation: "يعود للمنزل", pronunciation: "پريخاديت داموي", emoji: "🏡" },
            { word: "Готовить ужин", translation: "يطبخ العشاء", pronunciation: "گوتوڤيت أوجين", emoji: "🍝" },
            { word: "Смотреть телевизор", translation: "يشاهد التلفاز", pronunciation: "سماتريت تيليڤيزور", emoji: "📺" },
            { word: "Читать книгу", translation: "يقرأ كتاباً", pronunciation: "چيتات كنيگو", emoji: "📖" },
            { word: "Ложиться спать", translation: "يذهب للنوم", pronunciation: "لوجيتسيا سپات", emoji: "😴" },
        ],
        readingExercises: [
            readingExercise("Я просыпаюсь в 7 утра каждый день.", "روتين يومي", "أستيقظ الساعة 7 صباحاً كل يوم.", ["Он едет на работу на машине.", "После ужина я смотрю телевизор.", "Я учусь по вечерам."]),
        ],
        listeningExercises: [
            listeningExercise("Просыпаться", "Первое, что вы делаете утром.", ["Ложиться спать", "Завтракать", "Учиться"]),
        ]
    },
    countries: {
        words: [
            { word: "Страна", translation: "دولة", pronunciation: "سترانا", emoji: "🌍" },
            { word: "Национальность", translation: "جنسية", pronunciation: "ناتسيونالنوست", emoji: "🆔" },
            { word: "Россия", translation: "روسيا", pronunciation: "راسّييا", emoji: "🇷🇺" },
            { word: "Египет", translation: "مصر", pronunciation: "يگيبيت", emoji: "🇪🇬" },
            { word: "Япония", translation: "اليابان", pronunciation: "ياپونيا", emoji: "🇯🇵" },
            { word: "Франция", translation: "فرنسا", pronunciation: "فرانتسيا", emoji: "🇫🇷" },
            { word: "Америка", translation: "أمريكا", pronunciation: "أميريكا", emoji: "🇺🇸" },
            { word: "Германия", translation: "ألمانيا", pronunciation: "گيرمانيا", emoji: "🇩🇪" },
            { word: "Италия", translation: "إيطاليا", pronunciation: "إيطاليا", emoji: "🇮🇹" },
            { word: "Столица", translation: "عاصمة", pronunciation: "ستاليتسا", emoji: "🏛️" },
        ],
        readingExercises: [
            readingExercise("Москва - столица России.", "عواصم الدول", "موسكو هي عاصمة روسيا.", ["Я из Египта.", "Он говорит по-японски.", "Нью-Йорк - большой город в Америке."]),
        ],
        listeningExercises: [
            listeningExercise("Россия", "Самая большая страна в мире.", ["Египет", "Франция", "Америка"]),
        ]
    },
    sports: {
        words: [
            { word: "Спорт", translation: "رياضة", pronunciation: "سپورت", emoji: "🏅" },
            { word: "Футбол", translation: "كرة القدم", pronunciation: "فوتبول", emoji: "⚽" },
            { word: "Баскетбол", translation: "كرة السلة", pronunciation: "باسكتبول", emoji: "🏀" },
            { word: "Теннис", translation: "تنس", pronunciation: "تنس", emoji: "🎾" },
            { word: "Плавание", translation: "سباحة", pronunciation: "پلاڤانييه", emoji: "🏊" },
            { word: "Бег", translation: "جري", pronunciation: "بيك", emoji: "🏃" },
            { word: "Играть", translation: "يلعب", pronunciation: "إيگرات", emoji: "🤸" },
            { word: "Выигрывать", translation: "يفوز", pronunciation: "ڤييگريڤات", emoji: "🏆" },
            { word: "Проигрывать", translation: "يخسر", pronunciation: "پرايگريڤات", emoji: "👎" },
            { word: "Команда", translation: "فريق", pronunciation: "كوماندا", emoji: "👥" },
        ],
        readingExercises: [
            readingExercise("Мой любимый спорт - футбол.", "رياضة مفضلة", "رياضتي المفضلة هي كرة القدم.", ["Он играет в теннис каждые выходные.", "Наша команда выиграла матч.", "Я хожу плавать два раза в неделю."]),
        ],
        listeningExercises: [
            listeningExercise("Футбол", "Спорт с 11 игроками и мячом.", ["Баскетбол", "Теннис", "Плавание"]),
        ]
    },
    music_arts: {
        words: [
            { word: "Музыка", translation: "موسيقى", pronunciation: "موزيكا", emoji: "🎵" },
            { word: "Искусство", translation: "فن", pronunciation: "إيسكوستڤا", emoji: "🖼️" },
            { word: "Песня", translation: "أغنية", pronunciation: "پيسنيا", emoji: "🎶" },
            { word: "Художник", translation: "فنان/رسام", pronunciation: "خودوجنيك", emoji: "🧑‍🎨" },
            { word: "Рисовать", translation: "يرسم", pronunciation: "ريساڤات", emoji: "🎨" },
            { word: "Петь", translation: "يغني", pronunciation: "پيت", emoji: "🎤" },
            { word: "Танцевать", translation: "يرقص", pronunciation: "تانتسيڤات", emoji: "💃" },
            { word: "Музей", translation: "متحف", pronunciation: "موزي", emoji: "🏛️" },
            { word: "Театр", translation: "مسرح", pronunciation: "تياتر", emoji: "🎭" },
            { word: "Фильм", translation: "فيلم", pronunciation: "فيلم", emoji: "🎬" },
        ],
        readingExercises: [
            readingExercise("Я люблю слушать классическую музыку.", "تفضيلات فنية", "أحب الاستماع إلى الموسيقى الكلاسيكية.", ["Она талантливый художник.", "Пойдём в музей в субботу.", "Эта песня очень популярная."]),
        ],
        listeningExercises: [
            listeningExercise("Музыка", "Искусство звуков.", ["Искусство", "Фильм", "Песня"]),
        ]
    }
};

export const RUSSIAN_GAMES: GamesCollection = {
    games: [
        {
            type: 'match',
            title: 'Игра на совпадения',
            description: 'Сопоставьте русское слово с его арабским переводом.',
            items: [
                { id: 'ru_match_1', word: 'Дом', translation: 'منزل' },
                { id: 'ru_match_2', word: 'Кошка', translation: 'قطة' },
                { id: 'ru_match_3', word: 'Книга', translation: 'كتاب' },
                { id: 'ru_match_4', word: 'Есть', translation: 'يأكل' },
            ]
        },
        {
            type: 'missing_word',
            title: 'Пропущенное слово',
            description: 'Выберите правильное слово, чтобы завершить предложение.',
            sentence: 'Солнце {blank} и горячее.',
            correctWord: 'жёлтое',
            options: ['жёлтое', 'синее', 'холодное', 'грустное']
        }
    ]
};
