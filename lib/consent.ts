export const CONSENT_STORAGE_KEY = 'woodiko-cookie-consent'
export const CONSENT_EVENT = 'woodiko:cookie-consent-changed'
export const CONSENT_OPEN_SETTINGS_EVENT = 'woodiko:open-cookie-settings'

export interface ConsentState {
  necessary: true
  analytics: boolean
  marketing: boolean
  timestamp: number
}

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: 0,
}

export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      timestamp: typeof parsed.timestamp === 'number' ? parsed.timestamp : Date.now(),
    }
  } catch {
    return null
  }
}

export function writeConsent(consent: Omit<ConsentState, 'necessary' | 'timestamp'>) {
  if (typeof window === 'undefined') return
  const next: ConsentState = {
    necessary: true,
    analytics: !!consent.analytics,
    marketing: !!consent.marketing,
    timestamp: Date.now(),
  }
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: next }))
}

export function hasConsentFor(channel: 'analytics' | 'marketing'): boolean {
  const c = readConsent()
  return !!c && !!c[channel]
}
