'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

export function CTABand() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-wood-dark relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-gold/10" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-gold/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <AnimatedSection>
          <p className="text-gold font-medium text-sm tracking-widest uppercase mb-4">Haydi Başlayalım</p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream font-bold mb-6 text-balance max-w-3xl mx-auto">
            Mutfağınızın Hayalini Gerçeğe Dönüştürelim
          </h2>
          <p className="text-cream/60 text-base md:text-lg max-w-xl mx-auto mb-10">
            Ücretsiz keşif randevusu alın, uzmanlarımız evinize gelsin ve size özel tasarım süreciniz başlasın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/teklif-al"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold-dark text-wood-dark font-bold text-base rounded transition-colors"
            >
              Ücretsiz Teklif Formu
              <ArrowRight size={18} />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=Merhaba, mobilya teklifi almak istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-cream/30 text-cream hover:bg-cream/10 font-semibold text-base rounded transition-colors"
            >
              <MessageCircle size={18} />
              WhatsApp ile Yazın
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
