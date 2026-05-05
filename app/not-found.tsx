import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-light px-4">
      <div className="text-center max-w-md">
        <div className="font-serif text-8xl font-bold text-wood-medium/20 mb-4">404</div>
        <h1 className="font-serif text-3xl font-bold text-wood-dark mb-3">Sayfa Bulunamadı</h1>
        <p className="text-wood-medium/70 mb-8 leading-relaxed">
          Aradığınız sayfa taşınmış veya silinmiş olabilir. Endişelenmeyin, sizi doğru yere götürelim.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded transition-colors"
          >
            <Home size={16} />
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-wood-medium text-wood-medium hover:bg-wood-medium hover:text-cream font-semibold rounded transition-colors"
          >
            Bize Ulaşın
          </Link>
        </div>
      </div>
    </div>
  )
}
