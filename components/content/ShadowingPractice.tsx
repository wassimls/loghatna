import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Language, YouTubeVideo, SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '../../types';
import { generateVideoScript, getPronunciationFeedback } from '../../services/geminiService';
import { speak } from '../../services/audioService';
import * as soundService from '../../services/soundService';

const useSpeechRecognition = (lang: string) => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = React.useRef<SpeechRecognition | null>(null);

    const startListening = useCallback(() => {
        if (isListening) return;
        if (!('webkitSpeechRecognition' in window)) {
            setError('عذراً، متصفحك لا يدعم ميزة التعرف على الكلام.');
            return;
        }
        setText('');
        setError(null);
        setIsListening(true);
        const recognition = new window.webkitSpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = lang;
        recognition.onresult = (event: SpeechRecognitionEvent) => {
            setText(event.results[0][0].transcript);
            setIsListening(false);
        };
        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            let userMessage = `حدث خطأ: ${event.error}`;
            if (event.error === 'no-speech') userMessage = 'لم يتم اكتشاف أي كلام.';
            else if (event.error === 'not-allowed') userMessage = 'تم رفض إذن الميكروفون.';
            setError(userMessage);
            setIsListening(false);
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
    }, [isListening, lang]);
    
    const reset = useCallback(() => {
        setText('');
        setError(null);
        setIsListening(false);
    }, []);
    
    return { text, isListening, startListening, error, reset };
};


interface ShadowingPracticeProps {
    video: YouTubeVideo;
    language: Language;
    apiKey: string;
    onClose: () => void;
}

type Status = 'loading' | 'error' | 'ready' | 'recording' | 'evaluating' | 'feedback';

