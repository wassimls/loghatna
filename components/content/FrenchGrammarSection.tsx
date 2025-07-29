
import React, { useState } from 'react';
import { speak } from '../../services/audioService';

// --- Data for the component ---
const frenchGrammarContent = {
    categories: [
        {
            category: 'الأجناس والأدوات (Le Genre et les Articles)',
            icon: 'fa-venus-mars',
            topics: [
                {
                    title: 'المذكّر والمؤنث (Le Masculin et le Féminin)',
                    explanation: 'في اللغة الفرنسية، كل اسم له جنس، إما مذكر أو مؤنث. هذا يؤثر على الأدوات والصفات التي تستخدم معه.',
                    rule: 'Masculin (مذكر): le, un / Féminin (مؤنث): la, une',
                    examples: [
                        { en: 'le livre', ar: 'الكتاب (مذكر)' },
                        { en: 'la table', ar: 'الطاولة (مؤنث)' },
                        { en: 'un garçon', ar: 'ولد (مذكر)' },
                        { en: 'une fille', ar: 'بنت (مؤنث)' },
                    ],
                    tip: 'معظم الكلمات المنتهية بـ -e تكون مؤنثة، ولكن هناك استثناءات كثيرة، لذا الحفظ مهم.'
                },
                {
                    title: 'أدوات التعريف المعرفة (Les Articles Définis)',
                    explanation: 'تستخدم للإشارة إلى اسم محدد أو معروف للمتكلم والمستمع. تعادل "الـ" في العربية.',
                    rule: 'le (مفرد مذكر), la (مفرد مؤنث), l\' (أمام حرف علة), les (جمع)',
                    examples: [
                        { en: 'le chat', ar: 'القط (المحدد)' },
                        { en: 'la voiture', ar: 'السيارة (المحددة)' },
                        { en: 'l\'ami', ar: 'الصديق (المحدد)' },
                        { en: 'les enfants', ar: 'الأطفال (المحددون)' },
                    ],
                    tip: 'استخدم l\' عندما تبدأ الكلمة بحرف علة (a, e, i, o, u) أو h صامتة.'
                },
                {
                    title: 'أدوات التعريف النكرة (Les Articles Indéfinis)',
                    explanation: 'تستخدم للإشارة إلى اسم غير محدد أو عند ذكره لأول مرة.',
                    rule: 'un (مفرد مذكر), une (مفرد مؤنث), des (جمع)',
                    examples: [
                        { en: 'J\'ai un chien.', ar: 'لدي كلب (أي كلب).' },
                        { en: 'Elle a une idée.', ar: 'لديها فكرة (فكرة ما).' },
                        { en: 'Il y a des livres sur la table.', ar: 'هناك كتب على الطاولة.' },
                    ],
                    tip: 'في النفي، تتحول un, une, des عادةً إلى de أو d\'.'
                },
                {
                    title: 'أدوات التجزئة (Les Articles Partitifs)',
                    explanation: 'تستخدم مع الأسماء التي لا يمكن عدها (مثل الطعام والشراب) للتعبير عن كمية غير محددة أو "جزء من".',
                    rule: 'du (مذكر), de la (مؤنث), de l\' (أمام حرف علة)',
                    examples: [
                        { en: 'Je mange du pain.', ar: 'آكل خبزاً (جزءاً من الخبز).' },
                        { en: 'Elle boit de la soupe.', ar: 'هي تشرب حساءً.' },
                        { en: 'Tu veux de l\'eau ?', ar: 'هل تريد ماءً؟' },
                    ],
                    tip: 'تستخدم بشكل شائع جداً عند الحديث عن الطعام والشراب.'
                },
            ]
        },
        {
            category: 'الأزمنة (Les Temps)',
            icon: 'fa-clock',
            topics: [
                {
                    title: 'المضارع (Le Présent)',
                    explanation: 'يستخدم للتعبير عن حقائق عامة، عادات، وأحداث تقع في الوقت الحالي.',
                    rule: 'تصريفات الأفعال تختلف حسب المجموعة (-er, -ir, -re)',
                    examples: [
                        { en: 'Je parle français.', ar: 'أنا أتحدث الفرنسية.' },
                        { en: 'Tu finis ton travail.', ar: 'أنت تنهي عملك.' },
                        { en: 'Il attend le bus.', ar: 'هو ينتظر الحافلة.' },
                    ],
                    tip: 'تعلم تصريفات الأفعال الشاذة الشائعة (être, avoir, aller, faire) هو أمر أساسي ومهم جداً.'
                },
                {
                    title: 'الماضي المركب (Le Passé Composé)',
                    explanation: 'هو الزمن الرئيسي للتعبير عن أحداث وقعت وانتهت في الماضي.',
                    rule: 'Sujet + avoir/être (au présent) + Participe passé',
                    examples: [
                        { en: 'J\'ai mangé une pomme.', ar: 'أكلتُ تفاحة.' },
                        { en: 'Elle est allée au cinéma.', ar: 'هي ذهبت إلى السينما.' },
                        { en: 'Nous avons vu un film.', ar: 'شاهدنا فيلماً.' },
                    ],
                    tip: 'معظم الأفعال تستخدم "avoir" كفعل مساعد. الأفعال التي تصف الحركة أو تغير الحالة (مثل aller, venir, partir) تستخدم "être".'
                },
                {
                    title: 'المستقبل البسيط (Le Futur Simple)',
                    explanation: 'يستخدم للتعبير عن خطط مستقبلية، تنبؤات، أو وعود.',
                    rule: 'Infinitif + -ai, -as, -a, -ons, -ez, -ont',
                    examples: [
                        { en: 'Demain, je visiterai le musée.', ar: 'غداً، سأزور المتحف.' },
                        { en: 'Vous finirez ce projet.', ar: 'سوف تنهون هذا المشروع.' },
                    ],
                    tip: 'هناك بعض الأفعال الشاذة في المستقبل مثل être (ser-), avoir (aur-), aller (ir-), faire (fer-).'
                },
            ]
        },
        {
            category: 'هيكل الجملة (La Structure de la Phrase)',
            icon: 'fa-sitemap',
            topics: [
                {
                    title: 'النفي (La Négation)',
                    explanation: 'الصيغة الأساسية للنفي في الفرنسية هي وضع الفعل بين "ne" و "pas".',
                    rule: 'Sujet + ne + Verbe + pas + ...',
                    examples: [
                        { en: 'Je ne parle pas anglais.', ar: 'أنا لا أتحدث الإنجليزية.' },
                        { en: 'Il n\'aime pas le café.', ar: 'هو لا يحب القهوة.' },
                    ],
                    tip: 'في اللغة المحكية، غالباً ما يتم حذف "ne" (مثال: Je parle pas). لكن في الكتابة الرسمية، يجب استخدامها.'
                },
                {
                    title: 'الصفات (Les Adjectifs)',
                    explanation: 'تصف الصفات الأسماء وتتفق معها في الجنس (مذكر/مؤنث) والعدد (مفرد/جمع).',
                    rule: 'الصفة تأتي عادة بعد الاسم',
                    examples: [
                        { en: 'un chat noir', ar: 'قطة سوداء' },
                        { en: 'une voiture rouge', ar: 'سيارة حمراء' },
                        { en: 'des livres intéressants', ar: 'كتب مثيرة للاهتمام' },
                    ],
                    tip: 'بعض الصفات القصيرة والشائعة (مثل beau, grand, petit, bon) تأتي قبل الاسم.'
                }
            ]
        }
    ]
};

type Topic = typeof frenchGrammarContent.categories[0]['topics'][0];

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
                        onClick={() => speak(ex.en, 'fr-FR')} 
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

interface FrenchGrammarSectionProps {
    isSubscribed: boolean;
    onUnlockClick: () => void;
}

const FrenchGrammarSection: React.FC<FrenchGrammarSectionProps> = ({ isSubscribed, onUnlockClick }) => {
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
        const category = frenchGrammarContent.categories.find(c => c.category === selectedCategory);
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
                        const isUnlocked = selectedCategory === frenchGrammarContent.categories[0].category && topicIndex === 0;
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
            <h1 className="text-4xl font-extrabold text-white text-center mb-10">قواعد اللغة الفرنسية</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {frenchGrammarContent.categories.map(category => (
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

export default FrenchGrammarSection;