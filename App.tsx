

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { CategoryId, Language, GeneratedContent, User, Word, Category, UserProgress, View } from './types.ts';
import { CATEGORIES, LANGUAGES } from './constants.ts';
import { getCategoryContent } from './services/dataService.ts';
import * as userService from './services/userService.ts';
import * as soundService from './services/soundService.ts';
import Header from './components/Header.tsx';
import GamesSection from './components/content/GamesSection.tsx';
import AuthPage from './components/auth/AuthPage.tsx';
import Lesson from './components/Lesson.tsx';
import ChatSection from './components/content/ChatSection.tsx';
import GrammarSection from './components/content/GrammarSection.tsx';
import FrenchGrammarSection from './components/content/FrenchGrammarSection.tsx';
import ItalianGrammarSection from './components/content/ItalianGrammarSection.tsx';
import SpanishGrammarSection from './components/content/SpanishGrammarSection.tsx';
import GermanGrammarSection from './components/content/GermanGrammarSection.tsx';
import RussianGrammarSection from './components/content/RussianGrammarSection.tsx';
import KoreanGrammarSection from './components/content/KoreanGrammarSection.tsx';
import ChineseGrammarSection from './components/content/ChineseGrammarSection.tsx';
import JapaneseGrammarSection from './components/content/JapaneseGrammarSection.tsx';
import TurkishGrammarSection from './components/content/TurkishGrammarSection.tsx';
import ExploreSection from './components/content/ExploreSection.tsx';
import PlaceholderSection from './components/content/PlaceholderSection.tsx';
import Sidebar from './components/Sidebar.tsx';
import LearningMap from './components/content/LearningMap.tsx';
import ReferralModal from './components/shared/ReferralModal.tsx';
import SupportModal from './components/shared/SupportModal.tsx';
import AccountPage from './components/content/AccountPage.tsx';
import PlacementTest from './components/content/PlacementTest.tsx';
import AdminPage from './components/admin/AdminPage.tsx';
import UpgradeModal from './components/shared/UpgradeModal.tsx';


type Theme = 'light' | 'dark';

