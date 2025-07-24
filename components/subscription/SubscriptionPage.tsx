import React, { useState } from 'react';
import { User } from '../../types';
import * as soundService from '../../services/soundService';
import * as paymentService from '../../services/paymentService';

interface SubscriptionPageProps {
    user: User;
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ user }) => {
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
            if (value.includes('?ref=') || value.includes('&ref=')) {
                const match = value.match(/[?&]ref=([^&]+)/);
                if (match && match[1]) {
                    value = match[1];
                }
            }
        } catch (error) {
            // Not a valid URL, use as is.
        }
        setReferralCode(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        for (const key in formData) {
            if (formData[key as keyof typeof formData].trim() === '') {
                setError('الرجاء ملء جميع الحقول.');
                return;
            }
        }

        setIsLoading(true);
        soundService.playGenericClick();
        try {
            const fullName = `${formData.firstName} ${formData.lastName}`;
            const userDetails = {
                email: formData.email,
                fullName: fullName,
                phone: formData.phone,
                address: formData.address,
            };
            const referralCodeToPass = referralCode.trim() || null;
            
            const invoice = await paymentService.createInvoice(userDetails, referralCodeToPass);

            if (invoice && invoice.payment_url) {
                // Redirect user to the payment page provided by the backend
                window.location.href = invoice.payment_url;
            } else {
                throw new Error("لم نتمكن من الحصول على رابط الدفع. يرجى المحاولة مرة أخرى.");
            }

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
                        <i className="fas fa-credit-card"></i>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white">إتمام عملية الدفع</h1>
                    <p className="text-lg text-gray-300 mt-2">أكمل بيانات الفوترة للانتقال إلى بوابة الدفع الآمنة.</p>
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
                        <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="w-full p-3 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors" placeholder="05xxxxxxxx" />
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
                        {isLoading ? <><i className="fas fa-spinner fa-spin mr-2"></i>جاري التوجيه...</> : 'الانتقال إلى الدفع'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubscriptionPage;