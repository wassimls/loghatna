
import React, { useState } from 'react';
import { speak } from '../../services/audioService';

// --- Data for the component ---
const japaneseGrammarContent = {
    categories: [
        {
            category: 'الأساسيات (基礎)',
            icon: 'fa-star',
            topics: [
                {
                    title: 'أنظمة الكتابة (文字)',
                    explanation: 'تستخدم اللغة اليابانية ثلاثة أنظمة كتابة رئيسية: هيراغانا (للكلمات اليابانية الأصلية والقواعد)، كاتاكانا (للكلمات الأجنبية والأسماء)، وكانجي (مقاطع صينية تمثل كلمات أو أفكار كاملة).',
                    rule: 'ひらがな (Hiragana), カタカナ (Katakana), 漢字 (Kanji)',
                    examples: [
                        { en: 'こんにちは (Konnichiwa)', ar: 'مرحباً (هيراغانا)' },
                        { en: 'コーヒー (Kōhī)', ar: 'قهوة (كاتاكانا)' },
                        { en: '日本 (Nihon)', ar: 'اليابان (كانجي)' },
                    ],
                    tip: 'إتقان هيراغانا وكاتاكانا أولاً هو مفتاح القدرة على قراءة معظم المواد اليابانية للمبتدئين.'
                },
                {
                    title: 'بنية الجملة (SOV)',
                    explanation: 'تتبع اللغة اليابانية بنية (فاعل - مفعول به - فعل)، وهذا يختلف عن بنية (فاعل - فعل - مفعول به) في العربية والإنجليزية.',
                    rule: 'Subject - Object - Verb',
                    examples: [
                        { en: '私はリンゴを食べます。 (Watashi wa ringo o tabemasu.)', ar: 'أنا التفاح آكل. (أنا آكل التفاح)' },
                        { en: '彼は本を読みます。 (Kare wa hon o yomimasu.)', ar: 'هو الكتاب يقرأ. (هو يقرأ الكتاب)' },
                    ],
                    tip: 'تذكر دائماً أن الفعل يأتي في نهاية الجملة. هذا هو أهم اختلاف هيكلي يجب التعود عليه.'
                },
                 {
                    title: 'الأدوات النحوية (助詞 - Joshi)',
                    explanation: 'هي جزيئات صغيرة تأتي بعد الكلمات لتحديد وظيفتها النحوية في الجملة. هي العمود الفقري لقواعد اللغة اليابانية.',
                    rule: 'は (wa), が (ga), を (o), に (ni), で (de), も (mo), と (to)...',
                    examples: [
                        { en: '私「は」学生です。 (Watashi wa gakusei desu.)', ar: 'أنا طالب. (は للموضوع)' },
                        { en: '猫「が」います。 (Neko ga imasu.)', ar: 'هناك قطة. (が للفاعل)' },
                        { en: 'パン「を」食べます。 (Pan o tabemasu.)', ar: 'آكل الخبز. (を للمفعول به)' },
                         { en: '学校「に」行きます。 (Gakkō ni ikimasu.)', ar: 'أذهب إلى المدرسة. (に للاتجاه)' },
                    ],
                    tip: 'فهم الفروق الدقيقة بين الأدوات، خاصة بين は (wa) و が (ga)، يتطلب وقتاً وممارسة.'
                },
            ]
        },
        {
            category: 'الأفعال والصفات (動詞と形容詞)',
            icon: 'fa-bolt',
            topics: [
                {
                    title: 'تصريف الأفعال (صيغة ます - masu)',
                    explanation: 'صيغة "-masu" هي الصيغة المهذبة للمضارع والمستقبل للأفعال. هي الطريقة القياسية للتحدث في معظم المواقف اليومية.',
                    rule: 'تُستبدل النهاية "-u" من جذر الفعل بـ "-imasu"',
                    examples: [
                        { en: '書く (kaku) -> 書きます (kakimasu)', ar: 'يكتب -> يكتب (بصيغة مهذبة)' },
                        { en: '飲む (nomu) -> 飲みます (nomimasu)', ar: 'يشرب -> يشرب' },
                        { en: '見る (miru) -> 見ます (mimasu)', ar: 'يرى -> يرى' },
                    ],
                    tip: 'للنفي، نستخدم "-masen". للمضي، نستخدم "-mashita". للنفي في الماضي، نستخدم "-masen deshita".'
                },
                {
                    title: 'الصفات (い-صفات و な-صفات)',
                    explanation: 'تنقسم الصفات في اليابانية إلى نوعين رئيسيين، ولكل نوع طريقة تصريف مختلفة.',
                    rule: 'い-Adjectives / な-Adjectives',
                    examples: [
                        { en: '高いビル (takai biru)', ar: 'مبنى عالٍ (い-صفة)' },
                        { en: 'きれいな花 (kirei na hana)', ar: 'زهرة جميلة (な-صفة)' },
                        { en: 'この本は面白いです。 (Kono hon wa omoshiroi desu.)', ar: 'هذا الكتاب ممتع.' },
                    ],
                    tip: 'الصفات من نوع "な" تحتاج إلى إضافة "な" عندما تأتي قبل الاسم.'
                },
            ]
        }
    ]
};

type Topic = typeof japaneseGrammarContent.categories[0]['topics'][0];

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
                        onClick={() => speak(ex.en, 'ja-JP')} 
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

interface JapaneseGrammarSectionProps {
    isSubscribed: boolean;
    onUnlockClick: () => void;
}

const JapaneseGrammarSection: React.FC<JapaneseGrammarSectionProps> = ({ isSubscribed, onUnlockClick }) => {
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
        const category = japaneseGrammarContent.categories.find(c => c.category === selectedCategory);
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
                        const isUnlocked = selectedCategory === japaneseGrammarContent.categories[0].category && topicIndex === 0;
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
            <h1 className="text-4xl font-extrabold text-white text-center mb-10">قواعد اللغة اليابانية</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {japaneseGrammarContent.categories.map(category => (
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

export default JapaneseGrammarSection;