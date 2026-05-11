# Woodiko — Görev Paketi #2

Bu görev paketi, woodiko.com sitesi üzerinde yapılacak kritik eklentileri ve düzeltmeleri içerir. Her bir görev birbirinden bağımsızdır ama hepsi aynı oturumda tamamlanmalıdır. Sırayla ilerle, her bölüm bittiğinde özet ver.

---

## 1. OPEN GRAPH GÖRSELİ OLUŞTUR

**Sorun:** `https://woodiko.com/og/default.jpg` adresi 404 dönüyor. WhatsApp, Facebook, Twitter, LinkedIn'de site linki paylaşıldığında önizleme görseli çıkmıyor.

**Yapılacak:**

`public/og/default.jpg` dosyasını oluştur. Tasarım gereksinimleri:

- Boyut: tam olarak 1200x630 piksel (Open Graph standardı)
- Arka plan: Koyu ahşap tonu (#2C1810) veya krem (#F5F0E8) — birini seç
- Üzerine:
  - Woodiko logosu (eğer SVG/PNG olarak `public/logo.svg` veya benzeri yerde varsa kullan, yoksa "W WOODIKO" metin olarak)
  - Alt başlık: "Ankara'nın Özel Mobilya Ustası"
  - Sağ alt köşede küçük metin: "woodiko.com"
  - Üst kısımda veya sağda altın aksan renk (#C9A84C) bir çizgi/şekil
- Tipografi: Playfair Display (başlık için), Inter (alt yazı için)

Bu görseli oluşturmak için iki seçeneğin var:

**A) HTML + Puppeteer ile screenshot al:**
- `scripts/generate-og.js` adında bir Node script oluştur
- Bu script HTML template'i render edip 1200x630 PNG çıkartsın
- Çıktıyı `public/og/default.jpg` olarak kaydet
- `package.json`'a `"generate:og": "node scripts/generate-og.js"` ekle

**B) Direkt SVG çiz, sonra JPG'ye dönüştür:**
- 1200x630 SVG oluştur
- Sharp veya benzeri kütüphaneyle JPG'ye export et
- Aynı yere kaydet

İkincisi daha temiz. Sharp zaten Next.js'le geliyor, ek kurulum gerekmez.

**Ek olarak her servis için ayrı OG görseli oluştur:**

`public/og/` klasörüne şu dosyalar gelsin (hepsi 1200x630):
- `default.jpg` — Ana sayfa için, genel marka
- `mutfak-dolabi.jpg` — "Mutfak Dolabı | Woodiko"
- `yatak-odasi.jpg` — "Yatak Odası | Woodiko"
- `gardirop.jpg` — "Gardırop | Woodiko"
- `banyo-dolabi.jpg` — "Banyo Dolabı | Woodiko"
- `tv-unitesi.jpg` — "TV Ünitesi | Woodiko"
- `giyinme-odasi.jpg` — "Giyinme Odası | Woodiko"
- `blog.jpg` — "Mobilya Rehberi | Woodiko Blog"

İlgili sayfaların `generateMetadata` fonksiyonlarında her sayfa kendi OG görselini referans alsın.

---

## 2. KVKK AYDINLATMA METNİ SAYFASI

**Sorun:** Site kişisel veri topluyor (teklif formu, iletişim formu) ama KVKK aydınlatma metni yok. Bu yasal zorunluluk, ihlali ciddi cezaya yol açar.

**Yapılacak:**

**A) Sayfa oluştur:**

Yeni route: `app/kvkk-aydinlatma-metni/page.tsx`

İçerik (Türkçe, profesyonel ton, hukuki dil):

