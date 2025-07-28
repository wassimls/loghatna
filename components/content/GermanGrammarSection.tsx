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
const germanGrammarContent = {
    categories: [
        {
            category: 'الجنس والأدوات (Genus und Artikel)',
            icon: 'fa-venus-mars',
            topics: [
                {
                    title: 'أدوات التعريف المعرفة (Der, Die, Das)',
                    explanation: 'في اللغة الألمانية، كل اسم له جنس نحوي: مذكر (maskulin)، مؤنث (feminin)، أو محايد (neutral). أداة التعريف "الـ" تتغير بناءً على جنس الاسم وحالته الإعرابية.',
                    rule: 'Maskulin: der, Feminin: die, Neutral: das',
                    examples: [
                        { en: 'der Mann', ar: 'الرجل (مذكر)' },
                        { en: 'die Frau', ar: 'المرأة (مؤنث)' },
                        { en: 'das Kind', ar: 'الطفل (محايد)' },
                    ],
                    tip: 'لا توجد قاعدة صارمة لتحديد جنس الاسم دائمًا، لذا من الأفضل حفظ كل اسم مع أداته.',
                     exercise: {
                        question: 'اختر الأداة الصحيحة لكلمة "Tisch" (طاولة):',
                        options: ['der', 'die', 'das'],
                        correctAnswer: 'der',
                    }
                },
                {
                    title: 'أدوات التعريف النكرة (Ein, Eine)',
                    explanation: 'تستخدم للإشارة إلى اسم غير محدد أو عند ذكره لأول مرة. تتغير أيضًا حسب جنس الاسم.',
                    rule: 'Maskulin/Neutral: ein, Feminin: eine',
                    examples: [
                        { en: 'ein Tisch', ar: 'طاولة (مذكر)' },
                        { en: 'eine Lampe', ar: 'مصباح (مؤنث)' },
                        { en: 'ein Buch', ar: 'كتاب (محايد)' },
                    ],
                    tip: 'في حالة النفي، نستخدم "kein" للمذكر والمحايد، و "keine" للمؤنث والجمع.',
                     exercise: {
                        question: 'اختر الأداة الصحيحة لكلمة "Katze" (قطة):',
                        options: ['ein', 'eine', 'einen'],
                        correctAnswer: 'eine',
                    }
                },
            ]
        },
        {
            category: 'الحالات الإعرابية (Die Fälle)',
            icon: 'fa-sitemap',
            topics: [
                {
                    title: 'حالة الرفع (Nominativ)',
                    explanation: 'تستخدم لفاعل الجملة (الشخص أو الشيء الذي يقوم بالفعل). هذا هو الشكل الأساسي للاسم الذي تجده في القاموس.',
                    rule: 'Wer oder was? (من أو ماذا؟)',
                    examples: [
                        { en: 'Der Hund schläft.', ar: 'الكلبُ ينام. (من ينام؟ الكلب)' },
                        { en: 'Das Auto ist neu.', ar: 'السيارةُ جديدة. (ما هو الجديد؟ السيارة)' },
                    ],
                    tip: 'فاعل الجملة دائمًا في حالة الرفع.',
                     exercise: {
                        question: 'في جملة "Die Frau liest"، كلمة "Die Frau" في أي حالة؟',
                        options: ['Nominativ', 'Akkusativ', 'Dativ'],
                        correctAnswer: 'Nominativ',
                    }
                },
                 {
                    title: 'حالة النصب (Akkusativ)',
                    explanation: 'تستخدم للمفعول به المباشر (الشخص أو الشيء الذي يقع عليه الفعل).',
                    rule: 'Wen oder was? (من أو ماذا؟ - كمفعول به)',
                    examples: [
                        { en: 'Ich sehe den Hund.', ar: 'أنا أرى الكلبَ. (ماذا أرى؟ الكلب)' },
                        { en: 'Sie kauft eine Tasche.', ar: 'هي تشتري حقيبةً.' },
                    ],
                    tip: 'التغيير الأوضح يحدث في الأدوات المذكرة: "der" تصبح "den"، و "ein" تصبح "einen". المؤنث والمحايد لا يتغيران في حالة النصب.',
                    exercise: {
                        question: 'أكمل الجملة: "Ich habe ___ Stift." (قلم)',
                        options: ['ein', 'eine', 'einen'],
                        correctAnswer: 'einen',
                    }
                }
            ]
        },
        {
            category: 'الأفعال وبنية الجملة (Verben und Satzbau)',
            icon: 'fa-bolt',
            topics: [
                {
                    title: 'تصريف الأفعال في المضارع',
                    explanation: 'في الجمل البسيطة، يتم تصريف الفعل ليتناسب مع الفاعل (الضمير).',
                    rule: 'ich (-e), du (-st), er/sie/es (-t), wir (-en), ihr (-t), sie/Sie (-en)',
                    examples: [
                        { en: 'Ich komme aus Ägypten.', ar: 'أنا آتي من مصر.' },
                        { en: 'Du lernst Deutsch.', ar: 'أنت تتعلم الألمانية.' },
                        { en: 'Wir wohnen in Berlin.', ar: 'نحن نسكن في برلين.' },
                    ],
                    tip: 'انتبه للأفعال الشاذة القوية التي يتغير فيها حرف العلة في الجذر مع الضمائر "du" و "er/sie/es" (مثال: ich fahre, du fährst).',
                    exercise: {
                        question: 'اختر التصريف الصحيح للفعل "sprechen" مع "er":',
                        options: ['spreche', 'sprichst', 'spricht', 'sprechen'],
                        correctAnswer: 'spricht',
                    }
                },
                {
                    title: 'الفعل في المرتبة الثانية (Verb-Zweit-Stellung)',
                    explanation: 'في الجمل الخبرية العادية في اللغة الألمانية، الفعل المصرف يأتي دائمًا في المرتبة الثانية.',
                    rule: 'Position 1 | Verb (Position 2) | Rest',
                    examples: [
                        { en: 'Ich lerne heute Deutsch.', ar: 'أنا أتعلم اليوم الألمانية.' },
                        { en: 'Heute lerne ich Deutsch.', ar: 'اليوم أتعلم أنا الألمانية. (الفعل "lerne" بقي في المرتبة الثانية)' },
                    ],
                    tip: 'هذه واحدة من أهم قواعد بناء الجملة في اللغة الألمانية. حتى لو بدأت الجملة بظرف زمان أو مكان، الفعل يبقى ثانيًا.',
                    exercise: {
                        question: 'أي جملة صحيحة نحوياً؟',
                        options: ['Morgen ich gehe ins Kino.', 'Ich gehe morgen ins Kino.', 'Ins Kino ich gehe morgen.'],
                        correctAnswer: 'Ich gehe morgen ins Kino.',
                    }
                }
            ]
        }
    ]
};

type Topic = typeof germanGrammarContent.categories[0]['topics'][0];

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
                        onClick={() => speak(ex.en, 'de-DE')} 
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

interface GermanGrammarSectionProps {
    isSubscribed: boolean;
    onUnlockClick: () => void;
}

const GermanGrammarSection: React.FC<GermanGrammarSectionProps> = ({ isSubscribed, onUnlockClick }) => {
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
        const category = germanGrammarContent.categories.find(c => c.category === selectedCategory);
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
                        const isUnlocked = selectedCategory === germanGrammarContent.categories[0].category && topicIndex === 0;
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
            <h1 className="text-4xl font-extrabold text-white text-center mb-10">قواعد اللغة الألمانية</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {germanGrammarContent.categories.map(category => (
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

export default GermanGrammarSection;