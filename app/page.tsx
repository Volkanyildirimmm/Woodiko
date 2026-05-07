import { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { Services } from '@/components/home/Services'
import { Process } from '@/components/home/Process'
import { Gallery } from '@/components/home/Gallery'
import { Testimonials } from '@/components/home/Testimonials'
import { WhyUs } from '@/components/home/WhyUs'
import { FAQ } from '@/components/home/FAQ'
import { CTABand } from '@/components/home/CTABand'
import { generateSEO, faqPageSchema } from '@/lib/seo'
import Script from 'next/script'

export const metadata: Metadata = generateSEO({
  title: 'Ankara\'nın Özel Mobilya Ustası',
  description:
    'Ankara\'da kişiye özel mutfak dolabı, yatak odası, gardırop ve banyo dolabı tasarımı ve üretimi. 1982\'den bu yana Yıldırım Mobilya güvencesiyle, 10 yıl garanti, ücretsiz keşif. Yaşamkent, Çayyolu, Ümitköy, Bağlıca bölgelerine hizmet.',
  path: '/',
  keywords: [
    'Ankara özel mutfak dolabı',
    'Ankara mobilya',
    'Siteler mobilya',
    'kişiye özel gardırop Ankara',
    'banyo dolabı Ankara',
    'yatak odası Ankara',
    'Yıldırım Mobilya',
    'Woodiko',
  ],
})

export default function HomePage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <Hero />
      <Services />
      <Process />
      <Gallery />
      <Testimonials />
      <WhyUs />
      <FAQ />
      <CTABand />
    </>
  )
}
