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


type Theme = 'light' | 'dark';
type View = 'dashboard' | 'lesson' | 'games' | 'chat' | 'grammar';

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
    const [openRouterApiKey, setOpenRouterApiKey] = useState<string>(() => localStorage.getItem('openRouterApiKey') || '');

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

    const handleApiKeyChange = useCallback((key: string) => {
        setOpenRouterApiKey(key);
        localStorage.setItem('openRouterApiKey', key);
    }, []);
    
    const handleUpdateName = async (newName: string) => {
        if (!currentUser) throw new Error("لا يوجد مستخدم مسجل الدخول.");
        
        try {
            const updatedUser = await userService.updateUserName(newName.trim());
            setCurrentUser(updatedUser);
        } catch (err) {
            console.error("Failed to update name in App.tsx:", err);
            // Re-throw the error so the calling component (Header) can handle it locally.
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
            // Optionally, show an error to the user
        }
    };

    const renderDashboard = () => (
        <div className="p-8 flex-1 flex flex-col items-center justify-center text-center animate-fadeIn">
            <div className="w-36 h-36 bg-gradient-to-br from-secondary/80 to-yellow-300 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-yellow-500/30">
                <i className="fas fa-rocket text-6xl text-dark"></i>
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">استكشف حدودك!</h2>
            <p className="text-gray-300 text-lg max-w-md">
                اختر فئة من القائمة الجانبية لبدء رحلتك في تعلم لغة جديدة، أو انطلق إلى الألعاب والدردشة.
            </p>
            <div className="flex gap-4 mt-8">
                <button onClick={() => setCurrentView('games')} className="btn bg-secondary text-dark py-3 px-8 rounded-full font-bold transition-transform hover:scale-105 shadow-lg">
                    <i className="fas fa-gamepad mr-2"></i>
                    انطلق للألعاب
                </button>
                 <button onClick={() => setCurrentView('chat')} className="btn bg-accent text-white py-3 px-8 rounded-full font-bold transition-transform hover:scale-105 shadow-lg">
                    <i className="fas fa-comments mr-2"></i>
                    دردشة فضائية
                </button>
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
                <div className="flex-1 p-8 flex flex-col justify-center items-center text-center animate-fadeIn bg-white/10 rounded-2xl">
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
                ) : renderDashboard();
            case 'games':
                return <GamesSection language={selectedLanguage} openRouterApiKey={openRouterApiKey} />;
            case 'chat':
                return currentUser ? <ChatSection language={selectedLanguage} user={currentUser} openRouterApiKey={openRouterApiKey} /> : renderDashboard();
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
                return renderDashboard();
        }
    };
    
    if (appIsLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-space-start to-space-end p-4">
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
        <div className="min-h-screen bg-gradient-to-br from-space-start to-space-end text-white">
            <div className="max-w-screen-2xl mx-auto">
                <Header 
                    user={currentUser}
                    onLogout={handleLogout}
                    onUpdateName={handleUpdateName}
                />
                <nav className="bg-dark/50 p-2 flex justify-center gap-2 border-b border-t border-white/10 backdrop-blur-sm">
                    <button onClick={() => setCurrentView('dashboard')} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${currentView === 'dashboard' || currentView === 'lesson' ? 'bg-secondary text-dark' : 'text-white hover:bg-white/10'}`}>
                        <i className="fas fa-book-open mr-2"></i>الدروس
                    </button>
                     <button onClick={() => setCurrentView('grammar')} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${currentView === 'grammar' ? 'bg-secondary text-dark' : 'text-white hover:bg-white/10'}`}>
                        <i className="fas fa-spell-check mr-2"></i>القواعد
                    </button>
                    <button onClick={() => setCurrentView('games')} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${currentView === 'games' ? 'bg-secondary text-dark' : 'text-white hover:bg-white/10'}`}>
                        <i className="fas fa-gamepad mr-2"></i>الألعاب
                    </button>
                    <button onClick={() => setCurrentView('chat')} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${currentView === 'chat' ? 'bg-secondary text-dark' : 'text-white hover:bg-white/10'}`}>
                        <i className="fas fa-comments mr-2"></i>الدردشة
                    </button>
                </nav>
                <main className="flex flex-col md:flex-row min-h-[calc(100vh_-_200px)] relative z-10">
                    <Sidebar
                        languages={LANGUAGES}
                        selectedLanguage={selectedLanguage.code}
                        onLanguageChange={handleLanguageChange}
                        categories={CATEGORIES}
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                        theme={theme}
                        onThemeChange={handleThemeChange}
                        openRouterApiKey={openRouterApiKey}
                        onApiKeyChange={handleApiKeyChange}
                    />
                    <div className="flex-1 flex flex-col bg-dark/20">
                        {renderContent()}
                    </div>
                </main>
                <footer className="text-center p-4 bg-dark/50 text-gray-400 text-sm border-t border-white/10">
                    <p>© 2024 MindLingo - جميع الحقوق محفوظة | استكشف اللغات بأسلوب جديد</p>
                </footer>
            </div>
        </div>
    );
};

export default App;