// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or anon key is missing. Check your .env file.');
  throw new Error('Supabase URL and anon key must be defined in the environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);