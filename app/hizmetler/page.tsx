import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { generateSEO } from '@/lib/seo'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

export const metadata: Metadata = generateSEO({
  title: 'Hizmetlerimiz',
  description:
    'Woodiko\'nun sunduğu tüm özel mobilya hizmetleri: mutfak dolabı, yatak odası, gardırop, banyo dolabı, TV ünitesi ve giyinme odası.',
  path: '/hizmetler',
})

export default function HizmetlerPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-wood-dark text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">Ne Yapıyoruz</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Hizmetlerimiz</h1>
            <p className="text-cream/70 max-w-xl mx-auto text-base leading-relaxed">
              Evinizin her odası için kişiye özel, kalıcı ve estetik mobilya çözümleri üretiyoruz.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-cream-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <StaggerItem key={service.slug}>
                <Link href={`/hizmetler/${service.slug}`} className="group block">
                  <div className="bg-cream rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-cream">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={`Woodiko ${service.title}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="font-serif text-xl font-bold text-wood-dark mb-2 group-hover:text-gold transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-wood-medium/70 text-sm leading-relaxed mb-4">{service.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold group-hover:gap-3 transition-all">
                        Detaylı Bilgi <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  )
}
