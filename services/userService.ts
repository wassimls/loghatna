import { User, Word, ChatMessage, Json, Database, UserProgress, CategoryId, LeaderboardEntry } from '../types';
import { AVATAR_EMOJIS } from '../constants';
import { supabase, supabaseConfigError } from './supabase';
import { AuthChangeEvent, Session, PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';

const ensureSupabaseIsConfigured = () => {
    if (supabaseConfigError || !supabase) {
        throw new Error(supabaseConfigError || 'لم يتم تكوين Supabase بشكل صحيح. تحقق من ملف services/supabase.ts');
    }
};

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

    const { data, error } = await supabase!.auth.signUp({
        email,
        password,
        options: {
            data: userData,
        },
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
        console.error("Supabase signup error: ", error);
        throw new Error('فشل في إنشاء الحساب. تأكد من أن بريدك الإلكتروني صالح.');
    }
    
    // If signup is successful (even if it needs confirmation), remove the referral code
    if (!error && referrerId) {
        localStorage.removeItem('referral_code');
    }
    
    // Returns true if the user exists, but there's no session, which means confirmation is required.
    const confirmationSent = !!(data.user && !data.session);
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
        console.error("Supabase login error: ", error);
        throw new Error('فشل في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
    }
};

// Log out the current user
export const logout = async (): Promise<void> => {
    ensureSupabaseIsConfigured();
    const { error } = await supabase!.auth.signOut();
    if (error) {
        console.error('Error logging out:', error);
    }
};

// Listen for authentication state changes
export const onAuthChange = (callback: (user: User | null) => void): () => void => {
    ensureSupabaseIsConfigured();
    const { data: { subscription } } = supabase!.auth.onAuthStateChange(
        (event: AuthChangeEvent, session: Session | null) => {
            const supabaseUser = session?.user;
            if (supabaseUser) {
                callback({
                    id: supabaseUser.id,
                    email: supabaseUser.email!,
                    name: supabaseUser.user_metadata.name || 'مستخدم جديد',
                    avatar: supabaseUser.user_metadata.avatar || '😊'
                });
            } else {
                callback(null);
            }
        }
    );
    return () => subscription.unsubscribe();
};

// Update the current user's name
export const updateUserName = async (name: string): Promise<User> => {
    ensureSupabaseIsConfigured();

    const { data, error } = await supabase!.auth.updateUser({
        data: { name }
    });

    if (error) {
        console.error("Supabase update user error: ", error);
        throw new Error('فشل في تحديث الاسم. يرجى المحاولة مرة أخرى.');
    }
    
    if (!data.user) {
         throw new Error('لم يتم العثور على المستخدم لتحديثه.');
    }

    // Return a user object that matches our app's User type
    return {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata.name || 'مستخدم',
        avatar: data.user.user_metadata.avatar || '😊'
    };
};

// Update the current user's avatar
export const updateUserAvatar = async (avatar: string): Promise<User> => {
    ensureSupabaseIsConfigured();

    const { data, error } = await supabase!.auth.updateUser({
        data: { avatar }
    });

    if (error) {
        console.error("Supabase update user avatar error: ", error);
        throw new Error('فشل في تحديث الصورة الرمزية.');
    }
    
    if (!data.user) {
         throw new Error('لم يتم العثور على المستخدم لتحديثه.');
    }

    return {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata.name || 'مستخدم',
        avatar: data.user.user_metadata.avatar || '😊'
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
        console.error('Error fetching chat history:', error);
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
        console.error('Error saving chat history:', error);
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
        console.error('Error fetching favorite words:', error);
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
        console.error('Error adding favorite word:', error);
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
        console.error('Error removing favorite word:', error);
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
        console.error('Error fetching user progress:', error);
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
        console.error('Error fetching progress before update:', fetchError);
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
        console.error('Error updating user progress:', upsertError);
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
        console.error("Error fetching leaderboard:", error);
        throw new Error("فشل في جلب قائمة المتصدرين. قد تكون ميزة تجريبية وتتطلب إعدادًا إضافيًا في قاعدة البيانات.");
    }

    return (data as unknown as LeaderboardEntry[]) || [];
};