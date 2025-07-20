import React, { useState, useEffect, useCallback } from 'react';
import { Language, SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '../../types';
import { getPronunciationFeedback } from '../../services/geminiService';
import { speak } from '../../services/audioService';

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
            const transcript = event.results[0][0].transcript;
            setText(transcript);
            setError(null); // Clear previous errors on success
            setIsListening(false);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('Speech recognition error:', event.error, event.message);
            let userMessage = `حدث خطأ غير متوقع: ${event.error}`;
            if (event.error === 'network') {
                userMessage = 'مشكلة في الشبكة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.';
            } else if (event.error === 'no-speech') {
                userMessage = 'لم يتم اكتشاف أي كلام. حاول التحدث بوضوح بالقرب من الميكروفون.';
            } else if (event.error === 'audio-capture') {
                userMessage = 'لا يمكن الوصول إلى الميكروفون. يرجى التأكد من أنك منحت الإذن.';
            } else if (event.error === 'not-allowed') {
                 userMessage = 'تم رفض الإذن باستخدام الميكروفون. يرجى تمكينه في إعدادات المتصفح.';
            }
            setError(userMessage);
            setIsListening(false);
        };
        
        recognition.onend = () => {
             setIsListening(false);
        };

        recognition.start();

    }, [isListening, lang]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    }, [isListening]);
    
    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);
    
    const reset = useCallback(() => {
        setText('');
        setError(null);
        setIsListening(false);
    }, []);
    
    return { text, isListening, startListening, stopListening, error, reset };
};

interface SpeakingSectionProps {
    language: Language;
    phrase: string;
    onComplete: (isCorrect: boolean) => void;
    apiKey: string;
}

const SpeakingSection: React.FC<SpeakingSectionProps> = ({ language, phrase, onComplete, apiKey }) => {
    const phraseToSay = phrase;
    const { text, isListening, startListening, error: speechError, reset: resetSpeech } = useSpeechRecognition(language.code);
    const [hasRecorded, setHasRecorded] = useState(false);
    const [aiFeedback, setAiFeedback] = useState<{ score: number; feedback: string; } | null>(null);
    const [isEvaluating, setIsEvaluating] = useState(false);

    useEffect(() => {
        resetSpeech();
        setHasRecorded(false);
        setAiFeedback(null);
        setIsEvaluating(false);
    }, [phrase, language, resetSpeech]);
    
    useEffect(() => {
        if (text && !isListening) {
            setHasRecorded(true);
        }
    }, [text, isListening]);

     useEffect(() => {
        if (text && !isListening && hasRecorded && apiKey) {
            const evaluate = async () => {
                setIsEvaluating(true);
                setAiFeedback(null);
                try {
                    const feedback = await getPronunciationFeedback(phraseToSay, text, language.name, apiKey);
                    setAiFeedback(feedback);
                } catch (e) {
                    const message = e instanceof Error ? e.message : 'An unknown error occurred.';
                    setAiFeedback({ score: 0, feedback: `خطأ في التقييم: ${message}`});
                } finally {
                    setIsEvaluating(false);
                }
            };
            evaluate();
        }
    }, [text, isListening, hasRecorded, phraseToSay, language.name, apiKey]);


    const resetForRecording = () => {
        setHasRecorded(false);
        setAiFeedback(null);
        setIsEvaluating(false);
        resetSpeech();
    };

    const handleRecord = () => {
        resetForRecording();
        startListening();
    };

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col h-full">
            <div className="flex-grow flex flex-col items-center justify-center">
                 <h3 className="text-dark dark:text-light font-bold text-xl mb-4 text-center">تمرين المحاكاة: استمع ثم ردد</h3>
                 <div className="my-6 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-2xl text-dark dark:text-light font-medium text-center dir-ltr flex items-center gap-4">
                    <button
                        onClick={() => speak(phraseToSay, language.code)}
                        className="w-12 h-12 flex-shrink-0 bg-primary text-white rounded-full flex items-center justify-center text-xl transition-transform hover:scale-110"
                        aria-label="استمع للجملة الأصلية"
                    >
                        <i className="fas fa-volume-up"></i>
                    </button>
                    <p className="flex-grow text-center">{phraseToSay}</p>
                </div>
                
                <button
                    onClick={handleRecord}
                    disabled={isListening || isEvaluating}
                    className="btn bg-gradient-to-r from-secondary to-red-500 text-white my-8 py-4 px-10 rounded-full cursor-pointer text-xl font-bold transition-transform duration-300 hover:scale-105 flex items-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {isListening ? (
                        <>
                            <i className="fas fa-waveform-path fa-beat"></i>
                            <span>جاري الاستماع...</span>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-microphone-alt"></i>
                            <span>ابدأ التسجيل</span>
                        </>
                    )}
                </button>

                <div className="w-full mt-6 min-h-[150px] flex flex-col items-center justify-center">
                    {speechError && (
                        <div className="w-full text-center p-4 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded-lg text-red-800 dark:text-red-200 font-semibold animate-fadeIn flex flex-col items-center gap-4">
                            <div>
                                <i className="fas fa-exclamation-triangle mr-2"></i>
                                {speechError}
                            </div>
                        </div>
                    )}
                    
                    {hasRecorded && text && !speechError && (
                        <div className="w-full text-center animate-fadeIn mb-4">
                            <h4 className="font-bold text-lg mb-2 dark:text-light">ما قلته:</h4>
                            <p className="p-4 bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-700 rounded-lg text-blue-800 dark:text-blue-200 font-semibold dir-ltr">{text}</p>
                        </div>
                    )}
                     {isEvaluating && (
                        <div className="mt-4 flex items-center gap-3 text-secondary">
                            <i className="fas fa-spinner fa-spin text-xl"></i>
                            <span className="font-semibold">جاري تقييم النطق...</span>
                        </div>
                    )}
                    {aiFeedback && !isEvaluating && (
                        <div className="w-full p-4 bg-dark/50 rounded-lg border border-white/10 animate-fadeIn">
                            <h4 className="font-bold text-lg text-center text-secondary mb-3">نتيجة التقييم</h4>
                            <div className="flex items-center gap-4">
                                <div className="w-1/4">
                                    <p className="text-3xl font-bold text-green-400 text-center">{aiFeedback.score}/10</p>
                                    <div className="w-full bg-slate-700 rounded-full h-2.5 mt-1">
                                        <div className="bg-gradient-to-r from-green-400 to-cyan-400 h-2.5 rounded-full" style={{width: `${aiFeedback.score * 10}%`, transition: 'width 0.5s ease-in-out'}}></div>
                                    </div>
                                </div>
                                <p className="flex-1 text-white text-right">{aiFeedback.feedback}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full p-4 md:p-6 mt-auto text-center flex items-center justify-center gap-4">
                {(hasRecorded || speechError) && (
                    <button
                        onClick={resetForRecording}
                        className="btn bg-gray-200 dark:bg-slate-600 text-dark dark:text-light py-3 px-8 rounded-full font-bold transition-transform duration-300 hover:scale-105 shadow-sm"
                    >
                        <i className="fas fa-sync-alt mr-2"></i>
                        حاول مرة أخرى
                    </button>
                )}
                <button
                    onClick={() => onComplete(true)}
                    className="btn bg-secondary text-dark py-3 px-8 rounded-full font-bold transition-transform duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                    التالي
                    <i className="fas fa-arrow-left"></i>
                </button>
            </div>
        </div>
    );
};

export default SpeakingSection;