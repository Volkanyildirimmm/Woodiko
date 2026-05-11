'use client'

import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'

export default function NewTestimonialPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    text: '',
    rating: 5,
    service: 'Mutfak Dolabı',
    image: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      let imageUrl = formData.image
      if (avatarFile) {
        const fileRef = ref(storage, `testimonials/avatar_${Date.now()}_${avatarFile.name}`)
        await uploadBytes(fileRef, avatarFile)
        imageUrl = await getDownloadURL(fileRef)
      }

      await addDoc(collection(db, 'testimonials'), {
        ...formData,
        image: imageUrl,
        createdAt: new Date().toISOString(),
      })
      router.push('/admin/testimonials')
    } catch (error) {
      console.error('Hata:', error)
      alert('Yorum eklenirken bir hata oluştu.')
    } finally {
      setSaving(false)
    }
  }

  const avatarPreview = avatarFile ? URL.createObjectURL(avatarFile) : ''

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold text-wood-dark">Yeni Yorum Ekle</h2>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? 'Kaydediliyor...' : 'Yorumu Kaydet'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-cream">
          <CardHeader><CardTitle>Müşteri Bilgileri</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-wood-dark mb-1">Ad Soyad</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none"
                placeholder="Örn. Ayşe Yılmaz"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-wood-dark mb-1">Konum</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none"
                placeholder="Örn. Ümitköy, Ankara"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-wood-dark mb-1">Hizmet</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none bg-white"
              >
                <option>Mutfak Dolabı</option>
                <option>Banyo Dolabı</option>
                <option>Yatak Odası</option>
                <option>Gardırop</option>
                <option>Giyinme Odası</option>
                <option>TV Ünitesi</option>
                <option>Diğer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-wood-dark mb-2">Puan</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: n })}
                    className="p-1"
                  >
                    <Star
                      size={28}
                      className={n <= formData.rating ? 'text-gold' : 'text-wood-medium/30'}
                      fill={n <= formData.rating ? 'currentColor' : 'none'}
                    />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-cream">
            <CardHeader><CardTitle>Avatar (Opsiyonel)</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4">
                {avatarPreview && <img src={avatarPreview} alt="Yeni avatar" className="w-16 h-16 rounded-full object-cover border-2 border-gold" />}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files ? e.target.files[0] : null)}
                  className="text-sm"
                />
              </div>
              <p className="text-xs text-wood-medium/60">Yüklemezsen varsayılan ikon kullanılır.</p>
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">veya Avatar URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none text-sm"
                  placeholder="https://..."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-cream">
            <CardHeader><CardTitle>Yorum Metni</CardTitle></CardHeader>
            <CardContent>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none min-h-[140px]"
                placeholder="Müşterinin yorumunu buraya yazın..."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
