
import React, { useState, useEffect } from 'react';
import { Quiz, QuizQuestion } from '../../types.ts';
import FeedbackFooter from '../shared/FeedbackFooter.tsx';


interface QuizSectionProps {
    quiz: Quiz | null;
    onRetry: (isCorrect: boolean) => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ quiz, onRetry }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        setSelectedAnswer(null);
        setIsAnswered(false);
        setIsCorrect(null);
    }, [quiz]);

    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
        return (
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
                <i className="fas fa-file-alt text-primary text-5xl mb-4"></i>
                <h3 className="text-2xl font-bold text-dark dark:text-light mb-2">لا يوجد اختبار لهذه الفئة</h3>
                <p className="text-gray-500 dark:text-gray-400">يبدو أنه لم يتمكن من إنشاء اختبار. حاول تحديث المحتوى أو اختيار فئة أخرى.</p>
            </div>
        );
    }
    
    const currentQuestion = quiz.questions[0];

    const handleAnswerClick = (answer: string) => {
        if (isAnswered) return;

        const correct = answer === currentQuestion.correctAnswer;
        setSelectedAnswer(answer);
        setIsAnswered(true);
        setIsCorrect(correct);
    };
    
    const getOptionClass = (option: string) => {
        if (!isAnswered) {
            return 'bg-white dark:bg-slate-700 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/20 dark:hover:border-primary/50';
        }
        if (option === currentQuestion.correctAnswer) {
            return 'bg-green-100 dark:bg-green-900/50 border-accent text-green-800 dark:text-green-200';
        }
        if (option === selectedAnswer) {
            return 'bg-red-100 dark:bg-red-900/50 border-secondary text-red-800 dark:text-red-200';
        }
        return 'bg-gray-100 dark:bg-slate-600/50 text-gray-500 dark:text-gray-400';
    };

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col h-full">
            <div className="flex-grow flex flex-col justify-center">
                <h3 className="text-dark dark:text-light font-bold text-xl md:text-2xl text-center mb-8 min-h-[60px]">
                    {currentQuestion.questionText}
                </h3>
                <div className="options grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerClick(option)}
                            disabled={isAnswered}
                            className={`p-5 rounded-2xl text-center cursor-pointer transition-all duration-300 font-semibold text-base md:text-lg border-2 border-transparent ${getOptionClass(option)}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
             {isCorrect !== null ? (
                 <FeedbackFooter 
                    isCorrect={isCorrect}
                    correctAnswer={currentQuestion.correctAnswer}
                    onContinue={() => onRetry(isCorrect)}
                />
            ) : (
                <div className="w-full p-4 md:p-6 mt-auto text-center">
                    <button
                        onClick={() => onRetry(false)}
                        className="btn bg-gray-200 dark:bg-slate-600 text-dark dark:text-light py-3 px-8 rounded-full font-bold transition-transform duration-300 hover:scale-105 shadow-sm flex items-center justify-center mx-auto"
                    >
                        تخطي التمرين
                        <i className="fas fa-forward mr-2"></i>
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizSection;
