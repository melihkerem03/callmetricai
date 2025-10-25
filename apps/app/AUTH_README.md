# Authentication Sistemi

Bu uygulama basit bir localStorage tabanlı authentication sistemi kullanıyor.

## Demo Giriş Bilgileri

```
E-posta: admin@mail.com
Şifre: 0
```

## Nasıl Çalışır?

### 1. Login Flow
- Kullanıcı `/auth/login` sayfasına giriş yapar
- Demo bilgileri (`admin@mail.com` / `0`) ile giriş yapılabilir
- Başarılı girişte:
  - `localStorage.setItem("isAuthenticated", "true")`
  - `localStorage.setItem("userEmail", email)`
  - `/dashboard` sayfasına yönlendirilir

### 2. Dashboard Protection
- `/dashboard` sayfası otomatik olarak authentication kontrolü yapar
- Eğer `isAuthenticated` !== "true" ise `/auth/login`'e yönlendirir
- Giriş yapmış kullanıcı adı header'da gösterilir

### 3. Logout Flow
- Dashboard'da "Çıkış Yap" butonuna tıklanır
- localStorage temizlenir:
  - `localStorage.removeItem("isAuthenticated")`
  - `localStorage.removeItem("userEmail")`
- `/auth/login` sayfasına yönlendirilir

## Dosyalar

### `/app/auth/login/page.tsx`
- Login formu
- Demo bilgileri görüntüleme
- Authentication kontrolü
- localStorage'a kaydetme
- Dashboard'a yönlendirme

### `/app/dashboard/page.tsx`
- Protected route (authentication gerektirir)
- useEffect ile authentication kontrolü
- Logout fonksiyonu
- Kullanıcı bilgilerini gösterme

## Test Etme

1. **Login Testi:**
```bash
# http://localhost:3001/auth/login adresine gidin
# E-posta: admin@mail.com
# Şifre: 0
# "Giriş Yap" butonuna tıklayın
```

2. **Dashboard Testi:**
```bash
# Başarılı girişten sonra otomatik olarak /dashboard'a yönlendirileceksiniz
# Header'da e-posta adresinizi göreceksiniz
```

3. **Logout Testi:**
```bash
# Dashboard'da "Çıkış Yap" butonuna tıklayın
# /auth/login sayfasına yönlendirileceksiniz
```

4. **Protection Testi:**
```bash
# Giriş yapmadan http://localhost:3001/dashboard adresine gitmeyi deneyin
# Otomatik olarak /auth/login'e yönlendirileceksiniz
```

## Gelecek Geliştirmeler

- [ ] JWT token tabanlı authentication
- [ ] Backend API entegrasyonu
- [ ] Refresh token mekanizması
- [ ] Remember me özelliği
- [ ] Session timeout
- [ ] Multiple user support
- [ ] Role-based access control (RBAC)
- [ ] Password reset flow
- [ ] Email verification

## Güvenlik Notları

⚠️ **ÖNEMLİ:** Bu, sadece demo amaçlı basit bir authentication sistemidir.

Production ortamında:
1. ✅ Backend API ile authentication yapılmalı
2. ✅ JWT token kullanılmalı
3. ✅ HTTPS kullanılmalı
4. ✅ Şifreler hash'lenmeli (bcrypt)
5. ✅ CSRF koruması olmalı
6. ✅ Rate limiting uygulanmalı
7. ✅ Session management yapılmalı
8. ❌ localStorage'da hassas bilgi saklanmamalı

