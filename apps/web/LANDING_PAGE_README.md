# CallMetric AI Landing Page - Dokümantasyon

## 📁 Component Yapısı

Landing page aşağıdaki modüler component yapısıyla oluşturulmuştur:

```
src/
  components/
    landing/
      ├── Hero/               # Ana başlık ve CTA butonları
      ├── ProductIntro/       # 4 bölümlük ürün tanıtımı
      ├── ProductFeatures/    # 6 özellik kartı
      ├── HowItWorks/         # 3 adımlı süreç açıklaması + workflow görseli
      ├── Dashboards/         # Yönetici ve temsilci dashboard örnekleri
      ├── Scenarios/          # Sektörel kullanım senaryoları
      ├── Testimonials/       # Kurucu alıntısı
      ├── CTA/                # Ana CTA bölümü
      ├── Footer/             # İletişim, sosyal medya, KVKK bilgileri
      ├── StickyCTA/          # Kaydırma sonrası görünen sabit CTA butonu
      ├── EarlyAccessModal/   # Erken erişim form modali
      └── index.ts            # Component export dosyası
  data/
    └── dashboardTexts.json   # Dashboard metinleri (i18n için hazır)
```

## 🎨 Kullanılan Renkler

Mevcut CSS variables kullanılmıştır:

- `--brand-navy: #0B1B3A` (Lacivert - Ana renk)
- `--brand-orange: #FF7A1A` (Turuncu - Vurgu rengi)
- `--brand-turquoise: #1EB8B2` (Turkuaz - İkincil vurgu)

## 📋 Özellikler

### ✅ Tamamlanan Özellikler

- [x] Hero section (ana başlık, alt başlık, CTA butonları)
- [x] Ürün tanıtımı (4 farklı özellik detayı)
- [x] Ürün özellikleri (6 kart)
- [x] Nasıl çalışır bölümü (3 adım + workflow görseli)
- [x] Dashboard görünümleri (JSON'dan beslenen)
- [x] Sektörel senaryolar (4 farklı sektör)
- [x] Kurucu alıntısı
- [x] CTA bölümü
- [x] Footer (iletişim, sosyal medya, KVKK)
- [x] Sticky CTA butonu (scroll sonrası aktif)
- [x] Erken Erişim formu (modal)
- [x] KVKK onay checkbox ve açıklama modali
- [x] SEO metadata
- [x] Responsive tasarım
- [x] Dashboard metinleri JSON formatında

### 📝 Form Alanları (Erken Erişim)

**Zorunlu Alanlar:**
- İsim Soyisim
- Şirket Adı
- Kurumsal E-posta
- KVKK Onayı (checkbox)

**Opsiyonel Alanlar:**
- Telefon
- Temsilci Sayısı
- Entegrasyon Notu

## 🔍 SEO Bilgileri

**Sayfa Başlığı:**
```
CallMetric AI — Çağrı Merkezi Performans Analizi
```

**Meta Açıklama:**
```
CallMetric AI — Türkçe'ye özel çağrı merkezi performans analizi. 
Gerçek zamanlı duygu ve içerik füzyonu (SER+NLP), anlık koçluk, 
yönetici dashboard'ları ve KVKK uyumlu SaaS. Ücretsiz demo alın.
```

**Anahtar Kelimeler:**
- çağrı merkezi analizi
- çağrı merkezi yapay zeka
- Türkçe SER
- çağrı performans analizi
- agent assist
- gerçek zamanlı koçluk
- KVKK uyumlu çağrı analizi

## 🖼️ Kullanılan Görseller

Mevcut görseller korunmuş ve kullanılmıştır:
- `/call1.jpg` - Hero section
- `/call2.webp` - Ürün tanıtımı
- `/call3.webp` - Ürün tanıtımı
- `/call4.webp` - Ürün tanıtımı
- `/workflow1.png` - Veri işleme süreci
- `/callmetriclogo.png` - Logo

## 🚀 Önemli Notlar

1. **Sticky CTA:** Sayfa 500px aşağı kaydırıldığında sağ altta belirir
2. **Modal Sistemi:** Her iki CTA butonu da aynı modal'ı açar
3. **KVKK Uyumu:** Form gönderilmeden önce KVKK onayı zorunlu
4. **i18n Hazırlığı:** Dashboard metinleri JSON formatında saklanıyor
5. **Responsive:** Mobile, tablet ve desktop için optimize edildi
6. **Accessibility:** Semantic HTML kullanıldı

## 📞 İletişim Bilgileri

- **E-posta:** Info@callmetricai.com
- **Telefon:** +90 212 912 24 26
- **WhatsApp:** 0 533 096 4800
- **Adres:** Teknopark, Orhangazi Mah. Merkez, Düzce

## 🔗 Sosyal Medya

- LinkedIn: https://www.linkedin.com/company/callmetric-ai/
- Twitter: https://x.com/CallMetricAi
- Instagram: https://www.instagram.com/CallMetricAi
- Facebook: https://www.facebook.com/callmetricai

## 🛠️ Geliştirme Notları

### Form Submission
Form şu anda console'a log yazmaktadır. Backend entegrasyonu için `EarlyAccessModal/index.tsx` dosyasındaki `handleSubmit` fonksiyonunu güncelleyin.

### i18n Desteği
Dashboard metinleri zaten JSON formatında. Diğer sayfalar için de benzer yapı uygulanabilir.

### Stil Özelleştirme
Tüm componentler Tailwind CSS kullanıyor. Brand renklerini değiştirmek için `globals.css` dosyasındaki CSS variables'ı güncelleyin.

## ✅ Delivery Checklist

- [x] Tüm içerik korundu ve formatlandı
- [x] Hero + CTA above the fold
- [x] Sticky secondary CTA
- [x] Responsive (mobile/tablet/desktop)
- [x] SEO metadata eklendi
- [x] KVKK modal ve onay checkbox işlevsel
- [x] Dashboard metinleri JSON'da saklandı
- [x] Mevcut görseller korundu
- [x] Component yapısı modüler ve organize
- [x] Türkçe dil desteği
- [x] Brand renkleri kullanıldı




