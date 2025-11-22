# CallMetric AI Web - Production Deployment Guide

## 🚀 Quick Start - Vercel Production Deployment

### Mevcut Durum
✅ Build başarılı (12 sayfa oluşturuldu)
✅ Security headers yapılandırıldı
✅ Next.js optimizasyonları aktif
✅ Vercel projesi hazır: https://vercel.com/melihkerem03s-projects/callmetricai-web

---

## Deployment Adımları

### 1. Vercel CLI ile Deploy (Önerilen)

```bash
# Web dizinine git
cd callmetricai/apps/web

# Vercel'e login ol (eğer yapmadıysan)
vercel login

# Production'a deploy et
vercel --prod
```

### 2. Vercel Dashboard'dan Deploy

1. [Vercel Dashboard](https://vercel.com/melihkerem03s-projects/callmetricai-web)'a git
2. **Settings** → **Git** → **Connect Git Repository** tıkla
3. GitHub/GitLab reponuzu bağlayın
4. Root Directory: `callmetricai/apps/web` olarak ayarlayın
5. **Deploy** butonuna basın

---

## Environment Variables (Opsiyonel)

Eğer API veya backend bağlantısı gerekiyorsa:

### Vercel Dashboard → Settings → Environment Variables

```bash
NEXT_PUBLIC_API_URL=https://api.callmetricai.com
NEXT_PUBLIC_APP_URL=https://callmetricai.com
```

---

## Domain Yapılandırması

### Vercel Dashboard → Domains

1. **Add Domain** butonuna tıkla
2. Domain ekle:
   - `callmetricai.com` (primary)
   - `www.callmetricai.com` (redirect to primary)

3. DNS kayıtlarını ayarla:
   - **A Record**: `76.76.21.21` (Vercel IP)
   - **CNAME**: `cname.vercel-dns.com`

---

## Build Çıktısı

```
✓ 12 sayfa başarıyla oluşturuldu:
  - Homepage (/)
  - Company (/company)
  - Products (/products)
  - FAQs (/faqs)
  - Contact (/contact)
  - Login (/login)
  - Signup (/signup)
  - Info (/info)
```

**Total Bundle Size:** ~102 kB (First Load JS)
**Build Time:** ~4 seconds

---

## Güvenlik Özellikleri

✅ **Security Headers:**
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

✅ **Next.js Optimizations:**
- React Strict Mode
- Response Compression
- Image Optimization (AVIF, WebP)
- Powered-by header disabled

---

## Post-Deployment Checklist

- [ ] Homepage (/) yükleniyor mu?
- [ ] Tüm sayfalar çalışıyor mu? (/company, /products, /faqs, vb.)
- [ ] Logo ve görseller görünüyor mu?
- [ ] Form'lar çalışıyor mu? (login, signup, contact)
- [ ] Mobile responsive düzgün mü?
- [ ] SSL certificate aktif mi? (https://)
- [ ] Lighthouse skoru kontrol et (Performance, SEO, Accessibility)

---

## Performance Optimization

### Yapılan Optimizasyonlar:
✅ Static page generation (SSG)
✅ Image optimization
✅ Code splitting
✅ Bundle size optimization
✅ Compression enabled

### Öneriler:
⚠️ **Image Tag Uyarıları:** 18 adet `<img>` tag'i `next/image` ile değiştirilmeli
  - Daha hızlı yükleme (LCP improvement)
  - Otomatik image optimization
  - Responsive images

---

## Rollback (Geri Alma)

Eğer production'da sorun çıkarsa:

```bash
vercel rollback
```

veya Vercel Dashboard'dan önceki deployment'ı seçip "Promote to Production" yapın.

---

## Monitoring

### Vercel Analytics (Otomatik)
- **Performance:** Real user monitoring
- **Web Vitals:** LCP, FID, CLS
- **Traffic:** Visitor analytics

### Manuel Kontrol
```bash
# Production URL'i test et
curl -I https://callmetricai.com

# SSL certificate kontrol
openssl s_client -connect callmetricai.com:443
```

---

## Troubleshooting

### Build Hatası?
```bash
# Local build test
cd callmetricai/apps/web
npm run build
```

### Domain Bağlanmıyor?
- DNS propagation bekle (24-48 saat)
- Vercel DNS ayarlarını kontrol et
- Nameserver'ları doğru ayarla

### 404 Hatası?
- Root Directory ayarını kontrol et: `callmetricai/apps/web`
- Build output directory: `.next`

---

## Deployment URL

🌐 **Production URL:** https://callmetricai-web.vercel.app (varsayılan)
🌐 **Custom Domain:** https://callmetricai.com (domain bağlandıktan sonra)

---

## Support

📧 **Email:** melihkerem03@gmail.com
🔗 **Vercel Dashboard:** https://vercel.com/melihkerem03s-projects/callmetricai-web

---

## Next Steps

1. ✅ **Deploy Now:** `vercel --prod` komutunu çalıştır
2. 🔧 **Configure Domain:** Domain ayarlarını yap
3. 📊 **Setup Analytics:** Vercel Analytics'i aktifleştir
4. 🖼️ **Optimize Images:** `<img>` tag'lerini `next/image` ile değiştir
5. 🔍 **SEO Optimization:** Meta tags ve sitemap ekle

---

**Status:** ✅ Ready for Production Deployment

Son güncelleme: 22 Kasım 2025