```
# KVKK Aydınlatma Metni

## 1. Veri Sorumlusu

Yıldırım Mobilya (Woodiko markası altında faaliyet göstermektedir)
Adres: Şenyüz Sk. No:6/1 Siteler, Altındağ / Ankara
E-posta: info@woodiko.com
Telefon: +90 507 734 75 21

## 2. İşlenen Kişisel Veriler

woodiko.com web sitesini ziyaret ettiğinizde ve hizmetlerimizden faydalanmak için bizimle iletişime geçtiğinizde aşağıdaki kişisel verileriniz işlenmektedir:

- Kimlik Verileri: Ad, soyad
- İletişim Verileri: Telefon numarası, e-posta adresi, adres bilgisi
- Müşteri Bilgileri: Talep edilen hizmet türü, proje detayları, mekan ölçüleri
- İşlem Güvenliği Verileri: IP adresi, çerez bilgileri, tarayıcı bilgileri

## 3. Kişisel Verilerin İşlenme Amaçları

- Teklif hazırlanması ve sunulması
- Ücretsiz keşif randevusu organizasyonu
- Sözleşmesel yükümlülüklerin yerine getirilmesi
- Müşteri memnuniyetinin sağlanması ve geliştirilmesi
- Yasal yükümlülüklerin yerine getirilmesi
- İletişim faaliyetlerinin yürütülmesi

## 4. Kişisel Verilerin Aktarılması

Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi kapsamında, gerekli olduğu durumlarda iş ortaklarımıza, tedarikçilerimize ve yasal yükümlülüklerimiz çerçevesinde yetkili kamu kurum ve kuruluşlarına aktarılabilmektedir.

## 5. Kişisel Veri Toplama Yöntemi ve Hukuki Sebebi

Kişisel verileriniz; web sitemizdeki formlar, e-posta, telefon ve fiziki iletişim yöntemleri aracılığıyla toplanmaktadır. Hukuki sebepleri:

- Kanunlarda açıkça öngörülmesi (KVKK m.5/2-a)
- Bir sözleşmenin kurulması veya ifası (KVKK m.5/2-c)
- Veri sorumlusunun meşru menfaati (KVKK m.5/2-f)
- Açık rıza (KVKK m.5/1)

## 6. Kişisel Veri Sahibi Olarak Haklarınız

KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:

- Kişisel verilerinizin işlenip işlenmediğini öğrenme
- İşlenmişse buna ilişkin bilgi talep etme
- İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme
- Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme
- Eksik veya yanlış işlenmesi hâlinde düzeltilmesini isteme
- Silinmesini veya yok edilmesini isteme
- İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme
- Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme

Haklarınızı kullanmak için info@woodiko.com adresine yazılı başvuru yapabilirsiniz.

## 7. Saklama Süresi

Kişisel verileriniz, ilgili mevzuatta öngörülen süreler ve işleme amacının gerekli kıldığı süre boyunca saklanır. Sürelerin sona ermesiyle birlikte silinir, yok edilir veya anonim hale getirilir.

## 8. Değişiklikler

İşbu Aydınlatma Metni gerektiğinde güncellenebilir. Güncel sürüm her zaman bu sayfada yayınlanır.

Son güncelleme: [Bugünün tarihi]
```

**B) Footer'a bağlantı ekle:**

Mevcut footer'da "Gizlilik Politikası" ve "Kullanım Koşulları" linklerinin yanına **"KVKK Aydınlatma Metni"** linki ekle.

**C) Teklif formuna onay kutusu ekle:**

`app/teklif-al/page.tsx` formuna, gönder butonunun hemen üstüne zorunlu bir checkbox ekle:

```
☐ KVKK kapsamında kişisel verilerimin işlenmesine ve <a href="/kvkk-aydinlatma-metni">Aydınlatma Metni</a>'nde belirtilen şekilde kullanılmasına onay veriyorum.
```

Checkbox işaretlenmeden form gönderilemesin (validation).

---

## 3. ÇEREZ BANNER (COOKIE CONSENT)

**Sorun:** Site çerez kullanıyor (en azından Next.js varsayılan + analytics yakında geliyor) ama kullanıcı bilgilendirmesi ve onayı yok. KVKK ve GDPR kapsamında zorunlu.

