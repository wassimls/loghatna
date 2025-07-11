

import React, { useState, useEffect } from 'react';
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
    ],
    quiz: [
        {
            question: 'ما هي الأداة التي تستخدم لتحويل جملة إلى سؤال؟',
            options: ['的 (de)', '了 (le)', '吗 (ma)', '很 (hěn)'],
            answer: '吗 (ma)',
            explanation: 'الأداة "吗" (ma) تضاف في نهاية الجملة لتحويلها إلى سؤال تكون إجابته بنعم أو لا.'
        },
        {
            question: 'اختر كلمة العد الصحيحة لكلمة "كتاب" (书).',
            options: ['个 (ge)', '本 (běn)', '只 (zhī)', '张 (zhāng)'],
            answer: '本 (běn)',
            explanation: 'كلمة العد "本" (běn) تستخدم خصيصاً للأشياء المجلدة مثل الكتب والمجلات.'
        },
        {
            question: 'ماذا تعني جملة "我吃饭了"؟',
            options: ['أنا آكل الآن', 'أنا سآكل', 'أنا أكلت', 'أنا لا آكل'],
            answer: 'أنا أكلت',
            explanation: 'الأداة "了" (le) بعد الفعل "吃" (يأكل) تدل على اكتمال الحدث، أي أنه أكل وانتهى.'
        }
    ],
    flashcards: [
        { front: 'SVO Structure', back: 'بنية الجملة: فاعل - فعل - مفعول به. (我爱你 - أنا أحبك)' },
        { front: '的 (de)', back: 'أداة الملكية. توضع بين المالك والشيء المملوك. (我的书 - كتابي)' },
        { front: '了 (le)', back: 'أداة اكتمال الحدث. توضع بعد الفعل. (我吃了 - أكلت)' },
        { front: '吗 (ma)', back: 'أداة الاستفهام. توضع في نهاية الجملة. (你好吗؟ - كيف حالك؟)' },
        { front: '量词 (كلمات العد)', back: 'ضرورية بين الرقم والاسم. (一个人 - شخص واحد)' },
    ],
    commonMistakes: [
        { wrong: '我是很好。', correct: '我很好。', explanation: 'الصفات في الصينية تعمل كأفعال حال أحياناً. لا تحتاج إلى فعل "是" (يكون) معها. "很" (جداً) تستخدم غالباً لربط الفاعل بالصفة.' },
        { wrong: '我想一个苹果。', correct: '我想要一个苹果。', explanation: 'الفعل "想" يعني "يفكر" أو "يفتقد". للتعبير عن "يريد"، استخدم "要" أو "想要".' },
        { wrong: '我看电视了昨天。', correct: '我昨天看电视了。', explanation: 'الظروف الزمنية مثل "أمس" (昨天) تأتي قبل الفعل، وليس في نهاية الجملة.' },
    ]
};

