


import React, { useState, useEffect, useRef } from 'react';
import { Language, User, ChatMessage } from '../../types';
import { streamChatResponse, translateText } from '../../services/openrouterService';
import * as userService from '../../services/userService';
import { speak } from '../../services/audioService';

interface ChatSectionProps {
    language: Language;
    user: User;
    apiKey: string;
}

const ChatSection: React.FC<ChatSectionProps> = ({ language, user, apiKey }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isHistoryLoading, setIsHistoryLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    // State for new features
    const [translations, setTranslations] = useState<{ [key: number]: string }>({});
    const [translatingIndex, setTranslatingIndex] = useState<number | null>(null);
    const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

    const systemInstruction = `You are a helpful and friendly language practice partner. Converse with the user, whose name is ${user.name}, in ${language.name}. Keep your responses concise, friendly, and appropriate for a language learner. The user is a native Arabic speaker. You can gently correct their mistakes.`;

     useEffect(() => {
        const loadHistory = async () => {
            if (!user?.id || !apiKey) {
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
    }, [language, user, apiKey]);

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
        if (translatingIndex !== null || translations[index] || !apiKey) return;
        setTranslatingIndex(index);
        try {
            const translation = await translateText(apiKey, text, language.name, 'Arabic');
            setTranslations(prev => ({...prev, [index]: translation}));
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "فشل في الترجمة.";
            setTranslations(prev => ({...prev, [index]: `خطأ: ${errorMessage}`}));
        } finally {
            setTranslatingIndex(null);
        }
    };

    const sendMessage = async () => {
        if (!input.trim() || isLoading || !apiKey) {
            return;
        }

        const userMessage: ChatMessage = { role: 'user', text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);
        setError(null);
        
        const placeholderMessage: ChatMessage = { role: 'model', text: '' };
        setMessages(prev => [...prev, placeholderMessage]);

        try {
            const stream = streamChatResponse(apiKey, newMessages, systemInstruction);
            
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
    
    const isReady = !!apiKey;

    return (
        <div className="p-4 md:p-8 flex-1 flex flex-col h-[calc(100%_-_1rem)] animate-fadeIn">
            <div className="content-header mb-6">
                <h2 className="text-primary text-2xl font-bold flex items-center gap-3">
                    <i className="fas fa-comments"></i>
                    الدردشة مع الذكاء الاصطناعي
                </h2>
                <p className="text-gray-500 dark:text-gray-400">تدرب على {language.name} في محادثة حقيقية!</p>
            </div>
            <div className="flex-1 bg-light dark:bg-slate-900/70 rounded-2xl shadow-inner p-4 flex flex-col justify-between overflow-hidden">
                 {isHistoryLoading ? (
                    <div className="flex-1 flex justify-center items-center">
                        <i className="fas fa-spinner fa-spin text-primary text-3xl"></i>
                        <p className="ml-4 text-dark dark:text-light">جاري تحميل سجل الدردشة...</p>
                    </div>
                ) : !isReady ? (
                    <div className="flex-1 flex flex-col justify-center items-center text-center">
                        <i className="fas fa-key text-secondary text-5xl mb-4"></i>
                        <h3 className="text-2xl font-bold text-dark dark:text-light mb-2">مطلوب مفتاح API</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">الرجاء إضافة مفتاح OpenRouter API الخاص بك في الإعدادات لبدء الدردشة.</p>
                    </div>
                ) : (
                    <div className="messages-area flex-1 overflow-y-auto pr-2 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && (
                                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-xl shadow-md flex-shrink-0">
                                        <i className="fas fa-robot"></i>
                                    </div>
                                )}
                                <div className={`max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-2xl shadow ${msg.role === 'user' ? 'bg-purple text-white rounded-br-none' : 'bg-white dark:bg-slate-700 text-dark dark:text-light rounded-bl-none'}`}>
                                    <p className="text-base" style={{ direction: msg.text.charCodeAt(0) > 1000 ? 'rtl' : 'ltr', textAlign: 'left' }}>
                                        {msg.text || <i className="fas fa-spinner fa-spin"></i>}
                                    </p>
                                    
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
                                    <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center text-xl shadow-md flex-shrink-0">
                                        <i className="fas fa-user"></i>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                 )}
                {error && <p className="text-red-500 text-center my-2 font-semibold animate-shake">{error}</p>}
                <div className="input-area mt-4 flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder={isReady ? `اكتب شيئًا باللغة ${language.name}...` : 'الرجاء إضافة مفتاح API أولاً'}
                        className="flex-1 p-4 rounded-full bg-white dark:bg-slate-700 border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                        disabled={isLoading || !isReady}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim() || !isReady}
                        className="w-14 h-14 bg-primary text-white rounded-full text-xl flex items-center justify-center transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatSection;