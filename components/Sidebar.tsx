import React, { useState } from 'react';
import { Category, CategoryId, Language } from '../types';

interface SidebarProps {
    languages: Language[];
    selectedLanguage: string;
    onLanguageChange: (languageCode: string) => void;
    categories: Category[];
    activeCategory: CategoryId;
    onCategoryChange: (categoryId: CategoryId) => void;
    theme: 'light' | 'dark';
    onThemeChange: () => void;
    apiKey: string;
    onApiKeyChange: (key: string) => void;
}

const ThemeToggle: React.FC<{ theme: 'light' | 'dark'; onThemeChange: () => void }> = ({ theme, onThemeChange }) => (
    <div className="flex items-center justify-between mt-4">
        <label htmlFor="theme-toggle" className="font-medium text-dark dark:text-light">
            الوضع الداكن
        </label>
        <button
            id="theme-toggle"
            onClick={onThemeChange}
            className="relative inline-flex items-center h-8 w-14 cursor-pointer rounded-full bg-gray-200 dark:bg-slate-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle Dark Mode"
        >
            <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out ${
                    theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                }`}
            >
                <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
                    <i className={`fas fa-sun text-yellow-500 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}></i>
                    <i className={`fas fa-moon text-purple ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}></i>
                </span>
            </span>
        </button>
    </div>
);

const ApiKeyManager: React.FC<{ apiKey: string; onApiKeyChange: (key: string) => void; }> = ({ apiKey, onApiKeyChange }) => {
    const [keyInput, setKeyInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        onApiKeyChange(keyInput);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setKeyInput(apiKey);
        setIsEditing(true);
    };

    return (
        <div className="sidebar-section bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm">
            <h2 className="text-primary mb-4 text-xl font-bold flex items-center gap-3"><i className="fas fa-key"></i>مفتاح OpenRouter API</h2>
            {isEditing ? (
                <div className="space-y-3">
                    <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-dark dark:text-light border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                        placeholder="sk-or-..."
                    />
                    <div className="flex gap-2">
                        <button onClick={handleSave} className="flex-1 btn bg-primary text-white py-2 rounded-lg font-bold">حفظ</button>
                        <button onClick={() => setIsEditing(false)} className="btn bg-gray-200 dark:bg-slate-600 py-2 px-4 rounded-lg font-bold">إلغاء</button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <p className="font-mono text-sm text-gray-500 dark:text-gray-400 overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {apiKey ? `...${apiKey.slice(-4)}` : 'لم يتم تعيين المفتاح'}
                    </p>
                    <button onClick={handleEdit} className="btn bg-gray-200 dark:bg-slate-600 py-2 px-4 rounded-lg font-bold">تعديل</button>
                </div>
            )}
        </div>
    );
};


const Sidebar: React.FC<SidebarProps> = ({ 
    languages, selectedLanguage, onLanguageChange, 
    categories, activeCategory, onCategoryChange, 
    theme, onThemeChange,
    apiKey, onApiKeyChange
}) => {
    return (
        <aside className="w-full md:w-80 bg-light dark:bg-slate-900 p-6 border-l border-gray-200 dark:border-slate-700 flex flex-col gap-6 transition-colors duration-500">
             <div className="sidebar-section bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm">
                <h2 className="text-primary mb-5 text-xl font-bold flex items-center gap-3"><i className="fas fa-cog"></i>الإعدادات العامة</h2>
                <div className="language-selector mb-5">
                    <label htmlFor="language" className="block mb-2 font-medium text-dark dark:text-light">اختر اللغة:</label>
                    <div className="relative">
                        <select
                            id="language"
                            value={selectedLanguage}
                            onChange={(e) => onLanguageChange(e.target.value)}
                            className="w-full p-3 pr-10 border-none rounded-xl font-sans text-base bg-gray-100 dark:bg-slate-700 text-dark dark:text-light cursor-pointer transition-all duration-300 shadow-inner appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-primary">
                             <i className="fas fa-chevron-down"></i>
                        </div>
                    </div>
                </div>
                <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
            </div>

            <ApiKeyManager apiKey={apiKey} onApiKeyChange={onApiKeyChange} />

            <div className="sidebar-section bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm">
                <h2 className="text-primary mb-5 text-xl font-bold flex items-center gap-3"><i className="fas fa-folder"></i>الفئات</h2>
                <div className="grid grid-cols-1 gap-3">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => onCategoryChange(cat.id)}
                            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-4 text-right shadow-sm border border-transparent
                                ${activeCategory === cat.id ? 'bg-gradient-to-r from-primary to-purple text-white shadow-lg' : 'bg-gray-50 dark:bg-slate-700 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/20 dark:hover:border-primary/30'}
                            `}
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-all duration-300 ${activeCategory === cat.id ? 'bg-white text-primary' : 'bg-gray-200 dark:bg-slate-600 text-primary'}`}>
                                <i className={cat.icon}></i>
                            </div>
                            <span className="font-semibold">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            
        </aside>
    );
};

export default Sidebar;