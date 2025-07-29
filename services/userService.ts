import { User, Word, ChatMessage, Json, Database, UserProgress, CategoryId, LeaderboardEntry, Subscription, ReferredUserWithPlan } from '../types';
import { AVATAR_EMOJIS } from '../constants';
import { supabase, supabaseConfigError } from './supabase';
import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';

const ensureSupabaseIsConfigured = () => {
    if (supabaseConfigError || !supabase) {
        throw new Error(supabaseConfigError || 'لم يتم تكوين Supabase بشكل صحيح. تحقق من ملف services/supabase.ts');
    }
};

// ====================================================================================
// ADMIN CONSTANT
// ====================================================================================
// This should match the email in the `is_admin` function in your Supabase SQL.
const ADMIN_EMAIL = 'admin@galaxya.com';
// ====================================================================================


// Sign up a new user
export const signup = async (name: string, email: string, password: string): Promise<{ confirmationSent: boolean }> => {
    ensureSupabaseIsConfigured();
    const avatar = AVATAR_EMOJIS[Math.floor(Math.random() * AVATAR_EMOJIS.length)];
    
    const referrerId = localStorage.getItem('referral_code');

    const userData: { [key: string]: any } = {
        name,
        avatar,
    };
    if (referrerId) {
        userData.referred_by = referrerId;
    }

    const { data: { user, session }, error } = await supabase!.auth.signUp({
        email,
        password,
        options: {
            data: userData,
        }
    });

    if (error) {
        if (error.message.toLowerCase().includes('failed to fetch')) {
            throw new Error('فشل الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.');
        }
        if (error.message.includes("User already registered")) {
            throw new Error('هذا البريد الإلكتروني مسجل بالفعل.');
        } else if (error.message.includes("Password should be at least 6 characters")) {
            throw new Error('كلمة المرور ضعيفة جدًا. يجب أن تتكون من 6 أحرف على الأقل.');
        } else if (error.message.includes("For security purposes")) {
            throw new Error('لقد حاولت التسجيل عدة مرات بسرعة. يرجى الانتظار لمدة دقيقة ثم المحاولة مرة أخرى.');
        }
        console.error("Supabase signup error: ", error.message || error);
        throw new Error('فشل في إنشاء الحساب. تأكد من أن بريدك الإلكتروني صالح.');
    }
    
    // If signup is successful (even if it needs confirmation), remove the referral code
    if (!error && referrerId) {
        localStorage.removeItem('referral_code');
    }
    
    // Returns true if the user exists, but there's no session, which means confirmation is required.
    const confirmationSent = !!(user && !session);
    return { confirmationSent };
};

// Log in an existing user
export const login = async (email: string, password: string): Promise<void> => {
    ensureSupabaseIsConfigured();
    const { error } = await supabase!.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        if (error.message.toLowerCase().includes('failed to fetch')) {
            throw new Error('فشل الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.');
        }
        if (error.message === 'Invalid login credentials') {
            throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
        }
        if (error.message === 'Email not confirmed') {
            throw new Error('لم يتم تأكيد بريدك الإلكتروني. يرجى التحقق من صندوق الوارد والنقر على رابط التأكيد.');
        }
        console.error("Supabase login error: ", error.message || error);
        throw new Error('فشل في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
    }
};

// Log out the current user
export const logout = async (): Promise<void> => {
    ensureSupabaseIsConfigured();
    const { error } = await supabase!.auth.signOut();
    if (error) {
        console.error('Error logging out:', error.message || error);
    }
};

