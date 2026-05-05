import { Metadata } from 'next'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from './constants'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
  path?: string
}

export function generateSEO({
  title,
  description = SITE_DESCRIPTION,
  image = '/og/default.jpg',
  noIndex = false,
  path = '',
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Ankara'nın Özel Mobilya Ustası`
  const url = `${SITE_URL}${path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: { 'tr-TR': url },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: fullTitle }],
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: '+90-507-734-75-21',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Şenyüz Sk. No:6/1 Siteler',
    addressLocality: 'Altındağ',
    addressRegion: 'Ankara',
    postalCode: '06050',
    addressCountry: 'TR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 39.9512,
    longitude: 32.5986,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:30',
    },
  ],
  priceRange: '₺₺₺',
  servesCuisine: null,
  image: `${SITE_URL}/og/default.jpg`,
  sameAs: [],
}
