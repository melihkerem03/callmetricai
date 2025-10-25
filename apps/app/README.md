# CallMetricAI - App Dashboard

Bu, CallMetricAI platformunun ana uygulama dashboard'udur. Kullanıcılar burada giriş yapabilir ve yapay zeka ajanlarını yönetebilir.

## Geliştirme

```bash
cd callmetricai
pnpm run dev
```

App, `http://localhost:3001` adresinde çalışacaktır.

## Dosya Yapısı

```
src/
├── app/
│   ├── auth/                # Auth sayfaları
│   │   ├── layout.tsx       # Auth layout
│   │   ├── login/page.tsx   # Giriş sayfası
│   │   ├── signup/page.tsx  # Kayıt sayfası
│   │   └── forgot-password/page.tsx  # Şifre sıfırlama
│   ├── dashboard/page.tsx   # Dashboard sayfası
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Ana sayfa (auth/login'e yönlendirir)
│   └── globals.css
```

## Subdomain Yapılandırması

### Development (Local)
- Web: `http://localhost:3000`
- App: `http://localhost:3001`
- API: `http://localhost:4000`

### Production
- Web: `https://callmetricai.com`
- App: `https://app.callmetricai.com`
- API: `https://api.callmetricai.com`

## Environment Variables

`.env.local` dosyası oluşturun:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WEB_URL=http://localhost:3000
```

Production için:

```bash
NEXT_PUBLIC_API_URL=https://api.callmetricai.com
NEXT_PUBLIC_WEB_URL=https://callmetricai.com
```

## Vercel Deployment

App, Vercel'de ayrı bir proje olarak deploy edilmelidir:

1. Vercel'de yeni bir proje oluşturun
2. Root directory'yi `apps/app` olarak ayarlayın
3. Build command'ı monorepo için yapılandırın
4. Custom domain olarak `app.callmetricai.com` ekleyin
5. Environment variables'ları ekleyin

## Özellikler

- ✅ Modern ve responsive tasarım
- ✅ Giriş / Kayıt / Şifre sıfırlama sayfaları
- ✅ Google OAuth entegrasyonu (hazır)
- ✅ Dashboard (temel yapı)
- ⏳ API entegrasyonu (yakında)
- ⏳ Ajan yönetimi (yakında)
- ⏳ Çağrı takibi (yakında)
