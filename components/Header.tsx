import React from 'react';
import { User } from '../types';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    return (
        <header className="bg-gradient-to-r from-primary to-purple text-white p-5 md:p-6 flex flex-col sm:flex-row justify-between items-center relative overflow-hidden z-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_70%)] opacity-50"></div>
            <div className="flex items-center gap-4 z-10 animate-fade-in-down">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-2xl text-primary shadow-lg transform -rotate-12 transition-transform duration-300 hover:rotate-0 hover:scale-110">
                    <i className="fas fa-comment-dots"></i>
                </div>
                <div className="text-right">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">لغتنا</h1>
                    <p className="text-sm opacity-90">تعلّم اللغات بمرح</p>
                </div>
            </div>
            <div className="flex items-center gap-4 z-10 mt-4 sm:mt-0">
                <div className="user-card relative bg-white/20 p-2 pr-4 rounded-full flex items-center gap-3 backdrop-blur-sm border border-white/20 shadow-md">
                    <div className="text-right">
                        <div className="font-bold text-base p-1">
                            {user.name}
                        </div>
                        <div className="text-xs text-accent font-bold flex items-center justify-end gap-1">
                            <i className="fas fa-bolt"></i>
                            <span>المستوى 1</span>
                        </div>
                    </div>
                    <div
                        className="w-12 h-12 rounded-full border-2 border-white bg-white/30 flex items-center justify-center text-3xl"
                    >
                        {user.avatar}
                    </div>
                </div>
                <button 
                    onClick={onLogout}
                    className="logout-btn bg-white/20 hover:bg-secondary transition-colors duration-300 p-3 px-5 rounded-full font-bold flex items-center gap-2 backdrop-blur-sm border border-white/20 shadow-md"
                    title="تسجيل الخروج"
                >
                    <i className="fas fa-sign-out-alt"></i>
                </button>
            </div>
        </header>
    );
};
export default Header;