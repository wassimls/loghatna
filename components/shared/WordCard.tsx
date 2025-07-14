


import React from 'react';
import { Word, Language } from '../../types';
import { speak } from '../../services/audioService';

interface WordCardProps {
    word: Word;
    language: Language;
    isFavorite: boolean;
    onToggleFavorite: (word: Word) => void;
}

const WordCard: React.FC<WordCardProps> = ({ word, language, isFavorite, onToggleFavorite }) => {
    const speakWord = () => {
        speak(word.word, language.code);
    };

    return (
        <div className="bg-white dark:bg-dark/70 rounded-2xl p-6 text-center shadow-lg hover:shadow-secondary/20 dark:hover:shadow-secondary/30 transition-all duration-300 hover:-translate-y-2 border border-white/10 flex flex-col items-center relative overflow-hidden">
            <div className="word-image w-24 h-24 rounded-full mb-5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark/70 dark:to-slate-800 flex items-center justify-center text-5xl shadow-inner">
                {word.emoji}
            </div>
            <div className="word text-2xl font-extrabold text-primary dark:text-light mb-2">{word.word}</div>
            <div className="translation text-accent font-bold text-lg mb-2">{word.translation}</div>
            <div className="pronunciation text-gray-500 dark:text-gray-300 italic mb-5 bg-light dark:bg-slate-800 px-4 py-1 rounded-full text-sm">{word.pronunciation}</div>
            <div className="actions flex gap-3 w-full mt-auto">
                <button onClick={speakWord} className="action-btn flex-1 bg-light dark:bg-slate-800 dark:hover:bg-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 border-none p-3 rounded-xl cursor-pointer text-primary dark:text-light font-semibold">
                    <i className="fas fa-volume-up"></i>
                </button>
                <button onClick={() => onToggleFavorite(word)} className={`action-btn flex-1 bg-light dark:bg-slate-800 dark:hover:bg-secondary hover:bg-secondary/20 transition-all duration-300 border-none p-3 rounded-xl cursor-pointer font-semibold ${isFavorite ? 'text-secondary dark:text-secondary' : 'text-gray-400 dark:text-gray-300'}`}>
                    <i className="fas fa-star"></i>
                </button>
            </div>
        </div>
    );
};

export default WordCard;