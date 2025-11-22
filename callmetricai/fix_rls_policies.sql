-- Fix RLS Policies for kullanici and gorusme tables
-- Run this in Supabase SQL Editor

-- 1. Enable RLS on both tables
ALTER TABLE kullanici ENABLE ROW LEVEL SECURITY;
ALTER TABLE gorusme ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies (if any)
DROP POLICY IF EXISTS "Users can view own data" ON kullanici;
DROP POLICY IF EXISTS "Users can update own data" ON kullanici;
DROP POLICY IF EXISTS "Admins can view all data" ON kullanici;

DROP POLICY IF EXISTS "Users can view own calls" ON gorusme;
DROP POLICY IF EXISTS "Users can insert own calls" ON gorusme;
DROP POLICY IF EXISTS "Users can update own calls" ON gorusme;
DROP POLICY IF EXISTS "Users can delete own calls" ON gorusme;
DROP POLICY IF EXISTS "Admins can view all calls" ON gorusme;

-- 3. Create kullanici (personnel) policies
-- Allow users to view their own personnel record
CREATE POLICY "Users can view own data"
  ON kullanici
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow admins to view all personnel
CREATE POLICY "Admins can view all data"
  ON kullanici
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM kullanici 
      WHERE user_id = auth.uid() AND yonetici = true
    )
  );

-- Allow users to update their own data
CREATE POLICY "Users can update own data"
  ON kullanici
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4. Create gorusme (calls) policies
-- Allow users to view their own calls
CREATE POLICY "Users can view own calls"
  ON gorusme
  FOR SELECT
  USING (
    kullanici_id IN (
      SELECT id FROM kullanici WHERE user_id = auth.uid()
    )
  );

-- Allow admins to view all calls
CREATE POLICY "Admins can view all calls"
  ON gorusme
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM kullanici 
      WHERE user_id = auth.uid() AND yonetici = true
    )
  );

-- Allow users to insert their own calls
CREATE POLICY "Users can insert own calls"
  ON gorusme
  FOR INSERT
  WITH CHECK (
    kullanici_id IN (
      SELECT id FROM kullanici WHERE user_id = auth.uid()
    )
  );

-- Allow users to update their own calls
CREATE POLICY "Users can update own calls"
  ON gorusme
  FOR UPDATE
  USING (
    kullanici_id IN (
      SELECT id FROM kullanici WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    kullanici_id IN (
      SELECT id FROM kullanici WHERE user_id = auth.uid()
    )
  );

-- Allow users to delete their own calls
CREATE POLICY "Users can delete own calls"
  ON gorusme
  FOR DELETE
  USING (
    kullanici_id IN (
      SELECT id FROM kullanici WHERE user_id = auth.uid()
    )
  );

-- 5. Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('kullanici', 'gorusme')
ORDER BY tablename, policyname;

