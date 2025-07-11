

import React, { useState, useEffect } from 'react';
import { speak } from '../../services/audioService';

// --- Data for the component ---
const turkishGrammarContent = {
    categories: [
        {
            category: 'الأساسيات (Temel Bilgiler)',
            icon: 'fa-star',
            topics: [
                {
                    title: 'الأبجدية والانسجام الصوتي (Alfabe ve Ses Uyumu)',
                    explanation: 'تستخدم اللغة التركية الأبجدية اللاتينية مع بعض الحروف الخاصة (ç, ş, ğ, ı, ö, ü). أهم قاعدة هي "الانسجام الصوتي"، حيث تتبع حروف العلة في اللواحق آخر حرف علة في الكلمة. حروف العلة الخلفية (a, ı, o, u) تتبعها لواحق بها حروف خلفية، والأمامية (e, i, ö, ü) تتبعها لواحق بها حروف أمامية.',
                    rule: 'Kalın Ünlüler (خلفية): a, ı, o, u | İnce Ünlüler (أمامية): e, i, ö, ü',
                    examples: [
                        { en: 'ev-ler (منازل)', ar: 'ev (e أمامي) -> ler (e أمامي)' },
                        { en: 'okul-da (في المدرسة)', ar: 'okul (u خلفي) -> da (a خلفي)' },
                        { en: 'göz-lük (نظارات)', ar: 'göz (ö أمامي) -> lük (ü أمامي)' },
                    ],
                    tip: 'إتقان الانسجام الصوتي هو مفتاح التحدث باللغة التركية بشكل طبيعي وصحيح.'
                },
                {
                    title: 'الإلصاق (Ekler - Agglutination)',
                    explanation: 'اللغة التركية لغة إلصاقية. هذا يعني أن المعاني الجديدة والقواعد النحوية يتم التعبير عنها عن طريق إضافة لواحق إلى جذر الكلمة.',
                    rule: 'Kök (جذر) + Ek (لاحقة) + Ek (لاحقة)...',
                    examples: [
                        { en: 'göz (عين)', ar: 'الجذر' },
                        { en: 'göz-lük (نظارات)', ar: 'لاحقة الشيء' },
                        { en: 'gözlük-çü (بائع نظارات)', ar: 'لاحقة المهنة' },
                        { en: 'gözlükçü-lük (مهنة بيع النظارات)', ar: 'لاحقة اسم المهنة' },
                    ],
                    tip: 'فهم وظيفة كل لاحقة يساعدك على تفكيك وفهم الكلمات الطويلة والمعقدة.'
                },
            ]
        },
        {
            category: 'الأسماء وحالات الإعراب (İsimler ve Durum Ekleri)',
            icon: 'fa-sitemap',
            topics: [
                {
                    title: 'الجمع (Çoğul Eki)',
                    explanation: 'لجعل الاسم جمعاً في اللغة التركية، نضيف اللاحقة -lar أو -ler بناءً على الانسجام الصوتي.',
                    rule: '-lar (بعد a, ı, o, u) / -ler (بعد e, i, ö, ü)',
                    examples: [
                        { en: 'kitap -> kitaplar', ar: 'كتاب -> كتب' },
                        { en: 'araba -> arabalar', ar: 'سيارة -> سيارات' },
                        { en: 'ev -> evler', ar: 'منزل -> منازل' },
                        { en: 'göz -> gözler', ar: 'عين -> عيون' },
                    ],
                    tip: 'عند استخدام أرقام مع الأسماء، لا يتم استخدام لاحقة الجمع. مثال: "üç kitap" (ثلاثة كتب) وليس "üç kitaplar".'
                },
                {
                    title: 'حالات الأسماء (İsmin Hâlleri)',
                    explanation: 'تُضاف لواحق إلى الأسماء لتحديد وظيفتها في الجملة (مثل المفعول به، المكان، الاتجاه).',
                    rule: 'Belirtme (-ı/i/u/ü), Yönelme (-a/e), Bulunma (-da/de), Ayrılma (-dan/den)',
                    examples: [
                        { en: 'Okul-a gidiyorum.', ar: 'أذهب إلى المدرسة. (-a: إلى)' },
                        { en: 'Ev-deyim.', ar: 'أنا في المنزل. (-de: في)' },
                        { en: 'Kitab-ı okudum.', ar: 'قرأتُ الكتاب. (-ı: المفعول به المحدد)' },
                        { en: 'Okul-dan geliyorum.', ar: 'أنا قادم من المدرسة. (-dan: من)' },
                    ],
                    tip: 'انتبه لتغير الحرف الساكن الأخير (k, t, ç, p) عند إضافة لاحقة تبدأ بحرف علة.'
                }
            ]
        },
        {
            category: 'الأفعال والأزمنة (Fiiller ve Zamanlar)',
            icon: 'fa-clock',
            topics: [
                {
                    title: 'المضارع المستمر (Şimdiki Zaman)',
                    explanation: 'يستخدم للتعبير عن حدث يقع الآن أو عادة مستمرة. تتميز باللاحقة "-yor".',
                    rule: 'Fiil kökü + -(ı/i/u/ü)yor + Şahıs eki',
                    examples: [
                        { en: 'Ben gidiyorum.', ar: 'أنا ذاهب.' },
                        { en: 'O okuyor.', ar: 'هو يقرأ.' },
                        { en: 'Biz çalışıyoruz.', ar: 'نحن نعمل.' },
                    ],
                    tip: 'الفعل في المصدر ينتهي بـ -mak أو -mek. نحذفها قبل إضافة لاحقة الزمن.'
                },
                {
                    title: 'الماضي المعرف (Geçmiş Zaman)',
                    explanation: 'يستخدم للتعبير عن أحداث وقعت وانتهت في الماضي وكان المتحدث شاهداً عليها.',
                    rule: 'Fiil kökü + -dı/di/du/dü + Şahıs eki',
                    examples: [
                        { en: 'Ben geldim.', ar: 'أنا أتيت.' },
                        { en: 'O gördü.', ar: 'هو رأى.' },
                        { en: 'Biz konuştuk.', ar: 'نحن تحدثنا.' },
                    ],
                    tip: 'انتبه لقاعدة "fıstıkçı şahap" حيث تتحول d إلى t بعد الحروف الساكنة (f, s, t, k, ç, ş, h, p).'
                },
                 {
                    title: 'المستقبل (Gelecek Zaman)',
                    explanation: 'يستخدم للتعبير عن أحداث ستقع في المستقبل.',
                    rule: 'Fiil kökü + -acak/ecek + Şahıs eki',
                    examples: [
                        { en: 'Ben yapacağım.', ar: 'سوف أفعل.' },
                        { en: 'O gelecek.', ar: 'هو سيأتي.' },
                        { en: 'Biz göreceğiz.', ar: 'سوف نرى.' },
                    ],
                    tip: 'حرف "k" في اللاحقة يخفف إلى "ğ" عندما يليه حرف علة في ضمائر "أنا" و "نحن".'
                },
            ]
        }
    ],
    quiz: [
        {
            question: 'ما هو الجمع الصحيح لكلمة "araba" (سيارة)؟',
            options: ['arabaler', 'arabalar', 'araba-ler', 'araba-lar'],
            answer: 'arabalar',
            explanation: 'كلمة "araba" تنتهي بحرف علة خلفي (a)، لذا نستخدم لاحقة الجمع "-lar".'
        },
        {
            question: 'أكمل الجملة: Ben Türkçe ___.',
            options: ['öğreniyor', 'öğreniyorsun', 'öğreniyorum', 'öğreniyorlar'],
            answer: 'öğreniyorum',
            explanation: 'مع الضمير "Ben" (أنا) في المضارع المستمر، تكون نهاية الفعل "-yorum".'
        },
        {
            question: 'كيف تقول "إلى المنزل" بالتركية؟',
            options: ['evde', 'evden', 'eve', 'evi'],
            answer: 'eve',
            explanation: 'لاحقة الاتجاه "إلى" هي "-e" أو "-a". بما أن "ev" تنتهي بحرف علة أمامي، نستخدم "-e".'
        }
    ],
    flashcards: [
        { front: '-lar / -ler', back: 'لاحقة الجمع. تعتمد على الانسجام الصوتي.' },
        { front: '-(ı)yor', back: 'لاحقة المضارع المستمر. (الآن)' },
        { front: '-acak / -ecek', back: 'لاحقة المستقبل. (سوف)' },
        { front: '-da / -de', back: 'لاحقة المكان "في".' },
        { front: '-a / -e', back: 'لاحقة الاتجاه "إلى".' },
        { front: 'Ses Uyumu', back: 'الانسجام الصوتي: قاعدة أساسية تتغير فيها اللواحق لتتناغم مع آخر حرف علة في الكلمة.' }
    ],
    commonMistakes: [
        { wrong: 'Ben gitmek.', correct: 'Ben gidiyorum.', explanation: 'يجب دائماً تصريف الفعل حسب الزمن والضمير، لا يمكن استخدام المصدر مباشرة.' },
        { wrong: 'Okulda gidiyorum.', correct: 'Okula gidiyorum.', explanation: 'للتعبير عن الاتجاه "إلى"، نستخدم اللاحقة "-a/e". اللاحقة "-da/de" تعني "في".' },
        { wrong: 'Kitapler okuyorum.', correct: 'Kitaplar okuyorum.', explanation: 'خطأ في الانسجام الصوتي. "kitap" تنتهي بحرف خلفي (a) فتأخذ اللاحقة "-lar".' },
    ]
};


