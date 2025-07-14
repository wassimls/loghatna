

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

export const SPANISH_CONTENT: { [categoryName: string]: CategoryContent; } = {
    alphabet: {
        words: [
            { word: "a", translation: "آ", pronunciation: "/a/", emoji: "✈️" },
            { word: "b", translation: "بيه", pronunciation: "/be/", emoji: "🎈" },
            { word: "c", translation: "ثيه", pronunciation: "/θe/", emoji: "🏠" },
            { word: "d", translation: "ديه", pronunciation: "/de/", emoji: "🎲" },
            { word: "e", translation: "إيه", pronunciation: "/e/", emoji: "🐘" },
            { word: "f", translation: "إيفيه", pronunciation: "/ˈefe/", emoji: "🌸" },
            { word: "g", translation: "خيه", pronunciation: "/xe/", emoji: "🐈" },
            { word: "h", translation: "آتشيه", pronunciation: "(صامت)", emoji: "🏨" },
            { word: "i", translation: "إي", pronunciation: "/i/", emoji: "🏝️" },
            { word: "j", translation: "خوتا", pronunciation: "/ˈxota/", emoji: "🦒" },
            { word: "k", translation: "كا", pronunciation: "/ka/", emoji: "🥝" },
            { word: "l", translation: "إيليه", pronunciation: "/ˈele/", emoji: "🌙" },
            { word: "m", translation: "إيميه", pronunciation: "/ˈeme/", emoji: "🦋" },
            { word: "n", translation: "إينيه", pronunciation: "/ˈene/", emoji: "👃" },
            { word: "ñ", translation: "إينييه", pronunciation: "/ˈeɲe/", emoji: "🧒" },
            { word: "o", translation: "أو", pronunciation: "/o/", emoji: "🐻" },
            { word: "p", translation: "پيه", pronunciation: "/pe/", emoji: "🐧" },
            { word: "q", translation: "كو", pronunciation: "/ku/", emoji: "🧀" },
            { word: "r", translation: "إرّيه", pronunciation: "/ˈerre/", emoji: "🤖" },
            { word: "s", translation: "إيسيه", pronunciation: "/ˈese/", emoji: "☀️" },
            { word: "t", translation: "تيه", pronunciation: "/te/", emoji: "🐢" },
            { word: "u", translation: "أو", pronunciation: "/u/", emoji: "🍇" },
            { word: "v", translation: "أوبيه", pronunciation: "/ˈube/", emoji: "🎻" },
            { word: "w", translation: "أوبيه دوبليه", pronunciation: "/ube ˈdoble/", emoji: "🍉" },
            { word: "x", translation: "إيكيس", pronunciation: "/ˈekis/", emoji: " xylophone" },
            { word: "y", translation: "إي غرييغا", pronunciation: "/i ˈɣɾjeɣa/", emoji: " yogurt" },
            { word: "z", translation: "ثيتا", pronunciation: "/ˈθeta/", emoji: "🦓" },
        ],
        readingExercises: [
            readingExercise("El niño come una manzana.", "لاحظ حرف 'ñ' في كلمة 'niño'.", "الطفل يأكل تفاحة.", ["El perro corre.", "La casa es grande.", "Bebo agua."]),
            readingExercise("¿Qué queso quieres?", "صوت حرف 'q'.", "أي جبن تريد؟", ["Hola, ¿cómo estás?", "Adiós.", "Gracias."])
        ],
        listeningExercises: [
            listeningExercise("b", "صوته مثل 'v'.", ["v", "p", "d"]),
            listeningExercise("ñ", "حرف فريد في الإسبانية.", ["n", "m", "l"])
        ]
    },
    basics: {
        words: [
            { word: "Yo", translation: "أنا", pronunciation: "يو", emoji: "👤" },
            { word: "Tú", translation: "أنت", pronunciation: "تو", emoji: "👥" },
            { word: "Él", translation: "هو", pronunciation: "إل", emoji: "👨" },
            { word: "Ella", translation: "هي", pronunciation: "إيا", emoji: "👩" },
            { word: "Nosotros", translation: "نحن", pronunciation: "نوسوتروس", emoji: "👨‍👩‍👧‍👦" },
            { word: "Sí", translation: "نعم", pronunciation: "سي", emoji: "👍" },
            { word: "No", translation: "لا", pronunciation: "نو", emoji: "👎" },
            { word: "Gracias", translation: "شكراً", pronunciation: "غراسياس", emoji: "😊" },
            { word: "Por favor", translation: "من فضلك", pronunciation: "بور فافور", emoji: "🙏" },
            { word: "¿Qué?", translation: "ماذا؟", pronunciation: "كيه؟", emoji: "❓" },
            { word: "¿Quién?", translation: "من؟", pronunciation: "كيين؟", emoji: "❓" },
            { word: "¿Dónde?", translation: "أين؟", pronunciation: "دوندي؟", emoji: "📍" },
            { word: "¿Cuándo?", translation: "متى؟", pronunciation: "كواندو؟", emoji: "⏰" },
            { word: "¿Por qué?", translation: "لماذا؟", pronunciation: "بور كيه؟", emoji: "🤔" },
        ],
        readingExercises: [
            readingExercise("Hola, ¿cómo estás?", "تحية وسؤال عن الحال", "مرحباً، كيف حالك؟", ["أنا بخير، شكراً.", "ما اسمك؟", "مع السلامة."])
        ],
        listeningExercises: [
            listeningExercise("Gracias", "تستخدم للشكر", ["Hola", "Adiós", "Sí"])
        ]
    },
    greetings: {
        words: [
            { word: "Hola", translation: "مرحباً", pronunciation: "أولا", emoji: "👋" },
            { word: "Buenos días", translation: "صباح الخير", pronunciation: "بوينوس دياس", emoji: "☀️" },
            { word: "Buenas tardes", translation: "مساء الخير", pronunciation: "بويناس تارديس", emoji: "🌇" },
            { word: "Buenas noches", translation: "مساء الخير/تصبح على خير", pronunciation: "بويناس نوتشيس", emoji: "🌃" },
            { word: "Adiós", translation: "مع السلامة", pronunciation: "أديوس", emoji: "👋" },
            { word: "Hasta luego", translation: "أراك لاحقاً", pronunciation: "أستا لويغو", emoji: "👀" },
            { word: "¿Cómo estás?", translation: "كيف حالك؟", pronunciation: "كومو إستاس؟", emoji: "❓" },
            { word: "Estoy bien", translation: "أنا بخير", pronunciation: "إستوي بيين", emoji: "😊" },
            { word: "¿Y tú?", translation: "وأنت؟", pronunciation: "إي تو؟", emoji: "❓" },
            { word: "Me llamo...", translation: "اسمي هو...", pronunciation: "مي يامو...", emoji: "🏷️" },
            { word: "Mucho gusto", translation: "تشرفنا", pronunciation: "موتشو غوستو", emoji: "🤝" }
        ],
        readingExercises: [
            readingExercise("Buenos días, me llamo Juan. ¿Y tú?", "تقديم النفس", "صباح الخير، اسمي خوان. وأنت؟", ["مع السلامة.", "شكراً جزيلاً.", "أنا لا أفهم."])
        ],
        listeningExercises: [
            listeningExercise("Hola", "التحية الأكثر شيوعاً", ["Adiós", "Gracias", "Por favor"])
        ]
    },
    food: {
        words: [
            { word: "Comida", translation: "طعام", pronunciation: "كوميدا", emoji: "🍔" },
            { word: "Agua", translation: "ماء", pronunciation: "آغوا", emoji: "💧" },
            { word: "Pan", translation: "خبز", pronunciation: "بان", emoji: "🍞" },
            { word: "Queso", translation: "جبن", pronunciation: "كيسو", emoji: "🧀" },
            { word: "Manzana", translation: "تفاحة", pronunciation: "مانثانا", emoji: "🍎" },
            { word: "Pollo", translation: "دجاج", pronunciation: "بويو", emoji: "🍗" },
            { word: "Arroz", translation: "أرز", pronunciation: "آرروث", emoji: "🍚" },
            { word: "Pescado", translation: "سمك", pronunciation: "بيسكادو", emoji: "🐟" },
            { word: "Carne", translation: "لحم", pronunciation: "كارنيه", emoji: "🥩" },
            { word: "Verduras", translation: "خضروات", pronunciation: "بيردوراس", emoji: "🥕" }
        ],
        readingExercises: [
            readingExercise("Quiero comer paella.", "طلب طعام", "أريد أن آكل باييا.", ["أنا عطشان.", "هذا لذيذ.", "الحساب من فضلك."])
        ],
        listeningExercises: [
            listeningExercise("Agua", "شراب أساسي", ["Leche", "Vino", "Jugo"])
        ]
    },
    family: {
        words: [
            { word: "Familia", translation: "عائلة", pronunciation: "فاميليا", emoji: "👨‍👩‍👧‍👦" },
            { word: "Padre", translation: "أب", pronunciation: "بادري", emoji: "👨" },
            { word: "Madre", translation: "أم", pronunciation: "مادري", emoji: "👩" },
            { word: "Hijo", translation: "ابن", pronunciation: "إيخو", emoji: "👦" },
            { word: "Hija", translation: "ابنة", pronunciation: "إيخا", emoji: "👧" },
            { word: "Hermano", translation: "أخ", pronunciation: "إرمانو", emoji: "👱‍♂️" },
            { word: "Hermana", translation: "أخت", pronunciation: "إرمانا", emoji: "👱‍♀️" },
            { word: "Abuelo", translation: "جد", pronunciation: "أبويلو", emoji: "👴" },
            { word: "Abuela", translation: "جدة", pronunciation: "أبويلا", emoji: "👵" }
        ],
        readingExercises: [
            readingExercise("Mi madre es profesora.", "مهنة الأم", "أمي معلمة.", ["أبي مهندس.", "لدي أخ واحد.", "أين عائلتك؟"])
        ],
        listeningExercises: [
            listeningExercise("Padre", "كلمة تعني 'أب'", ["Madre", "Hijo", "Abuelo"])
        ]
    },
    home: {
        words: [
            { word: "Casa", translation: "منزل", pronunciation: "كاسا", emoji: "🏠" },
            { word: "Habitación", translation: "غرفة", pronunciation: "أبيتاسيون", emoji: "🚪" },
            { word: "Baño", translation: "حمام", pronunciation: "بانيو", emoji: "🛁" },
            { word: "Cocina", translation: "مطبخ", pronunciation: "كوسينا", emoji: "🍳" },
            { word: "Cama", translation: "سرير", pronunciation: "كاما", emoji: "🛏️" },
            { word: "Mesa", translation: "طاولة", pronunciation: "ميسا", emoji: "🪵" },
            { word: "Silla", translation: "كرسي", pronunciation: "سيا", emoji: "🪑" },
            { word: "Puerta", translation: "باب", pronunciation: "بويرتا", emoji: "🚪" },
            { word: "Ventana", translation: "نافذة", pronunciation: "بينتانا", emoji: "🪟" }
        ],
        readingExercises: [
            readingExercise("La cocina es grande.", "وصف المطبخ", "المطبخ كبير.", ["غرفتي صغيرة.", "أين الحمام؟", "افتح الباب."])
        ],
        listeningExercises: [
            listeningExercise("Casa", "المكان الذي تعيش فيه", ["Coche", "Escuela", "Parque"])
        ]
    },
    work: {
        words: [
            { word: "Trabajo", translation: "عمل", pronunciation: "تراباخو", emoji: "💼" },
            { word: "Oficina", translation: "مكتب", pronunciation: "أوفيسينا", emoji: "🏢" },
            { word: "Compañía", translation: "شركة", pronunciation: "كومبانيا", emoji: "🏭" },
            { word: "Jefe", translation: "مدير", pronunciation: "خيفي", emoji: "👨‍💼" },
            { word: "Salario", translation: "راتب", pronunciation: "سالاريو", emoji: "💵" },
            { word: "Reunión", translation: "اجتماع", pronunciation: "ريونيون", emoji: "🤝" }
        ],
        readingExercises: [
            readingExercise("Tengo una reunión a las 10.", "موعد اجتماع", "لدي اجتماع الساعة 10.", ["أنا أعمل في مكتب.", "مديري لطيف.", "الراتب جيد."])
        ],
        listeningExercises: [
            listeningExercise("Trabajo", "الكلمة العامة للعمل", ["Dinero", "Casa", "Comida"])
        ]
    },
    travel: {
        words: [
            { word: "Viaje", translation: "سفر", pronunciation: "بياخي", emoji: "✈️" },
            { word: "Hotel", translation: "فندق", pronunciation: "أوتيل", emoji: "🏨" },
            { word: "Aeropuerto", translation: "مطار", pronunciation: "آيروبويرتو", emoji: "🛫" },
            { word: "Pasaporte", translation: "جواز سفر", pronunciation: "باسابورتي", emoji: "🛂" },
            { word: "Billete", translation: "تذكرة", pronunciation: "بييتي", emoji: "🎟️" },
            { word: "Maleta", translation: "حقيبة", pronunciation: "ماليتا", emoji: "🧳" }
        ],
        readingExercises: [
            readingExercise("Necesito mi pasaporte para el viaje.", "وثائق السفر", "أحتاج جواز سفري للرحلة.", ["أين الفندق؟", "تذكرتي جاهزة.", "حقيبتي ثقيلة."])
        ],
        listeningExercises: [
            listeningExercise("Hotel", "مكان للإقامة عند السفر", ["Casa", "Oficina", "Restaurante"])
        ]
    },
    numbers: {
        words: [
            { word: "Cero", translation: "صفر", pronunciation: "ثيرو", emoji: "0️⃣" },
            { word: "Uno", translation: "واحد", pronunciation: "أونو", emoji: "1️⃣" },
            { word: "Dos", translation: "اثنان", pronunciation: "دوس", emoji: "2️⃣" },
            { word: "Tres", translation: "ثلاثة", pronunciation: "تريس", emoji: "3️⃣" },
            { word: "Cuatro", translation: "أربعة", pronunciation: "كواترو", emoji: "4️⃣" },
            { word: "Cinco", translation: "خمسة", pronunciation: "ثينكو", emoji: "5️⃣" },
            { word: "Seis", translation: "ستة", pronunciation: "سيس", emoji: "6️⃣" },
            { word: "Siete", translation: "سبعة", pronunciation: "سيتي", emoji: "7️⃣" },
            { word: "Ocho", translation: "ثمانية", pronunciation: "أوتشو", emoji: "8️⃣" },
            { word: "Nueve", translation: "تسعة", pronunciation: "نويبي", emoji: "9️⃣" },
            { word: "Diez", translation: "عشرة", pronunciation: "دييث", emoji: "🔟" },
            { word: "Veinte", translation: "عشرون", pronunciation: "بينتي", emoji: "2️⃣0️⃣" },
            { word: "Cien", translation: "مئة", pronunciation: "ثيين", emoji: "💯" }
        ],
        readingExercises: [
            readingExercise("Tengo dos hermanos y una hermana.", "عدد أفراد العائلة", "لدي أخوين وأخت واحدة.", ["عمري ثلاثون سنة.", "هناك عشرة طلاب.", "هذا يكلف خمسة يورو."])
        ],
        listeningExercises: [
            listeningExercise("Cinco", "الرقم بين أربعة وستة", ["Cuatro", "Seis", "Siete"])
        ]
    },
    colors: {
        words: [
            { word: "Rojo", translation: "أحمر", pronunciation: "روخو", emoji: "🔴" },
            { word: "Verde", translation: "أخضر", pronunciation: "بيردي", emoji: "🟢" },
            { word: "Azul", translation: "أزرق", pronunciation: "أثول", emoji: "🔵" },
            { word: "Amarillo", translation: "أصفر", pronunciation: "أماريو", emoji: "🟡" },
            { word: "Negro", translation: "أسود", pronunciation: "نيغرو", emoji: "⚫" },
            { word: "Blanco", translation: "أبيض", pronunciation: "بلانكو", emoji: "⚪" },
            { word: "Naranja", translation: "برتقالي", pronunciation: "نارانخا", emoji: "🟠" },
            { word: "Morado", translation: "بنفسجي", pronunciation: "مورادو", emoji: "🟣" },
            { word: "Marrón", translation: "بني", pronunciation: "مارون", emoji: "🟤" },
            { word: "Rosa", translation: "وردي", pronunciation: "روسا", emoji: "🌸" }
        ],
        readingExercises: [
            readingExercise("El cielo es azul y el sol es amarillo.", "ألوان الطبيعة", "السماء زرقاء والشمس صفراء.", ["أحب السيارات الحمراء.", "العشب أخضر.", "الليل أسود."])
        ],
        listeningExercises: [
            listeningExercise("Rojo", "لون الدم", ["Verde", "Azul", "Blanco"])
        ]
    },
    time: {
        words: [
            { word: "Tiempo", translation: "وقت", pronunciation: "تييمبو", emoji: "⏰" },
            { word: "Hora", translation: "ساعة", pronunciation: "أورا", emoji: "⏳" },
            { word: "Día", translation: "يوم", pronunciation: "ديا", emoji: "📅" },
            { word: "Semana", translation: "أسبوع", pronunciation: "سيمانا", emoji: "🗓️" },
            { word: "Mes", translation: "شهر", pronunciation: "ميس", emoji: "🈷️" },
            { word: "Año", translation: "سنة", pronunciation: "آنيو", emoji: "🎉" },
            { word: "Hoy", translation: "اليوم", pronunciation: "أوي", emoji: "👇" },
            { word: "Mañana", translation: "غداً", pronunciation: "مانيانا", emoji: "➡️" },
            { word: "Ayer", translation: "أمس", pronunciation: "آيير", emoji: "⬅️" },
            { word: "Lunes", translation: "الإثنين", pronunciation: "لونيس", emoji: " M" },
            { word: "Domingo", translation: "الأحد", pronunciation: "دومينغو", emoji: "S" }
        ],
        readingExercises: [
            readingExercise("¿Qué hora es?", "سؤال عن الوقت", "كم الساعة؟", ["ما هو تاريخ اليوم؟", "أراك غداً.", "أنا مشغول هذا الأسبوع."])
        ],
        listeningExercises: [
            listeningExercise("Hoy", "اليوم الحالي", ["Mañana", "Ayer", "Ahora"])
        ]
    },
    weather: {
        words: [
            { word: "Tiempo", translation: "طقس", pronunciation: "تييمبو", emoji: "🌦️" },
            { word: "Sol", translation: "شمس", pronunciation: "سول", emoji: "☀️" },
            { word: "Lluvia", translation: "مطر", pronunciation: "يوبيا", emoji: "🌧️" },
            { word: "Nieve", translation: "ثلج", pronunciation: "نييبي", emoji: "❄️" },
            { word: "Viento", translation: "رياح", pronunciation: "بيينتو", emoji: "💨" },
            { word: "Caliente", translation: "حار", pronunciation: "كالينتي", emoji: "🌡️" },
            { word: "Frío", translation: "بارد", pronunciation: "فريو", emoji: "🥶" },
            { word: "Nube", translation: "غيمة", pronunciation: "نوبي", emoji: "☁️" }
        ],
        readingExercises: [
            readingExercise("Hace mucho sol hoy.", "وصف الطقس", "الجو مشمس جداً اليوم.", ["إنها تمطر.", "الجو بارد في الشتاء.", "هناك رياح قوية."])
        ],
        listeningExercises: [
            listeningExercise("Frío", "عكس حار", ["Caliente", "Sol", "Lluvia"])
        ]
    },
    shopping: {
        words: [
            { word: "Tienda", translation: "متجر", pronunciation: "تييندا", emoji: "🏬" },
            { word: "Dinero", translation: "مال", pronunciation: "دينيرو", emoji: "💰" },
            { word: "Precio", translation: "سعر", pronunciation: "بريسيو", emoji: "💲" },
            { word: "Comprar", translation: "يشتري", pronunciation: "كومبرار", emoji: "🛍️" },
            { word: "Pagar", translation: "يدفع", pronunciation: "باغار", emoji: "💳" },
            { word: "Caro", translation: "غالي", pronunciation: "كارو", emoji: "💎" },
            { word: "Barato", translation: "رخيص", pronunciation: "باراتو", emoji: "🪙" },
            { word: "Tarjeta", translation: "بطاقة", pronunciation: "تارخيتا", emoji: "💳" }
        ],
        readingExercises: [
            readingExercise("¿Cuánto cuesta?", "سؤال عن السعر", "كم السعر؟", ["أريد أن أشتري هذا.", "هذا غالي جداً.", "هل يمكنني الدفع بالبطاقة؟"])
        ],
        listeningExercises: [
            listeningExercise("Dinero", "ما تستخدمه للشراء", ["Tienda", "Precio", "Ropa"])
        ]
    },
    body: {
        words: [
            { word: "Cuerpo", translation: "جسم", pronunciation: "كويربو", emoji: "🧍" },
            { word: "Cabeza", translation: "رأس", pronunciation: "كابيثا", emoji: "👤" },
            { word: "Ojo", translation: "عين", pronunciation: "أوخو", emoji: "👁️" },
            { word: "Nariz", translation: "أنف", pronunciation: "ناريث", emoji: "👃" },
            { word: "Boca", translation: "فم", pronunciation: "بوكا", emoji: "👄" },
            { word: "Mano", translation: "يد", pronunciation: "مانو", emoji: "✋" },
            { word: "Pie", translation: "قدم", pronunciation: "بيي", emoji: "🦶" },
            { word: "Pierna", translation: "ساق", pronunciation: "بييرنا", emoji: "🦵" },
            { word: "Corazón", translation: "قلب", pronunciation: "كوراسون", emoji: "❤️" }
        ],
        readingExercises: [
            readingExercise("Me duele la cabeza.", "وصف ألم", "رأسي يؤلمني.", ["عيناي كبيرتان.", "يداي صغيرتان.", "قلبي ينبض بسرعة."])
        ],
        listeningExercises: [
            listeningExercise("Ojo", "تستخدمها للرؤية", ["Nariz", "Boca", "Mano"])
        ]
    },
    clothing: {
        words: [
            { word: "Ropa", translation: "ملابس", pronunciation: "روبا", emoji: "👕" },
            { word: "Camisa", translation: "قميص", pronunciation: "كاميسا", emoji: "👕" },
            { word: "Pantalones", translation: "بنطال", pronunciation: "بانتالونيس", emoji: "👖" },
            { word: "Zapatos", translation: "حذاء", pronunciation: "ثاباتوس", emoji: "👟" },
            { word: "Vestido", translation: "فستان", pronunciation: "بيستيدو", emoji: "👗" },
            { word: "Sombrero", translation: "قبعة", pronunciation: "سومبريرو", emoji: "🧢" },
            { word: "Chaqueta", translation: "سترة", pronunciation: "تشاكيتا", emoji: "🧥" }
        ],
        readingExercises: [
            readingExercise("Llevo una camisa azul.", "وصف الملابس", "أنا أرتدي قميصاً أزرق.", ["أين حذائي؟", "هذا فستان جميل.", "أحتاج سترة."])
        ],
        listeningExercises: [
            listeningExercise("Zapatos", "ما ترتديه في قدميك", ["Camisa", "Sombrero", "Vestido"])
        ]
    },
    verbs: {
        words: [
            { word: "Ser", translation: "يكون (دائم)", pronunciation: "سير", emoji: "👑" },
            { word: "Estar", translation: "يكون (مؤقت)", pronunciation: "إستار", emoji: "📍" },
            { word: "Tener", translation: "يملك", pronunciation: "تينير", emoji: "🤲" },
            { word: "Hacer", translation: "يفعل", pronunciation: "آثير", emoji: "💪" },
            { word: "Ir", translation: "يذهب", pronunciation: "إير", emoji: "🚶" },
            { word: "Querer", translation: "يريد", pronunciation: "كيرير", emoji: "🙋" },
            { word: "Comer", translation: "يأكل", pronunciation: "كومير", emoji: "🍔" },
            { word: "Beber", translation: "يشرب", pronunciation: "بيبير", emoji: "🥤" },
            { word: "Hablar", translation: "يتحدث", pronunciation: "آبلار", emoji: "🗣️" },
            { word: "Ver", translation: "يرى", pronunciation: "بير", emoji: "👀" }
        ],
        readingExercises: [
            readingExercise("Quiero beber agua.", "التعبير عن رغبة", "أريد أن أشرب ماء.", ["هو يتحدث الإسبانية.", "أين تذهب؟", "أنا طالب."])
        ],
        listeningExercises: [
            listeningExercise("Comer", "فعل تناول الطعام", ["Beber", "Hablar", "Ir"])
        ]
    },
    adjectives: {
        words: [
            { word: "Bueno", translation: "جيد", pronunciation: "بوينو", emoji: "👍" },
            { word: "Malo", translation: "سيء", pronunciation: "مالو", emoji: "👎" },
            { word: "Grande", translation: "كبير", pronunciation: "غراندي", emoji: "🐘" },
            { word: "Pequeño", translation: "صغير", pronunciation: "بيكينيو", emoji: "🐭" },
            { word: "Nuevo", translation: "جديد", pronunciation: "نويبو", emoji: "✨" },
            { word: "Viejo", translation: "قديم", pronunciation: "بييخو", emoji: "📜" },
            { word: "Bonito", translation: "جميل", pronunciation: "بونيتو", emoji: "😍" },
            { word: "Rápido", translation: "سريع", pronunciation: "رابيدو", emoji: "🏃" },
            { word: "Lento", translation: "بطيء", pronunciation: "لينتو", emoji: "🐢" }
        ],
        readingExercises: [
            readingExercise("Mi coche es nuevo y rápido.", "وصف سيارة", "سيارتي جديدة وسريعة.", ["هذا كتاب جيد.", "المنزل كبير.", "القطة صغيرة."])
        ],
        listeningExercises: [
            listeningExercise("Grande", "عكس صغير", ["Pequeño", "Bueno", "Nuevo"])
        ]
    },
    places: {
        words: [
            { word: "Lugar", translation: "مكان", pronunciation: "لوغار", emoji: "📍" },
            { word: "Ciudad", translation: "مدينة", pronunciation: "ثيوداد", emoji: "🏙️" },
            { word: "País", translation: "دولة", pronunciation: "باييس", emoji: "🇪🇸" },
            { word: "Escuela", translation: "مدرسة", pronunciation: "إسكويلا", emoji: "🏫" },
            { word: "Hospital", translation: "مستشفى", pronunciation: "أوسبيتال", emoji: "🏥" },
            { word: "Restaurante", translation: "مطعم", pronunciation: "ريستاورانتي", emoji: "🍔" },
            { word: "Parque", translation: "حديقة", pronunciation: "باركي", emoji: "🌳" },
            { word: "Playa", translation: "شاطئ", pronunciation: "بلايا", emoji: "🏖️" }
        ],
        readingExercises: [
            readingExercise("El restaurante está cerca del parque.", "وصف موقع", "المطعم قريب من الحديقة.", ["أنا في المدرسة.", "مدريد مدينة جميلة.", "أحب الشاطئ."])
        ],
        listeningExercises: [
            listeningExercise("Ciudad", "مكان كبير به أناس ومباني", ["País", "Pueblo", "Playa"])
        ]
    },
    nature: {
        words: [
            { word: "Naturaleza", translation: "طبيعة", pronunciation: "ناتوراليثا", emoji: "🏞️" },
            { word: "Árbol", translation: "شجرة", pronunciation: "أربول", emoji: "🌳" },
            { word: "Flor", translation: "زهرة", pronunciation: "فلور", emoji: "🌸" },
            { word: "Sol", translation: "شمس", pronunciation: "سول", emoji: "☀️" },
            { word: "Luna", translation: "قمر", pronunciation: "لونا", emoji: "🌙" },
            { word: "Río", translation: "نهر", pronunciation: "ريو", emoji: "🏞️" },
            { word: "Montaña", translation: "جبل", pronunciation: "مونتانيا", emoji: "⛰️" },
            { word: "Mar", translation: "بحر", pronunciation: "مار", emoji: "🌊" }
        ],
        readingExercises: [
            readingExercise("Me gusta caminar en la montaña.", "نشاط في الطبيعة", "أحب المشي في الجبل.", ["الأشجار خضراء.", "هذه زهرة جميلة.", "الشمس مشرقة."])
        ],
        listeningExercises: [
            listeningExercise("Sol", "النجم الذي يضيء نهارنا", ["Luna", "Estrella", "Cielo"])
        ]
    },
    hobbies: {
        words: [
            { word: "Hobby", translation: "هواية", pronunciation: "خوبي", emoji: "🎨" },
            { word: "Leer", translation: "قراءة", pronunciation: "ليير", emoji: "📖" },
            { word: "Música", translation: "موسيقى", pronunciation: "موسيكا", emoji: "🎵" },
            { word: "Cine", translation: "سينما", pronunciation: "ثيني", emoji: "🎬" },
            { word: "Deporte", translation: "رياضة", pronunciation: "ديبورتي", emoji: "⚽" },
            { word: "Cocinar", translation: "طبخ", pronunciation: "كوسينار", emoji: "🍳" },
            { word: "Viajar", translation: "سفر", pronunciation: "بياخار", emoji: "✈️" }
        ],
        readingExercises: [
            readingExercise("Mi hobby es escuchar música.", "التحدث عن الهوايات", "هوايتي هي الاستماع للموسيقى.", ["أحب القراءة.", "هو يحب الرياضة.", "نحن نسافر كثيراً."])
        ],
        listeningExercises: [
            listeningExercise("Música", "فن الأصوات", ["Cine", "Leer", "Deporte"])
        ]
    },
    emotions: {
        words: [
            { word: "Emoción", translation: "شعور", pronunciation: "إيموسيون", emoji: "❤️" },
            { word: "Feliz", translation: "سعيد", pronunciation: "فيليث", emoji: "😄" },
            { word: "Triste", translation: "حزين", pronunciation: "تريستي", emoji: "😢" },
            { word: "Enojado", translation: "غاضب", pronunciation: "إنوخادو", emoji: "😠" },
            { word: "Cansado", translation: "متعب", pronunciation: "كانسادو", emoji: "😴" },
            { word: "Asustado", translation: "خائف", pronunciation: "أسوستادو", emoji: "😨" },
            { word: "Amor", translation: "حب", pronunciation: "أمور", emoji: "❤️" }
        ],
        readingExercises: [
            readingExercise("Estoy muy feliz hoy.", "التعبير عن السعادة", "أنا سعيد جداً اليوم.", ["لماذا أنت حزين؟", "لا تكن خائفاً.", "أنا متعب وأريد أن أنام."])
        ],
        listeningExercises: [
            listeningExercise("Feliz", "عكس حزين", ["Triste", "Enojado", "Cansado"])
        ]
    },
    animals: {
        words: [
            { word: "Animal", translation: "حيوان", pronunciation: "أنيمال", emoji: "🐾" },
            { word: "Perro", translation: "كلب", pronunciation: "بيرو", emoji: "🐕" },
            { word: "Gato", translation: "قطة", pronunciation: "غاتو", emoji: "🐈" },
            { word: "Caballo", translation: "حصان", pronunciation: "كابايو", emoji: "🐎" },
            { word: "León", translation: "أسد", pronunciation: "ليون", emoji: "🦁" },
            { word: "Pájaro", translation: "طائر", pronunciation: "باخارو", emoji: "🐦" },
            { word: "Pez", translation: "سمكة", pronunciation: "بيث", emoji: "🐟" }
        ],
        readingExercises: [
            readingExercise("El perro es el mejor amigo del hombre.", "علاقة الإنسان بالحيوان", "الكلب هو أفضل صديق للإنسان.", ["لدي قطة سوداء.", "الأسد قوي.", "الطيور تغني."])
        ],
        listeningExercises: [
            listeningExercise("Gato", "حيوان أليف يقول مواء", ["Perro", "Caballo", "Pájaro"])
        ]
    },
    transportation: {
        words: [
            { word: "Coche", translation: "سيارة", pronunciation: "كوتشي", emoji: "🚗" },
            { word: "Autobús", translation: "حافلة", pronunciation: "أوتوبوس", emoji: "🚌" },
            { word: "Tren", translation: "قطار", pronunciation: "ترين", emoji: "🚆" },
            { word: "Avión", translation: "طائرة", pronunciation: "أبيون", emoji: "✈️" },
            { word: "Bicicleta", translation: "دراجة هوائية", pronunciation: "بيثيكليتا", emoji: "🚲" },
            { word: "Metro", translation: "مترو", pronunciation: "ميترو", emoji: "🚇" }
        ],
        readingExercises: [
            readingExercise("Voy al trabajo en tren.", "وسائل النقل للعمل", "أذهب إلى العمل بالقطار.", ["سيارتي حمراء.", "الحافلة متأخرة.", "السفر بالطائرة سريع."])
        ],
        listeningExercises: [
            listeningExercise("Coche", "مركبة خاصة", ["Autobús", "Tren", "Avión"])
        ]
    },
    education: {
        words: [
            { word: "Escuela", translation: "مدرسة", pronunciation: "إسكويلا", emoji: "🏫" },
            { word: "Estudiante", translation: "طالب", pronunciation: "إستوديانتيه", emoji: "🧑‍🎓" },
            { word: "Profesor", translation: "معلم", pronunciation: "بروفيسور", emoji: "👨‍🏫" },
            { word: "Libro", translation: "كتاب", pronunciation: "ليبرو", emoji: "📚" },
            { word: "Examen", translation: "امتحان", pronunciation: "إكسامين", emoji: "📝" },
            { word: "Tarea", translation: "واجب منزلي", pronunciation: "تاريا", emoji: "📓" }
        ],
        readingExercises: [
            readingExercise("Los estudiantes leen libros.", "نشاط دراسي", "الطلاب يقرؤون الكتب.", ["المعلم يشرح الدرس.", "لدي امتحان غداً.", "يجب أن أفعل الواجب."])
        ],
        listeningExercises: [
            listeningExercise("Libro", "شيء للقراءة", ["Examen", "Profesor", "Escuela"])
        ]
    },
    health: {
        words: [
            { word: "Salud", translation: "صحة", pronunciation: "سالود", emoji: "💪" },
            { word: "Médico", translation: "طبيب", pronunciation: "ميديكو", emoji: "🧑‍⚕️" },
            { word: "Hospital", translation: "مستشفى", pronunciation: "أوسبيتال", emoji: "🏥" },
            { word: "Medicina", translation: "دواء", pronunciation: "ميديسينا", emoji: "💊" },
            { word: "Enfermo", translation: "مريض", pronunciation: "إنفيرمو", emoji: "🤒" },
            { word: "Dolor", translation: "ألم", pronunciation: "دولور", emoji: "🤕" }
        ],
        readingExercises: [
            readingExercise("Me siento enfermo. Necesito un médico.", "الحاجة إلى طبيب", "أشعر بالمرض. أحتاج طبيباً.", ["أين المستشفى؟", "خذ هذا الدواء.", "لدي ألم في الظهر."])
        ],
        listeningExercises: [
            listeningExercise("Médico", "الشخص الذي يعالج المرضى", ["Profesor", "Bombero", "Policía"])
        ]
    },
    technology: {
        words: [
            { word: "Tecnología", translation: "تقنية", pronunciation: "تكنولوجييا", emoji: "💡" },
            { word: "Ordenador", translation: "حاسوب", pronunciation: "أوردينادور", emoji: "💻" },
            { word: "Teléfono", translation: "هاتف", pronunciation: "تيليفونو", emoji: "📱" },
            { word: "Internet", translation: "إنترنت", pronunciation: "إنترنت", emoji: "🌐" },
            { word: "Correo electrónico", translation: "بريد إلكتروني", pronunciation: "كوريو إليكترونيكو", emoji: "📧" },
            { word: "Contraseña", translation: "كلمة مرور", pronunciation: "كونتراسينيا", emoji: "🔒" }
        ],
        readingExercises: [
            readingExercise("Uso el internet todos los días.", "استخدام الإنترنت", "أستخدم الإنترنت كل يوم.", ["هاتفي جديد.", "نسيت كلمة المرور.", "أرسل لي بريداً إلكترونياً."])
        ],
        listeningExercises: [
            listeningExercise("Teléfono", "جهاز للاتصال", ["Ordenador", "Internet", "Contraseña"])
        ]
    },
    restaurant: {
        words: [
            { word: "Restaurante", translation: "مطعم", pronunciation: "ريستاورانتي", emoji: "🍴" },
            { word: "Menú", translation: "قائمة طعام", pronunciation: "مينو", emoji: "📜" },
            { word: "Camarero", translation: "نادل", pronunciation: "كاماريرو", emoji: "🤵" },
            { word: "Cuenta", translation: "فاتورة", pronunciation: "كوينتا", emoji: "🧾" },
            { word: "Pedir", translation: "يطلب", pronunciation: "بيدير", emoji: "✍️" },
            { word: "Delicioso", translation: "لذيذ", pronunciation: "ديليثيوسو", emoji: "😋" }
        ],
        readingExercises: [
            readingExercise("La comida está deliciosa.", "رأي في الطعام", "الطعام لذيذ.", ["أريد أن أطلب.", "القائمة من فضلك.", "الحساب جاهز."])
        ],
        listeningExercises: [
            listeningExercise("Menú", "قائمة الأطباق", ["Cuenta", "Camarero", "Mesa"])
        ]
    },
    daily_routines: {
        words: [
            { word: "Despertarse", translation: "يستيقظ", pronunciation: "ديسبيرتارسي", emoji: "⏰" },
            { word: "Desayunar", translation: "يفطر", pronunciation: "ديسايونار", emoji: "🍳" },
            { word: "Ir al trabajo", translation: "يذهب للعمل", pronunciation: "إير آل تراباخو", emoji: "💼" },
            { word: "Almorzar", translation: "يتغدى", pronunciation: "ألمورثار", emoji: "🍱" },
            { word: "Cenar", translation: "يتعشى", pronunciation: "ثينار", emoji: "🍝" },
            { word: "Dormir", translation: "ينام", pronunciation: "دورمير", emoji: "😴" }
        ],
        readingExercises: [
            readingExercise("Me despierto a las siete de la mañana.", "وقت الاستيقاظ", "أستيقظ الساعة السابعة صباحاً.", ["ماذا تفطر؟", "أنا ذاهب إلى العمل.", "حان وقت النوم."])
        ],
        listeningExercises: [
            listeningExercise("Dormir", "الراحة في الليل", ["Despertarse", "Comer", "Trabajar"])
        ]
    },
    countries: {
        words: [
            { word: "País", translation: "دولة", pronunciation: "باييس", emoji: "🌍" },
            { word: "España", translation: "إسبانيا", pronunciation: "إسبانيا", emoji: "🇪🇸" },
            { word: "México", translation: "المكسيك", pronunciation: "ميخيكو", emoji: "🇲🇽" },
            { word: "Argentina", translation: "الأرجنتين", pronunciation: "أرخينتينا", emoji: "🇦🇷" },
            { word: "Egipto", translation: "مصر", pronunciation: "إخيبتو", emoji: "🇪🇬" },
            { word: "Capital", translation: "عاصمة", pronunciation: "كابيتال", emoji: "🏛️" }
        ],
        readingExercises: [
            readingExercise("Madrid es la capital de España.", "عاصمة إسبانيا", "مدريد هي عاصمة إسبانيا.", ["أنا من المكسيك.", "الأرجنتين بلد كبير.", "أهرامات مصر مشهورة."])
        ],
        listeningExercises: [
            listeningExercise("España", "دولة أوروبية", ["México", "Egipto", "Japón"])
        ]
    },
    sports: {
        words: [
            { word: "Deporte", translation: "رياضة", pronunciation: "ديبورتي", emoji: "🏅" },
            { word: "Fútbol", translation: "كرة قدم", pronunciation: "فوتبول", emoji: "⚽" },
            { word: "Baloncesto", translation: "كرة سلة", pronunciation: "بالونسيستو", emoji: "🏀" },
            { word: "Tenis", translation: "تنس", pronunciation: "تينيس", emoji: "🎾" },
            { word: "Nadar", translation: "سباحة", pronunciation: "نادار", emoji: "🏊" },
            { word: "Ganar", translation: "يفوز", pronunciation: "غانار", emoji: "🏆" },
            { word: "Perder", translation: "يخسر", pronunciation: "بيردير", emoji: "👎" }
        ],
        readingExercises: [
            readingExercise("El Real Madrid ganó el partido.", "نتيجة مباراة", "ريال مدريد فاز بالمباراة.", ["أحب لعب التنس.", "السباحة رياضة جيدة.", "من سيفوز؟"])
        ],
        listeningExercises: [
            listeningExercise("Fútbol", "الرياضة الأكثر شعبية في العالم", ["Baloncesto", "Tenis", "Golf"])
        ]
    },
    music_arts: {
        words: [
            { word: "Música", translation: "موسيقى", pronunciation: "موسيكا", emoji: "🎵" },
            { word: "Arte", translation: "فن", pronunciation: "آرتي", emoji: "🖼️" },
            { word: "Canción", translation: "أغنية", pronunciation: "كانثيون", emoji: "🎶" },
            { word: "Película", translation: "فيلم", pronunciation: "بيليكولا", emoji: "🎬" },
            { word: "Museo", translation: "متحف", pronunciation: "موسيو", emoji: "🏛️" },
            { word: "Teatro", translation: "مسرح", pronunciation: "تياترو", emoji: "🎭" },
            { word: "Bailar", translation: "رقص", pronunciation: "بايلار", emoji: "💃" }
        ],
        readingExercises: [
            readingExercise("Vamos al museo de arte.", "زيارة متحف", "لنذهب إلى متحف الفن.", ["أحب هذه الأغنية.", "ما هو فيلمك المفضل؟", "هي ترقص بشكل جيد."])
        ],
        listeningExercises: [
            listeningExercise("Canción", "قطعة موسيقية بالكلمات", ["Película", "Pintura", "Libro"])
        ]
    }
};