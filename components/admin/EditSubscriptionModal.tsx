import React, { useState } from 'react';
import { Subscription } from '../../types';

interface EditSubscriptionModalProps {
    subscription: Subscription;
    onClose: () => void;
    onSave: (userId: string, updates: Partial<Subscription>) => Promise<void>;
}

const EditSubscriptionModal: React.FC<EditSubscriptionModalProps> = ({ subscription, onClose, onSave }) => {
    const [tier, setTier] = useState(subscription.tier);
    const [status, setStatus] = useState(subscription.status || 'active');
    
    // Format date for input[type="date"] which expects YYYY-MM-DD
    const formatDateForInput = (dateString: string | null) => {
        if (!dateString) return '';
        try {
            return new Date(dateString).toISOString().split('T')[0];
        } catch (e) {
            return '';
        }
    };
    
    const [endsAt, setEndsAt] = useState(formatDateForInput(subscription.ends_at));
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const updates: Partial<Subscription> = {
            tier,
            status,
            ends_at: endsAt ? new Date(endsAt).toISOString() : null,
        };
        await onSave(subscription.user_id, updates);
        setIsSaving(false);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-dark/80 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md border border-white/10 text-white animate-fadeIn"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-secondary text-xl font-bold">تعديل الاشتراك</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="إغلاق"><i className="fas fa-times text-xl"></i></button>
                </div>
                
                <div className="mb-4">
                    <p className="text-gray-300 font-mono text-sm break-all">{subscription.email}</p>
                    <p className="text-gray-400 font-mono text-xs break-all" title={subscription.user_id}>ID: {subscription.user_id}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="tier" className="block text-sm font-medium text-gray-200 mb-2">الخطة (Tier)</label>
                        <select
                            id="tier"
                            value={tier}
                            onChange={(e) => setTier(e.target.value as 'bronze' | 'silver' | 'gold')}
                            className="w-full p-3 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors"
                        >
                            <option value="bronze">Bronze</option>
                            <option value="silver">Silver</option>
                            <option value="gold">Gold</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-200 mb-2">الحالة (Status)</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as 'active' | 'canceled' | 'expired')}
                            className="w-full p-3 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors"
                        >
                            <option value="active">Active</option>
                            <option value="canceled">Canceled</option>
                            <option value="expired">Expired</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="ends_at" className="block text-sm font-medium text-gray-200 mb-2">ينتهي في (Ends At)</label>
                        <input
                            id="ends_at"
                            type="date"
                            value={endsAt}
                            onChange={(e) => setEndsAt(e.target.value)}
                            className="w-full p-3 rounded-lg bg-dark/70 text-white border-2 border-transparent focus:border-secondary focus:outline-none transition-colors"
                        />
                    </div>
                    
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-dark/70 text-white py-2 px-6 rounded-lg font-bold hover:bg-white/20 transition-colors">
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="bg-secondary text-dark py-2 px-6 rounded-lg font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50"
                        >
                            {isSaving ? <i className="fas fa-spinner fa-spin"></i> : 'حفظ التغييرات'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSubscriptionModal;
