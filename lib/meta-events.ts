import { hasConsentFor } from './consent'
import { gaTrackLead, gaTrackContact, gaTrackViewService } from './ga-events'
import { googleAdsTrackLead, googleAdsTrackContact } from './google-ads'

declare global {
  interface Window {
    fbq?: (...args: any[]) => void
  }
}

type EventParams = Record<string, any> | undefined

function generateEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === 'undefined') return
  if (!hasConsentFor('marketing')) return

  const eventId = generateEventId()

  if (window.fbq) {
    window.fbq('track', eventName, params, { eventID: eventId })
  }

  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName,
      params,
      eventId,
      eventTime: Math.floor(Date.now() / 1000),
      eventSourceUrl: window.location.href,
      userAgent: navigator.userAgent,
    }),
    keepalive: true,
  }).catch(() => {})
}

export function trackLead(params: {
  service?: string
  district?: string
  budget?: string
  email?: string
  phone?: string
  value?: number
  currency?: string
}) {
  trackEvent('Lead', { currency: 'TRY', ...params })
  gaTrackLead({
    service: params.service,
    district: params.district,
    budget: params.budget,
    value: params.value,
  })
  googleAdsTrackLead(params.value || 1000)
}

export function trackContact(params?: { method?: string; surface?: string }) {
  trackEvent('Contact', params)
  gaTrackContact(params?.method)
  googleAdsTrackContact(500)
}

export function trackViewContent(params: {
  contentName?: string
  contentCategory?: string
}) {
  trackEvent('ViewContent', {
    content_name: params.contentName,
    content_category: params.contentCategory,
  })
  if (params.contentName) {
    gaTrackViewService(params.contentName)
  }
}
