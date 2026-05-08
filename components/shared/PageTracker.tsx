'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export function PageTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

    const w = window as any
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'page_view', { page_path: url, page_location: window.location.href })
    }
    if (typeof w.fbq === 'function') {
      w.fbq('track', 'PageView')
    }

    const trackView = async () => {
      try {
        let sessionId = sessionStorage.getItem('woodiko_session')
        if (!sessionId) {
          sessionId = Math.random().toString(36).substring(2, 15)
          sessionStorage.setItem('woodiko_session', sessionId)
        }

        await addDoc(collection(db, 'page_views'), {
          path: url,
          sessionId,
          timestamp: serverTimestamp(),
          userAgent: window.navigator.userAgent,
        })
      } catch (error) {
        // İstatistik kaydı başarısız olursa sessizce geç
      }
    }

    trackView()
  }, [pathname, searchParams])

  return null
}
