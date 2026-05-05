'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

const projects = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
    alt: 'Yaşamkent modern mutfak dolabı projesi',
    title: 'Modern Mutfak — Yaşamkent',
    category: 'Mutfak Dolabı',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
    alt: 'Çayyolu giyinme odası projesi',
    title: 'Giyinme Odası — Çayyolu',
    category: 'Giyinme Odası',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    alt: 'Ümitköy gardırop projesi',
    title: 'Klasik Gardırop — Ümitköy',
    category: 'Gardırop',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    alt: 'Bağlıca mutfak yenileme projesi',
    title: 'Mutfak Yenileme — Bağlıca',
    category: 'Mutfak Dolabı',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    alt: 'İncek banyo dolabı projesi',
    title: 'Banyo Dolabı — İncek',
    category: 'Banyo Dolabı',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    alt: 'Çankaya yatak odası projesi',
    title: 'Yatak Odası — Çankaya',
    category: 'Yatak Odası',
  },
]

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const prev = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + projects.length) % projects.length))
  const next = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % projects.length))

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-cream overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <AnimatedSection>
            <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">Projelerimiz</p>
            <h2 className="font-serif text-3xl md:text-4xl text-wood-dark font-bold">
              Son Tamamlanan İşler
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Link
              href="/galeri"
              className="inline-flex items-center gap-2 text-wood-medium hover:text-gold font-semibold text-sm transition-colors"
            >
              Tüm Projeleri Gör <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="break-inside-avoid"
            >
              <button
                onClick={() => setLightboxIndex(i)}
                className="group relative w-full overflow-hidden rounded-lg block"
                aria-label={`${project.title} fotoğrafını büyüt`}
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  width={600}
                  height={i % 2 === 0 ? 400 : 500}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-gold text-xs font-medium mb-1">{project.category}</span>
                  <span className="text-cream font-serif font-semibold">{project.title}</span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 text-cream/80 hover:text-cream p-2"
              aria-label="Kapat"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/80 hover:text-cream p-2"
              aria-label="Önceki"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-16 top-1/2 -translate-y-1/2 text-cream/80 hover:text-cream p-2"
              aria-label="Sonraki"
            >
              <ChevronRight size={36} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={projects[lightboxIndex].src.replace('w=800', 'w=1200')}
                alt={projects[lightboxIndex].alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[75vh] object-contain rounded"
              />
              <p className="text-center mt-3 text-cream font-serif">{projects[lightboxIndex].title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
