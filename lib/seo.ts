import { Metadata } from 'next'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, TESTIMONIALS, FAQ_ITEMS } from './constants'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
  path?: string
  keywords?: string[]
}

export function generateSEO({
  title,
  description = SITE_DESCRIPTION,
  image = '/og/default',
  noIndex = false,
  path = '',
  keywords,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Ankara'nın Özel Mobilya Ustası`
  const url = `${SITE_URL}${path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    keywords: keywords?.join(', '),
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
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  }
}

const ratingValues = TESTIMONIALS.map((t) => t.rating)
const aggregateRating = {
  '@type': 'AggregateRating',
  ratingValue: (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(1),
  reviewCount: TESTIMONIALS.length,
  bestRating: 5,
  worstRating: 1,
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'FurnitureStore', 'HomeAndConstructionBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  legalName: 'Yıldırım Mobilya',
  alternateName: ['Yıldırım Mobilya', 'Woodiko Mobilya'],
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: '+90-507-734-75-21',
  email: 'info@woodiko.com',
  foundingDate: '1982',
  slogan: 'Ankara\'nın Özel Mobilya Ustası',
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
  areaServed: [
    { '@type': 'City', name: 'Ankara' },
    { '@type': 'AdministrativeArea', name: 'Çankaya' },
    { '@type': 'AdministrativeArea', name: 'Yenimahalle' },
    { '@type': 'AdministrativeArea', name: 'Etimesgut' },
    { '@type': 'AdministrativeArea', name: 'Keçiören' },
    { '@type': 'AdministrativeArea', name: 'Mamak' },
    { '@type': 'AdministrativeArea', name: 'Altındağ' },
    { '@type': 'AdministrativeArea', name: 'Sincan' },
    { '@type': 'AdministrativeArea', name: 'Pursaklar' },
    { '@type': 'AdministrativeArea', name: 'Gölbaşı' },
    { '@type': 'Place', name: 'Yaşamkent' },
    { '@type': 'Place', name: 'Çayyolu' },
    { '@type': 'Place', name: 'Ümitköy' },
    { '@type': 'Place', name: 'Bağlıca' },
    { '@type': 'Place', name: 'İncek' },
  ],
  founders: [
    { '@type': 'Person', name: 'Gazi Yıldırım' },
    { '@type': 'Person', name: 'Kemal Yıldırım' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:30',
    },
  ],
  priceRange: '$$$',
  image: `${SITE_URL}/og/default`,
  logo: `${SITE_URL}/logo.png`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Özel Mobilya Hizmetleri',
    itemListElement: [
      'Mutfak Dolabı',
      'Yatak Odası',
      'Gardırop',
      'Banyo Dolabı',
      'TV Ünitesi',
      'Giyinme Odası',
    ].map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: `${service} — Ankara Özel Tasarım` },
    })),
  },
  aggregateRating,
  review: TESTIMONIALS.map((t) => ({
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5 },
    author: { '@type': 'Person', name: t.name },
    reviewBody: t.text,
  })),
  sameAs: ['https://instagram.com/woodikomobilya'] as string[],
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: 'Yıldırım Mobilya',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  foundingDate: '1982',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+90-507-734-75-21',
    contactType: 'customer service',
    areaServed: 'TR',
    availableLanguage: ['Turkish'],
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'tr-TR',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function articleSchema(post: {
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  slug: string
  modified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
  }
}
