import React from 'react';
import { Category, UserProgress } from '../../types';

interface LearningMapProps {
  categories: Category[];
  progress: UserProgress | null;
  onCategoryClick: (categoryId: string) => void;
}

const LearningMap: React.FC<LearningMapProps> = ({ categories, progress, onCategoryClick }) => {
    const completedLessons = new Set(progress?.completed_lessons || []);

    return (
        <div className="p-4 md:p-8 w-full h-full overflow-y-auto" dir="rtl">
            <header className="text-center mb-12 animate-fadeIn">
                <h1 className="text-4xl font-extrabold text-white">خريطة التعلم</h1>
                <p className="text-lg text-gray-300 mt-2">اتبع المسار لإتقان لغتك الجديدة!</p>
            </header>

            <div className="flex flex-wrap items-center justify-center gap-x-0 gap-y-10 md:gap-x-0 md:gap-y-16">
                {categories.map((category, index) => {
                    const isCompleted = completedLessons.has(category.id);
                    
                    let nodeClasses = '';
                    let iconColor = '';
                    let nodeIcon = null;

                    if (isCompleted) {
                        nodeClasses = 'bg-green-600 border-green-400 shadow-lg shadow-green-500/30';
                        nodeIcon = <i className="fas fa-check"></i>;
                        iconColor = 'text-white';
                    } else { // Available
                        nodeClasses = 'bg-primary group-hover:bg-secondary border-purple-400';
                        nodeIcon = <i className={category.icon}></i>;
                        iconColor = 'text-white group-hover:text-dark';
                    }
                    
                    return (
                        <React.Fragment key={category.id}>
                            <div className="flex flex-col items-center w-28 md:w-32 group relative">
                                <button
                                    onClick={() => onCategoryClick(category.id)}
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
             <div className="mt-20 text-center text-gray-400">
                <p>كل الفئات متاحة. اختر أي فئة لتبدأ رحلتك!</p>
            </div>
        </div>
    );
};

export default LearningMap;
