
import React, { useState } from 'react';
import { speak } from '../../services/audioService';

// --- Data for the component ---
const russianGrammarContent = {
    categories: [
        {
            category: 'الأساسيات (Основы)',
            icon: 'fa-star',
            topics: [
                {
                    title: 'الأبجدية السيريلية (Кириллица)',
                    explanation: 'تستخدم اللغة الروسية الأبجدية السيريلية. العديد من الحروف تبدو مألوفة ولكن لها نطق مختلف، وبعضها جديد تمامًا. تعلم الأبجدية هو الخطوة الأولى والأهم.',
                    rule: '33 حرفاً: 10 حروف علة, 21 حرفاً ساكناً, وعلامتان (ь, ъ)',
                    examples: [
                        { en: 'А, Б, В, Г, Д...', ar: 'أ، ب، ڤ، گ، د...' },
                        { en: 'Да (Da)', ar: 'نعم' },
                        { en: 'Нет (Nyet)', ar: 'لا' },
                        { en: 'Спасибо (Spasibo)', ar: 'شكراً' },
                    ],
                    tip: 'تدرب على نطق كل حرف على حدة. هناك العديد من الموارد عبر الإنترنت لمساعدتك على إتقان النطق الصحيح.'
                },
                {
                    title: 'الجنس (Род)',
                    explanation: 'في الروسية، للأسماء ثلاثة أجناس: مذكر، مؤنث، ومحايد. جنس الاسم يحدد نهاية الصفات والأفعال في الماضي.',
                    rule: 'مذكر (ساكن)، مؤنث (-а, -я)، محايد (-о, -е)',
                    examples: [
                        { en: 'стол (stol) - مذكر', ar: 'طاولة' },
                        { en: 'книга (kniga) - مؤنث', ar: 'كتاب' },
                        { en: 'окно (okno) - محايد', ar: 'نافذة' },
                    ],
                    tip: 'هناك استثناءات، مثل "папа" (أب) وهو مذكر على الرغم من انتهائه بـ -а.'
                },
            ]
        },
        {
            category: 'الحالات الإعرابية (Падежи)',
            icon: 'fa-sitemap',
            topics: [
                {
                    title: 'مقدمة للحالات الإعرابية',
                    explanation: 'الحالات الإعرابية هي جوهر قواعد اللغة الروسية. يتغير شكل الكلمة (الاسم، الصفة، الضمير) بناءً على وظيفتها في الجملة. هناك ست حالات.',
                    rule: 'Nominative, Genitive, Dative, Accusative, Instrumental, Prepositional',
                    examples: [
                         { en: 'Это книга. (Nominative)', ar: 'هذا كتاب. (حالة الرفع - فاعل)' },
                         { en: 'Я читаю книгу. (Accusative)', ar: 'أنا أقرأ كتاباً. (حالة المفعول به)' },
                    ],
                    tip: 'ابدأ بالتركيز على حالة الرفع (Nominative) والمفعول به (Accusative) والمجرور (Prepositional) لأنها الأكثر شيوعاً.'
                },
                {
                    title: 'الماضي البسيط (Прошедшее время)',
                    explanation: 'يستخدم للتعبير عن أحداث وقعت وانتهت في الماضي. تصريفه أبسط من المضارع ويعتمد على جنس الفاعل وعدده.',
                    rule: 'مذكر (-л), مؤنث (-ла), محايد (-ло), جمع (-ли)',
                    examples: [
                        { en: 'Он читал.', ar: 'هو قرأ.' },
                        { en: 'Она читала.', ar: 'هي قرأت.' },
                        { en: 'Они читали.', ar: 'هم قرأوا.' },
                    ],
                    tip: 'على عكس المضارع، لا يتغير الفعل في الماضي بناءً على الشخص (أنا، أنت، هو). فقط الجنس والعدد.'
                },
            ]
        },
    ]
};

type Topic = typeof russianGrammarContent.categories[0]['topics'][0];

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
                        onClick={() => speak(ex.en, 'ru-RU')} 
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

interface RussianGrammarSectionProps {
    isSubscribed: boolean;
    onUnlockClick: () => void;
}

const RussianGrammarSection: React.FC<RussianGrammarSectionProps> = ({ isSubscribed, onUnlockClick }) => {
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
        const category = russianGrammarContent.categories.find(c => c.category === selectedCategory);
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
                        const isUnlocked = selectedCategory === russianGrammarContent.categories[0].category && topicIndex === 0;
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
            <h1 className="text-4xl font-extrabold text-white text-center mb-10">قواعد اللغة الروسية</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {russianGrammarContent.categories.map(category => (
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

export default RussianGrammarSection;