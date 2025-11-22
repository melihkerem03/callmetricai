-- Supabase'e call_analysis column ekle
-- Supabase SQL Editor'da çalıştırın

ALTER TABLE gorusme 
ADD COLUMN IF NOT EXISTS call_analysis JSONB;

-- Verify
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'gorusme' 
AND column_name = 'call_analysis';

