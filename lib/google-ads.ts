import { hasConsentFor } from './consent'

export function trackGoogleAdsConversion(
  conversionLabel?: string,
  value: number = 0,
): void {
  if (typeof window === 'undefined') return
  if (!hasConsentFor('marketing')) return
  if (typeof window.gtag !== 'function') return

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
  const label = conversionLabel || process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL

  if (!adsId || !label) return

  window.gtag('event', 'conversion', {
    send_to: `${adsId}/${label}`,
    value,
    currency: 'TRY',
  })
}
