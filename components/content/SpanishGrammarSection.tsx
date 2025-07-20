
import React, { useState } from 'react';
import { speak } from '../../services/audioService';

// --- Data for the component ---
const spanishGrammarContent = {
    categories: [
        {
            category: 'الأجناس والأدوات (El Género y los Artículos)',
            icon: 'fa-venus-mars',
            topics: [
                {
                    title: 'المذكّر والمؤنث (El Masculino y el Feminino)',
                    explanation: 'في اللغة الإسبانية، كل اسم له جنس، إما مذكر أو مؤنث. عادة، الكلمات المنتهية بـ -o مذكرة، والمنتهية بـ -a مؤنثة.',
                    rule: 'Masculino: -o / Femenino: -a',
                    examples: [
                        { en: 'el libro', ar: 'الكتاب (مذكر)' },
                        { en: 'la mesa', ar: 'الطاولة (مؤنث)' },
                        { en: 'un chico', ar: 'ولد (مذكر)' },
                        { en: 'una chica', ar: 'بنت (مؤنث)' },
                    ],
                    tip: 'هناك استثناءات، مثل "el problema" (مذكر) أو "la mano" (مؤنث). الحفظ والممارسة هما المفتاح.'
                },
                {
                    title: 'أدوات التعريف المعرفة (Los Artículos Definidos)',
                    explanation: 'تستخدم للإشارة إلى اسم محدد ومعروف. تعادل "الـ" في العربية.',
                    rule: 'el (مفرد مذكر), la (مفرد مؤنث), los (جمع مذكر), las (جمع مؤنث)',
                    examples: [
                        { en: 'el perro', ar: 'الكلب (المحدد)' },
                        { en: 'la casa', ar: 'المنزل (المحدد)' },
                        { en: 'los libros', ar: 'الكتب (المحددة)' },
                        { en: 'las flores', ar: 'الزهور (المحددة)' },
                    ],
                    tip: 'استخدم "el" مع الأسماء المؤنثة المفردة التي تبدأ بـ a أو ha مشددة، مثل "el agua".'
                },
                {
                    title: 'أدوات التعريف النكرة (Los Artículos Indefinidos)',
                    explanation: 'تستخدم للإشارة إلى اسم غير محدد أو عند ذكره لأول مرة.',
                    rule: 'un (مفرد مذكر), una (مفرد مؤنث), unos (جمع مذكر), unas (جمع مؤنث)',
                    examples: [
                        { en: 'Tengo un coche.', ar: 'لدي سيارة (سيارة ما).' },
                        { en: 'Ella es una doctora.', ar: 'هي طبيبة.' },
                        { en: 'Compré unos zapatos.', ar: 'اشتريت أحذية.' },
                    ],
                    tip: 'تستخدم "unos" و "unas" لتعني "بعض" أو "حوالي".'
                },
            ]
        },
        {
            category: 'الأفعال والأزمنة (Los Verbos y Tiempos)',
            icon: 'fa-clock',
            topics: [
                {
                    title: 'الفعلان Ser و Estar',
                    explanation: 'كلاهما يعني "يكون"، لكن استخدامهما مختلف. "Ser" يستخدم للصفات الدائمة والهوية. "Estar" يستخدم للحالات المؤقتة والموقع.',
                    rule: 'Ser: هوية، مهنة، أصل. / Estar: موقع، حالة، شعور.',
                    examples: [
                        { en: 'Yo soy de Egipto.', ar: 'أنا من مصر. (Ser)' },
                        { en: 'Él es doctor.', ar: 'هو طبيب. (Ser)' },
                        { en: 'Estoy en casa.', ar: 'أنا في المنزل. (Estar)' },
                        { en: 'Ella está cansada.', ar: 'هي متعبة. (Estar)' },
                    ],
                    tip: 'تذكر: "How you feel and where you are, that is when you use estar."'
                },
                {
                    title: 'المضارع (Presente de Indicativo)',
                    explanation: 'يستخدم للتعبير عن حقائق عامة، عادات، وأحداث تقع في الوقت الحالي.',
                    rule: 'تصريفات الأفعال تختلف حسب نهايتها (-ar, -er, -ir)',
                    examples: [
                        { en: 'Hablo español.', ar: 'أتحدث الإسبانية.' },
                        { en: 'Tú comes mucho.', ar: 'أنت تأكل كثيراً.' },
                        { en: 'Él vive en Madrid.', ar: 'هو يعيش في مدريد.' },
                    ],
                    tip: 'انتبه للأفعال الشاذة في المضارع مثل tener (tengo), ir (voy), ser (soy).'
                },
                {
                    title: 'الماضي البسيط (Pretérito Indefinido)',
                    explanation: 'يستخدم للتعبير عن أحداث بدأت وانتهت في الماضي في وقت محدد.',
                    rule: 'Sujeto + Verbo (en pretérito)',
                    examples: [
                        { en: 'Ayer comí paella.', ar: 'أمس أكلتُ باييا.' },
                        { en: 'Ella fue al mercado.', ar: 'هي ذهبت إلى السوق.' },
                        { en: 'Compramos una casa el año pasado.', ar: 'اشترينا منزلاً العام الماضي.' },
                    ],
                    tip: 'هناك العديد من الأفعال الشاذة في هذا الزمن، مثل ir/ser (fui, fuiste...) و tener (tuve, tuviste...).'
                }
            ]
        },
        {
            category: 'هيكل الجملة (La Estructura de la Oración)',
            icon: 'fa-sitemap',
            topics: [
                {
                    title: 'النفي (La Negación)',
                    explanation: 'الصيغة الأساسية للنفي في الإسبانية هي وضع "no" قبل الفعل المصرف.',
                    rule: 'Sujeto + no + Verbo conjugado + ...',
                    examples: [
                        { en: 'No hablo japonés.', ar: 'أنا لا أتحدث اليابانية.' },
                        { en: 'Ella no quiere café.', ar: 'هي لا تريد قهوة.' },
                    ],
                    tip: 'للنفي المزدوج (لا أحد، لا شيء)، تضع "no" قبل الفعل وكلمة النفي الأخرى بعده (No veo a nadie - لا أرى أحداً).'
                },
                {
                    title: 'الصفات (Los Adjetivos)',
                    explanation: 'تصف الصفات الأسماء وتتفق معها في الجنس (مذكر/مؤنث) والعدد (مفرد/جمع).',
                    rule: 'الصفة تأتي عادة بعد الاسم',
                    examples: [
                        { en: 'un coche rápido', ar: 'سيارة سريعة' },
                        { en: 'la casa blanca', ar: 'المنزل الأبيض' },
                        { en: 'chicos inteligentes', ar: 'أولاد أذكياء' },
                    ],
                    tip: 'بعض الصفات مثل "bueno" و "malo" يمكن أن تأتي قبل الاسم، وقد يتغير شكلها (buen día).'
                }
            ]
        }
    ]
};