const TopicCard: React.FC<{ topic: typeof turkishGrammarContent.categories[0]['topics'][0] }> = ({ topic }) => {
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
                            onClick={() => speak(ex.en, 'tr-TR')} 
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

const TurkishGrammarSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState('explanation');
    const [expandedCategory, setExpandedCategory] = useState<string | null>(turkishGrammarContent.categories[0].category);
    
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
        if (option === turkishGrammarContent.quiz[currentQuestionIndex].answer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < turkishGrammarContent.quiz.length - 1) {
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
            {turkishGrammarContent.categories.map(category => (
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
                    <p className="text-xl mb-6">نتيجتك: <span className="font-bold text-secondary">{score}</span> من {turkishGrammarContent.quiz.length}</p>
                    <button onClick={resetQuiz} className="btn bg-secondary text-dark py-3 px-8 rounded-full font-bold transition-transform hover:scale-105">
                        <i className="fas fa-redo mr-2"></i>
                        أعد الاختبار
                    </button>
                </div>
            );
        }
        
        const currentQuestion = turkishGrammarContent.quiz[currentQuestionIndex];
        return (
            <div className="p-6 md:p-8 bg-dark/70 rounded-2xl max-w-3xl mx-auto animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-secondary">اختبر نفسك</h3>
                    <p className="font-mono text-lg">{currentQuestionIndex + 1} / {turkishGrammarContent.quiz.length}</p>
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
                            {currentQuestionIndex < turkishGrammarContent.quiz.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}
                            <i className="fas fa-arrow-left mr-2"></i>
                        </button>
                    </div>
                )}
            </div>
        );
    };
    
    const renderFlashcardsTab = () => (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {turkishGrammarContent.flashcards.map((card, index) => (
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
            {turkishGrammarContent.commonMistakes.map((item, index) => (
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
                     <span className="text-6xl">🇹🇷</span>
                    <h1 className="text-4xl font-extrabold text-white">قواعد اللغة التركية</h1>
                </div>
                <p className="text-lg text-gray-300 mt-2">مرجعك الشامل لإتقان قواعد اللغة التركية.</p>
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

export default TurkishGrammarSection;
