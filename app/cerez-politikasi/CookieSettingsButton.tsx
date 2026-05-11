'use client'

import { CONSENT_OPEN_SETTINGS_EVENT } from '@/lib/consent'

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(CONSENT_OPEN_SETTINGS_EVENT))}
      className="text-gold hover:underline font-semibold"
    >
      &quot;Çerez Ayarları&quot;
    </button>
  )
}