**Yapılacak:**

**A) Cookie banner componenti oluştur:**

`components/CookieConsent.tsx` dosyası:

- Site açıldığında ekranın altında ince bir banner çıksın (max yükseklik 120px desktop, 180px mobile)
- Arka plan: Koyu (#1A1410), metin: krem (#F5F0E8)
- İçerik:
  ```
  Bu web sitesinde deneyiminizi iyileştirmek, site trafiğini analiz etmek ve 
  pazarlama faaliyetlerimizi yürütmek için çerezler kullanıyoruz. 
  "Tümünü Kabul Et"e tıklayarak tüm çerezlerin kullanımına onay vermiş olursunuz. 
  Detaylı bilgi için Çerez Politikamızı inceleyebilirsiniz.
  ```
- 3 buton:
  - **Tümünü Kabul Et** (altın #C9A84C, primary)
  - **Sadece Gerekli** (transparent border, secondary)
  - **Ayarları Düzenle** (link tarzı, modal açar)

**B) Çerez tercihi modali:**

"Ayarları Düzenle" tıklanınca açılan modal:
- **Zorunlu Çerezler** (toggle kapalı, değiştirilemez) — Site fonksiyonu için gerekli
- **Analitik Çerezler** (toggle açık/kapalı) — Google Analytics
- **Pazarlama Çerezleri** (toggle açık/kapalı) — Meta Pixel, Google Ads conversion

Kullanıcı seçimi `localStorage`'a kaydedilsin:
```js
localStorage.setItem('woodiko-cookie-consent', JSON.stringify({
  necessary: true,
  analytics: true|false,
  marketing: true|false,
  timestamp: Date.now()
}))
```

**C) Çerez Politikası sayfası oluştur:**

Yeni route: `app/cerez-politikasi/page.tsx`

İçerik:

```
# Çerez Politikası

## Çerez Nedir?

Çerezler, web sitelerini ziyaret ettiğinizde tarayıcınıza küçük metin dosyaları olarak kaydedilen verilerdir. Web sitesinin işlevselliğini sağlamak, kullanıcı deneyimini iyileştirmek ve analitik veri toplamak için kullanılırlar.

## Kullandığımız Çerez Türleri

### 1. Zorunlu Çerezler
Sitenin temel işlevlerinin çalışması için gereklidir. Devre dışı bırakılamazlar.
- Oturum çerezleri
- Güvenlik çerezleri
- Form gönderim çerezleri

### 2. Analitik Çerezler
Ziyaretçi davranışlarını anonim olarak analiz etmemizi sağlar.
- Google Analytics 4 (_ga, _gid)
- Hangi sayfaların ziyaret edildiği
- Sitede geçirilen süre
- Trafik kaynakları

### 3. Pazarlama Çerezleri
Size ilgi alanlarınıza göre özelleştirilmiş içerik ve reklamlar sunmamızı sağlar.
- Meta Pixel (_fbp, _fbc)
- Google Ads conversion takibi
- Yeniden pazarlama (remarketing) çerezleri

## Çerez Tercihlerinizi Nasıl Yönetebilirsiniz?

- Site içindeki "Çerez Ayarları" butonu ile dilediğiniz an tercihlerinizi güncelleyebilirsiniz
- Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz
- Üçüncü taraf çerezleri için ilgili platformların opt-out araçlarını kullanabilirsiniz

## Tarayıcı Bazlı Çerez Yönetimi

- **Chrome:** Ayarlar > Gizlilik ve güvenlik > Çerezler ve diğer site verileri
- **Firefox:** Ayarlar > Gizlilik ve Güvenlik > Çerezler ve Site Verileri  
- **Safari:** Tercihler > Gizlilik > Çerezler ve web sitesi verileri
- **Edge:** Ayarlar > Çerezler ve site izinleri

Son güncelleme: [Bugünün tarihi]
```

