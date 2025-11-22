# CallMetric AI - Production Deployment Guide

## Vercel Production Deployment

Bu dosya CallMetric AI projesinin Vercel'de production ortamına deploy edilmesi için gerekli adımları içerir.

### 1. Ortam Değişkenleri (Environment Variables)

Vercel Dashboard'da aşağıdaki environment variable'ları ekleyin:

#### App (callmetricai/apps/app)
```
NEXT_PUBLIC_SUPABASE_URL=https://igboerxkjwvyysowwwfx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
NEXT_PUBLIC_WHISPER_API_URL=https://melihkerem03--callmetric-ai-api-batched-whispermodel-fastapi-app.modal.run/transcribe
NEXT_PUBLIC_APP_URL=https://app.callmetricai.com
```

#### Web (callmetricai/apps/web)
```
NEXT_PUBLIC_API_URL=<your_api_url>
NEXT_PUBLIC_APP_URL=https://callmetricai.com
```

### 2. Vercel Proje Ayarları

#### App Project Settings:
- **Framework Preset**: Next.js
- **Build Command**: `cd ../.. && pnpm install --no-frozen-lockfile && pnpm run build --filter=app`
- **Output Directory**: `.next`
- **Install Command**: `cd ../.. && pnpm install --no-frozen-lockfile`
- **Root Directory**: `callmetricai/apps/app`
- **Node Version**: 20.x

#### Web Project Settings:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Root Directory**: `callmetricai/apps/web`
- **Node Version**: 20.x

### 3. Domain Yapılandırması

Vercel Dashboard'da domain ayarlarını yapın:
- **Web**: `callmetricai.com` & `www.callmetricai.com`
- **App**: `app.callmetricai.com`

### 4. Güvenlik

Production ortamında aşağıdaki güvenlik önlemleri alınmıştır:
- ✅ Console.log statements production'da devre dışı
- ✅ Security headers (X-Frame-Options, X-Content-Type-Options, vb.)
- ✅ HTTPS/SSL zorunlu
- ✅ Strict-Transport-Security header
- ✅ React strict mode aktif
- ✅ Powered-by header kaldırıldı

### 5. Performans Optimizasyonları

- ✅ Image optimization (AVIF, WebP)
- ✅ Response compression
- ✅ React strict mode
- ✅ Production build optimizations

### 6. Database (Supabase)

Supabase ayarlarını kontrol edin:
- ✅ RLS (Row Level Security) policies aktif
- ✅ KVKK uyumlu veri saklama
- ✅ API keys production ortamı için güncel

### 7. Deploy Komutu

Vercel CLI ile deploy:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
cd callmetricai/apps/app
vercel --prod

cd ../web
vercel --prod
```

### 8. Post-Deploy Checklist

- [ ] Tüm environment variables doğru mu?
- [ ] Domain ayarları çalışıyor mu?
- [ ] SSL certificate aktif mi?
- [ ] Database bağlantısı çalışıyor mu?
- [ ] Authentication flow çalışıyor mu?
- [ ] API endpoints erişilebilir mi?
- [ ] Image optimization çalışıyor mu?
- [ ] Error tracking (opsiyonel: Sentry) kuruldu mu?

### 9. Monitoring

Production ortamında izlenmesi gerekenler:
- Vercel Analytics
- Database connections
- API response times
- Error rates
- Build success rates

### 10. Rollback

Eğer bir sorun olursa:
```bash
vercel rollback
```

## Destek

Sorularınız için: support@callmetricai.com

