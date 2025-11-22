-- Add request_id column to gorusme table for polling support
-- Run this in Supabase SQL Editor

-- Add request_id column
ALTER TABLE gorusme ADD COLUMN IF NOT EXISTS request_id UUID UNIQUE;

-- Add index for fast lookup
CREATE INDEX IF NOT EXISTS idx_gorusme_request_id ON gorusme(request_id);

-- Verify
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'gorusme' AND column_name = 'request_id';

