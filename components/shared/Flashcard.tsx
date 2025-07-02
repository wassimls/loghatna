
import React, { useState, useEffect } from 'react';
import { Word, Language } from '../../types';
import { speak } from '../../services/audioService';

interface FlashcardProps {
    word: Word;
    language: Language;
}

const Flashcard: React.FC<FlashcardProps> = ({ word, language }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    
    // Reset flip state when word changes
    useEffect(() => {
        setIsFlipped(false);
    }, [word]);

    const speakWord = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card from flipping when button is clicked
        await speak(word.word, language.code);
    };

    return (
        <div 
            className="w-full max-w-md h-80 perspective-1000 cursor-pointer" 
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div 
                className={`relative w-full h-full preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front of card */}
                <div className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-700 rounded-2xl shadow-lg flex flex-col justify-center items-center p-6 border-4 border-primary/50">
                    <span className="text-6xl mb-4">{word.emoji}</span>
                    <h2 className="text-4xl font-bold text-dark dark:text-light">{word.word}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-4">(انقر لترى الترجمة)</p>
                </div>
                
                {/* Back of card */}
                <div className="absolute w-full h-full backface-hidden bg-light dark:bg-slate-800 rounded-2xl shadow-lg flex flex-col justify-center items-center p-6 border-4 border-secondary/50 rotate-y-180">
                    <h3 className="text-4xl font-bold text-secondary mb-4">{word.translation}</h3>
                    <p className="text-xl text-gray-600 dark:text-gray-300 italic bg-white dark:bg-slate-700 px-4 py-2 rounded-full mb-6">{word.pronunciation}</p>
                    <button 
                        onClick={speakWord} 
                        className="action-btn bg-primary hover:bg-primary/80 text-white transition-all duration-300 border-none w-16 h-16 rounded-full cursor-pointer font-semibold text-2xl flex items-center justify-center shadow-lg"
                        aria-label="استمع للكلمة"
                    >
                        <i className="fas fa-volume-up"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
