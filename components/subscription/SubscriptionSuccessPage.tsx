
import React, { useEffect } from 'react';
import * as soundService from '../../services/soundService';

interface SubscriptionSuccessPageProps {
    onGoToDashboard: () => void;
}

const SubscriptionSuccessPage: React.FC<SubscriptionSuccessPageProps> = ({ onGoToDashboard }) => {
    
    useEffect(() => {
        soundService.playLessonCompleteSound();
        const timer = setTimeout(() => {
            onGoToDashboard();
        }, 4000);
        return () => clearTimeout(timer);
    }, [onGoToDashboard]);

    return (
        <div className="p-4 md:p-8 w-full h-full flex items-center justify-center animate-fadeIn">
            <div className="w-full max-w-md bg-dark/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10 text-center">
                 <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <i className="fas fa-check-circle text-5xl text-green-300 animate-pulse"></i>
                </div>
                <h1 className="text-3xl font-extrabold text-white mb-4">شكراً على اشتراكك!</h1>
                <p className="text-lg text-gray-300 mb-6">لقد تم فتح جميع الدروس لك. استمتع برحلتك التعليمية الكاملة!</p>
                <button 
                    onClick={onGoToDashboard}
                    className="w-full bg-gradient-to-r from-secondary to-yellow-400 text-dark py-3 rounded-lg font-bold text-lg transition-transform hover:scale-105"
                >
                    العودة إلى خريطة التعلم
                </button>
                <p className="text-sm text-gray-400 mt-4">سيتم توجيهك تلقائياً بعد لحظات...</p>
            </div>
        </div>
    );
};

export default SubscriptionSuccessPage;
