import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Language, User, ChatMessage, SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '../../types';
import { streamChatResponse, translateText } from '../../services/geminiService';
import * as userService from '../../services/userService';
import { speak, cancelSpeech } from '../../services/audioService';
import * as soundService from '../../services/soundService';


interface ChatSectionProps {
    language: Language;
    user: User;
    onUnlockClick: () => void;
}

// ---- Start of new interactive avatar components ----
type Mood = 'neutral' | 'listening' | 'thinking' | 'speaking' | 'happy' | 'sad' | 'idea';

const getMoodFromMessage = (text: string): Mood => {
    if (!text) return 'neutral';
    const lowerText = text.toLowerCase();

    const happyKeywords = ['مرحباً', 'أهلاً', '!', '😊', 'رائع', 'جميل', 'ممتاز', 'شكراً', 'hello', 'welcome', 'great', 'excellent', 'thank'];
    if (happyKeywords.some(keyword => lowerText.includes(keyword))) {
        return 'happy';
    }

    const ideaKeywords = ['?', 'كيف', 'ماذا', 'لماذا', 'هل', 'what', 'how', 'why', 'when', 'who', '?', 'idea'];
    if (ideaKeywords.some(keyword => lowerText.includes(keyword))) {
        return 'idea';
    }
    
    const sadKeywords = ['عذراً', 'آسف', 'خطأ', 'sorry', '😔', 'error', 'problem', 'مشكلة'];
    if (sadKeywords.some(keyword => lowerText.includes(keyword))) {
        return 'sad';
    }

    return 'neutral';
};

const AstronautVisor: React.FC<{ mood: Mood }> = ({ mood }) => {
    const baseStyle = { transition: 'all 0.3s ease-in-out' };
    let content;

    switch (mood) {
        case 'happy':
            content = <path d="M 6 14 Q 12 18 18 14" stroke="#86efac" strokeWidth="2" fill="none" strokeLinecap="round" />;
            break;
        case 'sad':
            content = <path d="M 6 16 Q 12 12 18 16" stroke="#f87171" strokeWidth="2" fill="none" strokeLinecap="round" />;
            break;
        case 'speaking':
            content = (
                <g stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="8" y1="13" x2="8" y2="11"><animate attributeName="y2" values="11;13;11" dur="0.6s" repeatCount="indefinite" /></line>
                    <line x1="12" y1="14" x2="12" y2="10"><animate attributeName="y2" values="10;14;10" dur="0.6s" repeatCount="indefinite" /></line>
                    <line x1="16" y1="13" x2="16" y2="11"><animate attributeName="y2" values="11;13;11" dur="0.6s" repeatCount="indefinite" /></line>
                </g>
            );
            break;
        case 'listening':
            content = (
                <line x1="7" y1="12" x2="17" y2="12" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round">
                     <animate attributeName="x2" values="17;14;17" dur="1s" repeatCount="indefinite" />
                </line>
            );
            break;
        case 'thinking':
            content = (
                <g fill="#67e8f9">
                    <circle cx="8" cy="12" r="1.5"><animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" begin="0s" /></circle>
                    <circle cx="12" cy="12" r="1.5"><animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" begin="0.3s" /></circle>
                    <circle cx="16" cy="12" r="1.5"><animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" begin="0.6s" /></circle>
                </g>
            );
            break;
        case 'idea':
             content = <path d="M12 7 a 3 3 0 0 1 3 3 c 0 1.5 -1.5 2.5 -3 4 c -1.5 -1.5 -3 -2.5 -3 -4 a 3 3 0 0 1 3 -3 M10 16 h 4" stroke="#facc15" fill="none" strokeWidth="1.5" strokeLinecap="round"/>;
            break;
        case 'neutral':
        default:
            content = <path d="M 4 12 Q 12 11 20 12" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" fill="none" />;
            break;
    }
    return <svg viewBox="0 0 24 24" className="w-full h-full" style={baseStyle}>{content}</svg>;
};

