-- CallMetricAI Database Schema
-- Run this in Supabase SQL Editor

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create kullanici (personnel) table
CREATE TABLE IF NOT EXISTS kullanici (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    personel_id VARCHAR(50) UNIQUE NOT NULL,
    ad VARCHAR(100) NOT NULL,
    soyad VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    departman VARCHAR(50) CHECK (departman IN ('satis', 'teknik', 'musteri_hizmetleri')),
    pozisyon VARCHAR(100),
    aktif BOOLEAN DEFAULT true,
    yonetici BOOLEAN DEFAULT false,
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create gorusme (calls) table
CREATE TABLE IF NOT EXISTS gorusme (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kullanici_id UUID REFERENCES kullanici(id) ON DELETE CASCADE,
    gorusme_adi VARCHAR(255),
    gorusme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    gorusme_suresi INTEGER, -- in seconds
    gorusme_durumu VARCHAR(50) CHECK (gorusme_durumu IN ('tamamlandi', 'devam_ediyor', 'iptal')),
    gorusme_puani INTEGER CHECK (gorusme_puani >= 0 AND gorusme_puani <= 100),
    transkript TEXT,
    dil VARCHAR(10),
    musteri_memnuniyeti VARCHAR(50),
    ai_ozet TEXT,
    ai_onerileri TEXT,
    ses_dosyasi_url TEXT,
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_kullanici_user_id ON kullanici(user_id);
CREATE INDEX IF NOT EXISTS idx_kullanici_personel_id ON kullanici(personel_id);
CREATE INDEX IF NOT EXISTS idx_gorusme_kullanici_id ON gorusme(kullanici_id);
CREATE INDEX IF NOT EXISTS idx_gorusme_tarihi ON gorusme(gorusme_tarihi DESC);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE kullanici ENABLE ROW LEVEL SECURITY;
ALTER TABLE gorusme ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies for kullanici table

-- Users can view their own personnel record
CREATE POLICY "Users can view own personnel record"
ON kullanici FOR SELECT
USING (auth.uid() = user_id);

-- Admins can view all personnel records
CREATE POLICY "Admins can view all personnel"
ON kullanici FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM kullanici
        WHERE user_id = auth.uid() AND yonetici = true
    )
);

-- Users can update their own record
CREATE POLICY "Users can update own record"
ON kullanici FOR UPDATE
USING (auth.uid() = user_id);

-- 7. RLS Policies for gorusme table

-- Users can view their own calls
CREATE POLICY "Users can view own calls"
ON gorusme FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM kullanici
        WHERE kullanici.id = gorusme.kullanici_id
        AND kullanici.user_id = auth.uid()
    )
);

-- Admins can view all calls
CREATE POLICY "Admins can view all calls"
ON gorusme FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM kullanici
        WHERE user_id = auth.uid() AND yonetici = true
    )
);

-- Users can insert their own calls
CREATE POLICY "Users can insert own calls"
ON gorusme FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM kullanici
        WHERE kullanici.id = gorusme.kullanici_id
        AND kullanici.user_id = auth.uid()
    )
);

-- Users can update their own calls
CREATE POLICY "Users can update own calls"
ON gorusme FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM kullanici
        WHERE kullanici.id = gorusme.kullanici_id
        AND kullanici.user_id = auth.uid()
    )
);

-- Users can delete their own calls
CREATE POLICY "Users can delete own calls"
ON gorusme FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM kullanici
        WHERE kullanici.id = gorusme.kullanici_id
        AND kullanici.user_id = auth.uid()
    )
);

-- 8. Create trigger to automatically create personnel record when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.kullanici (user_id, personel_id, ad, soyad, email, departman, aktif, yonetici)
    VALUES (
        NEW.id,
        'P' || LPAD(NEXTVAL('personel_id_seq')::TEXT, 4, '0'),
        COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
        '',
        NEW.email,
        'musteri_hizmetleri',
        true,
        false
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create sequence for personnel ID
CREATE SEQUENCE IF NOT EXISTS personel_id_seq START 1;

-- Create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. Insert sample admin user (OPTIONAL - for testing)
-- First, sign up a user via the app, then run this to make them admin:
-- UPDATE kullanici SET yonetici = true WHERE email = 'your-admin-email@example.com';

COMMIT;

