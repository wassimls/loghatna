import React, { useState, useEffect } from 'react';
import * as soundService from '../../services/soundService';

interface ReferralModalProps {
    userId: string;
    onClose: () => void;
}

const ReferralModal: React.FC<ReferralModalProps> = ({ userId, onClose }) => {
    const [referralLink, setReferralLink] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [canShare, setCanShare] = useState(false);

    useEffect(() => {
        // Construct the link only when the component mounts on the client-side
        setReferralLink(`${window.location.origin}?ref=${userId}`);
        if (navigator.share) {
            setCanShare(true);
        }
    }, [userId]);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink).then(() => {
            setIsCopied(true);
            soundService.playCorrectSound();
            setTimeout(() => setIsCopied(false), 2500);
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'انضم إلي في MindLingo!',
                text: 'أنا أتعلم لغات جديدة مع MindLingo، أعتقد أنك ستحبه أيضاً! استخدم الرابط الخاص بي للتسجيل:',
                url: referralLink,
            })
            .catch((error) => console.log('Error sharing', error));
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-dark/80 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md border border-white/10 text-white animate-fadeIn"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-secondary text-2xl font-bold flex items-center gap-3"><i className="fas fa-gift"></i> ادعُ صديقًا</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="إغلاق"><i className="fas fa-times text-xl"></i></button>
                </div>
                
                <div className="text-center">
                    <i className="fas fa-rocket text-5xl text-accent my-4"></i>
                    <p className="text-lg text-gray-200 mb-4">
                        شارك رابطك الخاص وادعُ أصدقاءك للانضمام إلى مغامرة تعلم اللغات في MindLingo!
                    </p>

                    <div className="my-6">
                        <label htmlFor="referral-link" className="block text-sm font-medium text-gray-300 mb-2">رابط الدعوة الخاص بك:</label>
                        <div className="flex items-center gap-2">
                            <input
                                id="referral-link"
                                type="text"
                                value={referralLink}
                                readOnly
                                className="w-full p-3 border-none rounded-lg font-mono text-sm bg-dark/70 text-gray-300 shadow-inner focus:outline-none text-left dir-ltr"
                            />
                            <button
                                type="button"
                                onClick={handleCopy}
                                className={`flex-shrink-0 w-28 h-12 rounded-lg text-white transition-all duration-300 flex items-center justify-center text-base font-bold ${isCopied ? 'bg-green-500' : 'bg-primary hover:bg-primary/80'}`}
                            >
                                {isCopied ? <><i className="fas fa-check mr-2"></i> تم النسخ</> : <><i className="fas fa-copy mr-2"></i> نسخ</>}
                            </button>
                        </div>
                    </div>
                    
                    {canShare && (
                        <button
                            onClick={handleShare}
                            className="w-full bg-gradient-to-r from-accent to-pink-500 text-white py-3 rounded-lg font-bold text-lg transition-transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                        >
                            <i className="fas fa-share-alt"></i>
                            أو شارك مباشرةً
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReferralModal;