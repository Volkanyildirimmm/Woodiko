'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1920&q=85"
          alt="Woodiko özel tasarım mutfak dolabı"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/40 rounded-full text-gold text-sm font-medium mb-8"
        >
          <Star size={12} fill="currentColor" />
          Ankara&apos;nın Tercih Ettiği Mobilya Ustası
          <Star size={12} fill="currentColor" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream font-bold leading-tight mb-6 text-balance"
        >
          Evinize Özel,
          <br />
          <span className="text-gold">Hayalinizdeki</span> Mobilya
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-cream/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          1982&apos;den bu yana Ankara&apos;da mutfak dolabı, yatak odası, gardırop ve banyo dolabı üretiyoruz. 40 yılı aşkın ustalık, her detayda hissedilir.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/teklif-al"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold-dark text-wood-dark font-bold text-base rounded transition-colors shadow-lg shadow-gold/25"
          >
            Ücretsiz Keşif Randevusu Al
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/galeri"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-cream/50 text-cream hover:bg-cream/10 font-semibold text-base rounded transition-colors"
          >
            Projelerimizi İncele
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 shadow-xl"
        >
          {[
            { value: '40+', label: 'Yıllık Deneyim' },
            { value: '850+', label: 'Özel Proje' },
            { value: '10 Yıl', label: 'Garanti Sözü' },
          ].map((stat, idx) => (
            <div key={stat.label} className={`text-center ${idx !== 2 ? 'sm:border-r border-white/10' : ''}`}>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-gold mb-1 drop-shadow-sm">{stat.value}</div>
              <div className="text-cream/90 text-xs sm:text-sm font-medium tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-cream/40 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-cream/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
