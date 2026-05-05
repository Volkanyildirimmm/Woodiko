'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Facebook } from 'lucide-react'
import { CONTACT_INFO, SERVICES, SITE_NAME, WHATSAPP_NUMBER } from '@/lib/constants'

export function Footer() {
  const pathname = usePathname()
  const year = new Date().getFullYear()

  if (pathname?.startsWith('/admin')) return null

  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-wood-medium rounded-sm flex items-center justify-center">
                <span className="text-cream font-serif font-bold text-lg leading-none">W</span>
              </div>
              <span className="font-serif font-bold text-xl text-cream tracking-wide">
                {SITE_NAME.toUpperCase()}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-cream/60">
              Siteler&apos;deki atölyemizden Ankara&apos;ya kişiye özel mobilya tasarımı ve üretimi yapıyoruz. Yıldırım Mobilya güvencesiyle.
            </p>
            <div className="flex gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded border border-cream/20 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded border border-cream/20 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded border border-cream/20 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Hizmetler */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-cream text-base">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/hizmetler/${s.slug}`}
                    className="text-sm text-cream/60 hover:text-gold transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hızlı Bağlantılar */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-cream text-base">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              {[
                { href: '/galeri', label: 'Galeri' },
                { href: '/hakkimizda', label: 'Hakkımızda' },
                { href: '/blog', label: 'Blog' },
                { href: '/teklif-al', label: 'Teklif Al' },
                { href: '/iletisim', label: 'İletişim' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-cream text-base">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex gap-2 text-sm text-cream/60">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                  className="flex gap-2 text-sm text-cream/60 hover:text-gold transition-colors"
                >
                  <Phone size={14} className="text-gold mt-0.5 shrink-0" />
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex gap-2 text-sm text-cream/60 hover:text-gold transition-colors"
                >
                  <Mail size={14} className="text-gold mt-0.5 shrink-0" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex gap-2 text-sm text-cream/60">
                <Clock size={14} className="text-gold mt-0.5 shrink-0" />
                <span>{CONTACT_INFO.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>© {year} Yıldırım Mobilya — {SITE_NAME}. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <Link href="/gizlilik-politikasi" className="hover:text-cream/60 transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/kullanim-kosullari" className="hover:text-cream/60 transition-colors">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
