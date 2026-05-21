import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Users, Clock, Wrench } from 'lucide-react'
import { generateSEO } from '@/lib/seo'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

export const metadata: Metadata = generateSEO({
  title: 'Hakkımızda — Woodiko Ankara',
  description: '1982\'de Gazi ve Kemal Yıldırım tarafından Siteler\'de kurulan Yıldırım Mobilya, Woodiko markasıyla 40 yılı aşkın deneyimini modern tasarımla buluşturuyor.',
  path: '/hakkimizda',
})

const stats = [
  { value: '40+', label: 'Yıl Deneyim', icon: Clock },
  { value: '850+', label: 'Tamamlanan Proje', icon: Wrench },
  { value: '98%', label: 'Müşteri Memnuniyeti', icon: Users },
  { value: '10 Yıl', label: 'Yapısal Garanti', icon: Award },
]


export default function HakkimizdaPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-wood-dark text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">Biz Kimiz</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
                1982&apos;den Bu Yana Siteler&apos;in Güvenilir Mobilya Ustası
              </h1>
              <p className="text-cream/70 text-base leading-relaxed mb-8">
                Gazi,Mustafa ve Kemal Yıldırım kardeşlerin 1982&apos;de kurduğu Yıldırım Mobilya, bugün Woodiko markasıyla Ankara geneline kişiye özel mobilya tasarımı ve üretimi yapmaya devam ediyor. 40+ yıllık ustalık, modern tasarımla buluşuyor.
              </p>
              <Link
                href="/teklif-al"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded transition-colors"
              >
                Ücretsiz Teklif Al <ArrowRight size={16} />
              </Link>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="relative h-72 md:h-96 rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&q=80"
                  alt="Woodiko mobilya atölyesi Ankara"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center p-6 bg-cream-light rounded-xl border border-cream">
                  <stat.icon size={28} className="text-gold mx-auto mb-3" />
                  <div className="font-serif text-3xl font-bold text-wood-dark mb-1">{stat.value}</div>
                  <div className="text-wood-medium/70 text-sm">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-cream-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-wood-dark mb-4">Hikayemiz</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <AnimatedSection>
              <div className="space-y-4 text-wood-medium/80 leading-relaxed">
                <p>
                  1982 yılında Gazi Yıldırım, Mustafa Yıldırım  ve Kemal Yıldırım kardeşler, Ankara&apos;nın mobilya kalbi Siteler&apos;de Yıldırım Mobilya&apos;yı kurdu. O günden bu yana tek bir prensibi benimsedik: <strong className="text-wood-dark">Her müşteri bir aile gibi özenle karşılanır.</strong>
                </p>
                <p>
                  40 yılı aşkın geçmişimizle Siteler&apos;deki atölyemizden; Yaşamkent, Çayyolu, Ümitköy, Bağlıca ve İncek gibi Ankara&apos;nın seçkin semtlerine uzanan projelerimizde her zaman kaliteyi ve kişisel dokunuşu öncelik haline getirdik.
                </p>
                <p>
                  Bugün ikinci neslin de katkısıyla Woodiko markası altında dijital dünyada da yerimizi alıyoruz. Ama yıllar geçse de değişmeyen tek şey var — her proje hâlâ elle, özeneyle, Yıldırım ustalığıyla yapılıyor.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80"
                  alt="Woodiko atölyesinden görünüm"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>


    </div>
  )
}