const ShadowingPractice: React.FC<ShadowingPracticeProps> = ({ video, language, apiKey, onClose }) => {
    const [script, setScript] = useState<string[]>([]);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [status, setStatus] = useState<Status>('loading');
    const [error, setError] = useState<string | null>(null);
    
    const { text: userTranscript, isListening, startListening, error: speechError, reset: resetSpeech } = useSpeechRecognition(language.code);
    const [feedback, setFeedback] = useState<{ score: number; feedback: string } | null>(null);

    useEffect(() => {
        const fetchScript = async () => {
            setStatus('loading');
            setError(null);
            try {
                const generatedScript = await generateVideoScript(video.videoId, language.name, apiKey);
                if (generatedScript && generatedScript.length > 0) {
                    setScript(generatedScript);
                    setStatus('ready');
                } else {
                    throw new Error("فشل الذكاء الاصطناعي في استخراج نص من الفيديو. قد يكون الفيديو قصيراً جداً أو لا يحتوي على كلام واضح. حاول مع فيديو آخر.");
                }
            } catch (err) {
                const message = err instanceof Error ? err.message : "حدث خطأ غير متوقع.";
                setError(message);
                setStatus('error');
            }
        };
        fetchScript();
    }, [video.videoId, language.name, apiKey]);

    useEffect(() => {
        if (userTranscript && !isListening) {
            const evaluate = async () => {
                setStatus('evaluating');
                setFeedback(null);
                try {
                    const result = await getPronunciationFeedback(script[currentSentenceIndex], userTranscript, language.name, apiKey);
                    setFeedback(result);
                    if(result.score > 7) soundService.playCorrectSound(); else soundService.playIncorrectSound();
                } catch (e) {
                    const message = e instanceof Error ? e.message : 'An unknown error occurred.';
                    setFeedback({ score: 0, feedback: `خطأ في التقييم: ${message}`});
                } finally {
                    setStatus('feedback');
                }
            };
            evaluate();
        }
    }, [userTranscript, isListening, script, currentSentenceIndex, language.name, apiKey]);

    const resetPractice = () => {
        resetSpeech();
        setFeedback(null);
        setStatus('ready');
    };
    
    const handleNext = () => {
        if (currentSentenceIndex < script.length - 1) {
            setCurrentSentenceIndex(prev => prev + 1);
            resetPractice();
        } else {
            // Can add a "practice complete" screen later
            onClose();
        }
    };
    
    const handlePrev = () => {
        if (currentSentenceIndex > 0) {
            setCurrentSentenceIndex(prev => prev - 1);
            resetPractice();
        }
    };
    
    const currentSentence = script[currentSentenceIndex];

    const renderContent = () => {
        if (status === 'loading') {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <i className="fas fa-spinner fa-spin text-secondary text-5xl mb-4"></i>
                    <h3 className="text-2xl font-bold text-white">جاري تحليل الفيديو...</h3>
                    <p className="text-gray-300">يقوم الذكاء الاصطناعي باستخراج النصوص لتتدرب عليها.</p>
                </div>
            );
        }
        if (status === 'error') {
            return (
                 <div className="flex flex-col items-center justify-center h-full text-center">
                    <i className="fas fa-exclamation-triangle text-accent text-5xl mb-4"></i>
                    <h3 className="text-2xl font-bold text-white">حدث خطأ</h3>
                    <p className="text-gray-300 max-w-md mb-6">{error}</p>
                    <button onClick={onClose} className="btn bg-accent text-white py-2 px-6 rounded-lg">العودة</button>
                </div>
            )
        }
        return (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                <div className="flex flex-col">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border border-white/10">
                        <iframe 
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0&rel=0`}
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <button onClick={handlePrev} disabled={currentSentenceIndex === 0} className="btn bg-dark/50 hover:bg-white/20 text-white py-2 px-4 rounded-lg disabled:opacity-50"><i className="fas fa-arrow-right ml-2"></i>السابق</button>
                        <span className="font-bold text-secondary">{currentSentenceIndex + 1} / {script.length}</span>
                        <button onClick={handleNext} className="btn bg-secondary text-dark py-2 px-4 rounded-lg"><i className="fas fa-arrow-left mr-2"></i>{currentSentenceIndex === script.length - 1 ? 'إنهاء' : 'التالي'}</button>
                    </div>
                </div>
                <div className="bg-dark/50 rounded-lg p-6 flex flex-col justify-between border border-white/10">
                    <div>
                        <h4 className="text-lg font-bold text-gray-300 mb-2">الجملة للتدريب:</h4>
                        <div className="bg-dark/70 p-4 rounded-lg min-h-[80px] flex items-center justify-center text-center">
                            <p className="text-xl font-semibold text-white dir-ltr">{currentSentence}</p>
                        </div>
                    </div>
                    <div className="my-6 flex justify-center items-center gap-4">
                        <button onClick={() => speak(currentSentence, language.code)} className="w-16 h-16 bg-primary rounded-full text-white text-2xl flex items-center justify-center transition-transform hover:scale-110"><i className="fas fa-volume-up"></i></button>
                        <button onClick={startListening} disabled={isListening} className={`w-20 h-20 rounded-full text-white text-3xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg ${isListening ? 'bg-red-500 animate-pulse' : 'bg-secondary'}`}><i className="fas fa-microphone-alt"></i></button>
                    </div>
                    <div className="min-h-[120px] flex flex-col justify-center">
                        {speechError && <p className="text-red-400 text-center font-bold">{speechError}</p>}
                        {status === 'evaluating' && <p className="text-center text-secondary"><i className="fas fa-spinner fa-spin mr-2"></i>جاري التقييم...</p>}
                        {status === 'feedback' && feedback && (
                            <div className="w-full p-4 bg-dark/70 rounded-lg border border-white/10 animate-fadeIn">
                                <p className="text-center text-gray-300 mb-2">ما قلته: <span className="font-semibold text-white dir-ltr">{userTranscript}</span></p>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-green-400">{feedback.score}/10</p>
                                        <div className="w-24 bg-slate-700 rounded-full h-2.5 mt-1"><div className="bg-green-400 h-2.5 rounded-full" style={{width: `${feedback.score * 10}%`}}></div></div>
                                    </div>
                                    <p className="text-white text-right flex-1">{feedback.feedback}</p>
                                </div>
                                 <div className="text-center mt-4">
                                    <button onClick={resetPractice} className="text-sm text-secondary hover:underline">المحاولة مرة أخرى</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col p-4 animate-fadeIn" onClick={onClose}>
            <div className="bg-dark/90 backdrop-blur-md rounded-2xl w-full max-w-5xl h-full max-h-[90vh] mx-auto flex flex-col border border-white/20" onClick={e => e.stopPropagation()}>
                <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold text-secondary truncate pr-4">{video.title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors flex-shrink-0">
                        <i className="fas fa-times text-2xl"></i>
                    </button>
                </header>
                <div className="p-4 flex-1 overflow-y-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default ShadowingPractice;
