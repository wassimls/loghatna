import React, { useState, useEffect } from 'react';
import { UserProgress, Category, LeaderboardEntry } from '../../types';
import * as userService from '../../services/userService';
import { LANGUAGES } from '../../constants';

// A new, more visually distinct StatCard component
const StatCard: React.FC<{ icon: string; value: string | number; label: string; color: string; }> = ({ icon, value, label, color }) => (
    <div className="bg-dark/60 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center shadow-lg h-full">
        <div className={`w-14 h-14 ${color} rounded-full flex items-center justify-center text-2xl text-white mb-3 shadow-inner`}>
            <i className={`fas ${icon}`}></i>
        </div>
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="text-sm text-gray-300">{label}</p>
    </div>
);

// A simple vertical bar for the charts
const ChartBar: React.FC<{ value: number; maxValue: number; color: string; label: string; }> = ({ value, maxValue, color, label }) => {
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full bg-dark/50 rounded-lg h-40 flex flex-col-reverse">
                 <div className={`${color} rounded-lg`} style={{ height: `${percentage}%`, transition: 'height 1s ease-out' }}></div>
            </div>
            <p className="mt-2 text-xs text-gray-300 font-medium">{label}</p>
            <p className="font-bold text-white text-sm">{value}</p>
        </div>
    );
};

// Leaderboard Component
type EnrichedLeaderboardEntry = LeaderboardEntry & { language_name: string };

