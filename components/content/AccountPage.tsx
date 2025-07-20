


import React, { useState, useEffect, FormEvent } from 'react';
import { User, UserProgress, Category } from '../../types';
import * as soundService from '../../services/soundService';
import { AVATAR_EMOJIS } from '../../constants';
import ProgressSection from './ProgressSection';

// --- Reusable Components (Internal to this file) ---

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
                <h3 className="text-center text-lg font-bold text-secondary mb-4">اختر صورتك الرمزية</h3>
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

const FormSection: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-dark/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10">
        <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-3">
            <i className={`fas ${icon}`}></i>
            {title}
        </h2>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

// --- Main AccountPage Component ---

interface AccountPageProps {
    user: User;
    onUpdateName: (newName: string) => Promise<void>;
    onUpdateAvatar: (newAvatar: string) => Promise<void>;
    onUpdatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    progress: UserProgress | null;
    favoriteWordsCount: number;
    categories: Category[];
    isProgressLoading: boolean;
    onReferralClick: () => void;
    onSupportClick: () => void;
    onLogout: () => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ 
    user, 
    onUpdateName, 
    onUpdateAvatar, 
    onUpdatePassword, 
    progress, 
    favoriteWordsCount, 
    categories, 
    isProgressLoading,
    onReferralClick,
    onSupportClick,
    onLogout
}) => {
    // Tab State
    const [activeTab, setActiveTab] = useState<'profile' | 'progress'>('profile');

    // Name Editing State
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState(user.name);
    const [nameError, setNameError] = useState<string | null>(null);
    const [isNameSaving, setIsNameSaving] = useState(false);

    // Avatar Picker State
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    // Password Change State
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [passError, setPassError] = useState<string | null>(null);
    const [passSuccess, setPassSuccess] = useState<string | null>(null);
    const [isPassSaving, setIsPassSaving] = useState(false);

    useEffect(() => {
        setNewName(user.name);
    }, [user.name]);

    const handleNameSave = async () => {
        setNameError(null);
        if (newName.trim().length < 3) {
            setNameError("الاسم قصير جدًا (3 أحرف على الأقل).");
            return;
        }
        if (newName.trim() === user.name) {
            setIsEditingName(false);
            return;
        }
        setIsNameSaving(true);
        try {
            await onUpdateName(newName.trim());
            setIsEditingName(false);
        } catch (error) {
            setNameError(error instanceof Error ? error.message : "حدث خطأ.");
        } finally {
            setIsNameSaving(false);
        }
    };
    
    const handleAvatarSelect = async (emoji: string) => {
        if (user.avatar === emoji) return;
        try {
            await onUpdateAvatar(emoji);
        } catch (error) {
            // In a real app, show a toast notification for this error
            console.error("Failed to update avatar", error);
        }
    };

    const handlePasswordSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setPassError(null);
        setPassSuccess(null);

        if (!passwords.current || !passwords.new || !passwords.confirm) {
            setPassError("الرجاء ملء جميع حقول كلمة المرور.");
            return;
        }
        if (passwords.new.length < 6) {
            setPassError("كلمة المرور الجديدة يجب أن تتكون من 6 أحرف على الأقل.");
            return;
        }
        if (passwords.new !== passwords.confirm) {
            setPassError("كلمتا المرور الجديدتان غير متطابقتين.");
            return;
        }

        setIsPassSaving(true);
        soundService.playGenericClick();
        try {
            await onUpdatePassword(passwords.current, passwords.new);
            setPassSuccess("تم تغيير كلمة المرور بنجاح!");
            setPasswords({ current: '', new: '', confirm: '' });
            setTimeout(() => setPassSuccess(null), 3000);
        } catch (err) {
            setPassError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع.');
            setTimeout(() => setPassError(null), 5000);
        } finally {
            setIsPassSaving(false);
        }
    };

    return (
        <div className="p-4 md:p-8 w-full h-full animate-fadeIn overflow-y-auto">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-white">
                    {activeTab === 'profile' ? 'إدارة الحساب' : 'إحصائيات تقدمي'}
                </h1>
                <p className="text-lg text-gray-300 mt-2">
                    {activeTab === 'profile' ? 'قم بتحديث معلوماتك الشخصية وإعدادات الأمان.' : 'تتبع رحلتك التعليمية وإنجازاتك.'}
                </p>
            </header>
            
            <div className="max-w-md mx-auto bg-dark/70 p-1.5 rounded-full flex items-center justify-center gap-2 mb-8">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex-1 py-2 px-4 rounded-full font-bold transition-colors ${activeTab === 'profile' ? 'bg-secondary text-dark' : 'text-gray-300'}`}
                >
                    <i className="fas fa-user-cog mr-2"></i>
                    الملف الشخصي
                </button>
                <button
                    onClick={() => setActiveTab('progress')}
                    className={`flex-1 py-2 px-4 rounded-full font-bold transition-colors ${activeTab === 'progress' ? 'bg-secondary text-dark' : 'text-gray-300'}`}
                >
                    <i className="fas fa-chart-line mr-2"></i>
                    التقدم
                </button>
            </div>

            {activeTab === 'profile' && (
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
                    {/* Profile Information Section */}
                    <FormSection title="معلومات الملف الشخصي" icon="fa-user-edit">
                        <div className="flex flex-col items-center text-center">
                            <button 
                                onClick={() => setIsPickerOpen(true)}
                                className="relative w-32 h-32 rounded-full bg-dark/50 border-4 border-secondary flex items-center justify-center text-6xl mb-4 transition-transform hover:scale-110"
                                title="تغيير الصورة الرمزية"
                            >
                                {user.avatar}
                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-secondary text-dark rounded-full flex items-center justify-center text-sm border-2 border-dark">
                                    <i className="fas fa-pencil-alt"></i>
                                </div>
                            </button>
                            
                            {isEditingName ? (
                                <div className="flex items-center gap-2 w-full max-w-xs">
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="flex-grow p-2 rounded-md bg-dark/70 text-white border border-secondary focus:outline-none"
                                        autoFocus
                                    />
                                    <button onClick={handleNameSave} disabled={isNameSaving} className="text-green-400 text-xl">
                                        {isNameSaving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-check-circle"></i>}
                                    </button>
                                    <button onClick={() => { setIsEditingName(false); setNewName(user.name); setNameError(null); }} className="text-red-400 text-xl">
                                        <i className="fas fa-times-circle"></i>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <h3 className="text-2xl font-bold text-white">{user.name}</h3>
                                    <button onClick={() => setIsEditingName(true)} className="text-gray-400 hover:text-white">
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                </div>
                            )}
                            {nameError && <p className="text-xs text-red-300 mt-1">{nameError}</p>}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300">البريد الإلكتروني</label>
                            <p className="p-3 mt-1 rounded-lg bg-dark/70 text-gray-400 font-mono text-sm">{user.email}</p>
                        </div>
                    </FormSection>

                    {/* Security Section */}
                    <FormSection title="إعدادات الأمان" icon="fa-shield-alt">
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="currentPass" className="block text-sm font-medium text-gray-300 mb-1">كلمة المرور الحالية</label>
                                <input id="currentPass" type="password" value={passwords.current} onChange={e => setPasswords(p => ({...p, current: e.target.value}))} className="w-full p-3 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors" />
                            </div>
                            <div>
                                <label htmlFor="newPass" className="block text-sm font-medium text-gray-300 mb-1">كلمة المرور الجديدة</label>
                                <input id="newPass" type="password" value={passwords.new} onChange={e => setPasswords(p => ({...p, new: e.target.value}))} className="w-full p-3 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors" />
                            </div>
                            <div>
                                <label htmlFor="confirmPass" className="block text-sm font-medium text-gray-300 mb-1">تأكيد كلمة المرور الجديدة</label>
                                <input id="confirmPass" type="password" value={passwords.confirm} onChange={e => setPasswords(p => ({...p, confirm: e.target.value}))} className="w-full p-3 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors" />
                            </div>
                            
                            {passError && <p className="text-sm text-center text-red-300 font-bold">{passError}</p>}
                            {passSuccess && <p className="text-sm text-center text-green-300 font-bold">{passSuccess}</p>}
                            
                            <button type="submit" disabled={isPassSaving} className="w-full bg-gradient-to-r from-accent to-pink-500 text-white py-3 rounded-lg font-bold text-lg transition-transform hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2">
                                {isPassSaving ? <><i className="fas fa-spinner fa-spin"></i>جاري التغيير...</> : 'تغيير كلمة المرور'}
                            </button>
                        </form>
                    </FormSection>

                     <div className="lg:col-span-2">
                        <FormSection title="إجراءات إضافية" icon="fa-ellipsis-h">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <button
                                    onClick={onReferralClick}
                                    className="w-full p-4 rounded-xl flex items-center justify-center gap-3 text-center transition-all duration-300 bg-gradient-to-r from-accent to-pink-500 text-white shadow-lg hover:scale-105"
                                >
                                    <i className="fas fa-gift"></i>
                                    <span className="font-semibold text-base">ادعُ صديقًا</span>
                                </button>
                                <button
                                    onClick={onSupportClick}
                                    className="w-full p-4 rounded-xl flex items-center justify-center gap-3 text-center transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                                >
                                    <i className="fas fa-headset"></i>
                                    <span className="font-semibold text-base">الدعم الفني</span>
                                </button>
                                 <button
                                    onClick={onLogout}
                                    className="w-full p-4 rounded-xl flex items-center justify-center gap-3 text-center transition-all duration-300 bg-dark/50 text-red-400 hover:bg-red-500 hover:text-white"
                                >
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span className="font-semibold text-base">تسجيل الخروج</span>
                                </button>
                            </div>
                        </FormSection>
                    </div>

                </div>
            )}
            
            {activeTab === 'progress' && (
                <div className="animate-fadeIn">
                    <ProgressSection
                        progress={progress}
                        favoriteWordsCount={favoriteWordsCount}
                        categories={categories}
                        isLoading={isProgressLoading}
                    />
                </div>
            )}

             {isPickerOpen && (
                <AvatarPickerModal
                    emojis={AVATAR_EMOJIS}
                    onSelect={handleAvatarSelect}
                    onClose={() => setIsPickerOpen(false)}
                />
            )}
        </div>
    );
};

export default AccountPage;