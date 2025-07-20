
import React, { useState } from 'react';
import { speak } from '../../services/audioService';

// --- Data for the component ---
const chineseGrammarContent = {
    categories: [
        {
            category: 'الأساسيات (基础)',
            icon: 'fa-star',
            topics: [
                {
                    title: 'نظام بينيين (拼音 - Pīnyīn)',
                    explanation: 'بينيين هو نظام صوتي يستخدم الحروف اللاتينية لتمثيل نطق الحروف الصينية (الهانزي). هو أساس تعلم النطق الصحيح.',
                    rule: 'Initial (حرف ساكن) + Final (حرف علة) + Tone Mark (علامة النغمة)',
                    examples: [
                        { en: 'nǐ hǎo', ar: 'مرحباً' },
                        { en: 'xièxie', ar: 'شكراً' },
                        { en: 'zàijiàn', ar: 'مع السلامة' },
                    ],
                    tip: 'ركز على التفريق بين الأصوات المتشابهة مثل "j", "q", "x" و "zh", "ch", "sh".'
                },
                {
                    title: 'النغمات الأربع (四声 - Sìshēng)',
                    explanation: 'اللغة الصينية هي لغة نغمية، مما يعني أن معنى الكلمة يتغير بتغير نبرة الصوت. هناك أربع نغمات رئيسية بالإضافة إلى نغمة محايدة.',
                    rule: '1(—) عالية ومستقيمة, 2(↗) صاعدة, 3(∨) منخفضة ثم صاعدة, 4(↘) هابطة',
                    examples: [
                        { en: 'mā (妈) - أم', ar: 'النغمة الأولى' },
                        { en: 'má (麻) - قنب', ar: 'النغمة الثانية' },
                        { en: 'mǎ (马) - حصان', ar: 'النغمة الثالثة' },
                        { en: 'mà (骂) - يوبخ', ar: 'النغمة الرابعة' },
                    ],
                    tip: 'نطق النغمات بشكل خاطئ يمكن أن يغير معنى الكلمة تماماً. استمع كثيراً وحاول تقليد الناطقين الأصليين.'
                },
                {
                    title: 'بنية الجملة (SVO)',
                    explanation: 'بنية الجملة الأساسية في الصينية تشبه الإنجليزية والعربية: (فاعل - فعل - مفعول به).',
                    rule: 'Subject - Verb - Object',
                    examples: [
                        { en: '我爱你 (wǒ ài nǐ)', ar: 'أنا أحبك' },
                        { en: '他吃饭 (tā chī fàn)', ar: 'هو يأكل الطعام' },
                        { en: '她看书 (tā kàn shū)', ar: 'هي تقرأ كتاباً' },
                    ],
                    tip: 'الظروف الزمنية والمكانية (مثل "اليوم"، "في بكين") تأتي عادةً بعد الفاعل وقبل الفعل.'
                },
            ]
        },
        {
            category: 'الأدوات النحوية (语法颗粒)',
            icon: 'fa-cogs',
            topics: [
                {
                    title: 'أداة الملكية 的 (de)',
                    explanation: 'تعتبر "的" من أكثر الأدوات استخداماً وتستخدم بشكل أساسي للدلالة على الملكية، مثل إضافة ياء الملكية في العربية.',
                    rule: 'المالك + 的 + الشيء المملوك',
                    examples: [
                        { en: '我的书 (wǒ de shū)', ar: 'كتابي' },
                        { en: '她的猫 (tā de māo)', ar: 'قطتها' },
                        { en: '中国的首都 (zhōngguó de shǒudū)', ar: 'عاصمة الصين' },
                    ],
                    tip: 'يمكن حذف "的" في العلاقات العائلية أو الشخصية القريبة جداً (مثال: 我妈妈 بدلاً من 我的妈妈).'
                },
                {
                    title: 'أداة الماضي 了 (le)',
                    explanation: 'الأداة "了" تستخدم للدلالة على اكتمال حدث أو حدوث تغيير في الحالة. ليس لها مقابل مباشر في العربية ولكنها تشير غالباً إلى الماضي.',
                    rule: 'توضع بعد الفعل للدلالة على اكتماله.',
                    examples: [
                        { en: '我吃了 (wǒ chī le)', ar: 'لقد أكلت.' },
                        { en: '他来了 (tā lái le)', ar: 'لقد أتى.' },
                        { en: '下雨了 (xià yǔ le)', ar: 'بدأت تمطر (تغير في الحالة).' },
                    ],
                    tip: 'وجود "了" لا يعني دائماً أن الجملة في الماضي. يمكن أن تشير إلى اكتمال سيحدث في المستقبل.'
                },
                {
                    title: 'أداة الاستفهام 吗 (ma)',
                    explanation: 'أسهل طريقة لتكوين سؤال إجابته نعم/لا هي بإضافة "吗" في نهاية جملة خبرية.',
                    rule: 'جملة خبرية + 吗?',
                    examples: [
                        { en: '你是学生。(Nǐ shì xuéshēng.)', ar: 'أنت طالب.' },
                        { en: '你是学生吗？(Nǐ shì xuéshēng ma?)', ar: 'هل أنت طالب؟' },
                        { en: '他喜欢咖啡吗？(Tā xǐhuān kāfēi ma?)', ar: 'هل هو يحب القهوة؟' },
                    ],
                    tip: 'لا تستخدم "吗" مع كلمات الاستفهام الأخرى مثل "什么" (ماذا) أو "谁" (من).'
                },
                {
                    title: 'كلمات العد (量词 - Liàngcí)',
                    explanation: 'في الصينية، عند عد الأسماء، يجب استخدام كلمة عد مناسبة بين الرقم والاسم. لا يمكن قول "ثلاثة كتب" مباشرة.',
                    rule: 'رقم + كلمة عد + اسم',
                    examples: [
                        { en: '一个人 (yí ge rén)', ar: 'شخص واحد ("个" هي كلمة العد العامة)' },
                        { en: '三本书 (sān běn shū)', ar: 'ثلاثة كتب ("本" تستخدم للكتب)' },
                        { en: '两只猫 (liǎng zhī māo)', ar: 'قطتان ("只" للحيوانات)' },
                    ],
                    tip: 'كلمة العد الأكثر شيوعاً هي "个" (ge). عندما تكون في شك، استخدمها.'
                },
            ]
        }
    ]
};

type Topic = typeof chineseGrammarContent.categories[0]['topics'][0];

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
                        onClick={() => speak(ex.en, 'zh-CN')} 
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

interface ChineseGrammarSectionProps {
    isSubscribed: boolean;
    onUnlockClick: () => void;
}

const ChineseGrammarSection: React.FC<ChineseGrammarSectionProps> = ({ isSubscribed, onUnlockClick }) => {
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
        const category = chineseGrammarContent.categories.find(c => c.category === selectedCategory);
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
                        const isUnlocked = selectedCategory === chineseGrammarContent.categories[0].category && topicIndex === 0;
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
            <h1 className="text-4xl font-extrabold text-white text-center mb-10">قواعد اللغة الصينية</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chineseGrammarContent.categories.map(category => (
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

export default ChineseGrammarSection;