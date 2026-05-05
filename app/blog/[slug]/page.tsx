import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Calendar, ArrowLeft, Share2 } from 'lucide-react'
import { generateSEO } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

const posts: Record<string, {
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: string
  author: string
  authorImage: string
  content: string
  related: string[]
}> = {
  'ankara-mutfak-dolabi-fiyatlari-2024': {
    title: 'Ankara\'da Mutfak Dolabı Fiyatları: 2024 Kapsamlı Rehber',
    excerpt: 'Ankara\'da mutfak dolabı yaptırmayı düşünüyorsunuz ama fiyatlar hakkında hiçbir fikriniz yok mu?',
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=80',
    category: 'Fiyat Rehberi',
    date: '2024-03-15',
    readTime: '8 dk okuma',
    author: 'Woodiko Ekibi',
    authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&q=80&fit=crop',
    related: ['kucuk-mutfaklar-icin-dolap-onerileri', 'mobilya-bakim-rehberi'],
    content: `
## Ankara'da Mutfak Dolabı Fiyatlarını Etkileyen Faktörler

Mutfak dolabı fiyatlandırması birçok faktöre bağlıdır. Doğru bütçe planlaması yapabilmek için bu faktörleri anlamak çok önemlidir.

### 1. Kullanılan Malzeme

En büyük maliyet kalemi malzeme seçimidir:

- **MDF kapak (boyalı/lake):** Metrekare başına 6.000–12.000₺
- **Akrilik kapak:** Metrekare başına 10.000–18.000₺
- **Alüminyum profil kapak:** Metrekare başına 8.000–15.000₺
- **Ahşap kaplama:** Metrekare başına 12.000–25.000₺

### 2. Kapak Tipi ve Donanım

Soft-close menteşe ve ray sistemleri fiyatı artırır ama uzun vadede değer yaratır. Blum ve Hettich gibi Avusturya/Alman markaları, yerli muadillerine göre %20–40 daha pahalıdır.

### 3. İç Aksesuar

- Çöp kutusu sistemi: 800–2.500₺
- Raf organizatörü: 500–1.500₺
- Köşe dolabı mekanizması (Lemans): 2.500–5.000₺

### Ankara'da Ortalama Mutfak Dolabı Maliyeti

| Mutfak Tipi | Ortalama Maliyet |
|-------------|-----------------|
| Standart (10m²) | 60.000–100.000₺ |
| Orta Segment (10m²) | 100.000–180.000₺ |
| Premium (10m²) | 180.000–350.000₺ |

### Dikkat Etmeniz Gerekenler

1. **Ölçüm hassasiyeti:** Profesyonel lazer ölçüm şart.
2. **Garanti belgesi:** Yazılı garanti alın.
3. **Referanslar:** Daha önce yapılan işleri görün.
4. **Sözleşme:** Her şey sözleşmeye yazılsın.

Woodiko olarak şeffaf fiyatlandırma politikamızla Ankara'da güvenilir bir tercih olmaya devam ediyoruz.
    `,
  },
  'kucuk-mutfaklar-icin-dolap-onerileri': {
    title: 'Küçük Mutfaklar İçin 10 Akıllı Dolap Çözümü',
    excerpt: 'Dar veya küçük bir mutfağınız var ama maksimum depolama alanına ihtiyaç duyuyorsunuz?',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    category: 'Mutfak',
    date: '2024-02-28',
    readTime: '5 dk okuma',
    author: 'Zeynep Kılıç',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&q=80&fit=crop',
    related: ['ankara-mutfak-dolabi-fiyatlari-2024', 'mobilya-bakim-rehberi'],
    content: `
## Küçük Mutfaklarda Alan Kazanmanın 10 Yolu

Küçük bir mutfak, yetersiz depolama alanı anlamına gelmek zorunda değil. Doğru planlama ile her köşeyi değerlendirebilirsiniz.

### 1. Tavan Yüksekliğini Kullanın

Tavan yüksekliğine kadar uzanan üst dolaplar depolama alanınızı dramatik biçimde artırır.

### 2. Köşe Dolabı Çözümleri

Boşa gitmeye meyilli köşeler için "Lemans" veya "Magic Corner" mekanizmaları idealdir.

### 3. Çekme-Dönme Mekanizmalar

Alt dolaplarda çekme-dönme raflar, en arkadaki eşyalara bile rahat ulaşmanızı sağlar.

### 4. Dikey Depolama

Tencereleri yatay değil dikey depolayan özel bölmeler kullanın.

### 5. Duvar Rafları

Açık duvar rafları hem depolama sunar hem de mutfağa görsel derinlik katar.

### 6. Sürgülü Kapılar

Küçük mutfaklarda açılır kapılar çok yer kaplar. Sürgülü dolap kapıları bu sorunu çözer.

### 7. Renk Seçimi

Açık renkler (beyaz, krem, açık gri) mutfağı büyük gösterir.

### 8. Entegre Cihazlar

Fırın, bulaşık makinesi ve buzdolabını dolap içine entegre edin.

### 9. Çok Fonksiyonlu Ada

Küçük bir mutfak adasını hem tezgah hem depolama hem de oturma olarak kullanın.

### 10. Ayna Kullanımı

Bazı kapılarda ayna veya cam kullanmak mekânı görsel olarak büyütür.
    `,
  },
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts[params.slug]
  if (!post) return {}
  return generateSEO({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    path: `/blog/${params.slug}`,
  })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug]
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'Woodiko' },
  }

  const contentLines = post.content.trim().split('\n')

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-charcoal/60" />
      </div>

      <div className="bg-cream-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-wood-medium/60 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-wood-dark truncate max-w-xs">{post.title}</span>
          </nav>

          <div className="grid lg:grid-cols-4 gap-10">
            {/* Article */}
            <article className="lg:col-span-3">
              <AnimatedSection>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-xs font-semibold mb-4">
                  {post.category}
                </div>
                <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-wood-dark mb-4 leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-wood-medium/60 mb-8 pb-6 border-b border-cream">
                  <Image src={post.authorImage} alt={post.author} width={32} height={32} className="rounded-full object-cover" />
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                </div>

                <div className="prose prose-sm max-w-none text-wood-dark/80 leading-relaxed space-y-4">
                  {contentLines.map((line, i) => {
                    if (line.startsWith('## ')) return <h2 key={i} className="font-serif text-xl font-bold text-wood-dark mt-8 mb-3">{line.replace('## ', '')}</h2>
                    if (line.startsWith('### ')) return <h3 key={i} className="font-serif text-lg font-semibold text-wood-dark mt-6 mb-2">{line.replace('### ', '')}</h3>
                    if (line.startsWith('- ')) return <li key={i} className="ml-4 text-wood-medium/80">{line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}</li>
                    if (line.startsWith('1. ') || line.startsWith('2. ') || /^\d+\. /.test(line)) return <li key={i} className="ml-4 text-wood-medium/80">{line.replace(/^\d+\. /, '')}</li>
                    if (line.trim() === '') return null
                    if (line.startsWith('|')) return null
                    return <p key={i} className="text-wood-medium/80 leading-relaxed">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
                  })}
                </div>
              </AnimatedSection>
            </article>

            {/* Sidebar */}
            <AnimatedSection delay={0.1} className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-wood-dark rounded-xl p-5 text-cream">
                  <h3 className="font-serif font-bold text-base mb-3">Ücretsiz Teklif</h3>
                  <p className="text-cream/70 text-sm mb-4">Projeniz için fiyat öğrenin, 24 saatte dönelim.</p>
                  <Link
                    href="/teklif-al"
                    className="block w-full text-center py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold text-sm rounded transition-colors"
                  >
                    Teklif Al
                  </Link>
                </div>
                <div>
                  <h3 className="font-semibold text-wood-dark text-sm mb-3">İlgili Yazılar</h3>
                  <div className="space-y-3">
                    {post.related.map((slug) => {
                      const rel = posts[slug]
                      if (!rel) return null
                      return (
                        <Link key={slug} href={`/blog/${slug}`} className="flex gap-3 group">
                          <Image src={rel.image} alt={rel.title} width={60} height={60} className="rounded-lg object-cover shrink-0 w-14 h-14" />
                          <span className="text-xs text-wood-medium group-hover:text-gold transition-colors leading-snug font-medium">{rel.title}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="mt-8 pt-6 border-t border-cream">
            <Link href="/blog" className="inline-flex items-center gap-2 text-wood-medium hover:text-gold transition-colors text-sm font-medium">
              <ArrowLeft size={14} />
              Tüm Yazılar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
