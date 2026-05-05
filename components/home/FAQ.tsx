'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '@/lib/constants'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <AnimatedSection className="text-center mb-12">
          <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">Soru & Cevap</p>
          <h2 className="font-serif text-3xl md:text-4xl text-wood-dark font-bold">
            Sıkça Sorulan Sorular
          </h2>
        </AnimatedSection>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.04}>
              <div className="bg-white rounded-2xl shadow-lg shadow-wood-dark/5 border border-transparent overflow-hidden transition-all hover:shadow-xl">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-6 text-left gap-4"
                  aria-expanded={open === i}
                >
                  <span className="font-semibold text-wood-dark text-base md:text-lg pr-2">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-gold bg-gold/10 p-1.5 rounded-full"
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 text-wood-medium/80 text-base leading-relaxed border-t border-cream pt-5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
