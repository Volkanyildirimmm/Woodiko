import { Metadata } from 'next'
import { Phone, Clock, ShieldCheck } from 'lucide-react'
import { generateSEO } from '@/lib/seo'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { CONTACT_INFO } from '@/lib/constants'

export const metadata: Metadata = generateSEO({
  title: 'Ücretsiz Teklif Al — Ankara Mobilya',
  description: 'Ankara\'da özel mobilya fiyatı öğrenmek için formumuzu doldurun. Woodiko uzmanları 24 saat içinde sizi arayacak.',
  path: '/teklif-al',
})

export default function TeklifAlPage() {
  return (
    <div className="pt-20 min-h-screen bg-cream-light">
      <section className="py-12 bg-wood-dark text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Ücretsiz Teklif Alın</h1>
            <p className="text-cream/70 max-w-lg mx-auto text-sm leading-relaxed">
              Formu doldurun, 24 saat içinde uzmanımız sizi arasın. Keşif randevusu tamamen ücretsiz.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="bg-cream rounded-2xl p-6 md:p-10 shadow-sm border border-cream">
                  <QuoteForm />
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <AnimatedSection delay={0.1} className="space-y-4">
              <div className="bg-wood-dark rounded-xl p-6 text-cream">
                <h3 className="font-serif text-lg font-bold mb-4">Neden Bizi Seçmelisiniz?</h3>
                <ul className="space-y-3">
                  {[
                    'Ücretsiz ev keşfi ve ölçüm',
                    '3D tasarım görselleştirme',
                    '10 yıl yapısal garanti',
                    'E1 sertifikalı malzeme',
                    'Zamanında montaj garantisi',
                    'Montaj sonrası destek',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-cream/80">
                      <ShieldCheck size={14} className="text-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-cream rounded-xl p-5 border border-cream">
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={18} className="text-gold" />
                  <span className="font-semibold text-wood-dark text-sm">24 Saat İçinde Dönüş</span>
                </div>
                <p className="text-wood-medium/70 text-xs leading-relaxed">
                  Formu doldurduğunuz andan itibaren en geç 24 saat içinde (mesai saatlerinde) uzmanımız sizi arar.
                </p>
              </div>

              <div className="bg-cream rounded-xl p-5 border border-cream">
                <div className="flex items-center gap-3 mb-3">
                  <Phone size={18} className="text-gold" />
                  <span className="font-semibold text-wood-dark text-sm">Hemen Arayın</span>
                </div>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                  className="text-gold font-bold text-lg hover:text-gold-dark transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
                <p className="text-wood-medium/50 text-xs mt-1">Pzt–Cmt, 09:00–18:30</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
