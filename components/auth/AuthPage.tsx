import React, { useState, FormEvent } from 'react';
import * as userService from '../../services/userService';

const AuthPage: React.FC = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Only handle login since signup form is disabled
        if (isLoginView) {
            try {
                await userService.login(email, password);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع.');
            } finally {
                setIsLoading(false);
            }
        } else {
            // Signup logic is effectively disabled as the form is not rendered
            setIsLoading(false);
        }
    };

    if (signupSuccess) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-space-start to-space-end p-4 animate-fadeIn">
                <div className="w-full max-w-md bg-dark/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10 text-center">
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <i className="fas fa-paper-plane text-5xl text-green-300"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-green-300 mb-4">تم إرسال رابط التفعيل!</h2>
                    <p className="text-lg text-white mb-2">
                        لقد أرسلنا رابط تفعيل إلى بريدك الإلكتروني:
                    </p>
                    <p className="text-lg font-bold text-secondary mb-6 break-all">{email}</p>
                    <p className="text-md text-gray-300">
                        الرجاء النقر على الرابط الموجود في البريد الإلكتروني لتفعيل حسابك. قد تحتاج إلى التحقق من مجلد الرسائل غير المرغوب فيها (Spam).
                    </p>
                    <button
                        onClick={() => {
                            setSignupSuccess(false);
                            setIsLoginView(true);
                            // Clear form fields for privacy
                            setName('');
                            setEmail('');
                            setPassword('');
                        }}
                        className="mt-8 w-full bg-gradient-to-r from-secondary to-yellow-400 text-dark py-3 rounded-lg font-bold text-lg transition-transform hover:scale-105"
                    >
                        الذهاب إلى صفحة تسجيل الدخول
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-space-start to-space-end p-4 animate-fadeIn">
            <div className="flex items-center gap-4 z-10 mb-8">
                 <img src="icon.svg" alt="MindLingo Logo" className="w-20 h-20 rounded-3xl shadow-2xl transform -rotate-12" />
                <div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">MindLingo</h1>
                    <p className="text-lg text-gray-300 mt-1">بوابتك لتعلم اللغات بذكاء ومتعة</p>
                </div>
            </div>
            
            <div className="w-full max-w-md bg-dark/50 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10">
                <h2 className="text-2xl font-bold text-center text-secondary mb-6">
                    {isLoginView ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
                </h2>

                {isLoginView ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">البريد الإلكتروني</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><i className="fas fa-envelope text-gray-400"></i></span>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="w-full p-3 pl-10 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors"
                                    placeholder="example@email.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password"  className="block text-sm font-medium text-gray-200 mb-2">كلمة المرور</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><i className="fas fa-lock text-gray-400"></i></span>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="w-full p-3 pl-10 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors"
                                    placeholder="********"
                                />
                            </div>
                        </div>
                        
                        {error && <p className="text-sm text-center text-red-300 font-bold bg-red-500/20 p-3 rounded-lg animate-shake">{error}</p>}
                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-secondary to-yellow-400 text-dark py-3 rounded-lg font-bold text-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait"
                        >
                            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'تسجيل الدخول'}
                        </button>
                    </form>
                ) : (
                    <div className="text-center p-6 bg-dark/70 rounded-lg border border-white/10 animate-fadeIn">
                        <h3 className="text-lg font-bold text-white mb-3">
                            <i className="fas fa-pause-circle text-secondary mr-2"></i>
                            إنشاء حساب جديد متوقف مؤقتاً
                        </h3>
                        <p className="text-gray-300 mb-4">
                            لإنشاء حساب، يرجى التواصل معنا مباشرة عبر صفحتنا على انستغرام.
                        </p>
                        <a
                            href="https://www.instagram.com/mindl_ingo/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-3 rounded-lg font-bold text-lg transition-transform hover:scale-105 shadow-lg"
                        >
                            <i className="fab fa-instagram text-2xl"></i>
                            <span>راسلنا على انستغرام</span>
                        </a>
                    </div>
                )}


                <p className="mt-6 text-center text-sm text-gray-400">
                    {isLoginView ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
                    <button
                        onClick={() => { setIsLoginView(!isLoginView); setError(null); }}
                        className="font-medium text-secondary hover:underline ml-2"
                    >
                        {isLoginView ? 'أنشئ حساباً' : 'سجّل الدخول'}
                    </button>
                </p>
            </div>

            <footer className="mt-8 text-gray-400 text-sm">
                <p>© 2024 MindLingo - جميع الحقوق محفوظة</p>
            </footer>
        </div>
    );
};

export default AuthPage;
