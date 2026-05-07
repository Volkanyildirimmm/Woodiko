import { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEO({
  title: 'Galeri — Ankara Özel Mobilya Projelerimiz',
  description:
    'Woodiko\'nun Ankara\'da tamamladığı mutfak dolabı, gardırop, yatak odası ve banyo dolabı projelerinden seçmeler. Kişiye özel mobilya fotoğraf galerisi.',
  path: '/galeri',
  keywords: [
    'Ankara mobilya galeri',
    'özel mutfak dolabı örnekleri',
    'gardırop modelleri Ankara',
    'Woodiko projeler',
  ],
})

export default function GaleriLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
