'use client'

import { useEffect } from 'react'
import { trackViewContent } from '@/lib/meta-events'

export function ServiceViewTracker({ serviceName }: { serviceName: string }) {
  useEffect(() => {
    trackViewContent({ contentName: serviceName, contentCategory: 'hizmet' })
  }, [serviceName])

  return null
}
