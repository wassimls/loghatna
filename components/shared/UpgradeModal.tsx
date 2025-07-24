import React from 'react';
import * as soundService from '../../services/soundService';

interface UpgradeModalProps {
    onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose }) => {
    const instagramLink = 'https://www.instagram.com/mindl_ingo?igsh=ODhqMmE4cXExZGFl';

    const handleInstagramClick = () => {
        soundService.playNavigationSound();
        window.open(instagramLink, '_blank', 'noopener,noreferrer');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-dark/80 backdrop-blur-lg rounded-2xl p-6 w-full max-w-sm border border-white/10 text-white animate-fadeIn"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-secondary text-2xl font-bold flex items-center gap-3"><i className="fas fa-gem"></i> ترقية الحساب</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="إغلاق"><i className="fas fa-times text-xl"></i></button>
                </div>
                
                <div className="text-center py-4">
                    <i className="fab fa-instagram text-5xl text-accent my-4"></i>
                    <p className="text-lg text-gray-200 mb-6">
                        لترقية حسابك والوصول إلى جميع الميزات، يرجى التواصل معنا مباشرة على حسابنا في انستجرام.
                    </p>

                    <button
                        onClick={handleInstagramClick}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-bold text-lg transition-transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
                    >
                        <i className="fab fa-instagram"></i>
                        تواصل معنا على انستجرام
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpgradeModal;
