'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, ArrowRight, Layers, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface ProjectData {
  slug: string
  title: string
  category: string
  location: string
  area: string
  duration: string
  summary: string
  beforeImage: string
  afterImage: string
  testimonial?: {
    text: string
    name: string
  }
}

export default function ProjelerPage() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Tümü')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map(doc => doc.data() as ProjectData)
        setProjects(data)
      } catch (error) {
        console.error("Projeler yüklenirken hata:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const categories = ['Tümü', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))]

  const filtered = activeCategory === 'Tümü'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-14 sm:py-20 bg-wood-dark text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">Dönüşüm Hikayeleri</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Projelerimiz</h1>
          <p className="text-cream/70 max-w-xl mx-auto leading-relaxed">
            Her projenin öncesini, sonrasını ve arkasındaki hikayeyi paylaşıyoruz. Çünkü güven, şeffaflıkla başlar.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-10 mt-10">
            {[
              { value: '850+', label: 'Tamamlanan Proje' },
              { value: '%98', label: 'Müşteri Memnuniyeti' },
              { value: '40+', label: 'Yıl Deneyim' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-2xl font-bold text-gold">{s.value}</div>
                <div className="text-cream/50 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-cream-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                  cat === activeCategory
                    ? 'bg-gold text-wood-dark'
                    : 'bg-cream text-wood-medium hover:bg-gold/10 border border-cream'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 items-start"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link href={`/projeler/${project.slug}`} className="group block h-full">
                    <div className="bg-cream rounded-2xl overflow-hidden border border-cream shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 flex flex-col h-full">
                      {/* Before/After thumbnail */}
                      <div className="relative h-56 overflow-hidden flex-shrink-0 bg-wood-dark/5">
                        {/* After image (visible by default) */}
                        {project.afterImage && (
                          <Image
                            src={project.afterImage}
                            alt={`${project.title} Sonrası`}
                            fill
                            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                        )}
                        {/* Before image (visible on hover) */}
                        {project.beforeImage && (
                          <Image
                            src={project.beforeImage}
                            alt={`${project.title} Öncesi`}
                            fill
                            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                        )}

                        {/* Labels */}
                        {project.beforeImage && (
                          <>
                            <div className="absolute inset-0 flex items-end justify-between p-3 pointer-events-none">
                              <span className="px-2 py-1 bg-charcoal/70 text-cream text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                ÖNCE
                              </span>
                              <span className="px-2 py-1 bg-gold text-wood-dark text-xs font-bold rounded opacity-100 group-hover:opacity-0 transition-opacity">
                                SONRA
                              </span>
                            </div>

                            {/* Hover hint */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="px-3 py-1.5 bg-white/90 text-wood-dark text-xs font-semibold rounded-full shadow">
                                Önce görüntüleniyor
                              </span>
                            </div>
                          </>
                        )}

                        {/* Category badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-wood-dark/80 text-cream text-xs font-medium rounded-full backdrop-blur-sm">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Content — flex-col + flex-1 so all cards stretch equally */}
                      <div className="p-5 flex flex-col flex-1">
                        <h2 className="font-serif text-lg font-bold text-wood-dark mb-2 group-hover:text-gold transition-colors">
                          {project.title}
                        </h2>
                        <p className="text-wood-medium/70 text-sm leading-relaxed mb-4 line-clamp-2">
                          {project.summary}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-wood-medium/50 mb-4">
                          <span className="flex items-center gap-1">
                            <MapPin size={11} /> {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} /> {project.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Layers size={11} /> {project.area}
                          </span>
                        </div>

                        {/* Testimonial — pushed to bottom via mt-auto */}
                        <div className="mt-auto">
                          {project.testimonial && (
                            <div className="border-t border-cream pt-4 mb-4">
                              <p className="text-wood-medium/60 text-xs italic line-clamp-2">
                                &ldquo;{project.testimonial.text}&rdquo;
                              </p>
                              <p className="text-wood-medium/40 text-xs mt-1">— {project.testimonial.name}</p>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 text-gold text-sm font-semibold group-hover:gap-3 transition-all">
                            Projeyi İncele <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty or Loading state */}
          {loading ? (
            <div className="text-center py-20 flex justify-center text-wood-medium">
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-wood-medium/60 bg-cream rounded-2xl border border-cream/50">
              <p className="text-lg font-medium">Bu kategoride henüz proje bulunmuyor.</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-wood-dark text-cream text-center">
        <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Sıradaki Proje Sizin Olsun</p>
        <h2 className="font-serif text-3xl font-bold mb-4">Kendi Dönüşüm Hikayenizi Yazalım</h2>
        <p className="text-cream/60 mb-8 max-w-md mx-auto text-sm">
          Ücretsiz keşif randevusu alın, uzmanlarımız gelsin ve projeniz başlasın.
        </p>
        <Link
          href="/teklif-al"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded transition-colors"
        >
          Ücretsiz Teklif Al <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  )
}
