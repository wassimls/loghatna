import React, { useState, useCallback, useEffect } from 'react';
import { CategoryId, Language, GeneratedContent, User, Word, Category } from './types';
import { CATEGORIES, LANGUAGES } from './constants';
import { getCategoryContent } from './services/dataService';
import * as userService from './services/userService';
import Header from './components/Header';
import GamesSection from './components/content/GamesSection';
import AuthPage from './components/auth/AuthPage';
import Lesson from './components/Lesson';
import ChatSection from './components/content/ChatSection';
import GrammarSection from './components/content/GrammarSection';
import FrenchGrammarSection from './components/content/FrenchGrammarSection';
import ItalianGrammarSection from './components/content/ItalianGrammarSection';
import SpanishGrammarSection from './components/content/SpanishGrammarSection';
import GermanGrammarSection from './components/content/GermanGrammarSection';
import RussianGrammarSection from './components/content/RussianGrammarSection';
import KoreanGrammarSection from './components/content/KoreanGrammarSection';
import ChineseGrammarSection from './components/content/ChineseGrammarSection';
import JapaneseGrammarSection from './components/content/JapaneseGrammarSection';
import TurkishGrammarSection from './components/content/TurkishGrammarSection';
import PlaceholderSection from './components/content/PlaceholderSection';
import Sidebar from './components/Sidebar';

type Theme = 'light' | 'dark';
type View = 'dashboard' | 'lesson' | 'games' | 'chat' | 'grammar';

const ApiKeyInput: React.FC<{ apiKey: string; onApiKeyChange: (key: string) => void; forModal?: boolean;}> = ({ apiKey, onApiKeyChange, forModal = false }) => {
    const [showKey, setShowKey] = useState(false);
    return (
        <div className="api-key-section">
            <label htmlFor={forModal ? "api-key-modal" : "api-key-sidebar"} className="block mb-2 font-medium text-white text-sm">مفتاح Gemini API:</label>
            <div className="relative">
                <input
                    id={forModal ? "api-key-modal" : "api-key-sidebar"}
                    type={showKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => onApiKeyChange(e.target.value)}
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
        </div>
    );
};

const SettingsModal: React.FC<{
    onClose: () => void;
    languages: Language[];
    selectedLanguage: string;
    onLanguageChange: (languageCode: string) => void;
    theme: 'light' | 'dark';
    onThemeChange: () => void;
    apiKey: string;
    onApiKeyChange: (key: string) => void;
}> = ({ onClose, languages, selectedLanguage, onLanguageChange, theme, onThemeChange, apiKey, onApiKeyChange }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-dark/80 backdrop-blur-lg rounded-2xl p-6 w-full max-w-sm border border-white/10 text-white animate-fadeIn" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-secondary text-xl font-bold flex items-center gap-3"><i className="fas fa-cog"></i>الإعدادات</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><i className="fas fa-times text-xl"></i></button>
                </div>
                
                <div className="space-y-6">
                    <div className="language-selector">
                        <label htmlFor="language-modal" className="block mb-2 font-medium">اختر اللغة:</label>
                        <div className="relative">
                            <select
                                id="language-modal"
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

                    <ApiKeyInput apiKey={apiKey} onApiKeyChange={onApiKeyChange} forModal={true} />

                    <div className="flex items-center justify-between">
                        <span className="font-medium">الوضع</span>
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
            </div>
        </div>
    );
};

