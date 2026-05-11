import { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { ContactForm } from '@/components/forms/ContactForm'
import { IletisimContactInfo } from './IletisimContactInfo'

export const metadata: Metadata = generateSEO({
  title: 'İletişim — Woodiko',
  description: 'Woodiko ile iletişime geçin. Ankara mutfak dolabı ve özel mobilya için bizi arayın veya teklif formumuzu doldurun.',
  path: '/iletisim',
})

export default function IletisimPage() {
  return (
    <div className="pt-20">
      <section className="py-16 bg-wood-dark text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">İletişim</h1>
            <p className="text-cream/70 max-w-lg mx-auto">
              Sorularınız için bize ulaşın, ücretsiz danışmanlık için randevu alın.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-cream-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <AnimatedSection className="space-y-8">
              <IletisimContactInfo />
            </AnimatedSection>

            {/* Contact form */}
            <AnimatedSection delay={0.15}>
              <div className="bg-cream rounded-xl p-6 md:p-8 border border-cream">
                <h2 className="font-serif text-2xl font-bold text-wood-dark mb-6">Hızlı Mesaj Gönderin</h2>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
