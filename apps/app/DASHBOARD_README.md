# Dashboard Yapısı

Modern, koyu tema kullanan dashboard yapısı oluşturuldu.

## 📁 Dosya Yapısı

```
src/
├── app/
│   ├── auth/                    # Authentication sayfaları
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── dashboard/page.tsx       # Ana dashboard (4 kart + grafik)
│   ├── profile/page.tsx         # Profil sayfası
│   ├── calls/page.tsx           # Görüşmeler listesi
│   ├── make-call/page.tsx       # Yeni görüşme
│   ├── analytics/page.tsx       # Analitik sayfası
│   ├── settings/page.tsx        # Ayarlar
│   ├── contact/page.tsx         # İletişim
│   └── page.tsx                 # Ana sayfa (auth kontrolü)
│
└── components/
    ├── Sidebar.tsx              # Sol sidebar menü
    └── DashboardLayout.tsx      # Dashboard wrapper (sidebar + topbar)
```

## 🎨 Tasarım

### Renk Paleti
- **Arka Plan**: `#0f1117` (Koyu gri)
- **Kartlar/Sidebar**: `#1a1d2e` (Orta koyu gri)
- **Kenarlıklar**: `#gray-800`
- **Primary**: Purple (`#9333ea`)
- **Metin**: White, Gray-300, Gray-400

### Sidebar Yapısı

**Ana Menü:**
1. Dashboard (Grid icon)
2. Profil (User icon)
3. Görüşmeler (Phone icon)
4. Görüşme Yap (Plus icon)
5. Analytics (Chart icon)

**Alt Menü:**
1. Ayarlar (Settings icon)
2. Contact us (Chat icon)

### Dashboard Kartları

1. **Total Amount** - Toplam tutar (Beyaz)
2. **Amount Deposit** - Yatırılan tutar (Yeşil)
3. **Amount Spent** - Harcanan tutar (Kırmızı)
4. **Expected Amount** - Beklenen tutar (Sarı)

## 🚀 Kullanım

### Giriş Yapma
```
E-posta: admin@mail.com
Şifre: 0
```

### Navigasyon
- Sol sidebar'dan sayfa değiştirin
- Aktif sayfa mor (purple) renkte gösterilir
- Üst bar'da arama ve çıkış butonu var

## 📱 Responsive

- Desktop: Tam sidebar + 4 kart grid
- Tablet: Tam sidebar + 2 kart grid
- Mobile: Collapsible sidebar + 1 kart grid

## 🔧 Özelleştirme

### Logo Değiştirme
`Sidebar.tsx` dosyasında "YOURLOGO" yazan yeri değiştirin:

```tsx
<h1 className="text-xl font-bold text-white">YOURLOGO</h1>
```

### Kart Verileri Değiştirme
`dashboard/page.tsx` dosyasındaki stat card'ları güncelleyin.

### Renk Değiştirme
Tailwind class'larını değiştirin:
- `bg-[#1a1d2e]` → Kart arka planı
- `bg-[#0f1117]` → Ana arka plan
- `bg-purple-600` → Aktif menü
- `text-gray-400` → İkincil metin

## 📄 Sayfalar

### ✅ Tamamlanan
- [x] Dashboard (4 kart + grafik alanı)
- [x] Authentication (Login/Signup/Forgot Password)
- [x] Sidebar navigasyon
- [x] Layout wrapper
- [x] Profil (placeholder)
- [x] Görüşmeler (placeholder)
- [x] Görüşme Yap (placeholder)
- [x] Analytics (placeholder)
- [x] Ayarlar (placeholder)
- [x] Contact (placeholder)

### 🔄 Geliştirilecek
- [ ] Gerçek grafik (Chart.js veya Recharts)
- [ ] API entegrasyonu
- [ ] Gerçek veri gösterimi
- [ ] Responsive sidebar toggle
- [ ] Profil sayfası içeriği
- [ ] Görüşme listesi tablosu
- [ ] Görüşme yapma formu
- [ ] Analytics grafikler
- [ ] Ayarlar formu
- [ ] İletişim formu

## 🎯 Sonraki Adımlar

1. **Grafik Entegrasyonu**: Chart.js veya Recharts ile gerçek grafik
2. **API Bağlantısı**: Backend'den veri çekme
3. **Tablo Komponenti**: Görüşmeler için data table
4. **Form Validasyonu**: Yeni görüşme formu
5. **Filtreleme**: Analytics için tarih ve kategori filtreleri

