import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Language, GamesCollection, MatchGame, MissingWordGame, SentenceScrambleGame } from '../../types';
import { getGames } from '../../services/dataService';

interface GamesSectionProps {
    language: Language;
    apiKey: string;
}

const GameCard: React.FC<{ title: string; description: string; icon: string; children: React.ReactNode }> = ({ title, description, icon, children }) => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-2 border-t-4 border-accent/50 dark:border-accent flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-accent to-primary p-6 text-white text-center">
            <i className={`fas ${icon} text-3xl mb-3`}></i>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="opacity-90">{description}</p>
        </div>
        <div className="p-6 flex-grow flex flex-col">
            {children}
        </div>
    </div>
);

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

// --- Match Game Component ---
const MatchGameCard: React.FC<{ game: MatchGame; onGameComplete: () => void; }> = ({ game, onGameComplete }) => {
    type Selection = { id: string; type: 'word' | 'translation'; content: string };
    
    const [selection, setSelection] = useState<Selection | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
    const [incorrectPair, setIncorrectPair] = useState<[Selection, Selection] | null>(null);

    const gameItems = useMemo(() => {
        const words = game.items.map(i => ({ id: i.id, type: 'word' as const, content: i.word }));
        const translations = game.items.map(i => ({ id: i.id, type: 'translation' as const, content: i.translation }));
        return shuffleArray([...words, ...translations]);
    }, [game.items]);

    const handleSelect = (item: Selection) => {
        if (matchedPairs.includes(item.id) || incorrectPair) return;

        if (!selection) {
            setSelection(item);
        } else {
            if (selection.id === item.id && selection.type !== item.type) {
                setMatchedPairs(prev => [...prev, item.id]);
                setSelection(null);
            } else if (selection.content !== item.content) {
                setIncorrectPair([selection, item]);
                setTimeout(() => {
                    setIncorrectPair(null);
                    setSelection(null);
                }, 1000);
            }
        }
    };
    
    const isFinished = matchedPairs.length === game.items.length;

    useEffect(() => {
        if (isFinished) {
            const timer = setTimeout(() => {
                onGameComplete();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isFinished, onGameComplete]);

    return (
        <GameCard title={game.title} description={game.description} icon="fa-puzzle-piece">
            <div className="grid grid-cols-2 gap-4 flex-grow content-center">
                {gameItems.map((item, index) => {
                    const isSelected = selection?.content === item.content && selection?.id === item.id;
                    const isMatched = matchedPairs.includes(item.id);
                    const isIncorrect = incorrectPair?.some(p => p.content === item.content);
                    
                    const baseClasses = "p-4 rounded-xl cursor-pointer transition-all duration-300 text-center font-semibold text-lg border-2 dark:text-light";
                    const stateClasses = isMatched
                        ? 'bg-accent/20 dark:bg-accent/30 border-accent text-accent-dark dark:text-accent-light scale-95 opacity-70 cursor-not-allowed'
                        : isSelected
                        ? 'bg-purple/20 dark:bg-purple/30 border-purple'
                        : isIncorrect
                        ? 'bg-secondary/20 dark:bg-secondary/30 border-secondary animate-shake'
                        : 'bg-light dark:bg-slate-700 hover:bg-primary/10 dark:hover:bg-primary/20 border-transparent';

                    return (
                        <button key={index} onClick={() => handleSelect(item)} className={`${baseClasses} ${stateClasses}`} disabled={isMatched}>
                            {item.content}
                        </button>
                    );
                })}
            </div>
             {isFinished && (
                <div className="mt-4 p-3 text-center rounded-lg bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-200 font-bold animate-fadeIn">
                    🎉 أحسنت! سيتم تحميل لعبة جديدة...
                </div>
            )}
        </GameCard>
    );
};

// --- Missing Word Game Component ---
const MissingWordGameCard: React.FC<{ game: MissingWordGame; onGameComplete: () => void; }> = ({ game, onGameComplete }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const isCorrect = selectedAnswer === game.correctWord;
    const hasAnswered = selectedAnswer !== null;

    const sentenceParts = game.sentence.split('{blank}');

    useEffect(() => {
        if (isCorrect) {
            const timer = setTimeout(() => {
                onGameComplete();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isCorrect, onGameComplete]);

    return (
        <GameCard title={game.title} description={game.description} icon="fa-question-circle">
            <div className="flex flex-col justify-center flex-grow">
                 <div className="bg-light dark:bg-slate-900/70 p-6 rounded-2xl text-center text-xl md:text-2xl font-medium my-6 shadow-inner dir-ltr dark:text-light">
                    {sentenceParts[0]}
                    <span className={`inline-block mx-2 px-4 py-1 rounded-lg transition-colors duration-300 ${!hasAnswered ? 'bg-gray-300 dark:bg-slate-600' : isCorrect ? 'bg-green-200 dark:bg-green-500/50 text-green-900 dark:text-green-100' : 'bg-red-200 dark:bg-red-500/50 text-red-900 dark:text-red-100'}`}>
                        {selectedAnswer || '...'}
                    </span>
                    {sentenceParts[1]}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {game.options.map((option, index) => {
                         const baseClasses = "p-4 rounded-xl cursor-pointer transition-all duration-300 text-center font-semibold text-lg border-2 dark:text-light";
                         const stateClasses = hasAnswered
                            ? option === game.correctWord
                                ? 'bg-green-100 dark:bg-green-900/50 border-green-400 dark:border-green-600 text-green-800 dark:text-green-200'
                                : option === selectedAnswer
                                ? 'bg-red-100 dark:bg-red-900/50 border-red-400 dark:border-red-600 text-red-800 dark:text-red-200'
                                : 'bg-gray-100 dark:bg-slate-700/50 border-transparent opacity-60'
                            : 'bg-white dark:bg-slate-700 hover:bg-primary/10 dark:hover:bg-primary/20 border-gray-200 dark:border-slate-600';
                         
                        return (
                             <button key={index} onClick={() => !hasAnswered && setSelectedAnswer(option)} disabled={hasAnswered} className={`${baseClasses} ${stateClasses}`}>
                                {option}
                            </button>
                        )
                    })}
                </div>
                {isCorrect && hasAnswered && (
                    <div className="mt-4 p-3 text-center rounded-lg bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-200 font-bold animate-fadeIn">
                        🎉 إجابة صحيحة! سيتم تحميل لعبة جديدة...
                    </div>
                )}
            </div>
        </GameCard>
    );
};

// --- Sentence Scramble Game Component ---
const SentenceScrambleGameCard: React.FC<{ game: SentenceScrambleGame; onGameComplete: () => void; }> = ({ game, onGameComplete }) => {
    const [builtSentence, setBuiltSentence] = useState<string[]>([]);
    const [remainingWords, setRemainingWords] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

    useEffect(() => {
        setRemainingWords(shuffleArray(game.words));
        setBuiltSentence([]);
        setFeedback(null);
    }, [game]);

    const handleWordBankClick = (word: string, index: number) => {
        if (feedback) return;
        setBuiltSentence([...builtSentence, word]);
        setRemainingWords(remainingWords.filter((_, i) => i !== index));
    };

    const handleSentenceClick = (word: string, index: number) => {
        if (feedback) return;
        setRemainingWords([...remainingWords, word]);
        setBuiltSentence(builtSentence.filter((_, i) => i !== index));
    };
    
    const checkAnswer = () => {
        const userAnswer = builtSentence.join(' ');
        if (userAnswer === game.correctSentence) {
            setFeedback('correct');
            setTimeout(() => {
                onGameComplete();
            }, 2000);
        } else {
            setFeedback('incorrect');
            setTimeout(() => {
                setFeedback(null);
            }, 1500);
        }
    };
    
    const resetGame = () => {
        setRemainingWords(shuffleArray(game.words));
        setBuiltSentence([]);
        setFeedback(null);
    };

    const isComplete = remainingWords.length === 0;

    return (
        <GameCard title={game.title} description={game.description} icon="fa-random">
            <div className="flex flex-col justify-between flex-grow">
                <div className="bg-light dark:bg-slate-900/70 p-4 rounded-2xl min-h-[6rem] shadow-inner flex flex-wrap gap-2 items-center justify-center dir-ltr">
                    {builtSentence.map((word, index) => (
                        <button key={index} onClick={() => handleSentenceClick(word, index)} className="bg-white dark:bg-slate-700 p-2 px-4 rounded-lg shadow-md font-semibold text-primary animate-fadeIn">
                            {word}
                        </button>
                    ))}
                </div>

                <div className="my-6 flex flex-wrap gap-2 items-center justify-center min-h-[6rem] dir-ltr">
                     {remainingWords.map((word, index) => (
                        <button key={index} onClick={() => handleWordBankClick(word, index)} className="bg-white dark:bg-slate-700 p-2 px-4 rounded-lg shadow-md font-semibold text-dark dark:text-light hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
                            {word}
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-center gap-4">
                     <button onClick={resetGame} disabled={!!feedback} className="btn bg-gray-200 dark:bg-slate-600 text-dark dark:text-light py-3 px-6 rounded-full font-bold transition-transform duration-300 hover:scale-105 disabled:opacity-50">
                        <i className="fas fa-undo"></i>
                    </button>
                    <button onClick={checkAnswer} disabled={!isComplete || !!feedback} className="btn bg-gradient-to-r from-primary to-purple text-white py-3 px-8 rounded-full font-bold transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                        تحقق
                    </button>
                </div>
                
                 {feedback === 'correct' && (
                    <div className="mt-4 p-3 text-center rounded-lg bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-200 font-bold animate-fadeIn">
                        🎉 رائع! إجابة صحيحة!
                    </div>
                )}
                 {feedback === 'incorrect' && (
                    <div className="mt-4 p-3 text-center rounded-lg bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 font-bold animate-shake">
                        🤔 حاول مرة أخرى!
                    </div>
                )}
            </div>
        </GameCard>
    );
};


const GamesSection: React.FC<GamesSectionProps> = ({ language, apiKey }) => {
    const [games, setGames] = useState<GamesCollection | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadGames = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const gamesData = await getGames(apiKey, language.name);
            setGames(gamesData);
        } catch (err) {
            setError(err instanceof Error ? err.message : `فشل في تحميل الألعاب للغة ${language.name}.`);
        } finally {
            setIsLoading(false);
        }
    }, [language, apiKey]);

    useEffect(() => {
        if(apiKey) {
            loadGames();
        }
    }, [loadGames, apiKey]);

    if (!apiKey) {
        return (
            <div className="flex-1 p-8 flex flex-col justify-center items-center text-center animate-fadeIn bg-light dark:bg-slate-900/70">
                <i className="fas fa-key text-secondary text-5xl mb-4"></i>
                <h3 className="text-2xl font-bold text-dark dark:text-light mb-2">مطلوب مفتاح API</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">الرجاء إضافة مفتاح OpenRouter API الخاص بك في الإعدادات للوصول إلى الألعاب.</p>
            </div>
        );
    }
    
    if (isLoading) {
        return (
            <div className="flex-1 p-8 flex flex-col justify-center items-center bg-light dark:bg-slate-900/70">
                <div className="text-center">
                    <div className="w-24 h-24 rounded-2xl pulse-bg-animation flex items-center justify-center text-primary text-4xl mb-4">
                         <i className="fas fa-gamepad"></i>
                    </div>
                    <p className="text-lg text-dark dark:text-light font-bold">جاري تحضير الألعاب...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
             <div className="flex-1 p-8 flex flex-col justify-center items-center text-center animate-fadeIn bg-light dark:bg-slate-900/70">
                <i className="fas fa-exclamation-triangle text-secondary text-5xl mb-4"></i>
                <h3 className="text-2xl font-bold text-dark dark:text-light mb-2">حدث خطأ</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">{error}</p>
                <button onClick={loadGames} className="btn bg-gradient-to-r from-primary to-purple text-white py-3 px-8 rounded-full font-bold transition-transform duration-300 hover:scale-105 flex items-center gap-2 shadow-lg">
                    <i className="fas fa-sync-alt"></i>
                    حاول مرة أخرى
                </button>
            </div>
        );
    }

    if (!games || games.games.length === 0) {
        return <div className="p-8 text-center dark:text-gray-400">لا توجد ألعاب متاحة لهذه اللغة حاليًا.</div>;
    }

    return (
        <div className="p-4 md:p-8 flex-1 animate-fadeIn bg-light dark:bg-slate-900/70">
             <div className="content-header mb-8 flex justify-between items-center">
                <h2 className="text-primary text-3xl font-bold flex items-center gap-3">
                    <i className="fas fa-gamepad"></i>
                    ألعاب لغوية
                </h2>
                <button onClick={loadGames} className="text-primary hover:text-purple dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-300 font-bold flex items-center gap-2 disabled:opacity-50" title="توليد ألعاب جديدة" disabled={isLoading}>
                    <i className="fas fa-redo-alt"></i>
                    <span>ألعاب جديدة</span>
                </button>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {games.games.map((game, index) => {
                    // Using a more robust key including game type and a unique identifier if available
                    const key = `${language.code}-${game.type}-${'title' in game ? game.title.replace(/\s/g, '') : index}-${index}`;
                    switch (game.type) {
                        case 'match':
                            return <MatchGameCard key={key} game={game} onGameComplete={loadGames} />;
                        case 'missing_word':
                            return <MissingWordGameCard key={key} game={game} onGameComplete={loadGames} />;
                        case 'sentence_scramble':
                             return <SentenceScrambleGameCard key={key} game={game} onGameComplete={loadGames} />;
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};

export default GamesSection;