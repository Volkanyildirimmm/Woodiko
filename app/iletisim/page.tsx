import { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { CONTACT_INFO, WHATSAPP_NUMBER } from '@/lib/constants'
import { generateSEO } from '@/lib/seo'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { ContactForm } from '@/components/forms/ContactForm'

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
              <div>
                <h2 className="font-serif text-2xl font-bold text-wood-dark mb-6">Bize Ulaşın</h2>
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-wood-dark text-sm mb-1">Adres</p>
                      <p className="text-wood-medium/70 text-sm">{CONTACT_INFO.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-wood-dark text-sm mb-1">Telefon</p>
                      <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="text-wood-medium/70 text-sm hover:text-gold transition-colors">
                        {CONTACT_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                      <MessageCircle size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-wood-dark text-sm mb-1">WhatsApp</p>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=Merhaba, bilgi almak istiyorum.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-wood-medium/70 text-sm hover:text-gold transition-colors"
                      >
                        {WHATSAPP_NUMBER}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-wood-dark text-sm mb-1">E-posta</p>
                      <a href={`mailto:${CONTACT_INFO.email}`} className="text-wood-medium/70 text-sm hover:text-gold transition-colors">
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-wood-dark text-sm mb-1">Çalışma Saatleri</p>
                      <p className="text-wood-medium/70 text-sm">{CONTACT_INFO.hours}</p>
                      <p className="text-wood-medium/50 text-xs mt-0.5">Pazar günleri kapalı</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden h-56 bg-cream border border-cream">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.5!2d32.5986!3d39.9512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f9b5b5b5b5b%3A0x0!2sSiteler%2C%20Alt%C4%B1nda%C4%9F%2C%20Ankara!5e0!3m2!1str!2str!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Woodiko konum haritası"
                />
              </div>
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