// Listen for authentication state changes
export const onAuthChange = (callback: (user: User | null) => void): () => void => {
    ensureSupabaseIsConfigured();
    const { data: { authListener } } = supabase!.auth.onAuthStateChange(
        (_event: string, session: any | null) => {
            const supabaseUser = session?.user;
            
            if (!supabaseUser) {
                callback(null);
                return;
            }

            // Immediately create and send a basic user object.
            // This unblocks the UI and prevents the infinite loading screen.
            const basicUser: User = {
                id: supabaseUser.id,
                email: supabaseUser.email!,
                name: supabaseUser.user_metadata.name || 'مستخدم جديد',
                avatar: supabaseUser.user_metadata.avatar || '😊',
                is_subscribed: false, // Assume not subscribed initially
                subscription_tier: 'bronze', // Default tier
            };
            callback(basicUser);

            // Now, asynchronously fetch subscription details to enhance the user object.
            // This will not block the initial render.
            (async () => {
                try {
                    const { data: subData, error: subError } = await supabase!
                        .from('subscriptions')
                        .select('tier, status, ends_at')
                        .eq('user_id', supabaseUser.id)
                        .single();

                    if (subError && subError.code !== 'PGRST116') { // Ignore "no rows found"
                        console.error('Error fetching subscription data:', subError.message);
                        return; // User is already logged in with basic data, fail gracefully.
                    }

                    let isSubscribed = false;
                    let tier: User['subscription_tier'] = 'bronze';
                    let ends_at: string | undefined = undefined;

                    if (subData) {
                        ends_at = subData.ends_at || undefined;
                        tier = subData.tier as User['subscription_tier'] || 'bronze';
                        const hasActiveStatus = subData.status === 'active';
                        const notExpired = subData.ends_at ? new Date(subData.ends_at) > new Date() : false;
                        isSubscribed = tier !== 'bronze' && hasActiveStatus && notExpired;
                    } else if (supabaseUser.email) {
                        // FIX: If no subscription is found (e.g., DB trigger failed), create a default one client-side.
                        const { error: insertError } = await supabase!
                            .from('subscriptions')
                            .insert({
                                user_id: supabaseUser.id,
                                email: supabaseUser.email,
                                tier: 'bronze',
                                status: 'active',
                            });
                        
                        if (insertError) {
                             console.error("Failed to create default subscription for new user:", insertError.message);
                        }
                    }
                    
                    // Create the full user object with subscription data
                    const fullUser: User = {
                        ...basicUser, // Use the already-sent basic data
                        subscription_ends_at: ends_at,
                        is_subscribed: isSubscribed,
                        subscription_tier: tier,
                    };
                    
                    // Call the callback again to update the UI with the full subscription details.
                    callback(fullUser);

                } catch (e) {
                    console.error("Error fetching subscription details asynchronously:", e);
                    // Do nothing on error, the user is already logged in with the basic object.
                }
            })();
        }
    );
    return () => authListener?.unsubscribe();
};

// Check if the current user is an admin
export const isCurrentUserAdmin = async (): Promise<boolean> => {
    ensureSupabaseIsConfigured();
    const { data: { user } } = await supabase!.auth.getUser();
    return user?.email === ADMIN_EMAIL;
};


// Update the current user's name
export const updateUserName = async (name: string): Promise<User> => {
    ensureSupabaseIsConfigured();

    const { data: { user: updatedUser }, error } = await supabase!.auth.updateUser({
        data: { name }
    });

    if (error) {
        console.error("Supabase update user error: ", error.message || error);
        throw new Error('فشل في تحديث الاسم. يرجى المحاولة مرة أخرى.');
    }
    
    if (!updatedUser) {
         throw new Error('لم يتم العثور على المستخدم لتحديثه.');
    }

    const { data: subData } = await supabase!
        .from('subscriptions')
        .select('tier, status, ends_at')
        .eq('user_id', updatedUser.id)
        .single();
    
    let isSubscribed = false;
    let tier: User['subscription_tier'] = 'bronze';
    let ends_at: string | undefined = undefined;

    if (subData) {
        ends_at = subData.ends_at || undefined;
        tier = subData.tier as User['subscription_tier'] || 'bronze';
        const hasActiveStatus = subData.status === 'active';
        const notExpired = subData.ends_at ? new Date(subData.ends_at) > new Date() : false;
        isSubscribed = tier !== 'bronze' && hasActiveStatus && notExpired;
    }

    return {
        id: updatedUser.id,
        email: updatedUser.email!,
        name: updatedUser.user_metadata.name || 'مستخدم',
        avatar: updatedUser.user_metadata.avatar || '😊',
        subscription_ends_at: ends_at,
        is_subscribed: isSubscribed,
        subscription_tier: tier
    };
};

