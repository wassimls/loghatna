
import React, { useState, useEffect } from 'react';
import { ListeningExercise, Language } from '../../types.ts';
import { speak } from '../../services/audioService.ts';
import FeedbackFooter from '../shared/FeedbackFooter.tsx';
import VoiceNotAvailableModal from '../shared/VoiceNotAvailableModal.tsx';


interface ListeningSectionProps {
    exercise: ListeningExercise | null;
    language: Language;
    onNext: (isCorrect: boolean) => void;
}

const ListeningSection: React.FC<ListeningSectionProps> = ({ exercise, language, onNext }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [audioState, setAudioState] = useState<'idle' | 'loading' | 'playing' | 'error'>('idle');
    const [showVoiceModal, setShowVoiceModal] = useState(false);

    useEffect(() => {
        setSelectedOption(null);
        setIsCorrect(null);
        setAudioState('idle');
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, [exercise]);

    const handlePlayAudio = () => {
        if (!exercise || audioState === 'playing' || audioState === 'loading') return;
        
        setAudioState('loading');
        speak(exercise.audioWord, language.code, {
            onStart: () => setAudioState('playing'),
            onEnd: () => setAudioState('idle'),
            onError: (err) => {
                const speechError = (err as any).error || '';
                console.error('Audio playback error:', speechError, err);
                if (speechError === 'no-voice-found') {
                    setShowVoiceModal(true);
                }
                setAudioState('error');
            },
        });
    };

    const handleOptionClick = (option: string) => {
        if (!exercise || selectedOption !== null) return;
        
        const correct = option === exercise.correctAnswer;
        setSelectedOption(option);
        setIsCorrect(correct);
    };

    const getOptionClass = (option: string) => {
        if (!selectedOption) {
            return 'bg-white dark:bg-slate-700 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/20 dark:hover:border-primary/50';
        }
        if (option === selectedOption) {
            return isCorrect ? 'bg-green-100 dark:bg-green-900/50 border-accent text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/50 border-secondary text-red-800 dark:text-red-200';
        }
        if (option === exercise.correctAnswer) {
            return 'bg-green-100 dark:bg-green-900/50 border-accent text-green-800 dark:text-green-200';
        }
        return 'bg-gray-100 dark:bg-slate-600/50 text-gray-500 dark:text-gray-400';
    };

    if (!exercise) {
        return <div className="p-8 text-center dark:text-gray-400">لا توجد تمارين استماع متاحة حاليًا.</div>;
    }
    
    const getAudioButtonIcon = () => {
        switch (audioState) {
            case 'playing': return <i className="fas fa-pause text-5xl"></i>;
            case 'loading': return <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>;
            case 'error': return <i className="fas fa-exclamation-triangle text-5xl"></i>;
            default: return <i className="fas fa-volume-up text-5xl"></i>;
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col h-full">
            <div className="flex-grow flex flex-col justify-center">
                <h3 className="text-dark dark:text-light font-bold text-lg md:text-xl text-center mb-6">استمع للكلمة واختر الإجابة الصحيحة:</h3>
                
                <div className="flex justify-center my-8">
                    <button 
                        onClick={handlePlayAudio}
                        disabled={audioState === 'playing' || audioState === 'loading'}
                        className={`w-32 h-32 flex items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-300
                            ${audioState === 'error' ? 'bg-red-500' : 'bg-gradient-to-br from-primary to-purple'}
                            ${(audioState === 'playing' || audioState === 'loading') ? 'cursor-not-allowed' : ''}
                        `}
                        aria-label="تشغيل الصوت"
                    >
                        {getAudioButtonIcon()}
                    </button>
                </div>
                
                {audioState === 'error' && !showVoiceModal && (
                    <p className="text-red-600 dark:text-red-400 text-center -mt-4 mb-4 font-semibold">تعذر تشغيل الصوت.</p>
                )}

                <div className="options grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                    {exercise.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            disabled={selectedOption !== null || audioState === 'playing' || audioState === 'loading'}
                            className={`p-5 rounded-2xl text-center dir-ltr cursor-pointer transition-all duration-300 font-semibold text-base md:text-lg border-2 border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${getOptionClass(option)}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            {isCorrect !== null ? (
                <FeedbackFooter 
                    isCorrect={isCorrect}
                    correctAnswer={exercise.correctAnswer}
                    onContinue={() => onNext(isCorrect)}
                />
            ) : (
                 <div className="w-full p-4 md:p-6 mt-auto text-center">
                    <button
                        onClick={() => onNext(false)}
                        className="btn bg-gray-200 dark:bg-slate-600 text-dark dark:text-light py-3 px-8 rounded-full font-bold transition-transform duration-300 hover:scale-105 shadow-sm flex items-center justify-center mx-auto"
                    >
                        تخطي التمرين
                        <i className="fas fa-forward mr-2"></i>
                    </button>
                </div>
            )}
            {showVoiceModal && <VoiceNotAvailableModal onClose={() => setShowVoiceModal(false)} />}
        </div>
    );
};

export default ListeningSection;