type Topic = typeof spanishGrammarContent.categories[0]['topics'][0];

const TopicContent: React.FC<{ topic: Topic }> = ({ topic }) => (
    <div className="w-full bg-dark/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-secondary mb-4">{topic.title}</h2>
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">{topic.explanation}</p>
        
        <div className="bg-dark/70 p-4 rounded-lg mb-6 border-l-4 border-accent">
            <p className="text-sm text-gray-400 mb-1">القاعدة:</p>
            <p className="font-mono text-lg text-accent text-left dir-ltr">{topic.rule}</p>
        </div>

        <h3 className="text-xl font-semibold text-white mb-4">أمثلة:</h3>
        <div className="space-y-4 mb-6">
            {topic.examples.map((ex, i) => (
                <div key={i} className="bg-dark/80 p-4 rounded-lg flex justify-between items-center gap-4 border border-white/10">
                    <div className="flex-grow">
                        <p className="font-semibold text-light text-left dir-ltr text-base">{ex.en}</p>
                        <p className="text-sm text-gray-400 text-right mt-1">{ex.ar}</p>
                    </div>
                    <button 
                        onClick={() => speak(ex.en, 'es-ES')} 
                        className="flex-shrink-0 w-10 h-10 bg-primary/70 text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                        aria-label={`Listen to example: ${ex.en}`}
                    >
                        <i className="fas fa-volume-up"></i>
                    </button>
                </div>
            ))}
        </div>

        {topic.tip && (
            <div className="mt-auto bg-secondary/10 p-4 rounded-lg border border-secondary/20">
                <p className="text-yellow-300 font-bold flex items-center gap-2"><i className="fas fa-star"></i>نصيحة:</p>
                <p className="text-gray-300 mt-2">{topic.tip}</p>
            </div>
        )}
    </div>
);

