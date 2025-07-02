import React, { useState, useEffect, useMemo } from 'react';
import { GeneratedContent, Language, Word, ReadingExercise, ListeningExercise, QuizQuestion } from '../types';
import ReadingSection from './content/ReadingSection';
import ListeningSection from './content/ListeningSection';
import QuizSection from './content/QuizSection';
import SpeakingSection from './content/SpeakingSection';
import LessonComplete from './content/LessonComplete';
import ProgressBar from './shared/ProgressBar';
import WordsSection from './content/WordsSection';

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
        
        // 1. A Words section to introduce concepts
        if (content.words && content.words.length > 0) {
            lessonSteps.push({ type: 'words', data: content.words });
        }

        // 2. A listening exercise
        if (content.listeningExercise) {
            lessonSteps.push({ type: 'listening', data: content.listeningExercise });
        }
        
        // 3. A reading exercise
        if (content.readingExercise) {
            lessonSteps.push({ type: 'reading', data: content.readingExercise });
        }
        
        // 4. A speaking exercise
        if (content.readingExercise?.sentence) {
            lessonSteps.push({ type: 'speaking', data: { phrase: content.readingExercise.sentence } });
        }

        // 5. Quiz questions
        if (content.quiz && content.quiz.questions.length > 0) {
            lessonSteps.push({ type: 'quiz', data: content.quiz.questions[0] });
             if (content.quiz.questions.length > 1) {
                lessonSteps.push({ type: 'quiz', data: content.quiz.questions[1] });
            }
        }

        setSteps(lessonSteps);
        setCurrentStepIndex(0);
        setScore(0);
    }, [content]);

    const handleStepComplete = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        // Move to the next step after a short delay to show feedback
        setTimeout(() => {
            if (currentStepIndex < steps.length - 1) {
                setCurrentStepIndex(prev => prev + 1);
            } else {
                // Lesson finished
                setCurrentStepIndex(steps.length); // Go to a "complete" state index
            }
        }, 1500);
    };
    
    const handleNextStep = () => {
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
    
    return (
        <div className="flex flex-col h-full">
            <ProgressBar progress={progress} />
            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
                {currentStep.type === 'words' && (
                    <div className="w-full flex flex-col items-center gap-4 h-full">
                        <WordsSection
                            words={currentStep.data}
                            language={language}
                            favoriteWords={favoriteWords}
                            onToggleFavorite={onToggleFavorite}
                        />
                        <button onClick={handleNextStep} className="btn bg-primary text-white py-3 px-8 rounded-full font-bold transition-transform duration-300 hover:scale-105 shadow-lg mt-4 flex-shrink-0">
                            بدء التمارين <i className="fas fa-arrow-left mr-2"></i>
                        </button>
                    </div>
                )}
                {currentStep.type === 'listening' && <ListeningSection exercise={currentStep.data} language={language} onNext={handleStepComplete} />}
                {currentStep.type === 'reading' && <ReadingSection exercise={currentStep.data} onNext={handleStepComplete} />}
                {currentStep.type === 'quiz' && <QuizSection quiz={{title: content.quiz.title, questions: [currentStep.data]}} onRetry={handleStepComplete} />}
                {currentStep.type === 'speaking' && <SpeakingSection phrase={currentStep.data.phrase} language={language} onComplete={handleStepComplete} />}
            </div>
        </div>
    );
};

export default Lesson;