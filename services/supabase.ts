import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types';

// ====================================================================================
// !!! ملاحظة هامة حول الاتصال بقاعدة البيانات !!!
// ====================================================================================
//
// This app is configured to use environment variables for Supabase credentials.
// For this sandbox environment, the values are hardcoded below to resolve the error.
// In a production environment, always use environment variables.
const supabaseUrl = "https://zpucambojfgakszxciyj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwdWNhbWJvamZnYWtzenhjaXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MDg0MTcsImV4cCI6MjA2Njk4NDQxN30.iu2VsHCKZZQqVF0DJx3IhqD2UQOideanu6NpgeDCzWs";

// ====================================================================================

export let supabase: SupabaseClient<Database> | null = null;
export let supabaseConfigError: string | null = null;

if (!supabaseUrl || !supabaseAnonKey) {
     supabaseConfigError = "خطأ في إعدادات Supabase: متغيرات البيئة SUPABASE_URL و SUPABASE_ANON_KEY غير معرفة. يرجى تكوينها في بيئة التشغيل.";
} else {
    try {
        supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("فشل في تهيئة Supabase:", errorMessage);
        supabaseConfigError = `فشل في تهيئة Supabase: ${errorMessage}. تحقق من أن متغيرات البيئة صحيحة.`;
    }
}
