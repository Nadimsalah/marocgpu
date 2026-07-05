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
  console.log("Connecting to Supabase database...");
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'site_settings')
      .single();
      
    if (error) {
      console.log("No site_settings found or error:", error.message);
      return;
    }
    
    if (data?.value) {
      const siteSettings = data.value;
      console.log("Current DB logo:", siteSettings.logo);
      
      if (siteSettings.logo === "/marocgpu-logo-transparent.png" || !siteSettings.logo) {
        siteSettings.logo = "/marocgpu-logo.svg";
        
        const { error: updateError } = await supabase
          .from('settings')
          .upsert({ key: 'site_settings', value: siteSettings });
          
        if (updateError) {
          throw updateError;
        }
        console.log("Successfully updated live database settings logo to /marocgpu-logo.svg!");
      } else {
        console.log("Database logo is already custom or already updated:", siteSettings.logo);
      }
    }
  } catch (err) {
    console.error("Error updating database settings logo:", err);
  }
}

run();
