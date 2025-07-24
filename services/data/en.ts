
import { CategoryContent, ReadingExercise, ListeningExercise } from '../../types.ts';

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

export const ENGLISH_CONTENT: { [categoryName: string]: CategoryContent; } = {
    alphabet: {
        words: [
            { word: "a", translation: "أي", pronunciation: "/eɪ/", emoji: "🍎" },
            { word: "b", translation: "بي", pronunciation: "/biː/", emoji: "🐝" },
            { word: "c", translation: "سي", pronunciation: "/siː/", emoji: "🐈" },
            { word: "d", translation: "دي", pronunciation: "/diː/", emoji: "🐕" },
            { word: "e", translation: "إي", pronunciation: "/iː/", emoji: "🐘" },
            { word: "f", translation: "إف", pronunciation: "/ɛf/", emoji: "🐟" },
            { word: "g", translation: "جي", pronunciation: "/dʒiː/", emoji: "🍇" },
            { word: "h", translation: "إيتش", pronunciation: "/eɪtʃ/", emoji: "🏠" },
            { word: "i", translation: "آي", pronunciation: "/aɪ/", emoji: "🧊" },
            { word: "j", translation: "جاي", pronunciation: "/dʒeɪ/", emoji: "잼" },
            { word: "k", translation: "كاي", pronunciation: "/keɪ/", emoji: "🔑" },
            { word: "l", translation: "إل", pronunciation: "/ɛl/", emoji: "🦁" },
            { word: "m", translation: "إم", pronunciation: "/ɛm/", emoji: "🐒" },
            { word: "n", translation: "إن", pronunciation: "/ɛn/", emoji: "👃" },
            { word: "o", translation: "أو", pronunciation: "/oʊ/", emoji: "🐙" },
            { word: "p", translation: "بي", pronunciation: "/piː/", emoji: "🐷" },
            { word: "q", translation: "كيو", pronunciation: "/kjuː/", emoji: "👸" },
            { word: "r", translation: "آر", pronunciation: "/ɑːr/", emoji: "🐇" },
            { word: "s", translation: "إس", pronunciation: "/ɛs/", emoji: "☀️" },
            { word: "t", translation: "تي", pronunciation: "/tiː/", emoji: "🐯" },
            { word: "u", translation: "يو", pronunciation: "/juː/", emoji: "☂️" },
            { word: "v", translation: "ڤي", pronunciation: "/viː/", emoji: "🎻" },
            { word: "w", translation: "دبليو", pronunciation: "/ˈdʌbəl.juː/", emoji: "🍉" },
            { word: "x", translation: "إكس", pronunciation: "/ɛks/", emoji: " xylophone" },
            { word: "y", translation: "واي", pronunciation: "/waɪ/", emoji: " yogurt" },
            { word: "z", translation: "زد", pronunciation: "/ziː/", emoji: "🦓" },
        ],
        readingExercises: [
            readingExercise("a is for apple.", "Find the word for 'a'.", "a للتفاحة.", ["b is for ball.", "c is for cat.", "d is for dog."]),
            readingExercise("the quick brown fox jumps over the lazy dog.", "This sentence contains all letters.", "الثعلب البني السريع يقفز فوق الكلب الكسول.", ["hello world.", "my name is loghatna.", "learn languages."])
        ],
        listeningExercises: [
            listeningExercise("a", "The first letter of the alphabet.", ["b", "c", "d"]),
            listeningExercise("z", "The last letter of the alphabet.", ["x", "y", "w"])
        ]
    },
    basics: {
            words: [
                { word: "I", translation: "أنا", pronunciation: "آي", emoji: "👤" },
                { word: "You", translation: "أنت/أنتم", pronunciation: "يو", emoji: "👥" },
                { word: "He", translation: "هو", pronunciation: "هي", emoji: "👨" },
                { word: "She", translation: "هي", pronunciation: "شي", emoji: "👩" },
                { word: "It", translation: "هو/هي (لغير العاقل)", pronunciation: "إت", emoji: "🤖" },
                { word: "We", translation: "نحن", pronunciation: "وي", emoji: "👨‍👩‍👧‍👦" },
                { word: "They", translation: "هم", pronunciation: "ذاي", emoji: "👨‍👩‍👧‍👦" },
                { word: "What", translation: "ماذا", pronunciation: "وات", emoji: "❓" },
                { word: "Who", translation: "من", pronunciation: "هو", emoji: "❓" },
                { word: "Where", translation: "أين", pronunciation: "وير", emoji: "📍" },
                { word: "When", translation: "متى", pronunciation: "وين", emoji: "⏰" },
                { word: "Why", translation: "لماذا", pronunciation: "واي", emoji: "🤔" },
                { word: "How", translation: "كيف", pronunciation: "هاو", emoji: "🤔" },
                { word: "Yes", translation: "نعم", pronunciation: "يس", emoji: "👍" },
                { word: "No", translation: "لا", pronunciation: "نو", emoji: "👎" },
                { word: "Maybe", translation: "ربما", pronunciation: "مايبي", emoji: "🤷" },
                { word: "Please", translation: "من فضلك", pronunciation: "بليز", emoji: "🙏" },
                { word: "Thank you", translation: "شكراً لك", pronunciation: "ثانك يو", emoji: "😊" },
                { word: "Sorry", translation: "آسف", pronunciation: "سوري", emoji: "😔" },
                { word: "Excuse me", translation: "اعذرني", pronunciation: "إكسكيوز مي", emoji: "✋" },
                { word: "And", translation: "و", pronunciation: "آند", emoji: "&" },
                { word: "But", translation: "لكن", pronunciation: "بات", emoji: "↔️" },
                { word: "Or", translation: "أو", pronunciation: "أور", emoji: "🤷‍♀️" },
                { word: "Because", translation: "لأن", pronunciation: "بيكوز", emoji: "👉" },
                { word: "With", translation: "مع", pronunciation: "ويذ", emoji: "🤝" },
                { word: "Without", translation: "بدون", pronunciation: "ويذاوت", emoji: "🚫" },
                { word: "From", translation: "من", pronunciation: "فروم", emoji: "source" },
                { word: "To", translation: "إلى", pronunciation: "تو", emoji: "destination" },
                { word: "In", translation: "في", pronunciation: "إن", emoji: "📥" },
                { word: "On", translation: "على", pronunciation: "أون", emoji: "🔝" },
            ],
            readingExercises: [
                readingExercise("I am happy today, but it is very cold.", "ابحث عن ترجمة 'happy' و 'cold'.", "أنا سعيد اليوم، لكن الجو بارد جداً.", ["هو حزين لأن الطقس حار.", "هل أنت بخير؟ نعم، شكراً لك.", "هذا سهل وذلك صعب."]),
                readingExercise("The big house has a small garden.", "ترجم 'big house' و 'small garden'.", "البيت الكبير له حديقة صغيرة.", ["القطة تشرب الحليب.", "هل يمكنك مساعدتي؟", "هذا كتابي."])
            ],
            listeningExercises: [
                listeningExercise("Thank you", "عبارة شائعة لإظهار الامتنان.", ["Sorry", "Please", "Hello"]),
                listeningExercise("Good morning", "تحية تقال في الصباح.", ["Good night", "Goodbye", "Hello"])
            ]
        },
        greetings: {
            words: [
                { word: "Hello", translation: "مرحباً", pronunciation: "هيلو", emoji: "👋" },
                { word: "Hi", translation: "أهلاً", pronunciation: "هاي", emoji: "👋" },
                { word: "Good morning", translation: "صباح الخير", pronunciation: "غوود مورنينغ", emoji: "☀️" },
                { word: "Good afternoon", translation: "مساء الخير (بعد الظهر)", pronunciation: "غوود آفترنون", emoji: "🌇" },
                { word: "Good evening", translation: "مساء الخير", pronunciation: "غوود إيفنينغ", emoji: "🌃" },
                { word: "Good night", translation: "تصبح على خير", pronunciation: "غوود نايت", emoji: "🌙" },
                { word: "Goodbye", translation: "مع السلامة", pronunciation: "غوودباي", emoji: "👋" },
                { word: "Bye", translation: "وداعاً", pronunciation: "باي", emoji: "👋" },
                { word: "See you later", translation: "أراك لاحقاً", pronunciation: "سي يو لايتر", emoji: "👀" },
                { word: "How are you?", translation: "كيف حالك؟", pronunciation: "هاو آر يو؟", emoji: "❓" },
                { word: "I'm fine, thank you.", translation: "أنا بخير، شكراً لك.", pronunciation: "آيم فاين, ثانك يو", emoji: "😊" },
                { word: "And you?", translation: "وأنت؟", pronunciation: "آند يو؟", emoji: "❓" },
                { word: "What's your name?", translation: "ما اسمك؟", pronunciation: "واتس يور نايم؟", emoji: "❓" },
                { word: "My name is...", translation: "اسمي هو...", pronunciation: "ماي نايم إز...", emoji: "🏷️" },
                { word: "Nice to meet you.", translation: "سررت بلقائك.", pronunciation: "نايس تو ميت يو", emoji: "🤝" },
                { word: "Welcome", translation: "أهلاً بك", pronunciation: "ويلكم", emoji: "🎉" },
                { word: "Have a nice day!", translation: "أتمنى لك يوماً سعيداً!", pronunciation: "هاف آ نايس داي", emoji: "😊" }
            ],
            readingExercises: [
                readingExercise("Good morning, how are you?", "ابحث عن التحية الصباحية والسؤال عن الحال.", "صباح الخير، كيف حالك؟", ["تصبح على خير، أراك غداً.", "ما اسمك ومن أين أنت؟", "أنا بخير، شكراً لك."]),
                readingExercise("What's your name? My name is Ahmed.", "ابحث عن السؤال عن الاسم والإجابة.", "ما اسمك؟ اسمي أحمد.", ["كيف حالك؟ أنا بخير.", "من أين أنت؟ أنا من مصر.", "سررت بلقائك."])
            ],
            listeningExercises: [
                listeningExercise("What's your name?", "سؤال للاستفسار عن اسم الشخص.", ["How are you?", "Goodbye", "Good morning"]),
                listeningExercise("Nice to meet you", "عبارة تقال عند مقابلة شخص لأول مرة.", ["Thank you", "Hello", "Sorry"])
            ]
        },
        numbers: {
            words: [
                { word: "Zero", translation: "صفر", pronunciation: "زيرو", emoji: "0️⃣" },
                { word: "One", translation: "واحد", pronunciation: "وان", emoji: "1️⃣" },
                { word: "Two", translation: "اثنان", pronunciation: "تو", emoji: "2️⃣" },
                { word: "Three", translation: "ثلاثة", pronunciation: "ثري", emoji: "3️⃣" },
                { word: "Four", translation: "أربعة", pronunciation: "فور", emoji: "4️⃣" },
                { word: "Five", translation: "خمسة", pronunciation: "فايف", emoji: "5️⃣" },
                { word: "Six", translation: "ستة", pronunciation: "سيكس", emoji: "6️⃣" },
                { word: "Seven", translation: "سبعة", pronunciation: "سيفن", emoji: "7️⃣" },
                { word: "Eight", translation: "ثمانية", pronunciation: "ايت", emoji: "8️⃣" },
                { word: "Nine", translation: "تسعة", pronunciation: "ناين", emoji: "9️⃣" },
                { word: "Ten", translation: "عشرة", pronunciation: "تن", emoji: "🔟" },
                { word: "Eleven", translation: "أحد عشر", pronunciation: "إيليفن", emoji: "1️⃣1️⃣" },
                { word: "Twelve", translation: "اثنا عشر", pronunciation: "تويلف", emoji: "1️⃣2️⃣" },
                { word: "Thirteen", translation: "ثلاثة عشر", pronunciation: "ثيرتين", emoji: "1️⃣3️⃣" },
                { word: "Twenty", translation: "عشرون", pronunciation: "توينتي", emoji: "2️⃣0️⃣" },
                { word: "Thirty", translation: "ثلاثون", pronunciation: "ثيرتي", emoji: "3️⃣0️⃣" },
                { word: "Forty", translation: "أربعون", pronunciation: "فورتي", emoji: "4️⃣0️⃣" },
                { word: "Fifty", translation: "خمسون", pronunciation: "فيفتي", emoji: "5️⃣0️⃣" },
                { word: "Hundred", translation: "مئة", pronunciation: "هندرد", emoji: "💯" },
                { word: "Thousand", translation: "ألف", pronunciation: "ثاوزند", emoji: "1️⃣0️⃣0️⃣0️⃣" },
            ],
            readingExercises: [
                readingExercise("I have two hands and ten fingers.", "ابحث عن الأرقام 2 و 10.", "لدي يدان وعشرة أصابع.", ["لدي ثلاثة كتب وخمسة أقلام.", "هل يمكنك عد من واحد إلى عشرة؟", "هو عمره ثمان سنوات."]),
                readingExercise("There are fifty stars on the flag.", "ابحث عن الرقم 50.", "يوجد خمسون نجمة على العلم.", ["لدي عشرون دولاراً.", "المئة يوم الأولى مهمة.", "واحد زائد اثنين يساوي ثلاثة."])
            ],
            listeningExercises: [
                listeningExercise("Five", "الرقم الذي يأتي بعد أربعة.", ["Four", "One", "Ten"]),
                listeningExercise("Twenty", "ضعف الرقم عشرة.", ["Twelve", "Two", "Ten"])
            ]
        },
        colors: {
            words: [
                { word: "Color", translation: "لون", pronunciation: "كولور", emoji: "🎨" },
                { word: "Red", translation: "أحمر", pronunciation: "ريد", emoji: "🔴" },
                { word: "Green", translation: "أخضر", pronunciation: "غرين", emoji: "🟢" },
                { word: "Blue", translation: "أزرق", pronunciation: "بلو", emoji: "🔵" },
                { word: "Yellow", translation: "أصفر", pronunciation: "ييلو", emoji: "🟡" },
                { word: "Black", translation: "أسود", pronunciation: "بلاك", emoji: "⚫" },
                { word: "White", translation: "أبيض", pronunciation: "وايت", emoji: "⚪" },
                { word: "Orange", translation: "برتقالي", pronunciation: "أورانج", emoji: "🟠" },
                { word: "Purple", translation: "بنفسجي", pronunciation: "بيربل", emoji: "🟣" },
                { word: "Brown", translation: "بني", pronunciation: "براون", emoji: "🟤" },
                { word: "Pink", translation: "وردي", pronunciation: "بينك", emoji: "🌸" },
                { word: "Gray", translation: "رمادي", pronunciation: "غراي", emoji: "🐘" },
                { word: "Silver", translation: "فضي", pronunciation: "سيلفر", emoji: "🥈" },
                { word: "Gold", translation: "ذهبي", pronunciation: "غولد", emoji: "🥇" },
            ],
            readingExercises: [
                readingExercise("The sky is blue and the grass is green.", "ركز على ترجمة 'blue' و 'green'.", "السماء زرقاء والعشب أخضر.", ["التفاحة حمراء والموزة صفراء.", "أحب اللون الأبيض والأسود.", "سيارته الجديدة لونها أحمر."]),
                readingExercise("She has a pink dress and white shoes.", "ابحث عن 'pink' و 'white'.", "لديها فستان وردي وحذاء أبيض.", ["القط أسود والكلب بني.", "هل تحب اللون الأرجواني؟", "الذهب والفضة معادن ثمينة."])
            ],
            listeningExercises: [
                listeningExercise("Red", "لون الدم أو الفراولة.", ["Blue", "Green", "Yellow"]),
                listeningExercise("Black", "عكس اللون الأبيض.", ["White", "Blue", "Gray"])
            ]
        },
        family: {
            words: [
                { word: "Family", translation: "عائلة", pronunciation: "فاميلي", emoji: "👨‍👩‍👧‍👦" },
                { word: "Father", translation: "أب", pronunciation: "فاذر", emoji: "👨" },
                { word: "Mother", translation: "أم", pronunciation: "ماذر", emoji: "👩" },
                { word: "Parents", translation: "والدين", pronunciation: "بيرنتس", emoji: "👨‍👩‍👧" },
                { word: "Son", translation: "ابن", pronunciation: "صن", emoji: "👦" },
                { word: "Daughter", translation: "ابنة", pronunciation: "دوتر", emoji: "👧" },
                { word: "Child", translation: "طفل", pronunciation: "تشايلد", emoji: "👶" },
                { word: "Children", translation: "أطفال", pronunciation: "تشيلدرين", emoji: "🧒" },
                { word: "Brother", translation: "أخ", pronunciation: "براذر", emoji: "👱‍♂️" },
                { word: "Sister", translation: "أخت", pronunciation: "سيستر", emoji: "👱‍♀️" },
                { word: "Grandfather", translation: "جد", pronunciation: "غراندفاذر", emoji: "👴" },
                { word: "Grandmother", translation: "جدة", pronunciation: "غراندماذر", emoji: "👵" },
                { word: "Grandparents", translation: "أجداد", pronunciation: "غراندبيرنتس", emoji: "👴👵" },
                { word: "Uncle", translation: "عم/خال", pronunciation: "أنكل", emoji: "👨‍" },
                { word: "Aunt", translation: "عمة/خالة", pronunciation: "آنت", emoji: "👩‍" },
                { word: "Cousin", translation: "ابن/بنت العم/الخال", pronunciation: "كازن", emoji: "🧑" },
                { word: "Husband", translation: "زوج", pronunciation: "هازبند", emoji: "🤵" },
                { word: "Wife", translation: "زوجة", pronunciation: "وايف", emoji: "👰" },
            ],
            readingExercises: [
                readingExercise("My father and my mother are my parents.", "ابحث عن ترجمة 'father', 'mother', و 'parents'.", "أبي وأمي هما والديّ.", ["أخي وأختي يلعبان معاً.", "جدي وجدتي يعيشان في منزل كبير.", "هذا ابني وهذه ابنتي."]),
                readingExercise("My sister is younger than my brother.", "ركز على المقارنة بين 'sister' و 'brother'.", "أختي أصغر من أخي.", ["عائلتي كبيرة جداً.", "ابن عمي يعيش في مدينة أخرى.", "جدي يحب القراءة."])
            ],
            listeningExercises: [
                listeningExercise("Brother", "شقيق ذكر.", ["Sister", "Father", "Mother"]),
                listeningExercise("Mother", "الكلمة الإنجليزية التي تعني 'أم'.", ["Father", "Daughter", "Son"])
            ]
        },
        food: {
            words: [
                { word: "Food", translation: "طعام", pronunciation: "فوود", emoji: "🍔" },
                { word: "Drink", translation: "شراب", pronunciation: "درينك", emoji: "🥤" },
                { word: "Water", translation: "ماء", pronunciation: "ووتر", emoji: "💧" },
                { word: "Coffee", translation: "قهوة", pronunciation: "كوفي", emoji: "☕" },
                { word: "Tea", translation: "شاي", pronunciation: "تي", emoji: "🍵" },
                { word: "Juice", translation: "عصير", pronunciation: "جووس", emoji: "🧃" },
                { word: "Milk", translation: "حليب", pronunciation: "ميلك", emoji: "🥛" },
                { word: "Bread", translation: "خبز", pronunciation: "بريد", emoji: "🍞" },
                { word: "Cheese", translation: "جبن", pronunciation: "تشييز", emoji: "🧀" },
                { word: "Rice", translation: "أرز", pronunciation: "رايس", emoji: "🍚" },
                { word: "Chicken", translation: "دجاج", pronunciation: "تشيكن", emoji: "🍗" },
                { word: "Meat", translation: "لحم", pronunciation: "ميت", emoji: "🥩" },
                { word: "Fish", translation: "سمك", pronunciation: "فيش", emoji: "🐟" },
                { word: "Fruit", translation: "فاكهة", pronunciation: "فروت", emoji: "🍎" },
                { word: "Apple", translation: "تفاحة", pronunciation: "آبل", emoji: "🍎" },
                { word: "Banana", translation: "موزة", pronunciation: "بنانا", emoji: "🍌" },
                { word: "Orange", translation: "برتقالة", pronunciation: "أورانج", emoji: "🍊" },
                { word: "Vegetable", translation: "خضروات", pronunciation: "فجتبل", emoji: "🥕" },
                { word: "Carrot", translation: "جزرة", pronunciation: "كاروت", emoji: "🥕" },
                { word: "Potato", translation: "بطاطس", pronunciation: "بوتيتو", emoji: "🥔" },
                { word: "Tomato", translation: "طماطم", pronunciation: "توميتو", emoji: "🍅" },
                { word: "Sugar", translation: "سكر", pronunciation: "شوغر", emoji: "🍬" },
                { word: "Salt", translation: "ملح", pronunciation: "سولت", emoji: "🧂" },
                { word: "Breakfast", translation: "فطور", pronunciation: "بريكفاست", emoji: "🍳" },
                { word: "Lunch", translation: "غداء", pronunciation: "لنش", emoji: "🍱" },
                { word: "Dinner", translation: "عشاء", pronunciation: "دينر", emoji: "🍝" },
            ],
            readingExercises: [
                readingExercise("I am hungry. I want to eat bread and cheese.", "ركز على كلمتي 'bread' و 'cheese'.", "أنا جائع. أريد أن آكل الخبز والجبن.", ["أنا عطشان. أريد أن أشرب الماء.", "الطعام لذيذ جداً.", "هل يمكنني الحصول على القائمة من فضلك؟"]),
                readingExercise("For breakfast, I like coffee and an apple.", "ابحث عن طعام وشراب الفطور.", "في الفطور، أحب القهوة وتفاحة.", ["أنا آكل الأرز والدجاج على الغداء.", "العشاء جاهز الساعة السابعة.", "هذا العصير طازج ولذيذ."])
            ],
            listeningExercises: [
                listeningExercise("Apple", "نوع من الفاكهة، غالبًا ما يكون أحمر أو أخضر.", ["Orange", "Water", "Bread"]),
                listeningExercise("Water", "شراب أساسي وشفاف.", ["Milk", "Juice", "Tea"])
            ]
        },
        time: {
            words: [
                { word: "Time", translation: "وقت", pronunciation: "تايم", emoji: "⏰" },
                { word: "Hour", translation: "ساعة", pronunciation: "آور", emoji: "⏳" },
                { word: "Minute", translation: "دقيقة", pronunciation: "مينيت", emoji: "⏱️" },
                { word: "Second", translation: "ثانية", pronunciation: "سيكند", emoji: "⏱️" },
                { word: "Day", translation: "يوم", pronunciation: "داي", emoji: "📅" },
                { word: "Week", translation: "أسبوع", pronunciation: "ويك", emoji: "🗓️" },
                { word: "Month", translation: "شهر", pronunciation: "منث", emoji: "🈷️" },
                { word: "Year", translation: "سنة", pronunciation: "يير", emoji: "🎉" },
                { word: "Monday", translation: "الإثنين", pronunciation: "مانداي", emoji: " M" },
                { word: "Tuesday", translation: "الثلاثاء", pronunciation: "تيوزداي", emoji: "T" },
                { word: "Wednesday", translation: "الأربعاء", pronunciation: "وينزداي", emoji: "W" },
                { word: "Thursday", translation: "الخميس", pronunciation: "ثيرزداي", emoji: "T" },
                { word: "Friday", translation: "الجمعة", pronunciation: "فرايداي", emoji: "F" },
                { word: "Saturday", translation: "السبت", pronunciation: "ساترداي", emoji: "S" },
                { word: "Sunday", translation: "الأحد", pronunciation: "صانداي", emoji: "S" },
                { word: "Today", translation: "اليوم", pronunciation: "توداي", emoji: "👇" },
                { word: "Tomorrow", translation: "غداً", pronunciation: "تومورو", emoji: "➡️" },
                { word: "Yesterday", translation: "أمس", pronunciation: "يسترداي", emoji: "⬅️" },
                { word: "Morning", translation: "صباح", pronunciation: "مورنينغ", emoji: "🌅" },
                { word: "Afternoon", translation: "بعد الظهر", pronunciation: "آفترنون", emoji: "☀️" },
                { word: "Evening", translation: "مساء", pronunciation: "إيفنينغ", emoji: "🌇" },
                { word: "Night", translation: "ليل", pronunciation: "نايت", emoji: "🌃" },
            ],
            readingExercises: [
                readingExercise("Today is Monday, and tomorrow is Tuesday.", "ترجم 'Today', 'Monday', 'tomorrow', 'Tuesday'.", "اليوم هو الإثنين، وغداً هو الثلاثاء.", ["أمس كان الأحد.", "لدي اجتماع يوم الجمعة.", "الشهر فيه أربعة أسابيع."]),
                readingExercise("The meeting is at ten in the morning.", "ابحث عن الوقت والجزء من اليوم.", "الاجتماع في الساعة العاشرة صباحاً.", ["أراك في المساء.", "انتظر دقيقة من فضلك.", "السنة بها اثنا عشر شهراً."])
            ],
            listeningExercises: [
                listeningExercise("Friday", "اليوم الذي يسبق عطلة نهاية الأسبوع.", ["Monday", "Sunday", "Week"]),
                listeningExercise("Tomorrow", "اليوم الذي يأتي بعد اليوم.", ["Today", "Yesterday", "Day"])
            ]
        },
        weather: {
            words: [
                { word: "Weather", translation: "الطقس", pronunciation: "ويذر", emoji: "🌦️" },
                { word: "Sun", translation: "شمس", pronunciation: "صن", emoji: "☀️" },
                { word: "Sunny", translation: "مشمس", pronunciation: "صني", emoji: "☀️" },
                { word: "Cloud", translation: "غيمة", pronunciation: "كلاود", emoji: "☁️" },
                { word: "Cloudy", translation: "غائم", pronunciation: "كلاودي", emoji: "☁️" },
                { word: "Rain", translation: "مطر", pronunciation: "رين", emoji: "🌧️" },
                { word: "Rainy", translation: "ممطر", pronunciation: "ريني", emoji: "🌧️" },
                { word: "Wind", translation: "رياح", pronunciation: "ويند", emoji: "💨" },
                { word: "Windy", translation: "عاصف", pronunciation: "ويندي", emoji: "💨" },
                { word: "Snow", translation: "ثلج", pronunciation: "سنو", emoji: "❄️" },
                { word: "Snowy", translation: "مثلج", pronunciation: "سنوي", emoji: "❄️" },
                { word: "Hot", translation: "حار", pronunciation: "هوت", emoji: "🌡️" },
                { word: "Cold", translation: "بارد", pronunciation: "كولد", emoji: "🥶" },
                { word: "Warm", translation: "دافئ", pronunciation: "وورم", emoji: "😊" },
                { word: "Cool", translation: "معتدل البرودة", pronunciation: "كول", emoji: "😎" },
                { word: "Storm", translation: "عاصفة", pronunciation: "ستورم", emoji: "⛈️" },
                { word: "Fog", translation: "ضباب", pronunciation: "فوغ", emoji: "🌫️" },
            ],
            readingExercises: [
                readingExercise("It is sunny and hot today.", "ابحث عن الكلمات التي تصف الشمس والحرارة.", "الجو مشمس وحار اليوم.", ["الجو غائم وبارد.", "سوف تمطر غداً.", "أنا أحب الطقس المثلج."]),
                readingExercise("In winter, it is cold and it snows.", "ابحث عن كلمات الشتاء.", "في الشتاء، يكون الجو بارداً ويتساقط الثلج.", ["الرياح قوية اليوم.", "أحضر مظلتك، إنها تمطر.", "الجو ضبابي في الصباح."])
            ],
            listeningExercises: [
                listeningExercise("Rainy", "عندما يسقط الماء من السماء.", ["Sunny", "Cloudy", "Windy"]),
                listeningExercise("Cold", "عكس كلمة 'حار'.", ["Hot", "Warm", "Cool"])
            ]
        },
        home: {
            words: [
                { word: "House", translation: "منزل", pronunciation: "هاوس", emoji: "🏠" },
                { word: "Home", translation: "بيت", pronunciation: "هوم", emoji: "🏡" },
                { word: "Apartment", translation: "شقة", pronunciation: "أبارتمنت", emoji: "🏢" },
                { word: "Room", translation: "غرفة", pronunciation: "رووم", emoji: "🚪" },
                { word: "Bedroom", translation: "غرفة نوم", pronunciation: "بيدرووم", emoji: "🛏️" },
                { word: "Bathroom", translation: "حمام", pronunciation: "باثرووم", emoji: "🛁" },
                { word: "Kitchen", translation: "مطبخ", pronunciation: "كيتشن", emoji: "🍳" },
                { word: "Living room", translation: "غرفة معيشة", pronunciation: "ليفينغ رووم", emoji: "🛋️" },
                { word: "Dining room", translation: "غرفة طعام", pronunciation: "داينينغ رووم", emoji: "🍽️" },
                { word: "Garden", translation: "حديقة", pronunciation: "غاردن", emoji: "🌳" },
                { word: "Door", translation: "باب", pronunciation: "دور", emoji: "🚪" },
                { word: "Window", translation: "نافذة", pronunciation: "ويندو", emoji: "🪟" },
                { word: "Floor", translation: "أرضية", pronunciation: "فلور", emoji: "👣" },
                { word: "Roof", translation: "سقف", pronunciation: "روف", emoji: "🧱" },
                { word: "Wall", translation: "جدار", pronunciation: "وول", emoji: "🧱" },
                { word: "Table", translation: "طاولة", pronunciation: "تيبل", emoji: "🪵" },
                { word: "Chair", translation: "كرسي", pronunciation: "تشير", emoji: "🪑" },
                { word: "Bed", translation: "سرير", pronunciation: "بيد", emoji: "🛏️" },
                { word: "Sofa", translation: "أريكة", pronunciation: "صوفا", emoji: "🛋️" },
                { word: "Lamp", translation: "مصباح", pronunciation: "لامب", emoji: "💡" },
                { word: "Key", translation: "مفتاح", pronunciation: "كي", emoji: "🔑" },
            ],
            readingExercises: [
                readingExercise("The kitchen has a table and a window.", "ترجم 'kitchen', 'table', و 'window'.", "المطبخ به طاولة ونافذة.", ["غرفة النوم بها سرير وباب.", "غرفة المعيشة بها كرسي.", "مفتاح المنزل في الحديقة."]),
                readingExercise("I sleep in the bedroom and watch TV in the living room.", "ابحث عن أماكن النوم ومشاهدة التلفاز.", "أنا أنام في غرفة النوم وأشاهد التلفاز في غرفة المعيشة.", ["نحن نأكل في غرفة الطعام.", "الحمام في نهاية الممر.", "الشقة في الطابق الثالث."])
            ],
            listeningExercises: [
                listeningExercise("Kitchen", "المكان الذي نطبخ فيه الطعام.", ["Bedroom", "Bathroom", "Garden"]),
                listeningExercise("Door", "تستخدمه للدخول والخروج من غرفة.", ["Window", "Table", "Bed"])
            ]
        },
        shopping: {
            words: [
                { word: "Store", translation: "متجر", pronunciation: "ستور", emoji: "🏬" },
                { word: "Shop", translation: "محل", pronunciation: "شوب", emoji: "🛍️" },
                { word: "Market", translation: "سوق", pronunciation: "ماركت", emoji: "🛒" },
                { word: "Supermarket", translation: "سوبر ماركت", pronunciation: "سوبرماركت", emoji: "🏪" },
                { word: "Money", translation: "مال", pronunciation: "مني", emoji: "💰" },
                { word: "Price", translation: "سعر", pronunciation: "برايس", emoji: "💲" },
                { word: "Buy", translation: "يشتري", pronunciation: "باي", emoji: "🛍️" },
                { word: "Sell", translation: "يبيع", pronunciation: "سيل", emoji: "🏷️" },
                { word: "Pay", translation: "يدفع", pronunciation: "باي", emoji: "💳" },
                { word: "Expensive", translation: "غالي", pronunciation: "إكسبنسيف", emoji: "💎" },
                { word: "Cheap", translation: "رخيص", pronunciation: "تشيب", emoji: "🪙" },
                { word: "Bill", translation: "فاتورة", pronunciation: "بيل", emoji: "🧾" },
                { word: "Receipt", translation: "إيصال", pronunciation: "ريسيت", emoji: "🧾" },
                { word: "Cash", translation: "نقد", pronunciation: "كاش", emoji: "💵" },
                { word: "Credit card", translation: "بطاقة ائتمان", pronunciation: "كريديت كارد", emoji: "💳" },
                { word: "Customer", translation: "زبون", pronunciation: "كاستومر", emoji: "🙋" },
            ],
            readingExercises: [
                readingExercise("How much is this? The price is very expensive.", "ابحث عن السؤال عن السعر ووصفه بأنه 'expensive'.", "كم سعر هذا؟ السعر غالي جداً.", ["أريد شراء هذا من فضلك.", "هل يمكنني الدفع بالبطاقة؟", "هذا المتجر رخيص جداً."]),
                readingExercise("I will pay with a credit card, please give me the receipt.", "ابحث عن طريقة الدفع والوثيقة المطلوبة.", "سأدفع ببطاقة الائتمان، من فضلك أعطني الإيصال.", ["هل تقبلون الدفع نقدًا؟", "هذا السوق كبير جدًا.", "الزبون دائمًا على حق."])
            ],
            listeningExercises: [
                listeningExercise("Money", "ما تستخدمه للشراء.", ["Price", "Store", "Bill"]),
                listeningExercise("Buy", "فعل الحصول على شيء مقابل المال.", ["Sell", "Pay", "Have"])
            ]
        },
        body: {
            words: [
                { word: "Body", translation: "جسم", pronunciation: "بودي", emoji: "🧍" },
                { word: "Head", translation: "رأس", pronunciation: "هيد", emoji: "👤" },
                { word: "Face", translation: "وجه", pronunciation: "فيس", emoji: "😊" },
                { word: "Eye", translation: "عين", pronunciation: "آي", emoji: "👁️" },
                { word: "Nose", translation: "أنف", pronunciation: "نوز", emoji: "👃" },
                { word: "Mouth", translation: "فم", pronunciation: "ماوث", emoji: "👄" },
                { word: "Ear", translation: "أذن", pronunciation: "إير", emoji: "👂" },
                { word: "Hair", translation: "شعر", pronunciation: "هير", emoji: "👱" },
                { word: "Tooth", translation: "سن", pronunciation: "توث", emoji: "🦷" },
                { word: "Neck", translation: "رقبة", pronunciation: "نيك", emoji: "🦒" },
                { word: "Shoulder", translation: "كتف", pronunciation: "شولدر", emoji: "🤷" },
                { word: "Arm", translation: "ذراع", pronunciation: "آرم", emoji: "💪" },
                { word: "Hand", translation: "يد", pronunciation: "هاند", emoji: "✋" },
                { word: "Finger", translation: "إصبع", pronunciation: "فينغر", emoji: "👆" },
                { word: "Leg", translation: "ساق", pronunciation: "ليغ", emoji: "🦵" },
                { word: "Foot", translation: "قدم", pronunciation: "فوت", emoji: "🦶" },
                { word: "Heart", translation: "قلب", pronunciation: "هارت", emoji: "❤️" },
                { word: "Stomach", translation: "معدة", pronunciation: "ستومك", emoji: "🍔" },
            ],
            readingExercises: [
                readingExercise("I have two eyes, one nose, and one mouth.", "عد أجزاء الوجه المذكورة.", "لدي عينان وأنف واحد وفم واحد.", ["أنا أغسل يدي بالماء والصابون.", "رأسي يؤلمني.", "هو لديه شعر أسود وعينان زرقاوان."]),
                readingExercise("My stomach hurts after eating.", "ابحث عن الجزء الذي يؤلم.", "معدتي تؤلمني بعد الأكل.", ["قلبي ينبض بسرعة.", "لدي خمسة أصابع في كل يد.", "ذراعي قوية."])
            ],
            listeningExercises: [
                listeningExercise("Hand", "الجزء من الجسم الذي به خمسة أصابع.", ["Foot", "Head", "Eye"]),
                listeningExercise("Hair", "ينمو على الرأس.", ["Face", "Nose", "Ear"])
            ]
        },
        clothing: {
            words: [
                { word: "Clothes", translation: "ملابس", pronunciation: "كلوثز", emoji: "👕" },
                { word: "Shirt", translation: "قميص", pronunciation: "شيرت", emoji: "👕" },
                { word: "T-shirt", translation: "تي شيرت", pronunciation: "تي-شيرت", emoji: "👕" },
                { word: "Pants", translation: "بنطال", pronunciation: "بانتس", emoji: "👖" },
                { word: "Jeans", translation: "جينز", pronunciation: "جينز", emoji: "👖" },
                { word: "Shorts", translation: "شورت", pronunciation: "شورتس", emoji: "🩳" },
                { word: "Dress", translation: "فستان", pronunciation: "دريس", emoji: "👗" },
                { word: "Skirt", translation: "تنورة", pronunciation: "سكيرت", emoji: "👗" },
                { word: "Jacket", translation: "سترة", pronunciation: "جاكيت", emoji: "🧥" },
                { word: "Coat", translation: "معطف", pronunciation: "كوت", emoji: "🧥" },
                { word: "Sweater", translation: "سترة صوفية", pronunciation: "سويتر", emoji: "🧶" },
                { word: "Shoes", translation: "حذاء", pronunciation: "شوز", emoji: "👟" },
                { word: "Boots", translation: "حذاء طويل", pronunciation: "بوتس", emoji: "👢" },
                { word: "Socks", translation: "جوارب", pronunciation: "صوكس", emoji: "🧦" },
                { word: "Hat", translation: "قبعة", pronunciation: "هات", emoji: "🧢" },
                { word: "Scarf", translation: "وشاح", pronunciation: "سكارف", emoji: "🧣" },
                { word: "Gloves", translation: "قفازات", pronunciation: "غلوفز", emoji: "🧤" },
            ],
            readingExercises: [
                readingExercise("I am wearing a blue shirt and black pants.", "ابحث عن 'shirt' و 'pants' وألوانها.", "أنا أرتدي قميصاً أزرق وبنطالاً أسود.", ["حذائي الجديد لونه أبيض.", "أحتاج شراء سترة للشتاء.", "هذه القبعة جميلة جداً."]),
                readingExercise("In winter, I wear a coat, a scarf, and gloves.", "ابحث عن ملابس الشتاء.", "في الشتاء، أرتدي معطفًا ووشاحًا وقفازات.", ["إنها ترتدي فستانًا أحمر جميلاً.", "هل رأيت جواربي؟", "هذا التي شيرت كبير جدًا."])
            ],
            listeningExercises: [
                listeningExercise("Shoes", "ما ترتديه في قدميك.", ["Shirt", "Hat", "Socks"]),
                listeningExercise("Jacket", "ترتديه فوق قميصك عندما يكون الجو باردًا.", ["Pants", "Dress", "Socks"])
            ]
        },
        verbs: {
            words: [
                { word: "be", translation: "يكون", pronunciation: "بي", emoji: "🧘" },
                { word: "have", translation: "يملك", pronunciation: "هاف", emoji: "🤲" },
                { word: "do", translation: "يفعل", pronunciation: "دو", emoji: "💪" },
                { word: "say", translation: "يقول", pronunciation: "ساي", emoji: "🗣️" },
                { word: "go", translation: "يذهب", pronunciation: "غو", emoji: "🚶" },
                { word: "get", translation: "يحصل على", pronunciation: "غيت", emoji: "🎁" },
                { word: "make", translation: "يصنع", pronunciation: "ميك", emoji: "🛠️" },
                { word: "know", translation: "يعرف", pronunciation: "نو", emoji: "🧠" },
                { word: "think", translation: "يفكر", pronunciation: "ثينك", emoji: "🤔" },
                { word: "see", translation: "يرى", pronunciation: "سي", emoji: "👀" },
                { word: "come", translation: "يأتي", pronunciation: "كم", emoji: "👋" },
                { word: "want", translation: "يريد", pronunciation: "وانت", emoji: "🙋" },
                { word: "look", translation: "ينظر", pronunciation: "لوك", emoji: "🧐" },
                { word: "use", translation: "يستخدم", pronunciation: "يوز", emoji: "📲" },
                { word: "find", translation: "يجد", pronunciation: "فايند", emoji: "🔍" },
                { word: "give", translation: "يعطي", pronunciation: "غيف", emoji: "🎁" },
                { word: "tell", translation: "يخبر", pronunciation: "تيل", emoji: "💬" },
                { word: "work", translation: "يعمل", pronunciation: "وورك", emoji: "💼" },
                { word: "call", translation: "يتصل", pronunciation: "كول", emoji: "📞" },
                { word: "try", translation: "يحاول", pronunciation: "تراي", emoji: "🏃" },
                { word: "ask", translation: "يسأل", pronunciation: "آسك", emoji: "❓" },
                { word: "need", translation: "يحتاج", pronunciation: "نيد", emoji: "🙏" },
                { word: "feel", translation: "يشعر", pronunciation: "فيل", emoji: "❤️" },
                { word: "become", translation: "يصبح", pronunciation: "بيكم", emoji: "🦋" },
                { word: "leave", translation: "يغادر", pronunciation: "ليف", emoji: "🚪" },
                { word: "put", translation: "يضع", pronunciation: "بوت", emoji: "📥" },
                { word: "mean", translation: "يعني", pronunciation: "مين", emoji: "↔️" },
                { word: "keep", translation: "يحافظ على", pronunciation: "كيب", emoji: "🔒" },
                { word: "let", translation: "يدع / يسمح", pronunciation: "ليت", emoji: "✅" },
                { word: "begin", translation: "يبدأ", pronunciation: "بيغين", emoji: "▶️" },
                { word: "seem", translation: "يبدو", pronunciation: "سيم", emoji: "🧐" },
                { word: "help", translation: "يساعد", pronunciation: "هيلب", emoji: "🤝" },
                { word: "talk", translation: "يتحدث", pronunciation: "توك", emoji: "💬" },
                { word: "turn", translation: "يستدير / يحول", pronunciation: "تيرن", emoji: "🔄" },
                { word: "start", translation: "يبدأ", pronunciation: "ستارت", emoji: "🏁" },
                { word: "show", translation: "يُظهر", pronunciation: "شو", emoji: "🖼️" },
                { word: "hear", translation: "يسمع", pronunciation: "هير", emoji: "👂" },
                { word: "play", translation: "يلعب", pronunciation: "بلاي", emoji: "🎮" },
                { word: "run", translation: "يجري", pronunciation: "رن", emoji: "🏃‍♀️" },
                { word: "move", translation: "يتحرك", pronunciation: "موف", emoji: "🚚" },
                { word: "live", translation: "يعيش", pronunciation: "ليف", emoji: "🏡" },
                { word: "believe", translation: "يؤمن / يصدق", pronunciation: "بيليف", emoji: "🙏" },
                { word: "bring", translation: "يحضر", pronunciation: "برينغ", emoji: "🎁" },
                { word: "happen", translation: "يحدث", pronunciation: "هابين", emoji: "💥" },
                { word: "write", translation: "يكتب", pronunciation: "رايت", emoji: "✍️" },
                { word: "sit", translation: "يجلس", pronunciation: "سيت", emoji: "🪑" },
                { word: "stand", translation: "يقف", pronunciation: "ستاند", emoji: "🧍" },
                { word: "lose", translation: "يخسر / يفقد", pronunciation: "لوز", emoji: "📉" },
                { word: "pay", translation: "يدفع", pronunciation: "باي", emoji: "💵" },
                { word: "meet", translation: "يقابل", pronunciation: "ميت", emoji: "🤝" },
                { word: "include", translation: "يتضمن", pronunciation: "إنكلود", emoji: "➕" },
                { word: "continue", translation: "يستمر", pronunciation: "كونتينيو", emoji: "➡️" },
                { word: "set", translation: "يضبط / يضع", pronunciation: "سيت", emoji: "⚙️" },
                { word: "learn", translation: "يتعلم", pronunciation: "ليرن", emoji: "🎓" },
                { word: "change", translation: "يغير", pronunciation: "تشينج", emoji: "🔄" },
                { word: "lead", translation: "يقود", pronunciation: "ليد", emoji: "🧭" },
                { word: "understand", translation: "يفهم", pronunciation: "أندرستاند", emoji: "💡" },
                { word: "watch", translation: "يشاهد", pronunciation: "واتش", emoji: "📺" },
                { word: "follow", translation: "يتبع", pronunciation: "فولو", emoji: "👣" },
                { word: "stop", translation: "يتوقف", pronunciation: "ستوب", emoji: "🛑" },
                { word: "create", translation: "ينشئ", pronunciation: "كرييت", emoji: "🎨" },
                { word: "speak", translation: "يتكلم", pronunciation: "سبيك", emoji: "🗣️" },
                { word: "read", translation: "يقرأ", pronunciation: "ريد", emoji: "📖" },
                { word: "allow", translation: "يسمح", pronunciation: "ألاو", emoji: "✅" },
                { word: "add", translation: "يضيف", pronunciation: "آد", emoji: "➕" },
                { word: "spend", translation: "ينفق / يقضي", pronunciation: "سبيند", emoji: "💸" },
                { word: "grow", translation: "ينمو", pronunciation: "غرو", emoji: "🌱" },
                { word: "open", translation: "يفتح", pronunciation: "أوبن", emoji: "🚪" },
                { word: "walk", translation: "يمشي", pronunciation: "ووك", emoji: "🚶‍♂️" },
                { word: "win", translation: "يفوز", pronunciation: "وين", emoji: "🏆" },
                { word: "offer", translation: "يعرض", pronunciation: "أوفر", emoji: "🎁" },
                { word: "remember", translation: "يتذكر", pronunciation: "ريميمبر", emoji: "🧠" },
                { word: "love", translation: "يحب", pronunciation: "لوف", emoji: "❤️" },
                { word: "consider", translation: "يعتبر", pronunciation: "كونسيدر", emoji: "🤔" },
                { word: "appear", translation: "يظهر", pronunciation: "أبير", emoji: "👻" },
                { word: "buy", translation: "يشتري", pronunciation: "باي", emoji: "🛒" },
                { word: "wait", translation: "ينتظر", pronunciation: "ويت", emoji: "⏳" },
                { word: "serve", translation: "يخدم", pronunciation: "سيرف", emoji: "🍽️" },
                { word: "die", translation: "يموت", pronunciation: "داي", emoji: "💀" },
                { word: "send", translation: "يرسل", pronunciation: "سيند", emoji: "📤" },
                { word: "expect", translation: "يتوقع", pronunciation: "إكسبكت", emoji: "🔮" },
                { word: "build", translation: "يبني", pronunciation: "بيلد", emoji: "🏗️" },
                { word: "stay", translation: "يبقى", pronunciation: "ستاي", emoji: "🏨" },
                { word: "fall", translation: "يسقط", pronunciation: "فول", emoji: "🍂" },
                { word: "cut", translation: "يقطع", pronunciation: "كت", emoji: "✂️" },
                { word: "reach", translation: "يصل", pronunciation: "ريتش", emoji: "🏁" },
                { word: "kill", translation: "يقتل", pronunciation: "كيل", emoji: "🔪" },
                { word: "raise", translation: "يرفع", pronunciation: "ريز", emoji: "📈" },
                { word: "pass", translation: "يمر / ينجح", pronunciation: "باس", emoji: "✅" },
                { word: "sell", translation: "يبيع", pronunciation: "سيل", emoji: "🏷️" },
                { word: "decide", translation: "يقرر", pronunciation: "ديسايد", emoji: "⚖️" },
                { word: "return", translation: "يعود", pronunciation: "ريتيرن", emoji: "↩️" },
                { word: "explain", translation: "يشرح", pronunciation: "إكسبلين", emoji: "👨‍🏫" },
                { word: "hope", translation: "يأمل", pronunciation: "هوب", emoji: "🙏" },
                { word: "develop", translation: "يطور", pronunciation: "ديفيلوب", emoji: "💡" },
                { word: "carry", translation: "يحمل", pronunciation: "كاري", emoji: "🎒" },
                { word: "break", translation: "يكسر", pronunciation: "بريك", emoji: "💔" },
                { word: "receive", translation: "يستلم", pronunciation: "ريسيف", emoji: "📥" },
                { word: "agree", translation: "يوافق", pronunciation: "أغري", emoji: "👍" },
                { word: "support", translation: "يدعم", pronunciation: "سبورت", emoji: "🤝" },
                { word: "hit", translation: "يضرب", pronunciation: "هيت", emoji: "💥" },
                { word: "produce", translation: "ينتج", pronunciation: "بروديوس", emoji: "🏭" },
                { word: "eat", translation: "يأكل", pronunciation: "إيت", emoji: "🍔" },
                { word: "cover", translation: "يغطي", pronunciation: "كفر", emoji: "덮" },
                { word: "catch", translation: "يمسك", pronunciation: "كاتش", emoji: "⚾" },
                { word: "draw", translation: "يرسم", pronunciation: "درو", emoji: "🎨" },
                { word: "choose", translation: "يختار", pronunciation: "تشوز", emoji: "☑️" },
            ],
            readingExercises: [
                readingExercise("I need to go to work, but I want to stay home.", "ابحث عن الأفعال المتناقضة.", "أنا بحاجة للذهاب إلى العمل، لكني أريد أن أبقى في المنزل.", ["هو يرى ويسمع كل شيء.", "هل يمكنك أن تساعدني في حمل هذا؟", "هي تحاول أن تتعلم لغة جديدة."]),
                readingExercise("He can read and write in three languages.", "ابحث عن المهارات اللغوية.", "هو يستطيع القراءة والكتابة بثلاث لغات.", ["لا تتكلم وتأكل في نفس الوقت.", "سوف أعود بعد ساعة.", "هم يلعبون ويفوزون دائمًا."])
            ],
            listeningExercises: [
                listeningExercise("understand", "القدرة على إدراك معنى شيء ما.", ["explain", "decide", "ask"]),
                listeningExercise("eat", "فعل وضع الطعام في الفم.", ["drink", "sleep", "run"])
            ]
        },
        adjectives: {
            words: [
                { word: "good", translation: "جيد", pronunciation: "غوود", emoji: "👍" },
                { word: "bad", translation: "سيء", pronunciation: "باد", emoji: "👎" },
                { word: "new", translation: "جديد", pronunciation: "نيو", emoji: "✨" },
                { word: "old", translation: "قديم / كبير في السن", pronunciation: "أولد", emoji: "📜" },
                { word: "big", translation: "كبير", pronunciation: "بيغ", emoji: "🐘" },
                { word: "small", translation: "صغير", pronunciation: "سمول", emoji: "🐭" },
                { word: "long", translation: "طويل", pronunciation: "لونغ", emoji: "📏" },
                { word: "short", translation: "قصير", pronunciation: "شورت", emoji: "📏" },
                { word: "high", translation: "عالي", pronunciation: "هاي", emoji: "📈" },
                { word: "low", translation: "منخفض", pronunciation: "لو", emoji: "📉" },
                { word: "hot", translation: "حار", pronunciation: "هوت", emoji: "🔥" },
                { word: "cold", translation: "بارد", pronunciation: "كولد", emoji: "❄️" },
                { word: "happy", translation: "سعيد", pronunciation: "هابي", emoji: "😄" },
                { word: "sad", translation: "حزين", pronunciation: "ساد", emoji: "😢" },
                { word: "easy", translation: "سهل", pronunciation: "إيزي", emoji: "✅" },
                { word: "difficult", translation: "صعب", pronunciation: "ديفيكولت", emoji: "❌" },
                { word: "beautiful", translation: "جميل", pronunciation: "بيوتيفول", emoji: "😍" },
                { word: "ugly", translation: "قبيح", pronunciation: "أغلي", emoji: "🤢" },
                { word: "fast", translation: "سريع", pronunciation: "فاست", emoji: "🏃" },
                { word: "slow", translation: "بطيء", pronunciation: "سلو", emoji: "🐢" },
                { word: "important", translation: "مهم", pronunciation: "إمبورتانت", emoji: "⭐" },
                { word: "strong", translation: "قوي", pronunciation: "سترونغ", emoji: "💪" },
                { word: "weak", translation: "ضعيف", pronunciation: "ويك", emoji: "🤕" },
                { word: "right", translation: "صحيح / يمين", pronunciation: "رايت", emoji: "➡️" },
                { word: "wrong", translation: "خاطئ", pronunciation: "رونغ", emoji: "❌" },
                { word: "full", translation: "ممتلئ", pronunciation: "فول", emoji: "🈵" },
                { word: "empty", translation: "فارغ", pronunciation: "إمبتي", emoji: "🈳" },
                { word: "rich", translation: "غني", pronunciation: "ريتش", emoji: "💰" },
                { word: "poor", translation: "فقير", pronunciation: "بور", emoji: "🪙" },
                { word: "clean", translation: "نظيف", pronunciation: "كلين", emoji: "🧼" },
                { word: "dirty", translation: "متسخ", pronunciation: "ديرتي", emoji: "💩" },
                { word: "young", translation: "صغير في السن", pronunciation: "يانغ", emoji: "👶" },
                { word: "early", translation: "مبكر", pronunciation: "إيرلي", emoji: "🌅" },
                { word: "late", translation: "متأخر", pronunciation: "ليت", emoji: "🌃" },
                { word: "dark", translation: "مظلم", pronunciation: "دارك", emoji: "🌑" },
                { word: "light", translation: "مضيء / خفيف", pronunciation: "لايت", emoji: "💡" },
                { word: "hard", translation: "صعب / صلب", pronunciation: "هارد", emoji: "🧱" },
                { word: "soft", translation: "ناعم", pronunciation: "سوفت", emoji: "🧸" },
                { word: "true", translation: "حقيقي", pronunciation: "ترو", emoji: "✔️" },
                { word: "false", translation: "خاطئ", pronunciation: "فولس", emoji: "✖️" },
                { word: "kind", translation: "لطيف", pronunciation: "كايند", emoji: "😇" },
                { word: "clear", translation: "واضح", pronunciation: "كلير", emoji: "💎" },
                { word: "different", translation: "مختلف", pronunciation: "ديفرينت", emoji: "🔄" },
                { word: "same", translation: "نفس الشيء", pronunciation: "سيم", emoji: "↔️" },
            ],
            readingExercises: [
                readingExercise("The new car is fast, but the old car is slow.", "ابحث عن الصفات المتضادة.", "السيارة الجديدة سريعة، لكن السيارة القديمة بطيئة.", ["هذا الكتاب جيد وذلك سيء.", "هل السؤال سهل أم صعب؟", "الجو حار جدًا اليوم."]),
                readingExercise("She has a beautiful voice and a kind heart.", "ابحث عن الصفات الإيجابية.", "لديها صوت جميل وقلب لطيف.", ["الرجل القوي يساعد الرجل الضعيف.", "الغرفة نظيفة الآن.", "القصة طويلة ولكنها ليست مهمة."])
            ],
            listeningExercises: [
                listeningExercise("important", "صفة لشيء ذي قيمة أو أهمية كبيرة.", ["easy", "different", "wrong"]),
                listeningExercise("happy", "الشعور بالفرح أو الرضا.", ["sad", "angry", "tired"])
            ]
        },
        places: {
            words: [
                { word: "place", translation: "مكان", pronunciation: "بليس", emoji: "📍" },
                { word: "city", translation: "مدينة", pronunciation: "سيتي", emoji: "🏙️" },
                { word: "country", translation: "دولة / ريف", pronunciation: "كانتري", emoji: "🏞️" },
                { word: "world", translation: "عالم", pronunciation: "وورلد", emoji: "🌍" },
                { word: "school", translation: "مدرسة", pronunciation: "سكول", emoji: "🏫" },
                { word: "university", translation: "جامعة", pronunciation: "يونيفيرسيتي", emoji: "🎓" },
                { word: "hospital", translation: "مستشفى", pronunciation: "هوسبيتال", emoji: "🏥" },
                { word: "restaurant", translation: "مطعم", pronunciation: "ريستورانت", emoji: "🍔" },
                { word: "hotel", translation: "فندق", pronunciation: "هوتيل", emoji: "🏨" },
                { word: "airport", translation: "مطار", pronunciation: "إيربورت", emoji: "✈️" },
                { word: "station", translation: "محطة", pronunciation: "ستيشن", emoji: "🚉" },
                { word: "park", translation: "حديقة عامة", pronunciation: "بارك", emoji: "🌳" },
                { word: "beach", translation: "شاطئ", pronunciation: "بيتش", emoji: "🏖️" },
                { word: "library", translation: "مكتبة", pronunciation: "لايبراري", emoji: "📚" },
                { word: "bank", translation: "بنك", pronunciation: "بانك", emoji: "🏦" },
                { word: "office", translation: "مكتب", pronunciation: "أوفيس", emoji: "🏢" },
                { word: "store", translation: "متجر", pronunciation: "ستور", emoji: "🏬" },
                { word: "market", translation: "سوق", pronunciation: "ماركت", emoji: "🛒" },
                { word: "home", translation: "منزل / بيت", pronunciation: "هوم", emoji: "🏡" },
                { word: "room", translation: "غرفة", pronunciation: "روم", emoji: "🚪" },
                { word: "street", translation: "شارع", pronunciation: "ستريت", emoji: "🛣️" },
                { word: "road", translation: "طريق", pronunciation: "رود", emoji: "🛤️" },
                { word: "farm", translation: "مزرعة", pronunciation: "فارم", emoji: "🚜" },
                { word: "forest", translation: "غابة", pronunciation: "فوريست", emoji: "🌲" },
                { word: "mountain", translation: "جبل", pronunciation: "ماونتن", emoji: "⛰️" },
                { word: "river", translation: "نهر", pronunciation: "ريفر", emoji: "🏞️" },
                { word: "sea", translation: "بحر", pronunciation: "سي", emoji: "🌊" },
                { word: "building", translation: "مبنى", pronunciation: "بيلدينغ", emoji: "🏢" },
                { word: "church", translation: "كنيسة", pronunciation: "تشيرتش", emoji: "⛪" },
                { word: "mosque", translation: "مسجد", pronunciation: "موسك", emoji: "🕌" },
            ],
            readingExercises: [
                readingExercise("I go to school by bus, and then I go to the library.", "ابحث عن أماكن التعلم.", "أذهب إلى المدرسة بالحافلة، ثم أذهب إلى المكتبة.", ["المستشفى بجوار البنك.", "هل يوجد مطعم جيد في هذه المدينة؟", "نحن نعيش في شقة في مبنى كبير."]),
                readingExercise("In summer, we like to go to the beach or the park.", "ابحث عن أماكن الترفيه الصيفية.", "في الصيف، نحب أن نذهب إلى الشاطئ أو الحديقة.", ["المطار بعيد عن وسط المدينة.", "هناك سوق جديد في الشارع التالي.", "الفندق يقع على النهر."])
            ],
            listeningExercises: [
                listeningExercise("hospital", "المكان الذي تذهب إليه عندما تكون مريضاً.", ["school", "hotel", "bank"]),
                listeningExercise("city", "مكان كبير به الكثير من الناس والمباني.", ["country", "village", "farm"])
            ]
        },
        nature: {
            words: [
                { word: "nature", translation: "طبيعة", pronunciation: "نيتشر", emoji: "🏞️" },
                { word: "tree", translation: "شجرة", pronunciation: "تري", emoji: "🌳" },
                { word: "flower", translation: "زهرة", pronunciation: "فلاور", emoji: "🌸" },
                { word: "plant", translation: "نبات", pronunciation: "بلانت", emoji: "🌱" },
                { word: "grass", translation: "عشب", pronunciation: "غراس", emoji: "🌿" },
                { word: "sun", translation: "شمس", pronunciation: "صن", emoji: "☀️" },
                { word: "moon", translation: "قمر", pronunciation: "مون", emoji: "🌙" },
                { word: "star", translation: "نجمة", pronunciation: "ستار", emoji: "⭐" },
                { word: "sky", translation: "سماء", pronunciation: "سكاي", emoji: "☁️" },
                { word: "water", translation: "ماء", pronunciation: "ووتر", emoji: "💧" },
                { word: "fire", translation: "نار", pronunciation: "فاير", emoji: "🔥" },
                { word: "earth", translation: "أرض", pronunciation: "إيرث", emoji: "🌍" },
                { word: "air", translation: "هواء", pronunciation: "إير", emoji: "💨" },
                { word: "wind", translation: "رياح", pronunciation: "ويند", emoji: "💨" },
                { word: "rain", translation: "مطر", pronunciation: "رين", emoji: "🌧️" },
                { word: "snow", translation: "ثلج", pronunciation: "سنو", emoji: "❄️" },
                { word: "ice", translation: "جليد", pronunciation: "آيس", emoji: "🧊" },
                { word: "sea", translation: "بحر", pronunciation: "سي", emoji: "🌊" },
                { word: "ocean", translation: "محيط", pronunciation: "أوشن", emoji: "🌊" },
                { word: "river", translation: "نهر", pronunciation: "ريفر", emoji: "🏞️" },
                { word: "lake", translation: "بحيرة", pronunciation: "ليك", emoji: "🏞️" },
                { word: "mountain", translation: "جبل", pronunciation: "ماونتن", emoji: "⛰️" },
                { word: "hill", translation: "تل", pronunciation: "هيل", emoji: "🌄" },
                { word: "forest", translation: "غابة", pronunciation: "فوريست", emoji: "🌲" },
                { word: "island", translation: "جزيرة", pronunciation: "آيلاند", emoji: "🏝️" },
                { word: "desert", translation: "صحراء", pronunciation: "ديزرت", emoji: "🏜️" },
                { word: "rock", translation: "صخرة", pronunciation: "روك", emoji: "🪨" },
                { word: "sand", translation: "رمل", pronunciation: "ساند", emoji: "🏖️" },
            ],
            readingExercises: [
                readingExercise("The sun is in the sky, and the fish is in the sea.", "ابحث عن مكونات السماء والبحر.", "الشمس في السماء، والسمكة في البحر.", ["الجبل عالٍ والنهر طويل.", "الأشجار خضراء في الغابة.", "أحب صوت المطر والرياح."]),
                readingExercise("The flowers are beautiful in the spring.", "ابحث عن الزهور والربيع.", "الزهور جميلة في الربيع.", ["القطة تلعب بالكرة.", "الصحراء حارة وجافة.", "النار خطيرة."])
            ],
            listeningExercises: [
                listeningExercise("tree", "نبات كبير له جذع وأغصان.", ["flower", "grass", "mountain"]),
                listeningExercise("water", "سائل شفاف ضروري للحياة.", ["fire", "air", "sand"])
            ]
        },
        hobbies: {
            words: [
                { word: "hobby", translation: "هواية", pronunciation: "هوبي", emoji: "🎨" },
                { word: "reading", translation: "قراءة", pronunciation: "ريدينغ", emoji: "📖" },
                { word: "writing", translation: "كتابة", pronunciation: "رايتينغ", emoji: "✍️" },
                { word: "music", translation: "موسيقى", pronunciation: "ميوزيك", emoji: "🎵" },
                { word: "art", translation: "فن", pronunciation: "آرت", emoji: "🖼️" },
                { word: "drawing", translation: "رسم", pronunciation: "دروينغ", emoji: "✏️" },
                { word: "painting", translation: "تلوين", pronunciation: "بينتينغ", emoji: "🎨" },
                { word: "sport", translation: "رياضة", pronunciation: "سبورت", emoji: "⚽" },
                { word: "swimming", translation: "سباحة", pronunciation: "سويمينغ", emoji: "🏊" },
                { word: "running", translation: "جري", pronunciation: "رنّينغ", emoji: "🏃" },
                { word: "cooking", translation: "طبخ", pronunciation: "كوكينغ", emoji: "🍳" },
                { word: "watching movies", translation: "مشاهدة أفلام", pronunciation: "واتشينغ موفيز", emoji: "🎬" },
                { word: "playing games", translation: "لعب ألعاب", pronunciation: "بلاينغ غيمز", emoji: "🎮" },
                { word: "traveling", translation: "سفر", pronunciation: "ترافيلينغ", emoji: "✈️" },
                { word: "dancing", translation: "رقص", pronunciation: "دانسينغ", emoji: "💃" },
                { word: "singing", translation: "غناء", pronunciation: "سينغينغ", emoji: "🎤" },
                { word: "photography", translation: "تصوير فوتوغرافي", pronunciation: "فوتوغرافي", emoji: "📸" },
                { word: "gardening", translation: "بستنة", pronunciation: "غاردينينغ", emoji: "🪴" },
            ],
            readingExercises: [
                readingExercise("My hobby is reading books and listening to music.", "ابحث عن الهوايات المذكورة.", "هوايتي هي قراءة الكتب والاستماع إلى الموسيقى.", ["هو يحب ممارسة الرياضة والسباحة.", "هي جيدة في الطبخ والرسم.", "هل تحب السفر ولعب الألعاب؟"]),
                readingExercise("Watching movies is fun, but I prefer running outside.", "ابحث عن الهواية الداخلية والخارجية.", "مشاهدة الأفلام ممتعة، لكني أفضل الجري في الخارج.", ["الغناء والرقص يتطلبان موهبة.", "الكتابة هواية إبداعية.", "التصوير الفوتوغرافي يلتقط اللحظات الجميلة."])
            ],
            listeningExercises: [
                listeningExercise("music", "فن تنظيم الأصوات في الوقت المناسب.", ["art", "sport", "reading"]),
                listeningExercise("cooking", "تحضير الطعام عن طريق تسخينه.", ["swimming", "writing", "traveling"])
            ]
        },
        emotions: {
            words: [
                { word: "feeling", translation: "شعور", pronunciation: "فيلينغ", emoji: "❤️" },
                { word: "happy", translation: "سعيد", pronunciation: "هابي", emoji: "😄" },
                { word: "sad", translation: "حزين", pronunciation: "ساد", emoji: "😢" },
                { word: "angry", translation: "غاضب", pronunciation: "أنغري", emoji: "😠" },
                { word: "surprised", translation: "متفاجئ", pronunciation: "سيربرايزد", emoji: "😲" },
                { word: "scared", translation: "خائف", pronunciation: "سكيرد", emoji: "😨" },
                { word: "afraid", translation: "خائف", pronunciation: "أفريد", emoji: "😱" },
                { word: "tired", translation: "متعب", pronunciation: "تايرد", emoji: "😴" },
                { word: "bored", translation: "ملل", pronunciation: "بورد", emoji: "😒" },
                { word: "excited", translation: "متحمس", pronunciation: "إكسايتد", emoji: "🤩" },
                { word: "love", translation: "حب", pronunciation: "لوف", emoji: "❤️" },
                { word: "hate", translation: "كره", pronunciation: "هيت", emoji: "💔" },
                { word: "hope", translation: "أمل", pronunciation: "هوب", emoji: "🙏" },
                { word: "fear", translation: "خوف", pronunciation: "فير", emoji: "😨" },
                { word: "joy", translation: "فرح", pronunciation: "جوي", emoji: "😊" },
                { word: "proud", translation: "فخور", pronunciation: "براود", emoji: "ภูมิใจ" },
                { word: "shy", translation: "خجول", pronunciation: "شاي", emoji: "😊" },
                { word: "calm", translation: "هادئ", pronunciation: "كام", emoji: "😌" },
                { word: "worried", translation: "قلق", pronunciation: "ووريد", emoji: "😟" },
            ],
            readingExercises: [
                readingExercise("I feel happy when I see my friends, but I am sad to leave.", "ابحث عن المشاعر المتضادة.", "أشعر بالسعادة عندما أرى أصدقائي، لكني حزين للمغادرة.", ["هو غاضب لأنهم متأخرون.", "لا تكن خائفًا، كل شيء سيكون على ما يرام.", "أنا متحمس جدًا للرحلة."]),
                readingExercise("She was surprised by the gift and felt great joy.", "ابحث عن المشاعر الإيجابية.", "لقد تفاجأت بالهدية وشعرت بفرح كبير.", ["الطفل متعب ويريد النوم.", "أنا فخور بنجاحك.", "لا تقلق، كن هادئًا."])
            ],
            listeningExercises: [
                listeningExercise("angry", "الشعور أو إظهار الاستياء الشديد.", ["happy", "sad", "tired"]),
                listeningExercise("love", "شعور عميق بالمودة والمحبة.", ["hate", "fear", "hope"])
            ]
        },
        work: {
            words: [
                { word: "Work", translation: "عمل", pronunciation: "وورك", emoji: "🏢" },
                { word: "Job", translation: "وظيفة", pronunciation: "جوب", emoji: "💼" },
                { word: "Office", translation: "مكتب", pronunciation: "أوفيس", emoji: "🏢" },
                { word: "Company", translation: "شركة", pronunciation: "كومباني", emoji: "🏭" },
                { word: "Manager", translation: "مدير", pronunciation: "مانيجر", emoji: "👨‍💼" },
                { word: "Employee", translation: "موظف", pronunciation: "إمبلويي", emoji: "🧑‍💼" },
                { word: "Colleague", translation: "زميل", pronunciation: "كوليغ", emoji: "👥" },
                { word: "Salary", translation: "راتب", pronunciation: "سالاري", emoji: "💵" },
                { word: "Meeting", translation: "اجتماع", pronunciation: "ميتينغ", emoji: "🤝" },

                { word: "Email", translation: "بريد إلكتروني", pronunciation: "إيميل", emoji: "📧" },
                { word: "Computer", translation: "حاسوب", pronunciation: "كمبيوتر", emoji: "💻" },
                { word: "Phone", translation: "هاتف", pronunciation: "فون", emoji: "📱" },
                { word: "Project", translation: "مشروع", pronunciation: "بروجيكت", emoji: "📈" },
                { word: "Deadline", translation: "موعد نهائي", pronunciation: "ديدلاين", emoji: "⏳" },
                { word: "Task", translation: "مهمة", pronunciation: "تاسك", emoji: "📋" },
                { word: "Career", translation: "مهنة", pronunciation: "كاريير", emoji: "🚀" },
            ],
            readingExercises: [
                readingExercise("The manager has a meeting in the office.", "ابحث عن كلمات 'manager', 'meeting', 'office'.", "المدير لديه اجتماع في المكتب.", ["الموظف يعمل على الحاسوب.", "راتب هذه الوظيفة جيد.", "لقد أرسلت لك بريداً إلكترونياً."]),
                readingExercise("My colleague helped me finish the project before the deadline.", "ابحث عن كلمات العمل الجماعي والوقت.", "زميلي ساعدني في إنهاء المشروع قبل الموعد النهائي.", ["أستخدم هاتفي للتحقق من البريد الإلكتروني.", "هذه المهمة صعبة للغاية.", "أتمنى لك مهنة ناجحة."])
            ],
            listeningExercises: [
                listeningExercise("Office", "مكان العمل المكتبي.", ["Hotel", "School", "Airport"]),
                listeningExercise("Computer", "جهاز إلكتروني لمعالجة البيانات.", ["Phone", "Book", "Pen"])
            ]
        },
        travel: {
            words: [
                { word: "Travel", translation: "سفر", pronunciation: "ترافل", emoji: "🌍" },
                { word: "Trip", translation: "رحلة", pronunciation: "تريب", emoji: "✈️" },
                { word: "Holiday", translation: "عطلة", pronunciation: "هوليداي", emoji: "🏖️" },
                { word: "Vacation", translation: "إجازة", pronunciation: "فاكيشن", emoji: "🏖️" },
                { word: "Airport", translation: "مطار", pronunciation: "إيربورت", emoji: "✈️" },
                { word: "Airplane", translation: "طائرة", pronunciation: "إيربلاين", emoji: "✈️" },
                { word: "Passport", translation: "جواز سفر", pronunciation: "باسبورت", emoji: "🛂" },
                { word: "Ticket", translation: "تذكرة", pronunciation: "تيكيت", emoji: "🎟️" },
                { word: "Hotel", translation: "فندق", pronunciation: "هوتيل", emoji: "🏨" },
            ],
            readingExercises: [
                readingExercise("I need a passport and a ticket for the plane.", "Translate 'passport', 'ticket', 'plane'.", "أحتاج جواز سفر وتذكرة للطائرة.", ["The hotel is near the station.", "Is this your new car?", "Don't forget the map and the suitcase."])
            ],
            listeningExercises: [
                listeningExercise("Passport", "An official document for international travel.", ["Ticket", "Suitcase", "Hotel"])
            ]
        }
};
