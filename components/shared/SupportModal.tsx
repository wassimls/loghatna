import React, { useState } from 'react';
import { User } from '../../types';
import * as soundService from '../../services/soundService';

interface SupportModalProps {
    user: User;
    onClose: () => void;
}

const SupportModal: React.FC<SupportModalProps> = ({ user, onClose }) => {
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim()) return;

        setIsSubmitting(true);
        soundService.playGenericClick();

        const recipient = 'mindlingo@hotmail.com';
        const subject = `Support Request from ${user.name} (User ID: ${user.id})`;
        const body = `
User Name: ${user.name}
User Email: ${user.email}
User ID: ${user.id}
--------------------

Problem Description:
${description}
        `.trim();

        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;

        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
        }, 500);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-dark/80 backdrop-blur-lg rounded-2xl p-6 w-full max-w-lg border border-white/10 text-white animate-fadeIn"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-secondary text-2xl font-bold flex items-center gap-3"><i className="fas fa-headset"></i> الدعم الفني</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="إغلاق"><i className="fas fa-times text-xl"></i></button>
                </div>
                
                <p className="text-gray-300 mb-6">
                    هل تواجه مشكلة أو لديك اقتراح؟ صف لنا ما يحدث وسيقوم فريقنا بمراجعة طلبك. سيتم فتح برنامج البريد الإلكتروني الخاص بك لإرسال الشكوى.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="support-email" className="block text-sm font-medium text-gray-300 mb-2">بريدك الإلكتروني (للتواصل):</label>
                        <input
                            id="support-email"
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full p-3 border-none rounded-lg font-mono text-sm bg-dark/70 text-gray-400 shadow-inner focus:outline-none cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label htmlFor="support-description" className="block text-sm font-medium text-gray-300 mb-2">صف المشكلة:</label>
                        <textarea
                            id="support-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={6}
                            className="w-full p-3 border-none rounded-lg bg-dark/70 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                            placeholder="يرجى وصف المشكلة التي تواجهها بالتفصيل..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting || !description.trim()}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? <i className="fas fa-spinner fa-spin"></i> : <><i className="fas fa-paper-plane"></i> إرسال الشكوى</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SupportModal;