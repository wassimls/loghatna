import React, { useState, useEffect, useCallback } from 'react';
import { Language, SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '../../types';
import FeedbackFooter from '../shared/FeedbackFooter';

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
    phrase?: string;
    onComplete: (isCorrect: boolean) => void;
}

const SpeakingSection: React.FC<SpeakingSectionProps> = ({ language, phrase, onComplete }) => {
    const phraseToSay = phrase;
    const { text, isListening, startListening, error: speechError, reset: resetSpeech } = useSpeechRecognition(language.code);
    const [hasRecorded, setHasRecorded] = useState(false);

    useEffect(() => {
        resetSpeech();
        setHasRecorded(false);
    }, [phrase, language, resetSpeech]);
    
    useEffect(() => {
        if (text && !isListening) {
            setHasRecorded(true);
        }
    }, [text, isListening]);

    if (!phraseToSay) {
        return (
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center animate-fadeIn bg-light dark:bg-slate-900/70">
                 <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-purple/10 dark:from-primary/20 dark:to-purple/20 text-primary rounded-full flex items-center justify-center mb-6">
                    <i className="fas fa-microphone-alt text-5xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-dark dark:text-light mb-2">اختر فئة أولاً</h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg">يرجى تحديد فئة من الشريط الجانبي لبدء تمرين التحدث.</p>
            </div>
        );
    }

    const handleRecord = () => {
        setHasRecorded(false);
        resetSpeech();
        startListening();
    }
    
    // A simple similarity check. For a real app, a more sophisticated algorithm would be needed.
    const isCorrect = text.toLowerCase().trim() === phraseToSay.toLowerCase().trim();

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col h-full">
            <div className="flex-grow flex flex-col items-center justify-center">
                 <h3 className="text-dark dark:text-light font-bold text-xl mb-4 text-center">انطق الجملة التالية بوضوح:</h3>
                <div className="my-6 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-2xl text-dark dark:text-light font-medium text-center dir-ltr">
                    <p>{phraseToSay}</p>
                </div>
                
                {!hasRecorded && !speechError && (
                    <button
                        onClick={handleRecord}
                        disabled={isListening}
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
                )}

                <div className="w-full mt-6 min-h-[100px] flex flex-col items-center justify-center">
                    {speechError && (
                        <div className="w-full text-center p-4 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded-lg text-red-800 dark:text-red-200 font-semibold animate-fadeIn flex flex-col items-center gap-4">
                            <div>
                                <i className="fas fa-exclamation-triangle mr-2"></i>
                                {speechError}
                            </div>
                            <button
                                onClick={handleRecord}
                                className="btn bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-full font-bold transition-transform hover:scale-105"
                            >
                                <i className="fas fa-sync-alt mr-2"></i>
                                حاول مرة أخرى
                            </button>
                        </div>
                    )}
                    
                    {hasRecorded && text && !speechError && (
                        <div className="w-full text-center animate-fadeIn">
                            <h4 className="font-bold text-lg mb-2 dark:text-light">ما قلته:</h4>
                            <p className="p-4 bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-700 rounded-lg text-blue-800 dark:text-blue-200 font-semibold dir-ltr">{text}</p>
                        </div>
                    )}
                </div>
            </div>

             {hasRecorded && !speechError ? (
                 <FeedbackFooter 
                    isCorrect={isCorrect}
                    correctAnswer={`النطق الصحيح: "${phraseToSay}"`}
                    onContinue={() => onComplete(isCorrect)}
                />
            ) : (
                <div className="w-full p-4 md:p-6 mt-auto text-center">
                    <button
                        onClick={() => onComplete(false)}
                        className="btn bg-gray-200 dark:bg-slate-600 text-dark dark:text-light py-3 px-8 rounded-full font-bold transition-transform duration-300 hover:scale-105 shadow-sm flex items-center justify-center mx-auto"
                    >
                        تخطي التمرين
                        <i className="fas fa-forward mr-2"></i>
                    </button>
                </div>
            )}
        </div>
    );
};

export default SpeakingSection;
