'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { NAV_LINKS, CONTACT_INFO } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { MobileNav } from './MobileNav'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isHome = pathname === '/'
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) return null

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || !isHome
            ? 'bg-cream-light/95 backdrop-blur-sm shadow-sm border-b border-cream'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-wood-medium rounded-sm flex items-center justify-center">
                <span className="text-cream font-serif font-bold text-lg leading-none">W</span>
              </div>
              <span
                className={cn(
                  'font-serif font-bold text-xl tracking-wide transition-colors',
                  isScrolled || !isHome ? 'text-wood-dark' : 'text-cream'
                )}
              >
                WOODIKO
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium tracking-wide transition-colors hover:text-gold',
                    isScrolled || !isHome ? 'text-wood-dark' : 'text-cream/90',
                    pathname === link.href && 'text-gold'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                className={cn(
                  'hidden md:flex items-center gap-1.5 text-sm font-medium transition-colors',
                  isScrolled || !isHome ? 'text-wood-medium hover:text-gold' : 'text-cream/90 hover:text-gold'
                )}
              >
                <Phone size={14} />
                {CONTACT_INFO.phone}
              </a>
              <Link
                href="/teklif-al"
                className="hidden md:inline-flex items-center px-4 py-2 bg-gold hover:bg-gold-dark text-wood-dark text-sm font-semibold rounded transition-colors"
              >
                Ücretsiz Teklif Al
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className={cn(
                  'lg:hidden p-2 transition-colors',
                  isScrolled || !isHome ? 'text-wood-dark' : 'text-cream'
                )}
                aria-label="Menüyü aç"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
