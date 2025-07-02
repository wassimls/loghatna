import React from 'react';

interface FeedbackFooterProps {
    isCorrect: boolean;
    correctAnswer: string;
    onContinue: () => void;
}

const FeedbackFooter: React.FC<FeedbackFooterProps> = ({ isCorrect, correctAnswer, onContinue }) => {
    const bgColor = isCorrect ? 'bg-green-100 dark:bg-green-900/80' : 'bg-red-100 dark:bg-red-900/80';
    const textColor = isCorrect ? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200';
    const buttonColor = isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';
    
    return (
        <div className={`w-full p-4 md:p-6 mt-auto animate-fadeIn ${bgColor}`}>
            <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-right">
                    <h4 className={`text-xl font-bold ${textColor}`}>
                        <i className={`fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'} ml-2`}></i>
                        {isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة'}
                    </h4>
                    {!isCorrect && (
                        <p className="font-semibold text-dark dark:text-light mt-1">
                            الإجابة الصحيحة: <strong className="dir-ltr inline-block">{correctAnswer}</strong>
                        </p>
                    )}
                </div>
                <button
                    onClick={onContinue}
                    className={`w-full md:w-auto px-10 py-3 rounded-full text-white font-bold text-lg transition-colors ${buttonColor} shadow-lg`}
                >
                    متابعة
                </button>
            </div>
        </div>
    );
};

export default FeedbackFooter;
