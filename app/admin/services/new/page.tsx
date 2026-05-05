'use client'

import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NewServicePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    icon: 'wrench'
  })

  const handleSlugGenerate = () => {
    const generatedSlug = formData.title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    
    setFormData(prev => ({ ...prev, slug: generatedSlug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const serviceData = {
        ...formData,
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, 'services'), serviceData)
      router.push('/admin/services')
    } catch (error) {
      console.error('Hata:', error)
      alert('Yükleme sırasında bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 pb-10 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold text-wood-dark">Yeni Hizmet Ekle</h2>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Kaydediliyor...' : 'Yayınla'}
        </button>
      </div>

      <Card className="border-cream">
        <CardHeader><CardTitle>Hizmet Bilgileri</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-wood-dark mb-1">Hizmet Adı</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-wood-dark mb-1">
              URL (Slug) 
              <button type="button" onClick={handleSlugGenerate} className="text-gold ml-2 text-xs hover:underline">Başlıktan Oluştur</button>
            </label>
            <input 
              type="text" 
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none font-mono text-sm" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-wood-dark mb-1">İkon Adı (örn: wrench, star, vb.)</label>
            <input 
              type="text" 
              value={formData.icon}
              onChange={(e) => setFormData({...formData, icon: e.target.value})}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-wood-dark mb-1">Açıklama</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none min-h-[120px]" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
