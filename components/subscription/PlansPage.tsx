import React, { useState } from 'react';
import * as soundService from '../../services/soundService';

interface PlansPageProps {
    onSelectPlan: (plan: 'silver' | 'gold') => void;
}

const PlanCard: React.FC<{
    title: string;
    price: string;
    priceDetails: string;
    equivalentMonthlyPrice?: string;
    features: string[];
    icon: string;
    iconColor: string;
    buttonText: string;
    isPopular?: boolean;
    isCurrent?: boolean;
    onClick?: () => void;
}> = ({ title, price, priceDetails, equivalentMonthlyPrice, features, icon, iconColor, buttonText, isPopular = false, isCurrent = false, onClick }) => (
    <div className={`relative bg-dark/70 backdrop-blur-md p-6 rounded-2xl border ${isPopular ? 'border-secondary' : 'border-white/10'} transition-transform hover:scale-105 flex flex-col`}>
        {isPopular && (
            <div className="absolute top-0 right-4 -translate-y-1/2 bg-secondary text-dark font-bold px-4 py-1 rounded-full text-sm">
                الأكثر شيوعًا
            </div>
        )}
        <div className="text-center mb-6">
            <i className={`fas ${icon} text-5xl ${iconColor} mb-3`}></i>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <div className="text-center mb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-center gap-x-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-secondary">{price}</span>
                <span className="text-gray-400">/{priceDetails}</span>
            </div>
            {equivalentMonthlyPrice && (
                <p className="text-sm text-gray-300 mt-1">{equivalentMonthlyPrice}</p>
            )}
        </div>
        <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-green-400"></i>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <button
            onClick={onClick}
            disabled={isCurrent}
            className={`w-full mt-auto py-3 rounded-lg font-bold text-lg transition-all ${
                isCurrent
                    ? 'bg-slate-600 text-gray-400 cursor-not-allowed'
                    : isPopular
                    ? 'bg-gradient-to-r from-secondary to-yellow-400 text-dark hover:scale-105'
                    : 'bg-primary text-white hover:bg-primary/80 hover:scale-105'
            }`}
        >
            {buttonText}
        </button>
    </div>
);

type BillingCycle = 'monthly' | 'quarterly' | 'semi_annually';

const BillingCycleToggle: React.FC<{
    selectedCycle: BillingCycle;
    onCycleChange: (cycle: BillingCycle) => void;
}> = ({ selectedCycle, onCycleChange }) => {
    const cycles = [
        { id: 'monthly', label: 'شهري' },
        { id: 'quarterly', label: 'ربع سنوي', discount: 'توفير 10%' },
        { id: 'semi_annually', label: 'نصف سنوي', discount: 'توفير 15%' },
    ];

    return (
        <div className="bg-dark/70 p-2 rounded-2xl sm:rounded-full flex flex-col sm:flex-row items-center justify-center gap-2 w-full max-w-sm sm:max-w-lg mx-auto mb-12 relative">
            {cycles.map(cycle => (
                <button
                    key={cycle.id}
                    onClick={() => onCycleChange(cycle.id as BillingCycle)}
                    className={`relative w-full sm:flex-1 px-2 py-2 md:px-4 md:py-2.5 rounded-full font-bold text-center transition-all duration-300 text-sm md:text-base ${
                        selectedCycle === cycle.id ? 'bg-secondary text-dark shadow-md' : 'text-gray-300 hover:bg-white/10'
                    }`}
                >
                    {cycle.label}
                    {cycle.discount && (
                        <span className="absolute -top-2.5 -right-2 bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full transform rotate-12">
                            {cycle.discount}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};

const PlansPage: React.FC<PlansPageProps> = ({ onSelectPlan }) => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

    const handlePlanClick = (plan: 'silver' | 'gold') => {
        soundService.playNavigationSound();
        onSelectPlan(plan);
    };

    const plansData = {
        silver: { monthly: 1500 },
        gold: { monthly: 2500 }
    };

    let silverPrice, goldPrice, priceDetails, silverEqPrice, goldEqPrice;

    switch(billingCycle) {
        case 'quarterly':
            silverPrice = (plansData.silver.monthly * 3 * 0.9).toLocaleString() + ' د.ج';
            goldPrice = (plansData.gold.monthly * 3 * 0.9).toLocaleString() + ' د.ج';
            priceDetails = "كل 3 أشهر";
            silverEqPrice = `(ما يعادل ${(plansData.silver.monthly * 0.9).toLocaleString()} د.ج/شهرياً)`;
            goldEqPrice = `(ما يعادل ${(plansData.gold.monthly * 0.9).toLocaleString()} د.ج/شهرياً)`;
            break;
        case 'semi_annually':
            silverPrice = (plansData.silver.monthly * 6 * 0.85).toLocaleString() + ' د.ج';
            goldPrice = (plansData.gold.monthly * 6 * 0.85).toLocaleString() + ' د.ج';
            priceDetails = "كل 6 أشهر";
            silverEqPrice = `(ما يعادل ${(plansData.silver.monthly * 0.85).toLocaleString()} د.ج/شهرياً)`;
            goldEqPrice = `(ما يعادل ${(plansData.gold.monthly * 0.85).toLocaleString()} د.ج/شهرياً)`;
            break;
        default: // monthly
            silverPrice = plansData.silver.monthly.toLocaleString() + ' د.ج';
            goldPrice = plansData.gold.monthly.toLocaleString() + ' د.ج';
            priceDetails = "شهرياً";
            silverEqPrice = undefined;
            goldEqPrice = undefined;
    }

    return (
        <div className="p-4 md:p-8 w-full h-full flex flex-col items-center justify-center animate-fadeIn overflow-y-auto">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-white">اختر خطتك المثالية</h1>
                <p className="text-lg text-gray-300 mt-2">اختر مدة الاشتراك وادفع أقل كلما طالت المدة.</p>
            </div>
            
            <BillingCycleToggle selectedCycle={billingCycle} onCycleChange={setBillingCycle} />

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
                <PlanCard
                    title="الخطة البرونزية"
                    price="مجانية"
                    priceDetails="دائمًا"
                    icon="fa-medal"
                    iconColor="text-yellow-700"
                    features={[
                        "الوصول إلى أول 3 دروس",
                        "تمارين أساسية",
                        "دعم محدود عبر البريد",
                    ]}
                    buttonText="خطتك الحالية"
                    isCurrent={true}
                />
                <PlanCard
                    title="الخطة الفضية"
                    price={silverPrice}
                    priceDetails={priceDetails}
                    equivalentMonthlyPrice={silverEqPrice}
                    icon="fa-medal"
                    iconColor="text-gray-300"
                    features={[
                        "فتح جميع الدروس",
                        "ألعاب تفاعلية غير محدودة",
                        "الدردشة مع الذكاء الاصطناعي",
                        "دعم فني عبر البريد",
                    ]}
                    buttonText="اختر الخطة"
                    isPopular={true}
                    onClick={() => handlePlanClick('silver')}
                />
                <PlanCard
                    title="الخطة الذهبية"
                    price={goldPrice}
                    priceDetails={priceDetails}
                    equivalentMonthlyPrice={goldEqPrice}
                    icon="fa-medal"
                    iconColor="text-yellow-400"
                    features={[
                        "كل مميزات الخطة الفضية",
                        "وصول مبكر للميزات الجديدة",
                        "جلسات ممارسة حصرية (قريباً)",
                        "دعم فني ذو أولوية",
                    ]}
                    buttonText="اختر الخطة"
                    onClick={() => handlePlanClick('gold')}
                />
            </div>
        </div>
    );
};

export default PlansPage;