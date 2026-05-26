import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!client) {
    if (!config.supabase.url) {
      throw new Error('SUPABASE_URL is not configured. Copy .env.example to .env and set your Supabase credentials.');
    }
    client = createClient(config.supabase.url, config.supabase.serviceRoleKey);
  }
  return client;
}
