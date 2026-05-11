'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useSiteSettings } from '@/context/SiteSettingsContext'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { CONSENT_EVENT, readConsent } from '@/lib/consent'
import { trackContact } from '@/lib/meta-events'
import { gaTrackContact } from '@/lib/ga-events'

const TOOLTIP_SEEN_KEY = 'woodiko-wa-tooltip-seen'
const WA_MESSAGE = 'Merhaba, mobilya teklifi almak istiyorum.'

export default function StickyWhatsApp() {
  const pathname = usePathname()
  const { contact } = useSiteSettings()
  const [bannerOpen, setBannerOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const consent = readConsent()
    setBannerOpen(!consent)
    const onConsent = () => setBannerOpen(!readConsent())
    window.addEventListener(CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (typeof window === 'undefined') return
    if (window.localStorage.getItem(TOOLTIP_SEEN_KEY)) return

    const showT = window.setTimeout(() => setTooltipOpen(true), 3000)
    const hideT = window.setTimeout(() => {
      setTooltipOpen(false)
      window.localStorage.setItem(TOOLTIP_SEEN_KEY, '1')
    }, 8000)
    return () => {
      window.clearTimeout(showT)
      window.clearTimeout(hideT)
    }
  }, [mounted])

  if (!mounted) return null
  if (pathname?.startsWith('/admin')) return null

  const number = (contact.whatsapp || WHATSAPP_NUMBER).replace(/\D/g, '')
  const href = `https://wa.me/${number}?text=${encodeURIComponent(WA_MESSAGE)}`

  const handleClick = () => {
    trackContact({ method: 'whatsapp', surface: 'sticky' })
    gaTrackContact('whatsapp_sticky')
  }

  const dismissTooltip = () => {
    setTooltipOpen(false)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TOOLTIP_SEEN_KEY, '1')
    }
  }

  return (
    <div
      className="fixed right-5 z-50 transition-[bottom] duration-300 md:right-7"
      style={{ bottom: bannerOpen ? 'calc(180px + env(safe-area-inset-bottom))' : 'calc(20px + env(safe-area-inset-bottom))' }}
    >
      <AnimatePresence>
        {tooltipOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-3 w-56 bg-charcoal text-cream rounded-lg shadow-lg px-4 py-3 text-xs leading-relaxed"
            role="status"
          >
            <button
              type="button"
              onClick={dismissTooltip}
              aria-label="Kapat"
              className="absolute top-1.5 right-1.5 text-cream/60 hover:text-cream"
            >
              <X size={12} />
            </button>
            <span aria-hidden>👋</span> Merhaba! Hızlı cevap için WhatsApp.
            <span className="absolute -bottom-1.5 right-7 w-3 h-3 bg-charcoal rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="WhatsApp ile yaz"
        className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
        style={{ backgroundColor: '#25D366' }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={28} fill="white" strokeWidth={1.5} />
      </motion.a>
    </div>
  )
}
