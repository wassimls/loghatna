

import React, { useState, useEffect } from 'react';
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
    ],
    quiz: [
        {
            question: 'ما هو جنس كلمة "машина" (سيارة)؟',
            options: ['مذكر', 'مؤنث', 'محايد'],
            answer: 'مؤنث',
            explanation: 'الكلمات التي تنتهي بـ "-а" تكون عادةً مؤنثة.'
        },
        {
            question: 'كيف تقول "أنا لا أفهم" بالروسية؟',
            options: ['Я говорю', 'Я не понимаю', 'Я работаю', 'Я знаю'],
            answer: 'Я не понимаю',
            explanation: '"Понимаю" تعني "أفهم"، و "не" هي أداة النفي الرئيسية.'
        },
        {
            question: 'اختر الفعل في صيغة الماضي لجملة "Анна ... журнал" (آنا ... مجلة).',
            options: ['читает', 'будет читать', 'читала', 'читать'],
            answer: 'читала',
            explanation: 'بما أن الفاعل "Анна" مؤنث، نستخدم صيغة الماضي المنتهية بـ "-ла".'
        }
    ],
    flashcards: [
        { front: 'Кириллица', back: 'الأبجدية الروسية المكونة من 33 حرفًا.' },
        { front: 'Род (الجنس)', back: 'الأسماء لها جنس: مذكر (ساكن)، مؤنث (-а/-я)، محايد (-о/-е).' },
        { front: 'Падежи (الحالات)', back: 'ست حالات إعرابية تغير نهايات الكلمات حسب وظيفتها في الجملة.' },
        { front: 'Прошедшее время (الماضي)', back: 'يتغير شكل الفعل حسب الجنس والعدد (-л, -ла, -ло, -ли).' },
        { front: 'не', back: 'الكلمة الأساسية للنفي، توضع قبل الكلمة المراد نفيها.' },
        { front: 'Как дела?', back: 'عبارة شائعة تعني "كيف حالك؟"' }
    ],
    commonMistakes: [
        { wrong: 'Я в дом.', correct: 'Я в доме.', explanation: 'بعد حرف الجر "в" (في)، نستخدم حالة المجرور (Prepositional case)، فتتحول "дом" إلى "доме".' },
        { wrong: 'Это мой книга.', correct: 'Это моя книга.', explanation: 'كلمة "книга" (كتاب) مؤنثة، لذا يجب استخدام ضمير الملكية المؤنث "моя".' },
        { wrong: 'Ты хочешь чай?', correct: 'Ты хочешь чаю?', explanation: 'عند عرض جزء من شيء (مثل الشاي)، غالبًا ما تستخدم حالة المضاف إليه الجزئي (Partitive Genitive).' },
    ]
};

const TopicCard: React.FC<{ topic: typeof russianGrammarContent.categories[0]['topics'][0] }> = ({ topic }) => {
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
                            onClick={() => speak(ex.en, 'ru-RU')} 
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

const RussianGrammarSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState('explanation');
    const [expandedCategory, setExpandedCategory] = useState<string | null>(russianGrammarContent.categories[0].category);
    
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
        if (option === russianGrammarContent.quiz[currentQuestionIndex].answer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < russianGrammarContent.quiz.length - 1) {
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
            {russianGrammarContent.categories.map(category => (
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
                    <p className="text-xl mb-6">نتيجتك: <span className="font-bold text-secondary">{score}</span> من {russianGrammarContent.quiz.length}</p>
                    <button onClick={resetQuiz} className="btn bg-secondary text-dark py-3 px-8 rounded-full font-bold transition-transform hover:scale-105">
                        <i className="fas fa-redo mr-2"></i>
                        أعد الاختبار
                    </button>
                </div>
            );
        }
        
        const currentQuestion = russianGrammarContent.quiz[currentQuestionIndex];
        return (
            <div className="p-6 md:p-8 bg-dark/70 rounded-2xl max-w-3xl mx-auto animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-secondary">اختبر نفسك</h3>
                    <p className="font-mono text-lg">{currentQuestionIndex + 1} / {russianGrammarContent.quiz.length}</p>
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
                            {currentQuestionIndex < russianGrammarContent.quiz.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}
                            <i className="fas fa-arrow-left mr-2"></i>
                        </button>
                    </div>
                )}
            </div>
        );
    };
    
    const renderFlashcardsTab = () => (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {russianGrammarContent.flashcards.map((card, index) => (
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
            {russianGrammarContent.commonMistakes.map((item, index) => (
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
                     <span className="text-6xl">🇷🇺</span>
                    <h1 className="text-4xl font-extrabold text-white">قواعد اللغة الروسية</h1>
                </div>
                <p className="text-lg text-gray-300 mt-2">مرجعك الشامل لإتقان قواعد اللغة الروسية.</p>
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

export default RussianGrammarSection;