**D) Footer'a "Çerez Ayarları" butonu ekle:**

Banner kapatıldıktan sonra kullanıcının tercihlerini güncellemesi için footer'da küçük bir buton/link olsun.

---

## 4. STICKY WHATSAPP BUTONU

**Sorun:** WhatsApp linkine ulaşmak için footer'a kadar inmek gerekiyor. Mobilde özellikle dönüşüm kaybı.

**Yapılacak:**

`components/StickyWhatsApp.tsx` componenti oluştur ve `app/layout.tsx`'e ekle (cookie banner gibi tüm sayfalarda görünsün).

**Tasarım:**
- Pozisyon: `fixed`, sağ alt köşe
- Mobile: bottom: 20px, right: 20px, boyut: 56x56px
- Desktop: bottom: 30px, right: 30px, boyut: 64x64px
- Arka plan: WhatsApp yeşili (#25D366)
- İçinde: Beyaz WhatsApp ikonu (lucide-react'ten MessageCircle veya phosphor-icons'tan WhatsappLogo)
- Box-shadow: 0 4px 12px rgba(0,0,0,0.15)
- Hover'da: scale(1.1) Framer Motion animasyonu
- z-index: 50 (cookie banner'dan düşük)

**Davranış:**
- Tıklanınca direkt WhatsApp'a yönlendirsin:
  ```
  https://wa.me/905077347521?text=Merhaba%2C%20mobilya%20teklifi%20almak%20istiyorum.
  ```
- 3 saniye sonra **küçük bir tooltip** çıksın (1 kez, localStorage ile takip et):
  > "👋 Merhaba! Hızlı cevap için WhatsApp"
- Tooltip 5 saniye sonra kaybolsun veya tıklanınca kapansın

**Çerez banner görünürken gizle:**
Banner görünürse z-index çakışmasın diye sticky WhatsApp `bottom-24` veya benzeri offset ile yukarı kaysın. Banner kapanınca normal pozisyona dönsün.

**Pulse animasyonu:**
Dikkat çekmesi için hafif bir pulse (nabız) efekti ekle, Framer Motion ile:
```
animate={{ scale: [1, 1.05, 1] }}
transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
```
Çok abartılı olmasın, hafif olsun.

---

## 5. META PIXEL + CONVERSION API (CAPI) ENTEGRASYONU

**Sorun:** Meta reklamlarına çıkacağız ama dönüşüm takibi yok. Pixel olmadan Meta optimizasyon yapamaz, paramızı boşa harcarız. CAPI olmadan iOS kullanıcıları yarı görünür.

**Yapılacak:**

### A) Meta Pixel client-side kurulumu

**Environment variable ekle:**

`.env.example` dosyasına şunları ekle:

```
NEXT_PUBLIC_META_PIXEL_ID=
META_CAPI_ACCESS_TOKEN=
META_CAPI_TEST_EVENT_CODE=
```

(Bu değerleri ben sonra Meta Business Manager'dan alıp ekleyeceğim.)

**Pixel component'i oluştur:**

`components/MetaPixel.tsx`:

```typescript
"use client";
import Script from "next/script";

export default function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  
  if (!pixelId) return null;
  
  // Çerez onayı kontrolü
  if (typeof window !== "undefined") {
    const consent = localStorage.getItem("woodiko-cookie-consent");
    if (consent) {
      const parsed = JSON.parse(consent);
      if (!parsed.marketing) return null;
    } else {
      return null; // Onay yoksa pixel yükleme
    }
  }
  
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
```

`app/layout.tsx`'e ekle (body tag'i içine).

### B) Custom event tracking utility

`lib/meta-events.ts` dosyası oluştur:

```typescript
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  // Client-side pixel event
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
  
  // Server-side CAPI event
  fetch("/api/meta-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      params,
      eventTime: Math.floor(Date.now() / 1000),
      eventSourceUrl: window.location.href,
      userAgent: navigator.userAgent,
    }),
  }).catch(() => {}); // Sessiz fail
};

// Hazır eventler
export const trackLead = (params: { 
  service?: string; 
  district?: string; 
  budget?: string; 
}) => trackEvent("Lead", params);

export const trackContact = () => trackEvent("Contact");

export const trackViewContent = (params: { 
  contentName?: string; 
  contentCategory?: string; 
}) => trackEvent("ViewContent", params);
```

### C) Conversion API (Server-side) endpoint

`app/api/meta-capi/route.ts` dosyası oluştur:

```typescript
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const TEST_CODE = process.env.META_CAPI_TEST_EVENT_CODE;

const hashSHA256 = (value: string) =>
  crypto.createHash("sha256").update(value.toLowerCase().trim()).digest("hex");

export async function POST(req: NextRequest) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }
  
  try {
    const body = await req.json();
    const { eventName, params, eventTime, eventSourceUrl, userAgent } = body;
    
    // IP adresini al
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.headers.get("x-real-ip");
    
    // Click ID ve Browser ID cookie'lerden al
    const fbc = req.cookies.get("_fbc")?.value;
    const fbp = req.cookies.get("_fbp")?.value;
    
    const eventData = {
      data: [
        {
          event_name: eventName,
          event_time: eventTime,
          event_source_url: eventSourceUrl,
          action_source: "website",
          user_data: {
            client_ip_address: ip,
            client_user_agent: userAgent,
            fbc,
            fbp,
            // Eğer kullanıcı email/telefon verirse hash'lenmiş olarak eklenebilir
            ...(params?.email && { em: [hashSHA256(params.email)] }),
            ...(params?.phone && { ph: [hashSHA256(params.phone)] }),
          },
          custom_data: params,
        },
      ],
      ...(TEST_CODE && { test_event_code: TEST_CODE }),
    };
    
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      }
    );
    
    const result = await response.json();
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("CAPI error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
```

### D) Eventleri ilgili yerlerde tetikle

**Teklif formu gönderimi (`app/teklif-al/page.tsx`):**
Form başarıyla gönderildikten sonra:
```typescript
import { trackLead } from "@/lib/meta-events";

// Form submit success callback
trackLead({
  service: formData.service,
  district: formData.district,
  budget: formData.budget,
});
```

**WhatsApp butonuna tıklama (sticky button ve diğer tüm WhatsApp linklerinde):**
```typescript
import { trackContact } from "@/lib/meta-events";

onClick={() => trackContact()}
```

**Hizmet sayfalarına giriş (`app/hizmetler/[slug]/page.tsx`):**
```typescript
import { trackViewContent } from "@/lib/meta-events";

useEffect(() => {
  trackViewContent({
    contentName: serviceName,
    contentCategory: "hizmet"
  });
}, [serviceName]);
```

---

## 6. GOOGLE ANALYTICS 4 ENTEGRASYONU

**Yapılacak:**

`.env.example`'a ekle:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

`components/GoogleAnalytics.tsx`:

```typescript
"use client";
import Script from "next/script";

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  if (!gaId) return null;
  
  // Çerez onayı kontrolü
  if (typeof window !== "undefined") {
    const consent = localStorage.getItem("woodiko-cookie-consent");
    if (consent) {
      const parsed = JSON.parse(consent);
      if (!parsed.analytics) return null;
    } else {
      return null;
    }
  }
  
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
```

`app/layout.tsx`'e ekle.

### Custom event'leri GA4'e de gönder

`lib/ga-events.ts`:

```typescript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const gaTrack = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};

export const gaTrackLead = (params: any) => 
  gaTrack("generate_lead", { ...params, currency: "TRY" });

export const gaTrackContact = () => 
  gaTrack("contact", { method: "whatsapp" });
```

Meta event tetiklediğin her yerde GA event'i de tetikle (paralel).

---

## 7. GOOGLE ADS CONVERSION TRACKING (HAZIRLIK)

**Şimdilik kod hazır olsun, ID'leri sonra ekleyeceğim:**

`.env.example`:
```
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=
```

`lib/google-ads.ts`:

```typescript
export const trackGoogleAdsConversion = (
  conversionLabel?: string,
  value: number = 0
) => {
  if (typeof window === "undefined" || !window.gtag) return;
  
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = conversionLabel || process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  
  if (!adsId || !label) return;
  
  window.gtag("event", "conversion", {
    send_to: `${adsId}/${label}`,
    value,
    currency: "TRY",
  });
};
```

Form submit ve WhatsApp tıklamasında bu da çalışsın.

---

## 8. STRUCTURED DATA / SCHEMA.ORG

**Yapılacak:**

`components/schemas/LocalBusinessSchema.tsx`:

```typescript
export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "Woodiko - Yıldırım Mobilya",
    "alternateName": "Woodiko",
    "image": "https://woodiko.com/og/default.jpg",
    "logo": "https://woodiko.com/logo.png",
    "url": "https://woodiko.com",
    "telephone": "+905077347521",
    "email": "info@woodiko.com",
    "priceRange": "₺₺-₺₺₺",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Şenyüz Sk. No:6/1",
      "addressLocality": "Siteler, Altındağ",
      "addressRegion": "Ankara",
      "postalCode": "06160",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.9598",
      "longitude": "32.8919"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:30"
      }
    ],
    "sameAs": [
      "https://instagram.com/woodikomobilya"
    ],
    "areaServed": [
      { "@type": "City", "name": "Ankara" },
      { "@type": "Place", "name": "Yaşamkent" },
      { "@type": "Place", "name": "Çayyolu" },
      { "@type": "Place", "name": "Ümitköy" },
      { "@type": "Place", "name": "Bağlıca" },
      { "@type": "Place", "name": "İncek" },
      { "@type": "Place", "name": "Çankaya" }
    ],
    "foundingDate": "1982",
    "founders": [
      { "@type": "Person", "name": "Gazi Yıldırım" },
      { "@type": "Person", "name": "Kemal Yıldırım" }
    ]
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

`app/layout.tsx`'e ekle, sadece ana sayfada görünmesi için koşullu da yapılabilir.

**Her hizmet sayfası için Service schema:**

`components/schemas/ServiceSchema.tsx` ile parametrize edilmiş bir Service schema yap.

**FAQ schema:**

Ana sayfadaki SSS bölümü için FAQ schema ekle. Mevcut soruları otomatik schema'ya dönüştürsün.

---

## TEST CHECKLIST

Bütün görevler bittikten sonra şu testleri yap:

1. `https://woodiko.com/og/default.jpg` → 200 OK + görsel açılsın
2. `https://woodiko.com/kvkk-aydinlatma-metni` → sayfa çalışsın
3. `https://woodiko.com/cerez-politikasi` → sayfa çalışsın
4. Site açıldığında çerez banner çıksın
5. Sticky WhatsApp butonu görünsün ve tıklanabilir olsun
6. Tarayıcı console'da `window.fbq` ve `window.gtag` (consent verildikten sonra) tanımlı olsun
7. Network tab'da `/api/meta-capi` endpoint'i 200 dönsün (test event)
8. Schema.org markup'larını [Rich Results Test](https://search.google.com/test/rich-results)'te doğrula
9. Lighthouse Performance hala 90+ olsun (yeni scriptler regresyon yapmasın)
10. Mobil görünümde her şey düzgün hizalı

---

## SON

Tüm görevler tamamlanınca özet rapor ver:
- Hangi dosyalar oluşturuldu
- Hangi dosyalar düzenlendi
- Environment variable'lar nelere ihtiyaç var (.env'a eklenecekler)
- Test edilemeyen kısımlar varsa belirt
- Lighthouse skoru regresyon olduysa söyle
