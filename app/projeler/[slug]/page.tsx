import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, Layers, Star, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react'
import { PROJECTS } from '@/lib/projects'
import { generateSEO } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import { BeforeAfterSlider } from '@/components/shared/BeforeAfterSlider'

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.slug)
  if (!project) return {}
  return generateSEO({
    title: `${project.title} — Önce & Sonra`,
    description: project.summary,
    image: project.after.src,
    path: `/projeler/${params.slug}`,
  })
}

export default function ProjeDetayPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const currentIndex = PROJECTS.findIndex((p) => p.slug === params.slug)
  const prevProject = PROJECTS[currentIndex - 1]
  const nextProject = PROJECTS[currentIndex + 1]

  return (
    <div className="pt-20 bg-cream-light">
      {/* Breadcrumb + header */}
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
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Before/After Slider */}
            <AnimatedSection>
              <h2 className="font-serif text-xl font-bold text-wood-dark mb-4">Önce & Sonra</h2>
              <p className="text-wood-medium/60 text-sm mb-4">Kaydırıcıyı sürükleyin veya dokunun.</p>
              <BeforeAfterSlider
                before={project.before}
                after={project.after}
                className="h-72 sm:h-96 lg:h-[480px]"
              />
            </AnimatedSection>

            {/* Side by side */}
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

            {/* Story */}
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

            {/* Materials */}
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

            {/* Gallery */}
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

            {/* Testimonial */}
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

          {/* Sidebar */}
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

        {/* Prev / Next navigation */}
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
