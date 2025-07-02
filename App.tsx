


import React, { useState, useCallback, useEffect } from 'react';
import { CategoryId, Language, GeneratedContent, User, Word } from './types';
import { CATEGORIES, LANGUAGES } from './constants';
import { getCategoryContent } from './services/dataService';
import * as userService from './services/userService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GamesSection from './components/content/GamesSection';
import AuthPage from './components/auth/AuthPage';
import Lesson from './components/Lesson';
import ChatSection from './components/content/ChatSection';

type Theme = 'light' | 'dark';
type View = 'dashboard' | 'lesson' | 'games' | 'chat';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [appIsLoading, setAppIsLoading] = useState(true);
    const [configError, setConfigError] = useState<string | null>(null);
    const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('openrouter_api_key') || '');
    const [activeCategory, setActiveCategory] = useState<CategoryId>('basics');
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
    
    const [content, setContent] = useState<GeneratedContent | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
    const [currentView, setCurrentView] = useState<View>('dashboard');

    const [favoriteWords, setFavoriteWords] = useState<Word[]>([]);
    
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
        try {
            const unsubscribe = userService.onAuthChange((user) => {
                setCurrentUser(user);
                setAppIsLoading(false);
            });
            return () => unsubscribe();
        } catch (e) {
            if (e instanceof Error) {
                setConfigError(e.message);
            } else {
                setConfigError('حدث خطأ غير معروف أثناء تهيئة التطبيق.');
            }
            setAppIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!currentUser) return;

        const fetchFavorites = async () => {
            const words = await userService.getFavoriteWords(currentUser.id, selectedLanguage.code);
            setFavoriteWords(words);
        };

        fetchFavorites();
    }, [currentUser, selectedLanguage]);

    const handleApiKeyChange = useCallback((newKey: string) => {
        setApiKey(newKey);
        localStorage.setItem('openrouter_api_key', newKey);
    }, []);


    const loadContent = useCallback(async (category: CategoryId) => {
        if (!currentUser) return;
        
        setIsLoading(true);
        setError(null);
        try {
            // Use a timeout to allow the loading spinner to show, improving UX.
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
            // Optionally, show an error to the user
        }
    };

    const renderDashboard = () => (
        <div className="p-8 flex-1 flex flex-col items-center justify-center text-center animate-fadeIn bg-light dark:bg-slate-900/70">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-purple/10 dark:from-primary/20 dark:to-purple/20 text-primary rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-book-open text-5xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-dark dark:text-light mb-2">مرحباً بك في لغتنا!</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md">
                اختر فئة من القائمة الجانبية لبدء درس جديد، أو جرب الألعاب والدردشة لتنمية مهاراتك.
            </p>
            <div className="flex gap-4 mt-8">
                <button onClick={() => setCurrentView('games')} className="btn bg-accent text-white py-3 px-6 rounded-full font-bold transition-transform hover:scale-105">
                    <i className="fas fa-gamepad mr-2"></i>
                    الألعاب
                </button>
                 <button onClick={() => setCurrentView('chat')} className="btn bg-secondary text-white py-3 px-6 rounded-full font-bold transition-transform hover:scale-105">
                    <i className="fas fa-comments mr-2"></i>
                    الدردشة
                </button>
            </div>
        </div>
    );
    
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex-1 p-8 flex justify-center items-center">
                    <div className="text-center">
                        <i className="fas fa-spinner fa-spin text-primary text-4xl mb-4"></i>
                        <p className="text-lg text-dark dark:text-light">جاري تحضير الدرس...</p>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex-1 p-8 flex flex-col justify-center items-center text-center animate-fadeIn">
                    <i className="fas fa-exclamation-triangle text-secondary text-5xl mb-4"></i>
                    <h3 className="text-2xl font-bold text-dark dark:text-light mb-2">حدث خطأ</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">{error}</p>
                    <button 
                        onClick={() => loadContent(activeCategory)} 
                        className="btn bg-gradient-to-r from-primary to-purple text-white py-3 px-8 rounded-full font-bold transition-transform duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
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
                ) : renderDashboard();
            case 'games':
                return <GamesSection language={selectedLanguage} apiKey={apiKey} />;
            case 'chat':
                return currentUser ? <ChatSection language={selectedLanguage} user={currentUser} apiKey={apiKey} /> : renderDashboard();
            case 'dashboard':
            default:
                return renderDashboard();
        }
    };
    
    if (configError) {
        return (
             <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 dark:bg-slate-900 p-4 text-center">
                 <div className="w-24 h-24 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-6">
                    <i className="fas fa-cogs text-5xl text-red-500"></i>
                </div>
                <h2 className="text-3xl font-bold text-red-800 dark:text-red-200 mb-4">خطأ في الإعدادات</h2>
                <p className="text-lg text-red-600 dark:text-red-300 max-w-2xl bg-red-100 dark:bg-red-900/50 p-4 rounded-lg font-mono">
                    {configError}
                </p>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                    لإصلاح هذا، يرجى اتباع التعليمات الموجودة في رسالة الخطأ أعلاه.
                </p>
            </div>
        )
    }

    if (appIsLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#f8f0ff] dark:from-slate-900 dark:to-slate-800 p-4">
                 <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-primary text-6xl mb-6"></i>
                    <h2 className="text-2xl font-bold text-dark dark:text-light">جاري التحقق من الهوية...</h2>
                </div>
            </div>
        )
    }
    
    if (!currentUser) {
        return <AuthPage />;
    }

    return (
        <div className="max-w-7xl mx-auto bg-white/95 dark:bg-slate-800/80 rounded-3xl shadow-2xl shadow-purple-200/50 dark:shadow-purple-900/50 overflow-hidden backdrop-blur-xl border border-white/50 dark:border-slate-700/50">
            <Header 
                user={currentUser}
                onLogout={handleLogout}
            />
            <nav className="bg-white dark:bg-slate-800/80 p-2 flex justify-center gap-2 border-b border-gray-200 dark:border-slate-700">
                <button onClick={() => setCurrentView('dashboard')} className={`px-4 py-2 text-sm font-bold rounded-full ${currentView === 'dashboard' || currentView === 'lesson' ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
                    <i className="fas fa-book-open mr-2"></i>الدروس
                </button>
                 <button onClick={() => setCurrentView('games')} className={`px-4 py-2 text-sm font-bold rounded-full ${currentView === 'games' ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
                    <i className="fas fa-gamepad mr-2"></i>الألعاب
                </button>
                 <button onClick={() => setCurrentView('chat')} className={`px-4 py-2 text-sm font-bold rounded-full ${currentView === 'chat' ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
                    <i className="fas fa-comments mr-2"></i>الدردشة
                </button>
            </nav>
            <main className="flex flex-col md:flex-row min-h-[600px] relative z-10">
                <Sidebar
                    languages={LANGUAGES}
                    selectedLanguage={selectedLanguage.code}
                    onLanguageChange={handleLanguageChange}
                    categories={CATEGORIES}
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                    theme={theme}
                    onThemeChange={handleThemeChange}
                    apiKey={apiKey}
                    onApiKeyChange={handleApiKeyChange}
                />
                <div className="flex-1 bg-white dark:bg-slate-800 flex flex-col transition-colors duration-500">
                    {renderContent()}
                </div>
            </main>
            <footer className="text-center p-8 bg-dark/95 dark:bg-black/50 text-white dark:text-gray-300 text-base">
                <p>© 2024 لغتنا - جميع الحقوق محفوظة | تم التصميم بحب لتطوير المهارات اللغوية</p>
            </footer>
        </div>
    );
};

export default App;