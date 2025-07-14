

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

export const KOREAN_CONTENT: { [categoryName: string]: CategoryContent; } = {
    alphabet: {
        words: [
            { word: "ㄱ", translation: "g/k", pronunciation: "giyeok", emoji: "🔊" },
            { word: "ㄴ", translation: "n", pronunciation: "nieun", emoji: "🔊" },
            { word: "ㄷ", translation: "d/t", pronunciation: "digeut", emoji: "🔊" },
            { word: "ㄹ", translation: "r/l", pronunciation: "rieul", emoji: "🔊" },
            { word: "ㅁ", translation: "m", pronunciation: "mieum", emoji: "🔊" },
            { word: "ㅂ", translation: "b/p", pronunciation: "bieup", emoji: "🔊" },
            { word: "ㅅ", translation: "s", pronunciation: "siot", emoji: "🔊" },
            { word: "ㅇ", translation: "ng / silent", pronunciation: "ieung", emoji: "🔊" },
            { word: "ㅈ", translation: "j", pronunciation: "jieut", emoji: "🔊" },
            { word: "ㅊ", translation: "ch", pronunciation: "chieut", emoji: "🔊" },
            { word: "ㅋ", translation: "k", pronunciation: "kieuk", emoji: "🔊" },
            { word: "ㅌ", translation: "t", pronunciation: "tieut", emoji: "🔊" },
            { word: "ㅍ", translation: "p", pronunciation: "pieup", emoji: "🔊" },
            { word: "ㅎ", translation: "h", pronunciation: "hieut", emoji: "🔊" },
            { word: "ㅏ", translation: "a", pronunciation: "a", emoji: "🎶" },
            { word: "ㅑ", translation: "ya", pronunciation: "ya", emoji: "🎶" },
            { word: "ㅓ", translation: "eo", pronunciation: "eo", emoji: "🎶" },
            { word: "ㅕ", translation: "yeo", pronunciation: "yeo", emoji: "🎶" },
            { word: "ㅗ", translation: "o", pronunciation: "o", emoji: "🎶" },
            { word: "ㅛ", translation: "yo", pronunciation: "yo", emoji: "🎶" },
            { word: "ㅜ", translation: "u", pronunciation: "u", emoji: "🎶" },
            { word: "ㅠ", translation: "yu", pronunciation: "yu", emoji: "🎶" },
            { word: "ㅡ", translation: "eu", pronunciation: "eu", emoji: "🎶" },
            { word: "ㅣ", translation: "i", pronunciation: "i", emoji: "🎶" },
        ],
        readingExercises: [
            readingExercise("가나다라", "أول أربعة مقاطع أساسية", "ga-na-da-ra", ["마바사아", "자차카타", "파하"]),
            readingExercise("아이", "كلمة تعني 'طفل'", "ai", ["오이", "우유", "이유"])
        ],
        listeningExercises: [
            listeningExercise("가", "The 'ga' sound.", ["나", "다", "라"]),
            listeningExercise("어", "The 'eo' vowel sound.", ["아", "오", "우"])
        ]
    },
    basics: {
        words: [
            { word: "저", translation: "أنا (رسمي)", pronunciation: "jeo", emoji: "👤" },
            { word: "나", translation: "أنا (غير رسمي)", pronunciation: "na", emoji: "👤" },
            { word: "당신", translation: "أنت", pronunciation: "dangsin", emoji: "👥" },
            { word: "그", translation: "هو", pronunciation: "geu", emoji: "👨" },
            { word: "그녀", translation: "هي", pronunciation: "geunyeo", emoji: "👩" },
            { word: "우리", translation: "نحن", pronunciation: "uri", emoji: "👨‍👩‍👧‍👦" },
            { word: "네", translation: "نعم", pronunciation: "ne", emoji: "👍" },
            { word: "아니요", translation: "لا", pronunciation: "aniyo", emoji: "👎" },
            { word: "감사합니다", translation: "شكراً (رسمي)", pronunciation: "gamsahamnida", emoji: "😊" },
            { word: "고마워요", translation: "شكراً (غير رسمي)", pronunciation: "gomawoyo", emoji: "😊" },
            { word: "죄송합니다", translation: "آسف (رسمي)", pronunciation: "joesonghamnida", emoji: "😔" },
            { word: "미안해요", translation: "آسف (غير رسمي)", pronunciation: "mianhaeyo", emoji: "😔" },
            { word: "괜찮아요", translation: "لا بأس", pronunciation: "gwaenchanayo", emoji: "👌" },
            { word: "뭐", translation: "ماذا", pronunciation: "mwo", emoji: "❓" },
            { word: "어디", translation: "أين", pronunciation: "eodi", emoji: "📍" },
            { word: "언제", translation: "متى", pronunciation: "eonje", emoji: "⏰" },
            { word: "누구", translation: "من", pronunciation: "nugu", emoji: "❓" },
            { word: "왜", translation: "لماذا", pronunciation: "wae", emoji: "🤔" },
            { word: "어떻게", translation: "كيف", pronunciation: "eotteoke", emoji: "🤔" },
            { word: "그리고", translation: "و", pronunciation: "geurigo", emoji: "&" },
            { word: "하지만", translation: "لكن", pronunciation: "hajiman", emoji: "↔️" },
            { word: "있다", translation: "يوجد / يملك", pronunciation: "itda", emoji: "🈶" },
            { word: "없다", translation: "لا يوجد / لا يملك", pronunciation: "eopda", emoji: "🈚" },
            { word: "주세요", translation: "أعطني من فضلك", pronunciation: "juseyo", emoji: "🙏" },
            { word: "한국어", translation: "اللغة الكورية", pronunciation: "hangugeo", emoji: "🇰🇷" },
        ],
        readingExercises: [
            readingExercise("나와 당신", "ضمائر", "أنا وأنت", ["هو وهي", "هم ونحن", "هذا وذاك"]),
            readingExercise("이것은 뭐예요?", "سؤال عن شيء", "ما هذا؟", ["أين الحمام؟", "من هذا الشخص؟", "متى ستأتي؟"]),
            readingExercise("한국어는 재미있어요.", "وصف اللغة", "اللغة الكورية ممتعة.", ["أنا طالب.", "هو معلم.", "لدي كتاب."])
        ],
        listeningExercises: [
            listeningExercise("감사합니다", "تُستخدم للتعبير عن الامتنان.", ["안녕하세요", "죄송합니다", "안녕히 가세요"]),
            listeningExercise("뭐", "كلمة استفهام تعني 'ماذا'.", ["어디", "누구", "왜"]),
            listeningExercise("있다", "فعل يعني 'يوجد' أو 'يملك'.", ["없다", "하다", "가다"])
        ]
    },
    greetings: {
        words: [
            { word: "안녕하세요", translation: "مرحباً", pronunciation: "annyeonghaseyo", emoji: "👋" },
            { word: "안녕", translation: "أهلاً (غير رسمي)", pronunciation: "annyeong", emoji: "👋" },
            { word: "좋은 아침이에요", translation: "صباح الخير", pronunciation: "joeun achimieyo", emoji: "☀️" },
            { word: "안녕히 주무세요", translation: "تصبح على خير", pronunciation: "annyeonghi jumuseyo", emoji: "🌙" },
            { word: "안녕히 가세요", translation: "مع السلامة (لمن يغادر)", pronunciation: "annyeonghi gaseyo", emoji: "👋" },
            { word: "안녕히 계세요", translation: "مع السلامة (لمن يبقى)", pronunciation: "annyeonghi gyeseyo", emoji: "👋" },
            { word: "잘 지내세요?", translation: "كيف حالك؟", pronunciation: "jal jinaeseyo?", emoji: "❓" },
            { word: "네, 잘 지내요", translation: "نعم، أنا بخير", pronunciation: "ne, jal jinaeyo", emoji: "😊" },
            { word: "이름이 뭐예요?", translation: "ما اسمك؟", pronunciation: "ireumi mwoyeyo?", emoji: "❓" },
            { word: "제 이름은...", translation: "اسمي هو...", pronunciation: "je ireumeun...", emoji: "🏷️" },
            { word: "만나서 반갑습니다", translation: "سررت بلقائك", pronunciation: "mannaseo bangapseumnida", emoji: "🤝" },
            { word: "환영합니다", translation: "أهلاً بك", pronunciation: "hwanyeonghamnida", emoji: "🎉" },
            { word: "오랜만이에요", translation: "لم أرك منذ وقت طويل", pronunciation: "oraenmanieyo", emoji: "😯" },
            { word: "또 봐요", translation: "أراك لاحقاً", pronunciation: "tto bwayo", emoji: "👀" },
            { word: "잘 먹겠습니다", translation: "شكراً على الطعام (قبل الأكل)", pronunciation: "jal meokgesseumnida", emoji: "🙏" },
        ],
        readingExercises: [
            readingExercise("잘 지내세요? 네, 잘 지내요.", "سؤال عن الحال وإجابته", "كيف حالك؟ نعم، أنا بخير.", ["ما اسمك؟ اسمي...", "صباح الخير. مساء الخير.", "شكراً. عفواً."]),
            readingExercise("안녕하세요, 이름이 뭐예요?", "تحية وسؤال عن الاسم", "مرحباً، ما اسمك؟", ["تصبح على خير، أراك غداً.", "كيف حالك ومن أين أنت؟", "مع السلامة."]),
            readingExercise("만나서 반갑습니다. 또 봐요!", "لقاء ووداع", "سررت بلقائك. أراك لاحقاً!", ["مرحباً، كيف حالك؟", "تصبح على خير.", "أهلاً بك في كوريا."])
        ],
        listeningExercises: [
            listeningExercise("안녕하세요", "التحية الأكثر شيوعاً.", ["안녕히 가세요", "감사합니다", "잘 지내요"]),
            listeningExercise("안녕히 가세요", "تقال عند المغادرة.", ["안녕하세요", "좋은 아침이에요", "만나서 반갑습니다"]),
            listeningExercise("반갑습니다", "جزء من عبارة 'سررت بلقائك'.", ["죄송합니다", "고맙습니다", "모르겠어요"])
        ]
    },
    numbers: {
        words: [
            { word: "영", translation: "صفر (Sino)", pronunciation: "yeong", emoji: "0️⃣" },
            { word: "일", translation: "واحد (Sino)", pronunciation: "il", emoji: "1️⃣" },
            { word: "이", translation: "اثنان (Sino)", pronunciation: "i", emoji: "2️⃣" },
            { word: "삼", translation: "ثلاثة (Sino)", pronunciation: "sam", emoji: "3️⃣" },
            { word: "사", translation: "أربعة (Sino)", pronunciation: "sa", emoji: "4️⃣" },
            { word: "오", translation: "خمسة (Sino)", pronunciation: "o", emoji: "5️⃣" },
            { word: "육", translation: "ستة (Sino)", pronunciation: "yuk", emoji: "6️⃣" },
            { word: "칠", translation: "سبعة (Sino)", pronunciation: "chil", emoji: "7️⃣" },
            { word: "팔", translation: "ثمانية (Sino)", pronunciation: "pal", emoji: "8️⃣" },
            { word: "구", translation: "تسعة (Sino)", pronunciation: "gu", emoji: "9️⃣" },
            { word: "십", translation: "عشرة (Sino)", pronunciation: "sip", emoji: "🔟" },
            { word: "백", translation: "مئة (Sino)", pronunciation: "baek", emoji: "💯" },
            { word: "천", translation: "ألف (Sino)", pronunciation: "cheon", emoji: "1️⃣0️⃣0️⃣0️⃣" },
            { word: "만", translation: "عشرة آلاف (Sino)", pronunciation: "man", emoji: "💰" },
            { word: "하나", translation: "واحد (Native)", pronunciation: "hana", emoji: "🍎" },
            { word: "둘", translation: "اثنان (Native)", pronunciation: "dul", emoji: "🍎🍎" },
            { word: "셋", translation: "ثلاثة (Native)", pronunciation: "set", emoji: "🍎🍎🍎" },
            { word: "넷", translation: "أربعة (Native)", pronunciation: "net", emoji: "🍎🍎🍎🍎" },
            { word: "다섯", translation: "خمسة (Native)", pronunciation: "daseot", emoji: "✋" },
            { word: "열", translation: "عشرة (Native)", pronunciation: "yeol", emoji: "🙌" },
        ],
        readingExercises: [
            readingExercise("사과 세 개 주세요.", "طلب عدد من الأشياء", "أعطني ثلاث تفاحات من فضلك.", ["الساعة الآن الثانية.", "هناك خمسة أشخاص.", "هذا يكلف ألف وون."]),
            readingExercise("제 전화번호는 공일공...", "قول رقم الهاتف", "رقم هاتفي هو 010...", ["عمري عشرون سنة.", "لدي أخ واحد.", "الفصل في الطابق الثالث."])
        ],
        listeningExercises: [
            listeningExercise("삼", "الرقم 3 (Sino-Korean)", ["셋", "사", "이"]),
            listeningExercise("다섯", "الرقم 5 (Native Korean)", ["오", "넷", "여섯"]),
            listeningExercise("백", "الرقم 100", ["십", "천", "만"])
        ]
    },
    colors: {
        words: [
            { word: "색", translation: "لون", pronunciation: "saek", emoji: "🎨" },
            { word: "빨간색", translation: "أحمر", pronunciation: "ppalgansaek", emoji: "🔴" },
            { word: "파란색", translation: "أزرق", pronunciation: "paransaek", emoji: "🔵" },
            { word: "초록색", translation: "أخضر", pronunciation: "choroksaek", emoji: "🟢" },
            { word: "노란색", translation: "أصفر", pronunciation: "noransaek", emoji: "🟡" },
            { word: "검은색", translation: "أسود", pronunciation: "geomeunsaek", emoji: "⚫" },
            { word: "하얀색", translation: "أبيض", pronunciation: "hayansaek", emoji: "⚪" },
            { word: "보라색", translation: "بنفسجي", pronunciation: "borasaek", emoji: "🟣" },
            { word: "주황색", translation: "برتقالي", pronunciation: "juhwangsaek", emoji: "🟠" },
            { word: "갈색", translation: "بني", pronunciation: "galsaek", emoji: "🟤" },
            { word: "분홍색", translation: "وردي", pronunciation: "bunhongsaek", emoji: "🌸" },
            { word: "회색", translation: "رمادي", pronunciation: "hoesaek", emoji: "🐘" },
            { word: "금색", translation: "ذهبي", pronunciation: "geumsaek", emoji: "🥇" },
            { word: "은색", translation: "فضي", pronunciation: "eunsaek", emoji: "🥈" },
        ],
        readingExercises: [
            readingExercise("하늘은 파란색입니다.", "لون السماء", "السماء زرقاء.", ["العشب أخضر.", "الشمس صفراء.", "أحب اللون الأحمر."]),
            readingExercise("그녀는 하얀색 드레스를 입고 있어요.", "لون الملابس", "هي ترتدي فستانًا أبيض.", ["سيارته سوداء.", "هذه وردة وردية.", "شعري بني."])
        ],
        listeningExercises: [
            listeningExercise("빨간색", "لون التفاح والفلفل الحار.", ["파란색", "초록색", "노란색"]),
            listeningExercise("하얀색", "لون الثلج والورق.", ["검은색", "회색", "분홍색"]),
            listeningExercise("초록색", "لون العشب وأوراق الشجر.", ["파란색", "갈색", "보라색"])
        ]
    },
    family: {
        words: [
            { word: "가족", translation: "عائلة", pronunciation: "gajok", emoji: "👨‍👩‍👧‍👦" },
            { word: "아버지", translation: "أب", pronunciation: "abeoji", emoji: "👨" },
            { word: "어머니", translation: "أم", pronunciation: "eomeoni", emoji: "👩" },
            { word: "부모님", translation: "والدين", pronunciation: "bumonim", emoji: "👨‍👩‍👧" },
            { word: "형", translation: "أخ أكبر (للرجال)", pronunciation: "hyeong", emoji: "👱‍♂️" },
            { word: "오빠", translation: "أخ أكبر (للنساء)", pronunciation: "oppa", emoji: "👱‍♂️" },
            { word: "남동생", translation: "أخ أصغر", pronunciation: "namdongsaeng", emoji: "👦" },
            { word: "누나", translation: "أخت كبرى (للرجال)", pronunciation: "nuna", emoji: "👱‍♀️" },
            { word: "언니", translation: "أخت كبرى (للنساء)", pronunciation: "eonni", emoji: "👱‍♀️" },
            { word: "여동생", translation: "أخت صغرى", pronunciation: "yeodongsaeng", emoji: "👧" },
            { word: "남편", translation: "زوج", pronunciation: "nampyeon", emoji: "🤵" },
            { word: "아내", translation: "زوجة", pronunciation: "anae", emoji: "👰" },
            { word: "아들", translation: "ابن", pronunciation: "adeul", emoji: "👦" },
            { word: "딸", translation: "ابنة", pronunciation: "ttal", emoji: "👧" },
            { word: "아이", translation: "طفل", pronunciation: "ai", emoji: "👶" },
            { word: "할아버지", translation: "جد", pronunciation: "harabeoji", emoji: "👴" },
            { word: "할머니", translation: "جدة", pronunciation: "halmeoni", emoji: "👵" },
        ],
        readingExercises: [
            readingExercise("이 사람은 제 아버지입니다.", "تقديم الوالد", "هذا أبي.", ["لدي أخ أكبر وأخت صغرى.", "أنا أحب عائلتي.", "ابنه لطيف جداً."]),
            readingExercise("그녀는 아들 한 명, 딸 한 명이 있어요.", "الحديث عن الأطفال", "لديها ابن واحد وابنة واحدة.", ["زوجتي طاهية.", "جدي يعيش في بوسان.", "أختي الكبرى تعمل في سيول."])
        ],
        listeningExercises: [
            listeningExercise("아버지", "الكلمة التي تنادي بها والدك.", ["어머니", "형", "남동생"]),
            listeningExercise("가족", "كلمة تعني العائلة.", ["사람", "친구", "사랑"]),
            listeningExercise("언니", "كيف تنادي المرأة أختها الكبرى.", ["누나", "오빠", "형"])
        ]
    },
    food: {
        words: [
            { word: "음식", translation: "طعام", pronunciation: "eumsik", emoji: "🍔" },
            { word: "밥", translation: "أرز مطبوخ/وجبة", pronunciation: "bap", emoji: "🍚" },
            { word: "물", translation: "ماء", pronunciation: "mul", emoji: "💧" },
            { word: "차", translation: "شاي", pronunciation: "cha", emoji: "🍵" },
            { word: "커피", translation: "قهوة", pronunciation: "keopi", emoji: "☕" },
            { word: "주스", translation: "عصير", pronunciation: "juseu", emoji: "🧃" },
            { word: "우유", translation: "حليب", pronunciation: "uyu", emoji: "🥛" },
            { word: "빵", translation: "خبز", pronunciation: "ppang", emoji: "🍞" },
            { word: "김치", translation: "كيمتشي", pronunciation: "gimchi", emoji: "🥬" },
            { word: "불고기", translation: "بولجوجي", pronunciation: "bulgogi", emoji: "🥩" },
            { word: "비빔밥", translation: "بيبيمباب", pronunciation: "bibimbap", emoji: "🍚" },
            { word: "라면", translation: "راميون", pronunciation: "ramyeon", emoji: "🍜" },
            { word: "계란", translation: "بيض", pronunciation: "gyeran", emoji: "🥚" },
            { word: "고기", translation: "لحم", pronunciation: "gogi", emoji: "🥩" },
            { word: "생선", translation: "سمك", pronunciation: "saengseon", emoji: "🐟" },
            { word: "과일", translation: "فاكهة", pronunciation: "gwail", emoji: "🍎" },
            { word: "사과", translation: "تفاحة", pronunciation: "sagwa", emoji: "🍎" },
            { word: "바나나", translation: "موز", pronunciation: "banana", emoji: "🍌" },
            { word: "맛있어요", translation: "لذيذ", pronunciation: "masisseoyo", emoji: "😋" },
            { word: "마시다", translation: "يشرب", pronunciation: "masida", emoji: "🥤" },
            { word: "먹다", translation: "يأكل", pronunciation: "meokda", emoji: "🍔" },
        ],
        readingExercises: [
            readingExercise("저는 김치를 좋아해요.", "تفضيلات الطعام", "أنا أحب الكيمتشي.", ["هل تريد أن تشرب القهوة؟", "هذه الفاكهة حلوة.", "البولجوجي لذيذ."]),
            readingExercise("물 한 잔 주세요.", "طلب شراب", "من فضلك أعطني كوب ماء.", ["أنا لا آكل اللحم.", "الفطور هو خبز وبيض.", "هذا المطعم يقدم طعاماً كورياً جيداً."])
        ],
        listeningExercises: [
            listeningExercise("먹다", "فعل 'يأكل'.", ["마시다", "보다", "가다"]),
            listeningExercise("과일", "كلمة عامة للفواكه.", ["채소", "고기", "밥"]),
            listeningExercise("맛있어요", "صفة للطعام اللذيذ.", ["맛없어요", "재미있어요", "예뻐요"])
        ]
    },
    time: {
        words: [
            { word: "시간", translation: "وقت/ساعة", pronunciation: "sigan", emoji: "⏰" },
            { word: "시", translation: "ساعة (للإشارة للوقت)", pronunciation: "si", emoji: "🕰️" },
            { word: "분", translation: "دقيقة", pronunciation: "bun", emoji: "⏱️" },
            { word: "초", translation: "ثانية", pronunciation: "cho", emoji: "⏱️" },
            { word: "오늘", translation: "اليوم", pronunciation: "oneul", emoji: "👇" },
            { word: "내일", translation: "غداً", pronunciation: "naeil", emoji: "➡️" },
            { word: "어제", translation: "أمس", pronunciation: "eoje", emoji: "⬅️" },
            { word: "아침", translation: "صباح", pronunciation: "achim", emoji: "🌅" },
            { word: "점심", translation: "ظهيرة/غداء", pronunciation: "jeomsim", emoji: "☀️" },
            { word: "저녁", translation: "مساء/عشاء", pronunciation: "jeonyeok", emoji: "🌃" },
            { word: "월요일", translation: "الإثنين", pronunciation: "woryoil", emoji: " M" },
            { word: "일요일", translation: "الأحد", pronunciation: "iryoil", emoji: "S" },
            { word: "달", translation: "شهر", pronunciation: "dal", emoji: "🈷️" },
            { word: "년", translation: "سنة", pronunciation: "nyeon", emoji: "🎉" },
            { word: "지금", translation: "الآن", pronunciation: "jigeum", emoji: "📍" },
        ],
        readingExercises: [
            readingExercise("지금 몇 시예요?", "سؤال عن الوقت", "كم الساعة الآن؟", ["ما هو تاريخ اليوم؟", "متى عيد ميلادك؟", "أراك غداً."]),
            readingExercise("내일 아침 9시에 회의가 있어요.", "تحديد موعد", "لدي اجتماع غداً الساعة التاسعة صباحاً.", ["لقد وصلت أمس.", "اليوم هو الأربعاء.", "أنا مشغول جداً هذا الأسبوع."])
        ],
        listeningExercises: [
            listeningExercise("오늘", "اليوم الحالي.", ["내일", "어제", "지금"]),
            listeningExercise("시", "تستخدم للساعة.", ["분", "초", "시간"]),
            listeningExercise("월요일", "أول يوم في الأسبوع.", ["일요일", "주말", "달"])
        ]
    },
    weather: {
        words: [
            { word: "날씨", translation: "الطقس", pronunciation: "nalssi", emoji: "🌦️" },
            { word: "맑음", translation: "صافي", pronunciation: "malgeum", emoji: "☀️" },
            { word: "흐림", translation: "غائم", pronunciation: "heurim", emoji: "☁️" },
            { word: "비", translation: "مطر", pronunciation: "bi", emoji: "🌧️" },
            { word: "눈", translation: "ثلج/عين", pronunciation: "nun", emoji: "❄️" },
            { word: "바람", translation: "رياح", pronunciation: "baram", emoji: "💨" },
            { word: "덥다", translation: "حار", pronunciation: "deopda", emoji: "🌡️" },
            { word: "춥다", translation: "بارد", pronunciation: "chupda", emoji: "🥶" },
            { word: "따뜻하다", translation: "دافئ", pronunciation: "ttatteuthada", emoji: "😊" },
            { word: "시원하다", translation: "معتدل البرودة", pronunciation: "siwonhada", emoji: "😎" },
            { word: "온도", translation: "درجة الحرارة", pronunciation: "ondo", emoji: "🌡️" },
        ],
        readingExercises: [
            readingExercise("오늘 날씨가 어때요?", "سؤال عن الطقس", "كيف هو طقس اليوم؟", ["هل ستمطر غداً؟", "أنا أحب الأيام الصافية.", "الشتاء بارد جداً."]),
            readingExercise("밖은 추워요, 옷을 따뜻하게 입으세요.", "نصيحة بخصوص الطقس", "الجو بارد في الخارج، ارتدِ ملابس دافئة.", ["الصيف حار جداً.", "الرياح قوية اليوم.", "الثلج جميل."])
        ],
        listeningExercises: [
            listeningExercise("날씨", "الكلمة العامة للطقس.", ["비", "바람", "해"]),
            listeningExercise("덥다", "عندما تكون درجة الحرارة مرتفعة.", ["춥다", "따뜻하다", "시원하다"]),
            listeningExercise("비", "عندما يسقط الماء من السماء.", ["눈", "맑음", "흐림"])
        ]
    },
    home: {
        words: [
            { word: "집", translation: "منزل/بيت", pronunciation: "jip", emoji: "🏠" },
            { word: "방", translation: "غرفة", pronunciation: "bang", emoji: "🚪" },
            { word: "침실", translation: "غرفة نوم", pronunciation: "chimsil", emoji: "🛏️" },
            { word: "화장실", translation: "حمام", pronunciation: "hwajangsil", emoji: "🛁" },
            { word: "부엌", translation: "مطبخ", pronunciation: "bueok", emoji: "🍳" },
            { word: "거실", translation: "غرفة معيشة", pronunciation: "geosil", emoji: "🛋️" },
            { word: "문", translation: "باب", pronunciation: "mun", emoji: "🚪" },
            { word: "창문", translation: "نافذة", pronunciation: "changmun", emoji: "🪟" },
            { word: "책상", translation: "مكتب", pronunciation: "chaeksang", emoji: "🪵" },
            { word: "의자", translation: "كرسي", pronunciation: "uija", emoji: "🪑" },
            { word: "침대", translation: "سرير", pronunciation: "chimdae", emoji: "🛏️" },
            { word: "소파", translation: "أريكة", pronunciation: "sopa", emoji: "🛋️" },
            { word: "불", translation: "مصباح/نار", pronunciation: "bul", emoji: "💡" },
            { word: "열쇠", translation: "مفتاح", pronunciation: "yeolsoe", emoji: "🔑" },
            { word: "텔레비전", translation: "تلفاز", pronunciation: "tellebijeon", emoji: "📺" },
        ],
        readingExercises: [
            readingExercise("제 방에는 침대와 책상이 있어요.", "وصف الغرفة", "يوجد في غرفتي سرير ومكتب.", ["المطبخ كبير.", "أين هو الحمام؟", "من فضلك أغلق الباب."]),
            readingExercise("고양이가 소파 위에서 자고 있어요.", "وصف مكان", "القطة نائمة على الأريكة.", ["هل لديك مفتاح؟", "غرفة المعيشة مضيئة.", "افتح النافذة."])
        ],
        listeningExercises: [
            listeningExercise("집", "المكان الذي تعيش فيه.", ["학교", "회사", "가게"]),
            listeningExercise("방", "كلمة عامة تعني 'غرفة'.", ["문", "침대", "집"]),
            listeningExercise("부엌", "المكان الذي تطبخ فيه.", ["침실", "거실", "화장실"])
        ]
    },
    shopping: {
        words: [
            { word: "사다", translation: "يشتري", pronunciation: "sada", emoji: "🛍️" },
            { word: "팔다", translation: "يبيع", pronunciation: "palda", emoji: "🏷️" },
            { word: "가게", translation: "متجر", pronunciation: "gage", emoji: "🏬" },
            { word: "시장", translation: "سوق", pronunciation: "sijang", emoji: "🛒" },
            { word: "돈", translation: "مال", pronunciation: "don", emoji: "💰" },
            { word: "얼마예요?", translation: "كم السعر؟", pronunciation: "eolmayeyo?", emoji: "💲" },
            { word: "비싸다", translation: "غالي", pronunciation: "bissada", emoji: "💎" },
            { word: "싸다", translation: "رخيص", pronunciation: "ssada", emoji: "🪙" },
            { word: "원", translation: "وون (عملة)", pronunciation: "won", emoji: "💴" },
            { word: "카드", translation: "بطاقة", pronunciation: "kadeu", emoji: "💳" },
            { word: "현금", translation: "نقد", pronunciation: "hyeongeum", emoji: "💵" },
            { word: "물건", translation: "شيء/بضاعة", pronunciation: "mulgeon", emoji: "📦" },
        ],
        readingExercises: [
            readingExercise("이거 얼마예요?", "سؤال عن السعر", "كم سعر هذا؟", ["أريد شراء ذلك.", "هذا غالي جداً.", "هل يمكنني استخدام البطاقة؟"]),
            readingExercise("시장에 가서 물건을 사요.", "الذهاب للتسوق", "أذهب إلى السوق لشراء البضائع.", ["هذا المتجر يبيع ملابس جميلة.", "الدفع نقداً أرخص.", "هذه التفاحة تكلف 1000 وون."])
        ],
        listeningExercises: [
            listeningExercise("사다", "فعل 'يشتري'.", ["팔다", "가다", "먹다"]),
            listeningExercise("돈", "ما تستخدمه للشراء.", ["가게", "물건", "색깔"]),
            listeningExercise("싸다", "عكس 'غالي'.", ["비싸다", "좋다", "크다"])
        ]
    },
    body: {
        words: [
            { word: "몸", translation: "جسم", pronunciation: "mom", emoji: "🧍" },
            { word: "머리", translation: "رأس/شعر", pronunciation: "meori", emoji: "👤" },
            { word: "얼굴", translation: "وجه", pronunciation: "eolgul", emoji: "😊" },
            { word: "눈", translation: "عين/ثلج", pronunciation: "nun", emoji: "👁️" },
            { word: "코", translation: "أنف", pronunciation: "ko", emoji: "👃" },
            { word: "입", translation: "فم", pronunciation: "ip", emoji: "👄" },
            { word: "귀", translation: "أذن", pronunciation: "gwi", emoji: "👂" },
            { word: "이", translation: "سن", pronunciation: "i", emoji: "🦷" },
            { word: "손", translation: "يد", pronunciation: "son", emoji: "✋" },
            { word: "발", translation: "قدم", pronunciation: "bal", emoji: "🦶" },
            { word: "다리", translation: "ساق", pronunciation: "dari", emoji: "🦵" },
            { word: "마음", translation: "قلب/عقل", pronunciation: "maeum", emoji: "❤️" },
            { word: "배", translation: "بطن", pronunciation: "bae", emoji: "🍔" },
            { word: "아프다", translation: "مؤلم", pronunciation: "apeuda", emoji: "🤒" },
        ],
        readingExercises: [
            readingExercise("머리가 아파요.", "شكوى من ألم", "رأسي يؤلمني.", ["عيناي كبيرتان.", "شعره طويل.", "اغسل يديك."]),
            readingExercise("그는 파란 눈을 가지고 있어요.", "وصف المظهر", "لديه عيون زرقاء.", ["أنفي صغير.", "أسناني بيضاء.", "قدمي تؤلمني."])
        ],
        listeningExercises: [
            listeningExercise("몸", "الكلمة العامة للجسم.", ["머리", "손", "발"]),
            listeningExercise("눈", "تستخدمها للرؤية.", ["귀", "코", "입"]),
            listeningExercise("손", "الجزء من الجسم في نهاية الذراع.", ["발", "다리", "머리"])
        ]
    },
    clothing: {
        words: [
            { word: "옷", translation: "ملابس", pronunciation: "ot", emoji: "👕" },
            { word: "셔츠", translation: "قميص", pronunciation: "syeocheu", emoji: "👔" },
            { word: "티셔츠", translation: "تي شيرت", pronunciation: "tisyeocheu", emoji: "👕" },
            { word: "바지", translation: "بنطال", pronunciation: "baji", emoji: "👖" },
            { word: "치마", translation: "تنورة", pronunciation: "chima", emoji: "👗" },
            { word: "원피스", translation: "فستان", pronunciation: "wonpiseu", emoji: "👗" },
            { word: "재킷", translation: "سترة", pronunciation: "jaekit", emoji: "🧥" },
            { word: "신발", translation: "حذاء", pronunciation: "sinbal", emoji: "👟" },
            { word: "양말", translation: "جوارب", pronunciation: "yangmal", emoji: "🧦" },
            { word: "모자", translation: "قبعة", pronunciation: "moja", emoji: "🧢" },
            { word: "입다", translation: "يرتدي", pronunciation: "ipda", emoji: "🧑‍" },
        ],
        readingExercises: [
            readingExercise("이 빨간색 티셔츠를 좋아해요.", "تفضيل الملابس", "أحب هذا التي شيرت الأحمر.", ["هذا البنطال كبير جداً.", "هي ترتدي فستاناً جميلاً.", "أين حذائي؟"]),
            readingExercise("오늘은 추우니 재킷을 입으세요.", "نصيحة للملابس", "الجو بارد اليوم، ارتدِ سترة.", ["أنا أبحث عن قبعة.", "جواربي زرقاء.", "هو لا يحب ارتداء القمصان."])
        ],
        listeningExercises: [
            listeningExercise("옷", "الكلمة العامة للملابس.", ["바지", "신발", "모자"]),
            listeningExercise("입다", "فعل 'يرتدي'.", ["사다", "보다", "먹다"]),
            listeningExercise("치마", "ملابس ترتديها النساء عادة.", ["바지", "셔츠", "재킷"])
        ]
    },
    verbs: {
        words: [
            { word: "이다", translation: "يكون", pronunciation: "ida", emoji: "✅" },
            { word: "있다", translation: "يوجد/يملك", pronunciation: "itda", emoji: "🈶" },
            { word: "하다", translation: "يفعل", pronunciation: "hada", emoji: "💪" },
            { word: "가다", translation: "يذهب", pronunciation: "gada", emoji: "🚶" },
            { word: "오다", translation: "يأتي", pronunciation: "oda", emoji: "👋" },
            { word: "보다", translation: "يرى/ينظر", pronunciation: "boda", emoji: "👀" },
            { word: "듣다", translation: "يسمع", pronunciation: "deutda", emoji: "👂" },
            { word: "말하다", translation: "يتحدث", pronunciation: "malhada", emoji: "🗣️" },
            { word: "읽다", translation: "يقرأ", pronunciation: "ikda", emoji: "📖" },
            { word: "쓰다", translation: "يكتب/يستخدم", pronunciation: "sseuda", emoji: "✍️" },
            { word: "먹다", translation: "يأكل", pronunciation: "meokda", emoji: "🍔" },
            { word: "마시다", translation: "يشرب", pronunciation: "masida", emoji: "🥤" },
            { word: "사다", translation: "يشتري", pronunciation: "sada", emoji: "🛒" },
            { word: "팔다", translation: "يبيع", pronunciation: "palda", emoji: "🏷️" },
            { word: "싶다", translation: "يريد أن", pronunciation: "sipda", emoji: "🤔" },
            { word: "사랑하다", translation: "يحب", pronunciation: "saranghada", emoji: "❤️" },
            { word: "좋아하다", translation: "يعجب بـ", pronunciation: "joahada", emoji: "👍" },
            { word: "공부하다", translation: "يدرس", pronunciation: "gongbuhada", emoji: "🎓" },
            { word: "일하다", translation: "يعمل", pronunciation: "ilhada", emoji: "💼" },
            { word: "자다", translation: "ينام", pronunciation: "jada", emoji: "😴" },
        ],
        readingExercises: [
            readingExercise("저는 한국에 가고 싶어요.", "التعبير عن رغبة", "أريد أن أذهب إلى كوريا.", ["هو يحب قراءة الكتب.", "ماذا تفعل؟", "أنا أدرس اللغة الكورية."]),
            readingExercise("그는 매일 텔레비전을 봐요.", "نشاط يومي", "هو يشاهد التلفاز كل يوم.", ["أنا لا أشرب القهوة.", "هي تكتب رسالة.", "نحن نأكل في مطعم."])
        ],
        listeningExercises: [
            listeningExercise("가다", "فعل 'يذهب'.", ["오다", "이다", "있다"]),
            listeningExercise("공부하다", "فعل 'يدرس'.", ["일하다", "보다", "먹다"]),
            listeningExercise("좋아하다", "فعل 'يعجب بـ'.", ["사랑하다", "싶다", "하다"])
        ]
    },
    adjectives: {
        words: [
            { word: "좋다", translation: "جيد", pronunciation: "jota", emoji: "👍" },
            { word: "나쁘다", translation: "سيء", pronunciation: "nappeuda", emoji: "👎" },
            { word: "크다", translation: "كبير", pronunciation: "keuda", emoji: "🐘" },
            { word: "작다", translation: "صغير", pronunciation: "jakda", emoji: "🐭" },
            { word: "많다", translation: "كثير", pronunciation: "manta", emoji: "➕" },
            { word: "적다", translation: "قليل", pronunciation: "jeokda", emoji: "➖" },
            { word: "새롭다", translation: "جديد", pronunciation: "saeropda", emoji: "✨" },
            { word: "낡다", translation: "قديم/بالي", pronunciation: "nakda", emoji: "📜" },
            { word: "높다", translation: "عالي", pronunciation: "nopda", emoji: "🦒" },
            { word: "낮다", translation: "منخفض", pronunciation: "natda", emoji: "👦" },
            { word: "길다", translation: "طويل", pronunciation: "gilda", emoji: "📏" },
            { word: "짧다", translation: "قصير", pronunciation: "jjalda", emoji: "📏" },
            { word: "예쁘다", translation: "جميل", pronunciation: "yeppeuda", emoji: "😍" },
            { word: "잘생기다", translation: "وسيم", pronunciation: "jalsaenggida", emoji: "😎" },
            { word: "기쁘다", translation: "سعيد", pronunciation: "gippeuda", emoji: "😄" },
            { word: "슬프다", translation: "حزين", pronunciation: "seulpeuda", emoji: "😢" },
            { word: "바쁘다", translation: "مشغول", pronunciation: "bappeuda", emoji: "🏃‍♂️" },
            { word: "피곤하다", translation: "متعب", pronunciation: "pigonhada", emoji: "😴" },
        ],
        readingExercises: [
            readingExercise("이 사과는 아주 커요.", "وصف الحجم", "هذه التفاحة كبيرة جداً.", ["ذلك المنزل صغير.", "ملابسي جديدة.", "هذا الكتاب جيد."]),
            readingExercise("그녀는 생일이라서 기뻐요.", "سبب السعادة", "هي سعيدة لأن اليوم عيد ميلادها.", ["أنا متعب جداً اليوم.", "هو رجل وسيم.", "الطقس سيء."])
        ],
        listeningExercises: [
            listeningExercise("크다", "عكس 'صغير'.", ["작다", "많다", "적다"]),
            listeningExercise("예쁘다", "صفة للجمال.", ["못생기다", "좋다", "나쁘다"]),
            listeningExercise("바쁘다", "عندما يكون لديك الكثير من العمل.", ["피곤하다", "한가하다", "기쁘다"])
        ]
    },
    places: {
        words: [
            { word: "장소", translation: "مكان", pronunciation: "jangso", emoji: "📍" },
            { word: "한국", translation: "كوريا", pronunciation: "hanguk", emoji: "🇰🇷" },
            { word: "학교", translation: "مدرسة", pronunciation: "hakgyo", emoji: "🏫" },
            { word: "대학교", translation: "جامعة", pronunciation: "daehakgyo", emoji: "🎓" },
            { word: "병원", translation: "مستشفى", pronunciation: "byeongwon", emoji: "🏥" },
            { word: "식당", translation: "مطعم", pronunciation: "sikdang", emoji: "🏨" },
            { word: "공항", translation: "مطار", pronunciation: "gonghang", emoji: "✈️" },
            { word: "기차역", translation: "محطة قطار", pronunciation: "gichayeok", emoji: "🚉" },
            { word: "공원", translation: "حديقة عامة", pronunciation: "gongwon", emoji: "🌳" },
            { word: "도서관", translation: "مكتبة", pronunciation: "doseogwan", emoji: "📚" },
            { word: "은행", translation: "بنك", pronunciation: "eunhaeng", emoji: "🏦" },
            { word: "회사", translation: "شركة", pronunciation: "hoesa", emoji: "🏢" },
            { word: "집", translation: "منزل", pronunciation: "jip", emoji: "🏡" },
            { word: "영화관", translation: "سينما", pronunciation: "yeonghwagwan", emoji: "🎬" },
        ],
        readingExercises: [
            readingExercise("학교가 어디에 있어요?", "سؤال عن مكان", "أين هي المدرسة؟", ["أنا في المنزل.", "هو في المستشفى.", "لنذهب إلى السينما."]),
            readingExercise("기차를 타고 부산에 가요.", "السفر إلى مكان", "أسافر إلى بوسان بالقطار.", ["المكتبة بجوار البنك.", "هذا المطعم مشهور.", "الشركة في سيول."])
        ],
        listeningExercises: [
            listeningExercise("학교", "المكان الذي يدرس فيه الطلاب.", ["병원", "회사", "식당"]),
            listeningExercise("집", "المكان الذي تعيش فيه.", ["공원", "가게", "은행"]),
            listeningExercise("공항", "المكان الذي تقلع منه الطائرات.", ["기차역", "지하철역", "버스 정류장"])
        ]
    },
    nature: {
        words: [
            { word: "자연", translation: "طبيعة", pronunciation: "jayeon", emoji: "🏞️" },
            { word: "나무", translation: "شجرة", pronunciation: "namu", emoji: "🌳" },
            { word: "꽃", translation: "زهرة", pronunciation: "kkot", emoji: "🌸" },
            { word: "풀", translation: "عشب", pronunciation: "pul", emoji: "🌿" },
            { word: "해", translation: "شمس", pronunciation: "hae", emoji: "☀️" },
            { word: "달", translation: "قمر", pronunciation: "dal", emoji: "🌙" },
            { word: "별", translation: "نجمة", pronunciation: "byeol", emoji: "⭐" },
            { word: "하늘", translation: "سماء", pronunciation: "haneul", emoji: "☁️" },
            { word: "불", translation: "نار", pronunciation: "bul", emoji: "🔥" },
            { word: "산", translation: "جبل", pronunciation: "san", emoji: "⛰️" },
            { word: "강", translation: "نهر", pronunciation: "gang", emoji: "🏞️" },
            { word: "바다", translation: "بحر", pronunciation: "bada", emoji: "🌊" },
            { word: "동물", translation: "حيوان", pronunciation: "dongmul", emoji: "🐾" },
            { word: "개", translation: "كلب", pronunciation: "gae", emoji: "🐕" },
            { word: "고양이", translation: "قطة", pronunciation: "goyangi", emoji: "🐈" },
            { word: "새", translation: "طائر", pronunciation: "sae", emoji: "🐦" },
        ],
        readingExercises: [
            readingExercise("공원에는 나무와 꽃이 많아요.", "وصف الحديقة", "يوجد الكثير من الأشجار والزهور في الحديقة.", ["الجبل عال جداً.", "أنا أحب البحر.", "انظر، هناك طائر جميل."]),
            readingExercise("밤하늘의 달이 밝아요.", "وصف القمر", "قمر سماء الليل مضيء.", ["الشمس حارة.", "النار خطيرة.", "القطة لطيفة."])
        ],
        listeningExercises: [
            listeningExercise("동물", "كلمة عامة للحيوانات.", ["식물", "자연", "사람"]),
            listeningExercise("해", "النجم الذي يضيء في النهار.", ["달", "별", "하늘"]),
            listeningExercise("고양이", "حيوان أليف يقول 'يا옹'.", ["개", "새", "물고기"])
        ]
    },
    hobbies: {
        words: [
            { word: "취미", translation: "هواية", pronunciation: "chwimi", emoji: "🎨" },
            { word: "독서", translation: "قراءة", pronunciation: "dokseo", emoji: "📖" },
            { word: "음악 감상", translation: "الاستماع للموسيقى", pronunciation: "eumak gamsang", emoji: "🎵" },
            { word: "영화 보기", translation: "مشاهدة الأفلام", pronunciation: "yeonghwa bogi", emoji: "🎬" },
            { word: "운동", translation: "رياضة", pronunciation: "undong", emoji: "⚽" },
            { word: "그림 그리기", translation: "رسم", pronunciation: "geurim geurigi", emoji: "✏️" },
            { word: "여행", translation: "سفر", pronunciation: "yeohaeng", emoji: "✈️" },
            { word: "요리", translation: "طبخ", pronunciation: "yori", emoji: "🍳" },
            { word: "게임", translation: "ألعاب", pronunciation: "geim", emoji: "🎮" },
            { word: "사진 찍기", translation: "تصوير", pronunciation: "sajin jjikgi", emoji: "📸" },
            { word: "춤", translation: "رقص", pronunciation: "chum", emoji: "💃" },
            { word: "노래 부르기", translation: "غناء", pronunciation: "norae bureugi", emoji: "🎤" },
            { word: "쇼핑", translation: "تسوق", pronunciation: "syoping", emoji: "🛍️" },
        ],
        readingExercises: [
            readingExercise("제 취미는 책을 읽고 음악을 듣는 것이에요.", "التحدث عن الهوايات", "هوايتي هي قراءة الكتب والاستماع للموسيقى.", ["هو يحب ممارسة الرياضة.", "هل تحب السفر؟", "هي جيدة جداً في الطبخ."]),
            readingExercise("주말에 영화 보러 갈까요?", "اقتراح نشاط", "هل نذهب لمشاهدة فيلم في نهاية الأسبوع؟", ["هو يحب لعب ألعاب الكمبيوتر.", "الرقص هواية جيدة.", "أخي يحب الغناء."])
        ],
        listeningExercises: [
            listeningExercise("취미", "الشيء الذي تحب أن تفعله في وقت فراغك.", ["일", "공부", "가족"]),
            listeningExercise("운동", "نشاط بدني مثل كرة القدم أو السباحة.", ["음악", "영화", "독서"]),
            listeningExercise("여행", "فعل زيارة أماكن جديدة.", ["요리", "그림", "노래"])
        ]
    },
    emotions: {
        words: [
            { word: "기쁘다", translation: "سعيد", pronunciation: "gippeuda", emoji: "😄" },
            { word: "행복하다", translation: "سعيد/مسرور", pronunciation: "haengbokada", emoji: "😊" },
            { word: "슬프다", translation: "حزين", pronunciation: "seulpeuda", emoji: "😢" },
            { word: "화나다", translation: "غاضب", pronunciation: "hwanada", emoji: "😠" },
            { word: "무섭다", translation: "خائف", pronunciation: "museopda", emoji: "😨" },
            { word: "피곤하다", translation: "متعب", pronunciation: "pigonhada", emoji: "😴" },
            { word: "심심하다", translation: "ملل", pronunciation: "simsimhada", emoji: "😒" },
            { word: "신나다", translation: "متحمس", pronunciation: "sinnada", emoji: "🤩" },
            { word: "사랑", translation: "حب", pronunciation: "sarang", emoji: "❤️" },
            { word: "좋아하다", translation: "إعجاب", pronunciation: "joahada", emoji: "👍" },
            { word: "걱정되다", translation: "قلق", pronunciation: "geokjeongdoeda", emoji: "😟" },
            { word: "놀라다", translation: "متفاجئ", pronunciation: "nollada", emoji: "😲" },
            { word: "긴장되다", translation: "متوتر", pronunciation: "ginjangdoeda", emoji: "😥" },
        ],
        readingExercises: [
            readingExercise("당신을 만나서 기뻐요.", "التعبير عن السعادة", "أنا سعيد لرؤيتك.", ["لماذا أنت غاضب؟", "لا تخف.", "أنا متعب قليلاً."]),
            readingExercise("시험을 잘 못 봐서 슬퍼요.", "سبب الحزن", "أنا حزين لأنني لم أبلِ حسناً في الامتحان.", ["لا تقلق عليه.", "أنا متحمس جداً للرحلة.", "هذا الفيلم ممل."])
        ],
        listeningExercises: [
            listeningExercise("기쁘다", "الشعور بالسعادة.", ["슬프다", "화나다", "무섭다"]),
            listeningExercise("피곤하다", "عندما تحتاج إلى الراحة.", ["바쁘다", "배고프다", "아프다"]),
            listeningExercise("사랑", "شعور قوي بالمودة.", ["미움", "공포", "희망"])
        ]
    },
    work: {
        words: [
            { word: "일", translation: "عمل", pronunciation: "il", emoji: "🏢" },
            { word: "회사", translation: "شركة", pronunciation: "hoesa", emoji: "🏭" },
            { word: "사무실", translation: "مكتب", pronunciation: "samusil", emoji: "🏢" },
            { word: "사장님", translation: "رئيس الشركة", pronunciation: "sajangnim", emoji: "👨‍💼" },
            { word: "직원", translation: "موظف", pronunciation: "jigwon", emoji: "🧑‍💼" },
            { word: "동료", translation: "زميل", pronunciation: "dongnyo", emoji: "👥" },
            { word: "월급", translation: "راتب", pronunciation: "wolgeup", emoji: "💵" },
            { word: "회의", translation: "اجتماع", pronunciation: "hoeui", emoji: "🤝" },
            { word: "이메일", translation: "بريد إلكتروني", pronunciation: "imeil", emoji: "📧" },
            { word: "컴퓨터", translation: "حاسوب", pronunciation: "keompyuteo", emoji: "💻" },
            { word: "전화", translation: "هاتف", pronunciation: "jeonhwa", emoji: "📱" },
            { word: "프로젝트", translation: "مشروع", pronunciation: "peurojekteu", emoji: "📈" },
            { word: "바쁘다", translation: "مشغول", pronunciation: "bappeuda", emoji: "🏃‍♂️" },
            { word: "야근", translation: "عمل إضافي", pronunciation: "yageun", emoji: "🌃" },
            { word: "휴가", translation: "إجازة", pronunciation: "hyuga", emoji: "🏖️" },
            { word: "의사", translation: "طبيب", pronunciation: "uisa", emoji: "🧑‍⚕️" },
            { word: "선생님", translation: "معلم", pronunciation: "seonsaengnim", emoji: "👨‍🏫" },
            { word: "학생", translation: "طالب", pronunciation: "haksaeng", emoji: "🧑‍🎓" },
        ],
        readingExercises: [
            readingExercise("저는 한국 회사에서 일해요.", "مكان العمل", "أنا أعمل في شركة كورية.", ["الرئيس في اجتماع.", "راتبي ليس مرتفعاً.", "أنا مشغول جداً هذا الأسبوع."]),
            readingExercise("전화번호 좀 알려주세요.", "طلب معلومات الاتصال", "من فضلك أعطني رقم هاتفك.", ["زميلي لطيف جداً.", "لدينا مشروع جديد.", "غداً سآخذ إجازة."])
        ],
        listeningExercises: [
            listeningExercise("일", "الكلمة العامة للعمل أو الوظيفة.", ["회사", "학교", "집"]),
            listeningExercise("회의", "اجتماع لمناقشة أمور العمل.", ["휴가", "프로젝트", "월급"]),
            listeningExercise("선생님", "الشخص الذي يعلم في المدرسة.", ["의사", "학생", "사장님"])
        ]
    },
    travel: {
        words: [
            { word: "여행", translation: "سفر/رحلة", pronunciation: "yeohaeng", emoji: "🌍" },
            { word: "휴가", translation: "عطلة", pronunciation: "hyuga", emoji: "🏖️" },
            { word: "공항", translation: "مطار", pronunciation: "gonghang", emoji: "✈️" },
            { word: "비행기", translation: "طائرة", pronunciation: "bihaenggi", emoji: "✈️" },
            { word: "여권", translation: "جواز سفر", pronunciation: "yeogwon", emoji: "🛂" },
            { word: "표", translation: "تذكرة", pronunciation: "pyo", emoji: "🎟️" },
            { word: "호텔", translation: "فندق", pronunciation: "hotel", emoji: "🏨" },
            { word: "기차", translation: "قطار", pronunciation: "gicha", emoji: "🚆" },
            { word: "자동차", translation: "سيارة", pronunciation: "jadongcha", emoji: "🚗" },
            { word: "버스", translation: "حافلة", pronunciation: "beoseu", emoji: "🚌" },
            { word: "택시", translation: "سيارة أجرة", pronunciation: "taeksi", emoji: "🚕" },
            { word: "지도", translation: "خريطة", pronunciation: "jido", emoji: "🗺️" },
            { word: "짐", translation: "أمتعة", pronunciation: "jim", emoji: "🧳" },
            { word: "관광객", translation: "سائح", pronunciation: "gwangwanggaek", emoji: "📸" },
            { word: "예약하다", translation: "يحجز", pronunciation: "yeyakada", emoji: "📝" },
            { word: "선물", translation: "هدية", pronunciation: "seonmul", emoji: "🎁" },
        ],
        readingExercises: [
            readingExercise("서울행 기차표를 사야 해요.", "شراء تذكرة", "أحتاج إلى شراء تذكرة قطار إلى سيول.", ["أين جواز سفري؟", "لقد حجزت فندقاً.", "المطار بعيد جداً."]),
            readingExercise("제주도로 여행을 갑시다.", "اقتراح وجهة سفر", "لنذهب في رحلة إلى جزيرة جيجو.", ["هناك الكثير من السياح هنا.", "أمتعتي ثقيلة جداً.", "سآخذ سيارة أجرة."])
        ],
        listeningExercises: [
            listeningExercise("여행", "فعل السفر أو السياحة.", ["일", "공부", "식사"]),
            listeningExercise("비행기", "وسيلة نقل تطير في السماء.", ["기차", "자동차", "배"]),
            listeningExercise("호텔", "المكان الذي تقيم فيه عند السفر.", ["집", "학교", "병원"])
        ]
    },
    animals: {
        words: [
            { word: "동물", translation: "حيوان", pronunciation: "dongmul", emoji: "🐾" },
            { word: "개", translation: "كلب", pronunciation: "gae", emoji: "🐕" },
            { word: "고양이", translation: "قطة", pronunciation: "goyangi", emoji: "🐈" },
            { word: "사자", translation: "أسد", pronunciation: "saja", emoji: "🦁" },
            { word: "호랑이", translation: "نمر", pronunciation: "horangi", emoji: "🐅" },
            { word: "코끼리", translation: "فيل", pronunciation: "kokkiri", emoji: "🐘" },
            { word: "원숭이", translation: "قرد", pronunciation: "wonsungi", emoji: "🐒" },
            { word: "말", translation: "حصان", pronunciation: "mal", emoji: "🐎" },
            { word: "새", translation: "طائر", pronunciation: "sae", emoji: "🐦" },
            { word: "물고기", translation: "سمكة", pronunciation: "mulgogi", emoji: "🐟" },
        ],
        readingExercises: [
            readingExercise("사자는 동물의 왕이에요.", "وصف حيوان", "الأسد هو ملك الحيوانات.", ["القطة تشرب الحليب.", "أحب الكلاب كثيرا.", "الفيل حيوان كبير جدا."]),
        ],
        listeningExercises: [
            listeningExercise("코끼리", "حيوان كبير له خرطوم.", ["개", "고양이", "원숭이"]),
        ]
    },
    transportation: {
        words: [
            { word: "차", translation: "سيارة/شاي", pronunciation: "cha", emoji: "🚗" },
            { word: "버스", translation: "حافلة", pronunciation: "beoseu", emoji: "🚌" },
            { word: "기차", translation: "قطار", pronunciation: "gicha", emoji: "🚆" },
            { word: "비행기", translation: "طائرة", pronunciation: "bihaenggi", emoji: "✈️" },
            { word: "자전거", translation: "دراجة هوائية", pronunciation: "jajeongeo", emoji: "🚲" },
            { word: "오토바이", translation: "دراجة نارية", pronunciation: "otobai", emoji: "🏍️" },
            { word: "배", translation: "سفينة/بطن", pronunciation: "bae", emoji: "🚢" },
            { word: "택시", translation: "سيارة أجرة", pronunciation: "taeksi", emoji: "🚕" },
            { word: "지하철", translation: "مترو الأنفاق", pronunciation: "jihacheol", emoji: "🚇" },
        ],
        readingExercises: [
            readingExercise("저는 버스를 타고 회사에 가요.", "وسيلة النقل", "أذهب إلى العمل بالحافلة.", ["القطار سريع جدا.", "هل يمكنك قيادة سيارة؟", "السفر بالطائرة مريح."]),
        ],
        listeningExercises: [
            listeningExercise("기차", "وسيلة نقل تسير على قضبان.", ["차", "버스", "비행기"]),
        ]
    },
    education: {
        words: [
            { word: "학교", translation: "مدرسة", pronunciation: "hakgyo", emoji: "🏫" },
            { word: "대학교", translation: "جامعة", pronunciation: "daehakgyo", emoji: "🎓" },
            { word: "선생님", translation: "معلم", pronunciation: "seonsaengnim", emoji: "👨‍🏫" },
            { word: "학생", translation: "طالب", pronunciation: "haksaeng", emoji: "🧑‍🎓" },
            { word: "책", translation: "كتاب", pronunciation: "chaek", emoji: "📚" },
            { word: "펜", translation: "قلم", pronunciation: "pen", emoji: "🖊️" },
            { word: "시험", translation: "امتحان", pronunciation: "siheom", emoji: "📝" },
            { word: "숙제", translation: "واجب منزلي", pronunciation: "sukje", emoji: "📓" },
            { word: "교실", translation: "فصل دراسي", pronunciation: "gyosil", emoji: "🧑‍🏫" },
            { word: "공부하다", translation: "يدرس", pronunciation: "gongbuhada", emoji: "🧠" },
        ],
        readingExercises: [
            readingExercise("선생님은 교실에 있어요.", "وصف مشهد دراسي", "المعلم في الفصل الدراسي.", ["لدي امتحان صعب غدا.", "يجب أن أفعل واجبي.", "الطلاب يقرؤون الكتب."]),
        ],
        listeningExercises: [
            listeningExercise("책", "شيء تقرأه.", ["펜", "시험", "학교"]),
        ]
    },
    health: {
        words: [
            { word: "의사", translation: "طبيب", pronunciation: "uisa", emoji: "🧑‍⚕️" },
            { word: "간호사", translation: "ممرضة", pronunciation: "ganhosa", emoji: "👩‍⚕️" },
            { word: "병원", translation: "مستشفى", pronunciation: "byeongwon", emoji: "🏥" },
            { word: "약", translation: "دواء", pronunciation: "yak", emoji: "💊" },
            { word: "아프다", translation: "مريض/مؤلم", pronunciation: "apeuda", emoji: "🤒" },
            { word: "건강", translation: "صحة", pronunciation: "geongang", emoji: "💪" },
            { word: "두통", translation: "صداع", pronunciation: "dutong", emoji: "🤕" },
            { word: "복통", translation: "ألم في المعدة", pronunciation: "boktong", emoji: "🤢" },
            { word: "열", translation: "حمى", pronunciation: "yeol", emoji: "🌡️" },
            { word: "구급차", translation: "سيارة إسعاف", pronunciation: "gugeupcha", emoji: "🚑" },
        ],
        readingExercises: [
            readingExercise("몸이 아파서 의사를 만나야 해요.", "وصف حالة صحية", "أنا مريض، أحتاج لرؤية طبيب.", ["خذ هذا الدواء.", "المستشفى كبير ونظيف.", "لدي حمى وصداع."]),
        ],
        listeningExercises: [
            listeningExercise("의사", "الشخص الذي تذهب إليه عندما تكون مريضا.", ["간호사", "선생님", "학생"]),
        ]
    },
    technology: {
        words: [
            { word: "컴퓨터", translation: "حاسوب", pronunciation: "keompyuteo", emoji: "💻" },
            { word: "핸드폰", translation: "هاتف محمول", pronunciation: "haendeupon", emoji: "📱" },
            { word: "인터넷", translation: "إنترنت", pronunciation: "inteonet", emoji: "🌐" },
            { word: "이메일", translation: "بريد إلكتروني", pronunciation: "imeil", emoji: "📧" },
            { word: "웹사이트", translation: "موقع إلكتروني", pronunciation: "wepsaiteu", emoji: "🕸️" },
            { word: "비밀번호", translation: "كلمة المرور", pronunciation: "bimilbeonho", emoji: "🔒" },
            { word: "키보드", translation: "لوحة مفاتيح", pronunciation: "kibodeu", emoji: "⌨️" },
            { word: "마우스", translation: "فأرة", pronunciation: "mauseu", emoji: "🖱️" },
            { word: "화면", translation: "شاشة", pronunciation: "hwamyeon", emoji: "🖥️" },
            { word: "소프트웨어", translation: "برنامج", pronunciation: "sopeuteuweeo", emoji: "💿" },
        ],
        readingExercises: [
            readingExercise("저는 매일 컴퓨터로 인터넷을 해요.", "استخدام التكنولوجيا", "أستخدم الإنترنت كل يوم على حاسوبي.", ["لقد نسيت كلمة المرور الخاصة بي.", "أرسل لي بريداً إلكترونياً.", "هذا الموقع مفيد جدا."]),
        ],
        listeningExercises: [
            listeningExercise("인터넷", "شبكة عالمية تربط الحواسيب.", ["컴퓨터", "핸드폰", "이메일"]),
        ]
    },
    restaurant: {
        words: [
            { word: "식당", translation: "مطعم", pronunciation: "sikdang", emoji: "🍴" },
            { word: "메뉴", translation: "قائمة طعام", pronunciation: "menyu", emoji: "📜" },
            { word: "종업원", translation: "نادل", pronunciation: "jong-obwon", emoji: "🤵" },
            { word: "계산서", translation: "فاتورة", pronunciation: "gyesanseo", emoji: "🧾" },
            { word: "주문하다", translation: "يطلب", pronunciation: "jumunhada", emoji: "✍️" },
            { word: "맛있다", translation: "لذيذ", pronunciation: "masitda", emoji: "😋" },
            { word: "포크", translation: "شوكة", pronunciation: "pokeu", emoji: "🍴" },
            { word: "숟가락", translation: "ملعقة", pronunciation: "sutgarak", emoji: "🥄" },
            { word: "젓가락", translation: "عيدان طعام", pronunciation: "jeotgarak", emoji: "🥢" },
            { word: "접시", translation: "طبق", pronunciation: "jeopsi", emoji: "🍽️" },
        ],
        readingExercises: [
            readingExercise("메뉴 좀 보여주세요.", "في المطعم", "أرني القائمة من فضلك.", ["الطعام لذيذ.", "أريد أن أطلب الآن.", "الفاتورة من فضلك."]),
        ],
        listeningExercises: [
            listeningExercise("메뉴", "قائمة الأطباق في المطعم.", ["계산서", "종업원", "포크"]),
        ]
    },
    daily_routines: {
        words: [
            { word: "일어나다", translation: "يستيقظ", pronunciation: "ireonada", emoji: "⏰" },
            { word: "아침을 먹다", translation: "يأكل الفطور", pronunciation: "achimeul meokda", emoji: "🍳" },
            { word: "출근하다", translation: "يذهب للعمل", pronunciation: "chulgeunhada", emoji: "💼" },
            { word: "공부하다", translation: "يدرس", pronunciation: "gongbuhada", emoji: "📚" },
            { word: "점심을 먹다", translation: "يأكل الغداء", pronunciation: "jeomsimeul meokda", emoji: "🍱" },
            { word: "집에 오다", translation: "يعود للمنزل", pronunciation: "jibe oda", emoji: "🏡" },
            { word: "저녁을 만들다", translation: "يطبخ العشاء", pronunciation: "jeonyeogeul mandeulda", emoji: "🍝" },
            { word: "텔레비전을 보다", translation: "يشاهد التلفاز", pronunciation: "tellebijeoneul boda", emoji: "📺" },
            { word: "책을 읽다", translation: "يقرأ كتاباً", pronunciation: "chaegeul ikda", emoji: "📖" },
            { word: "자다", translation: "ينام", pronunciation: "jada", emoji: "😴" },
        ],
        readingExercises: [
            readingExercise("저는 매일 아침 7시에 일어나요.", "روتين يومي", "أستيقظ الساعة 7 صباحاً كل يوم.", ["هو يذهب إلى العمل بالسيارة.", "بعد العشاء، أشاهد التلفاز.", "أنا أدرس في المساء."]),
        ],
        listeningExercises: [
            listeningExercise("일어나다", "أول شيء تفعله في الصباح.", ["자다", "먹다", "공부하다"]),
        ]
    },
    countries: {
        words: [
            { word: "나라", translation: "دولة", pronunciation: "nara", emoji: "🌍" },
            { word: "국적", translation: "جنسية", pronunciation: "gukjeok", emoji: "🆔" },
            { word: "한국", translation: "كوريا", pronunciation: "hanguk", emoji: "🇰🇷" },
            { word: "미국", translation: "أمريكا", pronunciation: "miguk", emoji: "🇺🇸" },
            { word: "일본", translation: "اليابان", pronunciation: "ilbon", emoji: "🇯🇵" },
            { word: "중국", translation: "الصين", pronunciation: "jungguk", emoji: "🇨🇳" },
            { word: "이집트", translation: "مصر", pronunciation: "ijipteu", emoji: "🇪🇬" },
            { word: "프랑스", translation: "فرنسا", pronunciation: "peurangseu", emoji: "🇫🇷" },
            { word: "독일", translation: "ألمانيا", pronunciation: "dogil", emoji: "🇩🇪" },
            { word: "수도", translation: "عاصمة", pronunciation: "sudo", emoji: "🏛️" },
        ],
        readingExercises: [
            readingExercise("서울은 한국의 수도입니다.", "عواصم الدول", "سيول هي عاصمة كوريا.", ["أنا من مصر.", "هو يتحدث الصينية.", "نيويورك مدينة كبيرة في أمريكا."]),
        ],
        listeningExercises: [
            listeningExercise("한국", "بلد الكيمتشي والكيبوب.", ["이집트", "프랑스", "미국"]),
        ]
    },
    sports: {
        words: [
            { word: "운동", translation: "رياضة", pronunciation: "undong", emoji: "🏅" },
            { word: "축구", translation: "كرة القدم", pronunciation: "chukgu", emoji: "⚽" },
            { word: "농구", translation: "كرة السلة", pronunciation: "nonggu", emoji: "🏀" },
            { word: "야구", translation: "بيسبول", pronunciation: "yagu", emoji: "⚾" },
            { word: "수영", translation: "سباحة", pronunciation: "suyeong", emoji: "🏊" },
            { word: "달리기", translation: "جري", pronunciation: "dalligi", emoji: "🏃" },
            { word: "경기", translation: "مباراة/منافسة", pronunciation: "gyeonggi", emoji: "🏆" },
            { word: "이기다", translation: "يفوز", pronunciation: "igida", emoji: "🥇" },
            { word: "지다", translation: "يخسر", pronunciation: "jida", emoji: "👎" },
            { word: "팀", translation: "فريق", pronunciation: "tim", emoji: "👥" },
        ],
        readingExercises: [
            readingExercise("제가 가장 좋아하는 운동은 축구예요.", "رياضة مفضلة", "رياضتي المفضلة هي كرة القدم.", ["هو يلعب البيسبول كل نهاية أسبوع.", "فريقنا فاز بالمباراة.", "أذهب للسباحة مرتين في الأسبوع."]),
        ],
        listeningExercises: [
            listeningExercise("축구", "رياضة بها 11 لاعباً وكرة.", ["농구", "야구", "수영"]),
        ]
    },
    music_arts: {
        words: [
            { word: "음악", translation: "موسيقى", pronunciation: "eumak", emoji: "🎵" },
            { word: "미술", translation: "فن", pronunciation: "misul", emoji: "🖼️" },
            { word: "노래", translation: "أغنية", pronunciation: "norae", emoji: "🎶" },
            { word: "예술가", translation: "فنان", pronunciation: "yesulga", emoji: "🧑‍🎨" },
            { word: "그리다", translation: "يرسم", pronunciation: "geurida", emoji: "🎨" },
            { word: "노래하다", translation: "يغني", pronunciation: "noraehada", emoji: "🎤" },
            { word: "춤추다", translation: "يرقص", pronunciation: "chumchuda", emoji: "💃" },
            { word: "박물관", translation: "متحف", pronunciation: "bangmulgwan", emoji: "🏛️" },
            { word: "극장", translation: "مسرح", pronunciation: "geukjang", emoji: "🎭" },
            { word: "영화", translation: "فيلم", pronunciation: "yeonghwa", emoji: "🎬" },
        ],
        readingExercises: [
            readingExercise("클래식 음악 듣는 것을 좋아해요.", "تفضيلات فنية", "أحب الاستماع إلى الموسيقى الكلاسيكية.", ["هي فنانة موهوبة.", "لنذهب إلى المتحف يوم السبت.", "هذه الأغنية مشهورة جدا."]),
        ],
        listeningExercises: [
            listeningExercise("음악", "فن الأصوات.", ["미술", "영화", "노래"]),
        ]
    }
};
