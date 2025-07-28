import React, { useState } from 'react';
import { speak } from '../../services/audioService';
import * as soundService from '../../services/soundService';

// --- Exercise Component ---
const Exercise: React.FC<{
    question: string;
    options: string[];
    correctAnswer: string;
}> = ({ question, options, correctAnswer }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const handleOptionClick = (option: string) => {
        if (selectedOption) return;
        setSelectedOption(option);
        if (option === correctAnswer) {
            setFeedback('correct');
            soundService.playCorrectSound();
        } else {
            setFeedback('incorrect');
            soundService.playIncorrectSound();
        }
    };

    const resetExercise = () => {
        setSelectedOption(null);
        setFeedback(null);
        soundService.playGenericClick();
    };

    const getOptionClass = (option: string) => {
        if (!selectedOption) {
            return 'bg-dark/70 hover:bg-primary/70';
        }
        if (option === correctAnswer) {
            return 'bg-green-500/80';
        }
        if (option === selectedOption && option !== correctAnswer) {
            return 'bg-red-500/80';
        }
        return 'bg-dark/50 opacity-60';
    };

    return (
        <div className="mt-8 pt-6 border-t-2 border-dashed border-white/10">
            <h4 className="text-xl font-bold text-secondary mb-4 text-center">
                <i className="fas fa-question-circle mr-2"></i>
                اختبر فهمك
            </h4>
            <div className="bg-dark/70 p-6 rounded-lg text-center mb-4">
                <p className="text-lg text-white font-semibold dir-ltr">{question}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        disabled={!!selectedOption}
                        className={`p-4 rounded-lg text-white font-bold transition-colors duration-300 ${getOptionClass(option)}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {selectedOption && (
                <div className="text-center mt-4">
                    <button onClick={resetExercise} className="btn bg-secondary text-dark py-2 px-6 rounded-full font-bold">
                        <i className="fas fa-sync-alt mr-2"></i>
                        حاول مرة أخرى
                    </button>
                </div>
            )}
        </div>
    );
};


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
                    tip: 'إتقان الانسجام الصوتي هو مفتاح التحدث باللغة التركية بشكل طبيعي وصحيح.',
                    exercise: {
                        question: 'أي لاحقة جمع تناسب كلمة "araba" (سيارة)؟',
                        options: ['-ler', '-lar'],
                        correctAnswer: '-lar',
                    }
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
                    tip: 'فهم وظيفة كل لاحقة يساعدك على تفكيك وفهم الكلمات الطويلة والمعقدة.',
                     exercise: {
                        question: 'ما هو جذر كلمة "kitaplarım" (كتبي)؟',
                        options: ['kitaplar', 'kitap', 'larım', 'kitapları'],
                        correctAnswer: 'kitap',
                    }
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
                    tip: 'عند استخدام أرقام مع الأسماء، لا يتم استخدام لاحقة الجمع. مثال: "üç kitap" (ثلاثة كتب) وليس "üç kitaplar".',
                     exercise: {
                        question: 'كيف تقول "ثلاثة رجال" بالتركية؟',
                        options: ['üç adamlar', 'üç adam', 'üç adams'],
                        correctAnswer: 'üç adam',
                    }
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
                    tip: 'انتبه لتغير الحرف الساكن الأخير (k, t, ç, p) عند إضافة لاحقة تبدأ بحرف علة.',
                    exercise: {
                        question: 'اختر اللاحقة الصحيحة: "Ben İstanbul___ yaşıyorum." (أنا أعيش في اسطنبول)',
                        options: ['-a', '-dan', '-ı', '-da'],
                        correctAnswer: '-da',
                    }
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
                    tip: 'الفعل في المصدر ينتهي بـ -mak أو -mek. نحذفها قبل إضافة لاحقة الزمن.',
                     exercise: {
                        question: 'كيف تقول "أنت تأتي" بالتركية؟',
                        options: ['geliyorum', 'geliyor', 'geliyorsun', 'geliyoruz'],
                        correctAnswer: 'geliyorsun',
                    }
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
                    tip: 'انتبه لقاعدة "fıstıkçı şahap" حيث تتحول d إلى t بعد الحروف الساكنة (f, s, t, k, ç, ş, h, p).',
                     exercise: {
                        question: 'ما هو تصريف الفعل "yapmak" (يفعل) في الماضي مع "onlar" (هم)؟',
                        options: ['yaptı', 'yaptım', 'yaptılar', 'yaptık'],
                        correctAnswer: 'yaptılar',
                    }
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
                    tip: 'حرف "k" في اللاحقة يخفف إلى "ğ" عندما يليه حرف علة في ضمائر "أنا" و "نحن".',
                     exercise: {
                        question: 'كيف تقول "سوف تذهب" (أنت)؟',
                        options: ['gideceğim', 'gidecek', 'gideceksin', 'gideceğiz'],
                        correctAnswer: 'gideceksin',
                    }
                },
            ]
        }
    ]
};

type Topic = typeof turkishGrammarContent.categories[0]['topics'][0];

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
                        onClick={() => speak(ex.en, 'tr-TR')} 
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
        
        {topic.exercise && (
            <Exercise
                question={topic.exercise.question}
                options={topic.exercise.options}
                correctAnswer={topic.exercise.correctAnswer}
            />
        )}
    </div>
);

interface TurkishGrammarSectionProps {
    isSubscribed: boolean;
    onUnlockClick: () => void;
}

const TurkishGrammarSection: React.FC<TurkishGrammarSectionProps> = ({ isSubscribed, onUnlockClick }) => {
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
        const category = turkishGrammarContent.categories.find(c => c.category === selectedCategory);
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
                        const isUnlocked = selectedCategory === turkishGrammarContent.categories[0].category && topicIndex === 0;
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
            <h1 className="text-4xl font-extrabold text-white text-center mb-10">قواعد اللغة التركية</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {turkishGrammarContent.categories.map(category => (
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

export default TurkishGrammarSection;