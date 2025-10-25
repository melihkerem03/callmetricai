-- SORUN TESPİTİ
-- 1. Kullanıcı var mı?
SELECT id, email FROM auth.users;

-- 2. Personel kaydı var mı?
SELECT * FROM kullanici;

-- 3. Kullanıcı ve personel eşleşiyor mu?
SELECT 
  u.id as user_id,
  u.email,
  k.id as kullanici_id,
  k.ad,
  k.soyad
FROM auth.users u
LEFT JOIN kullanici k ON k.user_id = u.id;

-- Personel kaydı ekle (tüm kullanıcılar için)
INSERT INTO kullanici (user_id, personel_id, ad, soyad, departman, yonetici)
SELECT 
  id,
  'PER-' || EXTRACT(EPOCH FROM NOW())::TEXT,
  COALESCE(raw_user_meta_data->>'first_name', 'User'),
  COALESCE(raw_user_meta_data->>'last_name', ''),
  COALESCE(raw_user_meta_data->>'department', 'musteri_hizmetleri'),
  false
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM kullanici WHERE user_id IS NOT NULL)
ON CONFLICT (user_id) DO NOTHING
RETURNING *;

-- Kontrol edin
SELECT * FROM kullanici;

-- Sahte görüşme verisi ekle (ID ile)
INSERT INTO gorusme (
  kullanici_id,
  musteri_telefon,
  musteri_adi,
  gorusme_tipi,
  gorusme_durumu,
  gorusme_suresi,
  gorusme_puani,
  gorusme_notlari,
  gorusme_tarihi
) VALUES 
(
  'f7a98582-9ad3-44c8-928c-ffb79d48283f',
  '+90 555 123 4567',
  'Ahmet Yılmaz',
  'gelen',
  'tamamlandi',
  180,
  8,
  'Müşteri teknik destek istedi, sorun çözüldü.',
  NOW() - INTERVAL '2 hours'
);

-- Daha fazla görüşme ekle
INSERT INTO gorusme (
  kullanici_id,
  musteri_telefon,
  musteri_adi,
  gorusme_tipi,
  gorusme_durumu,
  gorusme_suresi,
  gorusme_puani,
  gorusme_notlari,
  gorusme_tarihi
) VALUES 
(
  'f7a98582-9ad3-44c8-928c-ffb79d48283f',
  '+90 555 987 6543',
  'Fatma Demir',
  'giden',
  'tamamlandi',
  240,
  9,
  'Proaktif müşteri ziyareti, memnuniyet yüksek.',
  NOW() - INTERVAL '1 day'
),
(
  'f7a98582-9ad3-44c8-928c-ffb79d48283f',
  '+90 555 456 7890',
  'Mehmet Kaya',
  'gelen',
  'tamamlandi',
  120,
  7,
  'Hızlı çözüm sağlandı.',
  NOW() - INTERVAL '3 days'
),
(
  'f7a98582-9ad3-44c8-928c-ffb79d48283f',
  '+90 555 321 0987',
  'Ayşe Çelik',
  'giden',
  'aktif',
  0,
  NULL,
  'Görüşme devam ediyor...',
  NOW()
);

-- Görüşmeleri kontrol edin
SELECT * FROM gorusme;
