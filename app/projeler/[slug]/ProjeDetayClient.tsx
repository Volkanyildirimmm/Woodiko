'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, Layers, Star, CheckCircle2, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { PROJECTS, type Project } from '@/lib/projects'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { BeforeAfterSlider } from '@/components/shared/BeforeAfterSlider'

function buildProject(data: any): Project {
  const fallback = PROJECTS.find((p) => p.slug === data.slug)
  return {
    slug: data.slug || '',
    title: data.title || fallback?.title || '',
    location: data.location || fallback?.location || '',
    category: data.category || fallback?.category || '',
    style: data.style || fallback?.style || '',
    duration: data.duration || fallback?.duration || '',
    area: data.area || fallback?.area || '',
    summary: data.summary || fallback?.summary || '',
    challenge: data.challenge || fallback?.challenge || '',
    solution: data.solution || fallback?.solution || '',
    materials: Array.isArray(data.materials) && data.materials.length > 0
      ? data.materials
      : (fallback?.materials || []),
    before: {
      src: data.beforeImage || fallback?.before.src || '',
      alt: fallback?.before.alt || `${data.title} öncesi`,
    },
    after: {
      src: data.afterImage || fallback?.after.src || '',
      alt: fallback?.after.alt || `${data.title} sonrası`,
    },
    gallery: Array.isArray(data.gallery) && data.gallery.length > 0
      ? data.gallery.map((src: string, i: number) => ({ src, alt: `${data.title} galeri ${i + 1}` }))
      : (fallback?.gallery || []),
    completedAt: data.createdAt || fallback?.completedAt || '',
    testimonial: fallback?.testimonial,
  }
}

