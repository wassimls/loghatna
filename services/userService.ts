import { User, Word, ChatMessage, Json, Database } from '../types';
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
    
    const { data, error } = await supabase!.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                avatar,
            },
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
        } as any, { onConflict: 'user_id, language_code' });
        
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
        } as any);
        
    if (error) {
        console.error('Error adding favorite word:', error);
        throw new Error('Failed to add favorite word');
    }
};

export const removeFavoriteWord = async (userId: string, wordText: string, languageCode: string): Promise<void> => {
    ensureSupabaseIsConfigured();

    const { error } = await (supabase!
        .from('user_favorite_words')
        .delete() as any)
        .eq('user_id', userId)
        .eq('language_code', languageCode)
        .filter('word->>word', 'eq', wordText);
        
    if (error) {
        console.error('Error removing favorite word:', error);
        throw new Error('Failed to remove favorite word');
    }
};