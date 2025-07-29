import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types';

// ====================================================================================
// !!! ملاحظة هامة حول الاتصال بقاعدة البيانات !!!
// ====================================================================================
//
// تم تكوين التطبيق مؤقتًا باستخدام بيانات اعتماد عامة لـ Supabase ليعمل مباشرة لأغراض المعاينة.
// هذا يعني أن أي بيانات تدخلها (مثل حسابات المستخدمين والرسائل) ستكون عامة وقد يتم حذفها.
//
// **لإستخدام قاعدة البيانات الخاصة بك:**
// 1. اذهب إلى https://supabase.com وأنشئ مشروعًا جديدًا.
// 2. من إعدادات المشروع، اذهب إلى `API` وانسخ `URL` و `anon key`.
// 3. استبدل القيم الموجودة في `supabaseUrl` و `supabaseAnonKey` أدناه ببياناتك الخاصة.
//
const supabaseUrl = 'https://zpucambojfgakszxciyj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwdWNhbWJvamZnYWtzenhjaXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MDg0MTcsImV4cCI6MjA2Njk4NDQxN30.iu2VsHCKZZQqVF0DJx3IhqD2UQOideanu6NpgeDCzWs';

// ====================================================================================

export let supabase: SupabaseClient<Database> | null = null;
export let supabaseConfigError: string | null = null;

if (!supabaseUrl || !supabaseAnonKey) {
     supabaseConfigError = "خطأ في إعدادات Supabase: بيانات الإعداد غير مكتملة. يرجى فتح الملف `services/supabase.ts` وإدخال URL ومفتاح anon الخاص بمشروع Supabase.";
} else {
    try {
        supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("فشل في تهيئة Supabase:", errorMessage);
        supabaseConfigError = `فشل في تهيئة Supabase: ${errorMessage}. تحقق من أن البيانات التي أدخلتها في 'services/supabase.ts' صحيحة.`;
    }
}