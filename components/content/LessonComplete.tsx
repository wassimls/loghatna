import React from 'react';

interface LessonCompleteProps {
    score: number;
    total: number;
    onFinish: () => void;
}

const LessonComplete: React.FC<LessonCompleteProps> = ({ score, total, onFinish }) => {
    const percentage = total > 0 ? Math.round((score / total) * 100) : 100;
    let message = 'نتيجة رائعة! استمر في التعلم.';
    if (percentage === 100) message = 'ممتاز! لقد أتقنت هذا الدرس!';
    if (percentage < 50) message = 'لا بأس، الممارسة المستمرة هي مفتاح النجاح.';
    
    return (
        <div className="p-8 flex-1 flex flex-col items-center justify-center text-center animate-fadeIn">
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                 <div className="w-full h-full bg-gradient-to-br from-primary to-purple rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/40">
                    <i className="fas fa-trophy text-7xl"></i>
                </div>
            </div>
            <h2 className="text-3xl font-bold text-dark dark:text-light mb-2">اكتمل الدرس!</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                نتيجتك: {score} من {total}
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-300 mb-8">{message}</p>
            <button onClick={onFinish} className="btn bg-gradient-to-r from-accent to-green-500 text-white py-3 px-8 rounded-full font-bold transition-transform duration-300 hover:scale-105 flex items-center gap-2 shadow-lg">
                <i className="fas fa-arrow-left"></i>
                متابعة
            </button>
        </div>
    );
};

export default LessonComplete;