// Update the current user's avatar
export const updateUserAvatar = async (avatar: string): Promise<User> => {
    ensureSupabaseIsConfigured();

    const { data: { user: updatedUser }, error } = await supabase!.auth.updateUser({
        data: { avatar }
    });

    if (error) {
        console.error("Supabase update user avatar error: ", error.message || error);
        throw new Error('فشل في تحديث الصورة الرمزية.');
    }
    
    if (!updatedUser) {
         throw new Error('لم يتم العثور على المستخدم لتحديثه.');
    }
    
     const { data: subData } = await supabase!
        .from('subscriptions')
        .select('tier, status, ends_at')
        .eq('user_id', updatedUser.id)
        .single();

    let isSubscribed = false;
    let tier: User['subscription_tier'] = 'bronze';
    let ends_at: string | undefined = undefined;

    if (subData) {
        ends_at = subData.ends_at || undefined;
        tier = subData.tier as User['subscription_tier'] || 'bronze';
        const hasActiveStatus = subData.status === 'active';
        const notExpired = subData.ends_at ? new Date(subData.ends_at) > new Date() : false;
        isSubscribed = tier !== 'bronze' && hasActiveStatus && notExpired;
    }
    
    return {
        id: updatedUser.id,
        email: updatedUser.email!,
        name: updatedUser.user_metadata.name || 'مستخدم',
        avatar: updatedUser.user_metadata.avatar || '😊',
        subscription_ends_at: ends_at,
        is_subscribed: isSubscribed,
        subscription_tier: tier
    };
};

// Update the current user's password
export const updateUserPassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    ensureSupabaseIsConfigured();
    
    const { data: { user } } = await supabase!.auth.getUser();

    if (!user) {
        throw new Error('لا يمكن التحقق من المستخدم الحالي.');
    }
    
    // We still need to verify the old password. The best way is to try signing in with it.
    const { error: signInError } = await supabase!.auth.signInWithPassword({
        email: user.email!,
        password: currentPassword,
    });

    if (signInError) {
        if (signInError.message === 'Invalid login credentials') {
            throw new Error('كلمة المرور الحالية غير صحيحة.');
        }
        throw new Error('فشل التحقق من كلمة المرور الحالية.');
    }
    
    // If verification is successful, update to the new password.
    const { error: updateError } = await supabase!.auth.updateUser({
        password: newPassword,
    });

    if (updateError) {
        console.error("Supabase update password error: ", updateError.message || updateError);
         if (updateError.message.includes("same as the old password")) {
             throw new Error('كلمة المرور الجديدة يجب أن تكون مختلفة عن القديمة.');
        }
        if (updateError.message.includes("Password should be at least 6 characters")) {
             throw new Error('كلمة المرور الجديدة ضعيفة جدًا. يجب أن تتكون من 6 أحرف على الأقل.');
        }
        throw new Error('فشل في تحديث كلمة المرور. حاول مرة أخرى.');
    }
};


export const setUserSubscribed = async (): Promise<User> => {
    ensureSupabaseIsConfigured();

    // 1. Get current user
    const { data: { user } } = await supabase!.auth.getUser();
    if (!user) {
        throw new Error("لا يمكن العثور على المستخدم الحالي أو بريده الإلكتروني لإتمام الاشتراك.");
    }

    // 2. Add entry to the subscriptions table (the single source of truth)
    const endsAt = new Date();
    endsAt.setDate(endsAt.getDate() + 30);
    const newTier = 'silver';

    // Using upsert is safer for renewals or if an entry somehow exists
    const { error: subscriptionError } = await supabase!
        .from('subscriptions')
        .upsert({
            user_id: user.id,
            email: user.email!,
            tier: newTier,
            status: 'active',
            ends_at: endsAt.toISOString(),
        }, { onConflict: 'user_id' });

    if (subscriptionError) {
        console.error("Supabase upsert subscription error: ", subscriptionError.message || subscriptionError);
        throw new Error('فشل في تسجيل الاشتراك في قاعدة البيانات.');
    }

    // 3. Return an optimistic User object for immediate UI update.
    // onAuthChange will fetch this exact data from the DB on next app load/refresh.
    return {
        id: user.id,
        email: user.email!,
        name: user.user_metadata.name || 'مستخدم',
        avatar: user.user_metadata.avatar || '😊',
        subscription_ends_at: endsAt.toISOString(),
        is_subscribed: true,
        subscription_tier: newTier,
    };
}

