import React, { useState, useEffect, useMemo } from 'react';
import { Word, Language } from '../../types';
import WordCard from '../shared/WordCard';
import Flashcard from '../shared/Flashcard';

interface WordsSectionProps {
    words: Word[];
    language: Language;
    favoriteWords: Word[];
    onToggleFavorite: (word: Word) => void;
}

type ViewMode = 'grid' | 'flashcards';

const WordsSection: React.FC<WordsSectionProps> = ({ words, language, favoriteWords, onToggleFavorite }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const favoriteWordSet = useMemo(() => new Set(favoriteWords.map(w => w.word)), [favoriteWords]);

    const filteredWords = words.filter(word => 
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Reset index when words change
    useEffect(() => {
        setCurrentCardIndex(0);
    }, [words]);
    
    const handleNextCard = () => {
        setCurrentCardIndex(prev => (prev + 1) % filteredWords.length);
    };
    
    const handlePrevCard = () => {
        setCurrentCardIndex(prev => (prev - 1 + filteredWords.length) % filteredWords.length);
    };

    return (
        <div className="p-4 md:p-8 flex-1 flex flex-col animate-fadeIn h-full">
            <div className="content-header flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-primary text-2xl font-bold flex items-center gap-3">
                        <i className="fas fa-book"></i>
                        كلمات الفئة
                    </h2>
                    <div className="bg-light dark:bg-slate-700 p-1 rounded-full flex items-center">
                        <button onClick={() => setViewMode('grid')} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${viewMode === 'grid' ? 'bg-primary text-white shadow' : 'text-dark dark:text-light'}`}><i className="fas fa-th-large mr-2"></i>شبكة</button>
                        <button onClick={() => setViewMode('flashcards')} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${viewMode === 'flashcards' ? 'bg-primary text-white shadow' : 'text-dark dark:text-light'}`}><i className="fas fa-clone mr-2"></i>بطاقات</button>
                    </div>
                </div>

                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        placeholder="ابحث عن كلمة..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pr-10 rounded-full bg-light dark:bg-slate-700 text-dark dark:text-light border-2 border-transparent focus:border-primary focus:outline-none transition-all"
                    />
                    <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
            </div>
            {filteredWords.length === 0 ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
                    <i className="fas fa-search text-4xl mb-4"></i>
                    <p className="text-lg">لم يتم العثور على كلمات مطابقة.</p>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="words-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1 overflow-y-auto p-2">
                    {filteredWords.map((word, index) => (
                        <WordCard 
                            key={`${word.word}-${index}`} 
                            word={word} 
                            language={language}
                            isFavorite={favoriteWordSet.has(word.word)}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-6">
                    <Flashcard word={filteredWords[currentCardIndex]} language={language} />
                    <div className="flex items-center gap-4">
                         <button onClick={handlePrevCard} className="action-btn bg-white dark:bg-slate-700 shadow-md p-4 rounded-full text-primary transition-transform hover:scale-110">
                            <i className="fas fa-arrow-right"></i>
                        </button>
                        <span className="font-bold text-dark dark:text-light">{currentCardIndex + 1} / {filteredWords.length}</span>
                        <button onClick={handleNextCard} className="action-btn bg-white dark:bg-slate-700 shadow-md p-4 rounded-full text-primary transition-transform hover:scale-110">
                            <i className="fas fa-arrow-left"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WordsSection;