import React, { useEffect, useState } from 'react';
import * as userService from '../../services/userService';
import * as paymentService from '../../services/paymentService';
import * as soundService from '../../services/soundService';

const StatusDisplay: React.FC<{ icon: string; color: string; message: string; subtext?: string }> = ({ icon, color, message, subtext }) => (
    <div className="w-full max-w-md bg-dark/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10 text-center animate-fadeIn">
        <div className={`w-24 h-24 ${color}/20 rounded-full flex items-center justify-center mb-6 mx-auto`}>
            <i className={`fas ${icon} text-5xl ${color}`}></i>
        </div>
        <h2 className={`text-3xl font-bold ${color} mb-4`}>{message}</h2>
        {subtext && <p className="text-lg text-white mb-2">{subtext}</p>}
    </div>
);

const PaymentSuccessPage: React.FC = () => {
    const [status, setStatus] = useState< 'verifying' | 'success' | 'error'>('verifying');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const verifyAndSignup = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const invoiceId = urlParams.get('invoice');
                if (!invoiceId) {
                    throw new Error("لم يتم العثور على معرّف الفاتورة.");
                }

                const invoice = await paymentService.getInvoiceStatus(invoiceId);

                if (invoice.status !== 'paid') {
                     throw new Error(`لم تكتمل عملية الدفع. الحالة: ${invoice.status}`);
                }
                
                soundService.playCorrectSound();
                const userDataString = sessionStorage.getItem('mindlingo_signup_data');
                if (!userDataString) {
                    throw new Error("لم يتم العثور على بيانات المستخدم لإكمال التسجيل. يرجى محاولة التسجيل مرة أخرى.");
                }
                const { name, email, password } = JSON.parse(userDataString);

                // This will throw an error if signup fails, which will be caught below
                await userService.signup(name, email, password);

                sessionStorage.removeItem('mindlingo_signup_data');
                
                setStatus('success');
                soundService.playLessonCompleteSound();

                // Redirect to the main app after a short delay
                setTimeout(() => {
                    window.location.href = '/';
                }, 3000);

            } catch (err) {
                soundService.playIncorrectSound();
                const message = err instanceof Error ? err.message : 'حدث خطأ غير معروف.';
                setErrorMessage(`فشل التسجيل: ${message}`);
                setStatus('error');
            }
        };

        verifyAndSignup();
    }, []);

    const renderStatus = () => {
        switch (status) {
            case 'verifying':
                return <StatusDisplay icon="fa-spinner fa-spin" color="text-secondary" message="جاري التحقق من الدفع..." />;
            case 'success':
                return <StatusDisplay icon="fa-check-circle" color="text-green-400" message="تم بنجاح!" subtext="تم إنشاء حسابك. جاري توجيهك إلى التطبيق..." />;
            case 'error':
                 return (
                    <div className="w-full max-w-md bg-dark/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10 text-center animate-fadeIn">
                        <StatusDisplay icon="fa-times-circle" color="text-red-400" message="حدث خطأ" />
                        <p className="text-lg text-red-300 mt-4">{errorMessage}</p>
                        <a href="/" className="mt-6 inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105">
                            العودة إلى الصفحة الرئيسية
                        </a>
                    </div>
                );
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-space-start to-space-end p-4">
            {renderStatus()}
        </div>
    );
};

export default PaymentSuccessPage;
