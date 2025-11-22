-- QUICK FIX: Disable RLS temporarily for testing
-- Run this in Supabase SQL Editor if profile/calls pages are stuck loading

-- 1. Disable RLS (TEST ONLY - NOT FOR PRODUCTION)
ALTER TABLE kullanici DISABLE ROW LEVEL SECURITY;
ALTER TABLE gorusme DISABLE ROW LEVEL SECURITY;

-- Test your pages now. If they work, then you need proper RLS policies.
-- To enable RLS back with correct policies, run fix_rls_policies.sql
