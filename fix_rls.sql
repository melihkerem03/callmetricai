-- RLS Politikalarını Sıfırlayalım

-- Önce mevcut politikaları silelim
DROP POLICY IF EXISTS "Kullanici kendi verilerini gorebilir" ON kullanici;
DROP POLICY IF EXISTS "Yoneticiler tum kullanicilari gorebilir" ON kullanici;
DROP POLICY IF EXISTS "Kullanici kendi verilerini guncelleyebilir" ON kullanici;
DROP POLICY IF EXISTS "Kullanici kendi gorusmelerini gorebilir" ON gorusme;
DROP POLICY IF EXISTS "Yoneticiler tum gorusmeleri gorebilir" ON gorusme;
DROP POLICY IF EXISTS "Kullanici kendi gorusmelerini yonetebilir" ON gorusme;
DROP POLICY IF EXISTS "kullanici_select_own" ON kullanici;
DROP POLICY IF EXISTS "kullanici_select_all" ON kullanici;
DROP POLICY IF EXISTS "kullanici_update_own" ON kullanici;
DROP POLICY IF EXISTS "gorusme_select_own" ON gorusme;
DROP POLICY IF EXISTS "gorusme_select_all" ON gorusme;
DROP POLICY IF EXISTS "gorusme_all_own" ON gorusme;
DROP POLICY IF EXISTS "gorusme_insert_own" ON gorusme;
DROP POLICY IF EXISTS "gorusme_select_all_simple" ON gorusme;

-- Test için RLS'yi geçici olarak kapatıyoruz
ALTER TABLE kullanici DISABLE ROW LEVEL SECURITY;
ALTER TABLE gorusme DISABLE ROW LEVEL SECURITY;
