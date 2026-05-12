'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, CheckCircle2, Loader2, MessageCircle } from 'lucide-react'
import { SERVICES, WHATSAPP_NUMBER } from '@/lib/constants'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { trackLead, trackContact } from '@/lib/meta-events'
import { trackGoogleAdsConversion } from '@/lib/google-ads'

const schema = z.object({
  service: z.string().min(1, 'Lütfen bir hizmet seçin'),
  area: z.number().min(1).max(100),
  budget: z.string().min(1, 'Lütfen bütçe aralığı seçin'),
  district: z.string().min(2, 'Semt adı girin'),
  name: z.string().min(2, 'İsim en az 2 karakter'),
  phone: z.string().min(10, 'Geçerli telefon numarası girin'),
  email: z.string().email('Geçerli e-posta adresi girin'),
  note: z.string().optional(),
  kvkk: z.literal(true, {
    errorMap: () => ({ message: 'Devam etmek için KVKK onayı vermelisiniz' }),
  }),
})

type FormData = z.infer<typeof schema>

const BUDGETS = [
  { value: '50-100K', label: '50.000₺ – 100.000₺' },
  { value: '100-200K', label: '100.000₺ – 200.000₺' },
  { value: '200-350K', label: '200.000₺ – 350.000₺' },
  { value: '350K+', label: '350.000₺ ve üzeri' },
  { value: 'bilmiyorum', label: 'Henüz bilmiyorum' },
]

const STEPS = ['Hizmet', 'Alan & Bütçe', 'İletişim', 'Onay']

