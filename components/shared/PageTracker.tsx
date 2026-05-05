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

    const trackView = async () => {
      try {
        let sessionId = sessionStorage.getItem('woodiko_session')
        if (!sessionId) {
          sessionId = Math.random().toString(36).substring(2, 15)
          sessionStorage.setItem('woodiko_session', sessionId)
        }

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

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
