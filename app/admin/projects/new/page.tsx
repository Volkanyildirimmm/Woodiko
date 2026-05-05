'use client'

import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [beforeFile, setBeforeFile] = useState<File | null>(null)
  const [afterFile, setAfterFile] = useState<File | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    location: '',
    category: 'Mutfak Dolabı',
    style: 'Modern',
    duration: '',
    area: '',
    summary: '',
    challenge: '',
    solution: '',
    materials: '',
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
      let beforeImageUrl = ''
      let afterImageUrl = ''
      
      // Resimleri Storage'a yükle
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

      // Veritabanına kaydet
      const projectData = {
        ...formData,
        materials: formData.materials.split('\n').filter(m => m.trim() !== ''),
        beforeImage: beforeImageUrl,
        afterImage: afterImageUrl,
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, 'projects'), projectData)
      router.push('/admin/projects')
    } catch (error) {
      console.error('Hata:', error)
      alert('Yükleme sırasında bir hata oluştu. Lütfen Firebase Storage\'ı aktif ettiğinizden emin olun.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold text-wood-dark">Yeni Proje Ekle</h2>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Kaydediliyor...' : 'Projeyi Yayınla'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-cream">
          <CardHeader>
            <CardTitle>Temel Bilgiler</CardTitle>
          </CardHeader>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Kategori</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none"
                >
                  <option>Mutfak Dolabı</option>
                  <option>Yatak Odası</option>
                  <option>Giyinme Odası</option>
                  <option>Banyo Dolabı</option>
                  <option>Gardırop</option>
                  <option>TV Ünitesi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Tasarım Stili</label>
                <input 
                  type="text" 
                  value={formData.style}
                  onChange={(e) => setFormData({...formData, style: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
                  placeholder="Modern, Klasik vb."
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
                  placeholder="Yaşamkent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Alan (m²)</label>
                <input 
                  type="text" 
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
                  placeholder="14 m²"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Süre</label>
                <input 
                  type="text" 
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
                  placeholder="4 Hafta"
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
            <CardHeader>
              <CardTitle>Görseller (Önce/Sonra)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-cream-light rounded-lg border border-cream">
                <label className="block text-sm font-bold text-wood-dark mb-2">ÖNCE Fotoğrafı</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setBeforeFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm" 
                />
              </div>
              <div className="p-4 bg-cream-light rounded-lg border border-cream">
                <label className="block text-sm font-bold text-wood-dark mb-2">SONRA Fotoğrafı (Kapak)</label>
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
            <CardHeader>
              <CardTitle>Hikaye & Malzemeler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Meydan Okuma (Challenge)</label>
                <textarea 
                  value={formData.challenge}
                  onChange={(e) => setFormData({...formData, challenge: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none min-h-[80px]" 
                  placeholder="Proje öncesi mevcut sorun neydi?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Çözüm (Solution)</label>
                <textarea 
                  value={formData.solution}
                  onChange={(e) => setFormData({...formData, solution: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none min-h-[80px]" 
                  placeholder="Nasıl bir tasarım ve çözüm uygulandı?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-dark mb-1">Kullanılan Malzemeler (Her satıra bir tane)</label>
                <textarea 
                  value={formData.materials}
                  onChange={(e) => setFormData({...formData, materials: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none min-h-[100px]" 
                  placeholder="Akrilik beyaz kapak (mat)&#10;Kompakt granit tezgah&#10;Blum çekmece sistemi"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
