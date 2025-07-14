

import React, { useState, useEffect } from 'react';
import { speak } from '../../services/audioService';

// --- Data for the component ---
const grammarContent = {
    categories: [
        {
            category: 'الأزمنة (Tenses)',
            icon: 'fa-clock',
            topics: [
                {
                    title: 'المضارع البسيط (Present Simple)',
                    explanation: 'يستخدم للتعبير عن الحقائق العامة، العادات، والأحداث المتكررة.',
                    rule: 'Subject + Verb (base form) / Verb-s',
                    examples: [
                        { en: 'I drink coffee every morning.', ar: 'أنا أشرب القهوة كل صباح.' },
                        { en: 'The sun rises in the east.', ar: 'الشمس تشرق من الشرق.' },
                        { en: 'She works as a teacher.', ar: 'هي تعمل كمعلمة.' },
                    ],
                    tip: 'لا تنسَ إضافة -s للفعل مع الضمائر he, she, it.'
                },
                {
                    title: 'المضارع المستمر (Present Continuous)',
                    explanation: 'يستخدم لوصف حدث يقع الآن في لحظة الكلام، أو لخطط مستقبلية مؤكدة.',
                    rule: 'Subject + am/is/are + Verb-ing',
                    examples: [
                        { en: 'I am reading a book now.', ar: 'أنا أقرأ كتاباً الآن.' },
                        { en: 'They are playing football.', ar: 'هم يلعبون كرة القدم.' },
                        { en: 'She is meeting her friends tomorrow.', ar: 'هي ستقابل أصدقائها غداً.' },
                    ],
                    tip: 'بعض الأفعال (مثل know, love, want) لا تستخدم عادةً في صيغة المضارع المستمر.'
                },
                 {
                    title: 'الماضي البسيط (Past Simple)',
                    explanation: 'يستخدم للتعبير عن أحداث بدأت وانتهت في الماضي في وقت محدد.',
                    rule: 'Subject + Verb (past form, -ed)',
                    examples: [
                        { en: 'She visited her grandmother yesterday.', ar: 'هي زارت جدتها أمس.' },
                        { en: 'We watched a movie last night.', ar: 'شاهدنا فيلماً الليلة الماضية.' },
                        { en: 'He went to the library.', ar: 'هو ذهب إلى المكتبة.' },
                    ],
                    tip: 'انتبه للأفعال الشاذة (Irregular Verbs) التي لا تتبع قاعدة -ed مثل go -> went.'
                },
                {
                    title: 'الماضي المستمر (Past Continuous)',
                    explanation: 'يستخدم لوصف حدث كان مستمراً في وقت معين في الماضي، وغالباً ما يقاطعه حدث آخر.',
                    rule: 'Subject + was/were + Verb-ing',
                    examples: [
                        { en: 'I was watching TV when you called.', ar: 'كنت أشاهد التلفاز عندما اتصلت.' },
                        { en: 'They were sleeping at 10 PM.', ar: 'كانوا نائمين الساعة 10 مساءً.' },
                    ],
                    tip: 'يستخدم غالباً مع الماضي البسيط لبيان تزامن حدثين.'
                },
                {
                    title: 'المستقبل البسيط (Future Simple)',
                    explanation: 'يستخدم للتعبير عن قرارات سريعة، وعود، أو تنبؤات مستقبلية غير مؤكدة.',
                    rule: 'Subject + will + Verb (base form)',
                    examples: [
                        { en: 'I will call you later.', ar: 'سأتصل بك لاحقاً.' },
                        { en: 'It will probably rain tomorrow.', ar: 'من المحتمل أن تمطر غداً.' },
                    ],
                    tip: 'يمكن استخدام "be going to" للتعبير عن خطط مستقبلية مؤكدة أو نوايا. (I am going to travel next week)'
                },
                {
                    title: 'المضارع التام (Present Perfect)',
                    explanation: 'يستخدم لوصف حدث وقع في الماضي وله أثر أو صلة بالحاضر، أو حدث بدأ في الماضي ومستمر حتى الآن.',
                    rule: 'Subject + have/has + Past Participle (V3)',
                    examples: [
                        { en: 'I have finished my homework.', ar: 'لقد أنهيت واجبي (الواجب منتهي الآن).' },
                        { en: 'She has lived here for three years.', ar: 'هي تعيش هنا منذ ثلاث سنوات (وما زالت).' },
                    ],
                    tip: 'استخدم "for" للإشارة إلى مدة زمنية (for two years)، و "since" للإشارة إلى نقطة بداية (since 2020).'
                },
            ]
        },
        {
            category: 'أجزاء الكلام (Parts of Speech)',
            icon: 'fa-puzzle-piece',
            topics: [
                {
                    title: 'الأسماء (Nouns)',
                    explanation: 'كلمات تشير إلى أشخاص، أماكن، أشياء، أو أفكار.',
                    rule: 'Countable (book, cat) / Uncountable (water, information)',
                    examples: [
                        { en: 'The "dog" is playing in the "park".', ar: 'الـ "كلب" يلعب في الـ "حديقة".' },
                        { en: 'We need "water" and "food".', ar: 'نحتاج "ماء" و "طعام".' },
                    ],
                    tip: 'الأسماء غير المعدودة (Uncountable) ليس لها صيغة جمع وتعامل معاملة المفرد.'
                },
                {
                    title: 'الأفعال (Verbs)',
                    explanation: 'كلمات تصف حدثاً (action) أو حالة (state).',
                    rule: 'Action (run, eat) / Linking (be, seem)',
                    examples: [
                        { en: 'He "runs" every day.', ar: 'هو "يجري" كل يوم.' },
                        { en: 'She "is" a doctor.', ar: 'هي "تكون" طبيبة.' },
                    ],
                    tip: 'لكل زمن (tense) تصريف مختلف للفعل يجب الانتباه له.'
                },
                {
                    title: 'الصفات (Adjectives)',
                    explanation: 'كلمات تصف الأسماء أو الضمائر.',
                    rule: 'A "beautiful" flower. A "tall" man.',
                    examples: [
                        { en: 'It is a "sunny" day.', ar: 'إنه يوم "مشمس".' },
                        { en: 'The soup is "hot".', ar: 'الحساء "ساخن".' },
                    ],
                    tip: 'في الإنجليزية، الصفة تأتي دائماً قبل الاسم الذي تصفه.'
                },
                {
                    title: 'الظروف (Adverbs)',
                    explanation: 'كلمات تصف الأفعال، الصفات، أو ظروفاً أخرى. تجيب على أسئلة مثل كيف؟ متى؟ أين؟',
                    rule: 'He runs "quickly". She will arrive "soon".',
                    examples: [
                        { en: 'She speaks "slowly".', ar: 'هي تتحدث "ببطء".' },
                        { en: 'I will see you "tomorrow".', ar: 'سأراك "غداً".' },
                    ],
                    tip: 'العديد من الظروف تنتهي بـ "-ly" (e.g., quick -> quickly) ولكن ليس جميعها.'
                },
                 {
                    title: 'أدوات التعريف والتنكير (Articles)',
                    explanation: 'تستخدم لتحديد ما إذا كان الاسم عاماً أم محدداً.',
                    rule: 'a (قبل الساكن), an (قبل المتحرك), the (للتعريف)',
                    examples: [
                        { en: 'I saw "a" cat.', ar: 'رأيت قطة (أي قطة).' },
                        { en: 'The cat was black.', ar: 'القطة كانت سوداء (القطة التي رأيتها).' },
                        { en: 'She is "an" honest person.', ar: 'هي شخص أمين.' },
                    ],
                    tip: 'لا تستخدم أدوات مع الأسماء العامة والجمع (e.g., I like music).'
                },
                {
                    title: ' حروف الجر (Prepositions)',
                    explanation: 'كلمات قصيرة تستخدم لربط الأسماء أو الضمائر بأجزاء أخرى من الجملة، وتوضح العلاقة (مكان، زمان، اتجاه).',
                    rule: 'in, on, at, for, to, from...',
                    examples: [
                        { en: 'The book is "on" the table.', ar: 'الكتاب على الطاولة.' },
                        { en: 'The meeting is "at" 3 PM.', ar: 'الاجتماع الساعة 3 مساءً.' },
                        { en: 'I live "in" Cairo.', ar: 'أنا أعيش في القاهرة.' },
                    ],
                    tip: 'لكل حرف جر استخدامات متعددة، والممارسة هي أفضل طريقة لتعلمها.'
                }
            ]
        },
        {
            category: 'هيكل الجملة (Sentence Structure)',
            icon: 'fa-sitemap',
            topics: [
                {
                    title: 'المبني للمجهول (Passive Voice)',
                    explanation: 'يستخدم للتركيز على المفعول به أو عندما يكون الفاعل غير معروف أو غير مهم.',
                    rule: 'Object + to be (conjugated) + Past Participle (V3)',
                    examples: [
                        { en: 'Active: The boy broke the window.', ar: 'معلوم: الولد كسر النافذة.' },
                        { en: 'Passive: The window was broken by the boy.', ar: 'مجهول: النافذة كُسرت بواسطة الولد.' },
                    ],
                    tip: 'المبني للمجهول شائع جداً في الكتابة الأكاديمية والرسمية.'
                },
                {
                    title: 'الجمل الشرطية (Conditionals)',
                    explanation: 'تستخدم للتعبير عن مواقف افتراضية ونتائجها المحتملة.',
                    rule: 'If-clause (الشرط) + Main clause (جواب الشرط)',
                    examples: [
                        { en: 'If you heat water, it boils.', ar: 'إذا سخنت الماء، فإنه يغلي. (حقيقة)' },
                        { en: 'If I have time, I will help you.', ar: 'إذا كان لدي وقت، سأساعدك. (ممكن)' },
                        { en: 'If I were you, I would apologize.', ar: 'لو كنت مكانك، لاعتذرت. (غير واقعي)' },
                    ],
                    tip: 'انتبه لزمن الفعل في كل جزء من الجملة الشرطية.'
                },
                 {
                    title: 'صيغ المقارنة والتفضيل (Comparatives & Superlatives)',
                    explanation: 'تستخدم لمقارنة شيئين أو أكثر.',
                    rule: 'Comparative: adjective-er / more adjective. Superlative: the adjective-est / the most adjective.',
                    examples: [
                        { en: 'He is "taller" than his brother.', ar: 'هو أطول من أخيه.' },
                        { en: 'This book is "more interesting".', ar: 'هذا الكتاب أكثر إثارة للاهتمام.' },
                        { en: 'She is "the tallest" girl in the class.', ar: 'هي أطول فتاة في الفصل.' },
                    ],
                    tip: 'الصفات القصيرة (مقطع واحد) تأخذ -er/-est. الصفات الطويلة (مقطعين أو أكثر) تأخذ more/most.'
                },
                {
                    title: 'الكلام المنقول (Reported Speech)',
                    explanation: 'يستخدم لنقل ما قاله شخص آخر، ويتطلب غالباً تغيير زمن الفعل.',
                    rule: 'He said, "I am tired." -> He said that he was tired.',
                    examples: [
                        { en: 'Direct: "I will come tomorrow," she said.', ar: 'مباشر: قالت "سآتي غداً".' },
                        { en: 'Reported: She said that she would come the next day.', ar: 'منقول: قالت إنها ستأتي في اليوم التالي.' },
                    ],
                    tip: 'عند نقل الكلام، عادةً ما نعود بزمن الفعل خطوة إلى الوراء (e.g., present -> past).'
                }
            ]
        }
    ],
    quiz: [
        {
            question: 'Which sentence is grammatically correct?',
            options: ['She don\'t like coffee.', 'She doesn\'t like coffee.', 'She not like coffee.', 'She are not like coffee.'],
            answer: 'She doesn\'t like coffee.',
            explanation: 'مع الضمير "She"، نستخدم "doesn\'t" للنفي في زمن المضارع البسيط.'
        },
        {
            question: 'I went to the store ___ some milk.',
            options: ['for buy', 'to buy', 'buying', 'buy'],
            answer: 'to buy',
            explanation: 'نستخدم صيغة المصدر مع "to" للتعبير عن الغرض أو الهدف.'
        },
        {
            question: 'This car is much ___ than the bicycle.',
            options: ['fast', 'more fast', 'faster', 'fastest'],
            answer: 'faster',
            explanation: 'للمقارنة بين شيئين، نستخدم صيغة المقارنة (comparative). الصفة "fast" تصبح "faster".'
        },
        {
            question: 'This book was written ___ a famous author.',
            options: ['by', 'from', 'with', 'of'],
            answer: 'by',
            explanation: 'في المبني للمجهول، نستخدم "by" لتحديد الفاعل الذي قام بالفعل.'
        },
        {
            question: 'If I ___ harder, I would have passed the exam.',
            options: ['study', 'studied', 'had studied', 'would study'],
            answer: 'had studied',
            explanation: 'هذه الجملة الشرطية من النوع الثالث (Third Conditional) وتستخدم الماضي التام (Past Perfect) في جملة الشرط.'
        },
        {
            question: 'I have been waiting for you ___ two hours.',
            options: ['since', 'for', 'at', 'in'],
            answer: 'for',
            explanation: 'نستخدم "for" للإشارة إلى مدة زمنية، بينما "since" تشير إلى نقطة بداية.'
        },
        {
            question: 'My sister enjoys ___ to music.',
            options: ['listen', 'to listening', 'to listen', 'listening'],
            answer: 'listening',
            explanation: 'بعد الفعل "enjoy"، نستخدم صيغة Gerund (verb-ing).'
        },
        {
            question: 'There isn\'t ___ sugar in my coffee.',
            options: ['many', 'much', 'some', 'a lot'],
            answer: 'much',
            explanation: 'نستخدم "much" مع الأسماء غير المعدودة (uncountable) مثل "sugar" في الجمل المنفية.'
        }
    ],
    flashcards: [
        { front: 'Irregular Verbs (الأفعال الشاذة)', back: 'أفعال لا تتبع قاعدة -ed في الماضي. مثال: Go -> Went, Eat -> Ate, See -> Saw' },
        { front: 'Countable vs. Uncountable Nouns', back: 'الأسماء المعدودة لها جمع (book/books)، وغير المعدودة ليس لها جمع (water/information).' },
        { front: 'Gerunds vs. Infinitives', back: 'Gerund (Swimming is fun) يعمل كاسم. Infinitive (I want to swim) يعبر عن الغرض.' },
        { front: 'Phrasal Verbs (الأفعال المركبة)', back: 'فعل + حرف جر يغير المعنى. مثال: look up (يبحث), give up (يستسلم), turn on (يشغل).' },
        { front: 'Modal Verbs (الأفعال المساعدة)', back: 'تستخدم للتعبير عن القدرة، الإمكانية، الإلزام. مثال: can, could, must, should.' },
        { front: 'Reported Speech (الكلام المنقول)', back: 'نقل كلام الآخرين، ويتطلب عادةً تغيير زمن الفعل والضمائر. "I am tired" -> He said he was tired.' },
        { front: 'Prepositions of Time', back: 'At (للوقت المحدد at 5 PM), On (للأيام On Monday), In (للشهور والسنوات In May, In 2023).' },
        { front: 'Zero Conditional', back: 'يستخدم للحقائق العامة. (If + Present Simple, ... Present Simple). مثال: If you heat ice, it melts.' },
    ],
    commonMistakes: [
        { wrong: 'He is good in English.', correct: 'He is good at English.', explanation: 'نستخدم "at" مع المهارات والأنشطة.' },
        { wrong: 'I have 25 years.', correct: 'I am 25 years old.', explanation: 'نستخدم الفعل "to be" للتعبير عن العمر.' },
        { wrong: 'I will call you when I will arrive.', correct: 'I will call you when I arrive.', explanation: 'بعد "when" للحديث عن المستقبل، نستخدم المضارع البسيط.' },
        { wrong: 'Thank you, I enjoyed.', correct: 'Thank you, I enjoyed myself / it.', explanation: 'الفعل "enjoy" يحتاج إلى مفعول به.' },
        { wrong: 'I need an advice.', correct: 'I need some advice.', explanation: 'كلمة "advice" (نصيحة) غير معدودة ولا تأخذ "a/an".' },
        { wrong: 'Everybody are happy.', correct: 'Everybody is happy.', explanation: 'كلمات مثل everybody, someone, nobody تعامل معاملة المفرد.' },
        { wrong: 'This is more better.', correct: 'This is much better.', explanation: 'كلمة "better" هي صيغة المقارنة من "good" ولا تحتاج "more".' },
    ]
};