const BottomNav: React.FC<{
    currentView: View;
    onNavigate: (view: View) => void;
    className?: string;
}> = ({ currentView, onNavigate, className = '' }) => {
    const navItems = [
        { view: 'dashboard', icon: 'fa-book-open', label: 'الدروس' },
        { view: 'grammar', icon: 'fa-spell-check', label: 'القواعد' },
        { view: 'games', icon: 'fa-gamepad', label: 'الألعاب' },
        { view: 'chat', icon: 'fa-comments', label: 'الدردشة' },
    ];
    
    const isViewActive = (view: View) => {
        if (view === 'dashboard') {
            return currentView === 'dashboard' || currentView === 'lesson';
        }
        return currentView === view;
    };

    return (
        <nav className={`bg-dark/70 backdrop-blur-md border-t border-white/10 flex justify-around ${className}`}>
            {navItems.map(item => (
                <button
                    key={item.view}
                    onClick={() => onNavigate(item.view as View)}
                    className={`flex flex-col items-center justify-center gap-1 p-2 w-full transition-colors duration-300 ${isViewActive(item.view as View) ? 'text-secondary' : 'text-gray-400 hover:text-white'}`}
                >
                    <i className={`fas ${item.icon} text-xl h-6`}></i>
                    <span className="text-xs font-bold">{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [appIsLoading, setAppIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<CategoryId>('basics');
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
    
    const [content, setContent] = useState<GeneratedContent | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');
    const [currentView, setCurrentView] = useState<View>('dashboard');

    const [favoriteWords, setFavoriteWords] = useState<Word[]>([]);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('geminiApiKey') || '');

    const handleApiKeyChange = (newKey: string) => {
        setApiKey(newKey);
        localStorage.setItem('geminiApiKey', newKey);
    };

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    useEffect(() => {
        const unsubscribe = userService.onAuthChange((user) => {
            setCurrentUser(user);
            setAppIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!currentUser) return;

        const fetchFavorites = async () => {
            const words = await userService.getFavoriteWords(currentUser.id, selectedLanguage.code);
            setFavoriteWords(words);
        };

        fetchFavorites();
    }, [currentUser, selectedLanguage]);

    const loadContent = useCallback(async (category: CategoryId) => {
        if (!currentUser) return;
        
        setIsLoading(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            const result = getCategoryContent(selectedLanguage.code, category);
            
            if (!result) {
                throw new Error('لا يوجد محتوى متاح لهذه الفئة باللغة المختارة.');
            }
            
            setContent(result);
            setCurrentView('lesson');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`فشل في تحميل المحتوى. ${errorMessage}`);
            setCurrentView('dashboard');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [selectedLanguage, currentUser]);

    const handleCategoryChange = (categoryId: CategoryId) => {
        setActiveCategory(categoryId);
        loadContent(categoryId);
    };

    const handleLanguageChange = (languageCode: string) => {
        const lang = LANGUAGES.find(l => l.code === languageCode);
        if (lang) {
            setSelectedLanguage(lang);
            if(currentView === 'lesson'){
                loadContent(activeCategory);
            }
        }
    };
    
    const handleThemeChange = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    
    const handleUpdateName = async (newName: string) => {
        if (!currentUser) throw new Error("لا يوجد مستخدم مسجل الدخول.");
        
        try {
            const updatedUser = await userService.updateUserName(newName.trim());
            setCurrentUser(updatedUser);
        } catch (err) {
            console.error("Failed to update name in App.tsx:", err);
            throw err;
        }
    };

    const handleLogout = async () => {
        await userService.logout();
        setCurrentUser(null);
        setCurrentView('dashboard');
    };
    
    const handleLessonComplete = () => {
        setCurrentView('dashboard');
        setContent(null); // Clear old lesson content
    };

    const handleToggleFavorite = async (word: Word) => {
        if (!currentUser) return;
        
        const isFavorite = favoriteWords.some(fw => fw.word === word.word);

        try {
            if (isFavorite) {
                await userService.removeFavoriteWord(currentUser.id, word.word, selectedLanguage.code);
                setFavoriteWords(prev => prev.filter(fw => fw.word !== word.word));
            } else {
                await userService.addFavoriteWord(currentUser.id, word, selectedLanguage.code);
                setFavoriteWords(prev => [...prev, word]);
            }
        } catch (error) {
            console.error("Failed to toggle favorite:", error);
        }
    };
    
    const renderCategoryList = () => (
        <div className="p-4 md:p-6">
            <h2 className="text-white mb-5 text-2xl font-bold flex items-center gap-3">
                <i className="fas fa-book-open text-secondary"></i>
                اختر درساً
            </h2>
            <div className="space-y-3">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className="p-4 rounded-xl transition-all duration-300 flex items-center gap-4 text-right w-full bg-dark/50 text-white hover:bg-white/20 active:scale-95"
                    >
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl bg-dark/70 text-secondary">
                            <i className={cat.icon}></i>
                        </div>
                        <div className="flex-1">
                            <span className="font-semibold text-lg">{cat.name}</span>
                        </div>
                        <i className="fas fa-chevron-left mr-auto text-gray-400"></i>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex-1 p-8 flex justify-center items-center">
                    <div className="text-center">
                        <i className="fas fa-spinner fa-spin text-secondary text-4xl mb-4"></i>
                        <p className="text-lg text-white">جاري تحضير الدرس...</p>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex-1 p-8 flex flex-col justify-center items-center text-center animate-fadeIn bg-white/10 rounded-2xl m-4">
                    <i className="fas fa-exclamation-triangle text-accent text-5xl mb-4"></i>
                    <h3 className="text-2xl font-bold text-white mb-2">حدث خطأ</h3>
                    <p className="text-gray-300 mb-6 max-w-md">{error}</p>
                    <button 
                        onClick={() => loadContent(activeCategory)} 
                        className="btn bg-gradient-to-r from-accent to-pink-600 text-white py-3 px-8 rounded-full font-bold transition-transform duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
                    >
                        <i className="fas fa-sync-alt"></i>
                        حاول مرة أخرى
                    </button>
                </div>
            );
        }
    
        switch (currentView) {
            case 'lesson':
                return content && currentUser ? (
                    <Lesson 
                        content={content} 
                        language={selectedLanguage} 
                        onComplete={handleLessonComplete}
                        favoriteWords={favoriteWords}
                        onToggleFavorite={handleToggleFavorite}
                    />
                ) : renderCategoryList();
            case 'games':
                return <GamesSection language={selectedLanguage} apiKey={apiKey} />;
            case 'chat':
                return currentUser ? <ChatSection language={selectedLanguage} user={currentUser} apiKey={apiKey} /> : renderCategoryList();
            case 'grammar':
                if (selectedLanguage.code === 'en-US') return <GrammarSection />;
                if (selectedLanguage.code === 'fr-FR') return <FrenchGrammarSection />;
                if (selectedLanguage.code === 'it-IT') return <ItalianGrammarSection />;
                if (selectedLanguage.code === 'es-ES') return <SpanishGrammarSection />;
                if (selectedLanguage.code === 'de-DE') return <GermanGrammarSection />;
                if (selectedLanguage.code === 'ru-RU') return <RussianGrammarSection />;
                if (selectedLanguage.code === 'ko-KR') return <KoreanGrammarSection />;
                if (selectedLanguage.code === 'zh-CN') return <ChineseGrammarSection />;
                if (selectedLanguage.code === 'ja-JP') return <JapaneseGrammarSection />;
                if (selectedLanguage.code === 'tr-TR') return <TurkishGrammarSection />;
                return <PlaceholderSection title="مركز القواعد" icon="fa-spell-check" badge={selectedLanguage.name} />;
            case 'dashboard':
            default:
                return renderCategoryList();
        }
    };
    
    if (appIsLoading) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-space-start to-space-end p-4">
                 <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-secondary text-6xl mb-6"></i>
                    <h2 className="text-2xl font-bold text-white">جاري التحقق من الهوية...</h2>
                </div>
            </div>
        )
    }
    
    if (!currentUser) {
        return <AuthPage />;
    }

    return (
        <div className="flex flex-col md:flex-row h-full w-full bg-gradient-to-br from-space-start to-space-end text-white overflow-hidden">
             <Sidebar
                className="hidden md:flex"
                currentView={currentView}
                onNavigate={setCurrentView}
                languages={LANGUAGES}
                selectedLanguage={selectedLanguage.code}
                onLanguageChange={handleLanguageChange}
                theme={theme}
                onThemeChange={handleThemeChange}
                onLogout={handleLogout}
                apiKey={apiKey}
                onApiKeyChange={handleApiKeyChange}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    user={currentUser}
                    onLogout={handleLogout}
                    onUpdateName={handleUpdateName}
                    onSettingsClick={() => setIsSettingsOpen(true)}
                />
                <main className="flex-1 overflow-y-auto">
                    {renderContent()}
                </main>
                <BottomNav 
                    className="md:hidden" 
                    currentView={currentView} 
                    onNavigate={(view) => setCurrentView(view)} 
                />
            </div>
            
            {isSettingsOpen && (
                <SettingsModal
                    onClose={() => setIsSettingsOpen(false)}
                    languages={LANGUAGES}
                    selectedLanguage={selectedLanguage.code}
                    onLanguageChange={handleLanguageChange}
                    theme={theme}
                    onThemeChange={handleThemeChange}
                    apiKey={apiKey}
                    onApiKeyChange={handleApiKeyChange}
                />
            )}
        </div>
    );
};

export default App;
