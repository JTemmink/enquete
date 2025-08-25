import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://piphcrzwflnguexrlbuu.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

console.log('Supabase Client Initialization:', {
  supabaseUrl: supabaseUrl,
  supabaseAnonKey: supabaseAnonKey ? 'Present' : 'Missing',
  urlLength: supabaseUrl.length,
  keyLength: supabaseAnonKey.length,
  envUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
  envKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
});

if (!supabaseAnonKey) {
  console.error('Supabase anon key is missing. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
  console.error('Current environment variables:', {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing'
  });
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
  return supabase !== null && supabaseAnonKey !== '';
};