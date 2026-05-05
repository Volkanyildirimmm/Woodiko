'use client'

import { motion } from 'framer-motion'
import { Search, Pencil, Hammer, CheckCircle2 } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Ücretsiz Keşif',
    description:
      'Uzmanlarımız evinize gelir, ölçüm alır ve ihtiyaçlarınızı detaylıca dinler. Randevu günden güne verilir, bekleme yok.',
  },
  {
    icon: Pencil,
    step: '02',
    title: 'Kişiye Özel Tasarım',
    description:
      '3D çizimlerle hayalinizdeki mobilyayı görsel olarak önünüze koyuyoruz. Onaylayana kadar revize ediyoruz.',
  },
  {
    icon: Hammer,
    step: '03',
    title: 'Özenli Üretim',
    description:
      'Kendi atölyemizde, 1. sınıf malzemelerle üretim yapıyoruz. Her aşama kalite kontrolünden geçiyor.',
  },
  {
    icon: CheckCircle2,
    step: '04',
    title: 'Profesyonel Montaj',
    description:
      'Deneyimli montaj ekibimiz kurulum yapar, temizliği yapar ve teslim eder. 10 yıl garantiyle.',
  },
]

export function Process() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-wood-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold font-medium text-sm tracking-widest uppercase mb-3"
          >
            Nasıl Çalışıyoruz
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl text-cream font-bold"
          >
            4 Adımda Hayaliniz Gerçek Oluyor
          </motion.h2>
        </div>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {steps.map((step, i) => (
            <StaggerItem key={step.step}>
              <div className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gold/20 -translate-y-1/2 z-0" />
                )}
                <div className="relative z-10 text-center flex flex-col items-center">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/5 border border-gold/30 mb-6 group hover:bg-gold/10 transition-colors">
                    <step.icon size={28} className="text-gold relative z-10" />
                    <div className="font-serif text-6xl lg:text-7xl font-bold text-white/5 absolute -top-4 -right-6 lg:-right-8 -z-0 select-none">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-serif text-lg lg:text-xl font-bold text-cream mb-3">{step.title}</h3>
                  <p className="text-cream/70 text-sm leading-relaxed hidden sm:block max-w-xs mx-auto">{step.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
