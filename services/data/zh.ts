

import { CategoryContent, ReadingExercise, ListeningExercise } from '../../types';

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

export const CHINESE_CONTENT: { [categoryName: string]: CategoryContent; } = {
    alphabet: {
        words: [
            { word: "一", translation: "واحد / خط أفقي", pronunciation: "yī / héng", emoji: "1️⃣" },
            { word: "丨", translation: "خط عمودي", pronunciation: "shù", emoji: "🖌️" },
            { word: "丿", translation: "مائل لليسار", pronunciation: "piě", emoji: "🖌️" },
            { word: "丶", translation: "نقطة", pronunciation: "diǎn", emoji: "🖌️" },
            { word: "㇏", translation: "مائل لليمين", pronunciation: "nà", emoji: "🖌️" },
            { word: "二", translation: "اثنان", pronunciation: "èr", emoji: "2️⃣" },
            { word: "三", translation: "ثلاثة", pronunciation: "sān", emoji: "3️⃣" },
            { word: "十", translation: "عشرة", pronunciation: "shí", emoji: "🔟" },
            { word: "人", translation: "شخص", pronunciation: "rén", emoji: "🧍" },
            { word: "口", translation: "فم", pronunciation: "kǒu", emoji: "👄" },
            { word: "大", translation: "كبير", pronunciation: "dà", emoji: "🐘" },
            { word: "小", translation: "صغير", pronunciation: "xiǎo", emoji: "🐭" },
            { word: "上", translation: "فوق", pronunciation: "shàng", emoji: "🔼" },
            { word: "下", translation: "تحت", pronunciation: "xià", emoji: "🔽" },
            { word: "中", translation: "وسط", pronunciation: "zhōng", emoji: "🎯" },
            { word: "天", translation: "سماء / يوم", pronunciation: "tiān", emoji: "☀️" },
            { word: "日", translation: "شمس / يوم", pronunciation: "rì", emoji: "☀️" },
            { word: "月", translation: "قمر / شهر", pronunciation: "yuè", emoji: "🌙" },
            { word: "山", translation: "جبل", pronunciation: "shān", emoji: "⛰️" },
            { word: "水", translation: "ماء", pronunciation: "shuǐ", emoji: "💧" },
            { word: "火", translation: "نار", pronunciation: "huǒ", emoji: "🔥" },
            { word: "木", translation: "خشب / شجرة", pronunciation: "mù", emoji: "🌳" },
            { word: "王", translation: "ملك", pronunciation: "wáng", emoji: "👑" },
            { word: "玉", translation: "يشم (حجر كريم)", pronunciation: "yù", emoji: "💎" },
            { word: "女", translation: "امرأة", pronunciation: "nǚ", emoji: "👩" },
            { word: "子", translation: "طفل", pronunciation: "zǐ", emoji: "👶" },
        ],
        readingExercises: [
            readingExercise("一二三", "واحد، اثنان، ثلاثة", "واحد، اثنان، ثلاثة", ["شخص، كبير، صغير", "فوق، تحت، وسط", "شمس، قمر، نجمة"]),
            readingExercise("大火", "نار كبيرة", "نار كبيرة", ["جبل صغير", "ماء بارد", "شخص جيد"]),
            readingExercise("十个人", "عشرة أشخاص", "عشرة أشخاص", ["ثلاثة كتب", "يوم واحد", "فم صغير"])
        ],
        listeningExercises: [
            listeningExercise("人", "الرمز الذي يعني 'شخص'.", ["rén", "shān", "kǒu"]),
            listeningExercise("上", "الرمز الذي يعني 'فوق'.", ["shàng", "xià", "zhōng"]),
            listeningExercise("火", "الرمز الذي يعني 'نار'.", ["huǒ", "shuǐ", "mù"])
        ]
    },
    basics: {
        words: [
            { word: "我", translation: "أنا", pronunciation: "wǒ", emoji: "👤" },
            { word: "你", translation: "أنت", pronunciation: "nǐ", emoji: "👥" },
            { word: "他", translation: "هو", pronunciation: "tā", emoji: "👨" },
            { word: "她", translation: "هي", pronunciation: "tā", emoji: "👩" },
            { word: "我们", translation: "نحن", pronunciation: "wǒmen", emoji: "👨‍👩‍👧‍👦" },
            { word: "他们", translation: "هم", pronunciation: "tāmen", emoji: "👨‍👩‍👧‍👦" },
            { word: "是", translation: "يكون / نعم", pronunciation: "shì", emoji: "👍" },
            { word: "不", translation: "لا", pronunciation: "bù", emoji: "👎" },
            { word: "谢谢", translation: "شكراً", pronunciation: "xièxie", emoji: "😊" },
            { word: "对不起", translation: "آسف", pronunciation: "duìbuqǐ", emoji: "😔" },
            { word: "没关系", translation: "لا بأس", pronunciation: "méi guānxi", emoji: "👌" },
            { word: "什么", translation: "ماذا", pronunciation: "shénme", emoji: "❓" },
            { word: "哪里", translation: "أين", pronunciation: "nǎlǐ", emoji: "📍" },
            { word: "什么时候", translation: "متى", pronunciation: "shénme shíhou", emoji: "⏰" },
            { word: "谁", translation: "من", pronunciation: "shéi", emoji: "❓" },
            { word: "为什么", translation: "لماذا", pronunciation: "wèishénme", emoji: "🤔" },
            { word: "怎么", translation: "كيف", pronunciation: "zěnme", emoji: "🤔" },
            { word: "和", translation: "و", pronunciation: "hé", emoji: "&" },
            { word: "的", translation: "للملكية", pronunciation: "de", emoji: "🔗" },
            { word: "在", translation: "في", pronunciation: "zài", emoji: "📍" },
            { word: "有", translation: "يملك / يوجد", pronunciation: "yǒu", emoji: "🈶" },
            { word: "没有", translation: "لا يملك / لا يوجد", pronunciation: "méiyǒu", emoji: "🈚" },
            { word: "请", translation: "من فضلك", pronunciation: "qǐng", emoji: "🙏" },
            { word: "汉语", translation: "اللغة الصينية", pronunciation: "hànyǔ", emoji: "🇨🇳" },
            { word: "人", translation: "شخص", pronunciation: "rén", emoji: "🧍" },
        ],
        readingExercises: [
            readingExercise("你和我", "ضمائر", "أنت وأنا", ["هو وهي", "هم ونحن", "هذا وذاك"]),
            readingExercise("这是什么？", "سؤال عن شيء", "ما هذا؟", ["أين هو؟", "من أنت؟", "لماذا تبكي؟"]),
            readingExercise("我的汉语不好。", "وصف مستوى اللغة", "لغتي الصينية ليست جيدة.", ["أنا طالب.", "هو معلم.", "لدي كتاب."])
        ],
        listeningExercises: [
            listeningExercise("谢谢", "تُستخدم للتعبير عن الامتنان.", ["你好", "对不起", "再见"]),
            listeningExercise("什么", "كلمة استفهام تعني 'ماذا'.", ["哪里", "谁", "为什么"]),
            listeningExercise("在", "حرف جر يعني 'في' أو 'على'.", ["和", "的", "不"])
        ]
    },
    greetings: {
        words: [
            { word: "你好", translation: "مرحباً", pronunciation: "nǐ hǎo", emoji: "👋" },
            { word: "早上好", translation: "صباح الخير", pronunciation: "zǎoshang hǎo", emoji: "☀️" },
            { word: "下午好", translation: "مساء الخير (بعد الظهر)", pronunciation: "xiàwǔ hǎo", emoji: "🌇" },
            { word: "晚上好", translation: "مساء الخير", pronunciation: "wǎnshang hǎo", emoji: "🌃" },
            { word: "晚安", translation: "تصبح على خير", pronunciation: "wǎn'ān", emoji: "🌙" },
            { word: "再见", translation: "مع السلامة", pronunciation: "zàijiàn", emoji: "👋" },
            { word: "你好吗？", translation: "كيف حالك؟", pronunciation: "nǐ hǎo ma?", emoji: "❓" },
            { word: "我很好", translation: "أنا بخير", pronunciation: "wǒ hěn hǎo", emoji: "😊" },
            { word: "你呢？", translation: "وأنت؟", pronunciation: "nǐ ne?", emoji: "❓" },
            { word: "你叫什么名字？", translation: "ما اسمك؟", pronunciation: "nǐ jiào shénme míngzì?", emoji: "❓" },
            { word: "我叫...", translation: "اسمي هو...", pronunciation: "wǒ jiào...", emoji: "🏷️" },
            { word: "很高兴认识你", translation: "سررت بلقائك", pronunciation: "hěn gāoxìng rènshi nǐ", emoji: "🤝" },
            { word: "欢迎", translation: "أهلاً بك", pronunciation: "huānyíng", emoji: "🎉" },
            { word: "好久不见", translation: "لم أرك منذ وقت طويل", pronunciation: "hǎojiǔ bújiàn", emoji: "😯" },
            { word: "明天见", translation: "أراك غداً", pronunciation: "míngtiān jiàn", emoji: "🌅" },
        ],
        readingExercises: [
            readingExercise("你好吗？我很好。", "سؤال عن الحال وإجابته", "كيف حالك؟ أنا بخير.", ["ما اسمك؟ اسمي...", "صباح الخير. مساء الخير.", "شكراً. عفواً."]),
            readingExercise("早上好，你叫什么名字？", "تحية وسؤال عن الاسم", "صباح الخير، ما اسمك؟", ["تصبح على خير، أراك غداً.", "كيف حالك ومن أين أنت؟", "مع السلامة."]),
            readingExercise("很高兴认识你，明天见！", "وداع ولقاء", "سررت بلقائك، أراك غداً!", ["مرحباً، كيف حالك؟", "تصبح على خير.", "أهلاً بك في الصين."])
        ],
        listeningExercises: [
            listeningExercise("你好", "التحية الأكثر شيوعاً.", ["再见", "谢谢", "晚安"]),
            listeningExercise("再见", "تقال عند المغادرة.", ["你好", "早上好", "我很好"]),
            listeningExercise("我很好", "إجابة إيجابية على سؤال 'كيف حالك؟'", ["你好吗", "谢谢", "对不起"])
        ]
    },
    numbers: {
        words: [
            { word: "零", translation: "صفر", pronunciation: "líng", emoji: "0️⃣" },
            { word: "一", translation: "واحد", pronunciation: "yī", emoji: "1️⃣" },
            { word: "二", translation: "اثنان", pronunciation: "èr", emoji: "2️⃣" },
            { word: "三", translation: "ثلاثة", pronunciation: "sān", emoji: "3️⃣" },
            { word: "四", translation: "أربعة", pronunciation: "sì", emoji: "4️⃣" },
            { word: "五", translation: "خمسة", pronunciation: "wǔ", emoji: "5️⃣" },
            { word: "六", translation: "ستة", pronunciation: "liù", emoji: "6️⃣" },
            { word: "七", translation: "سبعة", pronunciation: "qī", emoji: "7️⃣" },
            { word: "八", translation: "ثمانية", pronunciation: "bā", emoji: "8️⃣" },
            { word: "九", translation: "تسعة", pronunciation: "jiǔ", emoji: "9️⃣" },
            { word: "十", translation: "عشرة", pronunciation: "shí", emoji: "🔟" },
            { word: "百", translation: "مئة", pronunciation: "bǎi", emoji: "💯" },
            { word: "千", translation: "ألف", pronunciation: "qiān", emoji: "1️⃣0️⃣0️⃣0️⃣" },
            { word: "万", translation: "عشرة آلاف", pronunciation: "wàn", emoji: "💰" },
            { word: "十一", translation: "أحد عشر", pronunciation: "shíyī", emoji: "1️⃣1️⃣" },
            { word: "二十", translation: "عشرون", pronunciation: "èrshí", emoji: "2️⃣0️⃣" },
            { word: "三十五", translation: "خمسة وثلاثون", pronunciation: "sānshíwǔ", emoji: "3️⃣5️⃣" },
            { word: "一百", translation: "مئة", pronunciation: "yìbǎi", emoji: "💯" },
            { word: "号码", translation: "رقم", pronunciation: "hàomǎ", emoji: "#️⃣" },
            { word: "个", translation: "وحدة عد عامة", pronunciation: "gè", emoji: "🍎" },
        ],
        readingExercises: [
            readingExercise("我有三个苹果。", "عدد الأشياء", "لدي ثلاث تفاحات.", ["هو عمره عشر سنوات.", "هذا يكلف مئة يوان.", "رقم هاتفي هو..."]),
            readingExercise("现在是下午四点。", "الوقت", "الآن الساعة الرابعة بعد الظهر.", ["هناك ثمانية أشخاص.", "اشتريت كتابين.", "الفصل في الطابق الخامس."])
        ],
        listeningExercises: [
            listeningExercise("十", "الرقم 10", ["一", "百", "五"]),
            listeningExercise("八", "الرقم 8", ["七", "九", "二"]),
            listeningExercise("二十", "الرقم 20", ["十二", "二", "两"])
        ]
    },
    colors: {
        words: [
            { word: "颜色", translation: "لون", pronunciation: "yánsè", emoji: "🎨" },
            { word: "红色", translation: "أحمر", pronunciation: "hóngsè", emoji: "🔴" },
            { word: "蓝色", translation: "أزرق", pronunciation: "lánsè", emoji: "🔵" },
            { word: "绿色", translation: "أخضر", pronunciation: "lǜsè", emoji: "🟢" },
            { word: "黄色", translation: "أصفر", pronunciation: "huángsè", emoji: "🟡" },
            { word: "黑色", translation: "أسود", pronunciation: "hēisè", emoji: "⚫" },
            { word: "白色", translation: "أبيض", pronunciation: "báisè", emoji: "⚪" },
            { word: "紫色", translation: "بنفسجي", pronunciation: "zǐsè", emoji: "🟣" },
            { word: "橙色", translation: "برتقالي", pronunciation: "chéngsè", emoji: "🟠" },
            { word: "棕色", translation: "بني", pronunciation: "zōngsè", emoji: "🟤" },
            { word: "粉红色", translation: "وردي", pronunciation: "fěnhóngsè", emoji: "🌸" },
            { word: "灰色", translation: "رمادي", pronunciation: "huīsè", emoji: "🐘" },
            { word: "金色", translation: "ذهبي", pronunciation: "jīnsè", emoji: "🥇" },
            { word: "银色", translation: "فضي", pronunciation: "yínsè", emoji: "🥈" },
        ],
        readingExercises: [
            readingExercise("天空是蓝色的。", "لون السماء", "السماء زرقاء.", ["العشب أخضر.", "الشمس صفراء.", "أحب اللون الأحمر."]),
            readingExercise("她穿着一件白色的连衣裙。", "لون الملابس", "هي ترتدي فستانًا أبيض.", ["سيارته سوداء.", "هذه وردة وردية.", "شعري بني."])
        ],
        listeningExercises: [
            listeningExercise("红色", "لون التفاح والعلم الصيني.", ["蓝色", "绿色", "黄色"]),
            listeningExercise("白色", "لون الثلج والسحاب.", ["黑色", "灰色", "粉红色"]),
            listeningExercise("绿色", "لون العشب والأشجار.", ["蓝色", "棕色", "紫色"])
        ]
    },
    family: {
        words: [
            { word: "家", translation: "عائلة/منزل", pronunciation: "jiā", emoji: "👨‍👩‍👧‍👦" },
            { word: "家人", translation: "أفراد العائلة", pronunciation: "jiārén", emoji: "👨‍👩‍👧‍👦" },
            { word: "爸爸", translation: "أب", pronunciation: "bàba", emoji: "👨" },
            { word: "妈妈", translation: "أم", pronunciation: "māma", emoji: "👩" },
            { word: "父母", translation: "والدين", pronunciation: "fùmǔ", emoji: "👨‍👩‍👧" },
            { word: "哥哥", translation: "أخ أكبر", pronunciation: "gēge", emoji: "👱‍♂️" },
            { word: "弟弟", translation: "أخ أصغر", pronunciation: "dìdi", emoji: "👦" },
            { word: "姐姐", translation: "أخت كبرى", pronunciation: "jiějie", emoji: "👱‍♀️" },
            { word: "妹妹", translation: "أخت صغرى", pronunciation: "mèimei", emoji: "👧" },
            { word: "丈夫", translation: "زوج", pronunciation: "zhàngfu", emoji: "🤵" },
            { word: "妻子", translation: "زوجة", pronunciation: "qīzi", emoji: "👰" },
            { word: "儿子", translation: "ابن", pronunciation: "érzi", emoji: "👦" },
            { word: "女儿", translation: "ابنة", pronunciation: "nǚ'ér", emoji: "👧" },
            { word: "孩子", translation: "طفل", pronunciation: "háizi", emoji: "👶" },
            { word: "爷爷", translation: "جد (من الأب)", pronunciation: "yéye", emoji: "👴" },
            { word: "奶奶", translation: "جدة (من الأب)", pronunciation: "nǎinai", emoji: "👵" },
        ],
        readingExercises: [
            readingExercise("这是我的爸爸和妈妈。", "تقديم الوالدين", "هذا أبي وهذه أمي.", ["لدي أخ أكبر وأخت صغرى.", "أنا أحب عائلتي.", "ابنه لطيف جداً."]),
            readingExercise("他有两个孩子，一个儿子一个女儿。", "الحديث عن الأطفال", "لديه طفلان، ابن وابنة.", ["زوجتي معلمة.", "جدي يبلغ من العمر 80 عاماً.", "أختي الكبرى طالبة جامعية."])
        ],
        listeningExercises: [
            listeningExercise("爸爸", "الكلمة التي تنادي بها والدك.", ["妈妈", "哥哥", "弟弟"]),
            listeningExercise("家", "كلمة تعني العائلة والمنزل.", ["人", "朋友", "爱"]),
            listeningExercise("姐姐", "أختك الأكبر منك سناً.", ["妹妹", "哥哥", "弟弟"])
        ]
    },
    food: {
        words: [
            { word: "饭", translation: "طعام/أرز", pronunciation: "fàn", emoji: "🍚" },
            { word: "菜", translation: "طبق/خضروات", pronunciation: "cài", emoji: "🥬" },
            { word: "水", translation: "ماء", pronunciation: "shuǐ", emoji: "💧" },
            { word: "茶", translation: "شاي", pronunciation: "chá", emoji: "🍵" },
            { word: "咖啡", translation: "قهوة", pronunciation: "kāfēi", emoji: "☕" },
            { word: "果汁", translation: "عصير", pronunciation: "guǒzhī", emoji: "🧃" },
            { word: "牛奶", translation: "حليب", pronunciation: "niúnǎi", emoji: "🥛" },
            { word: "面包", translation: "خبز", pronunciation: "miànbāo", emoji: "🍞" },
            { word: "米饭", translation: "أرز مطبوخ", pronunciation: "mǐfàn", emoji: "🍚" },
            { word: "面条", translation: "نودلز", pronunciation: "miàntiáo", emoji: "🍜" },
            { word: "鸡蛋", translation: "بيض", pronunciation: "jīdàn", emoji: "🥚" },
            { word: "鸡肉", translation: "لحم دجاج", pronunciation: "jīròu", emoji: "🍗" },
            { word: "猪肉", translation: "لحم خنزير", pronunciation: "zhūròu", emoji: "🥓" },
            { word: "牛肉", translation: "لحم بقر", pronunciation: "niúròu", emoji: "🥩" },
            { word: "鱼", translation: "سمك", pronunciation: "yú", emoji: "🐟" },
            { word: "水果", translation: "فاكهة", pronunciation: "shuǐguǒ", emoji: "🍎" },
            { word: "苹果", translation: "تفاحة", pronunciation: "píngguǒ", emoji: "🍎" },
            { word: "香蕉", translation: "موز", pronunciation: "xiāngjiāo", emoji: "🍌" },
            { word: "好吃", translation: "لذيذ", pronunciation: "hǎochī", emoji: "😋" },
            { word: "喝", translation: "يشرب", pronunciation: "hē", emoji: "🥤" },
            { word: "吃", translation: "يأكل", pronunciation: "chī", emoji: "🍔" },
        ],
        readingExercises: [
            readingExercise("我喜欢吃米饭和鸡肉。", "تفضيلات الطعام", "أحب أن آكل الأرز والدجاج.", ["هل تريد أن تشرب الشاي؟", "هذه الفاكهة حلوة جداً.", "النودلز الصينية لذيذة."]),
            readingExercise("请给我一杯水，谢谢。", "طلب شراب", "من فضلك أعطني كوب ماء، شكراً.", ["أنا لا آكل لحم الخنزير.", "الفطور هو بيض وخبز.", "هذا المطعم يقدم أطباقاً جيدة."])
        ],
        listeningExercises: [
            listeningExercise("吃", "فعل 'يأكل'.", ["喝", "看", "去"]),
            listeningExercise("水果", "كلمة عامة للفواكه.", ["蔬菜", "肉", "饭"]),
            listeningExercise("好吃", "صفة للطعام اللذيذ.", ["难吃", "好看", "好喝"])
        ]
    },
    time: {
        words: [
            { word: "时间", translation: "وقت", pronunciation: "shíjiān", emoji: "⏰" },
            { word: "点", translation: "ساعة (للإشارة للوقت)", pronunciation: "diǎn", emoji: "🕰️" },
            { word: "分", translation: "دقيقة", pronunciation: "fēn", emoji: "⏱️" },
            { word: "秒", translation: "ثانية", pronunciation: "miǎo", emoji: "⏱️" },
            { word: "今天", translation: "اليوم", pronunciation: "jīntiān", emoji: "👇" },
            { word: "明天", translation: "غداً", pronunciation: "míngtiān", emoji: "➡️" },
            { word: "昨天", translation: "أمس", pronunciation: "zuótiān", emoji: "⬅️" },
            { word: "早上", translation: "صباح", pronunciation: "zǎoshang", emoji: "🌅" },
            { word: "中午", translation: "ظهيرة", pronunciation: "zhōngwǔ", emoji: "☀️" },
            { word: "晚上", translation: "مساء", pronunciation: "wǎnshang", emoji: "🌃" },
            { word: "星期一", translation: "الإثنين", pronunciation: "xīngqīyī", emoji: " M" },
            { word: "星期天", translation: "الأحد", pronunciation: "xīngqītiān", emoji: "S" },
            { word: "月", translation: "شهر", pronunciation: "yuè", emoji: "🈷️" },
            { word: "年", translation: "سنة", pronunciation: "nián", emoji: "🎉" },
            { word: "现在", translation: "الآن", pronunciation: "xiànzài", emoji: "📍" },
        ],
        readingExercises: [
            readingExercise("现在几点了？", "سؤال عن الوقت", "كم الساعة الآن؟", ["ما هو تاريخ اليوم؟", "متى عيد ميلادك؟", "أراك غداً."]),
            readingExercise("我明天上午九点有会。", "تحديد موعد", "لدي اجتماع غداً الساعة التاسعة صباحاً.", ["لقد وصلت أمس.", "اليوم هو الأربعاء.", "أنا مشغول جداً هذا الأسبوع."])
        ],
        listeningExercises: [
            listeningExercise("今天", "اليوم الحالي.", ["明天", "昨天", "现在"]),
            listeningExercise("点", "تستخدم للساعة.", ["分", "秒", "小时"]),
            listeningExercise("星期一", "أول يوم في أسبوع العمل.", ["星期天", "周末", "月"])
        ]
    },
    weather: {
        words: [
            { word: "天气", translation: "الطقس", pronunciation: "tiānqì", emoji: "🌦️" },
            { word: "晴天", translation: "يوم مشمس", pronunciation: "qíngtiān", emoji: "☀️" },
            { word: "阴天", translation: "يوم غائم", pronunciation: "yīntiān", emoji: "☁️" },
            { word: "下雨", translation: "يمطر", pronunciation: "xià yǔ", emoji: "🌧️" },
            { word: "下雪", translation: "يثلج", pronunciation: "xià xuě", emoji: "❄️" },
            { word: "风", translation: "رياح", pronunciation: "fēng", emoji: "💨" },
            { word: "热", translation: "حار", pronunciation: "rè", emoji: "🌡️" },
            { word: "冷", translation: "بارد", pronunciation: "lěng", emoji: "🥶" },
            { word: "暖和", translation: "دافئ", pronunciation: "nuǎnhuo", emoji: "😊" },
            { word: "凉快", translation: "معتدل البرودة", pronunciation: "liángkuai", emoji: "😎" },
            { word: "温度", translation: "درجة الحرارة", pronunciation: "wēndù", emoji: "🌡️" },
        ],
        readingExercises: [
            readingExercise("今天天气怎么样？", "سؤال عن الطقس", "كيف هو طقس اليوم؟", ["هل ستمطر غداً؟", "أنا أحب الأيام المشمسة.", "الشتاء بارد جداً."]),
            readingExercise("外面很冷，多穿点衣服。", "نصيحة بخصوص الطقس", "الجو بارد في الخارج، ارتدِ المزيد من الملابس.", ["الصيف حار جداً.", "الرياح قوية اليوم.", "الثلج جميل."])
        ],
        listeningExercises: [
            listeningExercise("天气", "الكلمة العامة للطقس.", ["下雨", "风", "太阳"]),
            listeningExercise("热", "عندما تكون درجة الحرارة مرتفعة.", ["冷", "暖和", "凉快"]),
            listeningExercise("下雨", "عندما يسقط الماء من السماء.", ["下雪", "晴天", "阴天"])
        ]
    },
    home: {
        words: [
            { word: "家", translation: "منزل/بيت", pronunciation: "jiā", emoji: "🏠" },
            { word: "房间", translation: "غرفة", pronunciation: "fángjiān", emoji: "🚪" },
            { word: "卧室", translation: "غرفة نوم", pronunciation: "wòshì", emoji: "🛏️" },
            { word: "洗手间", translation: "حمام", pronunciation: "xǐshǒujiān", emoji: "🛁" },
            { word: "厨房", translation: "مطبخ", pronunciation: "chúfáng", emoji: "🍳" },
            { word: "客厅", translation: "غرفة معيشة", pronunciation: "kètīng", emoji: "🛋️" },
            { word: "门", translation: "باب", pronunciation: "mén", emoji: "🚪" },
            { word: "窗户", translation: "نافذة", pronunciation: "chuānghu", emoji: "🪟" },
            { word: "桌子", translation: "طاولة", pronunciation: "zhuōzi", emoji: "🪵" },
            { word: "椅子", translation: "كرسي", pronunciation: "yǐzi", emoji: "🪑" },
            { word: "床", translation: "سرير", pronunciation: "chuáng", emoji: "🛏️" },
            { word: "沙发", translation: "أريكة", pronunciation: "shāfā", emoji: "🛋️" },
            { word: "灯", translation: "مصباح", pronunciation: "dēng", emoji: "💡" },
            { word: "钥匙", translation: "مفتاح", pronunciation: "yàoshi", emoji: "🔑" },
            { word: "电视", translation: "تلفاز", pronunciation: "diànshì", emoji: "📺" },
        ],
        readingExercises: [
            readingExercise("我的房间里有一张床和一张桌子。", "وصف الغرفة", "يوجد في غرفتي سرير وطاولة.", ["المطبخ كبير جداً.", "أين هو الحمام؟", "من فضلك أغلق الباب."]),
            readingExercise("猫在沙发上睡觉。", "وصف مكان", "القطة نائمة على الأريكة.", ["هل لديك مفتاح؟", "غرفة المعيشة مضيئة.", "افتح النافذة."])
        ],
        listeningExercises: [
            listeningExercise("家", "المكان الذي تعيش فيه.", ["学校", "公司", "商店"]),
            listeningExercise("房间", "كلمة عامة تعني 'غرفة'.", ["门", "床", "家"]),
            listeningExercise("厨房", "المكان الذي تطبخ فيه.", ["卧室", "客厅", "洗手间"])
        ]
    },
    shopping: {
        words: [
            { word: "买", translation: "يشتري", pronunciation: "mǎi", emoji: "🛍️" },
            { word: "卖", translation: "يبيع", pronunciation: "mài", emoji: "🏷️" },
            { word: "商店", translation: "متجر", pronunciation: "shāngdiàn", emoji: "🏬" },
            { word: "超市", translation: "سوبر ماركت", pronunciation: "chāoshì", emoji: "🏪" },
            { word: "钱", translation: "مال", pronunciation: "qián", emoji: "💰" },
            { word: "多少钱？", translation: "كم السعر؟", pronunciation: "duōshao qián?", emoji: "💲" },
            { word: "贵", translation: "غالي", pronunciation: "guì", emoji: "💎" },
            { word: "便宜", translation: "رخيص", pronunciation: "piányi", emoji: "🪙" },
            { word: "元", translation: "يوان (عملة)", pronunciation: "yuán", emoji: "💴" },
            { word: "信用卡", translation: "بطاقة ائتمان", pronunciation: "xìnyòngkǎ", emoji: "💳" },
            { word: "现金", translation: "نقد", pronunciation: "xiànjīn", emoji: "💵" },
            { word: "东西", translation: "شيء/أشياء", pronunciation: "dōngxi", emoji: "📦" },
        ],
        readingExercises: [
            readingExercise("这个多少钱？", "سؤال عن السعر", "كم سعر هذا؟", ["أريد شراء ذلك.", "هذا غالي جداً.", "هل يمكنني استخدام بطاقة الائتمان؟"]),
            readingExercise("我去超市买东西。", "الذهاب للتسوق", "أذهب إلى السوبر ماركت لشراء الأشياء.", ["هذا المتجر لديه ملابس جميلة.", "الدفع نقداً أرخص.", "هذه التفاحة تكلف 5 يوان."])
        ],
        listeningExercises: [
            listeningExercise("买", "فعل 'يشتري'.", ["卖", "去", "吃"]),
            listeningExercise("钱", "ما تستخدمه للشراء.", ["商店", "东西", "颜色"]),
            listeningExercise("便宜", "عكس 'غالي'.", ["贵", "好", "大"])
        ]
    },
    body: {
        words: [
            { word: "身体", translation: "جسم", pronunciation: "shēntǐ", emoji: "🧍" },
            { word: "头", translation: "رأس", pronunciation: "tóu", emoji: "👤" },
            { word: "脸", translation: "وجه", pronunciation: "liǎn", emoji: "😊" },
            { word: "眼睛", translation: "عين", pronunciation: "yǎnjing", emoji: "👁️" },
            { word: "鼻子", translation: "أنف", pronunciation: "bízi", emoji: "👃" },
            { word: "嘴巴", translation: "فم", pronunciation: "zuǐba", emoji: "👄" },
            { word: "耳朵", translation: "أذن", pronunciation: "ěrduo", emoji: "👂" },
            { word: "头发", translation: "شعر", pronunciation: "tóufa", emoji: "👱" },
            { word: "牙齿", translation: "سن", pronunciation: "yáchǐ", emoji: "🦷" },
            { word: "手", translation: "يد", pronunciation: "shǒu", emoji: "✋" },
            { word: "脚", translation: "قدم", pronunciation: "jiǎo", emoji: "🦶" },
            { word: "腿", translation: "ساق", pronunciation: "tuǐ", emoji: "🦵" },
            { word: "心", translation: "قلب", pronunciation: "xīn", emoji: "❤️" },
            { word: "肚子", translation: "بطن", pronunciation: "dùzi", emoji: "🍔" },
        ],
        readingExercises: [
            readingExercise("我头疼。", "شكوى من ألم", "رأسي يؤلمني.", ["عيناي كبيرتان.", "شعره طويل.", "اغسل يديك."]),
            readingExercise("他有蓝色的眼睛。", "وصف المظهر", "لديه عيون زرقاء.", ["أنفي صغير.", "أسناني بيضاء.", "قدمي تؤلمني."])
        ],
        listeningExercises: [
            listeningExercise("身体", "الكلمة العامة للجسم.", ["头", "手", "脚"]),
            listeningExercise("眼睛", "تستخدمها للرؤية.", ["耳朵", "鼻子", "嘴巴"]),
            listeningExercise("手", "الجزء من الجسم في نهاية الذراع.", ["脚", "腿", "头"])
        ]
    },
    clothing: {
        words: [
            { word: "衣服", translation: "ملابس", pronunciation: "yīfu", emoji: "👕" },
            { word: "衬衫", translation: "قميص", pronunciation: "chènshān", emoji: "👔" },
            { word: "T恤", translation: "تي شيرت", pronunciation: "T-xù", emoji: "👕" },
            { word: "裤子", translation: "بنطال", pronunciation: "kùzi", emoji: "👖" },
            { word: "裙子", translation: "تنورة/فستان", pronunciation: "qúnzi", emoji: "👗" },
            { word: "外套", translation: "سترة/معطف", pronunciation: "wàitào", emoji: "🧥" },
            { word: "鞋子", translation: "حذاء", pronunciation: "xiézi", emoji: "👟" },
            { word: "袜子", translation: "جوارب", pronunciation: "wàzi", emoji: "🧦" },
            { word: "帽子", translation: "قبعة", pronunciation: "màozi", emoji: "🧢" },
            { word: "穿", translation: "يرتدي", pronunciation: "chuān", emoji: "🧑‍" },
        ],
        readingExercises: [
            readingExercise("我喜欢这件红色的T恤。", "تفضيل الملابس", "أحب هذا التي شيرت الأحمر.", ["هذا البنطال كبير جداً.", "هي ترتدي فستاناً جميلاً.", "أين حذائي؟"]),
            readingExercise("今天很冷，你需要穿外套。", "نصيحة للملابس", "الجو بارد اليوم، تحتاج إلى ارتداء سترة.", ["أنا أبحث عن قبعة.", "جواربي زرقاء.", "هو لا يحب ارتداء القمصان."])
        ],
        listeningExercises: [
            listeningExercise("衣服", "الكلمة العامة للملابس.", ["裤子", "鞋子", "帽子"]),
            listeningExercise("穿", "فعل 'يرتدي'.", ["买", "看", "吃"]),
            listeningExercise("裙子", "ملابس ترتديها النساء عادة.", ["裤子", "衬衫", "外套"])
        ]
    },
    verbs: {
        words: [
            { word: "是", translation: "يكون", pronunciation: "shì", emoji: "✅" },
            { word: "有", translation: "يملك/يوجد", pronunciation: "yǒu", emoji: "🈶" },
            { word: "去", translation: "يذهب", pronunciation: "qù", emoji: "🚶" },
            { word: "来", translation: "يأتي", pronunciation: "lái", emoji: "👋" },
            { word: "看", translation: "يرى/ينظر", pronunciation: "kàn", emoji: "👀" },
            { word: "听", translation: "يسمع", pronunciation: "tīng", emoji: "👂" },
            { word: "说", translation: "يقول/يتحدث", pronunciation: "shuō", emoji: "🗣️" },
            { word: "读", translation: "يقرأ", pronunciation: "dú", emoji: "📖" },
            { word: "写", translation: "يكتب", pronunciation: "xiě", emoji: "✍️" },
            { word: "吃", translation: "يأكل", pronunciation: "chī", emoji: "🍔" },
            { word: "喝", translation: "يشرب", pronunciation: "hē", emoji: "🥤" },
            { word: "做", translation: "يفعل/يصنع", pronunciation: "zuò", emoji: "💪" },
            { word: "买", translation: "يشتري", pronunciation: "mǎi", emoji: "🛒" },
            { word: "卖", translation: "يبيع", pronunciation: "mài", emoji: "🏷️" },
            { word: "想", translation: "يريد/يفكر", pronunciation: "xiǎng", emoji: "🤔" },
            { word: "要", translation: "يريد/سوف", pronunciation: "yào", emoji: "🙋" },
            { word: "爱", translation: "يحب", pronunciation: "ài", emoji: "❤️" },
            { word: "喜欢", translation: "يعجب بـ", pronunciation: "xǐhuan", emoji: "👍" },
            { word: "学习", translation: "يدرس", pronunciation: "xuéxí", emoji: "🎓" },
            { word: "工作", translation: "يعمل", pronunciation: "gōngzuò", emoji: "💼" },
        ],
        readingExercises: [
            readingExercise("我想去中国。", "التعبير عن رغبة", "أريد أن أذهب إلى الصين.", ["هو يحب قراءة الكتب.", "ماذا تفعل؟", "أنا أدرس اللغة الصينية."]),
            readingExercise("他每天看电视。", "نشاط يومي", "هو يشاهد التلفاز كل يوم.", ["أنا لا أشرب القهوة.", "هي تكتب رسالة.", "نحن نأكل في مطعم."])
        ],
        listeningExercises: [
            listeningExercise("去", "فعل 'يذهب'.", ["来", "是", "有"]),
            listeningExercise("学习", "فعل 'يدرس'.", ["工作", "看", "吃"]),
            listeningExercise("喜欢", "فعل 'يعجب بـ'.", ["爱", "想", "要"])
        ]
    },
    adjectives: {
        words: [
            { word: "好", translation: "جيد", pronunciation: "hǎo", emoji: "👍" },
            { word: "坏", translation: "سيء", pronunciation: "huài", emoji: "👎" },
            { word: "大", translation: "كبير", pronunciation: "dà", emoji: "🐘" },
            { word: "小", translation: "صغير", pronunciation: "xiǎo", emoji: "🐭" },
            { word: "多", translation: "كثير", pronunciation: "duō", emoji: "➕" },
            { word: "少", translation: "قليل", pronunciation: "shǎo", emoji: "➖" },
            { word: "新", translation: "جديد", pronunciation: "xīn", emoji: "✨" },
            { word: "旧", translation: "قديم", pronunciation: "jiù", emoji: "📜" },
            { word: "高", translation: "عالي/طويل", pronunciation: "gāo", emoji: "🦒" },
            { word: "矮", translation: "قصير", pronunciation: "ǎi", emoji: "👦" },
            { word: "长", translation: "طويل (للطول)", pronunciation: "cháng", emoji: "📏" },
            { word: "短", translation: "قصير (للطول)", pronunciation: "duǎn", emoji: "📏" },
            { word: "漂亮", translation: "جميل", pronunciation: "piàoliang", emoji: "😍" },
            { word: "帅", translation: "وسيم", pronunciation: "shuài", emoji: "😎" },
            { word: "高兴", translation: "سعيد", pronunciation: "gāoxìng", emoji: "😄" },
            { word: "难过", translation: "حزين", pronunciation: "nánguò", emoji: "😢" },
            { word: "忙", translation: "مشغول", pronunciation: "máng", emoji: "🏃‍♂️" },
            { word: "累", translation: "متعب", pronunciation: "lèi", emoji: "😴" },
        ],
        readingExercises: [
            readingExercise("这个苹果很大。", "وصف الحجم", "هذه التفاحة كبيرة.", ["ذلك المنزل صغير.", "ملابسي جديدة.", "هذا الكتاب جيد جداً."]),
            readingExercise("她很高兴因为今天是她的生日。", "سبب السعادة", "هي سعيدة لأن اليوم عيد ميلادها.", ["أنا متعب جداً اليوم.", "هو رجل وسيم.", "الطقس سيء."])
        ],
        listeningExercises: [
            listeningExercise("大", "عكس 'صغير'.", ["小", "多", "少"]),
            listeningExercise("漂亮", "صفة للجمال.", ["丑", "好", "坏"]),
            listeningExercise("忙", "عندما يكون لديك الكثير من العمل.", ["累", "闲", "高兴"])
        ]
    },
    places: {
        words: [
            { word: "地方", translation: "مكان", pronunciation: "dìfang", emoji: "📍" },
            { word: "中国", translation: "الصين", pronunciation: "zhōngguó", emoji: "🇨🇳" },
            { word: "学校", translation: "مدرسة", pronunciation: "xuéxiào", emoji: "🏫" },
            { word: "大学", translation: "جامعة", pronunciation: "dàxué", emoji: "🎓" },
            { word: "医院", translation: "مستشفى", pronunciation: "yīyuàn", emoji: "🏥" },
            { word: "饭店", translation: "مطعم/فندق", pronunciation: "fàndiàn", emoji: "🏨" },
            { word: "飞机场", translation: "مطار", pronunciation: "fēijīchǎng", emoji: "✈️" },
            { word: "火车站", translation: "محطة قطار", pronunciation: "huǒchēzhàn", emoji: "🚉" },
            { word: "公园", translation: "حديقة عامة", pronunciation: "gōngyuán", emoji: "🌳" },
            { word: "图书馆", translation: "مكتبة", pronunciation: "túshūguǎn", emoji: "📚" },
            { word: "银行", translation: "بنك", pronunciation: "yínháng", emoji: "🏦" },
            { word: "公司", translation: "شركة", pronunciation: "gōngsī", emoji: "🏢" },
            { word: "家", translation: "منزل", pronunciation: "jiā", emoji: "🏡" },
            { word: "电影院", translation: "سينما", pronunciation: "diànyǐngyuàn", emoji: "🎬" },
        ],
        readingExercises: [
            readingExercise("学校在哪里？", "سؤال عن مكان", "أين هي المدرسة؟", ["أنا في المنزل.", "هو في المستشفى.", "لنذهب إلى السينما."]),
            readingExercise("我坐火车去北京。", "السفر إلى مكان", "أسافر إلى بكين بالقطار.", ["المكتبة بجوار البنك.", "هذا المطعم مشهور.", "الشركة في وسط المدينة."])
        ],
        listeningExercises: [
            listeningExercise("学校", "المكان الذي يدرس فيه الطلاب.", ["医院", "公司", "饭店"]),
            listeningExercise("家", "المكان الذي تعيش فيه.", ["公园", "商店", "银行"]),
            listeningExercise("飞机场", "المكان الذي تقلع منه الطائرات.", ["火车站", "地铁站", "公共汽车站"])
        ]
    },
    nature: {
        words: [
            { word: "自然", translation: "طبيعة", pronunciation: "zìrán", emoji: "🏞️" },
            { word: "树", translation: "شجرة", pronunciation: "shù", emoji: "🌳" },
            { word: "花", translation: "زهرة", pronunciation: "huā", emoji: "🌸" },
            { word: "草", translation: "عشب", pronunciation: "cǎo", emoji: "🌿" },
            { word: "太阳", translation: "شمس", pronunciation: "tàiyáng", emoji: "☀️" },
            { word: "月亮", translation: "قمر", pronunciation: "yuèliang", emoji: "🌙" },
            { word: "星星", translation: "نجمة", pronunciation: "xīngxing", emoji: "⭐" },
            { word: "天", translation: "سماء", pronunciation: "tiān", emoji: "☁️" },
            { word: "火", translation: "نار", pronunciation: "huǒ", emoji: "🔥" },
            { word: "山", translation: "جبل", pronunciation: "shān", emoji: "⛰️" },
            { word: "河", translation: "نهر", pronunciation: "hé", emoji: "🏞️" },
            { word: "海", translation: "بحر", pronunciation: "hǎi", emoji: "🌊" },
            { word: "动物", translation: "حيوان", pronunciation: "dòngwù", emoji: "🐾" },
            { word: "狗", translation: "كلب", pronunciation: "gǒu", emoji: "🐕" },
            { word: "猫", translation: "قطة", pronunciation: "māo", emoji: "🐈" },
            { word: "鸟", translation: "طائر", pronunciation: "niǎo", emoji: "🐦" },
        ],
        readingExercises: [
            readingExercise("公园里有很多树和花。", "وصف الحديقة", "يوجد الكثير من الأشجار والزهور في الحديقة.", ["الجبل عال جداً.", "أنا أحب البحر.", "انظر، هناك طائر جميل."]),
            readingExercise("晚上的月亮很亮。", "وصف القمر", "قمر الليلة مضيء جداً.", ["الشمس حارة.", "النار خطيرة.", "القطة لطيفة."])
        ],
        listeningExercises: [
            listeningExercise("动物", "كلمة عامة للحيوانات.", ["植物", "自然", "人"]),
            listeningExercise("太阳", "النجم الذي يضيء في النهار.", ["月亮", "星星", "天"]),
            listeningExercise("猫", "حيوان أليف يقول 'مواء'.", ["狗", "鸟", "鱼"])
        ]
    },
    hobbies: {
        words: [
            { word: "爱好", translation: "هواية", pronunciation: "àihào", emoji: "🎨" },
            { word: "看书", translation: "قراءة الكتب", pronunciation: "kàn shū", emoji: "📖" },
            { word: "听音乐", translation: "الاستماع للموسيقى", pronunciation: "tīng yīnyuè", emoji: "🎵" },
            { word: "看电影", translation: "مشاهدة الأفلام", pronunciation: "kàn diànyǐng", emoji: "🎬" },
            { word: "运动", translation: "رياضة", pronunciation: "yùndòng", emoji: "⚽" },
            { word: "画画", translation: "رسم", pronunciation: "huàhuà", emoji: "✏️" },
            { word: "旅游", translation: "سفر", pronunciation: "lǚyóu", emoji: "✈️" },
            { word: "做饭", translation: "طبخ", pronunciation: "zuò fàn", emoji: "🍳" },
            { word: "玩游戏", translation: "لعب الألعاب", pronunciation: "wán yóuxì", emoji: "🎮" },
            { word: "照相", translation: "تصوير", pronunciation: "zhàoxiàng", emoji: "📸" },
            { word: "跳舞", translation: "رقص", pronunciation: "tiàowǔ", emoji: "💃" },
            { word: "唱歌", translation: "غناء", pronunciation: "chànggē", emoji: "🎤" },
            { word: "买东西", translation: "تسوق", pronunciation: "mǎi dōngxi", emoji: "🛍️" },
        ],
        readingExercises: [
            readingExercise("我的爱好是看书和听音乐。", "التحدث عن الهوايات", "هوايتي هي قراءة الكتب والاستماع للموسيقى.", ["هو يحب ممارسة الرياضة.", "هل تحب السفر؟", "هي جيدة جداً في الطبخ."]),
            readingExercise("我们周末去看电影吧。", "اقتراح نشاط", "لنذهب لمشاهدة فيلم في نهاية الأسبوع.", ["هو يحب لعب ألعاب الكمبيوتر.", "الرقص هواية جيدة.", "أخي يحب الغناء."])
        ],
        listeningExercises: [
            listeningExercise("爱好", "الشيء الذي تحب أن تفعله في وقت فراغك.", ["工作", "学习", "家"]),
            listeningExercise("运动", "نشاط بدني مثل كرة القدم أو السباحة.", ["音乐", "电影", "看书"]),
            listeningExercise("旅游", "فعل زيارة أماكن جديدة.", ["做饭", "画画", "唱歌"])
        ]
    },
    emotions: {
        words: [
            { word: "高兴", translation: "سعيد", pronunciation: "gāoxìng", emoji: "😄" },
            { word: "开心", translation: "مسرور", pronunciation: "kāixīn", emoji: "😊" },
            { word: "难过", translation: "حزين", pronunciation: "nánguò", emoji: "😢" },
            { word: "生气", translation: "غاضب", pronunciation: "shēngqì", emoji: "😠" },
            { word: "害怕", translation: "خائف", pronunciation: "hàipà", emoji: "😨" },
            { word: "累", translation: "متعب", pronunciation: "lèi", emoji: "😴" },
            { word: "无聊", translation: "ملل", pronunciation: "wúliáo", emoji: "😒" },
            { word: "兴奋", translation: "متحمس", pronunciation: "xīngfèn", emoji: "🤩" },
            { word: "爱", translation: "حب", pronunciation: "ài", emoji: "❤️" },
            { word: "喜欢", translation: "إعجاب", pronunciation: "xǐhuan", emoji: "👍" },
            { word: "担心", translation: "قلق", pronunciation: "dānxīn", emoji: "😟" },
            { word: "惊讶", translation: "متفاجئ", pronunciation: "jīngyà", emoji: "😲" },
            { word: "紧张", translation: "متوتر", pronunciation: "jǐnzhāng", emoji: "😥" },
        ],
        readingExercises: [
            readingExercise("见到你我很高兴。", "التعبير عن السعادة", "أنا سعيد جداً لرؤيتك.", ["لماذا أنت غاضب؟", "لا تخف.", "أنا متعب قليلاً."]),
            readingExercise("他考试没考好，很难过。", "سبب الحزن", "هو حزين لأنه لم يبلي حسناً في الامتحان.", ["لا تقلق عليه.", "أنا متحمس جداً للرحلة.", "هذا الفيلم ممل."])
        ],
        listeningExercises: [
            listeningExercise("高兴", "الشعور بالسعادة.", ["难过", "生气", "害怕"]),
            listeningExercise("累", "عندما تحتاج إلى الراحة.", ["忙", "饿", "渴"]),
            listeningExercise("爱", "شعور قوي بالمودة.", ["喜欢", "恨", "怕"])
        ]
    },
    work: {
        words: [
            { word: "工作", translation: "عمل", pronunciation: "gōngzuò", emoji: "🏢" },
            { word: "公司", translation: "شركة", pronunciation: "gōngsī", emoji: "🏭" },
            { word: "办公室", translation: "مكتب", pronunciation: "bàngōngshì", emoji: "🏢" },
            { word: "经理", translation: "مدير", pronunciation: "jīnglǐ", emoji: "👨‍💼" },
            { word: "同事", translation: "زميل", pronunciation: "tóngshì", emoji: "👥" },
            { word: "工资", translation: "راتب", pronunciation: "gōngzī", emoji: "💵" },
            { word: "会议", translation: "اجتماع", pronunciation: "huìyì", emoji: "🤝" },
            { word: "电子邮件", translation: "بريد إلكتروني", pronunciation: "diànzǐ yóujiàn", emoji: "📧" },
            { word: "电脑", translation: "حاسوب", pronunciation: "diànnǎo", emoji: "💻" },
            { word: "电话", translation: "هاتف", pronunciation: "diànhuà", emoji: "📱" },
            { word: "项目", translation: "مشروع", pronunciation: "xiàngmù", emoji: "📈" },
            { word: "忙", translation: "مشغول", pronunciation: "máng", emoji: "🏃‍♂️" },
            { word: "加班", translation: "عمل إضافي", pronunciation: "jiābān", emoji: "🌃" },
            { word: "放假", translation: "أخذ إجازة", pronunciation: "fàngjià", emoji: "🏖️" },
            { word: "医生", translation: "طبيب", pronunciation: "yīshēng", emoji: "🧑‍⚕️" },
            { word: "老师", translation: "معلم", pronunciation: "lǎoshī", emoji: "👨‍🏫" },
            { word: "学生", translation: "طالب", pronunciation: "xuésheng", emoji: "🧑‍🎓" },
        ],
        readingExercises: [
            readingExercise("我在一家中国公司工作。", "مكان العمل", "أنا أعمل في شركة صينية.", ["المدير في اجتماع.", "راتبي ليس مرتفعاً.", "أنا مشغول جداً هذا الأسبوع."]),
            readingExercise("请给我你的电话号码。", "طلب معلومات الاتصال", "من فضلك أعطني رقم هاتفك.", ["زميلي لطيف جداً.", "لدينا مشروع جديد.", "غداً سآخذ إجازة."])
        ],
        listeningExercises: [
            listeningExercise("工作", "الكلمة العامة للعمل أو الوظيفة.", ["公司", "学校", "家"]),
            listeningExercise("会议", "اجتماع لمناقشة أمور العمل.", ["假期", "项目", "工资"]),
            listeningExercise("老师", "الشخص الذي يعلم في المدرسة.", ["医生", "学生", "经理"])
        ]
    },
    travel: {
        words: [
            { word: "旅游", translation: "سفر/سياحة", pronunciation: "lǚyóu", emoji: "🌍" },
            { word: "假期", translation: "عطلة", pronunciation: "jiàqī", emoji: "🏖️" },
            { word: "飞机场", translation: "مطار", pronunciation: "fēijīchǎng", emoji: "✈️" },
            { word: "飞机", translation: "طائرة", pronunciation: "fēijī", emoji: "✈️" },
            { word: "护照", translation: "جواز سفر", pronunciation: "hùzhào", emoji: "🛂" },
            { word: "票", translation: "تذكرة", pronunciation: "piào", emoji: "🎟️" },
            { word: "酒店", translation: "فندق", pronunciation: "jiǔdiàn", emoji: "🏨" },
            { word: "火车", translation: "قطار", pronunciation: "huǒchē", emoji: "🚆" },
            { word: "汽车", translation: "سيارة", pronunciation: "qìchē", emoji: "🚗" },
            { word: "出租车", translation: "سيارة أجرة", pronunciation: "chūzūchē", emoji: "🚕" },
            { word: "地图", translation: "خريطة", pronunciation: "dìtú", emoji: "🗺️" },
            { word: "行李", translation: "أمتعة", pronunciation: "xíngli", emoji: "🧳" },
            { word: "游客", translation: "سائح", pronunciation: "yóukè", emoji: "📸" },
            { word: "预订", translation: "حجز", pronunciation: "yùdìng", emoji: "📝" },
            { word: "纪念品", translation: "هدية تذكارية", pronunciation: "jìniànpǐn", emoji: "🎁" },
        ],
        readingExercises: [
            readingExercise("我需要买一张去上海的火车票。", "شراء تذكرة", "أحتاج إلى شراء تذكرة قطار إلى شنغهاي.", ["أين جواز سفري؟", "لقد حجزت فندقاً.", "المطار بعيد جداً."]),
            readingExercise("我们去长城旅游吧。", "اقتراح وجهة سياحية", "لنذهب للسياحة في سور الصين العظيم.", ["هناك الكثير من السياح هنا.", "أمتعتي ثقيلة جداً.", "سآخذ سيارة أجرة."])
        ],
        listeningExercises: [
            listeningExercise("旅游", "فعل السفر أو السياحة.", ["工作", "学习", "吃饭"]),
            listeningExercise("飞机", "وسيلة نقل تطير في السماء.", ["火车", "汽车", "船"]),
            listeningExercise("酒店", "المكان الذي تقيم فيه عند السفر.", ["家", "学校", "医院"])
        ]
    },
    animals: {
        words: [
            { word: "狗", translation: "كلب", pronunciation: "gǒu", emoji: "🐕" },
            { word: "猫", translation: "قطة", pronunciation: "māo", emoji: "🐈" },
            { word: "鱼", translation: "سمكة", pronunciation: "yú", emoji: "🐟" },
            { word: "鸟", translation: "طائر", pronunciation: "niǎo", emoji: "🐦" },
            { word: "马", translation: "حصان", pronunciation: "mǎ", emoji: "🐎" },
            { word: "熊猫", translation: "باندا", pronunciation: "xióngmāo", emoji: "🐼" },
            { word: "老虎", translation: "نمر", pronunciation: "lǎohǔ", emoji: "🐅" },
            { word: "狮子", translation: "أسد", pronunciation: "shīzi", emoji: "🦁" },
            { word: "大象", translation: "فيل", pronunciation: "dàxiàng", emoji: "🐘" },
            { word: "猴子", translation: "قرد", pronunciation: "hóuzi", emoji: "🐒" },
        ],
        readingExercises: [
            readingExercise("我有一只可爱的猫。", "امتلاك حيوان أليف", "لدي قطة لطيفة.", ["الكلب كبير.", "الباندا تأكل الخيزران.", "أحب الخيول."]),
            readingExercise("动物园里有老虎和狮子。", "حيوانات حديقة الحيوان", "يوجد في حديقة الحيوان نمور وأسود.", ["الطائر يطير.", "الفيل يشرب الماء.", "السمكة تسبح."])
        ],
        listeningExercises: [
            listeningExercise("熊猫", "حيوان أبيض وأسود من الصين", ["熊猫", "老虎", "狮子", "大象"]),
            listeningExercise("狗", "أفضل صديق للإنسان", ["狗", "猫", "鱼", "鸟"])
        ]
    },
    transportation: {
        words: [
            { word: "车", translation: "سيارة/مركبة", pronunciation: "chē", emoji: "🚗" },
            { word: "公共汽车", translation: "حافلة", pronunciation: "gōnggòng qìchē", emoji: "🚌" },
            { word: "出租车", translation: "سيارة أجرة", pronunciation: "chūzūchē", emoji: "🚕" },
            { word: "火车", translation: "قطار", pronunciation: "huǒchē", emoji: "🚆" },
            { word: "飞机", translation: "طائرة", pronunciation: "fēijī", emoji: "✈️" },
            { word: "自行车", translation: "دراجة هوائية", pronunciation: "zìxíngchē", emoji: "🚲" },
            { word: "地铁", translation: "مترو الأنفاق", pronunciation: "dìtiě", emoji: "🚇" },
            { word: "船", translation: "سفينة", pronunciation: "chuán", emoji: "🚢" },
            { word: "走路", translation: "مشي", pronunciation: "zǒulù", emoji: "🚶" },
            { word: "开车", translation: "قيادة سيارة", pronunciation: "kāichē", emoji: "🚗" },
        ],
        readingExercises: [
            readingExercise("我每天坐地铁上班。", "وسيلة النقل اليومية", "أذهب إلى العمل بالمترو كل يوم.", ["هو يقود السيارة.", "هي تستقل الحافلة.", "نحن نسافر بالقطار."]),
            readingExercise("从这里到机场怎么走？", "سؤال عن الاتجاهات", "كيف أصل إلى المطار من هنا؟", ["يمكنك أخذ سيارة أجرة.", "الطائرة ستقلع قريباً.", "الدراجة صديقة للبيئة."])
        ],
        listeningExercises: [
            listeningExercise("火车", "وسيلة نقل تسير على قضبان حديدية", ["火车", "飞机", "船", "自行车"]),
            listeningExercise("公共汽车", "مركبة كبيرة تنقل الكثير من الناس", ["公共汽车", "出租车", "地铁", "车"])
        ]
    },
    education: {
        words: [
            { word: "学校", translation: "مدرسة", pronunciation: "xuéxiào", emoji: "🏫" },
            { word: "大学", translation: "جامعة", pronunciation: "dàxué", emoji: "🎓" },
            { word: "老师", translation: "معلم", pronunciation: "lǎoshī", emoji: "👨‍🏫" },
            { word: "学生", translation: "طالب", pronunciation: "xuésheng", emoji: "🧑‍🎓" },
            { word: "同学", translation: "زميل دراسة", pronunciation: "tóngxué", emoji: "👥" },
            { word: "课", translation: "درس/حصة", pronunciation: "kè", emoji: "📚" },
            { word: "考试", translation: "امتحان", pronunciation: "kǎoshì", emoji: "📝" },
            { word: "作业", translation: "واجب منزلي", pronunciation: "zuòyè", emoji: "📓" },
            { word: "教室", translation: "فصل دراسي", pronunciation: "jiàoshì", emoji: "🧑‍🏫" },
            { word: "学习", translation: "يدرس", pronunciation: "xuéxí", emoji: "🧠" },
        ],
        readingExercises: [
            readingExercise("老师在教室里上课。", "مشهد داخل الفصل", "المعلم يلقي درساً في الفصل الدراسي.", ["الطلاب يقومون بواجباتهم.", "لدي امتحان صعب غداً.", "زميلي لطيف جداً."]),
            readingExercise("我喜欢学习汉语。", "تفضيلات الدراسة", "أحب دراسة اللغة الصينية.", ["مدرستنا كبيرة.", "الجامعة بعيدة.", "هذا الدرس مثير للاهتمام."])
        ],
        listeningExercises: [
            listeningExercise("学生", "الشخص الذي يتعلم في المدرسة", ["学生", "老师", "同学", "校长"]),
            listeningExercise("考试", "اختبار للمعرفة", ["考试", "作业", "课", "教室"])
        ]
    },
    health: {
        words: [
            { word: "健康", translation: "صحة", pronunciation: "jiànkāng", emoji: "💪" },
            { word: "医生", translation: "طبيب", pronunciation: "yīshēng", emoji: "🧑‍⚕️" },
            { word: "护士", translation: "ممرضة", pronunciation: "hùshi", emoji: "👩‍⚕️" },
            { word: "医院", translation: "مستشفى", pronunciation: "yīyuàn", emoji: "🏥" },
            { word: "药", translation: "دواء", pronunciation: "yào", emoji: "💊" },
            { word: "生病", translation: "مريض", pronunciation: "shēngbìng", emoji: "🤒" },
            { word: "头疼", translation: "صداع", pronunciation: "tóuténg", emoji: "🤕" },
            { word: "肚子疼", translation: "ألم في المعدة", pronunciation: "dùziténg", emoji: "🤢" },
            { word: "发烧", translation: "حمى", pronunciation: "fāshāo", emoji: "🌡️" },
            { word: "感冒", translation: "نزلة برد", pronunciation: "gǎnmào", emoji: "🤧" },
        ],
        readingExercises: [
            readingExercise("我生病了，需要去看医生。", "وصف الحالة الصحية", "أنا مريض، أحتاج أن أرى طبيباً.", ["خذ هذا الدواء.", "المستشفى كبير.", "لدي حمى وصداع."]),
            readingExercise("多喝水对健康有好处。", "نصيحة صحية", "شرب الكثير من الماء مفيد للصحة.", ["الممرضة مشغولة.", "لدي نزلة برد.", "هذا الدواء مر."])
        ],
        listeningExercises: [
            listeningExercise("医院", "المكان الذي تذهب إليه عندما تكون مريضاً", ["医院", "学校", "银行", "商店"]),
            listeningExercise("生病", "عندما لا تكون بصحة جيدة", ["生病", "健康", "高兴", "累"])
        ]
    },
    technology: {
        words: [
            { word: "电脑", translation: "حاسوب", pronunciation: "diànnǎo", emoji: "💻" },
            { word: "手机", translation: "هاتف محمول", pronunciation: "shǒujī", emoji: "📱" },
            { word: "网络", translation: "إنترنت", pronunciation: "wǎngluò", emoji: "🌐" },
            { word: "电子邮件", translation: "بريد إلكتروني", pronunciation: "diànzǐ yóujiàn", emoji: "📧" },
            { word: "网站", translation: "موقع إلكتروني", pronunciation: "wǎngzhàn", emoji: "🕸️" },
            { word: "密码", translation: "كلمة المرور", pronunciation: "mìmǎ", emoji: "🔒" },
            { word: "键盘", translation: "لوحة مفاتيح", pronunciation: "jiànpán", emoji: "⌨️" },
            { word: "鼠标", translation: "فأرة", pronunciation: "shǔbiāo", emoji: "🖱️" },
            { word: "屏幕", translation: "شاشة", pronunciation: "píngmù", emoji: "🖥️" },
            { word: "软件", translation: "برنامج", pronunciation: "ruǎnjiàn", emoji: "💿" },
        ],
        readingExercises: [
            readingExercise("我用电脑上网。", "استخدام الكمبيوتر", "أستخدم الكمبيوتر لتصفح الإنترنت.", ["لقد نسيت كلمة المرور.", "أرسل لي بريداً إلكترونياً.", "هذا الموقع مفيد جدا."]),
            readingExercise("我的手机没电了。", "مشكلة في الهاتف", "بطارية هاتفي فارغة.", ["هذه الشاشة كبيرة.", "أنا أكتب بلوحة المفاتيح.", "تحتاج إلى تثبيت هذا البرنامج."])
        ],
        listeningExercises: [
            listeningExercise("网络", "شبكة عالمية", ["网络", "电脑", "手机", "邮件"]),
            listeningExercise("密码", "تحتاجه لتسجيل الدخول", ["密码", "网站", "键盘", "鼠标"])
        ]
    },
    restaurant: {
        words: [
            { word: "饭店", translation: "مطعم", pronunciation: "fàndiàn", emoji: "🍴" },
            { word: "菜单", translation: "قائمة طعام", pronunciation: "càidān", emoji: "📜" },
            { word: "服务员", translation: "نادل", pronunciation: "fúwùyuán", emoji: "🤵" },
            { word: "买单", translation: "طلب الفاتورة", pronunciation: "mǎidān", emoji: "🧾" },
            { word: "点菜", translation: "طلب الطعام", pronunciation: "diǎncài", emoji: "✍️" },
            { word: "好吃", translation: "لذيذ", pronunciation: "hǎochī", emoji: "😋" },
            { word: "筷子", translation: "عيدان طعام", pronunciation: "kuàizi", emoji: "🥢" },
            { word: "勺子", translation: "ملعقة", pronunciation: "sháozi", emoji: "🥄" },
            { word: "碗", translation: "وعاء", pronunciation: "wǎn", emoji: "🥣" },
            { word: "盘子", translation: "طبق", pronunciation: "pánzi", emoji: "🍽️" },
        ],
        readingExercises: [
            readingExercise("服务员，请给我菜单。", "في المطعم", "يا نادل، من فضلك أعطني قائمة الطعام.", ["الطعام لذيذ.", "أريد أن أطلب الآن.", "الفاتورة من فضلك."]),
            readingExercise("我要点一个宫保鸡丁。", "طلب طبق معين", "أريد طلب طبق دجاج كونغ باو.", ["هل تستخدم عيدان الطعام؟", "هذا الطبق حار قليلاً.", "كم سعر هذا؟"])
        ],
        listeningExercises: [
            listeningExercise("菜单", "قائمة الأطباق", ["菜单", "买单", "点菜", "服务员"]),
            listeningExercise("筷子", "تستخدم للأكل في الصين", ["筷子", "勺子", "碗", "盘子"])
        ]
    },
    daily_routines: {
        words: [
            { word: "起床", translation: "يستيقظ", pronunciation: "qǐchuáng", emoji: "⏰" },
            { word: "吃早饭", translation: "يأكل الفطور", pronunciation: "chī zǎofàn", emoji: "🍳" },
            { word: "上班", translation: "يذهب للعمل", pronunciation: "shàngbān", emoji: "💼" },
            { word: "上学", translation: "يذهب للمدرسة", pronunciation: "shàngxué", emoji: "🎒" },
            { word: "吃午饭", translation: "يأكل الغداء", pronunciation: "chī wǔfàn", emoji: "🍱" },
            { word: "回家", translation: "يعود للمنزل", pronunciation: "huíjiā", emoji: "🏡" },
            { word: "做晚饭", translation: "يطبخ العشاء", pronunciation: "zuò wǎnfàn", emoji: "🍝" },
            { word: "看电视", translation: "يشاهد التلفاز", pronunciation: "kàn diànshì", emoji: "📺" },
            { word: "看书", translation: "يقرأ كتاباً", pronunciation: "kàn shū", emoji: "📖" },
            { word: "睡觉", translation: "ينام", pronunciation: "shuìjiào", emoji: "😴" },
        ],
        readingExercises: [
            readingExercise("我每天早上七点起床。", "روتين يومي", "أستيقظ الساعة 7 صباحاً كل يوم.", ["هو يذهب إلى العمل بالسيارة.", "بعد العشاء، أشاهد التلفاز.", "أنا أدرس في المساء."]),
            readingExercise("晚上我喜欢看书。", "نشاط مسائي", "أحب قراءة الكتب في المساء.", ["متى تأكل الغداء؟", "هل انتهيت من عملك؟", "حان وقت النوم."])
        ],
        listeningExercises: [
            listeningExercise("起床", "أول شيء تفعله في الصباح", ["起床", "睡觉", "上班", "回家"]),
            listeningExercise("吃早饭", "وجبة الصباح", ["吃早饭", "吃午饭", "吃晚饭", "喝茶"])
        ]
    },
    countries: {
        words: [
            { word: "国家", translation: "دولة", pronunciation: "guójiā", emoji: "🌍" },
            { word: "国籍", translation: "جنسية", pronunciation: "guójí", emoji: "🆔" },
            { word: "中国", translation: "الصين", pronunciation: "zhōngguó", emoji: "🇨🇳" },
            { word: "美国", translation: "أمريكا", pronunciation: "měiguó", emoji: "🇺🇸" },
            { word: "日本", translation: "اليابان", pronunciation: "rìběn", emoji: "🇯🇵" },
            { word: "韩国", translation: "كوريا", pronunciation: "hánguó", emoji: "🇰🇷" },
            { word: "埃及", translation: "مصر", pronunciation: "āijí", emoji: "🇪🇬" },
            { word: "法国", translation: "فرنسا", pronunciation: "fǎguó", emoji: "🇫🇷" },
            { word: "德国", translation: "ألمانيا", pronunciation: "déguó", emoji: "🇩🇪" },
            { word: "首都", translation: "عاصمة", pronunciation: "shǒudū", emoji: "🏛️" },
        ],
        readingExercises: [
            readingExercise("北京是中国的首都。", "معلومات عن الدول", "بكين هي عاصمة الصين.", ["أنا من مصر.", "هو يتحدث اليابانية.", "نيويورك مدينة كبيرة في أمريكا."]),
            readingExercise("你是哪国人？", "سؤال عن الجنسية", "ما هي جنسيتك؟", ["أحب السفر.", "هل زرت فرنسا؟", "ألمانيا في أوروبا."])
        ],
        listeningExercises: [
            listeningExercise("中国", "دولة في آسيا", ["中国", "美国", "日本", "韩国"]),
            listeningExercise("首都", "أهم مدينة في الدولة", ["首都", "国家", "城市", "语言"])
        ]
    },
    sports: {
        words: [
            { word: "运动", translation: "رياضة", pronunciation: "yùndòng", emoji: "🏅" },
            { word: "足球", translation: "كرة القدم", pronunciation: "zúqiú", emoji: "⚽" },
            { word: "篮球", translation: "كرة السلة", pronunciation: "lánqiú", emoji: "🏀" },
            { word: "网球", translation: "تنس", pronunciation: "wǎngqiú", emoji: "🎾" },
            { word: "游泳", translation: "سباحة", pronunciation: "yóuyǒng", emoji: "🏊" },
            { word: "跑步", translation: "جري", pronunciation: "pǎobù", emoji: "🏃" },
            { word: "比赛", translation: "مباراة/منافسة", pronunciation: "bǐsài", emoji: "🏆" },
            { word: "赢", translation: "يفوز", pronunciation: "yíng", emoji: "🥇" },
            { word: "输", translation: "يخسر", pronunciation: "shū", emoji: "👎" },
            { word: "队", translation: "فريق", pronunciation: "duì", emoji: "👥" },
        ],
        readingExercises: [
            readingExercise("我最喜欢的运动是足球。", "تفضيلات رياضية", "رياضتي المفضلة هي كرة القدم.", ["هو يلعب التنس كل نهاية أسبوع.", "فريقنا فاز بالمباراة.", "أذهب للسباحة مرتين في الأسبوع."]),
            readingExercise("昨天的比赛谁赢了？", "نتائج المباريات", "من فاز في مباراة الأمس؟", ["الجري مفيد للصحة.", "هل تعرف كيف تلعب كرة السلة؟", "هم خسروا المباراة."])
        ],
        listeningExercises: [
            listeningExercise("足球", "رياضة شعبية بكرة", ["足球", "篮球", "网球", "游泳"]),
            listeningExercise("比赛", "منافسة رياضية", ["比赛", "运动", "队", "赢"])
        ]
    },
    music_arts: {
        words: [
            { word: "音乐", translation: "موسيقى", pronunciation: "yīnyuè", emoji: "🎵" },
            { word: "艺术", translation: "فن", pronunciation: "yìshù", emoji: "🖼️" },
            { word: "歌", translation: "أغنية", pronunciation: "gē", emoji: "🎶" },
            { word: "画家", translation: "فنان/رسام", pronunciation: "huàjiā", emoji: "🧑‍🎨" },
            { word: "画", translation: "يرسم/لوحة", pronunciation: "huà", emoji: "🎨" },
            { word: "唱歌", translation: "يغني", pronunciation: "chànggē", emoji: "🎤" },
            { word: "跳舞", translation: "يرقص", pronunciation: "tiàowǔ", emoji: "💃" },
            { word: "博物馆", translation: "متحف", pronunciation: "bówùguǎn", emoji: "🏛️" },
            { word: "剧院", translation: "مسرح", pronunciation: "jùyuàn", emoji: "🎭" },
            { word: "电影", translation: "فيلم", pronunciation: "diànyǐng", emoji: "🎬" },
        ],
        readingExercises: [
            readingExercise("我喜欢听古典音乐。", "تفضيلات فنية", "أحب الاستماع إلى الموسيقى الكلاسيكية.", ["هي فنانة موهوبة.", "لنذهب إلى المتحف يوم السبت.", "هذه الأغنية مشهورة جدا."]),
            readingExercise("他画的画很漂亮。", "وصف عمل فني", "لوحاته التي يرسمها جميلة جداً.", ["هل تستطيع الرقص؟", "هذا الفيلم حائز على جوائز.", "هي تغني بشكل جيد."])
        ],
        listeningExercises: [
            listeningExercise("音乐", "فن الأصوات", ["音乐", "艺术", "电影", "歌"]),
            listeningExercise("唱歌", "فعل الغناء", ["唱歌", "跳舞", "画画", "看书"])
        ]
    }
};
