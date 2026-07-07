import { createClient } from '@supabase/supabase-js';

const isServer = typeof window === 'undefined';
const supabaseKey = (isServer && process.env.SUPABASE_SERVICE_ROLE_KEY)
  ? process.env.SUPABASE_SERVICE_ROLE_KEY
  : (process.env.SUPABASE_API_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey
);

// Test the connection only on server side to avoid spamming browser console
if (isServer) {
  supabase
    .from('products')
    .select('*')
    .limit(1)
    .then(({ data, error }) => {
      if (error) console.error('Connection error:', error);
      else console.log('Connected to Supabase:', data ? 'OK' : 'No data');
    });
}

export default supabase;
