'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight, Quote, User } from 'lucide-react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { TESTIMONIALS as STATIC_TESTIMONIALS } from '@/lib/constants'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

interface Testimonial {
  id: string | number
  name: string
  location: string
  text: string
  rating: number
  service: string
  image: string
}

export function Testimonials() {
  const [TESTIMONIALS, setTestimonials] = useState<Testimonial[]>(STATIC_TESTIMONIALS as Testimonial[])
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'testimonials'), orderBy('createdAt', 'desc')))
        const remote = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Testimonial[]
        if (remote.length > 0) setTestimonials(remote)
      } catch (err) {
        console.error('Testimonials fetch failed, using static:', err)
      }
    }
    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (TESTIMONIALS.length === 0) return
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [TESTIMONIALS.length])

  if (TESTIMONIALS.length === 0) return null
  const safeIndex = Math.min(current, TESTIMONIALS.length - 1)

  const go = (i: number, dir: number) => {
    setDirection(dir)
    setCurrent(i)
  }

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-wood-medium/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">Müşteri Yorumları</p>
          <h2 className="font-serif text-3xl md:text-4xl text-wood-dark font-bold">
            Müşterilerimiz Ne Diyor?
          </h2>
        </AnimatedSection>

        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={safeIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-cream rounded-2xl p-8 md:p-12 shadow-sm"
              >
                <Quote className="text-gold/30 mb-4" size={40} />
                <p className="text-wood-dark text-base md:text-lg leading-relaxed mb-8 italic">
                  &ldquo;{TESTIMONIALS[safeIndex].text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  {TESTIMONIALS[safeIndex].image ? (
                    <Image
                      src={TESTIMONIALS[safeIndex].image}
                      alt={TESTIMONIALS[safeIndex].name}
                      width={52}
                      height={52}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-[52px] h-[52px] rounded-full bg-gold/20 text-gold flex items-center justify-center">
                      <User size={24} />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-wood-dark">{TESTIMONIALS[safeIndex].name}</p>
                    <p className="text-wood-medium/70 text-sm">{TESTIMONIALS[safeIndex].location}</p>
                    <p className="text-gold/70 text-xs mt-0.5">{TESTIMONIALS[safeIndex].service}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: TESTIMONIALS[safeIndex].rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-gold" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go((safeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, -1)}
              className="w-9 h-9 rounded-full border border-wood-medium/30 text-wood-medium hover:border-gold hover:text-gold transition-colors flex items-center justify-center"
              aria-label="Önceki yorum"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > safeIndex ? 1 : -1)}
                  className={`transition-all ${i === safeIndex ? 'w-6 h-2 bg-gold rounded-full' : 'w-2 h-2 bg-wood-medium/30 rounded-full hover:bg-gold/50'}`}
                  aria-label={`${i + 1}. yoruma git`}
                />
              ))}
            </div>
            <button
              onClick={() => go((safeIndex + 1) % TESTIMONIALS.length, 1)}
              className="w-9 h-9 rounded-full border border-wood-medium/30 text-wood-medium hover:border-gold hover:text-gold transition-colors flex items-center justify-center"
              aria-label="Sonraki yorum"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