interface SpanishGrammarSectionProps {
    isSubscribed: boolean;
    onUnlockClick: () => void;
}

const SpanishGrammarSection: React.FC<SpanishGrammarSectionProps> = ({ isSubscribed, onUnlockClick }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

    const handleSelectTopic = (topic: Topic) => {
        setSelectedTopic(topic);
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
        setSelectedTopic(null);
    };
    
    const handleBackToTopics = () => {
        setSelectedTopic(null);
    };
    
    if (selectedTopic) {
        return (
            <div className="p-4 md:p-6 animate-fadeIn overflow-y-auto h-full">
                <button onClick={handleBackToTopics} className="btn bg-dark/50 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-lg mb-6 flex items-center gap-2">
                    <i className="fas fa-arrow-right"></i>
                    العودة إلى المواضيع
                </button>
                <TopicContent topic={selectedTopic} />
            </div>
        );
    }
    
    if (selectedCategory) {
        const category = spanishGrammarContent.categories.find(c => c.category === selectedCategory);
        if (!category) return null;

        return (
             <div className="p-6 md:p-8 animate-fadeIn">
                <button onClick={handleBackToCategories} className="btn bg-dark/50 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-lg mb-6 flex items-center gap-2">
                    <i className="fas fa-arrow-right"></i>
                    العودة إلى الفئات
                </button>
                <h2 className="text-3xl font-bold text-secondary mb-6 flex items-center gap-3">
                    <i className={`fas ${category.icon}`}></i>
                    {category.category}
                </h2>
                <div className="space-y-4">
                    {category.topics.map((topic, topicIndex) => {
                        const isUnlocked = selectedCategory === spanishGrammarContent.categories[0].category && topicIndex === 0;
                        const isLocked = !isSubscribed && !isUnlocked;
                        return (
                            <button
                                key={topic.title}
                                onClick={() => isLocked ? onUnlockClick() : handleSelectTopic(topic)}
                                className="w-full text-right p-6 rounded-2xl bg-dark/50 hover:bg-primary/50 border border-white/10 transition-all duration-300 flex justify-between items-center shadow-lg"
                            >
                                <div>
                                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                        {isLocked && <i className="fas fa-lock text-yellow-400"></i>}
                                        {topic.title}
                                    </h3>
                                    <p className="text-gray-400 mt-1">{topic.explanation.substring(0, 100)}...</p>
                                </div>
                                <i className={`fas ${isLocked ? 'fa-unlock-alt' : 'fa-chevron-left'} text-secondary text-2xl`}></i>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 animate-fadeIn">
            <h1 className="text-4xl font-extrabold text-white text-center mb-10">قواعد اللغة الإسبانية</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spanishGrammarContent.categories.map(category => (
                    <button 
                        key={category.category}
                        onClick={() => setSelectedCategory(category.category)}
                        className="bg-dark/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center transition-all duration-300 hover:border-secondary hover:bg-secondary/10 hover:-translate-y-2 group shadow-lg"
                    >
                        <i className={`fas ${category.icon} text-4xl text-secondary mb-4 transition-transform group-hover:scale-110`}></i>
                        <h2 className="text-2xl font-bold text-white">{category.category}</h2>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SpanishGrammarSection;