export default function ProjeDetayClient({ slug }: { slug: string }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc')))
        const remote = snapshot.docs
          .map((d) => buildProject(d.data()))
          .filter((p) => p.slug)

        if (remote.length === 0) {
          setProjects(PROJECTS)
        } else {
          const remoteSlugs = new Set(remote.map((p) => p.slug))
          const staticOnly = PROJECTS.filter((p) => !remoteSlugs.has(p.slug))
          setProjects([...remote, ...staticOnly])
        }
      } catch (err) {
        console.error('Firestore fetch failed, using static:', err)
        setProjects(PROJECTS)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="pt-20 min-h-[60vh] flex items-center justify-center bg-cream-light">
        <Loader2 className="animate-spin text-wood-medium" size={32} />
      </div>
    )
  }

  const project = projects.find((p) => p.slug === slug)
  if (!project) {
    return (
      <div className="pt-20 min-h-[60vh] flex flex-col items-center justify-center bg-cream-light text-center px-4">
        <h1 className="font-serif text-2xl font-bold text-wood-dark mb-3">Proje bulunamadı</h1>
        <Link href="/projeler" className="text-gold hover:underline">Tüm projelere dön</Link>
      </div>
    )
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prevProject = projects[currentIndex - 1]
  const nextProject = projects[currentIndex + 1]

  return (
    <div className="pt-20 bg-cream-light">
      <section className="py-10 sm:py-14 bg-wood-dark text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-sm text-cream/50 mb-5" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-cream transition-colors">Ana Sayfa</Link>
              <span>/</span>
              <Link href="/projeler" className="hover:text-cream transition-colors">Projeler</Link>
              <span>/</span>
              <span className="text-cream/80 truncate">{project.title}</span>
            </nav>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gold/20 border border-gold/40 text-gold text-xs font-semibold rounded-full">
                {project.category}
              </span>
              <span className="px-3 py-1 bg-cream/10 text-cream/70 text-xs rounded-full">
                {project.style}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-5 text-sm text-cream/60">
              <span className="flex items-center gap-1.5"><MapPin size={13} className="text-gold" />{project.location}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} className="text-gold" />{project.duration}</span>
              <span className="flex items-center gap-1.5"><Layers size={13} className="text-gold" />{project.area}</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <AnimatedSection>
              <h2 className="font-serif text-xl font-bold text-wood-dark mb-4">Önce & Sonra</h2>
              <p className="text-wood-medium/60 text-sm mb-4">Kaydırıcıyı sürükleyin veya dokunun.</p>
              <BeforeAfterSlider
                before={project.before}
                after={project.after}
                className="h-72 sm:h-96 lg:h-[480px]"
              />
            </AnimatedSection>

            <AnimatedSection delay={0.05}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-48 sm:h-60 rounded-xl overflow-hidden">
                  <Image
                    src={project.before.src}
                    alt={project.before.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-charcoal/80 text-cream text-xs font-bold rounded">
                    ÖNCE
                  </div>
                </div>
                <div className="relative h-48 sm:h-60 rounded-xl overflow-hidden">
                  <Image
                    src={project.after.src}
                    alt={project.after.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-gold text-wood-dark text-xs font-bold rounded">
                    SONRA
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="font-serif text-xl font-bold text-wood-dark mb-3">Proje Özeti</h2>
              <p className="text-wood-medium/80 leading-relaxed">{project.summary}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.12}>
              <h3 className="font-serif text-lg font-bold text-wood-dark mb-2">Zorluk</h3>
              <p className="text-wood-medium/70 leading-relaxed text-sm">{project.challenge}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.14}>
              <h3 className="font-serif text-lg font-bold text-wood-dark mb-2">Çözümümüz</h3>
              <p className="text-wood-medium/70 leading-relaxed text-sm">{project.solution}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.16}>
              <h3 className="font-serif text-lg font-bold text-wood-dark mb-4">Kullanılan Malzemeler</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.materials.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-sm text-wood-medium/80">
                    <CheckCircle2 size={15} className="text-gold mt-0.5 shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            {project.gallery.length > 1 && (
              <AnimatedSection delay={0.18}>
                <h3 className="font-serif text-lg font-bold text-wood-dark mb-4">Proje Galerisi</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="relative h-40 rounded-xl overflow-hidden">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {project.testimonial && (
              <AnimatedSection delay={0.2}>
                <div className="bg-cream rounded-2xl p-6 border border-cream">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: project.testimonial.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-gold" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-wood-dark italic leading-relaxed mb-4">
                    &ldquo;{project.testimonial.text}&rdquo;
                  </p>
                  <p className="text-wood-medium/60 text-sm font-medium">— {project.testimonial.name}</p>
                </div>
              </AnimatedSection>
            )}
          </div>

          <AnimatedSection delay={0.1} className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-wood-dark rounded-xl p-6 text-cream">
                <h3 className="font-serif text-lg font-bold mb-2">Benzer Proje İster misiniz?</h3>
                <p className="text-cream/60 text-sm mb-5 leading-relaxed">
                  Ücretsiz keşif randevusu alın, size özel tasarım hazırlayalım.
                </p>
                <Link
                  href="/teklif-al"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded transition-colors"
                >
                  Ücretsiz Teklif Al <ArrowRight size={15} />
                </Link>
              </div>

              <div className="bg-cream rounded-xl p-5 border border-cream space-y-3 text-sm">
                <h4 className="font-semibold text-wood-dark">Proje Detayları</h4>
                {[
                  { label: 'Kategori', value: project.category },
                  { label: 'Stil', value: project.style },
                  { label: 'Alan', value: project.area },
                  { label: 'Süre', value: project.duration },
                  { label: 'Konum', value: project.location },
                ].map((d) => (
                  <div key={d.label} className="flex justify-between border-b border-cream pb-2 last:border-0 last:pb-0">
                    <span className="text-wood-medium/50">{d.label}</span>
                    <span className="font-medium text-wood-dark">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="mt-14 pt-8 border-t border-cream flex items-center justify-between gap-4">
          {prevProject ? (
            <Link
              href={`/projeler/${prevProject.slug}`}
              className="flex items-center gap-2 text-sm text-wood-medium hover:text-gold transition-colors font-medium"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{prevProject.title}</span>
              <span className="sm:hidden">Önceki</span>
            </Link>
          ) : <div />}
          <Link href="/projeler" className="text-sm text-wood-medium/50 hover:text-gold transition-colors">
            Tüm Projeler
          </Link>
          {nextProject ? (
            <Link
              href={`/projeler/${nextProject.slug}`}
              className="flex items-center gap-2 text-sm text-wood-medium hover:text-gold transition-colors font-medium"
            >
              <span className="hidden sm:inline">{nextProject.title}</span>
              <span className="sm:hidden">Sonraki</span>
              <ArrowRight size={16} />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}
