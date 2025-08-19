import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://piphcrzwflnguexrlbuu.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseAnonKey) {
  console.warn('Supabase anon key is missing. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
})

// Helper function to check if Supabase is available
export const isSupabaseAvailable = () => {
  return supabase !== null;
};