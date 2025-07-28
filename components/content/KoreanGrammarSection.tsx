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
                    tip: 'تعلم هانغل أولاً سيجعل قراءة ونطق الكلمات الكورية أسهل بكثير.',
                     exercise: {
                        question: 'كيف تكتب مقطع "ga" بالهانغل؟',
                        options: ['가', '나', '다', '라'],
                        correctAnswer: '가',
                    }
                },
                {
                    title: 'بنية الجملة (SOV)',
                    explanation: 'تتبع اللغة الكورية بنية (فاعل - مفعول به - فعل)، وهذا يختلف عن بنية (فاعل - فعل - مفعول به) في العربية والإنجليزية.',
                    rule: 'Subject - Object - Verb',
                    examples: [
                        { en: '저는 밥을 먹어요. (jeoneun bab-eul meog-eoyo)', ar: 'أنا الأرز آكل. (أنا آكل الأرز)' },
                        { en: '그녀는 책을 읽어요. (geunyeoneun chaeg-eul ilg-eoyo)', ar: 'هي الكتاب تقرأ. (هي تقرأ الكتاب)' },
                    ],
                    tip: 'تذكر دائماً أن الفعل يأتي في نهاية الجملة. هذا هو أهم اختلاف هيكلي يجب التعود عليه.',
                    exercise: {
                        question: 'أي جملة تتبع بنية SOV الصحيحة؟',
                        options: ['저는 먹어요 밥을.', '밥을 저는 먹어요.', '저는 밥을 먹어요.'],
                        correctAnswer: '저는 밥을 먹어요.',
                    }
                },
                 {
                    title: 'اللاحقات (조사 - Josa)',
                    explanation: 'هي جزيئات صغيرة تضاف إلى نهاية الأسماء لتحديد وظيفتها في الجملة (فاعل، مفعول به، موضوع الحديث، إلخ).',
                    rule: '은/는 (للموضوع), 이/가 (للفاعل), 을/를 (للمفعول به)',
                    examples: [
                        { en: '사과가 맛있어요. (sagwa-ga masisseoyo)', ar: 'التفاح لذيذ. (가: فاعل)' },
                        { en: '저는 사과를 먹어요. (jeoneun sagwa-reul meogeoyo)', ar: 'أنا آكل التفاح. (를: مفعول به)' },
                    ],
                    tip: 'اختيار اللاحقة (مثلاً 은 أو 는) يعتمد على ما إذا كانت الكلمة التي تسبقها تنتهي بحرف ساكن أو علة.',
                     exercise: {
                        question: 'اختر اللاحقة الصحيحة للمفعول به: "책___ 읽어요."',
                        options: ['이', '가', '은', '을'],
                        correctAnswer: '을',
                    }
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
                    tip: 'اختيار -아요 أو -어요 يعتمد على آخر حرف علة في جذر الفعل.',
                    exercise: {
                        question: 'ما هو التصريف الصحيح للفعل "마시다" (يشرب)؟',
                        options: ['마시요', '마셔요', '마사요', '마서요'],
                        correctAnswer: '마셔요',
                    }
                },
                {
                    title: 'مستويات الاحترام (존댓말)',
                    explanation: 'تستخدم نهايات أفعال مختلفة بناءً على عمر ومكانة الشخص الذي تتحدث معه. هذا جانب مهم جداً من الثقافة الكورية.',
                    rule: 'غير رسمي (반말) / رسمي مهذب (존댓말)',
                    examples: [
                        { en: '고마워 (gomawo)', ar: 'شكراً (للأصدقاء)' },
                        { en: '고맙습니다 (gomapseumnida)', ar: 'شكراً (بشكل رسمي جداً)' },
                    ],
                    tip: 'عندما تكون في شك، استخدم دائمًا الصيغة الرسمية المهذبة (المنتهية بـ -요 أو -ㅂ니다).',
                    exercise: {
                        question: 'أي صيغة هي الأكثر رسمية لقول "شكراً"؟',
                        options: ['고마워', '고마워요', '감사합니다'],
                        correctAnswer: '감사합니다',
                    }
                },
            ]
        }
    ]
};

type Topic = typeof koreanGrammarContent.categories[0]['topics'][0];

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
                        onClick={() => speak(ex.en, 'ko-KR')} 
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

interface KoreanGrammarSectionProps {
    isSubscribed: boolean;
    onUnlockClick: () => void;
}

const KoreanGrammarSection: React.FC<KoreanGrammarSectionProps> = ({ isSubscribed, onUnlockClick }) => {
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
        const category = koreanGrammarContent.categories.find(c => c.category === selectedCategory);
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
                        const isUnlocked = selectedCategory === koreanGrammarContent.categories[0].category && topicIndex === 0;
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
            <h1 className="text-4xl font-extrabold text-white text-center mb-10">قواعد اللغة الكورية</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {koreanGrammarContent.categories.map(category => (
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

export default KoreanGrammarSection;