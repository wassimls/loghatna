import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Language, User, ChatMessage, SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '../../types';
import { streamChatResponse, translateText } from '../../services/geminiService';
import * as userService from '../../services/userService';
import { speak } from '../../services/audioService';

interface ChatSectionProps {
    language: Language;
    user: User;
    apiKey: string;
}

// ---- Start of new interactive avatar components ----
type Mood = 'neutral' | 'thinking' | 'happy' | 'sad' | 'idea';

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

const RobotEye: React.FC<{ mood: Mood }> = ({ mood }) => {
    const eyeBaseStyle = "transition-all duration-300";
    const eyeGlowStyle = { boxShadow: '0 0 4px 1px rgba(56, 189, 248, 0.5)' };

    switch (mood) {
        case 'happy':
            // Upward curve
            return <div className={`w-2.5 h-1.5 border-cyan-300 border-b-2 rounded-b-full ${eyeBaseStyle}`} style={eyeGlowStyle}></div>;
        case 'sad':
            // Downward curve
            return <div className={`w-2.5 h-1.5 border-cyan-300 border-t-2 rounded-t-full ${eyeBaseStyle}`} style={eyeGlowStyle}></div>;
        case 'idea':
            // Wide open circle
            return <div className={`w-2 h-2 border-2 border-cyan-300 rounded-full bg-dark/50 ${eyeBaseStyle}`} style={eyeGlowStyle}></div>;
        case 'thinking':
        default: // neutral
            // A simple horizontal line
            return <div className={`w-2 h-0.5 bg-cyan-300 ${eyeBaseStyle}`} style={eyeGlowStyle}></div>;
    }
};

const RobotMouth: React.FC<{ mood: Mood }> = ({ mood }) => {
    const mouthBaseStyle = "transition-all duration-300";
    const mouthGlowStyle = { boxShadow: '0 0 4px 1px rgba(56, 189, 248, 0.5)' };

    switch (mood) {
        case 'happy':
            // Wide smile
            return <div className={`w-4 h-2 border-b-2 border-cyan-300 rounded-b-full bg-transparent ${mouthBaseStyle}`} style={mouthGlowStyle}></div>;
        case 'sad':
            // Frown
            return <div className={`w-4 h-2 border-t-2 border-cyan-300 rounded-t-full bg-transparent ${mouthBaseStyle}`} style={mouthGlowStyle}></div>;
        case 'idea':
            // 'O' shape
            return <div className={`w-2 h-2 border-2 border-cyan-300 rounded-full bg-transparent ${mouthBaseStyle}`} style={mouthGlowStyle}></div>;
        case 'thinking':
        case 'neutral':
        default:
            // Flat line
            return <div className={`w-3 h-0.5 bg-cyan-300 ${mouthBaseStyle}`} style={mouthGlowStyle}></div>;
    }
};


