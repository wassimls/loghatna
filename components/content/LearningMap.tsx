import React from 'react';
import { Category, UserProgress } from '../../types';

interface LearningMapProps {
  categories: Category[];
  progress: UserProgress | null;
  onCategoryClick: (categoryId: string) => void;
  isSubscribed: boolean;
  onUnlockClick: () => void;
  onStartPlacementTest: () => void;
}

const LearningMap: React.FC<LearningMapProps> = ({ categories, progress, onCategoryClick, isSubscribed, onUnlockClick, onStartPlacementTest }) => {
    const completedLessons = new Set(progress?.completed_lessons || []);
    const firstUnlockedLessonIndex = categories.findIndex((cat, index) => !completedLessons.has(cat.id) && (isSubscribed || index < 3));
    const hasStarted = progress && progress.completed_lessons.length > 0;

    return (
        <div className="p-4 md:p-8 w-full h-full overflow-y-auto" dir="rtl">
            <header className="text-center mb-12 animate-fadeIn">
                <h1 className="text-4xl font-extrabold text-white">خريطة التعلم</h1>
                <p className="text-lg text-gray-300 mt-2">اتبع المسار لإتقان لغتك الجديدة!</p>
                <div className="mt-6">
                    <button
                        onClick={onStartPlacementTest}
                        className={`font-bold text-lg py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto ${
                            hasStarted 
                            ? 'bg-dark/50 border-2 border-secondary text-secondary hover:bg-secondary hover:text-dark' 
                            : 'bg-gradient-to-r from-accent to-pink-500 text-white shadow-accent/30'
                        }`}
                    >
                        {hasStarted ? (
                            <>
                                <i className="fas fa-redo-alt"></i>
                                <span>إعادة اختبار تحديد المستوى</span>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-rocket"></i>
                                <span>ابدأ باختبار تحديد المستوى</span>
                            </>
                        )}
                    </button>
                    <p className="text-gray-400 mt-2 text-sm">
                        {hasStarted
                            ? "هل تريد إعادة تقييم مستواك وفتح الدروس المناسبة؟"
                            : "لست متأكداً من أين تبدأ؟ دعنا نحدد مستواك أولاً."}
                    </p>
                </div>
            </header>

            <div className="flex flex-wrap items-center justify-center gap-x-0 gap-y-10 md:gap-x-0 md:gap-y-16">
                {categories.map((category, index) => {
                    const isCompleted = completedLessons.has(category.id);
                    const isLocked = !isSubscribed && index >= 3 && !isCompleted;
                    const isNext = index === firstUnlockedLessonIndex;
                    
                    let nodeClasses = '';
                    let iconColor = '';
                    let nodeIcon = null;

                    if (isCompleted) {
                        nodeClasses = 'bg-green-600 border-green-400 shadow-lg shadow-green-500/30';
                        nodeIcon = <i className="fas fa-check"></i>;
                        iconColor = 'text-white';
                    } else if (isLocked) {
                        nodeClasses = 'bg-slate-700 border-slate-500 cursor-pointer'; // Make it clickable to show unlock prompt
                        nodeIcon = <i className="fas fa-lock"></i>;
                        iconColor = 'text-slate-400';
                    } else { 
                        nodeClasses = `bg-primary group-hover:bg-secondary border-purple-400 ${isNext ? 'animate-pulse-glow' : ''}`;
                        nodeIcon = <i className={category.icon}></i>;
                        iconColor = 'text-white group-hover:text-dark';
                    }
                    
                    return (
                        <React.Fragment key={category.id}>
                            <div className="flex flex-col items-center w-28 md:w-32 group relative">
                                <button
                                    onClick={() => isLocked ? onUnlockClick() : onCategoryClick(category.id)}
                                    className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 ${nodeClasses}`}
                                    aria-label={category.name}
                                >
                                    <span className={`text-2xl md:text-3xl transition-colors duration-300 ${iconColor}`}>{nodeIcon}</span>
                                </button>
                                <p className="mt-2 text-sm text-center text-white font-bold h-10 flex items-center">{category.name}</p>
                            </div>
                            
                            {index < categories.length - 1 && (
                                <div className={`h-1.5 w-10 md:w-12 rounded-full bg-gradient-to-r from-primary to-accent opacity-70`}></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
            
            {!isSubscribed && (
                 <div className="mt-20 text-center animate-fadeIn">
                     <button 
                        onClick={onUnlockClick}
                        className="bg-gradient-to-r from-secondary to-yellow-400 text-dark font-bold text-lg py-4 px-8 rounded-full shadow-lg shadow-secondary/30 transition-transform hover:scale-105 flex items-center gap-3 mx-auto"
                    >
                        <i className="fas fa-unlock-alt"></i>
                        افتح جميع الدروس
                    </button>
                    <p className="text-gray-400 mt-4">افتح كل المحتوى لتسريع رحلتك التعليمية!</p>
                </div>
            )}
        </div>
    );
};

export default LearningMap;
