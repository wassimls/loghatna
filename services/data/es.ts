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

export const SPANISH_CONTENT: { [categoryName: string]: CategoryContent; } = {
    basics: {
        words: [
            { word: "Yo", translation: "أنا", pronunciation: "يو", emoji: "👤" },
            { word: "Tú", translation: "أنت", pronunciation: "تو", emoji: "👥" },
            { word: "Él/Ella", translation: "هو/هي", pronunciation: "إل/إيا", emoji: "🧑" },
            { word: "Nosotros", translation: "نحن", pronunciation: "نوسوتروس", emoji: "👨‍👩‍👧‍👦" },
            { word: "Vosotros", translation: "أنتم", pronunciation: "ڤوسوتروس", emoji: "👨‍👩‍👧‍👦" },
            { word: "Ellos/Ellas", translation: "هم/هن", pronunciation: "إيوس/إياس", emoji: "👨‍👩‍👧‍👦" },
            { word: "Qué", translation: "ماذا", pronunciation: "كيه", emoji: "❓" },
            { word: "Quién", translation: "من", pronunciation: "كيين", emoji: "❓" },
            { word: "Dónde", translation: "أين", pronunciation: "دوندي", emoji: "📍" },
            { word: "Cuándo", translation: "متى", pronunciation: "كواندو", emoji: "⏰" },
            { word: "Por qué", translation: "لماذا", pronunciation: "بور كيه", emoji: "🤔" },
            { word: "Cómo", translation: "كيف", pronunciation: "كومو", emoji: "🤔" },
            { word: "Sí", translation: "نعم", pronunciation: "سي", emoji: "👍" },
            { word: "No", translation: "لا", pronunciation: "نو", emoji: "👎" },
            { word: "Quizás", translation: "ربما", pronunciation: "كيثاس", emoji: "🤷" },
            { word: "Por favor", translation: "من فضلك", pronunciation: "بور فافور", emoji: "🙏" },
            { word: "Gracias", translation: "شكراً", pronunciation: "غراثياس", emoji: "😊" },
            { word: "Lo siento", translation: "آسف", pronunciation: "لو سيينتو", emoji: "😔" },
            { word: "Perdón", translation: "اعذرني", pronunciation: "بيردون", emoji: "✋" },
            { word: "Y", translation: "و", pronunciation: "إي", emoji: "&" },
            { word: "Pero", translation: "لكن", pronunciation: "بيرو", emoji: "↔️" },
            { word: "O", translation: "أو", pronunciation: "أو", emoji: "🤷‍♀️" },
            { word: "Porque", translation: "لأن", pronunciation: "بوركيه", emoji: "👉" },
        ],
        readingExercises: [
            readingExercise("Hoy estoy feliz, pero hace mucho frío.", "ابحث عن ترجمة 'feliz' و 'frío'.", "أنا سعيد اليوم، لكن الجو بارد جداً.", ["Él está triste porque hace calor.", "¿Estás bien? Sí, gracias.", "Esto es fácil y eso es difícil."]),
            readingExercise("La casa grande tiene un jardín pequeño.", "ترجم 'casa grande' و 'jardín pequeño'.", "البيت الكبير له حديقة صغيرة.", ["El gato bebe leche.", "¿Puedes ayudarme?", "Este es mi libro."])
        ],
        listeningExercises: [
            listeningExercise("Gracias", "كلمة شائعة لإظهار الامتنان.", ["Lo siento", "Por favor", "Hola"]),
            listeningExercise("Buenos días", "تحية تقال في الصباح.", ["Buenas noches", "Adiós", "Hola"])
        ]
    },
    greetings: {
        words: [
            { word: "Hola", translation: "مرحباً", pronunciation: "أولا", emoji: "👋" },
            { word: "Buenos días", translation: "صباح الخير", pronunciation: "بوينوس دياس", emoji: "☀️" },
            { word: "Buenas tardes", translation: "مساء الخير", pronunciation: "بويناس تارديس", emoji: "🌇" },
            { word: "Buenas noches", translation: "مساء الخير/تصبح على خير", pronunciation: "بويناس نوتشيس", emoji: "🌃" },
            { word: "Adiós", translation: "مع السلامة", pronunciation: "آديوس", emoji: "👋" },
            { word: "Hasta luego", translation: "أراك لاحقاً", pronunciation: "آستا لوغو", emoji: "👀" },
            { word: "¿Cómo estás?", translation: "كيف حالك؟", pronunciation: "¿كومو إستاس؟", emoji: "❓" },
            { word: "Estoy bien, gracias.", translation: "أنا بخير، شكراً لك.", pronunciation: "إستوي بيين، غراثياس", emoji: "😊" },
            { word: "¿Y tú?", translation: "وأنت؟", pronunciation: "¿إي تو؟", emoji: "❓" },
            { word: "¿Cómo te llamas?", translation: "ما اسمك؟", pronunciation: "¿كومو تي ياماس؟", emoji: "❓" },
            { word: "Me llamo...", translation: "اسمي هو...", pronunciation: "مي يامو...", emoji: "🏷️" },
            { word: "Mucho gusto", translation: "سررت بلقائك.", pronunciation: "موتشو غوستو", emoji: "🤝" },
            { word: "Bienvenido", translation: "أهلاً بك", pronunciation: "بيين-بينيدو", emoji: "🎉" },
        ],
        readingExercises: [
            readingExercise("Buenos días, ¿cómo estás?", "ابحث عن التحية الصباحية والسؤال عن الحال.", "صباح الخير، كيف حالك؟", ["Buenas noches, hasta mañana.", "¿Cómo te llamas y de dónde eres?", "Estoy bien, gracias."]),
            readingExercise("¿Cómo te llamas? Me llamo Ahmed.", "ابحث عن السؤال عن الاسم والإجابة.", "ما اسمك؟ اسمي أحمد.", ["¿Cómo estás? Estoy bien.", "¿De dónde eres? Soy de Egipto.", "Mucho gusto."])
        ],
        listeningExercises: [
            listeningExercise("¿Cómo te llamas?", "سؤال للاستفسار عن اسم الشخص.", ["¿Cómo estás?", "Adiós", "Buenos días"]),
            listeningExercise("Mucho gusto", "عبارة تقال عند مقابلة شخص لأول مرة.", ["Gracias", "Hola", "Lo siento"])
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
            { word: "Once", translation: "أحد عشر", pronunciation: "أونثي", emoji: "1️⃣1️⃣" },
            { word: "Doce", translation: "اثنا عشر", pronunciation: "دوثي", emoji: "1️⃣2️⃣" },
            { word: "Veinte", translation: "عشرون", pronunciation: "بينتي", emoji: "2️⃣0️⃣" },
            { word: "Treinta", translation: "ثلاثون", pronunciation: "ترينتا", emoji: "3️⃣0️⃣" },
            { word: "Cuarenta", translation: "أربعون", pronunciation: "كوارينتا", emoji: "4️⃣0️⃣" },
            { word: "Cincuenta", translation: "خمسون", pronunciation: "ثينكوينتا", emoji: "5️⃣0️⃣" },
            { word: "Cien", translation: "مئة", pronunciation: "ثيين", emoji: "💯" },
            { word: "Mil", translation: "ألف", pronunciation: "ميل", emoji: "1️⃣0️⃣0️⃣0️⃣" },
        ],
        readingExercises: [
            readingExercise("Tengo dos manos y diez dedos.", "ابحث عن الأرقام 2 و 10.", "لدي يدان وعشرة أصابع.", ["Tengo tres libros y cinco bolígrafos.", "¿Puedes contar del uno al diez?", "Él tiene ocho años."]),
            readingExercise("Hay cincuenta estrellas en la bandera.", "ابحث عن الرقم 50.", "يوجد خمسون نجمة على العلم.", ["Tengo veinte dólares.", "Los primeros cien días son importantes.", "Uno más dos son tres."])
        ],
        listeningExercises: [
            listeningExercise("Cinco", "الرقم الذي يأتي بعد أربعة.", ["Cuatro", "Uno", "Diez"]),
            listeningExercise("Veinte", "ضعف الرقم عشرة.", ["Doce", "Dos", "Diez"])
        ]
    },
    colors: {
        words: [
            { word: "Color", translation: "لون", pronunciation: "كولور", emoji: "🎨" },
            { word: "Rojo", translation: "أحمر", pronunciation: "روخو", emoji: "🔴" },
            { word: "Verde", translation: "أخضر", pronunciation: "بيردي", emoji: "🟢" },
            { word: "Azul", translation: "أزرق", pronunciation: "آثول", emoji: "🔵" },
            { word: "Amarillo", translation: "أصفر", pronunciation: "آمارييو", emoji: "🟡" },
            { word: "Negro", translation: "أسود", pronunciation: "نيغرو", emoji: "⚫" },
            { word: "Blanco", translation: "أبيض", pronunciation: "بلانكو", emoji: "⚪" },
            { word: "Naranja", translation: "برتقالي", pronunciation: "نارانخا", emoji: "🟠" },
            { word: "Morado", translation: "بنفسجي", pronunciation: "مورادو", emoji: "🟣" },
            { word: "Marrón", translation: "بني", pronunciation: "مارون", emoji: "🟤" },
            { word: "Rosa", translation: "وردي", pronunciation: "روسا", emoji: "🌸" },
            { word: "Gris", translation: "رمادي", pronunciation: "غريس", emoji: "🐘" },
        ],
        readingExercises: [
            readingExercise("El cielo es azul y la hierba es verde.", "ركز على ترجمة 'azul' و 'verde'.", "السماء زرقاء والعشب أخضر.", ["La manzana es roja y el plátano es amarillo.", "Me gusta el blanco y el negro.", "Su coche nuevo es rojo."]),
            readingExercise("Ella tiene un vestido rosa y zapatos blancos.", "ابحث عن 'rosa' و 'blancos'.", "لديها فستان وردي وحذاء أبيض.", ["El gato es negro y el perro es marrón.", "¿Te gusta el color morado?", "El oro y la plata son metales preciosos."])
        ],
        listeningExercises: [
            listeningExercise("Rojo", "لون الدم أو الفراولة.", ["Azul", "Verde", "Amarillo"]),
            listeningExercise("Negro", "عكس اللون الأبيض.", ["Blanco", "Azul", "Gris"])
        ]
    },
    family: {
        words: [
            { word: "Familia", translation: "عائلة", pronunciation: "فاميليا", emoji: "👨‍👩‍👧‍👦" },
            { word: "Padre", translation: "أب", pronunciation: "بادري", emoji: "👨" },
            { word: "Madre", translation: "أم", pronunciation: "مادري", emoji: "👩" },
            { word: "Padres", translation: "والدين", pronunciation: "بادريس", emoji: "👨‍👩‍👧" },
            { word: "Hijo", translation: "ابن", pronunciation: "إيخو", emoji: "👦" },
            { word: "Hija", translation: "ابنة", pronunciation: "إيخا", emoji: "👧" },
            { word: "Niño", translation: "طفل", pronunciation: "نينيو", emoji: "👶" },
            { word: "Hermano", translation: "أخ", pronunciation: "إرمانو", emoji: "👱‍♂️" },
            { word: "Hermana", translation: "أخت", pronunciation: "إرمانا", emoji: "👱‍♀️" },
            { word: "Abuelo", translation: "جد", pronunciation: "آبويلو", emoji: "👴" },
            { word: "Abuela", translation: "جدة", pronunciation: "آبويلا", emoji: "👵" },
            { word: "Tío", translation: "عم/خال", pronunciation: "تيو", emoji: "👨‍" },
            { word: "Tía", translation: "عمة/خالة", pronunciation: "تيا", emoji: "👩‍" },
            { word: "Primo/Prima", translation: "ابن/بنت العم/الخال", pronunciation: "پريمو/پريما", emoji: "🧑" },
            { word: "Esposo", translation: "زوج", pronunciation: "إسبوسو", emoji: "🤵" },
            { word: "Esposa", translation: "زوجة", pronunciation: "إسبوسا", emoji: "👰" },
        ],
        readingExercises: [
            readingExercise("Mi padre y mi madre son mis padres.", "ابحث عن ترجمة 'padre', 'madre', و 'padres'.", "أبي وأمي هما والديّ.", ["Mi hermano y mi hermana juegan juntos.", "Mi abuelo y mi abuela viven en una casa grande.", "Este es mi hijo y esta es mi hija."]),
            readingExercise("Mi hermana es menor que mi hermano.", "ركز على المقارنة بين 'hermana' و 'hermano'.", "أختي أصغر من أخي.", ["Mi familia es muy grande.", "Mi primo vive en otra ciudad.", "A mi abuelo le gusta leer."])
        ],
        listeningExercises: [
            listeningExercise("Hermano", "شقيق ذكر.", ["Hermana", "Padre", "Madre"]),
            listeningExercise("Madre", "الكلمة الإسبانية التي تعني 'أم'.", ["Padre", "Hija", "Hijo"])
        ]
    },
    food: {
        words: [
            { word: "Comida", translation: "طعام", pronunciation: "كوميدا", emoji: "🍔" },
            { word: "Bebida", translation: "شراب", pronunciation: "بيبيدا", emoji: "🥤" },
            { word: "Agua", translation: "ماء", pronunciation: "آغوا", emoji: "💧" },
            { word: "Café", translation: "قهوة", pronunciation: "كافيه", emoji: "☕" },
            { word: "Té", translation: "شاي", pronunciation: "تيه", emoji: "🍵" },
            { word: "Jugo", translation: "عصير", pronunciation: "خوگو", emoji: "🧃" },
            { word: "Leche", translation: "حليب", pronunciation: "ليتشي", emoji: "🥛" },
            { word: "Pan", translation: "خبز", pronunciation: "پان", emoji: "🍞" },
            { word: "Queso", translation: "جبن", pronunciation: "كيسو", emoji: "🧀" },
            { word: "Arroz", translation: "أرز", pronunciation: "آروث", emoji: "🍚" },
            { word: "Pollo", translation: "دجاج", pronunciation: "پويو", emoji: "🍗" },
            { word: "Carne", translation: "لحم", pronunciation: "كارني", emoji: "🥩" },
            { word: "Pescado", translation: "سمك", pronunciation: "بيسكادو", emoji: "🐟" },
            { word: "Fruta", translation: "فاكهة", pronunciation: "فروتا", emoji: "🍎" },
            { word: "Manzana", translation: "تفاحة", pronunciation: "مانثانا", emoji: "🍎" },
            { word: "Plátano", translation: "موزة", pronunciation: "پلاتانو", emoji: "🍌" },
            { word: "Naranja", translation: "برتقالة", pronunciation: "نارانخا", emoji: "🍊" },
            { word: "Verdura", translation: "خضروات", pronunciation: "بيردورا", emoji: "🥕" },
            { word: "Zanahoria", translation: "جزرة", pronunciation: "ثانآوريا", emoji: "🥕" },
            { word: "Patata", translation: "بطاطس", pronunciation: "پاتاتا", emoji: "🥔" },
            { word: "Tomate", translation: "طماطم", pronunciation: "توماتي", emoji: "🍅" },
            { word: "Azúcar", translation: "سكر", pronunciation: "آثوكار", emoji: "🍬" },
            { word: "Sal", translation: "ملح", pronunciation: "سال", emoji: "🧂" },
            { word: "Desayuno", translation: "فطور", pronunciation: "ديسايونو", emoji: "🍳" },
            { word: "Almuerzo", translation: "غداء", pronunciation: "آلمويرثو", emoji: "🍱" },
            { word: "Cena", translation: "عشاء", pronunciation: "ثينا", emoji: "🍝" },
        ],
        readingExercises: [
            readingExercise("Tengo hambre. Quiero comer pan y queso.", "ركز على كلمتي 'pan' و 'queso'.", "أنا جائع. أريد أن آكل الخبز والجبن.", ["Tengo sed. Quiero beber agua.", "La comida está deliciosa.", "¿Me puede dar el menú, por favor?"]),
            readingExercise("Para el desayuno, me gusta el café y una manzana.", "ابحث عن طعام وشراب الفطور.", "في الفطور، أحب القهوة وتفاحة.", ["Como arroz y pollo para el almuerzo.", "La cena está lista a las siete.", "Este jugo es fresco y delicioso."])
        ],
        listeningExercises: [
            listeningExercise("Manzana", "نوع من الفاكهة، غالبًا ما يكون أحمر أو أخضر.", ["Naranja", "Agua", "Pan"]),
            listeningExercise("Agua", "شراب أساسي وشفاف.", ["Leche", "Jugo", "Té"])
        ]
    },
    time: {
        words: [
            { word: "Tiempo", translation: "وقت", pronunciation: "تييمپو", emoji: "⏰" },
            { word: "Hora", translation: "ساعة", pronunciation: "أورا", emoji: "⏳" },
            { word: "Minuto", translation: "دقيقة", pronunciation: "مينوتو", emoji: "⏱️" },
            { word: "Segundo", translation: "ثانية", pronunciation: "سيغوندو", emoji: "⏱️" },
            { word: "Día", translation: "يوم", pronunciation: "ديا", emoji: "📅" },
            { word: "Semana", translation: "أسبوع", pronunciation: "سيمانا", emoji: "🗓️" },
            { word: "Mes", translation: "شهر", pronunciation: "ميس", emoji: "🈷️" },
            { word: "Año", translation: "سنة", pronunciation: "آنيو", emoji: "🎉" },
            { word: "Lunes", translation: "الإثنين", pronunciation: "لونيس", emoji: " M" },
            { word: "Martes", translation: "الثلاثاء", pronunciation: "مارتيس", emoji: "T" },
            { word: "Miércoles", translation: "الأربعاء", pronunciation: "مييركوليس", emoji: "W" },
            { word: "Jueves", translation: "الخميس", pronunciation: "خويبيس", emoji: "T" },
            { word: "Viernes", translation: "الجمعة", pronunciation: "بييرنيس", emoji: "F" },
            { word: "Sábado", translation: "السبت", pronunciation: "سابادو", emoji: "S" },
            { word: "Domingo", translation: "الأحد", pronunciation: "دومينغو", emoji: "S" },
            { word: "Hoy", translation: "اليوم", pronunciation: "أوي", emoji: "👇" },
            { word: "Mañana", translation: "غداً", pronunciation: "مانيانا", emoji: "➡️" },
            { word: "Ayer", translation: "أمس", pronunciation: "آيير", emoji: "⬅️" },
            { word: "Mañana", translation: "صباح", pronunciation: "مانيانا", emoji: "🌅" },
            { word: "Tarde", translation: "بعد الظهر", pronunciation: "تاردي", emoji: "☀️" },
            { word: "Noche", translation: "مساء/ليل", pronunciation: "نوتشي", emoji: "🌃" },
        ],
        readingExercises: [
            readingExercise("Hoy es lunes y mañana es martes.", "ترجم 'Hoy', 'lunes', 'mañana', 'martes'.", "اليوم هو الإثنين، وغداً هو الثلاثاء.", ["Ayer fue domingo.", "Tengo una reunión el viernes.", "Un mes tiene cuatro semanas."]),
            readingExercise("La reunión es a las diez de la mañana.", "ابحث عن الوقت والجزء من اليوم.", "الاجتماع في الساعة العاشرة صباحاً.", ["Te veo por la noche.", "Espera un minuto, por favor.", "Un año tiene doce meses."])
        ],
        listeningExercises: [
            listeningExercise("Viernes", "اليوم الذي يسبق عطلة نهاية الأسبوع.", ["Lunes", "Domingo", "Semana"]),
            listeningExercise("Mañana", "اليوم الذي يأتي بعد اليوم.", ["Hoy", "Ayer", "Día"])
        ]
    },
    weather: {
        words: [
            { word: "Tiempo", translation: "الطقس", pronunciation: "تييمپو", emoji: "🌦️" },
            { word: "Sol", translation: "شمس", pronunciation: "سول", emoji: "☀️" },
            { word: "Soleado", translation: "مشمس", pronunciation: "سوليادو", emoji: "☀️" },
            { word: "Nube", translation: "غيمة", pronunciation: "نوبي", emoji: "☁️" },
            { word: "Nublado", translation: "غائم", pronunciation: "نوبلادو", emoji: "☁️" },
            { word: "Lluvia", translation: "مطر", pronunciation: "يوبيا", emoji: "🌧️" },
            { word: "Lluvioso", translation: "ممطر", pronunciation: "يوبيوسو", emoji: "🌧️" },
            { word: "Viento", translation: "رياح", pronunciation: "بيينتو", emoji: "💨" },
            { word: "Ventoso", translation: "عاصف", pronunciation: "بينتوسو", emoji: "💨" },
            { word: "Nieve", translation: "ثلج", pronunciation: "نييبي", emoji: "❄️" },
            { word: "Nevado", translation: "مثلج", pronunciation: "نيبادو", emoji: "❄️" },
            { word: "Caliente", translation: "حار", pronunciation: "كاليينتي", emoji: "🌡️" },
            { word: "Frío", translation: "بارد", pronunciation: "فريو", emoji: "🥶" },
            { word: "Templado", translation: "دافئ", pronunciation: "تيمپلادو", emoji: "😊" },
            { word: "Fresco", translation: "معتدل البرودة", pronunciation: "فريسكو", emoji: "😎" },
            { word: "Tormenta", translation: "عاصفة", pronunciation: "تورمينتا", emoji: "⛈️" },
            { word: "Niebla", translation: "ضباب", pronunciation: "نييبلا", emoji: "🌫️" },
        ],
        readingExercises: [
            readingExercise("Hace sol y calor hoy.", "ابحث عن الكلمات التي تصف الشمس والحرارة.", "الجو مشمس وحار اليوم.", ["Está nublado y frío.", "Mañana va a llover.", "Me gusta el tiempo nevado."]),
            readingExercise("En invierno, hace frío y nieva.", "ابحث عن كلمات الشتاء.", "في الشتاء، يكون الجو بارداً ويتساقط الثلج.", ["El viento es fuerte hoy.", "Toma tu paraguas, está lloviendo.", "Hay niebla por la mañana."])
        ],
        listeningExercises: [
            listeningExercise("Lluvioso", "عندما يسقط الماء من السماء.", ["Soleado", "Nublado", "Ventoso"]),
            listeningExercise("Frío", "عكس كلمة 'حار'.", ["Caliente", "Templado", "Fresco"])
        ]
    },
    home: {
        words: [
            { word: "Casa", translation: "منزل/بيت", pronunciation: "كاسا", emoji: "🏠" },
            { word: "Apartamento", translation: "شقة", pronunciation: "آپارتامينتو", emoji: "🏢" },
            { word: "Habitación", translation: "غرفة", pronunciation: "آبيتاسيون", emoji: "🚪" },
            { word: "Dormitorio", translation: "غرفة نوم", pronunciation: "دورميتوريو", emoji: "🛏️" },
            { word: "Baño", translation: "حمام", pronunciation: "بانيو", emoji: "🛁" },
            { word: "Cocina", translation: "مطبخ", pronunciation: "كوثينا", emoji: "🍳" },
            { word: "Sala de estar", translation: "غرفة معيشة", pronunciation: "سالا دي إستار", emoji: "🛋️" },
            { word: "Comedor", translation: "غرفة طعام", pronunciation: "كوميدور", emoji: "🍽️" },
            { word: "Jardín", translation: "حديقة", pronunciation: "خاردين", emoji: "🌳" },
            { word: "Puerta", translation: "باب", pronunciation: "بويرتا", emoji: "🚪" },
            { word: "Ventana", translation: "نافذة", pronunciation: "بينتانا", emoji: "🪟" },
            { word: "Suelo", translation: "أرضية", pronunciation: "سويلو", emoji: "👣" },
            { word: "Techo", translation: "سقف", pronunciation: "تيتشو", emoji: "🧱" },
            { word: "Pared", translation: "جدار", pronunciation: "پاريد", emoji: "🧱" },
            { word: "Mesa", translation: "طاولة", pronunciation: "ميسا", emoji: "🪵" },
            { word: "Silla", translation: "كرسي", pronunciation: "سييا", emoji: "🪑" },
            { word: "Cama", translation: "سرير", pronunciation: "كاما", emoji: "🛏️" },
            { word: "Sofá", translation: "أريكة", pronunciation: "سوفا", emoji: "🛋️" },
            { word: "Lámpara", translation: "مصباح", pronunciation: "لامپارا", emoji: "💡" },
            { word: "Llave", translation: "مفتاح", pronunciation: "يابي", emoji: "🔑" },
        ],
        readingExercises: [
            readingExercise("La cocina tiene una mesa y una ventana.", "ترجم 'cocina', 'mesa', و 'ventana'.", "المطبخ به طاولة ونافذة.", ["El dormitorio tiene una cama y una puerta.", "La sala de estar tiene una silla.", "La llave de la casa está en el jardín."]),
            readingExercise("Duermo en el dormitorio y veo la tele en la sala de estar.", "ابحث عن أماكن النوم ومشاهدة التلفاز.", "أنا أنام في غرفة النوم وأشاهد التلفاز في غرفة المعيشة.", ["Comemos en el comedor.", "El baño está al final del pasillo.", "El apartamento está en el tercer piso."])
        ],
        listeningExercises: [
            listeningExercise("Cocina", "المكان الذي نطبخ فيه الطعام.", ["Dormitorio", "Baño", "Jardín"]),
            listeningExercise("Puerta", "تستخدمه للدخول والخروج من غرفة.", ["Ventana", "Mesa", "Cama"])
        ]
    },
    shopping: {
        words: [
            { word: "Tienda", translation: "متجر/محل", pronunciation: "تييندا", emoji: "🏬" },
            { word: "Mercado", translation: "سوق", pronunciation: "ميركادو", emoji: "🛒" },
            { word: "Supermercado", translation: "سوبر ماركت", pronunciation: "سوپرميركادو", emoji: "🏪" },
            { word: "Dinero", translation: "مال", pronunciation: "دينيرو", emoji: "💰" },
            { word: "Precio", translation: "سعر", pronunciation: "پريثيو", emoji: "💲" },
            { word: "Comprar", translation: "يشتري", pronunciation: "كومبرار", emoji: "🛍️" },
            { word: "Vender", translation: "يبيع", pronunciation: "بيندير", emoji: "🏷️" },
            { word: "Pagar", translation: "يدفع", pronunciation: "پاگار", emoji: "💳" },
            { word: "Caro", translation: "غالي", pronunciation: "كارو", emoji: "💎" },
            { word: "Barato", translation: "رخيص", pronunciation: "باراتو", emoji: "🪙" },
            { word: "Factura", translation: "فاتورة", pronunciation: "فاكتورا", emoji: "🧾" },
            { word: "Recibo", translation: "إيصال", pronunciation: "ريثيبو", emoji: "🧾" },
            { word: "Efectivo", translation: "نقد", pronunciation: "إيفيكتيبو", emoji: "💵" },
            { word: "Tarjeta de crédito", translation: "بطاقة ائتمان", pronunciation: "تارخيتا دي كريديتو", emoji: "💳" },
            { word: "Cliente", translation: "زبون", pronunciation: "كليينتي", emoji: "🙋" },
        ],
        readingExercises: [
            readingExercise("¿Cuánto cuesta esto? El precio es muy caro.", "ابحث عن السؤال عن السعر ووصفه بأنه 'caro'.", "كم سعر هذا؟ السعر غالي جداً.", ["Quiero comprar esto, por favor.", "¿Puedo pagar con tarjeta?", "Esta tienda es muy barata."]),
            readingExercise("Voy a pagar con tarjeta de crédito, deme el recibo por favor.", "ابحث عن طريقة الدفع والوثيقة المطلوبة.", "سأدفع ببطاقة الائتمان، من فضلك أعطني الإيصال.", ["¿Aceptan efectivo?", "Este mercado es muy grande.", "El cliente siempre tiene la razón."])
        ],
        listeningExercises: [
            listeningExercise("Dinero", "ما تستخدمه للشراء.", ["Precio", "Tienda", "Factura"]),
            listeningExercise("Comprar", "فعل الحصول على شيء مقابل المال.", ["Vender", "Pagar", "Tener"])
        ]
    },
    body: {
        words: [
            { word: "Cuerpo", translation: "جسم", pronunciation: "كويرپو", emoji: "🧍" },
            { word: "Cabeza", translation: "رأس", pronunciation: "كابيثا", emoji: "👤" },
            { word: "Cara", translation: "وجه", pronunciation: "كارا", emoji: "😊" },
            { word: "Ojo", translation: "عين", pronunciation: "أوخو", emoji: "👁️" },
            { word: "Nariz", translation: "أنف", pronunciation: "ناريث", emoji: "👃" },
            { word: "Boca", translation: "فم", pronunciation: "بوكا", emoji: "👄" },
            { word: "Oreja", translation: "أذن", pronunciation: "أوريخا", emoji: "👂" },
            { word: "Pelo", translation: "شعر", pronunciation: "پيلو", emoji: "👱" },
            { word: "Diente", translation: "سن", pronunciation: "ديينتي", emoji: "🦷" },
            { word: "Cuello", translation: "رقبة", pronunciation: "كوييو", emoji: "🦒" },
            { word: "Hombro", translation: "كتف", pronunciation: "أومبرو", emoji: "🤷" },
            { word: "Brazo", translation: "ذراع", pronunciation: "براثو", emoji: "💪" },
            { word: "Mano", translation: "يد", pronunciation: "مانو", emoji: "✋" },
            { word: "Dedo", translation: "إصبع", pronunciation: "ديدو", emoji: "👆" },
            { word: "Pierna", translation: "ساق", pronunciation: "پييرنا", emoji: "🦵" },
            { word: "Pie", translation: "قدم", pronunciation: "پييه", emoji: "🦶" },
            { word: "Corazón", translation: "قلب", pronunciation: "كوراثون", emoji: "❤️" },
            { word: "Estómago", translation: "معدة", pronunciation: "إستوماغو", emoji: "🍔" },
        ],
        readingExercises: [
            readingExercise("Tengo dos ojos, una nariz y una boca.", "عد أجزاء الوجه المذكورة.", "لدي عينان وأنف واحد وفم واحد.", ["Me lavo las manos con agua y jabón.", "Me duele la cabeza.", "Él tiene el pelo negro y los ojos azules."]),
            readingExercise("Me duele el estómago después de comer.", "ابحث عن الجزء الذي يؤلم.", "معدتي تؤلمني بعد الأكل.", ["Mi corazón late rápido.", "Tengo cinco dedos en cada mano.", "Mi brazo es fuerte."])
        ],
        listeningExercises: [
            listeningExercise("Mano", "الجزء من الجسم الذي به خمسة أصابع.", ["Pie", "Cabeza", "Ojo"]),
            listeningExercise("Pelo", "ينمو على الرأس.", ["Cara", "Nariz", "Oreja"])
        ]
    },
    clothing: {
        words: [
            { word: "Ropa", translation: "ملابس", pronunciation: "روپا", emoji: "👕" },
            { word: "Camisa", translation: "قميص", pronunciation: "كاميسا", emoji: "👕" },
            { word: "Camiseta", translation: "تي شيرت", pronunciation: "كاميسيتا", emoji: "👕" },
            { word: "Pantalones", translation: "بنطال", pronunciation: "پانتالونيس", emoji: "👖" },
            { word: "Vaqueros", translation: "جينز", pronunciation: "باكيروس", emoji: "👖" },
            { word: "Pantalones cortos", translation: "شورت", pronunciation: "پانتالونيس كورتوس", emoji: "🩳" },
            { word: "Vestido", translation: "فستان", pronunciation: "بيستيدو", emoji: "👗" },
            { word: "Falda", translation: "تنورة", pronunciation: "فالدا", emoji: "👗" },
            { word: "Chaqueta", translation: "سترة", pronunciation: "تشاكيتا", emoji: "🧥" },
            { word: "Abrigo", translation: "معطف", pronunciation: "آبريغو", emoji: "🧥" },
            { word: "Suéter", translation: "سترة صوفية", pronunciation: "سويتر", emoji: "🧶" },
            { word: "Zapatos", translation: "حذاء", pronunciation: "ثاپاتوس", emoji: "👟" },
            { word: "Botas", translation: "حذاء طويل", pronunciation: "بوتاس", emoji: "👢" },
            { word: "Calcetines", translation: "جوارب", pronunciation: "كالسيستينيس", emoji: "🧦" },
            { word: "Sombrero", translation: "قبعة", pronunciation: "سومبريرو", emoji: "🧢" },
            { word: "Bufanda", translation: "وشاح", pronunciation: "بوفاندا", emoji: "🧣" },
            { word: "Guantes", translation: "قفازات", pronunciation: "غوانتيس", emoji: "🧤" },
        ],
        readingExercises: [
            readingExercise("Llevo una camisa azul y pantalones negros.", "ابحث عن 'camisa' و 'pantalones' وألوانها.", "أنا أرتدي قميصاً أزرق وبنطالاً أسود.", ["Mis zapatos nuevos son blancos.", "Necesito comprar una chaqueta para el invierno.", "Este sombrero es muy bonito."]),
            readingExercise("En invierno, llevo un abrigo, una bufanda y guantes.", "ابحث عن ملابس الشتاء.", "في الشتاء، أرتدي معطفًا ووشاحًا وقفازات.", ["Ella lleva un vestido rojo precioso.", "¿Has visto mis calcetines?", "Esta camiseta es demasiado grande."])
        ],
        listeningExercises: [
            listeningExercise("Zapatos", "ما ترتديه في قدميك.", ["Camisa", "Sombrero", "Calcetines"]),
            listeningExercise("Chaqueta", "ترتديه فوق قميصك عندما يكون الجو باردًا.", ["Pantalones", "Vestido", "Calcetines"])
        ]
    },
    verbs: {
        words: [
            { word: "ser/estar", translation: "يكون", pronunciation: "سير/إستار", emoji: "🧘" },
            { word: "tener", translation: "يملك", pronunciation: "تينير", emoji: "🤲" },
            { word: "hacer", translation: "يفعل/يصنع", pronunciation: "آثير", emoji: "💪" },
            { word: "decir", translation: "يقول", pronunciation: "ديثيير", emoji: "🗣️" },
            { word: "ir", translation: "يذهب", pronunciation: "إير", emoji: "🚶" },
            { word: "poder", translation: "يستطيع", pronunciation: "پودير", emoji: "🏋️" },
            { word: "querer", translation: "يريد", pronunciation: "كيرير", emoji: "🙋" },
            { word: "saber", translation: "يعرف", pronunciation: "سابير", emoji: "🧠" },
            { word: "ver", translation: "يرى", pronunciation: "بير", emoji: "👀" },
            { word: "venir", translation: "يأتي", pronunciation: "بينير", emoji: "👋" },
            { word: "deber", translation: "يجب", pronunciation: "ديبير", emoji: "📋" },
            { word: "creer", translation: "يصدق", pronunciation: "كريير", emoji: "🙏" },
            { word: "encontrar", translation: "يجد", pronunciation: "إنكونترار", emoji: "🔍" },
            { word: "dar", translation: "يعطي", pronunciation: "دار", emoji: "🎁" },
            { word: "tomar", translation: "يأخذ", pronunciation: "تومار", emoji: "✋" },
            { word: "hablar", translation: "يتحدث", pronunciation: "آبلار", emoji: "💬" },
            { word: "amar", translation: "يحب", pronunciation: "آمار", emoji: "❤️" },
            { word: "pensar", translation: "يفكر", pronunciation: "پينسار", emoji: "🤔" },
            { word: "comer", translation: "يأكل", pronunciation: "كومير", emoji: "🍔" },
            { word: "beber", translation: "يشرب", pronunciation: "بيببر", emoji: "🥤" },
        ],
        readingExercises: [
            readingExercise("Tengo que ir al trabajo, pero quiero quedarme en casa.", "ابحث عن الأفعال المتناقضة.", "يجب أن أذهب إلى العمل، لكني أريد أن أبقى في المنزل.", ["Él puede ver y oír todo.", "¿Puedes ayudarme a llevar esto?", "Ella intenta aprender un nuevo idioma."]),
            readingExercise("Sabe leer y escribir en tres idiomas.", "ابحث عن المهارات اللغوية.", "هو يعرف القراءة والكتابة بثلاث لغات.", ["No hables y comas al mismo tiempo.", "Volveré en una hora.", "Ellos siempre juegan y ganan."])
        ],
        listeningExercises: [
            listeningExercise("pensar", "استخدام العقل للتفكير في شيء ما.", ["comer", "dormir", "hablar"]),
            listeningExercise("amar", "الشعور بالحب أو المودة القوية.", ["odiar", "tener", "ser"])
        ]
    },
    adjectives: {
        words: [
            { word: "bueno", translation: "جيد", pronunciation: "بوينو", emoji: "👍" },
            { word: "malo", translation: "سيء", pronunciation: "مالو", emoji: "👎" },
            { word: "nuevo", translation: "جديد", pronunciation: "نويبو", emoji: "✨" },
            { word: "viejo", translation: "قديم/عجوز", pronunciation: "بييخو", emoji: "📜" },
            { word: "grande", translation: "كبير", pronunciation: "غراندي", emoji: "🐘" },
            { word: "pequeño", translation: "صغير", pronunciation: "پيكينيو", emoji: "🐭" },
            { word: "largo", translation: "طويل", pronunciation: "لارغو", emoji: "📏" },
            { word: "corto", translation: "قصير", pronunciation: "كورتو", emoji: "📏" },
            { word: "alto", translation: "عالي/طويل", pronunciation: "آلتو", emoji: "📈" },
            { word: "bajo", translation: "منخفض/قصير", pronunciation: "باخو", emoji: "📉" },
            { word: "caliente", translation: "حار", pronunciation: "كاليينتي", emoji: "🔥" },
            { word: "frío", translation: "بارد", pronunciation: "فريو", emoji: "❄️" },
            { word: "feliz", translation: "سعيد", pronunciation: "فيليث", emoji: "😄" },
            { word: "triste", translation: "حزين", pronunciation: "تريستي", emoji: "😢" },
            { word: "fácil", translation: "سهل", pronunciation: "فاثيل", emoji: "✅" },
            { word: "difícil", translation: "صعب", pronunciation: "ديفيثيل", emoji: "❌" },
            { word: "bonito", translation: "جميل", pronunciation: "بونيتو", emoji: "😍" },
            { word: "feo", translation: "قبيح", pronunciation: "فيو", emoji: "🤢" },
            { word: "rápido", translation: "سريع", pronunciation: "راپيدو", emoji: "🏃" },
            { word: "lento", translation: "بطيء", pronunciation: "لينتو", emoji: "🐢" },
        ],
        readingExercises: [
            readingExercise("El coche nuevo es rápido, pero el coche viejo es lento.", "ابحث عن الصفات المتضادة.", "السيارة الجديدة سريعة، لكن السيارة القديمة بطيئة.", ["Este libro es bueno y ese es malo.", "¿La pregunta es fácil o difícil?", "Hace mucho calor hoy."]),
            readingExercise("Ella tiene una voz bonita y un corazón bueno.", "ابحث عن الصفات الإيجابية.", "لديها صوت جميل وقلب طيب.", ["El hombre fuerte ayuda al hombre débil.", "La habitación está limpia ahora.", "La historia es larga pero no importante."])
        ],
        listeningExercises: [
            listeningExercise("importante", "صفة لشيء ذي قيمة أو أهمية كبيرة.", ["fácil", "diferente", "falso"]),
            listeningExercise("feliz", "الشعور بالفرح أو الرضا.", ["triste", "enfadado", "cansado"])
        ]
    },
    places: {
        words: [
            { word: "lugar", translation: "مكان", pronunciation: "لوغار", emoji: "📍" },
            { word: "ciudad", translation: "مدينة", pronunciation: "ثيوداد", emoji: "🏙️" },
            { word: "país", translation: "دولة", pronunciation: "پاييس", emoji: "🇪🇸" },
            { word: "mundo", translation: "عالم", pronunciation: "موندو", emoji: "🌍" },
            { word: "escuela", translation: "مدرسة", pronunciation: "إسكويلة", emoji: "🏫" },
            { word: "universidad", translation: "جامعة", pronunciation: "اونيبيرسيداد", emoji: "🎓" },
            { word: "hospital", translation: "مستشفى", pronunciation: "أوسپيتال", emoji: "🏥" },
            { word: "restaurante", translation: "مطعم", pronunciation: "ريستاورانتي", emoji: "🍔" },
            { word: "hotel", translation: "فندق", pronunciation: "أوتيل", emoji: "🏨" },
            { word: "aeropuerto", translation: "مطار", pronunciation: "آيروپويرتو", emoji: "✈️" },
            { word: "estación", translation: "محطة", pronunciation: "إستاسيون", emoji: "🚉" },
            { word: "parque", translation: "حديقة عامة", pronunciation: "پاركي", emoji: "🌳" },
            { word: "playa", translation: "شاطئ", pronunciation: "پلايا", emoji: "🏖️" },
            { word: "biblioteca", translation: "مكتبة", pronunciation: "بيبليوتيكا", emoji: "📚" },
            { word: "banco", translation: "بنك", pronunciation: "بانكو", emoji: "🏦" },
            { word: "oficina", translation: "مكتب", pronunciation: "أوفيثينا", emoji: "🏢" },
            { word: "calle", translation: "شارع", pronunciation: "كاييه", emoji: "🛣️" },
            { word: "carretera", translation: "طريق", pronunciation: "كاريتيرا", emoji: "🛤️" },
            { word: "granja", translation: "مزرعة", pronunciation: "غرانخا", emoji: "🚜" },
            { word: "bosque", translation: "غابة", pronunciation: "بوسكي", emoji: "🌲" },
            { word: "montaña", translation: "جبل", pronunciation: "مونتانيا", emoji: "⛰️" },
            { word: "río", translation: "نهر", pronunciation: "ريو", emoji: "🏞️" },
            { word: "mar", translation: "بحر", pronunciation: "مار", emoji: "🌊" },
            { word: "edificio", translation: "مبنى", pronunciation: "إديفيثيو", emoji: "🏢" },
            { word: "iglesia", translation: "كنيسة", pronunciation: "إغليسا", emoji: "⛪" },
            { word: "mezquita", translation: "مسجد", pronunciation: "ميثكيتا", emoji: "🕌" },
        ],
        readingExercises: [
            readingExercise("Voy a la escuela en autobús, y luego voy a la biblioteca.", "ابحث عن أماكن التعلم.", "أذهب إلى المدرسة بالحافلة، ثم أذهب إلى المكتبة.", ["El hospital está al lado del banco.", "¿Hay un buen restaurante en esta ciudad?", "Vivimos en un apartamento en un edificio grande."]),
            readingExercise("En verano, nos gusta ir a la playa o al parque.", "ابحث عن أماكن الترفيه الصيفية.", "في الصيف، نحب أن نذهب إلى الشاطئ أو الحديقة.", ["El aeropuerto está lejos del centro de la ciudad.", "Hay un mercado nuevo en la siguiente calle.", "El hotel está situado sobre el río."])
        ],
        listeningExercises: [
            listeningExercise("hospital", "المكان الذي تذهب إليه عندما تكون مريضاً.", ["escuela", "hotel", "banco"]),
            listeningExercise("ciudad", "مكان كبير به الكثير من الناس والمباني.", ["pueblo", "granja", "país"])
        ]
    },
    nature: {
        words: [
            { word: "naturaleza", translation: "طبيعة", pronunciation: "ناتوراليثا", emoji: "🏞️" },
            { word: "árbol", translation: "شجرة", pronunciation: "آربول", emoji: "🌳" },
            { word: "flor", translation: "زهرة", pronunciation: "فلور", emoji: "🌸" },
            { word: "planta", translation: "نبات", pronunciation: "پلانتا", emoji: "🌱" },
            { word: "hierba", translation: "عشب", pronunciation: "ييربا", emoji: "🌿" },
            { word: "luna", translation: "قمر", pronunciation: "لونا", emoji: "🌙" },
            { word: "estrella", translation: "نجمة", pronunciation: "إسترييا", emoji: "⭐" },
            { word: "cielo", translation: "سماء", pronunciation: "ثييلو", emoji: "☁️" },
            { word: "fuego", translation: "نار", pronunciation: "فويغو", emoji: "🔥" },
            { word: "tierra", translation: "أرض", pronunciation: "تييرّا", emoji: "🌍" },
            { word: "aire", translation: "هواء", pronunciation: "آيري", emoji: "💨" },
            { word: "hielo", translation: "جليد", pronunciation: "ييلو", emoji: "🧊" },
            { word: "océano", translation: "محيط", pronunciation: "أوثيانو", emoji: "🌊" },
            { word: "lago", translation: "بحيرة", pronunciation: "لاغو", emoji: "🏞️" },
            { word: "colina", translation: "تل", pronunciation: "كولينا", emoji: "🌄" },
            { word: "isla", translation: "جزيرة", pronunciation: "إيسلا", emoji: "🏝️" },
            { word: "desierto", translation: "صحراء", pronunciation: "ديسييرتو", emoji: "🏜️" },
            { word: "animal", translation: "حيوان", pronunciation: "أنيمال", emoji: "🐾" },
            { word: "perro", translation: "كلب", pronunciation: "پيرّو", emoji: "🐕" },
            { word: "gato", translation: "قطة", pronunciation: "غاتو", emoji: "🐈" },
            { word: "pájaro", translation: "طائر", pronunciation: "پاخارو", emoji: "🐦" },
            { word: "roca", translation: "صخرة", pronunciation: "روكا", emoji: "🪨" },
            { word: "arena", translation: "رمل", pronunciation: "آرينا", emoji: "🏖️" },
        ],
        readingExercises: [
            readingExercise("El sol está en el cielo, y el pez está en el mar.", "ابحث عن مكونات السماء والبحر.", "الشمس في السماء، والسمكة في البحر.", ["La montaña es alta y el río es largo.", "Los árboles son verdes en el bosque.", "Me gusta el sonido de la lluvia y el viento."]),
            readingExercise("Un pájaro pequeño se sienta en un árbol grande.", "ابحث عن الكائن الصغير والكبير.", "طائر صغير يجلس على شجرة كبيرة.", ["El gato juega con la pelota.", "Las flores son bonitas en primavera.", "El desierto es caliente y seco."])
        ],
        listeningExercises: [
            listeningExercise("árbol", "نبات كبير له جذع وأغصان.", ["flor", "hierba", "montaña"]),
            listeningExercise("agua", "سائل شفاف ضروري للحياة.", ["fuego", "aire", "arena"])
        ]
    },
    hobbies: {
        words: [
            { word: "afición", translation: "هواية", pronunciation: "آفيسيون", emoji: "🎨" },
            { word: "lectura", translation: "قراءة", pronunciation: "ليكتورا", emoji: "📖" },
            { word: "escritura", translation: "كتابة", pronunciation: "إسكريتورا", emoji: "✍️" },
            { word: "música", translation: "موسيقى", pronunciation: "موسيكا", emoji: "🎵" },
            { word: "arte", translation: "فن", pronunciation: "آرتي", emoji: "🖼️" },
            { word: "dibujo", translation: "رسم", pronunciation: "ديبوخو", emoji: "✏️" },
            { word: "pintura", translation: "تلوين", pronunciation: "پينتورا", emoji: "🎨" },
            { word: "deporte", translation: "رياضة", pronunciation: "ديپورتي", emoji: "⚽" },
            { word: "natación", translation: "سباحة", pronunciation: "ناتاثيون", emoji: "🏊" },
            { word: "correr", translation: "جري", pronunciation: "كورّير", emoji: "🏃" },
            { word: "cocinar", translation: "طبخ", pronunciation: "كوثينار", emoji: "🍳" },
            { word: "ver películas", translation: "مشاهدة أفلام", pronunciation: "بير پيليكولاس", emoji: "🎬" },
            { word: "jugar a videojuegos", translation: "لعب ألعاب", pronunciation: "خوگار آه بيديوخويغوس", emoji: "🎮" },
            { word: "viajar", translation: "سفر", pronunciation: "بياخار", emoji: "✈️" },
            { word: "bailar", translation: "رقص", pronunciation: "باييلار", emoji: "💃" },
            { word: "cantar", translation: "غناء", pronunciation: "كانتار", emoji: "🎤" },
            { word: "fotografía", translation: "تصوير فوتوغرافي", pronunciation: "فوتوغرافيا", emoji: "📸" },
            { word: "jardinería", translation: "بستنة", pronunciation: "خاردينيريا", emoji: "🪴" },
        ],
        readingExercises: [
            readingExercise("Mi afición es leer libros y escuchar música.", "ابحث عن الهوايات المذكورة.", "هوايتي هي قراءة الكتب والاستماع إلى الموسيقى.", ["A él le gusta hacer deporte y nadar.", "Ella es buena cocinando y dibujando.", "¿Te gusta viajar y jugar a videojuegos?"]),
            readingExercise("Ver películas es divertido, pero prefiero correr afuera.", "ابحث عن الهواية الداخلية والخارجية.", "مشاهدة الأفلام ممتعة، لكني أفضل الجري في الخارج.", ["Cantar y bailar requieren talento.", "La escritura es una afición creativa.", "La fotografía captura momentos hermosos."])
        ],
        listeningExercises: [
            listeningExercise("música", "فن تنظيم الأصوات في الوقت المناسب.", ["arte", "deporte", "lectura"]),
            listeningExercise("cocinar", "تحضير الطعام عن طريق تسخينه.", ["natación", "escritura", "viajar"])
        ]
    },
    emotions: {
        words: [
            { word: "sentimiento", translation: "شعور", pronunciation: "سينتيميينتو", emoji: "❤️" },
            { word: "feliz", translation: "سعيد", pronunciation: "فيليث", emoji: "😄" },
            { word: "triste", translation: "حزين", pronunciation: "تريستي", emoji: "😢" },
            { word: "enfadado", translation: "غاضب", pronunciation: "إنفادادو", emoji: "😠" },
            { word: "sorprendido", translation: "متفاجئ", pronunciation: "سورپرينديدو", emoji: "😲" },
            { word: "asustado", translation: "خائف", pronunciation: "آسوستادو", emoji: "😨" },
            { word: "cansado", translation: "متعب", pronunciation: "كانسادو", emoji: "😴" },
            { word: "aburrido", translation: "ملل", pronunciation: "آبورّيدو", emoji: "😒" },
            { word: "emocionado", translation: "متحمس", pronunciation: "إيموثيونادو", emoji: "🤩" },
            { word: "amor", translation: "حب", pronunciation: "آمور", emoji: "❤️" },
            { word: "odio", translation: "كره", pronunciation: "أوديو", emoji: "💔" },
            { word: "esperanza", translation: "أمل", pronunciation: "إسپرانثا", emoji: "🙏" },
            { word: "miedo", translation: "خوف", pronunciation: "مييدو", emoji: "😨" },
            { word: "alegría", translation: "فرح", pronunciation: "آليغريا", emoji: "😊" },
            { word: "orgulloso", translation: "فخور", pronunciation: "أورغويوسو", emoji: "ภูมิใจ" },
            { word: "tímido", translation: "خجول", pronunciation: "تيميدو", emoji: "😊" },
            { word: "tranquilo", translation: "هادئ", pronunciation: "ترانكيلو", emoji: "😌" },
            { word: "preocupado", translation: "قلق", pronunciation: "پريوكوپادو", emoji: "😟" },
        ],
        readingExercises: [
            readingExercise("Me siento feliz cuando veo a mis amigos, pero estoy triste por irme.", "ابحث عن المشاعر المتضادة.", "أشعر بالسعادة عندما أرى أصدقائي، لكني حزين للمغادرة.", ["Él está enfadado porque llegan tarde.", "No tengas miedo, todo estará bien.", "Estoy muy emocionado por el viaje."]),
            readingExercise("Se sorprendió con el regalo y sintió una gran alegría.", "ابحث عن المشاعر الإيجابية.", "لقد تفاجأت بالهدية وشعرت بفرح كبير.", ["El niño está cansado y quiere dormir.", "Estoy orgulloso de tu éxito.", "No te preocupes, mantén la calma."])
        ],
        listeningExercises: [
            listeningExercise("enfadado", "الشعور أو إظهار الاستياء الشديد.", ["feliz", "triste", "cansado"]),
            listeningExercise("amor", "شعور عميق بالمودة والمحبة.", ["odio", "miedo", "esperanza"])
        ]
    },
    work: {
        words: [
            { word: "Trabajo", translation: "عمل", pronunciation: "تراباخو", emoji: "🏢" },
            { word: "Empleo", translation: "وظيفة", pronunciation: "إمبليو", emoji: "💼" },
            { word: "Oficina", translation: "مكتب", pronunciation: "أوفيثينا", emoji: "🏢" },
            { word: "Empresa", translation: "شركة", pronunciation: "إمبريسا", emoji: "🏭" },
            { word: "Gerente", translation: "مدير", pronunciation: "خيرينتي", emoji: "👨‍💼" },
            { word: "Empleado", translation: "موظف", pronunciation: "إمبليادو", emoji: "🧑‍💼" },
            { word: "Colega", translation: "زميل", pronunciation: "كوليغا", emoji: "👥" },
            { word: "Salario", translation: "راتب", pronunciation: "سالاريو", emoji: "💵" },
            { word: "Reunión", translation: "اجتماع", pronunciation: "ريونيون", emoji: "🤝" },
            { word: "Correo electrónico", translation: "بريد إلكتروني", pronunciation: "كوريو إليكترونيكو", emoji: "📧" },
            { word: "Ordenador", translation: "حاسوب", pronunciation: "أوردينادور", emoji: "💻" },
            { word: "Teléfono", translation: "هاتف", pronunciation: "تيليفونو", emoji: "📱" },
            { word: "Proyecto", translation: "مشروع", pronunciation: "پروييكتو", emoji: "📈" },
            { word: "Fecha límite", translation: "موعد نهائي", pronunciation: "فيتشا ليميتي", emoji: "⏳" },
            { word: "Tarea", translation: "مهمة", pronunciation: "تاريا", emoji: "📋" },
            { word: "Carrera", translation: "مهنة", pronunciation: "كارّيرا", emoji: "🚀" },
        ],
        readingExercises: [
            readingExercise("El gerente tiene una reunión en la oficina.", "ابحث عن كلمات 'gerente', 'reunión', 'oficina'.", "المدير لديه اجتماع في المكتب.", ["El empleado trabaja en el ordenador.", "El salario para este empleo es bueno.", "Te he enviado un correo electrónico."]),
            readingExercise("Mi colega me ayudó a terminar el proyecto antes de la fecha límite.", "ابحث عن كلمات العمل الجماعي والوقت.", "زميلي ساعدني في إنهاء المشروع قبل الموعد النهائي.", ["Uso mi teléfono para revisar el correo.", "Esta tarea es muy difícil.", "Te deseo una carrera exitosa."])
        ],
        listeningExercises: [
            listeningExercise("Oficina", "مكان العمل المكتبي.", ["Hotel", "Escuela", "Aeropuerto"]),
            listeningExercise("Ordenador", "جهاز إلكتروني لمعالجة البيانات.", ["Teléfono", "Libro", "Bolígrafo"])
        ]
    },
    travel: {
        words: [
            { word: "Viaje", translation: "سفر", pronunciation: "بياخي", emoji: "🌍" },
            { word: "Vacaciones", translation: "عطلة", pronunciation: "باكاثيونيس", emoji: "🏖️" },
            { word: "Aeropuerto", translation: "مطار", pronunciation: "آيروپويرتو", emoji: "✈️" },
            { word: "Avión", translation: "طائرة", pronunciation: "آبيون", emoji: "✈️" },
            { word: "Pasaporte", translation: "جواز سفر", pronunciation: "پاساپورتي", emoji: "🛂" },
            { word: "Billete", translation: "تذكرة", pronunciation: "بييتي", emoji: "🎟️" },
            { word: "Hotel", translation: "فندق", pronunciation: "أوتيل", emoji: "🏨" },
            { word: "Tren", translation: "قطار", pronunciation: "ترين", emoji: "🚆" },
            { word: "Coche", translation: "سيارة", pronunciation: "كوتشي", emoji: "🚗" },
            { word: "Autobús", translation: "حافلة", pronunciation: "آوتوبوس", emoji: "🚌" },
            { word: "Taxi", translation: "سيارة أجرة", pronunciation: "تاكسي", emoji: "🚕" },
            { word: "Mapa", translation: "خريطة", pronunciation: "ماپا", emoji: "🗺️" },
            { word: "Maleta", translation: "حقيبة سفر", pronunciation: "ماليتا", emoji: "🧳" },
            { word: "Equipaje", translation: "أمتعة", pronunciation: "إكيپاخي", emoji: "🧳" },
            { word: "Turista", translation: "سائح", pronunciation: "توريستا", emoji: "📸" },
            { word: "Destino", translation: "وجهة", pronunciation: "ديستينو", emoji: "📍" },
        ],
        readingExercises: [
            readingExercise("Necesito un pasaporte y un billete para el avión.", "ترجم الكلمات 'pasaporte', 'billete', و 'avión'.", "أحتاج جواز سفر وتذكرة للطائرة.", ["El hotel está cerca de la estación de tren.", "¿Es este tu coche nuevo?", "No olvides el mapa y la maleta."]),
            readingExercise("Nuestro destino es una isla bonita para las vacaciones.", "ابحث عن مكان ونوع الرحلة.", "وجهتنا هي جزيرة جميلة لقضاء العطلة.", ["El turista saca muchas fotos.", "Mi equipaje es muy pesado.", "Voy a tomar un taxi al aeropuerto."])
        ],
        listeningExercises: [
            listeningExercise("Pasaporte", "وثيقة رسمية للسفر الدولي.", ["Billete", "Maleta", "Hotel"]),
            listeningExercise("Coche", "وسيلة نقل خاصة بأربع عجلات.", ["Autobús", "Tren", "Avión"])
        ]
    }
};

export const SPANISH_GAMES: GamesCollection = {
    games: [
        {
            type: 'match',
            title: 'Juego de Pares',
            description: 'Empareja la palabra en español con su traducción al árabe.',
            items: [
                { id: 'es_match_1', word: 'Casa', translation: 'منزل' },
                { id: 'es_match_2', word: 'Gato', translation: 'قطة' },
                { id: 'es_match_3', word: 'Libro', translation: 'كتاب' },
                { id: 'es_match_4', word: 'Comer', translation: 'يأكل' },
            ]
        },
        {
            type: 'missing_word',
            title: 'Palabra Faltante',
            description: 'Elige la palabra correcta para completar la oración.',
            sentence: 'El sol es {blank} y caliente.',
            correctWord: 'amarillo',
            options: ['amarillo', 'azul', 'frío', 'triste']
        }
    ]
};
