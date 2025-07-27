-- This file is no longer needed as Supabase has been removed.
-- It is kept here as a placeholder to indicate its previous existence.
-- You can safely delete this file if it's not used elsewhere.

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  bio TEXT,
  role TEXT CHECK (role IN ('user', 'admin', 'brand')),
  measurements JSONB
);

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  owner_id UUID REFERENCES auth.users NOT NULL
);

-- Create saved_items table
CREATE TABLE IF NOT EXISTS saved_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  product_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create try_on_history table
CREATE TABLE IF NOT EXISTS try_on_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  product_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
-- Profiles table policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "New users can create their profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Brands table policies
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved brands"
  ON brands FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Brand owners can view their own brands"
  ON brands FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Brand owners can update their own brands"
  ON brands FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can create brands"
  ON brands FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- Saved items table policies
ALTER TABLE saved_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved items"
  ON saved_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved items"
  ON saved_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved items"
  ON saved_items FOR DELETE
  USING (auth.uid() = user_id);

-- Try-on history table policies
ALTER TABLE try_on_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own try-on history"
  ON try_on_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own try-on history"
  ON try_on_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    COALESCE(new.raw_user_meta_data->>'role', 'user')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