const AstronautAvatar: React.FC<{ mood: Mood; size?: 'small' | 'large' }> = ({ mood, size = 'small' }) => {
    const sizeClasses = size === 'small'
        ? { container: 'w-10 h-10', visor: 'w-7 h-5' }
        : { container: 'w-48 h-48', visor: 'w-32 h-24' };

    return (
        <div className={`${sizeClasses.container} rounded-full bg-slate-300 flex-shrink-0 flex items-center justify-center relative shadow-inner p-1`}>
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <div className={`${sizeClasses.visor} bg-gray-900 rounded-[45%] border-4 border-gray-400 overflow-hidden`}>
                     <AstronautVisor mood={mood} />
                </div>
            </div>
        </div>
    );
};
// ---- End of interactive avatar components ----


const TypingIndicator = () => (
    <div className="py-2 px-3">
        <div className="dot-flashing"></div>
    </div>
);

const useAutoSpeechRecognition = (lang: string, onTranscriptFinalized: (transcript: string) => void) => {
    const [isListening, setIsListening] = useState(false);
    const [speechError, setSpeechError] = useState<string | null>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const transcriptRef = useRef('');

    const startListening = useCallback(() => {
        if (isListening) return;

        if (!('webkitSpeechRecognition' in window)) {
            setSpeechError('عذراً، متصفحك لا يدعم ميزة التعرف على الكلام.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognitionRef.current = recognition;
        
        recognition.lang = lang;
        recognition.continuous = false; // Important for auto-sending on stop
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
            setSpeechError(null);
            transcriptRef.current = '';
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript;
            transcriptRef.current = transcript;
        };
        
        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            let userMessage = `حدث خطأ غير متوقع: ${event.error}`;
            if (event.error === 'no-speech') userMessage = 'لم أسمع شيئًا. حاول مرة أخرى.';
            if (event.error === 'audio-capture') userMessage = 'لا يمكن الوصول إلى الميكروفون. يرجى التأكد من أنك منحت الإذن.';
            if (event.error === 'not-allowed') userMessage = 'تم رفض الإذن باستخدام الميكروفون. يرجى تمكينه في إعدادات المتصفح.';
            setSpeechError(userMessage);
            setIsListening(false);
        };
        
        recognition.onend = () => {
            setIsListening(false);
            if (transcriptRef.current.trim()) {
                onTranscriptFinalized(transcriptRef.current.trim());
            }
        };

        recognition.start();

    }, [isListening, lang, onTranscriptFinalized]);
    
    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);

    return { isListening, startListening, speechError };
};


