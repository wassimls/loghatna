
import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types.ts';

interface HeaderProps {
    user: User;
    onLogout: () => void;
    onAccountClick: () => void;
    onSettingsClick: () => void;
    onAdminClick: () => void;
    isAdmin: boolean;
}

const getPlanDetails = (tier: 'bronze' | 'silver' | 'gold' = 'bronze') => {
    switch (tier) {
        case 'gold':
            return { name: 'الخطة الذهبية', color: 'text-secondary' };
        case 'silver':
            return { name: 'الخطة الفضية', color: 'text-secondary' };
        case 'bronze':
        default:
            return { name: 'الخطة البرونزية', color: 'text-gray-400' };
    }
};


const Header: React.FC<HeaderProps> = ({ user, onLogout, onAccountClick, onSettingsClick, onAdminClick, isAdmin }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const planDetails = getPlanDetails(user.subscription_tier);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <header className="bg-dark/20 backdrop-blur-sm relative z-20">
            <div className="p-3 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center gap-3">
                     <button 
                        onClick={onSettingsClick}
                        className="lg:hidden bg-dark/50 hover:bg-white/20 transition-colors duration-300 w-12 h-12 rounded-full font-bold flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-md text-white"
                        title="الإعدادات"
                    >
                        <i className="fas fa-cog text-xl"></i>
                    </button>
                    <div className="text-right">
                        <h1 className="text-2xl font-extrabold tracking-wide text-white">MindLingo</h1>
                    </div>
                </div>
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="user-card bg-dark/50 p-1.5 pr-3 rounded-full flex items-center gap-2 backdrop-blur-sm border border-white/20 shadow-md transition-all duration-300 hover:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary"
                        aria-label="فتح قائمة المستخدم"
                        aria-haspopup="true"
                        aria-expanded={isDropdownOpen}
                    >
                        <div className="text-right">
                            <div className="font-bold text-sm text-white">
                                <span>{user.name}</span>
                            </div>
                            <div className={`text-xs font-bold flex items-center justify-end gap-1 mt-0.5 ${planDetails.color}`}>
                                <i className="fas fa-medal"></i>
                                <span>{planDetails.name}</span>
                            </div>
                        </div>
                        <div
                            className="w-10 h-10 rounded-full border-2 border-white bg-dark/50 flex items-center justify-center text-2xl"
                        >
                            {user.avatar}
                        </div>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-48 bg-dark/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/10 overflow-hidden animate-fadeIn z-30">
                            <ul>
                                <li>
                                    <button
                                        onClick={() => { onAccountClick(); setIsDropdownOpen(false); }}
                                        className="w-full text-right px-4 py-3 text-sm text-white hover:bg-white/10 flex items-center gap-3"
                                    >
                                        <i className="fas fa-user-circle w-5 text-center"></i>
                                        <span>حسابي</span>
                                    </button>
                                </li>
                                {isAdmin && (
                                     <li>
                                        <button
                                            onClick={() => { onAdminClick(); setIsDropdownOpen(false); }}
                                            className="w-full text-right px-4 py-3 text-sm text-secondary hover:bg-white/10 flex items-center gap-3"
                                        >
                                            <i className="fas fa-user-shield w-5 text-center"></i>
                                            <span>لوحة التحكم</span>
                                        </button>
                                    </li>
                                )}
                                <li>
                                    <button
                                        onClick={() => { onLogout(); setIsDropdownOpen(false); }}
                                        className="w-full text-right px-4 py-3 text-sm text-red-400 hover:bg-red-500 hover:text-white flex items-center gap-3"
                                    >
                                        <i className="fas fa-sign-out-alt w-5 text-center"></i>
                                        <span>تسجيل الخروج</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
export default Header;