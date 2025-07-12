// A small, reusable audio context.
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (audioContext && audioContext.state !== 'closed') {
        return audioContext;
    }
    try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        return audioContext;
    } catch (e) {
        console.error("Web Audio API is not supported in this browser.");
        return null;
    }
};

// A helper function to play a synthetic sound.
const playSynth = (
    type: OscillatorType,
    frequency: number,
    duration: number,
    volume: number = 0.5,
    startTime: number = 0
) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
        ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + startTime);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime + startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime + startTime);
    oscillator.stop(ctx.currentTime + startTime + duration);
};

// Exportable sound functions

export const playNavigationSound = () => {
    playSynth('sine', 880, 0.05, 0.1);
    playSynth('sine', 1046.50, 0.07, 0.1);
};

export const playCorrectSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    playSynth('sine', 523.25, 0.1, 0.2, 0); // C5
    playSynth('sine', 659.25, 0.1, 0.2, 0.05); // E5
    playSynth('sine', 783.99, 0.15, 0.2, 0.1); // G5
};

export const playIncorrectSound = () => {
    playSynth('sawtooth', 220, 0.15, 0.1);
    playSynth('sawtooth', 110, 0.2, 0.1, 0.05);
};

export const playLessonCompleteSound = () => {
    playSynth('sine', 523.25, 0.1, 0.2, 0);    // C5
    playSynth('sine', 659.25, 0.1, 0.2, 0.1);   // E5
    playSynth('sine', 783.99, 0.1, 0.2, 0.2);   // G5
    playSynth('sine', 1046.50, 0.2, 0.2, 0.3); // C6
};

export const playGenericClick = () => {
    playSynth('triangle', 1200, 0.05, 0.05);
};
