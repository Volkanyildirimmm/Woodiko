import { hasConsentFor } from './consent'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

type EventParams = Record<string, any>

export function gaTrack(eventName: string, params?: EventParams) {
  if (typeof window === 'undefined') return
  if (!hasConsentFor('analytics')) return
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params || {})
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...(params || {}) })
  }
}

export function gaTrackLead(params: {
  service?: string
  district?: string
  budget?: string
  value?: number
}) {
  gaTrack('generate_lead', {
    currency: 'TRY',
    ...params,
  })
}

export function gaTrackContact(method: string = 'whatsapp') {
  gaTrack('contact', { method })
}

export function gaTrackViewContent(params: {
  contentName?: string
  contentCategory?: string
}) {
  gaTrack('view_item', {
    item_name: params.contentName,
    item_category: params.contentCategory,
  })
}
