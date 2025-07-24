
import { SpeechSynthesisVoice } from '../types.ts';

// This module provides a robust, singleton-based service for Text-to-Speech (TTS).

// A global array to hold the voices once loaded.
let voices: SpeechSynthesisVoice[] = [];

// A singleton promise to ensure we only try to load voices once across the app.
let voicesPromise: Promise<SpeechSynthesisVoice[]> | null = null;
let fallbackInterval: number | undefined;


/**
 * Asynchronously gets the list of available speech synthesis voices from the browser.
 * This function handles the inconsistencies of the Web Speech API across different browsers.
 * It uses a singleton promise to prevent multiple load attempts.
 * @returns {Promise<SpeechSynthesisVoice[]>} A promise that resolves with an array of available voices.
 */
const getVoices = (): Promise<SpeechSynthesisVoice[]> => {
    if (voicesPromise) {
        return voicesPromise;
    }

    voicesPromise = new Promise((resolve) => {
        // This function populates the global `voices` array and resolves the promise.
        const loadAndResolve = () => {
            const voiceList = window.speechSynthesis.getVoices();
            if (voiceList.length > 0) {
                voices = voiceList as SpeechSynthesisVoice[];
                resolve(voices);
                // We can clear the event listener and interval now.
                window.speechSynthesis.onvoiceschanged = null;
                if (fallbackInterval) window.clearInterval(fallbackInterval);
            }
        };

        // If voices are already loaded, resolve immediately.
        let initialVoices = window.speechSynthesis.getVoices();
        if (initialVoices.length > 0) {
            voices = initialVoices as SpeechSynthesisVoice[];
            return resolve(voices);
        }

        // Otherwise, the standard way is to wait for the 'voiceschanged' event.
        window.speechSynthesis.onvoiceschanged = loadAndResolve;

        // Fallback for browsers that might not fire the event consistently.
        fallbackInterval = window.setInterval(loadAndResolve, 250);

        // A final timeout to prevent the app from waiting indefinitely.
        setTimeout(() => {
            if (fallbackInterval) window.clearInterval(fallbackInterval);
            if (voices.length === 0) {
                console.warn("Speech synthesis voices failed to load after timeout.");
                resolve([]); // Resolve with empty array to not block the app.
            }
        }, 3000); // 3 seconds should be more than enough.
    });
    return voicesPromise;
};

// Eagerly start loading voices as soon as the module is loaded in a browser environment.
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    getVoices();
}

interface SpeakOptions {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (e: SpeechSynthesisEvent) => void;
    rate?: number;
}

/**
 * Speaks the given text using the best available voice for the specified language.
 * @param {string} text The text to be spoken.
 * @param {string} lang The BCP 47 language code (e.g., 'ru-RU', 'ja-JP').
 * @param {SpeakOptions} options Optional callbacks and settings for speech events.
 */
export const speak = async (
    text: string,
    lang: string,
    options: SpeakOptions = {}
) => {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
        console.error('Speech Synthesis not supported.');
        if (options.onError) options.onError({ type: 'error' } as SpeechSynthesisEvent);
        return;
    }

    // Ensure voices are loaded before proceeding.
    const availableVoices = await getVoices();

    if (availableVoices.length === 0) {
        console.warn("No speech synthesis voices available to speak.");
        if (options.onError) {
             const errorEvent = { 
                type: 'error', 
                error: 'no-voice-found', 
                message: 'No voices available' 
            } as unknown as SpeechSynthesisEvent;
            options.onError(errorEvent);
        }
        return;
    }
    
    // Cancel any speech that is currently in progress.
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate ?? 1.0; // Default to normal speed (1.0)
    utterance.pitch = 1.0;

    // --- Advanced Voice Selection Logic ---
    // This logic finds the best available voice by scoring potential matches.
    const normalizedLang = lang.toLowerCase().replace('_', '-'); // e.g., 'ru-ru'
    const langPart = normalizedLang.split('-')[0]; // e.g., 'ru'

    let bestVoice: SpeechSynthesisVoice | null = null;
    let maxScore = 0;

    for (const voice of availableVoices) {
        const voiceLang = voice.lang.toLowerCase().replace('_', '-');
        let score = 0;

        if (voiceLang === normalizedLang) {
            score = 5; // Perfect match (e.g., 'ja-JP' -> 'ja-jp')
        } else if (voiceLang === langPart) {
            score = 4; // Primary language match (e.g., 'ja-JP' -> 'ja')
        } else if (voiceLang.startsWith(langPart + '-')) {
            score = 3; // Dialect match (e.g., 'en-US' for 'en-GB')
        }

        if (score > 0) {
            if (voice.localService) {
                score += 2; // Strongly prefer local voices for quality and speed.
            }
            if (voice.default) {
                score += 1; // Prefer default voices for the language.
            }
            
            if (score > maxScore) {
                maxScore = score;
                bestVoice = voice as SpeechSynthesisVoice;
            }
        }
    }

    if (bestVoice) {
        utterance.voice = bestVoice;
        // It's good practice to set the utterance lang to the voice's lang
        // for better engine compatibility.
        utterance.lang = bestVoice.lang;
    } else {
        const errorMsg = `No voice found for language ${lang}. The browser might not have it installed.`;
        console.warn(errorMsg);
        if (options.onError) {
            // Create a synthetic event-like object for consistency, since SpeechSynthesisErrorEvent is not constructible.
            const errorEvent = { 
                type: 'error', 
                error: 'no-voice-found', 
                message: errorMsg 
            } as unknown as SpeechSynthesisEvent;
            options.onError(errorEvent);
        }
        return; // Important: Stop execution to prevent speaking with a wrong voice.
    }

    // Assign callbacks
    utterance.onstart = options.onStart || (() => {});
    utterance.onend = options.onEnd || (() => {});
    utterance.onerror = options.onError || ((e) => console.error("Speech synthesis error:", (e as any).error || e));

    window.speechSynthesis.speak(utterance);
};

export const pauseSpeech = () => {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
    }
};

export const resumeSpeech = () => {
    if (window.speechSynthesis && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }
};

export const cancelSpeech = () => {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
};
