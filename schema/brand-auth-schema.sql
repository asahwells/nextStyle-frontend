-- This file is no longer needed as Supabase has been removed.
-- It is kept here as a placeholder to indicate its previous existence.
-- You can safely delete this file if it's not used elsewhere.

-- Create products table to store brand-specific products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  sizes JSONB,
  colors JSONB,
  material TEXT,
  care_instructions TEXT,
  features JSONB,
  is_new BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  brand_id UUID REFERENCES brands(id) NOT NULL,
  stock_quantity INTEGER DEFAULT 0
);

-- Add RLS policies for products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Anyone can view active products
CREATE POLICY "Anyone can view active products" 
  ON products FOR SELECT 
  USING (is_active = true);

-- Brand owners can manage their own products
CREATE POLICY "Brand owners can manage their own products" 
  ON products FOR ALL 
  USING (
    brand_id IN (
      SELECT id FROM brands WHERE owner_id = auth.uid()
    )
  );

-- Add brand verification status to brands table
ALTER TABLE brands ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;

-- Create brand_invitations table for inviting new brand admins
CREATE TABLE IF NOT EXISTS brand_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  brand_id UUID REFERENCES brands(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_used BOOLEAN DEFAULT false
);

-- Add RLS policies for brand_invitations
ALTER TABLE brand_invitations ENABLE ROW LEVEL SECURITY;

-- Only admins can manage invitations
CREATE POLICY "Only admins can manage invitations" 
  ON brand_invitations FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to update product timestamps
CREATE OR REPLACE FUNCTION update_product_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating product timestamps
CREATE TRIGGER update_product_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_product_updated_at();
