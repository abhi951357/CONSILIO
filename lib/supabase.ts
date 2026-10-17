import { createClient } from '@supabase/supabase-js';
import { Pool } from 'pg';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pnelseflvhniplbdvybu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZWxzZWZsdmhuaXBsYmR2eWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxMjM4NDgsImV4cCI6MjEwNzY5OTg0OH0.0Abwv1vsBWugIO4iXZWMy6woXaBsz4L2S1Qyn3id_4Q';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZWxzZWZsdmhuaXBsYmR2eWJ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MjEyMzg0OCwiZXhwIjoyMTA3Njk5ODQ4fQ.kFTdg_9ovRyW6TCYCLsp7EOgXR2YWfK3Gqdhssstlrs';

// Client-safe Supabase instance (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin Supabase instance (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Singleton PostgreSQL Connection Pool for server-side SQL queries
declare global {
  // eslint-disable-next-line no-var
  var __postgresPool: Pool | undefined;
}

export function getPgPool(): Pool {
  if (!global.__postgresPool) {
    global.__postgresPool = new Pool({
      host: process.env.DATABASE_HOST || 'aws-0-ap-south-1.pooler.supabase.com',
      port: parseInt(process.env.DATABASE_PORT || '6543', 10),
      user: process.env.DATABASE_USER || 'postgres.pnelseflvhniplbdvybu',
      password: process.env.DATABASE_PASSWORD || 'xiMDOjarZhEfXAVz',
      database: process.env.DATABASE_NAME || 'postgres',
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
    });

    global.__postgresPool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client:', err);
    });
  }
  return global.__postgresPool;
}
