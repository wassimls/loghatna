import React, { useState, useEffect } from 'react';
import { User } from '../types';
import * as soundService from '../services/soundService';
import { AVATAR_EMOJIS } from '../constants';

const AvatarPickerModal: React.FC<{
    emojis: string[];
    onSelect: (emoji: string) => void;
    onClose: () => void;
}> = ({ emojis, onSelect, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-dark/80 backdrop-blur-lg rounded-2xl p-6 w-full max-w-xs border border-white/10 text-white animate-fadeIn"
                onClick={e => e.stopPropagation()}
            >
                <h3 className="text-center text-lg font-bold text-secondary mb-4">اختر رمزك الجديد</h3>
                <div className="grid grid-cols-4 gap-4">
                    {emojis.map(emoji => (
                        <button
                            key={emoji}
                            onClick={() => {
                                onSelect(emoji);
                                onClose();
                            }}
                            className="text-4xl rounded-lg bg-dark/50 hover:bg-white/20 p-2 transition-colors duration-200"
                            aria-label={`اختر ${emoji}`}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface HeaderProps {
    user: User;
    onLogout: () => void;
    onUpdateName: (newName: string) => Promise<void>;
    onUpdateAvatar: (newAvatar: string) => Promise<void>;
    onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onUpdateName, onUpdateAvatar, onSettingsClick }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(user.name);
    const [isSaving, setIsSaving] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    useEffect(() => {
        setNewName(user.name);
    }, [user.name]);

    const handleSave = async () => {
        setEditError(null);
        if (newName.trim().length < 3) {
            setEditError("الاسم قصير جدًا (3 أحرف على الأقل).");
            return;
        }
        if (newName.trim() === user.name) {
            setIsEditing(false);
            return;
        }
        setIsSaving(true);
        try {
            await onUpdateName(newName);
            setIsEditing(false);
        } catch (error) {
            setEditError(error instanceof Error ? error.message : "حدث خطأ.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setNewName(user.name);
        setIsEditing(false);
        setEditError(null);
    };

    const handleSelectAvatar = async (emoji: string) => {
        soundService.playGenericClick();
        if (user.avatar === emoji) return;
        try {
            await onUpdateAvatar(emoji);
        } catch (error) {
            // Optionally, set an error state to show the user
            console.error("Failed to update avatar", error);
        }
    };

    return (
        <header className="bg-dark/20 backdrop-blur-sm p-3 flex justify-between items-center relative z-20 border-b border-white/10">
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
                <div className="user-card relative bg-dark/50 p-1.5 pr-3 rounded-full flex items-center gap-2 backdrop-blur-sm border border-white/20 shadow-md">
                    <div className="text-right">
                        {isEditing ? (
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="p-1 rounded-md bg-dark/70 text-white border border-secondary focus:outline-none w-28"
                                        autoFocus
                                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                                    />
                                    <button onClick={handleSave} disabled={isSaving} className="text-green-400 hover:text-green-300 disabled:opacity-50">
                                        {isSaving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-check"></i>}
                                    </button>
                                    <button onClick={handleCancel} className="text-red-400 hover:text-red-300">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                {editError && <p className="text-xs text-red-300 mt-1 text-center">{editError}</p>}
                            </div>
                        ) : (
                            <div className="font-bold text-sm p-1 text-white flex items-center gap-2">
                                <span>{user.name}</span>
                                <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-white text-xs">
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setIsPickerOpen(true)}
                        title="تغيير الصورة الرمزية"
                        className="w-10 h-10 rounded-full border-2 border-white bg-dark/50 flex items-center justify-center text-2xl cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark focus:ring-secondary"
                    >
                        {user.avatar}
                    </button>
                </div>
                <button 
                    onClick={onLogout}
                    className="bg-dark/50 hover:bg-accent transition-colors duration-300 w-12 h-12 rounded-full font-bold flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-md text-white hidden md:flex"
                    title="تسجيل الخروج"
                >
                    <i className="fas fa-sign-out-alt text-xl"></i>
                </button>
            </div>
            {isPickerOpen && (
                <AvatarPickerModal
                    emojis={AVATAR_EMOJIS}
                    onSelect={handleSelectAvatar}
                    onClose={() => setIsPickerOpen(false)}
                />
            )}
        </header>
    );
};
export default Header;