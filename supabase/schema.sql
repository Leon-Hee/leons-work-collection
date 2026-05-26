-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Storage bucket for images (run this in Supabase SQL Editor or Dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Storage policy: allow public read
-- CREATE POLICY "Public read" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Storage policy: allow authenticated insert
-- CREATE POLICY "Auth insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
