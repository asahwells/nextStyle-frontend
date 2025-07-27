-- This file is no longer needed as Supabase has been removed.
-- It is kept here as a placeholder to indicate its previous existence.
-- You can safely delete this file if it's not used elsewhere.

-- Add address fields to brands table
ALTER TABLE brands ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS state TEXT;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS zip_code TEXT;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS country TEXT;

-- Create products table
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

-- Create subscriptions table for brand plans
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('free', 'basic', 'premium', 'enterprise')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ends_at TIMESTAMP WITH TIME ZONE,
  monthly_upload_limit INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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

-- Add RLS policies for subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Brand owners can view their own subscriptions
CREATE POLICY "Brand owners can view their own subscriptions" 
  ON subscriptions FOR SELECT 
  USING (
    brand_id IN (
      SELECT id FROM brands WHERE owner_id = auth.uid()
    )
  );

-- Only admins can modify subscriptions
CREATE POLICY "Only admins can modify subscriptions" 
  ON subscriptions FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
