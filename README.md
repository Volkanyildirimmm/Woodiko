# Woodiko — Ankara Özel Tasarım Mobilya Web Sitesi

Lead generation odaklı kurumsal web sitesi. Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion.

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

## Environment Variables

`.env.example` dosyasını kopyalayın:

```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyin:

| Değişken | Açıklama |
|----------|----------|
| `RESEND_API_KEY` | [resend.com](https://resend.com) üzerinden alınan API key |
| `FROM_EMAIL` | Gönderici e-posta adresi (Resend'de doğrulanmış domain) |
| `TO_EMAIL` | Teklif ve iletişim formlarının iletileceği e-posta |
| `NEXT_PUBLIC_SITE_URL` | Production URL (örn. `https://woodiko.com.tr`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp numarası (`+905xxxxxxxxx` formatında) |

## Build

```bash
npm run build
npm run start
```

## Vercel Deployment

1. [vercel.com](https://vercel.com) üzerinde yeni proje oluşturun
2. GitHub repo'nuzu bağlayın
3. Environment variables'ları Vercel Dashboard'a ekleyin
4. Deploy

Vercel otomatik olarak `next build` çalıştırır ve deploy eder.

## Proje Yapısı

```
woodiko/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (Header, Footer)
│   ├── page.tsx            # Anasayfa
│   ├── hizmetler/          # Hizmet sayfaları
│   ├── galeri/             # Galeri
│   ├── hakkimizda/         # Hakkımızda
│   ├── blog/               # Blog
│   ├── teklif-al/          # Teklif formu (kritik)
│   ├── iletisim/           # İletişim
│   ├── api/                # API routes (email)
│   ├── sitemap.ts          # Dinamik sitemap
│   └── robots.ts           # robots.txt
├── components/
│   ├── layout/             # Header, Footer, MobileNav
│   ├── home/               # Anasayfa bölümleri
│   ├── forms/              # QuoteForm, ContactForm
│   └── shared/             # AnimatedSection
├── lib/
│   ├── constants.ts        # Tüm sabit veriler
│   ├── seo.ts              # SEO yardımcıları
│   └── utils.ts            # Yardımcı fonksiyonlar
└── styles/
    └── globals.css         # Global stiller
```

## Gerçek Görseller Eklemek

`lib/constants.ts` dosyasındaki Unsplash URL'lerini kendi fotoğraflarınızla değiştirin. Görselleri `/public/images/` klasörüne koyun ve `next/image` ile kullanın.

## E-posta Entegrasyonu

Resend API key'i eklendiğinde form gönderimlerinde e-posta otomatik olarak çalışır. API key olmadan form başarıyla gönderilir ancak e-posta iletilmez (sessiz başarı).
