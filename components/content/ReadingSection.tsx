import React, { useState, useEffect } from 'react';
import { ReadingExercise } from '../../types';
import FeedbackFooter from '../shared/FeedbackFooter';

interface ReadingSectionProps {
    exercise: ReadingExercise | null;
    onNext: (isCorrect: boolean) => void;
}

const ReadingSection: React.FC<ReadingSectionProps> = ({ exercise, onNext }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    
    useEffect(() => {
        setSelectedOption(null);
        setIsCorrect(null);
    }, [exercise]);

    if (!exercise || !exercise.sentence) {
        return <div className="p-8 text-center dark:text-gray-400">لا توجد تمارين قراءة متاحة حاليًا.</div>;
    }

    const handleOptionClick = (option: string) => {
        if (selectedOption) return; // Prevent changing answer
        
        const correct = option === exercise.correctAnswer;
        setSelectedOption(option);
        setIsCorrect(correct);
    };

    const getOptionClass = (option: string) => {
        if (!selectedOption) {
            return 'bg-white dark:bg-slate-700 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/20 dark:hover:border-primary/50';
        }
        if (option === selectedOption) {
            return isCorrect ? 'bg-green-100 dark:bg-green-900/50 border-accent text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/50 border-secondary text-red-800 dark:text-red-200';
        }
        if (option === exercise.correctAnswer) {
            return 'bg-green-100 dark:bg-green-900/50 border-accent text-green-800 dark:text-green-200';
        }
        return 'bg-gray-100 dark:bg-slate-600/50 text-gray-500 dark:text-gray-400';
    };

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col h-full">
            <div className="flex-grow flex flex-col justify-center">
                 <h3 className="text-dark dark:text-light font-bold text-lg md:text-xl text-center mb-4">اقرأ الجملة واختر الترجمة الصحيحة:</h3>
                <div className="exercise-content text-left dir-ltr my-6 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-xl md:text-2xl text-dark dark:text-light font-medium">
                    <p>{exercise.sentence}</p>
                </div>
                <div className="options grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                    {exercise.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            disabled={selectedOption !== null}
                            className={`p-5 rounded-2xl text-right cursor-pointer transition-all duration-300 font-semibold text-base md:text-lg border-2 border-transparent ${getOptionClass(option)}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            
            {isCorrect !== null ? (
                 <FeedbackFooter 
                    isCorrect={isCorrect}
                    correctAnswer={exercise.correctAnswer}
                    onContinue={() => onNext(isCorrect)}
                />
            ) : (
                <div className="w-full p-4 md:p-6 mt-auto text-center">
                    <button
                        onClick={() => onNext(false)}
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

export default ReadingSection;
