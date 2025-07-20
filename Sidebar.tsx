import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import * as soundService from '../services/soundService';

type View = 'dashboard' | 'lesson' | 'games' | 'chat' | 'grammar' | 'progress';

const ApiKeyInput: React.FC<{ apiKey: string; onApiKeyChange: (key: string) => void; forModal?: boolean;}> = ({ apiKey, onApiKeyChange, forModal = false }) => {
    const [localKey, setLocalKey] = useState(apiKey);
    const [showKey, setShowKey] = useState(false);
    const [justSaved, setJustSaved] = useState(false);

    useEffect(() => {
        setLocalKey(apiKey);
    }, [apiKey]);

    const handleSave = () => {
        soundService.playGenericClick();
        onApiKeyChange(localKey);
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2000); // Display checkmark for 2 seconds
    };
    
    const isDirty = localKey !== apiKey;

    return (
        <div className="api-key-section">
            <label htmlFor={forModal ? "api-key-modal" : "api-key-sidebar"} className="block mb-2 font-medium text-white text-sm">مفتاح Gemini API:</label>
            <div className="flex items-center gap-2">
                <div className="relative grow">
                    <input
                        id={forModal ? "api-key-modal" : "api-key-sidebar"}
                        type={showKey ? "text" : "password"}
                        value={localKey}
                        onChange={(e) => {
                            setLocalKey(e.target.value);
                            setJustSaved(false);
                        }}
                        className="w-full p-3 pl-10 pr-10 border-none rounded-xl font-mono text-xs bg-dark/70 text-white cursor-pointer transition-all duration-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        placeholder="أدخل مفتاح API الخاص بك..."
                    />
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-secondary">
                        <i className="fas fa-key"></i>
                    </div>
                    <button 
                        type="button" 
                        onClick={() => setShowKey(!showKey)} 
                        className="absolute inset-y-0 left-0 flex items-center px-3 text-gray-400 hover:text-white"
                        aria-label={showKey ? "إخفاء المفتاح" : "إظهار المفتاح"}
                    >
                        <i className={`fas ${showKey ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                </div>
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={!isDirty}
                    title={justSaved ? "تم الحفظ بنجاح!" : (isDirty ? "حفظ التغييرات" : "تم الحفظ")}
                    className={`flex-shrink-0 w-12 h-12 rounded-xl text-white transition-all duration-300 flex items-center justify-center text-xl disabled:opacity-60 disabled:cursor-not-allowed
                        ${justSaved ? 'bg-green-500' : isDirty ? 'bg-secondary' : 'bg-primary'}
                    `}
                >
                    {justSaved ? <i className="fas fa-check"></i> : <i className="fas fa-save"></i>}
                </button>
            </div>
        </div>
    );
};


interface SidebarProps {
    className?: string;
    currentView: View;
    onNavigate: (view: View) => void;
    languages: Language[];
    selectedLanguage: string;
    onLanguageChange: (languageCode: string) => void;
    theme: 'light' | 'dark';
    onThemeChange: () => void;
    onLogout: () => void;
    apiKey: string;
    onApiKeyChange: (key: string) => void;
    onReferralClick: () => void;
    onSupportClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    className,
    currentView,
    onNavigate,
    languages,
    selectedLanguage,
    onLanguageChange,
    theme,
    onThemeChange,
    onLogout,
    apiKey,
    onApiKeyChange,
    onReferralClick,
    onSupportClick
}) => {
    const navItems = [
        { view: 'dashboard', icon: 'fa-book-open', label: 'الدروس' },
        { view: 'grammar', icon: 'fa-spell-check', label: 'القواعد' },
        { view: 'games', icon: 'fa-gamepad', label: 'الألعاب' },
        { view: 'progress', icon: 'fa-chart-line', label: 'التقدم' },
        { view: 'chat', icon: 'fa-comments', label: 'الدردشة' },
    ];

    const isViewActive = (view: View) => {
        if (view === 'dashboard') {
            return currentView === 'dashboard' || currentView === 'lesson';
        }
        return currentView === view;
    };

    return (
        <aside className={`w-72 bg-dark/20 backdrop-blur-sm p-5 border-l border-white/10 flex flex-col gap-6 transition-colors duration-500 ${className}`}>
            <nav className="flex-1 flex flex-col">
                <h2 className="text-secondary mb-5 text-xl font-bold flex items-center gap-3">
                    <i className="fas fa-compass"></i>
                    التنقل
                </h2>
                <div className="space-y-2">
                    {navItems.map(item => (
                        <button
                            key={item.view}
                            onClick={() => onNavigate(item.view as View)}
                            className={`w-full p-4 rounded-xl flex items-center gap-4 text-right transition-all duration-300 ${isViewActive(item.view as View) ? 'bg-secondary text-dark shadow-lg' : 'bg-dark/50 text-white hover:bg-white/20'}`}
                        >
                            <i className={`fas ${item.icon} text-lg w-6 text-center`}></i>
                            <span className="font-semibold text-base">{item.label}</span>
                        </button>
                    ))}
                </div>
                 <div className="mt-6 border-t border-white/10 pt-6 space-y-2">
                     <button
                        onClick={onReferralClick}
                        className="w-full p-4 rounded-xl flex items-center gap-4 text-right transition-all duration-300 bg-gradient-to-r from-accent to-pink-500 text-white shadow-lg hover:scale-105"
                    >
                        <i className="fas fa-gift text-lg w-6 text-center"></i>
                        <span className="font-semibold text-base">ادعُ صديقًا</span>
                    </button>
                    <button
                        onClick={onSupportClick}
                        className="w-full p-4 rounded-xl flex items-center gap-4 text-right transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                    >
                        <i className="fas fa-headset text-lg w-6 text-center"></i>
                        <span className="font-semibold text-base">الدعم الفني</span>
                    </button>
                </div>
            </nav>

            <div className="sidebar-section bg-white/10 dark:bg-dark/50 rounded-2xl p-5 shadow-lg border border-white/10 space-y-5">
                <h2 className="text-secondary mb-2 text-xl font-bold flex items-center gap-3"><i className="fas fa-cog"></i>الإعدادات</h2>
                <div className="language-selector">
                    <label htmlFor="language" className="block mb-2 font-medium text-white text-sm">اختر اللغة:</label>
                    <div className="relative">
                        <select
                            id="language"
                            value={selectedLanguage}
                            onChange={(e) => onLanguageChange(e.target.value)}
                            className="w-full p-3 pr-10 border-none rounded-xl font-sans text-base bg-dark/70 text-white cursor-pointer transition-all duration-300 shadow-inner appearance-none focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        >
                            {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-secondary">
                             <i className="fas fa-chevron-down"></i>
                        </div>
                    </div>
                </div>
                 <ApiKeyInput apiKey={apiKey} onApiKeyChange={onApiKeyChange} />
                <div className="flex items-center justify-between pt-2">
                    <span className="font-medium text-white text-sm">الوضع</span>
                    <div className="flex items-center gap-2 rounded-full p-1 bg-dark/70">
                        <button onClick={() => theme !== 'light' && onThemeChange()} className={`p-2 rounded-full transition-colors ${theme === 'light' ? 'bg-secondary' : 'bg-transparent'}`}>
                             <i className="fas fa-sun text-white"></i>
                        </button>
                        <button onClick={() => theme !== 'dark' && onThemeChange()} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-secondary' : 'bg-transparent'}`}>
                             <i className="fas fa-moon text-white"></i>
                        </button>
                    </div>
                </div>
            </div>

            <button
                onClick={onLogout}
                className="w-full mt-auto p-4 rounded-xl flex items-center justify-center gap-4 text-right transition-all duration-300 bg-dark/50 text-red-400 hover:bg-accent hover:text-white"
            >
                <i className="fas fa-sign-out-alt text-lg w-6 text-center"></i>
                <span className="font-semibold text-base">تسجيل الخروج</span>
            </button>
        </aside>
    );
};

export default Sidebar;