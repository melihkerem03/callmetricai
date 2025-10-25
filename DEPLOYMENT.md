# CallMetricAI Deployment Guide

Bu dokümanda, CallMetricAI monorepo'sunun subdomain yapısıyla nasıl deploy edileceğini açıklayacağız.

## Yapı

CallMetricAI üç ana uygulama içerir:

1. **Web** (`apps/web`) - Marketing sitesi: `callmetricai.com`
2. **App** (`apps/app`) - Dashboard: `app.callmetricai.com`
3. **API** (`apps/api`) - Backend API: `api.callmetricai.com`

## Vercel ile Deployment

### 1. Web Uygulaması (callmetricai.com)

**Proje Ayarları:**
- Root Directory: `apps/web`
- Framework: Next.js
- Build Command: `cd ../.. && pnpm run build --filter=web`
- Install Command: `cd ../.. && pnpm install`

**Environment Variables:**
```bash
NEXT_PUBLIC_API_URL=https://api.callmetricai.com
NEXT_PUBLIC_APP_URL=https://app.callmetricai.com
```

**Domain Ayarları:**
- Primary: `callmetricai.com`
- www: `www.callmetricai.com` (redirect to primary)

### 2. App Dashboard (app.callmetricai.com)

**Proje Ayarları:**
- Root Directory: `apps/app`
- Framework: Next.js
- Build Command: `cd ../.. && pnpm run build --filter=app`
- Install Command: `cd ../.. && pnpm install`

**Environment Variables:**
```bash
NEXT_PUBLIC_API_URL=https://api.callmetricai.com
NEXT_PUBLIC_WEB_URL=https://callmetricai.com
```

**Domain Ayarları:**
- Primary: `app.callmetricai.com`

### 3. API Backend (api.callmetricai.com)

**Proje Ayarları:**
- Root Directory: `apps/api`
- Framework: Other (NestJS)
- Build Command: `cd ../.. && pnpm run build --filter=api`
- Install Command: `cd ../.. && pnpm install`
- Start Command: `cd apps/api && node dist/main.js`

**Environment Variables:**
```bash
DATABASE_URL=postgresql://...
JWT_SECRET=...
# Diğer API env variables
```

**Domain Ayarları:**
- Primary: `api.callmetricai.com`

## Domain Yapılandırması

### DNS Ayarları (Domain Provider)

Vercel'de projeleri oluşturduktan sonra, domain provider'ınızda (örn. GoDaddy, Namecheap) şu DNS kayıtlarını ekleyin:

```
Type    Name    Value
----    ----    -----
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
CNAME   app     cname.vercel-dns.com
CNAME   api     cname.vercel-dns.com
```

> Not: Vercel size özel DNS değerleri verebilir, yukarıdaki değerler örnek amaçlıdır.

### Vercel'de Domain Ekleme

Her proje için:

1. Project Settings > Domains
2. Domain ekle
3. DNS propagation'ını bekle (~24 saat)
4. SSL sertifikası otomatik olarak oluşturulacak

## Local Development

```bash
# Monorepo root'tan tüm servisleri başlat
pnpm run dev

# Veya tek tek:
cd apps/web && pnpm dev    # localhost:3000
cd apps/app && pnpm dev    # localhost:3001
cd apps/api && pnpm dev    # localhost:4000
```

## Environment Variables

Her ortam için `.env.local` dosyaları:

### apps/web/.env.local
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000  # dev
NEXT_PUBLIC_APP_URL=http://localhost:3001  # dev
```

### apps/app/.env.local
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000  # dev
NEXT_PUBLIC_WEB_URL=http://localhost:3000  # dev
```

### apps/api/.env
```bash
DATABASE_URL=postgresql://...
PORT=4000
NODE_ENV=development
```

## Monorepo Build

Tüm uygulamaları build etmek için:

```bash
# Root dizinden
pnpm run build

# Veya spesifik app
pnpm run build --filter=web
pnpm run build --filter=app
pnpm run build --filter=api
```

## Troubleshooting

### Subdomain redirect çalışmıyor
- DNS propagation'ını kontrol edin (24 saate kadar sürebilir)
- Vercel'de domain'in doğru projeye eklendiğinden emin olun
- Environment variables'ların doğru olduğunu kontrol edin

### Build hatası
- `pnpm install` komutunu root'tan çalıştırın
- Workspace dependencies'lerinin doğru olduğundan emin olun
- Turbo cache'i temizleyin: `pnpm turbo clean`

### CORS hatası
- API'de CORS ayarlarını kontrol edin
- Environment variables'larda URL'lerin doğru olduğundan emin olun

## CI/CD

Vercel otomatik olarak GitHub'dan deploy eder:

- `main` branch → Production
- Feature branches → Preview deploys
- Pull requests → Preview deploys

Her commit'te otomatik build ve deploy yapılır.