const ChatSection: React.FC<ChatSectionProps> = ({ language, user, onUnlockClick }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isHistoryLoading, setIsHistoryLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const [translations, setTranslations] = useState<{ [key: number]: string }>({});
    const [translatingIndex, setTranslatingIndex] = useState<number | null>(null);
    const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

    const [isChatLocked, setIsChatLocked] = useState(false);
    const [messageCount, setMessageCount] = useState(0);

    // ---- New Voice Mode State ----
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [voiceStatus, setVoiceStatus] = useState<Mood>('neutral');

    const CHAT_LIMIT = 3;
    const getLocalStorageKey = useCallback(() => `galaxya_chat_${user.id}_${new Date().toISOString().split('T')[0]}`, [user.id]);
    const systemInstruction = `You are a helpful and friendly language practice partner. Converse with the user, whose name is ${user.name}, in ${language.name}. Keep your responses concise, friendly, and appropriate for a language learner. The user is a native Arabic speaker. You can gently correct their mistakes.`;
    
    const sendVoiceMessage = (transcript: string) => {
        if (!transcript.trim() || isChatLocked) return;
    
        const userMessage: ChatMessage = { role: 'user', text: transcript };
    
        setVoiceStatus('thinking');
        setError(null);
    
        // Use a functional update to get the most recent state and avoid stale closures.
        setMessages(currentMessages => {
            const newMessages = [...currentMessages, userMessage];
            
            if (!user.is_subscribed) {
                setMessageCount(currentCount => {
                    const newCount = currentCount + 1;
                    localStorage.setItem(getLocalStorageKey(), newCount.toString());
                    if (newCount >= CHAT_LIMIT) setIsChatLocked(true);
                    return newCount;
                });
            }
    
            // Perform the async operation using the up-to-date `newMessages`.
            (async () => {
                try {
                    const stream = streamChatResponse(newMessages, systemInstruction);
                    let fullResponse = '';
                    for await (const chunk of stream) {
                        fullResponse += chunk;
                    }
    
                    const finalModelMessage: ChatMessage = { role: 'model', text: fullResponse };
                    const finalMessages = [...newMessages, finalModelMessage];
                    
                    setMessages(finalMessages);
                    await userService.saveChatHistory(user.id, language.code, finalMessages);
    
                    speak(fullResponse, language.code, {
                        onStart: () => setVoiceStatus('speaking'),
                        onEnd: () => setVoiceStatus('neutral'),
                        onError: () => {
                            setError("حدث خطأ أثناء تشغيل الصوت.");
                            setVoiceStatus('neutral');
                        }
                    });
    
                } catch (e) {
                    console.error("Chat error:", e);
                    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
                    setError(`عذرًا، حدث خطأ: ${errorMessage}`);
                    setMessages(currentMessages); // Revert on error
                    
                     if (!user.is_subscribed) {
                        setMessageCount(currentCount => {
                            const newCount = Math.max(0, currentCount - 1);
                            localStorage.setItem(getLocalStorageKey(), newCount.toString());
                            if (newCount < CHAT_LIMIT) setIsChatLocked(false);
                            return newCount;
                        });
                    }
    
                    speak(`عذراً, حدث خطأ ما. حاول مرة أخرى.`, 'ar-SA', { onEnd: () => setVoiceStatus('neutral') });
                }
            })();
    
            return newMessages;
        });
    };

    const handleVoiceMessage = useCallback((transcript: string) => {
        sendVoiceMessage(transcript);
    }, [user.id, language.code, isChatLocked, getLocalStorageKey, systemInstruction]);
    
    const { isListening: isMicListening, startListening: startMic, speechError } = useAutoSpeechRecognition(language.code, handleVoiceMessage);
    
     useEffect(() => {
        const loadHistory = async () => {
            if (!user?.id) {
                setIsHistoryLoading(false);
                return;
            };

            if (!user.is_subscribed) {
                const key = getLocalStorageKey();
                const storedCount = parseInt(localStorage.getItem(key) || '0', 10);
                setMessageCount(storedCount);
                if (storedCount >= CHAT_LIMIT) {
                    setIsChatLocked(true);
                } else {
                    setIsChatLocked(false);
                }
            } else {
                setIsChatLocked(false);
            }

            setIsHistoryLoading(true);
            const history = await userService.getChatHistory(user.id, language.code);
            if (history && history.length > 0) {
                setMessages(history);
            } else {
                 setMessages([
                    { role: 'model', text: `مرحباً ${user.name}! أنا مستعد للدردشة باللغة ${language.name}. عن ماذا تود أن نتحدث؟` }
                ]);
            }
            setIsHistoryLoading(false);
        };

        loadHistory();
        setTranslations({});
        setTranslatingIndex(null);
        setSpeakingIndex(null);
    }, [language, user, getLocalStorageKey]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, translations, isHistoryLoading]);

     useEffect(() => {
        return () => { // Cleanup on unmount
            cancelSpeech();
        };
    }, []);

    useEffect(() => {
        if (!isVoiceMode) {
            cancelSpeech();
            setVoiceStatus('neutral');
        }
    }, [isVoiceMode]);

    useEffect(() => {
        setVoiceStatus(isMicListening ? 'listening' : 'neutral');
    }, [isMicListening]);

    const handleSpeak = (text: string, index: number) => {
        if (speakingIndex !== null) return;
        setSpeakingIndex(index);
        speak(text, language.code, {
            onEnd: () => setSpeakingIndex(null),
            onError: () => {
                console.error(`Could not play audio for language ${language.code}`);
                setSpeakingIndex(null);
            }
        });
    };

    const handleTranslate = async (text: string, index: number) => {
        if (translatingIndex !== null || translations[index]) return;
        setTranslatingIndex(index);
        try {
            const translation = await translateText(text, language.name, 'Arabic');
            setTranslations(prev => ({...prev, [index]: translation}));
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "فشل في الترجمة.";
            setTranslations(prev => ({...prev, [index]: `خطأ: ${errorMessage}`}));
        } finally {
            setTranslatingIndex(null);
        }
    };

    const sendTextMessage = async () => {
        if (!input.trim() || isLoading || isChatLocked) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        if (!user.is_subscribed) {
            const newCount = messageCount + 1;
            setMessageCount(newCount);
            localStorage.setItem(getLocalStorageKey(), newCount.toString());
            if (newCount >= CHAT_LIMIT) setIsChatLocked(true);
        }

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);
        setError(null);
        
        const placeholderMessage: ChatMessage = { role: 'model', text: '' };
        setMessages(prev => [...prev, placeholderMessage]);

        try {
            const stream = streamChatResponse(newMessages, systemInstruction);
            
            let currentModelMessage = '';
            for await (const chunk of stream) {
                currentModelMessage += chunk;
                setMessages(prev => {
                    const updatedMessages = [...prev];
                    const newLastMessage: ChatMessage = { role: 'model', text: currentModelMessage };
                    updatedMessages[updatedMessages.length - 1] = newLastMessage;
                    return updatedMessages;
                });
            }
            const finalModelMessage: ChatMessage = { role: 'model', text: currentModelMessage };
            const finalMessages = [...newMessages, finalModelMessage];
            await userService.saveChatHistory(user.id, language.code, finalMessages);

        } catch (e) {
            console.error("Chat error:", e);
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
            setError(`عذرًا، حدث خطأ أثناء إرسال الرسالة: ${errorMessage}`);
            setMessages(prev => prev.slice(0, -1));
             if (!user.is_subscribed) {
                setMessageCount(prevCount => {
                    const newCount = prevCount > 0 ? prevCount - 1 : 0;
                     localStorage.setItem(getLocalStorageKey(), newCount.toString());
                     if (newCount < CHAT_LIMIT) setIsChatLocked(false);
                     return newCount;
                });
            }
        } finally {
            setIsLoading(false);
        }
    };
    
     const getVoiceStatusText = () => {
        switch (voiceStatus) {
            case 'listening': return 'جاري الاستماع...';
            case 'thinking': return '...يفكر';
            case 'speaking': return '...يتحدث';
            case 'neutral': return 'انقر على الميكروفون للتحدث';
            default: return '';
        }
    };
    
    return (
        <div className="p-4 md:p-8 flex-1 flex flex-col h-full animate-fadeIn">
            <div className="content-header mb-6 flex justify-between items-center">
                <div>
                     <h2 className="text-secondary text-2xl font-bold flex items-center gap-3">
                        <i className="fas fa-comments"></i>
                        الدردشة مع الذكاء الاصطناعي
                    </h2>
                    <p className="text-gray-300">تدرب على {language.name} في محادثة حقيقية!</p>
                </div>
                 <div className="flex items-center gap-3 bg-dark/50 p-1.5 rounded-full border border-white/10">
                    <span className={`px-2 text-sm font-bold ${!isVoiceMode ? 'text-secondary' : 'text-gray-400'}`}><i className="fas fa-keyboard"></i> نصي</span>
                    <div onClick={() => setIsVoiceMode(!isVoiceMode)} className="w-12 h-7 bg-dark/70 rounded-full flex items-center p-1 cursor-pointer">
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${isVoiceMode ? 'translate-x-5' : ''}`}></div>
                    </div>
                     <span className={`px-2 text-sm font-bold ${isVoiceMode ? 'text-secondary' : 'text-gray-400'}`}><i className="fas fa-microphone-alt"></i> صوتي</span>
                </div>
            </div>
            
            {isVoiceMode ? (
                <div className="flex-1 bg-dark/50 backdrop-blur-md rounded-2xl shadow-inner p-4 flex flex-col justify-between items-center overflow-hidden border border-white/10">
                    <div className="flex-1 flex flex-col justify-center items-center text-center">
                         <AstronautAvatar mood={voiceStatus} size="large" />
                         <p className="text-xl text-gray-200 mt-6 min-h-[28px]">{getVoiceStatusText()}</p>
                         {(error || speechError) && <p className="text-red-400 font-semibold mt-2">{error || speechError}</p>}
                    </div>
                     {isChatLocked ? (
                        <div className="mt-4 text-center p-4 bg-yellow-500/10 border-2 border-secondary rounded-xl">
                            <h4 className="text-lg font-bold text-secondary"><i className="fas fa-lock mr-2"></i> لقد وصلت إلى الحد اليومي</h4>
                            <button onClick={onUnlockClick} className="mt-2 btn bg-secondary text-dark py-2 px-4 rounded-full font-bold text-sm">الترقية للمحادثة بلا حدود</button>
                        </div>
                    ) : (
                        <button
                            onClick={startMic}
                            disabled={voiceStatus !== 'neutral'}
                            className={`w-24 h-24 rounded-full text-white text-4xl flex items-center justify-center transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                                ${voiceStatus === 'listening' ? 'bg-red-500 animate-pulse scale-110' : 'bg-secondary hover:scale-110'}
                            `}
                        >
                            <i className="fas fa-microphone-alt"></i>
                        </button>
                    )}
                </div>
            ) : (
                <div className="flex-1 bg-dark/50 backdrop-blur-md rounded-2xl shadow-inner p-4 flex flex-col justify-between overflow-hidden border border-white/10">
                     {isHistoryLoading ? (
                        <div className="flex-1 flex justify-center items-center">
                            <i className="fas fa-spinner fa-spin text-secondary text-3xl"></i>
                            <p className="ml-4 text-white">جاري تحميل سجل الدردشة...</p>
                        </div>
                    ) : (
                        <div className="messages-area flex-1 overflow-y-auto pr-2 space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'model' && (
                                        <AstronautAvatar mood={ (isLoading && index === messages.length - 1) ? 'thinking' : getMoodFromMessage(msg.text) } />
                                    )}
                                    <div className={`max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-2xl speech-bubble ${msg.role === 'user' ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-none speech-bubble-right' : 'bg-white dark:bg-slate-700 text-dark dark:text-light rounded-bl-none speech-bubble-left'}`}>
                                        {msg.text.trim() === '' && isLoading && index === messages.length - 1 ? (
                                            <TypingIndicator />
                                        ) : (
                                            <p className="text-base" style={{ direction: msg.text.charCodeAt(0) > 1000 ? 'rtl' : 'ltr', textAlign: 'left' }}>
                                                {msg.text}
                                            </p>
                                        )}
                                        
                                        {translations[index] && (
                                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-600">
                                                <p className="text-base text-gray-600 dark:text-gray-300" dir="rtl">{translations[index]}</p>
                                            </div>
                                        )}
                                        
                                        {msg.role === 'model' && msg.text && (
                                            <div className="flex justify-end gap-4 mt-2 pt-2 border-t border-gray-200 dark:border-slate-600">
                                                <button 
                                                    onClick={() => handleSpeak(msg.text, index)}
                                                    disabled={speakingIndex !== null}
                                                    className="text-gray-400 hover:text-primary transition-colors disabled:opacity-50"
                                                    title="الاستماع">
                                                    <i className={`fas fa-volume-up ${speakingIndex === index ? 'fa-beat' : ''}`}></i>
                                                </button>
                                                <button 
                                                    onClick={() => handleTranslate(msg.text, index)}
                                                    disabled={translatingIndex === index || !!translations[index]}
                                                    className="text-gray-400 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="ترجمة">
                                                    {translatingIndex === index ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-language"></i>}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-xl shadow-md flex-shrink-0">
                                            <i className="fas fa-user"></i>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                     )}
                    {error && <p className="text-red-400 text-center text-sm my-2 font-semibold animate-shake">{error}</p>}
                    
                    {isChatLocked ? (
                        <div className="mt-4 text-center p-4 bg-yellow-500/10 border-2 border-secondary rounded-xl">
                            <h4 className="text-lg font-bold text-secondary"><i className="fas fa-lock mr-2"></i> لقد وصلت إلى الحد اليومي للرسائل</h4>
                            <button onClick={onUnlockClick} className="mt-2 btn bg-secondary text-dark py-2 px-4 rounded-full font-bold text-sm">الترقية للمحادثة بلا حدود</button>
                        </div>
                    ) : (
                        <div className="input-area mt-4 flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendTextMessage()}
                                placeholder={`اكتب شيئًا باللغة ${language.name}...`}
                                className="flex-1 p-4 rounded-xl bg-white dark:bg-slate-700 border-2 text-dark dark:text-light border-transparent focus:border-blue-500 focus:outline-none transition-colors"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendTextMessage}
                                disabled={isLoading || !input.trim()}
                                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xl flex-shrink-0 flex items-center justify-center transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatSection;