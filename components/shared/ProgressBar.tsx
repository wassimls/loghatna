import React from 'react';

interface ProgressBarProps {
    progress: number; // A value between 0 and 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4 relative overflow-hidden">
            <div 
                className="bg-gradient-to-r from-accent to-primary h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
