import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'
import { CONTACT_INFO, WHATSAPP_NUMBER } from './constants'

export interface SiteSettings {
  seo: {
    googleAnalyticsId: string
    googleTagManagerId: string
    googleSearchConsoleKey: string
    facebookPixelId: string
  }
  contact: {
    phone: string
    whatsapp: string
    email: string
    address: string
    mapUrl: string
    workingHours: string
  }
  social: {
    instagramUrl: string
    facebookUrl: string
    youtubeUrl: string
  }
}

export const DEFAULT_SETTINGS: SiteSettings = {
  seo: {
    googleAnalyticsId: '',
    googleTagManagerId: '',
    googleSearchConsoleKey: '',
    facebookPixelId: '',
  },
  contact: {
    phone: CONTACT_INFO.phone,
    whatsapp: WHATSAPP_NUMBER.replace(/\D/g, ''),
    email: CONTACT_INFO.email,
    address: CONTACT_INFO.address,
    mapUrl: CONTACT_INFO.mapsEmbed,
    workingHours: CONTACT_INFO.hours,
  },
  social: {
    instagramUrl: '',
    facebookUrl: '',
    youtubeUrl: '',
  },
}

function pickString(value: any, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value : fallback
}

export function mergeSettings(remote: any): SiteSettings {
  const seo = remote?.seo ?? {}
  const contact = remote?.contact ?? {}
  const social = remote?.social ?? {}
  return {
    seo: {
      googleAnalyticsId: pickString(seo.googleAnalyticsId, DEFAULT_SETTINGS.seo.googleAnalyticsId),
      googleTagManagerId: pickString(seo.googleTagManagerId, DEFAULT_SETTINGS.seo.googleTagManagerId),
      googleSearchConsoleKey: pickString(seo.googleSearchConsoleKey, DEFAULT_SETTINGS.seo.googleSearchConsoleKey),
      facebookPixelId: pickString(seo.facebookPixelId, DEFAULT_SETTINGS.seo.facebookPixelId),
    },
    contact: {
      phone: pickString(contact.phone, DEFAULT_SETTINGS.contact.phone),
      whatsapp: pickString(contact.whatsapp, DEFAULT_SETTINGS.contact.whatsapp),
      email: pickString(contact.email, DEFAULT_SETTINGS.contact.email),
      address: pickString(contact.address, DEFAULT_SETTINGS.contact.address),
      mapUrl: pickString(contact.mapUrl, DEFAULT_SETTINGS.contact.mapUrl),
      workingHours: pickString(contact.workingHours, DEFAULT_SETTINGS.contact.workingHours),
    },
    social: {
      instagramUrl: pickString(social.instagramUrl, DEFAULT_SETTINGS.social.instagramUrl),
      facebookUrl: pickString(social.facebookUrl, DEFAULT_SETTINGS.social.facebookUrl),
      youtubeUrl: pickString(social.youtubeUrl, DEFAULT_SETTINGS.social.youtubeUrl),
    },
  }
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const snap = await getDoc(doc(db, 'settings', 'general'))
    if (!snap.exists()) return DEFAULT_SETTINGS
    return mergeSettings(snap.data())
  } catch (err) {
    console.error('Site settings fetch failed:', err)
    return DEFAULT_SETTINGS
  }
}
