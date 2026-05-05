'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

export function Services() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-cream-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold font-medium text-sm tracking-widest uppercase mb-3"
          >
            Hizmetlerimiz
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl text-wood-dark font-bold mb-4"
          >
            Her Odanız İçin Özel Çözümler
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-wood-medium/70 max-w-xl mx-auto text-base leading-relaxed"
          >
            Mutfaktan yatak odasına, banyodan giyinme odasına kadar evinizin her köşesini kişisel dokunuşlarla tasarlıyoruz.
          </motion.p>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <StaggerItem key={service.slug}>
              <Link href={`/hizmetler/${service.slug}`} className="group block">
                <motion.div
                  whileHover={{ scale: 0.98 }}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/5] sm:aspect-square lg:aspect-[4/5] shadow-lg shadow-wood-dark/10"
                >
                  <Image
                    src={service.image}
                    alt={`Woodiko ${service.title} - Ankara özel tasarım`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-serif text-2xl font-bold text-cream mb-2">
                      {service.title}
                    </h3>
                    <p className="text-cream/80 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold text-sm font-bold uppercase tracking-wider group-hover:gap-4 transition-all">
                      Detayları Gör <ArrowRight size={16} />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
