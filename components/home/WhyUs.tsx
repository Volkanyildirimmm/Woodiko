'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Ruler, Leaf, Award, Clock, HeartHandshake } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

const reasons = [
  {
    icon: Ruler,
    title: 'Kişiye Özel Tasarım',
    description: 'Standart değil, sizin için. Her ölçü, her renk, her aksesuar tam ihtiyacınıza göre.',
  },
  {
    icon: Leaf,
    title: '1. Sınıf Malzeme',
    description: 'Yalnızca E1 sınıfı, formaldehit değerleri düşük, sağlıklı malzemeler kullanıyoruz.',
  },
  {
    icon: ShieldCheck,
    title: '10 Yıl Garanti',
    description: 'Tüm ürünlerimizde yazılı 10 yıl yapısal garanti sunuyoruz. Söz veriyoruz.',
  },
  {
    icon: Clock,
    title: 'Zamanında Teslim',
    description: 'Belirlenen tarihe uymak onur meselemizdir. Gecikmeler müşterimize bildiriliriz.',
  },
  {
    icon: Award,
    title: '1982\'den Bu Yana',
    description: 'Gazi ve Kemal Yıldırım\'ın kurduğu Yıldırım Mobilya, 40 yılı aşkın deneyimiyle Ankara\'nın güvenilir adresidir.',
  },
  {
    icon: HeartHandshake,
    title: 'Ücretsiz Keşif & Danışmanlık',
    description: 'Size en doğru çözümü önermek için evinize geliyor, ücretsiz ölçüm ve danışmanlık yapıyoruz.',
  },
]

export function WhyUs() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-cream-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">Neden Woodiko?</p>
            <h2 className="font-serif text-3xl md:text-4xl text-wood-dark font-bold mb-6 leading-tight">
              Fark Yaratan 6 Neden
            </h2>
            <p className="text-wood-medium/70 text-base leading-relaxed mb-8">
              Ankara&apos;da yüzlerce mobilya firması var. Bizi tercih etmek için iyi nedenleriniz olsun diye elimizden geleni yapıyoruz.
            </p>
            <div className="flex flex-wrap gap-3">
              {['E1 Sertifikalı Malzeme', '10 Yıl Garanti', 'Ücretsiz Keşif', 'Ankara Geneli Hizmet'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-gold/10 border border-gold/30 text-gold text-xs font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((reason) => (
              <StaggerItem key={reason.title}>
                <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-xl shadow-wood-dark/5 border border-transparent hover:border-gold/30 hover:shadow-2xl transition-all">
                  <div className="shrink-0 w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                    <reason.icon size={22} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-wood-dark text-base mb-2">{reason.title}</h3>
                    <p className="text-wood-medium/80 text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
