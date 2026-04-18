import { createClient } from "@supabase/supabase-js";

// .env fayldagi ma'lumotlarni o'qiymiz
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase mijozini yaratamiz
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