const Leaderboard: React.FC<{ data: EnrichedLeaderboardEntry[], isLoading: boolean }> = ({ data, isLoading }) => {
    if (isLoading) {
        return (
            <div className="bg-dark/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <h2 className="text-xl font-bold text-secondary mb-4"><i className="fas fa-crown mr-2"></i>أبطال الأسبوع</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-dark/60 p-4 rounded-lg flex flex-col items-center gap-2">
                           <div className="h-4 bg-slate-700 rounded w-1/2 mb-2"></div>
                            <div className="w-16 h-16 bg-slate-700 rounded-full"></div>
                            <div className="h-4 bg-slate-700 rounded w-3/4 mt-2"></div>
                            <div className="h-3 bg-slate-700 rounded w-1/4 mt-1"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="bg-dark/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center">
                <h2 className="text-xl font-bold text-secondary mb-4"><i className="fas fa-crown mr-2"></i>أبطال الأسبوع</h2>
                <i className="fas fa-trophy text-4xl text-gray-500 my-4"></i>
                <p className="text-gray-400">لا يوجد متصدرون بعد. كن أنت الأول!</p>
            </div>
        );
    }
    
    return (
        <div className="bg-dark/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-secondary mb-4">
                <i className="fas fa-crown mr-2"></i>
                أبطال الأسبوع
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map(entry => (
                    <div key={entry.language_code} className="bg-gradient-to-br from-dark to-slate-800 p-4 rounded-lg border-2 border-yellow-500/50 shadow-lg shadow-yellow-500/10 flex flex-col items-center text-center transition-transform hover:scale-105">
                        <h3 className="font-bold text-white mb-2">اللغة {entry.language_name}</h3>
                        <div className="relative mb-2">
                            <div className="w-16 h-16 rounded-full bg-dark flex items-center justify-center text-4xl border-2 border-yellow-400">
                                {entry.user_avatar}
                            </div>
                            <i className="fas fa-crown absolute -top-2 -right-2 text-2xl text-yellow-400 transform rotate-12"></i>
                        </div>
                        <p className="font-semibold text-lg text-white">{entry.user_name || 'بطل مجهول'}</p>
                        <p className="text-sm text-yellow-300 font-bold">{entry.total_score.toLocaleString()} نقطة</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


const ProgressSection: React.FC<{ progress: UserProgress | null; favoriteWordsCount: number; categories: Category[]; isLoading: boolean; }> = ({ progress, favoriteWordsCount, categories, isLoading }) => {
    
    const [leaderboardData, setLeaderboardData] = useState<EnrichedLeaderboardEntry[]>([]);
    const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setIsLeaderboardLoading(true);
            try {
                const data = await userService.getLeaderboard();
                const enrichedData = data.map(entry => ({
                    ...entry,
                    language_name: LANGUAGES.find(l => l.code === entry.language_code)?.name || entry.language_code
                }));
                setLeaderboardData(enrichedData);
            } catch (error) {
                console.error("Failed to load leaderboard:", error);
            } finally {
                setIsLeaderboardLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (isLoading) {
        return (
            <div className="flex-1 p-8 flex flex-col justify-center items-center">
                <i className="fas fa-spinner fa-spin text-secondary text-4xl"></i>
            </div>
        );
    }
    
    if (!progress || progress.total_questions_answered === 0) {
        return (
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center animate-fadeIn bg-slate-900/70 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-700/50 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0))]"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary to-purple text-white rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-primary/30">
                        <i className="fas fa-chart-pie text-5xl"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-dark dark:text-light mb-3">لا توجد بيانات كافية!</h2>
                    <p className="text-gray-300 text-lg max-w-md">أكمل بعض التمارين والدروس أولاً لعرض إحصائيات تقدمك هنا.</p>
                </div>
            </div>
        )
    }

    const { completed_lessons, total_score, total_questions_answered } = progress;
    const totalCategories = categories.length;
    const completedCount = completed_lessons.length;
    const remainingCount = totalCategories - completedCount;
    const accuracy = total_questions_answered > 0 ? Math.round((total_score / total_questions_answered) * 100) : 0;
    const mistakes = total_questions_answered - total_score;

    return (
        <div className="p-4 md:p-6 w-full h-full overflow-y-auto animate-fadeIn">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-extrabold text-white">إحصائيات تقدمي</h1>
                <p className="text-lg text-gray-300 mt-2">نظرة عامة مرئية لرحلتك التعليمية</p>
            </header>

            {/* Key Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard icon="fa-check-double" value={completedCount} label="الدروس المكتملة" color="bg-green-500/80" />
                <StatCard icon="fa-star" value={total_score} label="النقاط المكتسبة" color="bg-yellow-500/80" />
                <StatCard icon="fa-bullseye" value={`${accuracy}%`} label="معدل الدقة" color="bg-blue-500/80" />
                <StatCard icon="fa-heart" value={favoriteWordsCount} label="الكلمات المفضلة" color="bg-pink-500/80" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Completion Chart */}
                <div className="bg-dark/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <h2 className="text-xl font-bold text-secondary mb-4">نظرة عامة على الإكمال</h2>
                    <div className="flex justify-around items-end gap-4 h-48">
                        <ChartBar value={completedCount} maxValue={totalCategories} color="bg-gradient-to-t from-green-500 to-green-400" label="مكتمل" />
                        <ChartBar value={remainingCount} maxValue={totalCategories} color="bg-gradient-to-t from-gray-600 to-gray-500" label="متبقي" />
                    </div>
                </div>

                {/* Performance Chart */}
                <div className="bg-dark/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <h2 className="text-xl font-bold text-secondary mb-4">تحليل الأداء</h2>
                     <div className="flex justify-around items-end gap-4 h-48">
                        <ChartBar value={total_score} maxValue={total_questions_answered} color="bg-gradient-to-t from-blue-500 to-cyan-400" label="الإجابات الصحيحة" />
                        <ChartBar value={mistakes} maxValue={total_questions_answered} color="bg-gradient-to-t from-red-600 to-red-500" label="الأخطاء" />
                    </div>
                </div>
            </div>
            
             {/* Leaderboard Section */}
            <div className="mb-8">
                 <Leaderboard data={leaderboardData} isLoading={isLeaderboardLoading} />
            </div>
            
             {/* Completed Categories List */}
            <div className="mt-8">
                 <h2 className="text-2xl font-bold text-secondary mb-4">تفاصيل الدروس</h2>
                 <div className="bg-dark/50 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                         {categories.map(cat => {
                             const isCompleted = completed_lessons.includes(cat.id);
                             return (
                                <div key={cat.id} title={cat.name} className={`p-3 rounded-lg flex items-center gap-3 transition-colors duration-300 ${isCompleted ? 'bg-green-500/20' : 'bg-dark/40'}`}>
                                    <i className={`fas ${isCompleted ? 'fa-check-circle text-green-400' : 'fa-circle text-gray-500'} text-xl`}></i>
                                    <span className={`text-sm font-medium ${isCompleted ? 'text-white' : 'text-gray-400'}`}>{cat.name}</span>
                                </div>
                             );
                         })}
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default ProgressSection;