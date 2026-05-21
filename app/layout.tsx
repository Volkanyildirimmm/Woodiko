import type { Metadata } from 'next'
import { Outfit, Montserrat } from 'next/font/google'
import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import {
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  websiteSchema,
  generateSEO,
} from '@/lib/seo'
import Script from 'next/script'
import { Suspense } from 'react'
import { PageTracker } from '@/components/shared/PageTracker'
import { SiteSettingsProvider } from '@/context/SiteSettingsContext'
import { SiteScripts } from '@/components/shared/SiteScripts'
import { fetchSiteSettings } from '@/lib/siteSettings'
import CookieConsent from '@/components/CookieConsent'
import StickyWhatsApp from '@/components/StickyWhatsApp'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const base = generateSEO()
  try {
    const settings = await fetchSiteSettings()
    const verifyKey = settings.seo.googleSearchConsoleKey.trim()
    if (verifyKey) {
      return {
        ...base,
        verification: {
          ...(base.verification || {}),
          google: verifyKey,
        },
      }
    }
  } catch {}
  return base
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let socials: string[] = []
  try {
    const settings = await fetchSiteSettings()
    socials = [
      settings.social.instagramUrl,
      settings.social.facebookUrl,
      settings.social.youtubeUrl,
    ].filter((s) => typeof s === 'string' && s.trim().length > 0)
  } catch {}

  const localBusinessSchema = buildLocalBusinessSchema(socials)
  const organizationSchema = buildOrganizationSchema(socials)

  return (
    <html lang="tr" className={`${outfit.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream-light">
        <SiteSettingsProvider>
          <SiteScripts />
          <Script
            id="local-business-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          />
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <Header />
          <Suspense fallback={null}>
            <PageTracker />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyWhatsApp />
          <CookieConsent />
        </SiteSettingsProvider>
      </body>
    </html>
  )
}
