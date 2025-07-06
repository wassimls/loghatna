import React from 'react';
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
}

const Sidebar: React.FC<SidebarProps> = ({ 
    languages, selectedLanguage, onLanguageChange, 
    categories, activeCategory, onCategoryChange, 
    theme, onThemeChange
}) => {
    return (
        <aside className="w-full md:w-80 bg-dark/20 backdrop-blur-sm p-6 border-l border-white/10 flex flex-col gap-6 transition-colors duration-500">
             <div className="sidebar-section bg-white/10 dark:bg-dark/50 rounded-2xl p-5 shadow-lg border border-white/10">
                <h2 className="text-secondary mb-5 text-xl font-bold flex items-center gap-3"><i className="fas fa-cog"></i>الإعدادات</h2>
                <div className="language-selector mb-5">
                    <label htmlFor="language" className="block mb-2 font-medium text-white">اختر اللغة:</label>
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
                 <div className="flex items-center justify-between mt-4">
                    <span className="font-medium text-white">الوضع</span>
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

            <div className="sidebar-section flex-1 bg-white/10 dark:bg-dark/50 rounded-2xl p-5 shadow-lg border border-white/10 flex flex-col">
                <h2 className="text-secondary mb-5 text-xl font-bold flex items-center gap-3"><i className="fas fa-folder-open"></i>الفئات</h2>
                <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-3">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => onCategoryChange(cat.id)}
                            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-4 text-right shadow-sm w-full
                                ${activeCategory === cat.id ? 'bg-secondary text-dark shadow-lg' : 'bg-dark/50 text-white hover:bg-white/20'}
                            `}
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-all duration-300 ${activeCategory === cat.id ? 'bg-white/20' : 'bg-dark/70 text-secondary'}`}>
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
