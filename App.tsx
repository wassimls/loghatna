import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { CategoryId, Language, GeneratedContent, User, Word, Category, UserProgress } from './types';
import { CATEGORIES, LANGUAGES } from './constants';
import { getCategoryContent } from './services/dataService';
import * as userService from './services/userService';
import * as soundService from './services/soundService';
import Header from './components/Header';
import GamesSection from './components/content/GamesSection';
import AuthPage from './components/auth/AuthPage';
import PaymentSuccessPage from './components/auth/PaymentSuccessPage';
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
import ProgressSection from './components/content/ProgressSection';
import LearningMap from './components/content/LearningMap';
import ReferralModal from './components/shared/ReferralModal';

type Theme = 'light' | 'dark';
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

const SettingsModal: React.FC<{
    onClose: () => void;
    languages: Language[];
    selectedLanguage: string;
    onLanguageChange: (languageCode: string) => void;
    theme: 'light' | 'dark';
    onThemeChange: () => void;
    apiKey: string;
    onApiKeyChange: (key: string) => void;
    onReferralClick: () => void;
}> = ({ onClose, languages, selectedLanguage, onLanguageChange, theme, onThemeChange, apiKey, onApiKeyChange, onReferralClick }) => {
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

                <div className="mt-8 border-t border-white/10 pt-4">
                     <button
                        onClick={onReferralClick}
                        className="w-full p-3 rounded-xl flex items-center justify-center gap-3 text-center transition-all duration-300 bg-gradient-to-r from-accent to-pink-500 text-white shadow-lg hover:scale-105"
                    >
                        <i className="fas fa-gift"></i>
                        <span className="font-semibold text-base">ادعُ صديقًا</span>
                    </button>
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
        { view: 'dashboard', icon: 'fa-map-signs', label: 'الخريطة' },
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
        <nav className={`bg-dark/70 backdrop-blur-lg border-t border-white/10 flex justify-around p-2.5 ${className}`}>
            {navItems.map(item => (
                 <button
                    key={item.view}
                    onClick={() => onNavigate(item.view as View)}
                    className={`flex flex-col items-center justify-center gap-1.5 w-16 h-16 rounded-2xl transition-all duration-300
                        ${isViewActive(item.view as View) ? 'bg-secondary text-dark' : 'text-gray-300 hover:text-white'}
                    `}
                >
                    <i className={`fas ${item.icon} text-xl`}></i>
                    <span className="text-xs font-bold">{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0].code);
    const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
    const [view, setView] = useState<View>('dashboard');
    const [theme, setTheme] = useState<Theme>('dark');
    const [favoriteWords, setFavoriteWords] = useState<Word[]>([]);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
    const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
    const [isProgressLoading, setIsProgressLoading] = useState(true);
    const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
    const [isPaymentFlow, setIsPaymentFlow] = useState(false);

    useEffect(() => {
        if (window.location.pathname.startsWith('/payment-success')) {
            setIsPaymentFlow(true);
        }
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const refId = urlParams.get('ref');
        if (refId) {
            localStorage.setItem('referral_code', refId);
            const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
            window.history.replaceState({ path: newUrl }, '', newUrl);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = userService.onAuthChange(setUser);
        return () => unsubscribe();
    }, []);
    
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const fetchUserProgress = useCallback(async () => {
        if (user) {
            setIsProgressLoading(true);
            const progress = await userService.getUserProgress(user.id, selectedLanguage);
            setUserProgress(progress);
            setIsProgressLoading(false);
        }
    }, [user, selectedLanguage]);
    
    useEffect(() => {
        fetchUserProgress();
    }, [fetchUserProgress]);

    const handleApiKeyChange = (key: string) => {
        setApiKey(key);
        localStorage.setItem('gemini_api_key', key);
    };

    const fetchFavoriteWords = useCallback(async () => {
        if (user) {
            const words = await userService.getFavoriteWords(user.id, selectedLanguage);
            setFavoriteWords(words);
        }
    }, [user, selectedLanguage]);

    useEffect(() => {
        fetchFavoriteWords();
    }, [fetchFavoriteWords]);

    const handleLogout = async () => {
        await userService.logout();
    };

    const handleUpdateName = async (newName: string) => {
        if(user) {
           const updatedUser = await userService.updateUserName(newName);
           setUser(updatedUser);
        }
    };
    
    const handleUpdateAvatar = async (newAvatar: string) => {
        if (user) {
            const updatedUser = await userService.updateUserAvatar(newAvatar);
            setUser(updatedUser);
        }
    };

    const handleLanguageChange = useCallback((langCode: string) => {
        soundService.playNavigationSound();
        setSelectedLanguage(langCode);
        setActiveCategory(null);
        setView('dashboard');
    }, []);

    const handleCategoryChange = useCallback((catId: CategoryId) => {
        soundService.playNavigationSound();
        setActiveCategory(catId);
        setView('lesson');
    }, []);

    const toggleFavoriteWord = useCallback(async (word: Word) => {
        if (!user) return;
        
        soundService.playGenericClick();
        const isCurrentlyFavorite = favoriteWords.some(favWord => favWord.word === word.word);

        if (isCurrentlyFavorite) {
            await userService.removeFavoriteWord(user.id, word.word, selectedLanguage);
        } else {
            await userService.addFavoriteWord(user.id, word, selectedLanguage);
        }
        await fetchFavoriteWords();
    }, [user, favoriteWords, selectedLanguage, fetchFavoriteWords]);
    
    const navigateTo = (newView: View) => {
        soundService.playNavigationSound();
         if (newView === 'dashboard') {
            setActiveCategory(null);
        }
        setView(newView);
    };

    const handleLessonComplete = async (score: number, totalQuestions: number) => {
        if (user && activeCategory) {
            await userService.updateUserProgress(user.id, selectedLanguage, activeCategory, score, totalQuestions);
            await fetchUserProgress(); // Re-fetch progress to update UI
        }
        navigateTo('dashboard');
    };

    const isReady = !!user;

    const currentLanguage = useMemo(() => LANGUAGES.find(l => l.code === selectedLanguage)!, [selectedLanguage]);

    const generatedContent = useMemo(() => {
        if (activeCategory) {
            return getCategoryContent(selectedLanguage, activeCategory);
        }
        return null;
    }, [selectedLanguage, activeCategory]);

    const toggleTheme = () => {
        soundService.playGenericClick();
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    const renderContent = () => {
        if (!isReady) return <AuthPage />;

        switch (view) {
            case 'lesson':
                if (generatedContent) {
                    return <Lesson 
                                content={generatedContent} 
                                language={currentLanguage} 
                                onComplete={handleLessonComplete}
                                favoriteWords={favoriteWords}
                                onToggleFavorite={toggleFavoriteWord}
                            />;
                }
                return <PlaceholderSection title="اختر فئة" icon="fa-hand-pointer" badge="ابدأ رحلتك" />;
            case 'games':
                return <GamesSection language={currentLanguage} apiKey={apiKey} />;
            case 'chat':
                return <ChatSection language={currentLanguage} user={user!} apiKey={apiKey} />;
            case 'progress':
                return <ProgressSection 
                            progress={userProgress} 
                            favoriteWordsCount={favoriteWords.length}
                            categories={CATEGORIES}
                            isLoading={isProgressLoading}
                        />;
            case 'grammar':
                switch (selectedLanguage) {
                    case 'en-US': return <GrammarSection />;
                    case 'fr-FR': return <FrenchGrammarSection />;
                    case 'it-IT': return <ItalianGrammarSection />;
                    case 'es-ES': return <SpanishGrammarSection />;
                    case 'de-DE': return <GermanGrammarSection />;
                    case 'ru-RU': return <RussianGrammarSection />;
                    case 'ko-KR': return <KoreanGrammarSection />;
                    case 'zh-CN': return <ChineseGrammarSection />;
                    case 'ja-JP': return <JapaneseGrammarSection />;
                    case 'tr-TR': return <TurkishGrammarSection />;
                    default: return <GrammarSection />;
                }
            case 'dashboard':
            default:
                return (
                     <LearningMap 
                        categories={CATEGORIES}
                        progress={userProgress}
                        onCategoryClick={handleCategoryChange}
                    />
                );
        }
    };

    if (isPaymentFlow) {
        return <PaymentSuccessPage />;
    }
    
    if (!isReady) {
        return <AuthPage />;
    }

    return (
        <div className="flex h-full w-full">
            <Sidebar
                className="hidden lg:flex"
                currentView={view}
                onNavigate={navigateTo}
                languages={LANGUAGES}
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
                theme={theme}
                onThemeChange={toggleTheme}
                onLogout={handleLogout}
                apiKey={apiKey}
                onApiKeyChange={handleApiKeyChange}
                onReferralClick={() => setIsReferralModalOpen(true)}
            />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Header
                    user={user}
                    onLogout={handleLogout}
                    onUpdateName={handleUpdateName}
                    onUpdateAvatar={handleUpdateAvatar}
                    onSettingsClick={() => setIsSettingsOpen(true)}
                />
                <main className="flex-1 overflow-y-auto bg-light dark:bg-slate-900/70">
                    {renderContent()}
                </main>
                <BottomNav
                    className="lg:hidden"
                    currentView={view}
                    onNavigate={navigateTo}
                />
            </div>
            {isSettingsOpen && (
                <SettingsModal
                    onClose={() => setIsSettingsOpen(false)}
                    languages={LANGUAGES}
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={handleLanguageChange}
                    theme={theme}
                    onThemeChange={toggleTheme}
                    apiKey={apiKey}
                    onApiKeyChange={handleApiKeyChange}
                    onReferralClick={() => {
                        setIsSettingsOpen(false);
                        setIsReferralModalOpen(true);
                    }}
                />
            )}
            {isReferralModalOpen && user && (
                <ReferralModal
                    userId={user.id}
                    onClose={() => setIsReferralModalOpen(false)}
                />
            )}
        </div>
    );
};

export default App;
