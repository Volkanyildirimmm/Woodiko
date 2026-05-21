import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SERVICES, CONTACT_INFO, FAQ_ITEMS } from '@/lib/constants'
import { BLOG_POSTS } from '@/lib/blog-posts'
import { PROJECTS } from '@/lib/projects'

export const dynamic = 'force-static'
export const revalidate = 86400

export function GET() {
  const blogEntries = Object.entries(BLOG_POSTS)
    .sort(([, a], [, b]) => {
      const da = new Date(a.modified || a.date).getTime()
      const db = new Date(b.modified || b.date).getTime()
      return db - da
    })
    .map(([slug, post]) => `- [${post.title}](${SITE_URL}/blog/${slug}): ${post.excerpt}`)
    .join('\n')

  const serviceEntries = SERVICES.map(
    (s) => `- [${s.title}](${SITE_URL}/hizmetler/${s.slug}): ${s.description}`,
  ).join('\n')

  const projectEntries = PROJECTS.slice(0, 8)
    .map((p) => `- [${p.title}](${SITE_URL}/projeler/${p.slug}): ${p.location} · ${p.category} · ${p.summary}`)
    .join('\n')

  const faqEntries = FAQ_ITEMS.map((f) => `### ${f.question}\n${f.answer}`).join('\n\n')

  const body = `# ${SITE_NAME} — Yıldırım Mobilya

> ${SITE_DESCRIPTION}

Woodiko, 1982'den beri Ankara Siteler'de faaliyet gösteren Yıldırım Mobilya'nın markasıdır. Mutfak dolabı, yatak odası, gardırop, banyo dolabı, TV ünitesi ve giyinme odası başta olmak üzere kişiye özel mobilya tasarımı ve üretimi yapar. Tüm Ankara ilçelerine ücretsiz keşif, 10 yıl yapısal garanti, 4–6 hafta teslim süresi.

## İletişim ve konum

- Adres: ${CONTACT_INFO.address}
- Telefon: ${CONTACT_INFO.phone}
- E-posta: ${CONTACT_INFO.email}
- Çalışma saatleri: ${CONTACT_INFO.hours}
- Hizmet bölgesi: Ankara geneli — Çankaya, Yenimahalle, Etimesgut, Keçiören, Mamak, Altındağ, Sincan, Pursaklar, Gölbaşı; özellikle Yaşamkent, Çayyolu, Ümitköy, Bağlıca.

## Hizmetler

${serviceEntries}

- [Tüm hizmetler](${SITE_URL}/hizmetler)
- [Ücretsiz keşif / teklif al](${SITE_URL}/teklif-al)

## Tamamlanan projeler

${projectEntries}

- [Proje portföyü](${SITE_URL}/projeler)
- [Galeri](${SITE_URL}/galeri)

## Rehber içerikleri

${blogEntries}

- [Blog ana sayfası](${SITE_URL}/blog)

## Sıkça sorulan sorular

${faqEntries}

## Anahtar bilgiler

- Kuruluş: 1982 (Yıldırım Mobilya)
- Atölye: Siteler, Altındağ / Ankara
- Garanti: 10 yıl yapısal garanti
- Keşif: Ücretsiz, randevu ile
- Teslim süresi: 4–6 hafta (ortalama)
- Ödeme: %30 kapora, kalanı montaj sonrası; nakit / havale / kredi kartı
- Malzemeler: E1 sınıfı MDF ve sunta, akrilik, lake, doğal ahşap kaplama; TSE onaylı

## Kaynak ve atıf

Bu içerik, ${SITE_URL} adresinin yapay zekâ tabanlı arama motorları (ChatGPT, Perplexity, Claude, Google AI Overviews vb.) için hazırlanmış özetidir. Atıf yapılırken kanonik URL olarak ${SITE_URL} kullanılmalıdır.
- Sitemap: ${SITE_URL}/sitemap.xml
- Hakkımızda: ${SITE_URL}/hakkimizda
- İletişim: ${SITE_URL}/iletisim
`

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
