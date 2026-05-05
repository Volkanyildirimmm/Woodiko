'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { X, Phone, MessageCircle } from 'lucide-react'
import { NAV_LINKS, CONTACT_INFO, WHATSAPP_NUMBER } from '@/lib/constants'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-cream-light shadow-2xl lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream">
              <span className="font-serif font-bold text-xl text-wood-dark tracking-wide">
                WOODIKO
              </span>
              <button
                onClick={onClose}
                className="p-2 text-wood-medium hover:text-wood-dark transition-colors"
                aria-label="Menüyü kapat"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 px-6 py-8 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-3 text-wood-dark font-medium text-base border-b border-cream hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-6 py-6 space-y-3 border-t border-cream">
              <Link
                href="/teklif-al"
                onClick={onClose}
                className="block w-full text-center py-3 bg-gold hover:bg-gold-dark text-wood-dark font-semibold rounded transition-colors"
              >
                Ücretsiz Teklif Al
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 border border-wood-medium text-wood-medium font-semibold rounded hover:bg-wood-medium hover:text-cream transition-colors"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-2 text-sm text-wood-medium hover:text-wood-dark transition-colors"
              >
                <Phone size={14} />
                {CONTACT_INFO.phone}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
