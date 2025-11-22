# ✅ ÇÖZÜM: GitHub ile Vercel Deploy

## Sorun
Vercel CLI root directory'yi sürekli yanlış algılıyor.

## ✅ En İyi Çözüm: GitHub Integration

### Adım 1: GitHub'a Push

```bash
cd /Users/melihkerem03/Desktop/CALL\ FOLDER/callmetricai

# Git durumunu kontrol et
git status

# Değişiklikleri ekle
git add .

# Commit yap
git commit -m "Production ready: Web app optimizations and security headers"

# Push yap
git push origin main
```

### Adım 2: Vercel'de GitHub Bağlantısı

1. **[Vercel Dashboard](https://vercel.com/new) → New Project**

2. **Import Git Repository** → GitHub'ı seç

3. **Repository'yi seç** (callmetricai veya benzer)

4. **Configure Project:**
   ```
   Project Name: callmetricai-web
   Framework Preset: Next.js
   Root Directory: callmetricai/apps/web  ← ÖNEMLİ!
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

5. **Environment Variables:** (şimdilik atla, sonra eklersin)

6. **Deploy** butonuna bas!

### Adım 3: Domain Ayarla (Opsiyonel)

Deploy tamamlandıktan sonra:
- Settings → Domains
- `callmetricai.com` ekle

---

## 🔄 Alternatif: CLI ile Doğrudan Deploy (Manuel)

Eğer GitHub kullanmak istemiyorsan:

### Vercel Dashboard'dan Manuel Ayar

1. [Settings sayfasına git](https://vercel.com/melihkerem03s-projects/callmetricai-web-prod/settings/general)

2. **General Settings:**
   - Root Directory: **SİL** (boş bırak)
   - Save

3. Terminal:
```bash
cd /Users/melihkerem03/Desktop/CALL\ FOLDER/callmetricai/callmetricai/apps/web
vercel --prod --yes
```

---

## 📝 Neden Bu Sorun Oluyor?

Vercel CLI şu anda bulunduğunuz dizini otomatik algılıyor ama build sırasında başka bir path kullanıyor. GitHub integration ile bu sorun olmaz çünkü repo'nun root'undan build yapılıyor.

---

## 🎯 ÖNERİ: GitHub Integration Kullan

**Avantajları:**
✅ Her push'ta otomatik deploy
✅ Preview deployments (PR'lar için)
✅ Rollback kolaylığı
✅ Team collaboration
✅ Path sorunları yok!

**İlk defa setup 5 dakika, sonrası otomatik!**

