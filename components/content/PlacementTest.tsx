import React, { useState, useEffect } from 'react';
import { Language, PlacementTestQuestion } from '../../types';
import * as geminiService from '../../services/geminiService';
import ProgressBar from '../shared/ProgressBar';
import * as soundService from '../../services/soundService';

interface PlacementTestProps {
    language: Language;
    onComplete: (score: number, total: number) => void;
}

const PlacementTest: React.FC<PlacementTestProps> = ({ language, onComplete }) => {
    const [questions, setQuestions] = useState<PlacementTestQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [status, setStatus] = useState<'loading' | 'error' | 'active' | 'complete'>('loading');
    const [error, setError] = useState<string | null>('');
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchTest = async () => {
            setStatus('loading');
            try {
                const testQuestions = await geminiService.generatePlacementTest(language.name);
                if (testQuestions && testQuestions.length > 0) {
                    setQuestions(testQuestions);
                    setStatus('active');
                } else {
                    throw new Error("فشل الذكاء الاصطناعي في إنشاء الاختبار. حاول مرة أخرى.");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع.');
                setStatus('error');
            }
        };

        fetchTest();
    }, [language]);

    useEffect(() => {
        if (status === 'active' && questions.length > 0) {
            const currentQuestion = questions[currentIndex];
            // Shuffle options for the current question
            setShuffledOptions([...currentQuestion.options].sort(() => Math.random() - 0.5));
        }
    }, [currentIndex, questions, status]);


    const handleAnswer = (answer: string) => {
        if (isAnswered) return;
        
        const isCorrect = answer === questions[currentIndex].correctAnswer;
        if (isCorrect) {
            setScore(prev => prev + 1);
            soundService.playCorrectSound();
        } else {
            soundService.playIncorrectSound();
        }
        setSelectedAnswer(answer);
        setIsAnswered(true);
    };

    const handleNext = () => {
        soundService.playNavigationSound();
        setIsAnswered(false);
        setSelectedAnswer(null);
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setStatus('complete');
        }
    };
    
    const getLevelText = (score: number, total: number) => {
        const percentage = total > 0 ? (score / total) : 0;
        if (percentage >= 0.8) return { level: "متوسط (B1)", message: "أداء رائع! لديك أساس قوي. سنقوم بفتح الدروس المتقدمة لك." };
        if (percentage >= 0.4) return { level: "أساسي (A2)", message: "جيد جدًا! لديك معرفة جيدة بالأساسيات. سنقوم بفتح الدروس المناسبة لك." };
        return { level: "مبتدئ (A1)", message: "بداية موفقة! سنبدأ معك من الأساسيات لبناء معرفتك خطوة بخطوة." };
    };

    const getOptionClass = (option: string) => {
        if (!isAnswered) {
            return 'bg-dark/50 hover:bg-primary/50';
        }
        const isCorrect = option === questions[currentIndex].correctAnswer;
        const isSelected = option === selectedAnswer;

        if (isCorrect) return 'bg-green-500/80 border-green-400';
        if (isSelected) return 'bg-red-500/80 border-red-400';
        return 'bg-dark/50 opacity-60';
    };

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <i className="fas fa-spinner fa-spin text-secondary text-5xl mb-4"></i>
                <h2 className="text-2xl font-bold text-white">جاري إعداد اختبار تحديد المستوى...</h2>
                <p className="text-gray-300">يقوم الذكاء الاصطناعي بتخصيص الأسئلة لك.</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <i className="fas fa-exclamation-triangle text-accent text-5xl mb-4"></i>
                <h2 className="text-2xl font-bold text-white">حدث خطأ</h2>
                <p className="text-gray-300 max-w-md">{error}</p>
            </div>
        );
    }
    
    if (status === 'complete') {
        const { level, message } = getLevelText(score, questions.length);
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4 animate-fadeIn">
                 <div className="w-32 h-32 bg-gradient-to-br from-secondary to-yellow-300 rounded-full flex items-center justify-center text-dark shadow-2xl shadow-secondary/40 mb-6">
                    <i className="fas fa-poll text-6xl"></i>
                </div>
                <h2 className="text-3xl font-bold text-white">اكتمل الاختبار!</h2>
                <p className="text-xl text-gray-200 my-2">نتيجتك: {score} من {questions.length}</p>
                <p className="text-2xl font-bold text-secondary my-2">{level}</p>
                <p className="text-lg text-gray-300 max-w-md mb-8">{message}</p>
                <button onClick={() => onComplete(score, questions.length)} className="btn bg-accent text-white py-3 px-8 rounded-full font-bold transition-transform hover:scale-105">
                    عرض خريطة التعلم المخصصة <i className="fas fa-arrow-left mr-2"></i>
                </button>
            </div>
        )
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div className="p-4 md:p-8 w-full h-full flex flex-col items-center justify-center animate-fadeIn">
            <div className="w-full max-w-3xl">
                <p className="text-center text-secondary font-bold mb-2">السؤال {currentIndex + 1} من {questions.length}</p>
                <ProgressBar progress={((currentIndex + 1) / questions.length) * 100} />
                
                <div className="bg-dark/50 p-8 rounded-2xl shadow-lg mt-6 text-center border border-white/10">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white min-h-[80px] flex items-center justify-center">
                        {currentQuestion.questionText}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {shuffledOptions.map((option, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(option)}
                            disabled={isAnswered}
                            className={`p-5 rounded-2xl text-lg font-bold text-white border-2 border-transparent transition-all duration-300 text-center dir-ltr ${getOptionClass(option)}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                
                {isAnswered && (
                     <div className="text-center mt-8">
                         <button onClick={handleNext} className="btn bg-secondary text-dark py-3 px-12 rounded-full font-bold transition-transform hover:scale-105">
                             {currentIndex < questions.length - 1 ? 'التالي' : 'عرض النتيجة'} <i className="fas fa-arrow-left mr-2"></i>
                         </button>
                     </div>
                )}
            </div>
        </div>
    );
};

export default PlacementTest;