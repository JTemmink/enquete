import { createClient } from '@supabase/supabase-js'

<<<<<<< HEAD
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://piphcrzwflnguexrlbuu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if we have the required values
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to check if Supabase is available
export const isSupabaseAvailable = () => {
  return supabase !== null;
};

=======
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://piphcrzwflnguexrlbuu.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseAnonKey) {
  console.warn('Supabase anon key is missing. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.')
}
>>>>>>> 6373ed1e007c4cac7ef6826e746f2acfdd2a8dbb

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
})