const RobotAvatar: React.FC<{ mood: Mood }> = ({ mood }) => {
    const isThinking = mood === 'thinking';
    return (
        <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0 flex flex-col items-center justify-center relative shadow-md p-1">
            {/* Eyes Container */}
            <div className="flex items-center justify-center gap-2 w-full h-4">
                <RobotEye mood={mood} />
                <RobotEye mood={mood} />
            </div>
            {/* Mouth Container */}
            <div className="flex items-center justify-center w-full h-4 mt-0.5">
                <RobotMouth mood={mood} />
            </div>
            {/* Antenna */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-slate-400"></div>
            <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 border-slate-400 ${isThinking ? 'antenna-blink-animation' : 'bg-secondary'}`}></div>
        </div>
    );
};
// ---- End of new interactive avatar components ----


const TypingIndicator = () => (
    <div className="py-2 px-3">
        <div className="dot-flashing"></div>
    </div>
);

const useChatSpeechRecognition = (lang: string, onTranscriptUpdate: (transcript: string) => void) => {
    const [isListening, setIsListening] = useState(false);
    const [speechError, setSpeechError] = useState<string | null>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const startListening = useCallback(() => {
        if (isListening) return;

        if (!('webkitSpeechRecognition' in window)) {
            setSpeechError('عذراً، متصفحك لا يدعم ميزة التعرف على الكلام.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognitionRef.current = recognition;
        
        recognition.lang = lang;
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => {
            setIsListening(true);
            setSpeechError(null);
            onTranscriptUpdate('');
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                transcript += event.results[i][0].transcript;
            }
            onTranscriptUpdate(transcript);
        };
        
        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            let userMessage = `حدث خطأ غير متوقع: ${event.error}`;
            if (event.error === 'no-speech') userMessage = 'لم يتم اكتشاف أي كلام. حاول التحدث بوضوح.';
            if (event.error === 'audio-capture') userMessage = 'لا يمكن الوصول إلى الميكروفون. يرجى التأكد من أنك منحت الإذن.';
            if (event.error === 'not-allowed') userMessage = 'تم رفض الإذن باستخدام الميكروفون. يرجى تمكينه في إعدادات المتصفح.';
            setSpeechError(userMessage);
            setIsListening(false);
        };
        
        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();

    }, [isListening, lang, onTranscriptUpdate]);
    
    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);

    return { isListening, startListening, speechError };
};


const ChatSection: React.FC<ChatSectionProps> = ({ language, user, apiKey }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isHistoryLoading, setIsHistoryLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const [translations, setTranslations] = useState<{ [key: number]: string }>({});
    const [translatingIndex, setTranslatingIndex] = useState<number | null>(null);
    const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
    const isReady = !!apiKey;

    const { isListening, startListening, speechError } = useChatSpeechRecognition(language.code, setInput);

    const systemInstruction = `You are a helpful and friendly language practice partner. Converse with the user, whose name is ${user.name}, in ${language.name}. Keep your responses concise, friendly, and appropriate for a language learner. The user is a native Arabic speaker. You can gently correct their mistakes.`;

     useEffect(() => {
        const loadHistory = async () => {
            if (!user?.id || !isReady) {
                setIsHistoryLoading(false);
                return;
            };
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
    }, [language, user, isReady]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, translations, isHistoryLoading]);

    const handleSpeak = (text: string, index: number) => {
        if (speakingIndex !== null) return;
        setSpeakingIndex(index);
        speak(text, language.code, {
            onEnd: () => setSpeakingIndex(null),
            onError: () => setSpeakingIndex(null)
        });
    };

    const handleTranslate = async (text: string, index: number) => {
        if (translatingIndex !== null || translations[index] || !isReady) return;
        setTranslatingIndex(index);
        try {
            const translation = await translateText(text, language.name, 'Arabic', apiKey);
            setTranslations(prev => ({...prev, [index]: translation}));
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "فشل في الترجمة.";
            setTranslations(prev => ({...prev, [index]: `خطأ: ${errorMessage}`}));
        } finally {
            setTranslatingIndex(null);
        }
    };

    const sendMessage = async () => {
        if (!input.trim() || isLoading || !isReady) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);
        setError(null);
        
        const placeholderMessage: ChatMessage = { role: 'model', text: '' };
        setMessages(prev => [...prev, placeholderMessage]);

        try {
            const stream = streamChatResponse(newMessages, systemInstruction, apiKey);
            
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
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex-1 flex flex-col h-full animate-fadeIn p-4">
            <div className="flex-1 bg-dark/50 backdrop-blur-md rounded-2xl shadow-inner p-4 flex flex-col justify-between overflow-hidden border border-white/10">
                 {isHistoryLoading ? (
                    <div className="flex-1 flex justify-center items-center">
                        <i className="fas fa-spinner fa-spin text-secondary text-3xl"></i>
                        <p className="ml-4 text-white">جاري تحميل سجل الدردشة...</p>
                    </div>
                ) : !isReady ? (
                     <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
                        <i className="fas fa-key text-accent text-5xl mb-4"></i>
                        <h3 className="text-2xl font-bold text-white mb-2">مفتاح API مطلوب</h3>
                        <p className="text-gray-300 mb-6 max-w-md">الرجاء إدخال مفتاح API الخاص بـ Gemini في الإعدادات لتفعيل ميزة الدردشة.</p>
                    </div>
                ) : (
                    <div className="messages-area flex-1 overflow-y-auto pr-2 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && (
                                    <RobotAvatar mood={ (isLoading && index === messages.length - 1) ? 'thinking' : getMoodFromMessage(msg.text) } />
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
                {(error || speechError) && <p className="text-red-400 text-center text-sm my-2 font-semibold animate-shake">{error || speechError}</p>}
                <div className="input-area mt-4 flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder={isListening ? 'جاري الاستماع...' : (isReady ? `اكتب شيئًا باللغة ${language.name}...` : 'أدخل مفتاح API لتفعيل الدردشة')}
                        className="flex-1 p-4 rounded-xl bg-white dark:bg-slate-700 border-2 text-dark dark:text-light border-transparent focus:border-blue-500 focus:outline-none transition-colors"
                        disabled={isLoading || !isReady || isListening}
                    />
                     <button
                        onClick={startListening}
                        disabled={isLoading || !isReady || isListening}
                        className={`w-12 h-12 rounded-xl text-xl flex-shrink-0 flex items-center justify-center transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${isListening ? 'bg-red-500 text-white' : 'bg-primary text-white'}`}
                        title="تسجيل صوتي"
                    >
                        <i className={`fas fa-microphone-alt ${isListening ? 'fa-beat' : ''}`}></i>
                    </button>
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim() || !isReady}
                        className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xl flex-shrink-0 flex items-center justify-center transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatSection;