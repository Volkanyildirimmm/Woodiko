import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react'
import { SERVICES, CONTACT_INFO } from '@/lib/constants'
import { generateSEO } from '@/lib/seo'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import { ServiceProjectsWidget } from './ServiceProjectsWidget'

const serviceDetails: Record<string, {
  longDescription: string
  features: string[]
  materials: string[]
}> = {
  'mutfak-dolabi': {
    longDescription:
      'Mutfak dolabı, evinizin kalbi sayılır. Doğru tasarım hem estetik hem de ergonomi açısından günlük yaşamınızı kolaylaştırır. Woodiko olarak her mutfağı farklı ölçer, farklı tasarlarız. Açılır kapılı, sürgülü, köşe dolabı, ada mutfaklar — her konfigürasyon bizim için özel bir projedir.',
    features: [
      'Alt ve üst dolap kombinasyonları',
      'Ada ve yarım ada seçenekleri',
      'Soft-close menteşe ve ray sistemi',
      'Dahili aydınlatma seçeneği',
      'Çöp kutusu ve organizer entegrasyonu',
      'Granit, mermer veya kompakt tezgah seçenekleri',
    ],
    materials: [
      'E1 sınıfı MDF kapak',
      'Melamin kaplı sunta gövde',
      'Alüminyum profil kapak seçeneği',
      'Boyalı MDF (akrilik) kapak seçeneği',
      'Blum / Hettich menteşe ve ray sistemleri',
    ],
  },
  'yatak-odasi': {
    longDescription:
      'Yatak odanız, gün sonunda kendinizi attığınız huzur alanınızdır. Yatak başlığından şifonyer, aynalı gardıroptan komodinlere kadar tüm yatak odası mobilyalarınızı kişisel zevkinize göre tasarlıyoruz.',
    features: [
      'Karyola ve yatak başlığı tasarımı',
      'Şifonyer ve komodin kombinasyonları',
      'Aynalı sürgülü gardırop seçenekleri',
      'LED arka aydınlatma',
      'Kumaş ve deri döşeme seçenekleri',
      'Entegre depolama çözümleri',
    ],
    materials: [
      'E1 sınıfı yüksek yoğunluklu MDF',
      'Doğal ahşap kaplama seçenekleri',
      'Kumaş ve ekolojik deri döşeme',
      'Boyalı MDF kapak seçenekleri',
      'Yumuşak kapanma ray sistemleri',
    ],
  },
  'gardirop': {
    longDescription: 'Gardıropunuz sadece giysileri saklayan bir kutu değil; kıyafetlerinizi düzenleyen, hayatınızı kolaylaştıran bir sistem olmalıdır. Sürgülü, açılır, köşe — her tip gardırobu ölçülerinize göre yapıyoruz.',
    features: ['Sürgülü ve açılır kapı seçenekleri', 'İç aksesuar: raf, elbise askısı, çekmece', 'Ayna entegrasyonu', 'Soft-close sistem', 'Modüler iç düzenleme', 'LED iç aydınlatma'],
    materials: ['Cam kapak seçeneği', 'Ayna kapak seçeneği', 'MDF ve melamin kaplı gövde', 'Alüminyum profil çerçeve', 'Blum ray sistemi'],
  },
  'banyo-dolabi': {
    longDescription: 'Banyolar nemli ve ısı değişimlerinin yoğun olduğu alanlardır. Bu nedenle banyo dolaplarınızda doğru malzeme seçimi hayati önem taşır. Woodiko, neme dayanıklı özel malzemeler kullanarak uzun ömürlü banyo çözümleri sunar.',
    features: ['Neme dayanıklı malzeme', 'Lavabo altı dolabı', 'Ayaklı veya duvara monte', 'Ayna ve aydınlatmalı dolap', 'Çamaşır sepeti entegrasyonu', 'Gizli kablo yönetimi'],
    materials: ['Su geçirmez MDF', 'PVC kaplama yüzeyler', 'Paslanmaz çelik aksesuarlar', 'Temperli cam raflar', 'Neme dayanıklı menteşeler'],
  },
  'tv-unitesi': {
    longDescription: 'TV üniteniz oturma odanızın odak noktasıdır. Sade bir TV sehpasından, duvar paneli ve kitaplık entegrasyonuna kadar her tarzda TV ünitesi tasarlıyoruz.',
    features: ['Duvar paneli entegrasyonu', 'Kitaplık ve depolama kombinasyonu', 'Gizli kablo kanalları', 'Açık raf ve kapalı dolap dengesi', 'LED arka aydınlatma', 'Şömine entegrasyonu'],
    materials: ['Doğal ahşap kaplama', 'Boyalı MDF', 'Metal ayak seçenekleri', 'Cam raf seçenekleri', 'LED şerit aydınlatma'],
  },
  'giyinme-odasi': {
    longDescription: 'Giyinme odası artık lüks değil, akıllıca bir yatırım. Doğru planlanmış bir walk-in closet, her sabah hayatınızı kolaylaştırır. Küçük bir odayı bile verimli giyinme odasına dönüştürüyoruz.',
    features: ['Tam boy ayna', 'Adacık tasarımı', 'Çekmece ve özel bölmeler', 'Ayakkabılık entegrasyonu', 'Aksesuar çekmeceleri', 'Bütün oda planlaması'],
    materials: ['Doğal ahşap kaplama', 'Boyalı MDF', 'Cam ve ayna yüzeyler', 'Kadife iç kaplamalar', 'Gizli aydınlatma profilleri'],
  },
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = SERVICES.find((s) => s.slug === params.slug)
  if (!service) return {}
  return generateSEO({
    title: `${service.title} — Ankara Özel Tasarım`,
    description: `Ankara'da kişiye özel ${service.title.toLowerCase()} tasarımı ve üretimi. ${service.description} Ücretsiz keşif randevusu için hemen teklif alın.`,
    image: service.image,
    path: `/hizmetler/${service.slug}`,
  })
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug)
  if (!service) notFound()
  const details = serviceDetails[params.slug]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} — Woodiko`,
    description: details.longDescription,
    provider: { '@type': 'LocalBusiness', name: 'Woodiko' },
    areaServed: 'Ankara',
    serviceType: service.title,
  }

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Hero */}
      <section className="relative h-80 md:h-96 overflow-hidden">
        <Image
          src={service.image}
          alt={`Woodiko ${service.title} projesi`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <nav className="text-cream/60 text-sm mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-cream">Ana Sayfa</Link>
            <span className="mx-2">/</span>
            <Link href="/hizmetler" className="hover:text-cream">Hizmetler</Link>
            <span className="mx-2">/</span>
            <span className="text-cream">{service.title}</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl text-cream font-bold">{service.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-cream-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <AnimatedSection>
                <h2 className="font-serif text-2xl font-bold text-wood-dark mb-4">Hizmet Detayı</h2>
                <p className="text-wood-medium/80 leading-relaxed text-base">{details.longDescription}</p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h3 className="font-serif text-xl font-bold text-wood-dark mb-4">Özellikler</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {details.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-wood-medium/80 text-sm">
                      <CheckCircle2 size={16} className="text-gold mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <h3 className="font-serif text-xl font-bold text-wood-dark mb-4">Malzeme Seçenekleri</h3>
                <ul className="space-y-2">
                  {details.materials.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-wood-medium/80 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="bg-gold/10 border border-gold/30 rounded-xl p-6">
                  <h3 className="font-serif text-xl font-bold text-wood-dark mb-3">Fiyatlandırma Politikamız</h3>
                  <p className="text-wood-medium/80 text-sm leading-relaxed">
                    Woodiko olarak, {service.title.toLowerCase()} projelerimizde standart hazır kalıpların ötesine geçerek tamamen mekanınızın ölçülerine ve kişisel beklentilerinize uygun özel üretim (butik mobilya) yapıyoruz. <br className="hidden sm:block"/><br className="hidden sm:block"/>
                    Bu nedenle <strong>{service.title} fiyatları</strong>; projenin uygulanacağı alanın büyüklüğüne (m²), seçilen ahşap ve plaka malzemesinin kalitesine (MDF, lake, akrilik vb.), kullanılacak mekanizmaların ve aksesuarların türüne göre değişiklik göstermektedir. Ezbere bir fiyat listesi sunmak yerine, ücretsiz keşif hizmetimizle mekanınızı yerinde inceliyor, bütçenize ve tarzınıza en uygun, şeffaf fiyatlandırmayı projeye özel olarak oluşturuyoruz.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar CTA */}
            <AnimatedSection delay={0.1} className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="bg-wood-dark rounded-xl p-6 text-cream">
                  <h3 className="font-serif text-xl font-bold mb-3">Ücretsiz Teklif Alın</h3>
                  <p className="text-cream/70 text-sm mb-5 leading-relaxed">
                    Uzmanlarımız evinize gelsin, ölçüm alsın ve size özel fiyat teklifi sunsun.
                  </p>
                  <Link
                    href="/teklif-al"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded transition-colors"
                  >
                    Teklif Formu <ArrowRight size={16} />
                  </Link>
                </div>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-wood-medium text-wood-medium hover:bg-wood-medium hover:text-cream font-semibold rounded transition-colors"
                >
                  <Phone size={16} />
                  {CONTACT_INFO.phone}
                </a>

                {/* Önceki İşlerimiz Widget */}
                <ServiceProjectsWidget category={service.title} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
