# Woodiko — Claude Code Master Prompt

## PROJE BRIEF

Ankara merkezli, butik mobilya üreticisi için lead generation odaklı bir kurumsal web sitesi inşa edeceksin. Site adı **Woodiko**. Hedef: Ankara ve çevresinde mutfak dolabı, yatak odası, gardırop, banyo dolabı yaptırmak isteyen orta-üst gelir grubu müşterileri yakalamak ve teklif formu üzerinden lead'e dönüştürmek.

**Hedef kitle:** 28-55 yaş, Yaşamkent / Çayyolu / Ümitköy / Bağlıca / İncek gibi semtlerde yeni daire alan, kaliteli ve özel tasarım mobilya arayan aileler.

**Marka tonu:** Premium ama erişilebilir. Doğal, sıcak, zanaatkâr hissi veren. Aşırı lüks değil — güvenilir ustalık vurgusu.

---

## TEKNİK STACK (DEĞİŞTİRME)

```
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Framer Motion (animasyonlar için zorunlu)
- shadcn/ui (komponent kütüphanesi)
- Lucide React (ikonlar)
- next/font (Inter + Playfair Display)
- next/image (tüm görseller için)
- React Hook Form + Zod (form validasyonu)
- Resend veya Nodemailer (form mail gönderimi)
- Vercel deployment hedefi
```

**Performans hedefi:** Lighthouse skorları 95+ olmalı. Core Web Vitals yeşil. SSR/SSG kullan, CSR'a kaçma.

---

## RENK PALETİ VE TİPOGRAFİ

```css
:root {
  --wood-dark: #2C1810;      /* Koyu ahşap, ana metin */
  --wood-medium: #5C3A21;    /* Orta ton, accent */
  --cream: #F5F0E8;          /* Arka plan, krem */
  --cream-light: #FAF7F2;    /* Açık krem */
  --gold: #C9A84C;           /* CTA, vurgu */
  --gold-dark: #A8862F;      /* Hover state */
  --charcoal: #1A1410;       /* Footer, koyu alanlar */
  --white: #FFFFFF;
}
```

**Fontlar:**
- Başlıklar: **Playfair Display** (serif, zarif, mobilya hissi)
- Gövde: **Inter** (modern, okunabilir)

---

## SAYFA YAPISI

### 1. Anasayfa (`/`)
- **Hero section:** Tam ekran video veya yüksek kaliteli görsel, üstünde Framer Motion ile typewriter veya fade-in başlık. CTA: "Ücretsiz Keşif Randevusu Al"
- **Hizmetler grid'i:** 4 kart — Mutfak Dolabı, Yatak Odası, Gardırop, Banyo Dolabı. Hover'da Framer Motion ile yumuşak scale + shadow.
- **Süreç bölümü:** 4 adım — Keşif → Tasarım → Üretim → Montaj. Scroll-triggered animasyon.
- **Galeri preview:** Son 6 proje, masonry layout, lightbox açılır.
- **Müşteri yorumları:** Carousel, Framer Motion ile auto-slide.
- **Neden Woodiko?** Bullet'lar — 1. sınıf malzeme, 10 yıl garanti, ücretsiz keşif, kişiye özel tasarım.
- **Sıkça Sorulan Sorular:** Accordion, 6-8 soru.
- **CTA bandı:** "Mutfağınızın hayalini gerçeğe dönüştürelim" + Form linki.

### 2. Hizmetler (`/hizmetler/[slug]`)
Her hizmet için ayrı sayfa:
- `/hizmetler/mutfak-dolabi`
- `/hizmetler/yatak-odasi`
- `/hizmetler/gardirop`
- `/hizmetler/banyo-dolabi`
- `/hizmetler/tv-unitesi`
- `/hizmetler/giyinme-odasi`

Her sayfa: Detaylı açıklama, malzeme seçenekleri, fiyatlandırma mantığı (metrekare bazında), galeri, SSS, teklif formu CTA.

### 3. Galeri (`/galeri`)
- Filtre: Hizmet türü, semt, stil (Modern, Klasik, Country, Minimalist)
- Masonry grid, Framer Motion layout animations
- Lightbox: önceki/sonraki, swipe destekli

### 4. Hakkımızda (`/hakkimizda`)
- Atölye hikayesi, ekip, değerler
- Atölyeden gerçek fotoğraflar
- Sayılar: X yıl deneyim, X tamamlanan proje, X mutlu müşteri

### 5. Blog (`/blog` ve `/blog/[slug]`)
- SEO odaklı, MDX tabanlı
- Kategoriler: Mutfak, Yatak Odası, Bakım, İlham, Fiyat Rehberi
- Her makale: TOC, okuma süresi, paylaş butonları, ilgili yazılar
- Schema.org Article markup zorunlu

### 6. Teklif Al (`/teklif-al`)
**EN KRİTİK SAYFA.** Multi-step form:
- Adım 1: Hangi mobilya? (Mutfak / Yatak Odası / vs)
- Adım 2: Yaklaşık metrekare? (slider 1-30 m²)
- Adım 3: Bütçe aralığı? (100-200K, 200-350K, 350K+)
- Adım 4: Semt + iletişim bilgileri
- Adım 5: İsteğe bağlı görsel/plan yükleme
- Submit: Email gönder + WhatsApp linki + "24 saat içinde dönüş" mesajı