// --- Sub-components ---

const TopicCard: React.FC<{ topic: typeof grammarContent.categories[0]['topics'][0] }> = ({ topic }) => {
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
                            onClick={() => speak(ex.en, 'en-US')} 
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


const GrammarSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState('explanation');
    const [expandedCategory, setExpandedCategory] = useState<string | null>(grammarContent.categories[0].category);
    
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
        if (option === grammarContent.quiz[currentQuestionIndex].answer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < grammarContent.quiz.length - 1) {
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
            {grammarContent.categories.map(category => (
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
                    <p className="text-xl mb-6">نتيجتك: <span className="font-bold text-secondary">{score}</span> من {grammarContent.quiz.length}</p>
                    <button onClick={resetQuiz} className="btn bg-secondary text-dark py-3 px-8 rounded-full font-bold transition-transform hover:scale-105">
                        <i className="fas fa-redo mr-2"></i>
                        أعد الاختبار
                    </button>
                </div>
            );
        }
        
        const currentQuestion = grammarContent.quiz[currentQuestionIndex];
        return (
            <div className="p-6 md:p-8 bg-dark/70 rounded-2xl max-w-3xl mx-auto animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-secondary">اختبر نفسك</h3>
                    <p className="font-mono text-lg">{currentQuestionIndex + 1} / {grammarContent.quiz.length}</p>
                </div>
                <div className="bg-dark/50 p-6 rounded-lg mb-6 min-h-[100px] flex items-center">
                    <p className="text-xl text-left dir-ltr font-semibold">{currentQuestion.question}</p>
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
                                className={`p-4 rounded-lg text-left dir-ltr transition-all duration-300 border-2 border-transparent disabled:cursor-not-allowed ${btnClass} font-medium text-lg`}
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
                            {currentQuestionIndex < grammarContent.quiz.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}
                            <i className="fas fa-arrow-left mr-2"></i>
                        </button>
                    </div>
                )}
            </div>
        );
    };
    
    const renderFlashcardsTab = () => (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {grammarContent.flashcards.map((card, index) => (
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
            {grammarContent.commonMistakes.map((item, index) => (
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
                <i className="fas fa-spell-check text-6xl text-secondary mb-4"></i>
                <h1 className="text-4xl font-extrabold text-white">مركز القواعد</h1>
                <p className="text-lg text-gray-300 mt-2">مرجعك الشامل لإتقان قواعد اللغة الإنجليزية.</p>
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

export default GrammarSection;
