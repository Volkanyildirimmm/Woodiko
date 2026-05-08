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
  const [uploadStatus, setUploadStatus] = useState('')
  const [beforeFile, setBeforeFile] = useState<File | null>(null)
  const [afterFile, setAfterFile] = useState<File | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])

  const beforePreview = beforeFile ? URL.createObjectURL(beforeFile) : ''
  const afterPreview = afterFile ? URL.createObjectURL(afterFile) : ''

  const [formData, setFormData] = useState<{
    title: string
    slug: string
    location: string
    category: string
    style: string
    duration: string
    area: string
    summary: string
    challenge: string
    solution: string
    materials: string
    beforeImage: string
    afterImage: string
    gallery: string[]
  }>({
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
    afterImage: '',
    gallery: []
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
            afterImage: data.afterImage || '',
            gallery: Array.isArray(data.gallery) ? data.gallery : []
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
    setUploadStatus('Hazırlanıyor...')

    try {
      let beforeImageUrl = formData.beforeImage
      let afterImageUrl = formData.afterImage

      if (beforeFile) {
        setUploadStatus('ÖNCE fotoğrafı yükleniyor...')
        const fileRef = ref(storage, `projects/before_${Date.now()}_${beforeFile.name}`)
        await uploadBytes(fileRef, beforeFile)
        beforeImageUrl = await getDownloadURL(fileRef)
      }

      if (afterFile) {
        setUploadStatus('SONRA fotoğrafı yükleniyor...')
        const fileRef = ref(storage, `projects/after_${Date.now()}_${afterFile.name}`)
        await uploadBytes(fileRef, afterFile)
        afterImageUrl = await getDownloadURL(fileRef)
      }

      const uploadedGalleryUrls: string[] = []
      for (let i = 0; i < galleryFiles.length; i++) {
        setUploadStatus(`Galeri görseli yükleniyor (${i + 1}/${galleryFiles.length})...`)
        const f = galleryFiles[i]
        const fileRef = ref(storage, `projects/gallery_${Date.now()}_${i}_${f.name}`)
        await uploadBytes(fileRef, f)
        uploadedGalleryUrls.push(await getDownloadURL(fileRef))
      }
      const mergedGallery = [...formData.gallery, ...uploadedGalleryUrls]
      setUploadStatus('Kaydediliyor...')

      const projectData = {
        ...formData,
        materials: formData.materials.split('\n').filter(m => m.trim() !== ''),
        beforeImage: beforeImageUrl,
        afterImage: afterImageUrl,
        gallery: mergedGallery,
        updatedAt: new Date().toISOString(),
      }

      await updateDoc(doc(db, 'projects', params.id), projectData)
      setUploadStatus('Tamamlandı ✓')
      router.push('/admin/projects')
    } catch (error) {
      console.error('Hata:', error)
      alert('Güncelleme sırasında bir hata oluştu.')
    } finally {
      setSaving(false)
      setUploadStatus('')
    }
  }

  if (loading) return <div className="p-10 text-center">Yükleniyor...</div>

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold text-wood-dark">Projeyi Düzenle</h2>
        <div className="flex items-center gap-3">
          {saving && uploadStatus && (
            <span className="text-sm text-wood-medium flex items-center gap-2">
              <span className="inline-block w-3 h-3 border-2 border-gold border-t-transparent rounded-full animate-spin" />
              {uploadStatus}
            </span>
          )}
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
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
                <div className="flex items-center gap-3 mb-2">
                  {formData.beforeImage && (
                    <div>
                      <img src={formData.beforeImage} className="h-20 w-28 object-cover rounded border border-cream" alt="Before" />
                      <p className="text-xs text-wood-medium/60 mt-1">Mevcut</p>
                    </div>
                  )}
                  {beforePreview && (
                    <div>
                      <img src={beforePreview} className="h-20 w-28 object-cover rounded border-2 border-gold" alt="Yeni Before" />
                      <p className="text-xs text-gold font-semibold mt-1">Yeni (kaydedilecek)</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBeforeFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm"
                />
                {beforeFile && (
                  <p className="text-xs text-wood-medium/80 mt-2">
                    ✓ Seçildi: <span className="font-medium">{beforeFile.name}</span> ({(beforeFile.size / 1024).toFixed(0)} KB) — kaydedince yüklenecek
                  </p>
                )}
              </div>
              <div className="p-4 bg-cream-light rounded-lg border border-cream">
                <label className="block text-sm font-bold text-wood-dark mb-2">SONRA Fotoğrafı (Yeni seçersen eskisi değişir)</label>
                <div className="flex items-center gap-3 mb-2">
                  {formData.afterImage && (
                    <div>
                      <img src={formData.afterImage} className="h-20 w-28 object-cover rounded border border-cream" alt="After" />
                      <p className="text-xs text-wood-medium/60 mt-1">Mevcut</p>
                    </div>
                  )}
                  {afterPreview && (
                    <div>
                      <img src={afterPreview} className="h-20 w-28 object-cover rounded border-2 border-gold" alt="Yeni After" />
                      <p className="text-xs text-gold font-semibold mt-1">Yeni (kaydedilecek)</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAfterFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm"
                />
                {afterFile && (
                  <p className="text-xs text-wood-medium/80 mt-2">
                    ✓ Seçildi: <span className="font-medium">{afterFile.name}</span> ({(afterFile.size / 1024).toFixed(0)} KB) — kaydedince yüklenecek
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-cream">
            <CardHeader><CardTitle>Proje Galerisi</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {formData.gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {formData.gallery.map((url, i) => (
                    <div key={i} className="relative group">
                      <img src={url} alt={`Galeri ${i + 1}`} className="w-full h-20 object-cover rounded border border-cream" />
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          gallery: formData.gallery.filter((_, idx) => idx !== i)
                        })}
                        className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Sil
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="p-4 bg-cream-light rounded-lg border border-cream">
                <label className="block text-sm font-bold text-wood-dark mb-2">Yeni Galeri Görselleri Ekle (çoklu seçim)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setGalleryFiles(e.target.files ? Array.from(e.target.files) : [])}
                  className="w-full text-sm"
                />
                {galleryFiles.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gold font-semibold mb-2">✓ {galleryFiles.length} yeni dosya seçildi — kaydedince yüklenecek</p>
                    <div className="grid grid-cols-4 gap-2">
                      {galleryFiles.map((f, i) => (
                        <div key={i} className="relative">
                          <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-16 object-cover rounded border-2 border-gold" />
                          <p className="text-[10px] text-wood-medium/70 truncate mt-0.5" title={f.name}>{f.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
