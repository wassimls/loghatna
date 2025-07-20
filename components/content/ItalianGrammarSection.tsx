
import React, { useState } from 'react';
import { speak } from '../../services/audioService';

// --- Data for the component ---
const italianGrammarContent = {
    categories: [
        {
            category: 'الأجناس والأدوات (Il Genere e gli Articoli)',
            icon: 'fa-venus-mars',
            topics: [
                {
                    title: 'المذكّر والمؤنث (Il Maschile e il Femminile)',
                    explanation: 'في اللغة الإيطالية، كل اسم له جنس، إما مذكر أو مؤنث. هذا يؤثر على الأدوات والصفات التي تستخدم معه. عادة، الكلمات المنتهية بـ -o مذكرة، والمنتهية بـ -a مؤنثة.',
                    rule: 'Maschile: -o / Femminile: -a',
                    examples: [
                        { en: 'il libro', ar: 'الكتاب (مذكر)' },
                        { en: 'la casa', ar: 'المنزل (مؤنث)' },
                        { en: 'un ragazzo', ar: 'ولد (مذكر)' },
                        { en: 'una ragazza', ar: 'بنت (مؤنث)' },
                    ],
                    tip: 'هناك استثناءات، مثل "il problema" (مذكر) أو "la mano" (مؤنث). الحفظ والممارسة هما المفتاح.'
                },
                {
                    title: 'أدوات التعريف المعرفة (Gli Articoli Determinativi)',
                    explanation: 'تستخدم للإشارة إلى اسم محدد ومعروف. تعادل "الـ" في العربية.',
                    rule: 'il, lo, l\' (مفرد مذكر) / la, l\' (مفرد مؤنث) / i, gli (جمع مذكر) / le (جمع مؤنث)',
                    examples: [
                        { en: 'il gatto', ar: 'القط' },
                        { en: 'lo studente', ar: 'الطالب' },
                        { en: 'l\'amico', ar: 'الصديق' },
                        { en: 'i libri', ar: 'الكتب' },
                        { en: 'gli alberi', ar: 'الأشجار' },
                        { en: 'le case', ar: 'المنازل' },
                    ],
                    tip: 'استخدم "lo" و "gli" مع الأسماء المذكرة التي تبدأ بـ s + ساكن, z, y, ps, gn.'
                },
                {
                    title: 'أدوات التعريف النكرة (Gli Articoli Indeterminativi)',
                    explanation: 'تستخدم للإشارة إلى اسم غير محدد أو عند ذكره لأول مرة.',
                    rule: 'un, uno (مفرد مذكر) / una, un\' (مفرد مؤنث)',
                    examples: [
                        { en: 'Ho comprato un libro.', ar: 'اشتريتُ كتاباً.' },
                        { en: 'Vedo una macchina.', ar: 'أرى سيارة.' },
                        { en: 'C\'è uno zaino.', ar: 'هناك حقيبة ظهر.' },
                        { en: 'È un\'idea interessante.', ar: 'إنها فكرة مثيرة للاهتمام.' },
                    ],
                    tip: 'استخدم "uno" قبل الأسماء المذكرة التي تبدأ بـ s + ساكن, z, y, ps, gn، و "un\'" قبل الأسماء المؤنثة التي تبدأ بحرف علة.'
                },
            ]
        },
        {
            category: 'الأزمنة (I Tempi)',
            icon: 'fa-clock',
            topics: [
                {
                    title: 'المضارع (Presente Indicativo)',
                    explanation: 'يستخدم للتعبير عن حقائق عامة، عادات، وأحداث تقع في الوقت الحالي.',
                    rule: 'الأفعال تصرف حسب نهايتها (-are, -ere, -ire)',
                    examples: [
                        { en: 'Io parlo italiano.', ar: 'أنا أتحدث الإيطالية.' },
                        { en: 'Tu leggi un libro.', ar: 'أنت تقرأ كتاباً.' },
                        { en: 'Lei dorme.', ar: 'هي تنام.' },
                    ],
                    tip: 'تعلم تصريفات الأفعال الشاذة الشائعة (essere, avere, andare, fare) هو أمر أساسي ومهم جداً.'
                },
                {
                    title: 'الماضي القريب (Passato Prossimo)',
                    explanation: 'هو الزمن الرئيسي للتعبير عن أحداث وقعت وانتهت في الماضي.',
                    rule: 'Soggetto + avere/essere (al presente) + Participio passato',
                    examples: [
                        { en: 'Ho mangiato una pizza.', ar: 'أكلتُ بيتزا.' },
                        { en: 'Lei è andata al cinema.', ar: 'هي ذهبت إلى السينما.' },
                        { en: 'Abbiamo visto un film.', ar: 'شاهدنا فيلماً.' },
                    ],
                    tip: 'معظم الأفعال تستخدم "avere" كفعل مساعد. الأفعال التي تصف الحركة أو تغير الحالة تستخدم "essere" ويتطابق اسم المفعول مع الفاعل في الجنس والعدد.'
                },
                {
                    title: 'المستقبل البسيط (Futuro Semplice)',
                    explanation: 'يستخدم للتعبير عن خطط مستقبلية، تنبؤات، أو وعود.',
                    rule: 'تُشتق النهايات من المصدر وتُضاف إليه نهايات المستقبل.',
                    examples: [
                        { en: 'Domani visiterò il museo.', ar: 'غداً، سأزور المتحف.' },
                        { en: 'Finiremo questo progetto.', ar: 'سوف ننهي هذا المشروع.' },
                    ],
                    tip: 'هناك بعض الأفعال الشاذة في المستقبل مثل essere (sar-), avere (avr-), andare (andr-), fare (far-).'
                },
            ]
        },
        {
            category: 'هيكل الجملة (La Struttura della Frase)',
            icon: 'fa-sitemap',
            topics: [
                {
                    title: 'النفي (La Negazione)',
                    explanation: 'الصيغة الأساسية للنفي في الإيطالية هي وضع "non" قبل الفعل.',
                    rule: 'Soggetto + non + Verbo + ...',
                    examples: [
                        { en: 'Io non parlo tedesco.', ar: 'أنا لا أتحدث الألمانية.' },
                        { en: 'Lui non ama il caffè.', ar: 'هو لا يحب القهوة.' },
                    ],
                    tip: 'بسيطة ومباشرة، "non" هي الكلمة الأساسية للنفي.'
                },
                {
                    title: 'الصفات (Gli Aggettivi)',
                    explanation: 'تصف الصفات الأسماء وتتفق معها في الجنس (مذكر/مؤنث) والعدد (مفرد/جمع).',
                    rule: 'الصفة تأتي عادة بعد الاسم',
                    examples: [
                        { en: 'un gatto nero', ar: 'قطة سوداء' },
                        { en: 'una macchina rossa', ar: 'سيارة حمراء' },
                        { en: 'libri interessanti', ar: 'كتب مثيرة للاهتمام' },
                    ],
                    tip: 'بعض الصفات الشائعة (مثل bello, grande, piccolo, buono) يمكن أن تأتي قبل الاسم.'
                }
            ]
        }
    ]
};

type Topic = typeof italianGrammarContent.categories[0]['topics'][0];

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
                        onClick={() => speak(ex.en, 'it-IT')} 
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

interface ItalianGrammarSectionProps {
    isSubscribed: boolean;
    onUnlockClick: () => void;
}

const ItalianGrammarSection: React.FC<ItalianGrammarSectionProps> = ({ isSubscribed, onUnlockClick }) => {
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
        const category = italianGrammarContent.categories.find(c => c.category === selectedCategory);
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
                        const isUnlocked = selectedCategory === italianGrammarContent.categories[0].category && topicIndex === 0;
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
            <h1 className="text-4xl font-extrabold text-white text-center mb-10">قواعد اللغة الإيطالية</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {italianGrammarContent.categories.map(category => (
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

export default ItalianGrammarSection;