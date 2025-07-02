import React from 'react';

interface PlaceholderSectionProps {
    title: string;
    icon: string;
    badge?: string;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ title, icon, badge }) => {
    return (
        <div className="p-8 flex-1 flex flex-col items-center justify-center text-center animate-fadeIn bg-light dark:bg-slate-900/70 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/50 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0))]"></div>
            <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/50 [mask-image:linear-gradient(90deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(90deg,rgba(255,255,255,0.1),rgba(255,255,255,0))]"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-purple text-white rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-primary/30">
                    <i className={`fas ${icon} text-5xl`}></i>
                </div>
                <h2 className="text-3xl font-bold text-dark dark:text-light mb-3">
                    {title}
                    {badge && <span className="bg-secondary text-white text-sm font-bold px-4 py-1 rounded-full ml-3 align-middle">{badge}</span>}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mb-4">نعمل بجد على هذه الميزة لجعلها مذهلة. ترقبوا التحديثات القادمة!</p>
                <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm p-3 px-6 rounded-full text-primary font-bold">
                    <i className="fas fa-rocket mr-2"></i>
                    قريباً...
                </div>
            </div>
        </div>
    );
};

export default PlaceholderSection;