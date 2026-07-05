import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      process.env[key] = val;
    }
  });
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vdytxvhxpdejdbgqozyk.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_QgoWn84wkrdpXSgSkrbFsg_z--jJ0OV"
);

async function run() {
  console.log("Inspecting settings table schema...");
  try {
    const { data, error } = await supabase.rpc('inspect_settings_table');
    
    // If RPC doesn't exist, we can run a direct query on settings table to test
    console.log("RLS/schema query result:", { data, error });
    
    // Let's check what is in site_settings key in settings table right now
    const { data: row, error: rowError } = await supabase
      .from('settings')
      .select('*')
      .eq('key', 'site_settings')
      .maybeSingle();
      
    console.log("Current site_settings row:", { row, rowError });
  } catch (err) {
    console.error(err);
  }
}

run();
