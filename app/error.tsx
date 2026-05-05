'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-light px-4">
      <div className="text-center max-w-md">
        <div className="font-serif text-6xl font-bold text-wood-medium/20 mb-4">Hata</div>
        <h2 className="font-serif text-2xl font-bold text-wood-dark mb-3">Bir Şeyler Ters Gitti</h2>
        <p className="text-wood-medium/70 mb-8">
          Beklenmedik bir hata oluştu. Lütfen sayfayı yenileyin veya bize ulaşın.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded transition-colors"
          >
            <RefreshCw size={16} />
            Tekrar Dene
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-wood-medium text-wood-medium hover:bg-wood-medium hover:text-cream font-semibold rounded transition-colors"
          >
            <Home size={16} />
            Ana Sayfa
          </Link>
        </div>
      </div>
    </div>
  )
}
