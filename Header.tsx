import React from 'react';
import { User } from '../types';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    return (
        <header className="bg-transparent p-5 md:p-6 flex flex-col sm:flex-row justify-between items-center relative z-20">
            <div className="flex items-center gap-4 z-10">
                 <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-2xl text-dark shadow-lg transform -rotate-12 transition-transform duration-300 hover:rotate-0 hover:scale-110">
                    <i className="fas fa-language"></i>
                </div>
                <div className="text-right">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-white">لغتنا</h1>
                    <p className="text-sm text-gray-300 opacity-90">استكشف حدودك اللغوية</p>
                </div>
            </div>
            <div className="flex items-center gap-4 z-10 mt-4 sm:mt-0">
                <div className="user-card relative bg-dark/50 p-2 pr-4 rounded-full flex items-center gap-3 backdrop-blur-sm border border-white/20 shadow-md">
                    <div className="text-right">
                        <div className="font-bold text-base p-1 text-white">
                            {user.name}
                        </div>
                        <div className="text-xs text-secondary font-bold flex items-center justify-end gap-1">
                            <i className="fas fa-star"></i>
                            <span>المستوى 1</span>
                        </div>
                    </div>
                    <div
                        className="w-12 h-12 rounded-full border-2 border-white bg-dark/50 flex items-center justify-center text-3xl"
                    >
                        {user.avatar}
                    </div>
                </div>
                <button 
                    onClick={onLogout}
                    className="logout-btn bg-dark/50 hover:bg-accent transition-colors duration-300 p-3 px-5 rounded-full font-bold flex items-center gap-2 backdrop-blur-sm border border-white/20 shadow-md text-white"
                    title="تسجيل الخروج"
                >
                    <i className="fas fa-sign-out-alt"></i>
                </button>
            </div>
        </header>
    );
};
export default Header;
