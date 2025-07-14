import React from 'react';

interface VoiceNotAvailableModalProps {
    onClose: () => void;
}

const OperatingSystemGuide: React.FC<{ icon: string, name: string, steps: string[] }> = ({ icon, name, steps }) => (
    <div className="bg-dark/50 p-4 rounded-lg border border-white/10">
        <h4 className="text-lg font-bold text-secondary flex items-center gap-2 mb-2">
            <i className={`fab ${icon}`}></i>
            {name}
        </h4>
        <ol className="list-decimal list-inside text-gray-300 text-sm space-y-1">
            {steps.map((step, index) => <li key={index}>{step}</li>)}
        </ol>
    </div>
);

const VoiceNotAvailableModal: React.FC<VoiceNotAvailableModalProps> = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn" 
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-dark/90 backdrop-blur-lg rounded-2xl p-6 w-full max-w-lg border border-white/10 text-white" 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-secondary">
                        <i className="fas fa-exclamation-triangle"></i>
                        ميزة النطق غير متاحة
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="إغلاق">
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>

                <p className="mb-4 text-gray-200">
                    يعتمد تشغيل الصوت على الأصوات المثبتة على نظام التشغيل الخاص بك. يبدو أنه لا يوجد صوت للغة المحددة على جهازك.
                </p>
                <p className="mb-6 font-semibold text-gray-100">
                    لحل المشكلة، يمكنك تثبيت حزمة اللغة الصوتية من إعدادات جهازك باتباع الإرشادات أدناه:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
                    <OperatingSystemGuide 
                        icon="fa-windows"
                        name="Windows 10/11"
                        steps={[
                            'اذهب إلى الإعدادات > الوقت واللغة > اللغة والمنطقة.',
                            'انقر على "إضافة لغة" واختر اللغة المطلوبة.',
                            'تأكد من تحديد خيار "تحويل النص إلى كلام" وانقر على "تثبيت".'
                        ]}
                    />
                     <OperatingSystemGuide 
                        icon="fa-apple"
                        name="macOS"
                        steps={[
                            'اذهب إلى تفضيلات النظام > تسهيلات الاستخدام > المحتوى المنطوق.',
                            'من قائمة "صوت النظام"، اختر "تخصيص...".',
                            'ابحث عن اللغة المطلوبة وحمل الصوت.'
                        ]}
                    />
                     <OperatingSystemGuide 
                        icon="fa-android"
                        name="Android"
                        steps={[
                            'اذهب إلى الإعدادات > الإدارة العامة > تحويل النص إلى كلام.',
                            'انقر على "المحرك المفضل" (عادةً محرك جوجل).',
                            'اذهب إلى "تثبيت البيانات الصوتية" وحمل اللغة المطلوبة.'
                        ]}
                    />
                     <OperatingSystemGuide 
                        icon="fa-apple"
                        name="iOS / iPadOS"
                        steps={[
                            'اذهب إلى الإعدادات > تسهيلات الاستخدام > المحتوى المنطوق.',
                            'انقر على "الأصوات".',
                            'ابحث عن اللغة المطلوبة وقم بتنزيل الصوت.'
                        ]}
                    />
                </div>
                
                <div className="mt-8 text-center">
                    <button 
                        onClick={onClose}
                        className="bg-secondary text-dark font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105"
                    >
                        حسناً، فهمت
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VoiceNotAvailableModal;
