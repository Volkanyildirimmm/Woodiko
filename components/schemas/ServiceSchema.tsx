import Script from 'next/script'
import { SITE_URL, SITE_NAME } from '@/lib/constants'

interface ServiceSchemaProps {
  name: string
  description: string
  slug: string
  image?: string
}

export function ServiceSchema({ name, description, slug, image }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${name} — ${SITE_NAME}`,
    description,
    serviceType: name,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
    },
    areaServed: [
      { '@type': 'City', name: 'Ankara' },
      { '@type': 'Place', name: 'Yaşamkent' },
      { '@type': 'Place', name: 'Çayyolu' },
      { '@type': 'Place', name: 'Ümitköy' },
      { '@type': 'Place', name: 'Bağlıca' },
      { '@type': 'Place', name: 'İncek' },
    ],
    url: `${SITE_URL}/hizmetler/${slug}`,
    ...(image ? { image } : {}),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'TRY',
    },
  }

  return (
    <Script
      id={`service-schema-${slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
