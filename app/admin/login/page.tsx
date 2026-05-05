'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/admin')
    } catch (err: any) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-light">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-cream">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-wood-dark rounded-xl mb-4">
            <span className="text-2xl font-serif font-bold text-gold">W</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-wood-dark">Admin Girişi</h1>
          <p className="text-sm text-wood-medium/70 mt-2">Yönetim paneline erişmek için giriş yapın.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-wood-dark mb-1.5">
              E-posta Adresi
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-cream focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-wood-dark mb-1.5">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-cream focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  )
}
