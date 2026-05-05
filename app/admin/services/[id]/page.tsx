'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function EditServicePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    icon: ''
  })

  useEffect(() => {
    const fetchService = async () => {
      try {
        const docRef = doc(db, 'services', params.id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const data = docSnap.data()
          setFormData({
            title: data.title || '',
            slug: data.slug || '',
            description: data.description || '',
            icon: data.icon || ''
          })
        } else {
          alert('Hizmet bulunamadı!')
          router.push('/admin/services')
        }
      } catch (error) {
        console.error("Hizmet yüklenirken hata:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [params.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const serviceData = {
        ...formData,
        updatedAt: new Date().toISOString(),
      }

      await updateDoc(doc(db, 'services', params.id), serviceData)
      router.push('/admin/services')
    } catch (error) {
      console.error('Hata:', error)
      alert('Güncelleme sırasında bir hata oluştu.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-10 text-center">Yükleniyor...</div>

  return (
    <div className="space-y-6 pb-10 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold text-wood-dark">Hizmeti Düzenle</h2>
        <button 
          onClick={handleSubmit}
          disabled={saving}
          className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
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
            <label className="block text-sm font-medium text-wood-dark mb-1">URL (Slug)</label>
            <input 
              type="text" 
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none font-mono text-sm" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-wood-dark mb-1">İkon Adı</label>
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
