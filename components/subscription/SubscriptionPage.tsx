import React, { useState } from 'react';
import { User } from '../../types';
import * as soundService from '../../services/soundService';
import * as userService from '../../services/userService';

interface SubscriptionPageProps {
    user: User;
    onSubscribe: () => Promise<void>;
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ user, onSubscribe }) => {
    const [formData, setFormData] = useState({
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ')[1] || '',
        address: '',
        phone: '',
        email: user.email,
    });
    const [referralCode, setReferralCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        try {
            // Check if the pasted value is a URL and try to extract the 'ref' parameter
            if (value.includes('?ref=') || value.includes('&ref=')) {
                // A simple regex is more robust than new URL() which can throw an error on incomplete input
                const match = value.match(/[?&]ref=([^&]+)/);
                if (match && match[1]) {
                    value = match[1];
                }
            }
        } catch (error) {
            // It's not a valid URL or doesn't match, just use the value as is.
        }
        setReferralCode(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        // Basic validation
        for (const key in formData) {
            if (formData[key as keyof typeof formData].trim() === '') {
                setError('الرجاء ملء جميع الحقول.');
                return;
            }
        }

        setIsLoading(true);
        soundService.playGenericClick();
        try {
            // In a real app, this data would be sent to a backend.
            // Here, we log referral usage and then proceed to the next step.
            if (referralCode.trim()) {
                await userService.logReferralUsage(referralCode.trim(), user);
            }
            console.log('Subscription data:', formData, 'Referral Code:', referralCode);
            await onSubscribe();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'حدث خطأ ما.');
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8 w-full h-full flex items-center justify-center animate-fadeIn">
            <div className="w-full max-w-lg bg-dark/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10">
                <div className="text-center mb-8">
                     <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center text-4xl text-dark shadow-2xl transform -rotate-12 mx-auto mb-4">
                        <i className="fas fa-rocket"></i>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white">افتح عالم اللغات!</h1>
                    <p className="text-lg text-gray-300 mt-2">أكمل بياناتك لفتح جميع الدروس والميزات.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-200 mb-2">الاسم</label>
                            <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} required className="w-full p-3 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors" placeholder="اسمك الأول" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-200 mb-2">اللقب</label>
                            <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} required className="w-full p-3 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors" placeholder="لقبك" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-200 mb-2">العنوان</label>
                        <input id="address" name="address" type="text" value={formData.address} onChange={handleChange} required className="w-full p-3 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors" placeholder="شارع، مدينة، دولة" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-2">رقم الهاتف</label>
                        <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="w-full p-3 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors" placeholder="+123456789" />
                    </div>
                     <div>
                        <label htmlFor="referralCode" className="block text-sm font-medium text-gray-200 mb-2">رمز الدعوة (اختياري)</label>
                        <input id="referralCode" name="referralCode" type="text" value={referralCode} onChange={handleReferralChange} className="w-full p-3 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors" placeholder="أدخل رمز أو رابط الدعوة" />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">البريد الإلكتروني</label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full p-3 rounded-lg bg-dark/70 text-gray-400 border-2 border-transparent cursor-not-allowed" readOnly />
                    </div>
                    
                    {error && <p className="text-sm text-center text-red-300 font-bold bg-red-500/20 p-3 rounded-lg">{error}</p>}
                    
                    <button type="submit" disabled={isLoading} className="w-full mt-4 bg-gradient-to-r from-secondary to-yellow-400 text-dark py-3 rounded-lg font-bold text-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait flex items-center justify-center">
                        {isLoading ? <><i className="fas fa-spinner fa-spin mr-2"></i>جاري الإرسال...</> : 'إرسال والاشتراك'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubscriptionPage;