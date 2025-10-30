# Hakkımızda Sayfası - Kullanım Kılavuzu

## 📋 Genel Bakış

CallMetric AI için tamamen yeni, production-ready "Hakkımızda" sayfası başarıyla oluşturuldu. Sayfa, Observe.ai tarzında modern, temiz ve erişilebilir bir tasarıma sahiptir.

## 🎨 Oluşturulan Dosyalar

### Komponentler (`src/components/about/`)
- **AboutHero.tsx** - Hero section (büyük başlık + orbit görseli + CTA)
- **AboutIntro.tsx** - "Biz Kimiz" bölümü
- **AboutTwoCol.tsx** - Yeniden kullanılabilir 2 kolonlu section (Vizyon, Misyon, Hikaye, Yolculuk)
- **AboutValues.tsx** - 5 değer kartı (responsive grid)
- **AboutStats.tsx** - 3 istatistik kartı
- **AboutCTA.tsx** - Alt CTA bölümü
- **index.ts** - Tüm komponentleri export eden barrel file

### Sayfa
- **`src/app/hakkimizda/page.tsx`** - Ana Hakkımızda sayfası
  - Tam SEO meta tags
  - Open Graph desteği
  - Twitter Card desteği
  - Tüm içerik Türkçe ve kelimesi kelimesine kullanıldı

### Stil Güncellemeleri
- **tailwind.config.js** - Marka renkleri ve animasyonlar eklendi
- **globals.css** - CSS değişkenleri ve prefers-reduced-motion desteği

### Navigasyon
- **Header.tsx** - `/hakkimizda` rotası eklendi

## 🎨 Marka Renkleri

Tailwind ve CSS değişkenleri olarak kullanılabilir:

```css
--brand-navy: #0B1B3A (dark blue)
--brand-orange: #FF7A1A (orange)
--brand-turquoise: #1EB8B2 (turquoise)
```

Tailwind'de:
```jsx
className="bg-brand-navy text-brand-orange border-brand-turquoise"
```

## 🚀 Kullanım

### Sayfayı Ziyaret Etme
```
http://localhost:3000/hakkimizda
```

### Hero Görselini Ekleme

1. Ekip fotoğrafınızı `public/about/hero-image.jpg` olarak kaydedin
2. `AboutHero.tsx` dosyasındaki yorum satırlarını açın:

```tsx
import Image from "next/image";

// Placeholder div'i kaldırın ve yerine:
<Image 
  src="/about/hero-image.jpg" 
  alt="CallMetric AI Team"
  width={320}
  height={320}
  className="object-cover"
/>
```

### İstatistikleri Özelleştirme

`AboutStats` komponentine custom prop'lar gönderin:

```tsx
<AboutStats 
  stats={[
    { value: "$213M", label: "Series D Funding", accent: "turquoise" },
    { value: "500+", label: "Müşteri", accent: "orange" },
    { value: "99.9%", label: "Uptime", accent: "navy" }
  ]} 
/>
```

### Komponent Renk Varyantları

`AboutTwoCol` bileşeni 3 accent rengi destekler:
```tsx
<AboutTwoCol title="Başlık" accent="turquoise" paragraphs={[...]} />
<AboutTwoCol title="Başlık" accent="orange" paragraphs={[...]} />
<AboutTwoCol title="Başlık" accent="navy" paragraphs={[...]} />
```

## ♿ Erişilebilirlik Özellikleri

✅ Semantic HTML (`<main>`, `<section>`, proper heading hierarchy)  
✅ Keyboard navigation (focus rings on all interactive elements)  
✅ ARIA labels on CTAs  
✅ Alt text on images  
✅ 4.5:1 minimum contrast ratio  
✅ `prefers-reduced-motion` desteği  

## 📱 Responsive Breakpoints

- **360px** - Küçük mobil cihazlar
- **768px** - Tablet (hero stack, grid 2→1)
- **1024px** - Desktop (full layout)
- **1280px+** - Geniş ekranlar

## 🎭 Animasyonlar

- **Fade-in on scroll** - Her section görünümde belirdiğinde
- **Floating dots** - Hero orbit aksan noktaları
- **Hover effects** - Değer kartları, butonlar
- **Reduced motion** - Otomatik devre dışı bırakılır

## 🧪 Test Checklist

- [ ] `/hakkimizda` rotası çalışıyor
- [ ] Header'da "Hakkımızda" aktif olarak işaretleniyor
- [ ] Tüm Türkçe içerik doğru görünüyor
- [ ] Mobil (360px) responsive çalışıyor
- [ ] Tablet (768px) responsive çalışıyor
- [ ] Desktop (1280px+) responsive çalışıyor
- [ ] "İletişime Geç" butonları smooth scroll yapıyor
- [ ] Hover efektleri çalışıyor
- [ ] Console'da hata yok
- [ ] Lighthouse scores: Accessibility ≥95, SEO ≥90

## 🎨 Tasarım Sistemi Notları

1. **Spacing**: Tutarlı py-20/py-28 kullanımı
2. **Typography**: 
   - H1: text-5xl → text-7xl
   - H2: text-4xl → text-5xl
   - Body: text-lg, leading-relaxed
3. **Shadows**: subtle (shadow-sm, shadow-lg, shadow-xl)
4. **Borders**: border-gray-100 ile ince ayırıcılar
5. **Backgrounds**: white ↔ gray-50 alternating

## 🔧 Özelleştirme İpuçları

### Liderlik/Ekip Grid'i Eklemek

Gelecekte ekip üyelerini göstermek için `AboutPeopleGrid.tsx` oluşturabilirsiniz:

```tsx
interface TeamMember {
  name: string;
  title: string;
  image: string;
}

const team: TeamMember[] = [
  { name: "İsim Soyisim", title: "CEO", image: "/about/team/ceo.jpg" },
  // ...
];
```

### CTA Linklerini Değiştirme

`AboutCTA.tsx` ve `AboutHero.tsx` içindeki `/demo` linklerini kendi contact formunuza yönlendirin.

## 📞 Destek

Herhangi bir sorunuz varsa veya özelleştirme gerekiyorsa, bu dosyayı referans alarak komponentleri güncelleyebilirsiniz.

---

**✨ Sayfa hazır! Development sunucusunu çalıştırın ve `/hakkimizda` adresini ziyaret edin.**

