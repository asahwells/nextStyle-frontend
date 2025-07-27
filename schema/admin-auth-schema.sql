-- This file is no longer needed as Supabase has been removed.
-- It is kept here as a placeholder to indicate its previous existence.
-- You can safely delete this file if it's not used elsewhere.

-- Add MFA fields to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mfa_enabled BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mfa_verified BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mfa_secret TEXT;

-- Create table for storing login attempts to prevent brute force attacks
CREATE TABLE IF NOT EXISTS login_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  success BOOLEAN NOT NULL
);

-- Create table for admin activity logs
CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view login attempts
CREATE POLICY "Only admins can view login attempts" 
  ON login_attempts FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Only admins can view activity logs
CREATE POLICY "Only admins can view activity logs" 
  ON admin_activity_logs FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can only see their own activity logs or all logs if they're super admins
CREATE POLICY "Admins can view their own logs" 
  ON admin_activity_logs FOR SELECT 
  USING (
    user_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin' AND user_metadata->>'is_super_admin' = 'true'
    )
  );

-- Function to log admin activity
CREATE OR REPLACE FUNCTION log_admin_activity(
  action TEXT,
  details JSONB,
  ip_address TEXT
)
RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO admin_activity_logs (user_id, action, details, ip_address)
  VALUES (auth.uid(), action, details, ip_address)
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
