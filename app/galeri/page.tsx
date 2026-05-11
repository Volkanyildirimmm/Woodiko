'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

interface GalleryItem {
  id: string
  imageUrl: string
  title: string
  category: string
  altText?: string
}

export default function GaleriPage() {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('Tümü')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem))
        setImages(data)
      } catch (error) {
        console.error("Galeri yüklenirken hata:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  const categories = ['Tümü', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))]

  const filtered = images.filter((p) => {
    return activeCategory === 'Tümü' || p.category === activeCategory
  })

  const prev = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length))
  const next = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length))

  return (
    <div className="pt-20">
      <section className="py-16 bg-wood-dark text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Projelerimiz</h1>
            <p className="text-cream/70 max-w-xl mx-auto">Tamamladığımız seçkin projelerden ilham alın.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 bg-cream-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-gold text-wood-dark shadow-sm' : 'bg-white border border-cream text-wood-medium hover:bg-gold/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="py-20 flex justify-center text-wood-medium"><Loader2 className="animate-spin" size={32}/></div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-wood-medium bg-white rounded-2xl border border-cream">
              Bu kategoriye ait görsel bulunamadı.
            </div>
          ) : (
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="break-inside-avoid"
                >
                  <button
                    onClick={() => setLightboxIndex(i)}
                    className="group relative w-full overflow-hidden rounded-xl block shadow-sm border border-cream/50"
                    aria-label={project.title}
                  >
                    <Image
                      src={project.imageUrl}
                      alt={project.altText || project.title || 'Woodiko Galeri'}
                      width={600}
                      height={i % 3 === 0 ? 500 : 380}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                      <span className="text-gold text-xs font-bold uppercase tracking-wider">{project.category}</span>
                      <span className="text-cream font-serif font-semibold text-lg">{project.title}</span>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          )}
        </div>
      </section>

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
            <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 text-cream/80 p-2" aria-label="Kapat"><X size={28} /></button>
            <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/80 p-2" aria-label="Önceki"><ChevronLeft size={36} /></button>
            <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-16 top-1/2 -translate-y-1/2 text-cream/80 p-2" aria-label="Sonraki"><ChevronRight size={36} /></button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex]?.imageUrl || ''}
                alt={filtered[lightboxIndex]?.altText || filtered[lightboxIndex]?.title || 'Büyük görsel'}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
              <p className="text-center mt-4 text-cream font-serif text-xl">{filtered[lightboxIndex]?.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