export const extendSubscription = async (): Promise<User> => {
    ensureSupabaseIsConfigured();

    const { data: { user } } = await supabase!.auth.getUser();
    if (!user) {
        throw new Error("No user found to extend subscription.");
    }

    const { data: currentSub, error: fetchError } = await supabase!
        .from('subscriptions')
        .select('ends_at, tier')
        .eq('user_id', user.id)
        .single();

    if (fetchError || !currentSub) {
        // If no subscription, treat as a new one
        return setUserSubscribed();
    }

    const currentEndDate = currentSub.ends_at ? new Date(currentSub.ends_at) : new Date();
    // Start from today if subscription has expired
    const startDate = currentEndDate > new Date() ? currentEndDate : new Date();
    
    const newEndDate = new Date(startDate);
    newEndDate.setDate(newEndDate.getDate() + 30); // Add 30 days

    const { error: updateError } = await supabase!
        .from('subscriptions')
        .update({
            ends_at: newEndDate.toISOString(),
            status: 'active'
        })
        .eq('user_id', user.id);
    
    if (updateError) {
        console.error("Supabase extend subscription error:", updateError.message);
        throw new Error("Failed to extend subscription.");
    }
    
    // Optimistic user return
    return {
        id: user.id,
        email: user.email!,
        name: user.user_metadata.name || 'مستخدم',
        avatar: user.user_metadata.avatar || '😊',
        subscription_ends_at: newEndDate.toISOString(),
        is_subscribed: true,
        subscription_tier: currentSub.tier as User['subscription_tier'] || 'silver',
    };
};


// --- Chat History ---

export const getChatHistory = async (userId: string, languageCode: string): Promise<ChatMessage[]> => {
    ensureSupabaseIsConfigured();
    
    const { data, error }: PostgrestSingleResponse<{ messages: Json }> = await supabase!
        .from('chat_history')
        .select('messages')
        .eq('user_id', userId)
        .eq('language_code', languageCode)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Error fetching chat history:', error.message || error);
        return [];
    }
    
    return (data?.messages as ChatMessage[]) || [];
};

export const saveChatHistory = async (userId: string, languageCode: string, messages: ChatMessage[]): Promise<void> => {
    ensureSupabaseIsConfigured();
    
    const { error } = await supabase!
        .from('chat_history')
        .upsert({
            user_id: userId,
            language_code: languageCode,
            messages: messages as Json,
            updated_at: new Date().toISOString()
        }, { onConflict: 'user_id, language_code' });
        
    if (error) {
        console.error('Error saving chat history:', error.message || error);
    }
};


// --- Favorite Words ---

export const getFavoriteWords = async (userId: string, languageCode: string): Promise<Word[]> => {
    ensureSupabaseIsConfigured();
    
    const { data, error } = await supabase!
        .from('user_favorite_words')
        .select('word')
        .eq('user_id', userId)
        .eq('language_code', languageCode);
        
    if (error) {
        console.error('Error fetching favorite words:', error.message || error);
        return [];
    }

    if (!data) {
        return [];
    }
    
    return data.map(item => item.word as Word);
};

export const addFavoriteWord = async (userId: string, word: Word, languageCode: string): Promise<void> => {
    ensureSupabaseIsConfigured();
    
    const { error } = await supabase!
        .from('user_favorite_words')
        .insert({
            user_id: userId,
            word: word as Json,
            language_code: languageCode
        });
        
    if (error) {
        console.error('Error adding favorite word:', error.message || error);
        throw new Error('Failed to add favorite word');
    }
};

