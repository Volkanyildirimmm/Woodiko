import { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEO({
  title: 'Projelerimiz — Önce & Sonra',
  description:
    "Woodiko'nun tamamladığı projelere bakın. Her projenin öncesi ve sonrası, kullanılan malzemeler, müşteri yorumları ve dönüşüm hikayesi.",
  path: '/projeler',
})

export default function ProjelerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
