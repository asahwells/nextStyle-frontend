-- Update the handle_new_user function to better handle Google OAuth data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  full_name TEXT;
  avatar TEXT;
  user_role TEXT;
BEGIN
  -- Get the full name from user metadata
  full_name := new.raw_user_meta_data->>'full_name';
  
  -- If full_name is null, try to get it from the 'name' field (used by Google)
  IF full_name IS NULL THEN
    full_name := new.raw_user_meta_data->>'name';
  END IF;
  
  -- Get the avatar URL
  avatar := new.raw_user_meta_data->>'avatar_url';
  
  -- If avatar is null, try to get it from the 'picture' field (used by Google)
  IF avatar IS NULL THEN
    avatar := new.raw_user_meta_data->>'picture';
  END IF;
  
  -- Get the user role or default to 'user'
  user_role := COALESCE(new.raw_user_meta_data->>'role', 'user');
  
  -- Insert the profile
  INSERT INTO public.profiles (
    id, 
    full_name, 
    avatar_url, 
    role,
    updated_at
  )
  VALUES (
    new.id,
    full_name,
    avatar,
    user_role,
    now()
  );
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- This file is no longer needed as Supabase has been removed.
-- It is kept here as a placeholder to indicate its previous existence.
-- You can safely delete this file if it's not used elsewhere.
