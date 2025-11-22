-- Supabase'e call_analysis column ekle
-- SQL Editor'da çalıştırın: https://supabase.com/dashboard/project/igboerxkjwvyysowwwfx/sql

-- 1. call_analysis column'u ekle (yoksa)
ALTER TABLE gorusme 
ADD COLUMN IF NOT EXISTS call_analysis JSONB;

-- 2. Doğrula - column eklendi mi?
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'gorusme' 
AND column_name = 'call_analysis';

-- 3. kullanici_id'nin geçerli olduğunu kontrol et
SELECT id, ad, soyad, personel_id, departman
FROM kullanici 
WHERE id = 'd3881813-f1c5-4eb4-abb2-2d11f3b55a40';

-- 4. Test insert (RLS bypass - service_role ile otomatik)
INSERT INTO gorusme (
    kullanici_id,
    gorusme_adi,
    gorusme_tarihi,
    gorusme_suresi,
    transkript,
    dil,
    gorusme_durumu,
    gorusme_puani,
    musteri_memnuniyeti,
    ai_ozet,
    ai_onerileri,
    call_analysis
) VALUES (
    'd3881813-f1c5-4eb4-abb2-2d11f3b55a40',
    'Test Modal API Integration',
    NOW(),
    90,
    'SPEAKER_00: Hello?\nSPEAKER_01: Hi, this is Katie calling from Dr. Smith''s dental office.',
    'en',
    'tamamlandi',
    87,
    'High',
    'Test summary from Modal API',
    'Test recommendations line 1\nTest recommendations line 2',
    '{"call_summary": "Test call", "call_duration_analysis": "Efficient", "resolution_status": "Resolved", "caller_analysis": {"sentiment": "Positive", "tone": "Calm", "main_issue": "Test", "satisfaction_level": "High", "key_concerns": ["None"]}, "agent_performance": {"professionalism_score": 90, "empathy_score": 85, "problem_solving_score": 80, "communication_score": 95, "overall_score": 87, "strengths": ["Clear communication"], "improvement_areas": ["None"], "key_actions": ["Test action"]}, "recommendations": ["Keep up the good work"]}'::jsonb
);

-- 5. Verify - kayıt eklendi mi?
SELECT 
    id, 
    gorusme_adi, 
    gorusme_puani,
    dil,
    call_analysis->>'call_summary' as ai_summary,
    call_analysis->'agent_performance'->>'overall_score' as overall_score,
    olusturma_tarihi
FROM gorusme 
WHERE kullanici_id = 'd3881813-f1c5-4eb4-abb2-2d11f3b55a40'
ORDER BY olusturma_tarihi DESC 
LIMIT 1;

-- 6. Tüm görüşmeleri listele
SELECT 
    id,
    gorusme_adi,
    gorusme_puani,
    dil,
    CASE 
        WHEN call_analysis IS NOT NULL THEN '✅ Var'
        ELSE '❌ Yok'
    END as call_analysis_durumu,
    olusturma_tarihi
FROM gorusme
ORDER BY olusturma_tarihi DESC;

-- NOT: Bu script'i Supabase SQL Editor'da çalıştırdıktan sonra
-- Modal'dan yeni bir ses dosyası yükleyin ve otomatik kayıt yapılacak!

