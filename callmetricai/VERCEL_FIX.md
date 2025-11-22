# Vercel Deployment Fix - Path Issue

## Problem
Vercel path'i çift ekliyor: `callmetricai/apps/web/callmetricai/apps/web`

## Solution

### Option 1: Vercel Dashboard Settings (Önerilen)

1. **[Vercel Settings](https://vercel.com/melihkerem03s-projects/callmetricai-web/settings) sayfasına git**

2. **General → Root Directory ayarını BOŞALT veya "." yap**
   - Şu anda muhtemelen: `callmetricai/apps/web`
   - Olması gereken: `.` (boş veya nokta)

3. **Build & Development Settings:**
   - Framework Preset: `Next.js`
   - Root Directory: `.` (current directory)
   - Build Command: `npm run build`
   - Output Directory: Leave empty (Next.js default)
   - Install Command: `npm install`

4. **Save** ve **Redeploy**

### Option 2: GitHub Integration (En İyi Çözüm)

1. **Settings → Git → Connect Git Repository**
2. GitHub repo'nuzu seçin
3. Root Directory'yi şöyle ayarlayın: `callmetricai/apps/web`
4. **Deploy** - Her push'ta otomatik deploy olur

### Option 3: Terminal'den Yeni Proje

```bash
cd /Users/melihkerem03/Desktop/CALL\ FOLDER/callmetricai/callmetricai/apps/web

# Eski link'i temizle
rm -rf .vercel

# Yeni deploy (proje seçimi yapılacak)
vercel --prod --yes
```

Soru sorulduğunda:
- Set up and deploy? → **Yes**
- Which scope? → melihkerem03s-projects
- Link to existing project? → **No** (yeni proje oluştur)
- Project name? → callmetricai-web
- Directory? → **./** (current directory)

## Hızlı Çözüm (Şimdi Dene)

1. [Vercel Dashboard Settings](https://vercel.com/melihkerem03s-projects/callmetricai-web/settings/general) aç
2. **Root Directory** kısmını bul
3. İçeriğini SİL (boş bırak veya "." yap)
4. **Save** 
5. Terminal'e dön ve tekrar `vercel --prod --yes` çalıştır

Bu işlemden sonra path sorunu çözülecektir.

