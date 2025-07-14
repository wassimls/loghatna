

import React, { useState, useEffect, useMemo } from 'react';
import { GeneratedContent, Language, Word, ReadingExercise, ListeningExercise, QuizQuestion } from '../types';
import ReadingSection from './content/ReadingSection';
import ListeningSection from './content/ListeningSection';
import QuizSection from './content/QuizSection';
import SpeakingSection from './content/SpeakingSection';
import LessonComplete from './content/LessonComplete';
import ProgressBar from './shared/ProgressBar';
import WordsSection from './content/WordsSection';
import * as soundService from '../services/soundService';

interface LessonProps {
    content: GeneratedContent;
    language: Language;
    onComplete: () => void;
    favoriteWords: Word[];
    onToggleFavorite: (word: Word) => void;
}

type LessonStep = 
    | { type: 'words', data: Word[] }
    | { type: 'reading', data: ReadingExercise }
    | { type: 'listening', data: ListeningExercise }
    | { type: 'quiz', data: QuizQuestion }
    | { type: 'speaking', data: { phrase: string } }
    | { type: 'complete', data: { score: number, total: number } };

const Lesson: React.FC<LessonProps> = ({ content, language, onComplete, favoriteWords, onToggleFavorite }) => {
    const [steps, setSteps] = useState<LessonStep[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const lessonSteps: LessonStep[] = [];
        
        if (content.words && content.words.length > 0) {
            lessonSteps.push({ type: 'words', data: content.words });
        }
        if (content.listeningExercise) {
            lessonSteps.push({ type: 'listening', data: content.listeningExercise });
        }
        if (content.readingExercise) {
            lessonSteps.push({ type: 'reading', data: content.readingExercise });
        }
        if (content.readingExercise?.sentence) {
            lessonSteps.push({ type: 'speaking', data: { phrase: content.readingExercise.sentence } });
        }
        if (content.quiz && content.quiz.questions.length > 0) {
            content.quiz.questions.forEach(q => lessonSteps.push({ type: 'quiz', data: q }));
        }

        setSteps(lessonSteps);
        setCurrentStepIndex(0);
        setScore(0);
    }, [content]);

    const handleStepComplete = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        setTimeout(() => {
            if (currentStepIndex < steps.length - 1) {
                setCurrentStepIndex(prev => prev + 1);
            } else {
                setCurrentStepIndex(steps.length);
            }
        }, 1500);
    };
    
    const handleNextStep = () => {
        soundService.playNavigationSound();
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            setCurrentStepIndex(steps.length);
        }
    };
    
    const totalInteractiveSteps = useMemo(() => 
        steps.filter(step => step.type !== 'words' && step.type !== 'complete').length
    , [steps]);

    if (steps.length === 0) {
        return <div>Loading lesson...</div>;
    }

    if (currentStepIndex >= steps.length) {
        return <LessonComplete score={score} total={totalInteractiveSteps} onFinish={onComplete} />;
    }

    const currentStep = steps[currentStepIndex];
    const progress = (currentStepIndex / steps.length) * 100;

    const renderStepContent = () => {
        const exerciseProps = {
            className: "w-full max-w-3xl bg-white/5 dark:bg-dark/30 backdrop-blur-sm rounded-3xl shadow-2xl p-4 md:p-6 border border-white/10"
        };
        switch (currentStep.type) {
            case 'words':
                return (
                    <div className="w-full flex flex-col items-center gap-4 h-full">
                        <WordsSection
                            words={currentStep.data}
                            language={language}
                            favoriteWords={favoriteWords}
                            onToggleFavorite={onToggleFavorite}
                        />
                        <button onClick={handleNextStep} className="btn bg-secondary text-dark py-3 px-8 rounded-full font-bold transition-transform duration-300 hover:scale-105 shadow-lg mt-4 flex-shrink-0">
                            بدء التمارين <i className="fas fa-arrow-left mr-2"></i>
                        </button>
                    </div>
                );
            case 'listening':
                return <div className={exerciseProps.className}><ListeningSection exercise={currentStep.data} language={language} onNext={handleStepComplete} /></div>;
            case 'reading':
                return <div className={exerciseProps.className}><ReadingSection exercise={currentStep.data} onNext={handleStepComplete} /></div>;
            case 'quiz':
                return <div className={exerciseProps.className}><QuizSection quiz={{title: content.quiz.title, questions: [currentStep.data]}} onRetry={handleStepComplete} /></div>;
            case 'speaking':
                 return <div className={exerciseProps.className}><SpeakingSection phrase={currentStep.data.phrase} language={language} onComplete={handleStepComplete} /></div>;
            default:
                return null;
        }
    };
    
    return (
        <div className="flex flex-col h-full">
            <div className="px-4 pt-2">
                <ProgressBar progress={progress} />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-2 md:p-4">
                 {renderStepContent()}
            </div>
        </div>
    );
};

export default Lesson;