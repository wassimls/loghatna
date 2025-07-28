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
                    tip: 'لا تنسَ إضافة -s للفعل مع الضمائر he, she, it.',
                     exercise: {
                        question: 'She ___ coffee every morning.',
                        options: ['drink', 'drinks', 'is drinking', 'drank'],
                        correctAnswer: 'drinks',
                    }
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
                    tip: 'بعض الأفعال (مثل know, love, want) لا تستخدم عادةً في صيغة المضارع المستمر.',
                     exercise: {
                        question: 'Look! The dog ___ in the garden.',
                        options: ['play', 'plays', 'is playing', 'played'],
                        correctAnswer: 'is playing',
                    }
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
                    tip: 'انتبه للأفعال الشاذة (Irregular Verbs) التي لا تتبع قاعدة -ed مثل go -> went.',
                    exercise: {
                        question: 'We ___ to the cinema last weekend.',
                        options: ['go', 'goes', 'went', 'are going'],
                        correctAnswer: 'went',
                    }
                },
                {
                    title: 'الماضي المستمر (Past Continuous)',
                    explanation: 'يستخدم لوصف حدث كان مستمراً في وقت معين في الماضي، وغالباً ما يقاطعه حدث آخر.',
                    rule: 'Subject + was/were + Verb-ing',
                    examples: [
                        { en: 'I was watching TV when you called.', ar: 'كنت أشاهد التلفاز عندما اتصلت.' },
                        { en: 'They were sleeping at 10 PM.', ar: 'كانوا نائمين الساعة 10 مساءً.' },
                    ],
                    tip: 'يستخدم غالباً مع الماضي البسيط لبيان تزامن حدثين.',
                     exercise: {
                        question: 'She was cooking when the phone ___.',
                        options: ['ring', 'rang', 'is ringing', 'rings'],
                        correctAnswer: 'rang',
                    }
                },
                {
                    title: 'المستقبل البسيط (Future Simple)',
                    explanation: 'يستخدم للتعبير عن قرارات سريعة، وعود، أو تنبؤات مستقبلية غير مؤكدة.',
                    rule: 'Subject + will + Verb (base form)',
                    examples: [
                        { en: 'I will call you later.', ar: 'سأتصل بك لاحقاً.' },
                        { en: 'It will probably rain tomorrow.', ar: 'من المحتمل أن تمطر غداً.' },
                    ],
                    tip: 'يمكن استخدام "be going to" للتعبير عن خطط مستقبلية مؤكدة أو نوايا. (I am going to travel next week)',
                    exercise: {
                        question: 'I think it ___ rain tomorrow.',
                        options: ['will', 'is', 'goes', 'are'],
                        correctAnswer: 'will',
                    }
                },
                {
                    title: 'المضارع التام (Present Perfect)',
                    explanation: 'يستخدم لوصف حدث وقع في الماضي وله أثر أو صلة بالحاضر، أو حدث بدأ في الماضي ومستمر حتى الآن.',
                    rule: 'Subject + have/has + Past Participle (V3)',
                    examples: [
                        { en: 'I have finished my homework.', ar: 'لقد أنهيت واجبي (الواجب منتهي الآن).' },
                        { en: 'She has lived here for three years.', ar: 'هي تعيش هنا منذ ثلاث سنوات (وما زالت).' },
                    ],
                    tip: 'استخدم "for" للإشارة إلى مدة زمنية (for two years)، و "since" للإشارة إلى نقطة بداية (since 2020).',
                     exercise: {
                        question: 'He ___ never been to Japan.',
                        options: ['has', 'have', 'is', 'was'],
                        correctAnswer: 'has',
                    }
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
                    tip: 'الأسماء غير المعدودة (Uncountable) ليس لها صيغة جمع وتعامل معاملة المفرد.',
                     exercise: {
                        question: 'Which of the following is an uncountable noun?',
                        options: ['apple', 'chair', 'information', 'car'],
                        correctAnswer: 'information',
                    }
                },
                {
                    title: 'الأفعال (Verbs)',
                    explanation: 'كلمات تصف حدثاً (action) أو حالة (state).',
                    rule: 'Action (run, eat) / Linking (be, seem)',
                    examples: [
                        { en: 'He "runs" every day.', ar: 'هو "يجري" كل يوم.' },
                        { en: 'She "is" a doctor.', ar: 'هي "تكون" طبيبة.' },
                    ],
                    tip: 'لكل زمن (tense) تصريف مختلف للفعل يجب الانتباه له.',
                     exercise: {
                        question: 'In the sentence "She seems happy," what type of verb is "seems"?',
                        options: ['Action verb', 'Linking verb', 'Helping verb', 'Modal verb'],
                        correctAnswer: 'Linking verb',
                    }
                },
                {
                    title: 'الصفات (Adjectives)',
                    explanation: 'كلمات تصف الأسماء أو الضمائر.',
                    rule: 'A "beautiful" flower. A "tall" man.',
                    examples: [
                        { en: 'It is a "sunny" day.', ar: 'إنه يوم "مشمس".' },
                        { en: 'The soup is "hot".', ar: 'الحساء "ساخن".' },
                    ],
                    tip: 'في الإنجليزية، الصفة تأتي دائماً قبل الاسم الذي تصفه.',
                    exercise: {
                        question: 'Choose the correct sentence:',
                        options: ['She has a car red.', 'He is a man tall.', 'It is a beautiful day.', 'The house big is old.'],
                        correctAnswer: 'It is a beautiful day.',
                    }
                },
                {
                    title: 'الظروف (Adverbs)',
                    explanation: 'كلمات تصف الأفعال، الصفات، أو ظروفاً أخرى. تجيب على أسئلة مثل كيف؟ متى؟ أين؟',
                    rule: 'He runs "quickly". She will arrive "soon".',
                    examples: [
                        { en: 'She speaks "slowly".', ar: 'هي تتحدث "ببطء".' },
                        { en: 'I will see you "tomorrow".', ar: 'سأراك "غداً".' },
                    ],
                    tip: 'العديد من الظروف تنتهي بـ "-ly" (e.g., quick -> quickly) ولكن ليس جميعها.',
                    exercise: {
                        question: 'Which word is the adverb in "He drove carefully"?',
                        options: ['He', 'drove', 'carefully', 'none'],
                        correctAnswer: 'carefully',
                    }
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
                    tip: 'لا تستخدم أدوات مع الأسماء العامة والجمع (e.g., I like music).',
                     exercise: {
                        question: 'I need to buy ___ new umbrella.',
                        options: ['a', 'an', 'the', 'no article'],
                        correctAnswer: 'a',
                    }
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
                    tip: 'لكل حرف جر استخدامات متعددة، والممارسة هي أفضل طريقة لتعلمها.',
                    exercise: {
                        question: 'My birthday is ___ June.',
                        options: ['at', 'on', 'in', 'for'],
                        correctAnswer: 'in',
                    }
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
                    tip: 'المبني للمجهول شائع جداً في الكتابة الأكاديمية والرسمية.',
                     exercise: {
                        question: 'Change to passive: "Someone stole my car."',
                        options: ['My car stole someone.', 'My car was stolen.', 'My car is stealing.', 'Someone was stolen my car.'],
                        correctAnswer: 'My car was stolen.',
                    }
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
                    tip: 'انتبه لزمن الفعل في كل جزء من الجملة الشرطية.',
                     exercise: {
                        question: 'If I ___ rich, I would travel the world.',
                        options: ['am', 'was', 'were', 'will be'],
                        correctAnswer: 'were',
                    }
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
                    tip: 'الصفات القصيرة (مقطع واحد) تأخذ -er/-est. الصفات الطويلة (مقطعين أو أكثر) تأخذ more/most.',
                     exercise: {
                        question: 'This is the ___ movie I have ever seen.',
                        options: ['good', 'better', 'best', 'most good'],
                        correctAnswer: 'best',
                    }
                },
                {
                    title: 'الكلام المنقول (Reported Speech)',
                    explanation: 'يستخدم لنقل ما قاله شخص آخر، ويتطلب غالباً تغيير زمن الفعل.',
                    rule: 'He said, "I am tired." -> He said that he was tired.',
                    examples: [
                        { en: 'Direct: "I will come tomorrow," she said.', ar: 'مباشر: قالت "سآتي غداً".' },
                        { en: 'Reported: She said that she would come the next day.', ar: 'منقول: قالت إنها ستأتي في اليوم التالي.' },
                    ],
                    tip: 'عند نقل الكلام، عادةً ما نعود بزمن الفعل خطوة إلى الوراء (e.g., present -> past).',
                    exercise: {
                        question: 'Direct: "I am studying." He said ___.',
                        options: ['he is studying', 'he was studying', 'I am studying', 'I was studying'],
                        correctAnswer: 'he was studying',
                    }
                }
            ]
        }
    ]
};

type Topic = typeof grammarContent.categories[0]['topics'][0];

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
                        onClick={() => speak(ex.en, 'en-US')} 
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

interface GrammarSectionProps {
    isSubscribed: boolean;
    onUnlockClick: () => void;
}

const GrammarSection: React.FC<GrammarSectionProps> = ({ isSubscribed, onUnlockClick }) => {
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
        const category = grammarContent.categories.find(c => c.category === selectedCategory);
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
                        const isUnlocked = selectedCategory === grammarContent.categories[0].category && topicIndex === 0;
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
            <h1 className="text-4xl font-extrabold text-white text-center mb-10">قواعد اللغة الإنجليزية</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {grammarContent.categories.map(category => (
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

export default GrammarSection;