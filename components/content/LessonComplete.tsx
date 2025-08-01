import React, { useState, useEffect } from 'react';
import * as soundService from '../../services/soundService';

interface LessonCompleteProps {
    score: number;
    total: number;
    onFinish: () => void | Promise<void>;
}

const LessonComplete: React.FC<LessonCompleteProps> = ({ score, total, onFinish }) => {
    const [isSaving, setIsSaving] = useState(false);
    const percentage = total > 0 ? Math.round((score / total) * 100) : 100;
    let message = 'نتيجة رائعة! استمر في التعلم.';
    if (percentage === 100) message = 'ممتاز! لقد أتقنت هذا الدرس!';
    if (percentage < 50) message = 'لا بأس، الممارسة المستمرة هي مفتاح النجاح.';

    useEffect(() => {
        soundService.playLessonCompleteSound();
    }, []);

    const handleFinish = async () => {
        if (isSaving) return;
        setIsSaving(true);
        soundService.playNavigationSound();
        await onFinish();
        // The component will unmount, no need to setIsSaving(false)
    };
    
    return (
        <div className="p-8 flex-1 flex flex-col items-center justify-center text-center animate-fadeIn">
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                 <div className="w-full h-full bg-gradient-to-br from-secondary to-yellow-300 rounded-full flex items-center justify-center text-white shadow-2xl shadow-secondary/40">
                    <i className="fas fa-trophy text-7xl text-dark"></i>
                </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">اكتمل الدرس!</h2>
            <p className="text-xl text-gray-200 mb-2">
                نتيجتك: {score} من {total}
            </p>
            <p className="text-lg text-gray-300 mb-8">{message}</p>
            <button 
                onClick={handleFinish} 
                disabled={isSaving}
                className="btn bg-gradient-to-r from-accent to-pink-500 text-white py-3 px-8 rounded-full font-bold transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-wait"
            >
                {isSaving ? (
                    <>
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>جاري الحفظ...</span>
                    </>
                ) : (
                    <>
                        <i className="fas fa-arrow-left"></i>
                        <span>العودة للرئيسية</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default LessonComplete;