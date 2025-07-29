import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { generateAudioStory, translateText } from '../../services/geminiService';
import { speak, pauseSpeech, resumeSpeech, cancelSpeech } from '../../services/audioService';
import VoiceNotAvailableModal from '../shared/VoiceNotAvailableModal';

interface ExploreSectionProps {
    language: Language;
    userTier: 'bronze' | 'silver' | 'gold';
    userId: string;
    onUnlockClick: () => void;
}

const genres = [
    { name: 'حكايات خرافية', value: 'Fairy Tale', icon: 'fa-magic' },
    { name: 'خيال علمي', value: 'Sci-Fi', icon: 'fa-rocket' },
    { name: 'حياة يومية', value: 'Daily Life', icon: 'fa-coffee' },
    { name: 'غموض', value: 'Mystery', icon: 'fa-search' },
    { name: 'كوميديا', value: 'Comedy', icon: 'fa-laugh-beam' },
    { name: 'مغامرة', value: 'Adventure', icon: 'fa-compass' },
];

const getWeekIdentifier = (date: Date): string => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${d.getUTCFullYear()}-${weekNo}`;
};


const SpeedControl: React.FC<{ rate: number; onRateChange: (rate: number) => void }> = ({ rate, onRateChange }) => {
    const speeds = [
        { label: 'بطيء', value: 0.75 },
        { label: 'عادي', value: 1.0 },
        { label: 'سريع', value: 1.25 },
    ];
    return (
        <div className="flex items-center justify-center gap-2">
            <i className="fas fa-tachometer-alt text-gray-400 mr-2" title="سرعة التشغيل"></i>
            <div className="bg-dark/70 p-1 rounded-full flex items-center">
                {speeds.map(speed => (
                    <button
                        key={speed.value}
                        onClick={() => onRateChange(speed.value)}
                        className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${rate === speed.value ? 'bg-primary text-white shadow' : 'text-gray-300'}`}
                    >
                        {speed.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

const LockedView: React.FC<{ tier: 'bronze' | 'silver'; onUnlockClick: () => void }> = ({ tier, onUnlockClick }) => {
    const messages = {
        bronze: {
            title: "لقد استنفدت محاولتك الأسبوعية!",
            subtitle: "للحصول على المزيد من القصص، قم بترقية خطتك.",
            button: "الترقية إلى الفضية"
        },
        silver: {
            title: "لقد استنفدت محاولاتك لهذا الأسبوع!",
            subtitle: "الخطة الفضية تمنحك 3 قصص أسبوعياً. للحصول على قصص غير محدودة، قم بالترقية.",
            button: "الترقية إلى الذهبية"
        }
    };
    const message = messages[tier];

    return (
        <div className="flex-1 p-8 flex flex-col justify-center items-center text-center animate-fadeIn">
            <div className="bg-dark/70 rounded-2xl p-8 border border-secondary/50">
                <i className="fas fa-lock text-secondary text-5xl mb-4"></i>
                <h3 className="text-2xl font-bold text-white mb-2">{message.title}</h3>
                <p className="text-gray-300 mb-6">{message.subtitle}</p>
                <button onClick={onUnlockClick} className="btn bg-gradient-to-r from-secondary to-yellow-400 text-dark py-3 px-8 rounded-full font-bold transition-transform duration-300 hover:scale-105 flex items-center gap-2 shadow-lg">
                    <i className="fas fa-unlock-alt"></i>
                    {message.button}
                </button>
            </div>
        </div>
    );
};


const ExploreSection: React.FC<ExploreSectionProps> = ({ language, userTier, userId, onUnlockClick }) => {
    const [view, setView] = useState<'genres' | 'story'>('genres');
    const [selectedGenre, setSelectedGenre] = useState<{ name: string; value: string; icon: string; } | null>(null);
    const [story, setStory] = useState('');
    const [translation, setTranslation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isTranslating, setIsTranslating] = useState(false);
    const [playbackState, setPlaybackState] = useState<'idle' | 'playing' | 'paused'>('idle');
    const [showVoiceModal, setShowVoiceModal] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [isLocked, setIsLocked] = useState(false);
    const [usageInfo, setUsageInfo] = useState({ count: 0, week: getWeekIdentifier(new Date()) });

    const storageKey = `galaxya_explore_usage_${userId}`;

    useEffect(() => {
        if (userTier === 'gold') {
            setIsLocked(false);
            return;
        }

        const limit = userTier === 'silver' ? 3 : 1;
        const currentWeek = getWeekIdentifier(new Date());
        let storedUsage = { count: 0, week: currentWeek };

        try {
            const rawUsage = localStorage.getItem(storageKey);
            if (rawUsage) {
                const parsed = JSON.parse(rawUsage);
                if (parsed.week === currentWeek) {
                    storedUsage = parsed;
                }
            }
        } catch (e) {
            console.error("Could not parse explore usage:", e);
        }
        
        setUsageInfo(storedUsage);
        if (storedUsage.count >= limit) {
            setIsLocked(true);
        } else {
            setIsLocked(false);
        }
    }, [userId, userTier, storageKey]);
    
    // Cleanup effect to stop speech when the component unmounts or language changes
    useEffect(() => {
        return () => {
            cancelSpeech();
        };
    }, [language]);


    const handleGenerateStory = async (genre: { name: string; value: string; icon: string; }) => {
        if (isLoading || isLocked) return;

        cancelSpeech();
        setPlaybackState('idle');
        setSelectedGenre(genre);
        setView('story');
        setIsLoading(true);
        setError(null);
        setStory('');
        setTranslation('');

        try {
            const generatedStory = await generateAudioStory(language.name, genre.value);
            if (generatedStory) {
                setStory(generatedStory);
                 if (userTier !== 'gold') {
                    const limit = userTier === 'silver' ? 3 : 1;
                    const newCount = usageInfo.count + 1;
                    const newUsageInfo = { ...usageInfo, count: newCount };
                    
                    localStorage.setItem(storageKey, JSON.stringify(newUsageInfo));
                    setUsageInfo(newUsageInfo);

                    if (newCount >= limit) {
                        setIsLocked(true);
                    }
                }
            } else {
                throw new Error("لم يتمكن الذكاء الاصطناعي من إنشاء قصة. حاول مرة أخرى أو اختر نوعًا آخر.");
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'فشل في إنشاء القصة.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleTranslate = async () => {
        if (isTranslating || !story) return;
        setIsTranslating(true);
        try {
            const translatedText = await translateText(story, language.name, 'Arabic');
            setTranslation(translatedText);
        } catch (err) {
            setTranslation("فشلت عملية الترجمة.");
        } finally {
            setIsTranslating(false);
        }
    };

    const handlePlayPauseResume = () => {
        if (playbackState === 'playing') {
            pauseSpeech();
            setPlaybackState('paused');
        } else if (playbackState === 'paused') {
            resumeSpeech();
            setPlaybackState('playing');
        } else if (playbackState === 'idle') {
            if (!story) return;
            setError(null);
            speak(story, language.code, {
                rate: playbackRate,
                onStart: () => setPlaybackState('playing'),
                onEnd: () => setPlaybackState('idle'),
                onError: (e) => {
                    setPlaybackState('idle');
                    const speechError = (e as any).error || '';
                    console.error("Speech synthesis failed:", speechError, e);
                    
                    if (speechError === 'no-voice-found') {
                        setShowVoiceModal(true);
                    } else {
                        setError("فشل تشغيل الصوت. قد لا تكون حزمة اللغة مثبتة على جهازك.");
                    }
                }
            });
        }
    };
    
    const handleStop = () => {
        cancelSpeech();
        setPlaybackState('idle');
    };

    const handleRateChange = (newRate: number) => {
        if (playbackState !== 'idle') {
            cancelSpeech();
            setPlaybackState('idle');
        }
        setPlaybackRate(newRate);
    };

    const renderStoryView = () => {
        if (view === 'story' && selectedGenre) {
            return (
                <div className="p-0 md:p-4 w-full h-full flex flex-col animate-fadeIn">
                    <header className="flex-shrink-0 mb-6">
                        <button onClick={() => { setView('genres'); handleStop(); }} className="btn bg-dark/50 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                            <i className="fas fa-arrow-right"></i>
                            تغيير النوع
                        </button>
                        <div className="text-center -mt-8">
                            <i className={`fas ${selectedGenre.icon} text-secondary text-2xl md:text-3xl mb-2`}></i>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedGenre.name}</h2>
                        </div>
                    </header>
    
                    <div className="flex-1 bg-dark/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10 flex flex-col justify-between overflow-hidden">
                        {isLoading ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center">
                                <i className="fas fa-book-open text-secondary text-5xl fa-spin mb-4"></i>
                                <h3 className="text-2xl font-bold text-white">جاري نسج الحكاية...</h3>
                                <p className="text-gray-300">يستعد الذكاء الاصطناعي لسرد قصة شيقة لك.</p>
                            </div>
                        ) : (
                           <>
                                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                                    <h3 className="text-base md:text-lg font-bold text-gray-300">نص القصة:</h3>
                                    <SpeedControl rate={playbackRate} onRateChange={handleRateChange} />
                                </div>
                                <div className="story-content flex-1 overflow-y-auto pr-2">
                                    {error && !story && (
                                        <div className="h-full flex flex-col items-center justify-center text-center">
                                            <i className="fas fa-exclamation-triangle text-accent text-5xl mb-4"></i>
                                            <h3 className="text-2xl font-bold text-white">حدث خطأ</h3>
                                            <p className="text-gray-300 max-w-md">{error}</p>
                                        </div>
                                    )}
                                    <p className="text-lg md:text-xl leading-relaxed text-white whitespace-pre-wrap dir-ltr">{story}</p>
                                    {translation && (
                                        <div className="mt-4 pt-4 border-t-2 border-dashed border-white/20">
                                            <p className="text-base md:text-lg leading-relaxed text-gray-300 whitespace-pre-wrap dir-rtl">{translation}</p>
                                        </div>
                                    )}
                                </div>
                           </>
                        )}
                        
                        <div className="actions-footer mt-6 flex-shrink-0 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button onClick={() => handleGenerateStory(selectedGenre)} disabled={isLoading || playbackState !== 'idle' || isLocked} className="btn w-full sm:w-auto bg-primary text-white py-3 px-6 rounded-full font-bold flex items-center justify-center gap-2 disabled:opacity-50"><i className="fas fa-redo-alt"></i> قصة جديدة</button>
                            <button onClick={handlePlayPauseResume} disabled={isLoading || !story} className="w-16 h-16 bg-secondary text-dark rounded-full text-2xl flex items-center justify-center shadow-lg"><i className={`fas ${playbackState === 'playing' ? 'fa-pause' : 'fa-play'}`}></i></button>
                            <button onClick={handleStop} disabled={playbackState === 'idle' || isLoading || !story} className="w-16 h-16 bg-accent text-white rounded-full text-2xl flex items-center justify-center shadow-lg disabled:opacity-50"><i className="fas fa-stop"></i></button>
                            <button onClick={handleTranslate} disabled={isTranslating || isLoading || !story || playbackState !== 'idle'} className="btn w-full sm:w-auto bg-primary text-white py-3 px-6 rounded-full font-bold flex items-center justify-center gap-2 disabled:opacity-50">{isTranslating ? <i className="fas fa-spinner fa-spin"></i> : <><i className="fas fa-language"></i> ترجمة</>}</button>
                        </div>
                         {error && story && <p className="text-center mt-3 text-red-400 font-semibold">{error}</p>}
                    </div>
                </div>
            )
        }
        return null;
    }

    const renderGenreSelection = () => {
        if (isLocked && userTier !== 'gold') {
             return <LockedView tier={userTier} onUnlockClick={onUnlockClick} />;
        }

        if (view === 'genres') {
            return (
                <>
                    <header className="text-center mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white">الكتب الصوتية</h1>
                        <p className="text-base md:text-lg text-gray-300 mt-2">اختر نوعاً واستمع لقصص قصيرة باللغة {language.name} مولدة بالذكاء الاصطناعي.</p>
                    </header>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {genres.map(genre => (
                            <button 
                                key={genre.value}
                                onClick={() => handleGenerateStory(genre)}
                                className="bg-dark/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center transition-all duration-300 hover:border-secondary hover:bg-secondary/10 hover:-translate-y-2 group shadow-lg"
                            >
                                <i className={`fas ${genre.icon} text-3xl md:text-4xl text-secondary mb-3 transition-transform group-hover:scale-110`}></i>
                                <h2 className="text-xl md:text-2xl font-bold text-white">{genre.name}</h2>
                            </button>
                        ))}
                    </div>
                </>
            )
        }
        return null;
    }

    return (
        <div className="p-4 md:p-8 w-full h-full flex flex-col animate-fadeIn">
            {view === 'genres' ? renderGenreSelection() : renderStoryView()}
            {showVoiceModal && <VoiceNotAvailableModal onClose={() => setShowVoiceModal(false)} />}
        </div>
    );
};

export default ExploreSection;