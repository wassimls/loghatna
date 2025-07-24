import React, { useEffect, useState } from 'react';
import * as paymentService from '../../services/paymentService';
import * as soundService from '../../services/soundService';

interface PaymentVerificationPageProps {
    onVerificationSuccess: () => void;
    onVerificationFailure: () => void;
}

const StatusDisplay: React.FC<{ icon: string; color: string; message: string; subtext?: string }> = ({ icon, color, message, subtext }) => (
    <div className="w-full max-w-md bg-dark/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10 text-center animate-fadeIn">
        <div className={`w-24 h-24 ${color.replace('text-', 'bg-')}/20 rounded-full flex items-center justify-center mb-6 mx-auto`}>
            <i className={`fas ${icon} text-5xl ${color}`}></i>
        </div>
        <h2 className={`text-3xl font-bold ${color} mb-4`}>{message}</h2>
        {subtext && <p className="text-lg text-white mb-2">{subtext}</p>}
    </div>
);

const PaymentVerificationPage: React.FC<PaymentVerificationPageProps> = ({ onVerificationSuccess, onVerificationFailure }) => {
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const verify = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const invoiceId = urlParams.get('invoice');
                
                if (!invoiceId) {
                    throw new Error("لم يتم العثور على معرّف الفاتورة في الرابط.");
                }

                // This call now goes to our backend via the new paymentService
                const { status: paymentStatus } = await paymentService.verifyPayment(invoiceId);

                if (paymentStatus.toLowerCase() === 'paid') {
                    soundService.playCorrectSound();
                    setStatus('success');
                    onVerificationSuccess();
                } else {
                     throw new Error(`حالة الدفع غير مكتملة: ${paymentStatus}`);
                }
            } catch (err) {
                soundService.playIncorrectSound();
                const message = err instanceof Error ? err.message : 'حدث خطأ غير معروف.';
                setErrorMessage(`فشل إتمام العملية: ${message}`);
                setStatus('error');
            }
        };

        verify();
    }, [onVerificationSuccess]);

    const renderContent = () => {
        switch (status) {
            case 'verifying':
                return <StatusDisplay icon="fa-spinner fa-spin" color="text-secondary" message="جاري التحقق من الدفع..." />;
            case 'success':
                // This state will be brief as App.tsx will navigate away upon success.
                return <StatusDisplay icon="fa-check-circle" color="text-green-400" message="تم تأكيد الدفع بنجاح!" />;
            case 'error':
                 return (
                    <div className="w-full max-w-md bg-dark/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10 text-center animate-fadeIn">
                        <StatusDisplay icon="fa-times-circle" color="text-red-400" message="فشل التحقق" />
                        <p className="text-lg text-red-300 mt-4">{errorMessage}</p>
                        <button onClick={onVerificationFailure} className="mt-6 inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105">
                            العودة إلى صفحة الخطط
                        </button>
                    </div>
                );
        }
    }

    return (
        <div className="min-h-full flex flex-col items-center justify-center bg-gradient-to-br from-space-start to-space-end p-4">
            {renderContent()}
        </div>
    );
};

export default PaymentVerificationPage;