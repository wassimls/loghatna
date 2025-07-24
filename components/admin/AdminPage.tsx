import React, { useState, useEffect, useCallback } from 'react';
import { Subscription } from '../../types';
import * as userService from '../../services/userService';
import EditSubscriptionModal from './EditSubscriptionModal';

const AdminPage: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchSubscriptions = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await userService.getAllSubscriptions();
            setSubscriptions(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSubscriptions();
    }, [fetchSubscriptions]);

    const handleEdit = (subscription: Subscription) => {
        setEditingSubscription(subscription);
    };

    const handleCloseModal = () => {
        setEditingSubscription(null);
    };

    const handleSave = async (userId: string, updates: any) => {
        try {
            await userService.updateSubscription(userId, updates);
            setEditingSubscription(null);
            await fetchSubscriptions(); // Refresh data after saving
        } catch (err) {
            alert(err instanceof Error ? err.message : 'فشل التحديث.');
        }
    };

    const filteredSubscriptions = subscriptions.filter(sub =>
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center p-8">
                    <i className="fas fa-spinner fa-spin text-secondary text-4xl"></i>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center p-8 bg-red-500/10 rounded-lg">
                    <p className="text-red-300 font-bold">{error}</p>
                    <button onClick={fetchSubscriptions} className="mt-4 btn bg-secondary text-dark">إعادة المحاولة</button>
                </div>
            );
        }

        if (subscriptions.length === 0) {
            return <p className="text-center text-gray-400 p-8">لم يتم العثور على أي اشتراكات.</p>;
        }
        
        if (filteredSubscriptions.length === 0) {
            return <p className="text-center text-gray-400 p-8">لا توجد نتائج مطابقة لبحثك.</p>;
        }

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-dark/50 rounded-lg">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="p-4 text-right text-sm font-semibold text-gray-300">البريد الإلكتروني</th>
                            <th className="p-4 text-right text-sm font-semibold text-gray-300">معرف المستخدم</th>
                            <th className="p-4 text-center text-sm font-semibold text-gray-300">الخطة</th>
                            <th className="p-4 text-center text-sm font-semibold text-gray-300">الحالة</th>
                            <th className="p-4 text-center text-sm font-semibold text-gray-300">تاريخ الانتهاء</th>
                            <th className="p-4 text-center text-sm font-semibold text-gray-300">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubscriptions.map(sub => (
                            <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="p-4 text-white font-mono text-sm break-all">{sub.email}</td>
                                <td className="p-4 text-white font-mono text-sm max-w-24 truncate" title={sub.user_id}>{sub.user_id}</td>
                                <td className="p-4 text-center text-white">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                        sub.tier === 'gold' ? 'bg-yellow-500/30 text-yellow-300' :
                                        sub.tier === 'silver' ? 'bg-gray-400/30 text-gray-300' :
                                        'bg-yellow-800/30 text-yellow-600'
                                    }`}>
                                        {sub.tier}
                                    </span>
                                </td>
                                <td className="p-4 text-center text-white">
                                     <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                        sub.status === 'active' ? 'bg-green-500/30 text-green-300' :
                                        sub.status === 'canceled' ? 'bg-red-500/30 text-red-300' :
                                        'bg-gray-500/30 text-gray-400'
                                    }`}>
                                        {sub.status || 'N/A'}
                                    </span>
                                </td>
                                <td className="p-4 text-center text-white text-sm">
                                    {sub.ends_at ? new Date(sub.ends_at).toLocaleDateString('ar-EG') : '—'}
                                </td>
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => handleEdit(sub)}
                                        className="bg-secondary text-dark font-bold py-1 px-4 rounded-md text-sm hover:bg-yellow-300 transition-colors"
                                    >
                                        تعديل
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="p-4 md:p-8 w-full h-full animate-fadeIn overflow-y-auto">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-white">لوحة التحكم</h1>
                <p className="text-lg text-gray-300 mt-2">إدارة اشتراكات المستخدمين.</p>
            </header>
            <div className="bg-dark/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10">
                <div className="mb-4 relative">
                    <input
                        type="text"
                        placeholder="ابحث بالبريد الإلكتروني..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
                {renderContent()}
            </div>
            {editingSubscription && (
                <EditSubscriptionModal
                    subscription={editingSubscription}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default AdminPage;