const TopicCard: React.FC<{ topic: typeof chineseGrammarContent.categories[0]['topics'][0] }> = ({ topic }) => {
    return (
        <div className="bg-dark/70 rounded-2xl p-5 border border-white/10 shadow-lg flex flex-col h-full">
            <h4 className="text-xl font-bold text-secondary mb-3">{topic.title}</h4>
            <p className="text-gray-300 mb-4 text-base leading-relaxed">{topic.explanation}</p>
            <div className="bg-dark/50 p-3 rounded-lg mb-4">
                <p className="text-sm text-gray-400 mb-1">القاعدة:</p>
                <p className="font-mono text-accent text-center dir-ltr text-lg">{topic.rule}</p>
            </div>
            <div className="space-y-3 mb-4">
                {topic.examples.map((ex, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-lg flex justify-between items-center gap-3">
                        <div className="flex-grow">
                            <p className="font-semibold text-light dir-ltr text-left text-base">{ex.en}</p>
                            <p className="text-sm text-gray-400 text-right">{ex.ar}</p>
                        </div>
                        <button 
                            onClick={() => speak(ex.en, 'zh-CN')} 
                            className="flex-shrink-0 w-9 h-9 bg-primary/50 text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                            aria-label={`Listen to example: ${ex.en}`}
                        >
                            <i className="fas fa-volume-up"></i>
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-auto bg-secondary/10 border-r-4 border-secondary p-3 rounded-lg">
                <p className="text-sm text-secondary font-bold"><i className="fas fa-star mr-2"></i>نصيحة:</p>
                <p className="text-gray-300 text-sm">{topic.tip}</p>
            </div>
        </div>
    );
};

const ChineseGrammarSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState('explanation');
    const [expandedCategory, setExpandedCategory] = useState<string | null>(chineseGrammarContent.categories[0].category);
    
    // Quiz State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showQuizResult, setShowQuizResult] = useState(false);

    // Flashcard State
    const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);
    
    useEffect(() => {
        if (activeTab === 'quiz') resetQuiz();
        if (activeTab === 'flashcards') setFlippedCardIndex(null);
    }, [activeTab]);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    // --- Quiz Logic ---
    const handleAnswerSelect = (option: string) => {
        if (isAnswered) return;
        setSelectedAnswer(option);
        setIsAnswered(true);
        if (option === chineseGrammarContent.quiz[currentQuestionIndex].answer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < chineseGrammarContent.quiz.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setIsAnswered(false);
            setSelectedAnswer(null);
        } else {
            setShowQuizResult(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setScore(0);
        setShowQuizResult(false);
    };

    const renderExplanationTab = () => (
        <div className="space-y-8">
            {chineseGrammarContent.categories.map(category => (
                <div key={category.category} className="bg-dark/40 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg">
                    <button 
                        className="w-full text-right p-5 flex justify-between items-center cursor-pointer"
                        onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
                        aria-expanded={expandedCategory === category.category}
                        aria-controls={`category-${category.icon}`}
                    >
                        <h3 className="text-2xl font-bold text-secondary flex items-center gap-4">
                            <i className={`fas ${category.icon}`}></i>
                            {category.category}
                        </h3>
                        <i className={`fas fa-chevron-down text-xl text-gray-400 transition-transform duration-300 ${expandedCategory === category.category ? 'rotate-180' : ''}`}></i>
                    </button>
                    {expandedCategory === category.category && (
                         <div id={`category-${category.icon}`} className="p-2 md:p-5 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.topics.map(topic => <TopicCard key={topic.title} topic={topic} />)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
    
    const renderQuizTab = () => {
        if (showQuizResult) {
            return (
                 <div className="text-center p-8 bg-dark/70 rounded-2xl flex flex-col items-center max-w-lg mx-auto animate-fadeIn">
                    <i className="fas fa-trophy text-7xl text-secondary mb-4"></i>
                    <h3 className="text-3xl font-bold mb-2">اكتمل الاختبار!</h3>
                    <p className="text-xl mb-6">نتيجتك: <span className="font-bold text-secondary">{score}</span> من {chineseGrammarContent.quiz.length}</p>
                    <button onClick={resetQuiz} className="btn bg-secondary text-dark py-3 px-8 rounded-full font-bold transition-transform hover:scale-105">
                        <i className="fas fa-redo mr-2"></i>
                        أعد الاختبار
                    </button>
                </div>
            );
        }
        
        const currentQuestion = chineseGrammarContent.quiz[currentQuestionIndex];
        return (
            <div className="p-6 md:p-8 bg-dark/70 rounded-2xl max-w-3xl mx-auto animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-secondary">اختبر نفسك</h3>
                    <p className="font-mono text-lg">{currentQuestionIndex + 1} / {chineseGrammarContent.quiz.length}</p>
                </div>
                <div className="bg-dark/50 p-6 rounded-lg mb-6 min-h-[100px] flex items-center justify-center">
                    <p className="text-xl text-center font-semibold">{currentQuestion.question}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map(option => {
                        const isCorrect = option === currentQuestion.answer;
                        const isSelected = selectedAnswer === option;
                        let btnClass = "bg-white/10 hover:bg-white/20";
                        if (isAnswered) {
                            if (isCorrect) btnClass = "bg-green-500/50 border-green-400";
                            else if (isSelected) btnClass = "bg-red-500/50 border-red-400";
                            else btnClass = "bg-white/10 opacity-50";
                        }
                        return (
                             <button 
                                key={option} 
                                onClick={() => handleAnswerSelect(option)}
                                disabled={isAnswered}
                                className={`p-4 rounded-lg text-center dir-ltr transition-all duration-300 border-2 border-transparent disabled:cursor-not-allowed ${btnClass} font-medium text-lg`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
                {isAnswered && (
                    <div className="mt-6 text-center animate-fadeIn">
                        <div className={`p-4 rounded-lg mb-4 ${selectedAnswer === currentQuestion.answer ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'}`}>
                            <p className="font-bold">{selectedAnswer === currentQuestion.answer ? 'إجابة صحيحة!' : 'إجابة خاطئة.'}</p>
                            <p className="text-sm">{currentQuestion.explanation}</p>
                        </div>
                        <button onClick={handleNextQuestion} className="btn bg-secondary text-dark py-3 px-8 rounded-full font-bold transition-transform hover:scale-105">
                            {currentQuestionIndex < chineseGrammarContent.quiz.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}
                            <i className="fas fa-arrow-left mr-2"></i>
                        </button>
                    </div>
                )}
            </div>
        );
    };
    
    const renderFlashcardsTab = () => (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {chineseGrammarContent.flashcards.map((card, index) => (
                <div key={index} className="h-56 perspective-1000 cursor-pointer group" onClick={() => setFlippedCardIndex(flippedCardIndex === index ? null : index)}>
                    <div className={`relative w-full h-full preserve-3d transition-transform duration-700 ${flippedCardIndex === index ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
                        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg flex flex-col justify-center items-center p-4 text-center">
                            <h4 className="text-2xl font-bold">{card.front}</h4>
                            <p className="text-sm mt-4 opacity-70 group-hover:opacity-100 transition-opacity"> (انقر للقلب)</p>
                        </div>
                        <div className="absolute w-full h-full backface-hidden bg-light text-dark rounded-xl shadow-lg flex flex-col justify-center items-center p-4 rotate-y-180">
                            <p className="text-center font-semibold text-base">{card.back}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    
    const renderMistakesTab = () => (
        <div className="space-y-4 max-w-3xl mx-auto">
            {chineseGrammarContent.commonMistakes.map((item, index) => (
                <div key={index} className="bg-dark/70 p-5 rounded-xl border border-white/10">
                    <div className="mb-2">
                        <span className="text-red-400 font-bold"><i className="fas fa-times-circle mr-2"></i>خطأ:</span>
                        <p className="bg-red-500/10 p-2 rounded mt-1 dir-ltr text-left text-red-300 font-mono">{item.wrong}</p>
                    </div>
                    <div className="mb-3">
                        <span className="text-green-400 font-bold"><i className="fas fa-check-circle mr-2"></i>صواب:</span>
                        <p className="bg-green-500/10 p-2 rounded mt-1 dir-ltr text-left text-green-300 font-mono">{item.correct}</p>
                    </div>
                     <p className="text-sm text-gray-300"><i className="fas fa-info-circle mr-2 text-secondary"></i>{item.explanation}</p>
                </div>
            ))}
        </div>
    );

    const tabs = [
        { id: 'explanation', label: 'الشرح المفصّل', icon: 'fa-book-open' },
        { id: 'quiz', label: 'اختبر نفسك', icon: 'fa-question-circle' },
        { id: 'flashcards', label: 'بطاقات تعليمية', icon: 'fa-clone' },
        { id: 'mistakes', label: 'أخطاء شائعة', icon: 'fa-exclamation-triangle' },
    ];

    return (
        <div className="p-4 md:p-8 w-full h-full overflow-y-auto" dir="rtl">
            <header className="text-center mb-8 animate-fadeIn">
                <div className="flex justify-center items-center gap-4">
                     <span className="text-6xl">🇨🇳</span>
                    <h1 className="text-4xl font-extrabold text-white">قواعد اللغة الصينية</h1>
                </div>
                <p className="text-lg text-gray-300 mt-2">مرجعك الشامل لإتقان قواعد اللغة الصينية.</p>
            </header>
            
            <div className="sticky top-2 z-20 bg-dark/70 backdrop-blur-sm flex justify-center mb-8 flex-wrap rounded-full p-2 shadow-lg max-w-3xl mx-auto border border-white/10">
                {tabs.map(tab => (
                     <button 
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} 
                        onClick={() => handleTabClick(tab.id)}
                        aria-pressed={activeTab === tab.id}
                    >
                       <i className={`fas ${tab.icon} ml-2 hidden sm:inline-block`}></i> {tab.label}
                    </button>
                ))}
            </div>

            <main className="max-w-7xl mx-auto w-full">
                {activeTab === 'explanation' && renderExplanationTab()}
                {activeTab === 'quiz' && renderQuizTab()}
                {activeTab === 'flashcards' && renderFlashcardsTab()}
                {activeTab === 'mistakes' && renderMistakesTab()}
            </main>
            
            <style>{`
                .tab-btn { padding: 10px 15px; background: none; border: none; cursor: pointer; font-size: 0.9rem; font-weight: 600; color: #fff; border-radius: 50px; transition: all 0.3s ease; flex-grow: 1; text-align: center;}
                @media (min-width: 640px) { .tab-btn { font-size: 1rem; padding: 10px 20px; } }
                .tab-btn:hover { background: rgba(255,255,255,0.1); }
                .tab-btn.active { background: #FFC700; color: #1A113A; box-shadow: 0 2px 10px rgba(255, 199, 0, 0.4); }
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .backface-hidden { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
                .dir-ltr { direction: ltr; }
                .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default ChineseGrammarSection;
