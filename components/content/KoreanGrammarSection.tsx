

import React, { useState, useEffect } from 'react';
import { speak } from '../../services/audioService';

// --- Data for the component ---
const koreanGrammarContent = {
    categories: [
        {
            category: 'الأساسيات (기초)',
            icon: 'fa-star',
            topics: [
                {
                    title: 'الأبجدية الكورية (한글 - هانغل)',
                    explanation: 'تعتبر هانغل واحدة من أسهل الأبجديات للتعلم. تتكون من حروف ساكنة وحروف علة يتم دمجها لتشكيل مقاطع لفظية.',
                    rule: '14 حرف ساكن أساسي, 10 حروف علة أساسية',
                    examples: [
                        { en: 'ㄱ, ㄴ, ㄷ, ㄹ, ㅁ...', ar: 'الحروف الساكنة' },
                        { en: 'ㅏ, ㅑ, ㅓ, ㅕ, ㅗ...', ar: 'الحروف المتحركة' },
                        { en: '안 (an) + 녕 (nyeong) = 안녕 (annyeong)', ar: 'مرحباً' },
                    ],
                    tip: 'تعلم هانغل أولاً سيجعل قراءة ونطق الكلمات الكورية أسهل بكثير.'
                },
                {
                    title: 'بنية الجملة (SOV)',
                    explanation: 'تتبع اللغة الكورية بنية (فاعل - مفعول به - فعل)، وهذا يختلف عن بنية (فاعل - فعل - مفعول به) في العربية والإنجليزية.',
                    rule: 'Subject - Object - Verb',
                    examples: [
                        { en: '저는 밥을 먹어요. (jeoneun bab-eul meog-eoyo)', ar: 'أنا الأرز آكل. (أنا آكل الأرز)' },
                        { en: '그녀는 책을 읽어요. (geunyeoneun chaeg-eul ilg-eoyo)', ar: 'هي الكتاب تقرأ. (هي تقرأ الكتاب)' },
                    ],
                    tip: 'تذكر دائماً أن الفعل يأتي في نهاية الجملة. هذا هو أهم اختلاف هيكلي يجب التعود عليه.'
                },
                 {
                    title: 'اللاحقات (조사 - Josa)',
                    explanation: 'هي جزيئات صغيرة تضاف إلى نهاية الأسماء لتحديد وظيفتها في الجملة (فاعل، مفعول به، موضوع الحديث، إلخ).',
                    rule: '은/는 (للموضوع), 이/가 (للفاعل), 을/를 (للمفعول به)',
                    examples: [
                        { en: '사과가 맛있어요. (sagwa-ga masisseoyo)', ar: 'التفاح لذيذ. (가: فاعل)' },
                        { en: '저는 사과를 먹어요. (jeoneun sagwa-reul meogeoyo)', ar: 'أنا آكل التفاح. (를: مفعول به)' },
                    ],
                    tip: 'اختيار اللاحقة (مثلاً 은 أو 는) يعتمد على ما إذا كانت الكلمة التي تسبقها تنتهي بحرف ساكن أو علة.'
                },
            ]
        },
        {
            category: 'الأفعال والصفات (동사와 형용사)',
            icon: 'fa-bolt',
            topics: [
                {
                    title: 'تصريف الأفعال والصفات',
                    explanation: 'في الكورية، يتم تصريف الأفعال والصفات بنفس الطريقة. يتم حذف النهاية "다" من المصدر وإضافة النهايات المناسبة.',
                    rule: 'مستوى الاحترام غير الرسمي: -아요 / -어요',
                    examples: [
                        { en: '가다 (gada) -> 가요 (gayo)', ar: 'يذهب -> أذهب/تذهب/يذهب' },
                        { en: '먹다 (meokda) -> 먹어요 (meogeoyo)', ar: 'يأكل -> آكل/تأكل/يأكل' },
                        { en: '예쁘다 (yeppeuda) -> 예뻐요 (yeppeoyo)', ar: 'جميل -> جميلة هي' },
                    ],
                    tip: 'اختيار -아요 أو -어요 يعتمد على آخر حرف علة في جذر الفعل.'
                },
                {
                    title: 'مستويات الاحترام (존댓말)',
                    explanation: 'تستخدم نهايات أفعال مختلفة بناءً على عمر ومكانة الشخص الذي تتحدث معه. هذا جانب مهم جداً من الثقافة الكورية.',
                    rule: 'غير رسمي (반말) / رسمي مهذب (존댓말)',
                    examples: [
                        { en: '고마워 (gomawo)', ar: 'شكراً (للأصدقاء)' },
                        { en: '고맙습니다 (gomapseumnida)', ar: 'شكراً (بشكل رسمي جداً)' },
                    ],
                    tip: 'عندما تكون في شك، استخدم دائمًا الصيغة الرسمية المهذبة (المنتهية بـ -요 أو -ㅂ니다).'
                },
            ]
        }
    ],
    quiz: [
        {
            question: 'ما هي بنية الجملة الأساسية في اللغة الكورية؟',
            options: ['فاعل - فعل - مفعول به (SVO)', 'فعل - فاعل - مفعول به (VSO)', 'فاعل - مفعول به - فعل (SOV)'],
            answer: 'فاعل - مفعول به - فعل (SOV)',
            explanation: 'على عكس الإنجليزية والعربية، الفعل يأتي دائماً في نهاية الجملة الكورية.'
        },
        {
            question: 'أي لاحقة تستخدم لتحديد المفعول به؟',
            options: ['은/는', '이/가', '을/를', '에/에서'],
            answer: '을/를',
            explanation: 'اللاحقة 을/를 تُضاف إلى نهاية الاسم لتمييزه كمفعول به في الجملة.'
        },
        {
            question: 'كيف تقول "مرحباً" بالطريقة الأكثر شيوعاً ورسمية؟',
            options: ['안녕', '여보세요', '안녕하세요', '반가워요'],
            answer: '안녕하세요',
            explanation: '"안녕하세요" هي التحية القياسية المهذبة التي يمكن استخدامها في معظم المواقف.'
        }
    ],
    flashcards: [
        { front: 'SOV Structure', back: 'بنية الجملة: فاعل - مفعول به - فعل. الفعل يأتي في النهاية.' },
        { front: 'اللاحقات (조사)', back: 'جزيئات تضاف للأسماء لتحديد وظيفتها (은/는 للموضوع, 이/가 للفاعل, 을/를 للمفعول به).' },
        { front: 'تصريف -아요/어요', back: 'النهاية الأكثر شيوعاً للأفعال والصفات في صيغة المضارع المهذب غير الرسمي.' },
        { front: 'مستويات الاحترام', back: 'استخدام نهايات مختلفة للأفعال بناءً على الشخص الذي تتحدث إليه.' },
        { front: '이다', back: 'الفعل "يكون". يصرف إلى 예요/이에요 في المضارع.' },
    ],
    commonMistakes: [
        { wrong: '나은/는 학생입니다.', correct: '나는 학생입니다.', explanation: 'عندما يتحدث الشخص عن نفسه كموضوع للجملة، يستخدم "저는" أو "나는" وليس "제가".' },
        { wrong: '사과를 좋아하다.', correct: '사과를 좋아해요.', explanation: 'يجب دائماً تصريف الأفعال والصفات في نهاية الجملة وعدم تركها في صيغة المصدر (المنتهية بـ 다).' },
        { wrong: '어디 가?', correct: '어디에 가요?', explanation: 'في اللغة الرسمية المهذبة، من الأفضل استخدام لاحقة المكان "에" مع الفعل "가다" (يذهب).' },
    ]
};

