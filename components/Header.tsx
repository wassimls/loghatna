
import React from 'react';
import { User } from '../types';

interface HeaderProps {
    user: User;
    onLogout: () => void;
    onAccountClick: () => void;
    onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onAccountClick, onSettingsClick }) => {
    return (
        <header className="bg-dark/20 backdrop-blur-sm relative z-20">
            <div className="p-3 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center gap-3 z-10">
                     <button 
                        onClick={onSettingsClick}
                        className="bg-dark/50 hover:bg-white/20 transition-colors duration-300 w-12 h-12 rounded-full font-bold flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-md text-white"
                        title="الإعدادات"
                    >
                        <i className="fas fa-cog text-xl"></i>
                    </button>
                    <div className="text-right">
                        <h1 className="text-2xl font-extrabold tracking-wide text-white">MindLingo</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2 z-10">
                    <button 
                        onClick={onAccountClick}
                        className="user-card relative bg-dark/50 p-1.5 pr-3 rounded-full flex items-center gap-2 backdrop-blur-sm border border-white/20 shadow-md transition-all duration-300 hover:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary"
                        aria-label="فتح صفحة الحساب"
                    >
                        <div className="text-right">
                            <div className="font-bold text-sm text-white">
                                <span>{user.name}</span>
                            </div>
                            <div className={`text-xs font-bold flex items-center justify-end gap-1 mt-0.5 ${user.is_subscribed ? 'text-secondary' : 'text-gray-400'}`}>
                                <i className="fas fa-medal"></i>
                                <span>{user.is_subscribed ? 'الخطة الفضية' : 'الخطة البرونزية'}</span>
                            </div>
                        </div>
                        <div
                            className="w-10 h-10 rounded-full border-2 border-white bg-dark/50 flex items-center justify-center text-2xl"
                        >
                            {user.avatar}
                        </div>
                    </button>
                    <button 
                        onClick={onLogout}
                        className="bg-dark/50 hover:bg-accent transition-colors duration-300 w-12 h-12 rounded-full font-bold flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-md text-white hidden md:flex"
                        title="تسجيل الخروج"
                    >
                        <i className="fas fa-sign-out-alt text-xl"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};
export default Header;