Framer Motion ile adımlar arası geçiş animasyonu.

### 7. İletişim (`/iletisim`)
- Adres, telefon, WhatsApp, email
- Google Maps embed
- Çalışma saatleri
- Hızlı iletişim formu

---

## SEO GEREKSİNİMLERİ (ÇOK ÖNEMLİ)

1. **Metadata API:** Her sayfada `generateMetadata` kullan. Title, description, OG image, Twitter card.
2. **Schema.org:** LocalBusiness, Service, Article, FAQ, BreadcrumbList markup'ları ekle.
3. **Sitemap:** `app/sitemap.ts` ile dinamik sitemap.
4. **Robots:** `app/robots.ts` ile robots.txt.
5. **Slug yapısı:** Türkçe karakterler dönüştürülmüş, kısa, anahtar kelime içeren.
6. **Internal linking:** Blog yazılarından hizmet sayfalarına bolca iç bağlantı.
7. **Image alt:** Tüm görsellerde anlamlı, anahtar kelime içeren alt text.
8. **Canonical URL'ler:** Her sayfada.
9. **hreflang:** `tr-TR` olarak ayarla.

**Hedef anahtar kelimeler (homepage için):**
- "ankara mutfak dolabı"
- "ankara özel tasarım mobilya"
- "yaşamkent mutfak dolabı"
- "çayyolu mobilya"

---

## FRAMER MOTION KULLANIMI

- **Sayfa geçişleri:** `AnimatePresence` ile fade + slight Y movement
- **Scroll animasyonları:** `whileInView` + `viewport={{ once: true }}` (performans için)
- **Hover efektleri:** Kartlarda yumuşak scale (1.02-1.03 arası), shadow artışı
- **Stagger animasyonları:** Liste/grid girişlerinde
- **Hero animasyonu:** Başlık fade + slide, alt metin gecikmeli, CTA buton son
- **Aşırıya KAÇMA:** Her şeyi animasyonlu yapma. Sade ve premium hissettirsin.

---

## RESPONSIVE TASARIM

- Mobile-first yaklaşım
- Breakpoints: sm (640), md (768), lg (1024), xl (1280)
- Mobilde hamburger menü, slide-in drawer
- Form mobilde tek sütun, desktop'ta düzenli grid
- Galeride mobilde 1 sütun, tablet 2, desktop 3-4

---

## DOSYA YAPISI

```
woodiko/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Anasayfa
│   ├── hizmetler/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── galeri/page.tsx
│   ├── hakkimizda/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── teklif-al/page.tsx
│   ├── iletisim/page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                         # shadcn komponentleri
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── Gallery.tsx
│   │   ├── Testimonials.tsx
│   │   └── FAQ.tsx
│   ├── forms/
│   │   └── QuoteForm.tsx
│   └── shared/
│       ├── AnimatedSection.tsx
│       └── SEO.tsx
├── lib/
│   ├── utils.ts
│   ├── seo.ts
│   └── constants.ts
├── content/
│   ├── services/
│   ├── blog/
│   └── projects/
├── public/
│   ├── images/
│   └── og/
└── styles/
    └── globals.css
```

---

## TESLİMAT KRİTERLERİ

1. Site Vercel'e deploy edilmeye hazır olacak
2. `npm run build` hatasız geçecek
3. Lighthouse: Performance 95+, SEO 100, Accessibility 95+
4. Tüm formlar çalışır durumda (mock email entegrasyonu yeterli, ben Resend API key'i sonra eklerim)
5. Mobil ve desktop'ta kusursuz görünüm
6. README.md dosyasında: Setup, environment variables, deployment talimatları
7. `.env.example` dosyası
8. Placeholder görseller (Unsplash linkleri ile) — gerçek fotoğraflar sonra eklenecek

---

## BAŞLANGIÇ ADIMLARI

1. Önce proje yapısını kur, package.json'u ayarla
2. Tailwind config'e renk paletini ve fontları ekle
3. Layout (Header + Footer) ile başla
4. Anasayfayı baştan sona bitir
5. Sonra diğer sayfalar
6. En son teklif formu (en kritik fonksiyonel parça)
7. SEO ve sitemap
8. README ve deployment hazırlığı

---

## ÖNEMLİ NOTLAR

- **Lorem ipsum kullanma.** Türkçe, gerçekçi placeholder içerik üret. Mobilya sektörüne uygun.
- **Aşırı animasyon yapma.** Premium markalar sadelikle anlatır.
- **Accessibility önemli.** ARIA label'lar, semantic HTML, keyboard navigation.
- **Loading states ekle.** Form submit, görsel yüklenmesi vs.
- **Error boundary** ekle.
- **404 sayfası** özel tasarımlı olsun.

Şimdi başla. Önce dosya yapısını kur, sonra adım adım ilerle. Her büyük adımda bana özet ver.
