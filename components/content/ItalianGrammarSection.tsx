

import React, { useState, useEffect } from 'react';
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
    ],
    quiz: [
        {
            question: 'أي أداة تعريف صحيحة لكلمة "studente" (طالب)؟',
            options: ['il', 'la', 'lo', 'l\''],
            answer: 'lo',
            explanation: 'كلمة "studente" مذكرة وتبدأ بـ s + ساكن، لذا نستخدم "lo".'
        },
        {
            question: 'أكمل الجملة: Io ___ fame.',
            options: ['sono', 'ho', 'vado', 'faccio'],
            answer: 'ho',
            explanation: 'في الإيطالية، نستخدم فعل "avere" (يملك) للتعبير عن الجوع. "Ho fame" تعني "أنا جائع".'
        },
        {
            question: 'ما هو الماضي الصحيح لجملة "Maria va a Roma"؟',
            options: ['Maria è andata a Roma.', 'Maria ha andato a Roma.', 'Maria andava a Roma.', 'Maria andrà a Roma.'],
            answer: 'Maria è andata a Roma.',
            explanation: 'الفعل "andare" (يذهب) هو فعل حركة ويستخدم المساعد "essere" في الماضي القريب.'
        }
    ],
    flashcards: [
        { front: 'il, lo, la, l\', i, gli, le', back: 'أدوات التعريف المعرفة (الـ). تُستخدم مع الأسماء المحددة.' },
        { front: 'un, uno, una, un\'', back: 'أدوات التعريف النكرة. تُستخدم مع الأسماء غير المحددة.' },
        { front: 'Passato Prossimo', back: 'الزمن الماضي الرئيسي. يتكون من (avere/essere) + اسم المفعول.' },
        { front: 'Futuro Semplice', back: 'زمن المستقبل. يتكون من جذر الفعل + النهايات.' },
        { front: 'non', back: 'الكلمة الأساسية للنفي، توضع قبل الفعل.' },
        { front: 'الصفة بعد الاسم', back: 'القاعدة العامة في الإيطالية هي أن الصفة تأتي بعد الاسم الذي تصفه (macchina rossa).' }
    ],
    commonMistakes: [
        { wrong: 'Sono caldo.', correct: 'Ho caldo.', explanation: 'نستخدم فعل "avere" (يملك) للتعبير عن الشعور بالحر أو البرد.' },
        { wrong: 'È una blu macchina.', correct: 'È una macchina blu.', explanation: 'القاعدة العامة هي أن صفات الألوان تأتي بعد الاسم الذي تصفه.' },
        { wrong: 'Mi piace calcio.', correct: 'Mi piace il calcio.', explanation: 'بعد "Mi piace"، الأسماء تحتاج عادةً إلى أداة تعريف.' },
        { wrong: 'Io ho 20 anni.', correct: 'Ho 20 anni.', explanation: 'في الإيطالية، ليس من الضروري دائماً ذكر ضمير الفاعل (io, tu) لأن تصريف الفعل يوضحه.' },
    ]
};

const TopicCard: React.FC<{ topic: typeof italianGrammarContent.categories[0]['topics'][0] }> = ({ topic }) => {
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
                            onClick={() => speak(ex.en, 'it-IT')} 
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

const ItalianGrammarSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState('explanation');
    const [expandedCategory, setExpandedCategory] = useState<string | null>(italianGrammarContent.categories[0].category);
    
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
        if (option === italianGrammarContent.quiz[currentQuestionIndex].answer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < italianGrammarContent.quiz.length - 1) {
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
            {italianGrammarContent.categories.map(category => (
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
                    <p className="text-xl mb-6">نتيجتك: <span className="font-bold text-secondary">{score}</span> من {italianGrammarContent.quiz.length}</p>
                    <button onClick={resetQuiz} className="btn bg-secondary text-dark py-3 px-8 rounded-full font-bold transition-transform hover:scale-105">
                        <i className="fas fa-redo mr-2"></i>
                        أعد الاختبار
                    </button>
                </div>
            );
        }
        
        const currentQuestion = italianGrammarContent.quiz[currentQuestionIndex];
        return (
            <div className="p-6 md:p-8 bg-dark/70 rounded-2xl max-w-3xl mx-auto animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-secondary">اختبر نفسك</h3>
                    <p className="font-mono text-lg">{currentQuestionIndex + 1} / {italianGrammarContent.quiz.length}</p>
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
                            {currentQuestionIndex < italianGrammarContent.quiz.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}
                            <i className="fas fa-arrow-left mr-2"></i>
                        </button>
                    </div>
                )}
            </div>
        );
    };
    
    const renderFlashcardsTab = () => (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {italianGrammarContent.flashcards.map((card, index) => (
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
            {italianGrammarContent.commonMistakes.map((item, index) => (
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
                     <span className="text-6xl">🇮🇹</span>
                    <h1 className="text-4xl font-extrabold text-white">قواعد اللغة الإيطالية</h1>
                </div>
                <p className="text-lg text-gray-300 mt-2">مرجعك الشامل لإتقان قواعد اللغة الإيطالية.</p>
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

export default ItalianGrammarSection;
