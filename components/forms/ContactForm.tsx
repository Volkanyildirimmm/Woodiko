'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Loader2, CheckCircle2 } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalı'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin'),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalı'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
        reset()
      }
    } catch {
      // handle error silently, show generic message
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle2 size={48} className="text-gold mb-4" />
        <h3 className="font-serif text-xl font-bold text-wood-dark mb-2">Mesajınız Alındı!</h3>
        <p className="text-wood-medium/70 text-sm">En geç 24 saat içinde sizinle iletişime geçeceğiz.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-wood-dark mb-1.5">
            Ad Soyad <span className="text-gold">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            {...register('name')}
            className="w-full px-4 py-2.5 bg-cream-light border border-cream rounded-lg text-wood-dark text-sm placeholder:text-wood-medium/40 focus:outline-none focus:border-gold transition-colors"
            placeholder="Ahmet Yılmaz"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-wood-dark mb-1.5">
            Telefon <span className="text-gold">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            {...register('phone')}
            className="w-full px-4 py-2.5 bg-cream-light border border-cream rounded-lg text-wood-dark text-sm placeholder:text-wood-medium/40 focus:outline-none focus:border-gold transition-colors"
            placeholder="0532 000 00 00"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-wood-dark mb-1.5">
          E-posta <span className="text-gold">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className="w-full px-4 py-2.5 bg-cream-light border border-cream rounded-lg text-wood-dark text-sm placeholder:text-wood-medium/40 focus:outline-none focus:border-gold transition-colors"
          placeholder="ahmet@ornek.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-wood-dark mb-1.5">
          Mesaj <span className="text-gold">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          {...register('message')}
          className="w-full px-4 py-2.5 bg-cream-light border border-cream rounded-lg text-wood-dark text-sm placeholder:text-wood-medium/40 focus:outline-none focus:border-gold transition-colors resize-none"
          placeholder="Hangi konuda bilgi almak istiyorsunuz?"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-3 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Gönderiliyor...
          </>
        ) : (
          <>
            <Send size={16} />
            Mesaj Gönder
          </>
        )}
      </button>
    </form>
  )
}