export function QuoteForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [areaValue, setAreaValue] = useState(10)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { area: 10 },
  })

  const watchedService = watch('service')
  const watchedBudget = watch('budget')

  const next = async () => {
    const fieldsPerStep: (keyof FormData)[][] = [
      ['service'],
      ['area', 'budget'],
      ['district', 'name', 'phone', 'email'],
    ]
    const valid = await trigger(fieldsPerStep[step])
    if (valid) setStep((s) => Math.min(s + 1, 3))
  }

  const onSubmit = async (data: FormData) => {
    try {
      await addDoc(collection(db, 'forms'), {
        ...data,
        status: 'yeni',
        createdAt: serverTimestamp()
      })

      const leadPayload = {
        service: data.service,
        district: data.district,
        budget: data.budget,
        email: data.email,
        phone: data.phone,
      }
      trackLead(leadPayload)
      trackGoogleAdsConversion()

      setSubmitted(true)
    } catch (error) {
      console.error('Form gönderilirken hata:', error)
      alert('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  if (submitted) {
    const waText = encodeURIComponent('Merhaba! Az önce teklif formu doldurdum. Bilgi almak istiyorum.')
    return (
      <div className="text-center py-10 space-y-6">
        <CheckCircle2 size={60} className="text-gold mx-auto" />
        <div>
          <h2 className="font-serif text-2xl font-bold text-wood-dark mb-2">Talebiniz Alındı!</h2>
          <p className="text-wood-medium/70">En geç <strong>24 saat</strong> içinde sizi arayacağız.</p>
        </div>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackContact({ method: 'whatsapp', surface: 'quote_success' })
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
        >
          <MessageCircle size={18} />
          WhatsApp ile Hemen Yazın
        </a>
      </div>
    )
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors ${i <= step ? 'bg-gold text-wood-dark' : 'bg-cream border border-cream text-wood-medium/40'}`}>
              {i < step ? <CheckCircle2 size={16} /> : i + 1}
            </div>
            <span className={`hidden sm:block ml-2 text-xs font-medium ${i <= step ? 'text-wood-dark' : 'text-wood-medium/40'}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`w-6 sm:w-12 h-px mx-2 transition-colors ${i < step ? 'bg-gold' : 'bg-cream'}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait">
          {/* Step 0: Hizmet */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="font-serif text-xl font-bold text-wood-dark mb-5">Hangi mobilyayı yaptırmak istiyorsunuz?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICES.map((s) => (
                  <label
                    key={s.slug}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${watchedService === s.slug ? 'border-gold bg-gold/10 text-wood-dark' : 'border-cream bg-cream-light text-wood-medium/70 hover:border-gold/40'}`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      value={s.slug}
                      {...register('service')}
                    />
                    <span className="font-semibold text-sm">{s.title}</span>
                  </label>
                ))}
              </div>
              {errors.service && <p className="text-red-500 text-sm">{errors.service.message}</p>}
            </motion.div>
          )}

          {/* Step 1: Alan & Bütçe */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-xl font-bold text-wood-dark mb-5">Yaklaşık alan ve bütçeniz?</h2>
                <label className="block text-sm font-semibold text-wood-dark mb-3">
                  Yaklaşık metrekare: <span className="text-gold font-bold text-lg">{areaValue} m²</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={areaValue}
                  onChange={(e) => {
                    const val = parseInt(e.target.value)
                    setAreaValue(val)
                    setValue('area', val)
                  }}
                  className="w-full h-2 bg-cream rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between text-xs text-wood-medium/50 mt-1">
                  <span>1 m²</span>
                  <span>50 m²</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-wood-dark mb-3">Bütçe aralığınız</label>
                <div className="space-y-2">
                  {BUDGETS.map((b) => (
                    <label
                      key={b.value}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${watchedBudget === b.value ? 'border-gold bg-gold/10' : 'border-cream bg-cream-light hover:border-gold/40'}`}
                    >
                      <input type="radio" className="sr-only" value={b.value} {...register('budget')} />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${watchedBudget === b.value ? 'border-gold' : 'border-wood-medium/30'}`}>
                        {watchedBudget === b.value && <div className="w-2 h-2 rounded-full bg-gold" />}
                      </div>
                      <span className={`text-sm font-medium ${watchedBudget === b.value ? 'text-wood-dark' : 'text-wood-medium/70'}`}>
                        {b.label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
              </div>
            </motion.div>
          )}

          {/* Step 2: İletişim */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="font-serif text-xl font-bold text-wood-dark mb-5">İletişim bilgileriniz</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-wood-dark mb-1.5">Semt / İlçe <span className="text-gold">*</span></label>
                  <input
                    type="text"
                    {...register('district')}
                    placeholder="Yaşamkent, Çayyolu..."
                    className="w-full px-4 py-2.5 bg-cream-light border border-cream rounded-lg text-sm text-wood-dark focus:outline-none focus:border-gold"
                  />
                  {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-wood-dark mb-1.5">Ad Soyad <span className="text-gold">*</span></label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Adınız"
                    autoComplete="name"
                    className="w-full px-4 py-2.5 bg-cream-light border border-cream rounded-lg text-sm text-wood-dark focus:outline-none focus:border-gold"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-wood-dark mb-1.5">Telefon <span className="text-gold">*</span></label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="0532 000 00 00"
                    autoComplete="tel"
                    className="w-full px-4 py-2.5 bg-cream-light border border-cream rounded-lg text-sm text-wood-dark focus:outline-none focus:border-gold"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-wood-dark mb-1.5">E-posta <span className="text-gold">*</span></label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="e-posta@ornek.com"
                    autoComplete="email"
                    className="w-full px-4 py-2.5 bg-cream-light border border-cream rounded-lg text-sm text-wood-dark focus:outline-none focus:border-gold"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1.5">Ek not (isteğe bağlı)</label>
                <textarea
                  {...register('note')}
                  rows={3}
                  placeholder="Özel isteklerinizi veya notlarınızı yazabilirsiniz..."
                  className="w-full px-4 py-2.5 bg-cream-light border border-cream rounded-lg text-sm text-wood-dark focus:outline-none focus:border-gold resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Onay */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="font-serif text-xl font-bold text-wood-dark mb-5">Bilgilerinizi onaylayın</h2>
              <div className="bg-cream-light rounded-xl p-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-wood-medium/60">Hizmet</span>
                  <span className="font-medium text-wood-dark">{SERVICES.find((s) => s.slug === watchedService)?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-wood-medium/60">Yaklaşık Alan</span>
                  <span className="font-medium text-wood-dark">{areaValue} m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-wood-medium/60">Bütçe</span>
                  <span className="font-medium text-wood-dark">{BUDGETS.find((b) => b.value === watchedBudget)?.label}</span>
                </div>
              </div>
              <label className="flex items-start gap-3 p-4 bg-cream-light border border-cream rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  {...register('kvkk')}
                  className="mt-0.5 w-4 h-4 accent-gold shrink-0"
                />
                <span className="text-wood-medium/80 text-xs leading-relaxed">
                  KVKK kapsamında kişisel verilerimin işlenmesine ve{' '}
                  <a
                    href="/kvkk-aydinlatma-metni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    Aydınlatma Metni
                  </a>
                  &apos;nde belirtilen şekilde kullanılmasına onay veriyorum.{' '}
                  <span className="text-gold">*</span>
                </span>
              </label>
              {errors.kvkk && (
                <p className="text-red-500 text-xs mt-1">{errors.kvkk.message as string}</p>
              )}

              <p className="text-wood-medium/60 text-xs leading-relaxed">
                Formu göndererek <strong>Woodiko</strong>&apos;nun sizi 24 saat içinde aramasını onaylıyorsunuz. Bilgileriniz üçüncü taraflarla paylaşılmaz.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 px-5 py-3 border border-wood-medium/30 text-wood-medium font-semibold rounded-lg hover:bg-cream transition-colors"
            >
              <ChevronLeft size={16} />
              Geri
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors"
            >
              Devam Et
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors disabled:opacity-60"
            >
              {isSubmitting ? (
                <><Loader2 size={16} className="animate-spin" /> Gönderiliyor...</>
              ) : (
                <>Teklif Talep Et <CheckCircle2 size={16} /></>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
