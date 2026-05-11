'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CONSENT_OPEN_SETTINGS_EVENT,
  readConsent,
  writeConsent,
} from '@/lib/consent'

export default function CookieConsent() {
  const [hydrated, setHydrated] = useState(false)
  const [bannerOpen, setBannerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(true)

  useEffect(() => {
    setHydrated(true)
    const existing = readConsent()
    if (!existing) {
      setBannerOpen(true)
    } else {
      setAnalytics(existing.analytics)
      setMarketing(existing.marketing)
    }

    const onOpen = () => {
      const c = readConsent()
      if (c) {
        setAnalytics(c.analytics)
        setMarketing(c.marketing)
      }
      setModalOpen(true)
      setBannerOpen(false)
    }
    window.addEventListener(CONSENT_OPEN_SETTINGS_EVENT, onOpen)
    return () => window.removeEventListener(CONSENT_OPEN_SETTINGS_EVENT, onOpen)
  }, [])

  if (!hydrated) return null

  const acceptAll = () => {
    writeConsent({ analytics: true, marketing: true })
    setAnalytics(true)
    setMarketing(true)
    setBannerOpen(false)
    setModalOpen(false)
  }

  const acceptNecessary = () => {
    writeConsent({ analytics: false, marketing: false })
    setAnalytics(false)
    setMarketing(false)
    setBannerOpen(false)
    setModalOpen(false)
  }

  const saveCustom = () => {
    writeConsent({ analytics, marketing })
    setBannerOpen(false)
    setModalOpen(false)
  }

  return (
    <>
      <AnimatePresence>
        {bannerOpen && (
          <motion.div
            id="woodiko-cookie-banner"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            className="fixed inset-x-0 bottom-0 z-[60] bg-[#1A1410] text-cream-light shadow-[0_-8px_24px_rgba(0,0,0,0.25)]"
            role="dialog"
            aria-label="Çerez tercihleri"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <p className="text-xs md:text-sm leading-relaxed text-cream-light/85 max-w-3xl">
                  Bu web sitesinde deneyiminizi iyileştirmek, site trafiğini analiz etmek ve pazarlama faaliyetlerimizi yürütmek için çerezler kullanıyoruz. &quot;Tümünü Kabul Et&quot;e tıklayarak tüm çerezlerin kullanımına onay vermiş olursunuz. Detaylı bilgi için{' '}
                  <Link href="/cerez-politikasi" className="text-gold hover:underline">
                    Çerez Politikamızı
                  </Link>{' '}
                  inceleyebilirsiniz.
                </p>
                <div className="flex flex-wrap items-center gap-2 md:shrink-0">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="text-xs md:text-sm text-cream-light/70 hover:text-cream-light underline-offset-2 hover:underline px-2 py-1.5"
                  >
                    Ayarları Düzenle
                  </button>
                  <button
                    type="button"
                    onClick={acceptNecessary}
                    className="text-xs md:text-sm border border-cream-light/30 text-cream-light hover:bg-cream-light/10 px-4 py-2 rounded transition-colors"
                  >
                    Sadece Gerekli
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="text-xs md:text-sm bg-gold hover:bg-gold-dark text-wood-dark font-bold px-4 py-2 rounded transition-colors"
                  >
                    Tümünü Kabul Et
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.25 }}
              role="dialog"
              aria-label="Çerez ayarları"
              className="relative bg-cream-light rounded-2xl shadow-xl max-w-lg w-full p-6 md:p-8"
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Kapat"
                className="absolute top-4 right-4 text-wood-medium/60 hover:text-wood-dark"
              >
                <X size={20} />
              </button>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-2">
                Çerez Ayarları
              </h2>
              <p className="text-wood-medium/70 text-sm leading-relaxed mb-5">
                Hangi çerez kategorilerini kabul ettiğinizi aşağıdan yönetebilirsiniz.
              </p>

              <div className="space-y-3">
                <ConsentRow
                  title="Zorunlu Çerezler"
                  description="Site fonksiyonunun çalışması için gereklidir. Devre dışı bırakılamaz."
                  checked
                  disabled
                />
                <ConsentRow
                  title="Analitik Çerezler"
                  description="Google Analytics ile anonim kullanım verisi toplar."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <ConsentRow
                  title="Pazarlama Çerezleri"
                  description="Meta Pixel, Google Ads gibi reklam takip çerezleri."
                  checked={marketing}
                  onChange={setMarketing}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <button
                  type="button"
                  onClick={saveCustom}
                  className="flex-1 px-4 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark text-sm font-bold rounded transition-colors"
                >
                  Tercihlerimi Kaydet
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="flex-1 px-4 py-2.5 border border-wood-medium/30 text-wood-medium text-sm font-semibold rounded hover:bg-cream transition-colors"
                >
                  Tümünü Kabul Et
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ConsentRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <label
      className={`flex items-start gap-3 p-3 border rounded-lg ${
        disabled ? 'bg-cream/40 border-cream cursor-default' : 'bg-cream border-cream hover:border-gold/40 cursor-pointer'
      }`}
    >
      <div className="flex-1">
        <div className="text-wood-dark text-sm font-semibold">{title}</div>
        <div className="text-wood-medium/60 text-xs mt-0.5 leading-relaxed">{description}</div>
      </div>
      <input
        type="checkbox"
        className="mt-1 w-4 h-4 accent-gold"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
    </label>
  )
}