export const removeFavoriteWord = async (userId: string, wordText: string, languageCode: string): Promise<void> => {
    ensureSupabaseIsConfigured();

    const { error } = await supabase!
        .from('user_favorite_words')
        .delete()
        .eq('user_id', userId)
        .eq('language_code', languageCode)
        .eq('word->>word', wordText);
        
    if (error) {
        console.error('Error removing favorite word:', error.message || error);
        throw new Error('Failed to remove favorite word');
    }
};


// --- User Progress ---

export const getUserProgress = async (userId: string, languageCode: string): Promise<UserProgress | null> => {
    ensureSupabaseIsConfigured();
    const { data, error } = await supabase!
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('language_code', languageCode)
        .single();

    if (error && error.code !== 'PGRST116') { // Ignore "no rows found" error
        console.error('Error fetching user progress:', error.message || error);
        return null;
    }
    if (!data) return null;

    return {
        completed_lessons: (data.completed_lessons as CategoryId[] | null) || [],
        total_score: data.total_score || 0,
        total_questions_answered: data.total_questions_answered || 0,
    };
};

export const updateUserProgress = async (
    userId: string,
    languageCode: string,
    categoryId: CategoryId,
    score: number,
    totalQuestions: number
): Promise<void> => {
    ensureSupabaseIsConfigured();

    const { data: existingProgress, error: fetchError } = await supabase!
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('language_code', languageCode)
        .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching progress before update:', fetchError.message || fetchError);
        return;
    }

    const completed = (existingProgress?.completed_lessons as CategoryId[] | null) || [];
    const completedSet = new Set(completed);
    completedSet.add(categoryId);

    const updatedProgress = {
        user_id: userId,
        language_code: languageCode,
        completed_lessons: Array.from(completedSet) as Json,
        total_score: (existingProgress?.total_score || 0) + score,
        total_questions_answered: (existingProgress?.total_questions_answered || 0) + totalQuestions,
        updated_at: new Date().toISOString(),
    };

    const { error: upsertError } = await supabase!
        .from('user_progress')
        .upsert(updatedProgress, { onConflict: 'user_id, language_code' });

    if (upsertError) {
        console.error('Error updating user progress:', upsertError.message || upsertError);
    }
};

export const updateCompletedLessons = async (
    userId: string,
    languageCode: string,
    newlyCompleted: CategoryId[]
): Promise<void> => {
    ensureSupabaseIsConfigured();

    const updatedProgress = {
        user_id: userId,
        language_code: languageCode,
        completed_lessons: newlyCompleted as Json,
        total_score: 0,
        total_questions_answered: 0,
        updated_at: new Date().toISOString(),
    };

    const { error: upsertError } = await supabase!
        .from('user_progress')
        .upsert(updatedProgress, { onConflict: 'user_id, language_code' });

    if (upsertError) {
        console.error('Error setting user progress after placement test:', upsertError.message || upsertError);
    }
};

// --- Leaderboard ---

/**
 * Fetches the top user for each language.
 * This function requires a corresponding RPC function to be created in the Supabase backend
 * for security and performance reasons.
 * 
 * SUPABASE SQL FUNCTION (create in SQL Editor):
 * 
 * create or replace function get_leaderboard()
 * returns table (
 *     language_code text,
 *     total_score bigint,
 *     user_name text,
 *     user_avatar text
 * )
 * language plpgsql
 * as $$
 * begin
 *   return query
 *   with ranked_scores as (
 *     select
 *       up.language_code,
 *       up.total_score,
 *       up.user_id,
 *       row_number() over (partition by up.language_code order by up.total_score desc, up.updated_at asc) as rn
 *     from public.user_progress up
 *     where up.total_score > 0
 *   )
 *   select
 *     rs.language_code,
 *     rs.total_score,
 *     u.raw_user_meta_data->>'name' as user_name,
 *     u.raw_user_meta_data->>'avatar' as user_avatar
 *   from ranked_scores rs
 *   join auth.users u on rs.user_id = u.id
 *   where rs.rn = 1;
 * end;
 * $$;
 * 
 * The above function is an all-time leaderboard. For a weekly leaderboard, the query
 * would need to be adapted to filter by `updated_at` for the current week.
 */
