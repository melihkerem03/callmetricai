# CallMetricAI - Marketing Web

CallMetricAI'ın ana marketing sitesi. Bu site, ürün bilgileri, fiyatlandırma ve genel bilgileri içerir.

## Geliştirme

```bash
cd callmetricai
pnpm run dev
```

Web, `http://localhost:3000` adresinde çalışacaktır.

## Özellikler

- ✅ Modern ve responsive tasarım
- ✅ Hero section
- ✅ Ürün showcase
- ✅ Fiyatlandırma
- ✅ FAQ
- ✅ Header navigation
- ✅ Footer
- ✅ Giriş/Kayıt butonları (app.callmetricai.com'a yönlendirir)

## Deployment

Production: `https://callmetricai.com`

Vercel üzerinde deploy edilir. Detaylı bilgi için root dizindeki `DEPLOYMENT.md` dosyasına bakın.

## Environment Variables

`.env.local` dosyası oluşturun:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

Production için Vercel üzerinde ayarlayın:

```bash
NEXT_PUBLIC_API_URL=https://api.callmetricai.com
NEXT_PUBLIC_APP_URL=https://app.callmetricai.com
```
