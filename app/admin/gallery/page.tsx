'use client'

import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2, UploadCloud, Loader2, Edit2 } from 'lucide-react'
import Image from 'next/image'

interface GalleryItem {
  id: string
  imageUrl: string
  title: string
  category: string
  altText?: string
}

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Mutfak Dolabı'
  })

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'gallery'))
      const galleryData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryItem[]
      
      setItems(galleryData)
    } catch (error) {
      console.error('Galeri çekilirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile) return alert('Lütfen bir görsel seçin.')

    setUploading(true)
    try {
      // Yükle
      const fileRef = ref(storage, `gallery/${Date.now()}_${imageFile.name}`)
      await uploadBytes(fileRef, imageFile)
      const url = await getDownloadURL(fileRef)

      // Veritabanına kaydet
      const newItem = {
        title: formData.title || 'İsimsiz',
        category: formData.category,
        imageUrl: url,
        altText: formData.title || 'Woodiko Görsel',
        createdAt: serverTimestamp()
      }

      const docRef = await addDoc(collection(db, 'gallery'), newItem)
      
      // Arayüzü güncelle
      setItems([{ id: docRef.id, ...newItem, createdAt: new Date() } as any, ...items])
      
      // Formu sıfırla
      setImageFile(null)
      setFormData({ title: '', category: 'Mutfak Dolabı' })
      ;(document.getElementById('gallery-file') as HTMLInputElement).value = ''
      
    } catch (error) {
      console.error('Hata:', error)
      alert('Yükleme başarısız. Lütfen Storage servisinin açık olduğundan emin olun.')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu görseli silmek istediğinize emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'gallery', id))
        setItems(items.filter(item => item.id !== id))
      } catch (error) {
        console.error('Silinirken hata oluştu:', error)
      }
    }
  }

  const handleEditAlt = async (id: string, currentAlt: string) => {
    const newAlt = prompt('Görsel için Alt Etiketi (SEO) girin:', currentAlt || '')
    if (newAlt !== null && newAlt.trim() !== '') {
      try {
        await updateDoc(doc(db, 'gallery', id), { altText: newAlt })
        setItems(items.map(item => item.id === id ? { ...item, altText: newAlt } : item))
      } catch (error) {
        console.error('Alt etiket güncellenirken hata:', error)
      }
    }
  }

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h2 className="text-3xl font-serif font-bold text-wood-dark">Galeri Yönetimi</h2>
        <p className="text-wood-medium mt-1">Sitedeki galeri sayfasına yeni görseller ekleyin.</p>
      </div>

      <Card className="border-cream bg-cream-light/50">
        <CardContent className="p-6">
          <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/3 space-y-1">
              <label className="text-sm font-medium text-wood-dark">Görsel Seç</label>
              <input 
                id="gallery-file"
                type="file" 
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                className="w-full text-sm border border-cream bg-white rounded-lg px-3 py-2" 
                required
              />
            </div>
            <div className="w-full md:w-1/4 space-y-1">
              <label className="text-sm font-medium text-wood-dark">Başlık (Opsiyonel)</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
                placeholder="Örn: Beyaz Lake Mutfak"
              />
            </div>
            <div className="w-full md:w-1/4 space-y-1">
              <label className="text-sm font-medium text-wood-dark">Kategori</label>
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
            <button 
              type="submit"
              disabled={uploading}
              className="w-full md:w-auto px-6 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {uploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />} 
              Yükle
            </button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-bold text-wood-dark mb-4 border-b border-cream pb-2">Mevcut Görseller ({items.length})</h3>
        {loading ? (
          <div className="text-center py-10 text-wood-medium">Yükleniyor...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-10 text-wood-medium bg-white rounded-xl border border-cream">
            Henüz galeriye görsel eklenmemiş.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {items.map((item) => (
              <div key={item.id} className="group relative bg-cream rounded-xl overflow-hidden border border-cream shadow-sm hover:shadow-md transition-all">
                <div className="relative aspect-square">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-wood-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => handleEditAlt(item.id, item.altText || item.title)}
                      className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg"
                      title="Alt Etiketini Düzenle (SEO)"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors shadow-lg"
                      title="Sil"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <div className="text-sm font-bold text-wood-dark truncate" title={item.title}>
                    {item.title}
                  </div>
                  <div className="text-xs text-wood-medium/60 mt-0.5 truncate" title={`Alt: ${item.altText || item.title}`}>
                    Alt: {item.altText || item.title} • {item.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