const TopicCard: React.FC<{ topic: typeof koreanGrammarContent.categories[0]['topics'][0] }> = ({ topic }) => {
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
                            onClick={() => speak(ex.en, 'ko-KR')} 
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

const KoreanGrammarSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState('explanation');
    const [expandedCategory, setExpandedCategory] = useState<string | null>(koreanGrammarContent.categories[0].category);
    
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
        if (option === koreanGrammarContent.quiz[currentQuestionIndex].answer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < koreanGrammarContent.quiz.length - 1) {
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
            {koreanGrammarContent.categories.map(category => (
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
                    <p className="text-xl mb-6">نتيجتك: <span className="font-bold text-secondary">{score}</span> من {koreanGrammarContent.quiz.length}</p>
                    <button onClick={resetQuiz} className="btn bg-secondary text-dark py-3 px-8 rounded-full font-bold transition-transform hover:scale-105">
                        <i className="fas fa-redo mr-2"></i>
                        أعد الاختبار
                    </button>
                </div>
            );
        }
        
        const currentQuestion = koreanGrammarContent.quiz[currentQuestionIndex];
        return (
            <div className="p-6 md:p-8 bg-dark/70 rounded-2xl max-w-3xl mx-auto animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-secondary">اختبر نفسك</h3>
                    <p className="font-mono text-lg">{currentQuestionIndex + 1} / {koreanGrammarContent.quiz.length}</p>
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
                                className={`p-4 rounded-lg text-center dir-rtl transition-all duration-300 border-2 border-transparent disabled:cursor-not-allowed ${btnClass} font-medium text-lg`}
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
                            {currentQuestionIndex < koreanGrammarContent.quiz.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}
                            <i className="fas fa-arrow-left mr-2"></i>
                        </button>
                    </div>
                )}
            </div>
        );
    };
    
    const renderFlashcardsTab = () => (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {koreanGrammarContent.flashcards.map((card, index) => (
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
            {koreanGrammarContent.commonMistakes.map((item, index) => (
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
                     <span className="text-6xl">🇰🇷</span>
                    <h1 className="text-4xl font-extrabold text-white">قواعد اللغة الكورية</h1>
                </div>
                <p className="text-lg text-gray-300 mt-2">مرجعك الشامل لإتقان قواعد اللغة الكورية.</p>
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

export default KoreanGrammarSection;
