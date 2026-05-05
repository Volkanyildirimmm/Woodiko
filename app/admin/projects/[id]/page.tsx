'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [beforeFile, setBeforeFile] = useState<File | null>(null)
  const [afterFile, setAfterFile] = useState<File | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    location: '',
    category: '',
    style: '',
    duration: '',
    area: '',
    summary: '',
    challenge: '',
    solution: '',
    materials: '',
    beforeImage: '',
    afterImage: ''
  })

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, 'projects', params.id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const data = docSnap.data()
          setFormData({
            title: data.title || '',
            slug: data.slug || '',
            location: data.location || '',
            category: data.category || '',
            style: data.style || '',
            duration: data.duration || '',
            area: data.area || '',
            summary: data.summary || '',
            challenge: data.challenge || '',
            solution: data.solution || '',
            materials: Array.isArray(data.materials) ? data.materials.join('\n') : (data.materials || ''),
            beforeImage: data.beforeImage || '',
            afterImage: data.afterImage || ''
          })
        } else {
          alert('Proje bulunamadı!')
          router.push('/admin/projects')
        }
      } catch (error) {
        console.error("Proje yüklenirken hata:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      let beforeImageUrl = formData.beforeImage
      let afterImageUrl = formData.afterImage
      
      if (beforeFile) {
        const fileRef = ref(storage, `projects/before_${Date.now()}_${beforeFile.name}`)
        await uploadBytes(fileRef, beforeFile)
        beforeImageUrl = await getDownloadURL(fileRef)
      }
      
      if (afterFile) {
        const fileRef = ref(storage, `projects/after_${Date.now()}_${afterFile.name}`)
        await uploadBytes(fileRef, afterFile)
        afterImageUrl = await getDownloadURL(fileRef)
      }

      const projectData = {
        ...formData,
        materials: formData.materials.split('\n').filter(m => m.trim() !== ''),
        beforeImage: beforeImageUrl,
        afterImage: afterImageUrl,
        updatedAt: new Date().toISOString(),
      }

      await updateDoc(doc(db, 'projects', params.id), projectData)
      router.push('/admin/projects')
    } catch (error) {
      console.error('Hata:', error)
      alert('Güncelleme sırasında bir hata oluştu.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-10 text-center">Yükleniyor...</div>

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold text-wood-dark">Projeyi Düzenle</h2>
        <button 
          onClick={handleSubmit}
          disabled={saving}
          className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-cream">
          <CardHeader><CardTitle>Temel Bilgiler</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-wood-dark mb-1">Proje Adı</label>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Kategori</label>
                <input 
                  type="text" 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Tasarım Stili</label>
                <input 
                  type="text" 
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Konum</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Alan (m²)</label>
                <input 
                  type="text" 
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Süre</label>
                <input 
                  type="text" 
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-wood-dark mb-1">Kısa Özet</label>
              <textarea 
                value={formData.summary}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
                className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none min-h-[60px]" 
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-cream">
            <CardHeader><CardTitle>Görseller (Önce/Sonra)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-cream-light rounded-lg border border-cream">
                <label className="block text-sm font-bold text-wood-dark mb-2">ÖNCE Fotoğrafı (Yeni seçersen eskisi değişir)</label>
                {formData.beforeImage && <img src={formData.beforeImage} className="h-20 object-cover mb-2 rounded" alt="Before" />}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setBeforeFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm" 
                />
              </div>
              <div className="p-4 bg-cream-light rounded-lg border border-cream">
                <label className="block text-sm font-bold text-wood-dark mb-2">SONRA Fotoğrafı (Yeni seçersen eskisi değişir)</label>
                {formData.afterImage && <img src={formData.afterImage} className="h-20 object-cover mb-2 rounded" alt="After" />}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setAfterFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm" 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-cream">
            <CardHeader><CardTitle>Hikaye & Malzemeler</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Meydan Okuma</label>
                <textarea 
                  value={formData.challenge}
                  onChange={(e) => setFormData({...formData, challenge: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none min-h-[60px]" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Çözüm</label>
                <textarea 
                  value={formData.solution}
                  onChange={(e) => setFormData({...formData, solution: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none min-h-[60px]" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Kullanılan Malzemeler (Her satıra bir tane)</label>
                <textarea 
                  value={formData.materials}
                  onChange={(e) => setFormData({...formData, materials: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none min-h-[100px]" 
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