const ApiKeyInput: React.FC<{ apiKey: string; onApiKeyChange: (key: string) => void; }> = ({ apiKey, onApiKeyChange }) => {
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
        setTimeout(() => setJustSaved(false), 2000);
    };
    
    const isDirty = localKey !== apiKey;

    return (
        <div>
            <label htmlFor="api-key-input-modal" className="block mb-2 font-medium">مفتاح Gemini API:</label>
             <div className="flex items-center gap-2">
                <div className="relative grow">
                    <input
                        id="api-key-input-modal"
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
                    disabled={!isDirty || justSaved}
                    title={justSaved ? "تم الحفظ!" : (isDirty ? "حفظ" : "محفوظ")}
                    className={`flex-shrink-0 w-12 h-12 rounded-xl text-white transition-all duration-300 flex items-center justify-center text-xl disabled:opacity-60 disabled:cursor-not-allowed
                        ${justSaved ? 'bg-green-500' : isDirty ? 'bg-secondary' : 'bg-dark/70'}
                    `}
                >
                    {justSaved ? <i className="fas fa-check"></i> : <i className="fas fa-save"></i>}
                </button>
            </div>
             <p className="text-xs text-gray-400 mt-2">
               مفتاحك يتم حفظه في متصفحك فقط ولا يتم إرساله إلى خوادمنا.
            </p>
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
    onLogout: () => void;
    onReferralClick: () => void;
    onSupportClick: () => void;
    apiKey: string;
    onApiKeyChange: (key: string) => void;
}> = ({ onClose, languages, selectedLanguage, onLanguageChange, theme, onThemeChange, onLogout, onReferralClick, onSupportClick, apiKey, onApiKeyChange }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-dark/80 backdrop-blur-lg rounded-2xl p-6 w-full max-w-sm border border-white/10 text-white animate-fadeIn" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-secondary text-xl font-bold flex items-center gap-3"><i className="fas fa-cog"></i>الإعدادات</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><i className="fas fa-times text-xl"></i></button>
                </div>
                
                <div className="space-y-6">
                    <div>
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

                     <div className="pt-4 border-t border-white/10">
                        <ApiKeyInput apiKey={apiKey} onApiKeyChange={onApiKeyChange} />
                    </div>
                    
                    <div className="pt-4 border-t border-white/10 space-y-3">
                        <button onClick={onReferralClick} className="w-full p-3 rounded-lg flex items-center justify-center gap-3 text-center transition-all duration-300 bg-dark/70 hover:bg-white/20 text-white font-semibold">
                            <i className="fas fa-gift text-accent"></i>
                            <span>ادعُ صديقًا</span>
                        </button>
                         <button onClick={onSupportClick} className="w-full p-3 rounded-lg flex items-center justify-center gap-3 text-center transition-all duration-300 bg-dark/70 hover:bg-white/20 text-white font-semibold">
                            <i className="fas fa-headset text-blue-400"></i>
                            <span>الدعم الفني</span>
                        </button>
                        <button onClick={onLogout} className="w-full p-3 rounded-lg flex items-center justify-center gap-3 text-center transition-all duration-300 bg-dark/70 text-red-400 hover:bg-red-500 hover:text-white font-semibold">
                             <i className="fas fa-sign-out-alt"></i>
                             <span>تسجيل الخروج</span>
                        </button>
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
        { view: 'dashboard', icon: 'fas fa-map', label: 'الخريطة' },
        { view: 'explore', icon: 'fas fa-book-reader', label: 'استكشف' },
        { view: 'chat', icon: 'fas fa-comments', label: 'الدردشة' },
        { view: 'grammar', icon: 'fas fa-spell-check', label: 'القواعد' },
        { view: 'games', icon: 'fas fa-gamepad', label: 'الألعاب' },
    ];
    
     const isViewActive = (view: View) => {
        if (view === 'dashboard') {
            return ['dashboard', 'lesson', 'placement_test', 'admin', 'account'].includes(currentView);
        }
        return currentView === view;
    };

    return (
        <nav className={`bg-dark/70 backdrop-blur-lg border-t border-white/10 grid grid-cols-5 p-1 ${className}`}>
            {navItems.map(item => (
                 <button
                    key={item.view}
                    onClick={() => onNavigate(item.view as View)}
                    className={`flex flex-col items-center justify-center gap-1.5 flex-1 h-16 rounded-2xl transition-all duration-300
                        ${isViewActive(item.view as View) ? 'bg-secondary text-dark' : 'text-gray-300 hover:text-white'}
                    `}
                >
                    <i className={`text-xl ${item.icon}`}></i>
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
    const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
    const [isProgressLoading, setIsProgressLoading] = useState(true);
    const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [apiKey, setApiKey] = useState<string>('');

     useEffect(() => {
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) {
            setApiKey(savedKey);
        }
    }, []);

    const handleApiKeyChange = (key: string) => {
        setApiKey(key);
        localStorage.setItem('gemini_api_key', key);
    };


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const refId = urlParams.get('ref');
        if (refId) {
            localStorage.setItem('referral_code', refId);
        }

        if (refId) {
            const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
            window.history.replaceState({ path: newUrl }, '', newUrl);
        }
    }, []);

    useEffect(() => {
        const checkAdminStatus = async () => {
            const adminStatus = await userService.isCurrentUserAdmin();
            setIsAdmin(adminStatus);
        };

        const unsubscribe = userService.onAuthChange((user) => {
            setUser(user);
            if (user) {
                checkAdminStatus();
            } else {
                setIsAdmin(false);
            }
            setAuthLoading(false);
        });
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

    const handleUpdatePassword = async (currentPassword: string, newPassword: string) => {
        // This function can throw errors, which will be caught by the calling component (AccountPage)
        await userService.updateUserPassword(currentPassword, newPassword);
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

        try {
            if (isCurrentlyFavorite) {
                await userService.removeFavoriteWord(user.id, word.word, selectedLanguage);
            } else {
                await userService.addFavoriteWord(user.id, word, selectedLanguage);
            }
        } catch (error) {
            console.error("Failed to update favorite word in database:", error);
            // In a real app, you might want to show a toast notification to the user here.
        } finally {
            // Always fetch the latest state from the DB to ensure UI consistency.
            await fetchFavoriteWords();
        }
    }, [user, favoriteWords, selectedLanguage, fetchFavoriteWords]);
    
    const navigateTo = (newView: View) => {
        soundService.playNavigationSound();
         if (newView === 'dashboard') {
            setActiveCategory(null);
        }
        setView(newView);
    };
    
    const handleUnlockClick = () => {
        soundService.playNavigationSound();
        setIsUpgradeModalOpen(true);
    };


    const handleLessonComplete = async (score: number, totalQuestions: number) => {
        if (user && activeCategory) {
            await userService.updateUserProgress(user.id, selectedLanguage, activeCategory, score, totalQuestions);
            await fetchUserProgress(); // Re-fetch progress to update UI
        }
        navigateTo('dashboard');
    };

    const handleStartPlacementTest = () => {
        soundService.playNavigationSound();
        setView('placement_test');
    };

    const handlePlacementTestComplete = async (score: number, totalQuestions: number) => {
        if (!user) return;

        let completedLessons: CategoryId[] = [];
        const percentage = totalQuestions > 0 ? (score / totalQuestions) : 0;
        
        if (percentage >= 0.8) { // Intermediate: 80% or more
            completedLessons = ['alphabet', 'basics', 'greetings', 'numbers', 'colors', 'family', 'food', 'time'];
        } else if (percentage >= 0.4) { // Elementary: 40% to 79%
            completedLessons = ['alphabet', 'basics', 'greetings', 'numbers', 'colors'];
        }

        await userService.updateCompletedLessons(user.id, selectedLanguage, completedLessons);
        
        await fetchUserProgress();
        navigateTo('dashboard');
    };

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
                return <GamesSection 
                            language={currentLanguage} 
                            isSubscribed={user?.is_subscribed || false}
                            onUnlockClick={handleUnlockClick}
                        />;
            case 'explore':
                 return <ExploreSection 
                            language={currentLanguage} 
                            userTier={user?.subscription_tier || 'bronze'}
                            userId={user!.id}
                            onUnlockClick={handleUnlockClick}
                        />;
            case 'grammar':
                const grammarProps = {
                    isSubscribed: user?.is_subscribed || false,
                    onUnlockClick: handleUnlockClick
                };
                switch (selectedLanguage) {
                    case 'en-US': return <GrammarSection {...grammarProps} />;
                    case 'fr-FR': return <FrenchGrammarSection {...grammarProps} />;
                    case 'it-IT': return <ItalianGrammarSection {...grammarProps} />;
                    case 'es-ES': return <SpanishGrammarSection {...grammarProps} />;
                    case 'de-DE': return <GermanGrammarSection {...grammarProps} />;
                    case 'ru-RU': return <RussianGrammarSection {...grammarProps} />;
                    case 'ko-KR': return <KoreanGrammarSection {...grammarProps} />;
                    case 'zh-CN': return <ChineseGrammarSection {...grammarProps} />;
                    case 'ja-JP': return <JapaneseGrammarSection {...grammarProps} />;
                    case 'tr-TR': return <TurkishGrammarSection {...grammarProps} />;
                    default: return <GrammarSection {...grammarProps} />;
                }
             case 'account':
                return <AccountPage 
                            user={user!}
                            onUpdateName={handleUpdateName}
                            onUpdateAvatar={handleUpdateAvatar}
                            onUpdatePassword={handleUpdatePassword}
                            progress={userProgress}
                            favoriteWordsCount={favoriteWords.length}
                            categories={CATEGORIES}
                            isProgressLoading={isProgressLoading}
                        />;
            case 'placement_test':
                return <PlacementTest
                            language={currentLanguage}
                            onComplete={handlePlacementTestComplete}
                        />;
            case 'chat':
                return <ChatSection
                    language={currentLanguage}
                    user={user!}
                    onUnlockClick={handleUnlockClick}
                />;
            case 'admin':
                return isAdmin ? <AdminPage /> : <LearningMap 
                        categories={CATEGORIES}
                        progress={userProgress}
                        onCategoryClick={handleCategoryChange}
                        isSubscribed={user?.is_subscribed || false}
                        onUnlockClick={handleUnlockClick}
                        onStartPlacementTest={handleStartPlacementTest}
                    />;
            case 'dashboard':
            default:
                return (
                     <LearningMap 
                        categories={CATEGORIES}
                        progress={userProgress}
                        onCategoryClick={handleCategoryChange}
                        isSubscribed={user?.is_subscribed || false}
                        onUnlockClick={handleUnlockClick}
                        onStartPlacementTest={handleStartPlacementTest}
                    />
                );
        }
    };
    
    if (authLoading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <i className="fas fa-spinner fa-spin text-secondary text-5xl"></i>
            </div>
        );
    }

    if (!user) {
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
                onReferralClick={() => setIsReferralModalOpen(true)}
                onSupportClick={() => setIsSupportModalOpen(true)}
                apiKey={apiKey}
                onApiKeyChange={handleApiKeyChange}
            />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Header
                    user={user}
                    onLogout={handleLogout}
                    onAccountClick={() => navigateTo('account')}
                    onSettingsClick={() => setIsSettingsOpen(true)}
                    onAdminClick={() => navigateTo('admin')}
                    isAdmin={isAdmin}
                />
                <main className="flex-1 overflow-y-auto lg:bg-transparent bg-light dark:bg-slate-900/70">
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
                    onLogout={() => {
                        setIsSettingsOpen(false);
                        handleLogout();
                    }}
                    onReferralClick={() => {
                        setIsSettingsOpen(false);
                        setIsReferralModalOpen(true);
                    }}
                     onSupportClick={() => {
                        setIsSettingsOpen(false);
                        setIsSupportModalOpen(true);
                    }}
                    apiKey={apiKey}
                    onApiKeyChange={handleApiKeyChange}
                />
            )}
            {isReferralModalOpen && user && (
                <ReferralModal
                    userId={user.id}
                    onClose={() => setIsReferralModalOpen(false)}
                />
            )}
            {isSupportModalOpen && user && (
                <SupportModal
                    user={user}
                    onClose={() => setIsSupportModalOpen(false)}
                />
            )}
            {isUpgradeModalOpen && (
                <UpgradeModal onClose={() => setIsUpgradeModalOpen(false)} />
            )}
        </div>
    );
};

export default App;