export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    ensureSupabaseIsConfigured();
    const { data, error } = await supabase!.rpc('get_leaderboard');

    if (error) {
        console.error("Error fetching leaderboard:", error.message || error);
        throw new Error("فشل في جلب قائمة المتصدرين. قد تكون ميزة تجريبية وتتطلب إعدادًا إضافيًا في قاعدة البيانات.");
    }

    return (data as unknown as LeaderboardEntry[]) || [];
};

// --- Referral Usage ---

export const getReferredUsers = async (referrerId: string): Promise<ReferredUserWithPlan[]> => {
    ensureSupabaseIsConfigured();
    
    // 1. Fetch the list of referred users
    const { data: referredUsers, error: referralError } = await supabase!
        .from('referral_usage')
        .select('*')
        .eq('referrer_user_id', referrerId)
        .order('created_at', { ascending: false });
    
    if (referralError) {
        console.error('Error fetching referred users:', referralError.message);
        return [];
    }
    
    if (!referredUsers || referredUsers.length === 0) {
        return [];
    }

    // 2. Extract user IDs to fetch their subscriptions
    const referredUserIds = referredUsers.map(u => u.referred_user_id);

    // 3. Fetch subscriptions for all referred users in a single query
    const { data: subscriptions, error: subscriptionError } = await supabase!
        .from('subscriptions')
        .select('user_id, tier')
        .in('user_id', referredUserIds);

    if (subscriptionError) {
        console.error('Error fetching subscriptions for referred users:', subscriptionError.message);
        // Return users without plan info on error, defaulting to bronze
        return referredUsers.map(u => ({ ...u, tier: 'bronze' as const }));
    }

    // 4. Create a map for quick lookup of subscription tiers
    const subscriptionMap = new Map<string, 'bronze' | 'silver' | 'gold'>();
    if(subscriptions){
        subscriptions.forEach(sub => {
            subscriptionMap.set(sub.user_id, sub.tier as 'bronze' | 'silver' | 'gold');
        });
    }

    // 5. Merge referral data with subscription data
    const referredUsersWithPlan = referredUsers.map(user => ({
        ...user,
        tier: subscriptionMap.get(user.referred_user_id) || 'bronze',
    }));

    return referredUsersWithPlan;
};


// --- ADMIN FUNCTIONS ---

export const getAllSubscriptions = async (): Promise<Subscription[]> => {
    ensureSupabaseIsConfigured();
    const { data, error } = await supabase!.rpc('get_all_subscriptions_with_details');

    if (error) {
        console.error('Error fetching all subscriptions:', error);
        throw new Error('فشل في جلب بيانات المشتركين. تأكد من أن لديك صلاحيات المسؤول وأن دالة RPC `get_all_subscriptions_with_details` موجودة.');
    }

    return data as unknown as Subscription[];
};

type SubscriptionUpdate = {
    tier?: 'bronze' | 'silver' | 'gold';
    status?: 'active' | 'canceled' | 'expired';
    ends_at?: string | null;
};

export const updateSubscription = async (userId: string, updates: SubscriptionUpdate): Promise<void> => {
    ensureSupabaseIsConfigured();
    const { error } = await supabase!
        .from('subscriptions')
        .update(updates)
        .eq('user_id', userId);

    if (error) {
        console.error('Error updating subscription:', error);
        throw new Error('فشل في تحديث بيانات الاشتراك.');
    }
    // No longer need to sync to metadata, onAuthChange will handle it for the user on next session refresh.
};

export const backfillSubscriptionEmails = async (): Promise<string> => {
    ensureSupabaseIsConfigured();
    const { data, error } = await supabase!.rpc('backfill_subscription_emails');
    if (error) {
        console.error('Error backfilling subscription emails:', error);
        throw new Error('فشل في تحديث بيانات البريد الإلكتروني للمشتركين.');
    }
    return data;
};