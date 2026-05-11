'use client'

import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2, UploadCloud, Loader2, Edit2, Plus, Check } from 'lucide-react'
import Image from 'next/image'

interface GalleryItem {
  id: string
  imageUrl: string
  title: string
  category: string
  altText?: string
}

interface SiteImage {
  url: string
  source: string
  defaultTitle: string
  defaultCategory: string
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

  const [siteImages, setSiteImages] = useState<SiteImage[]>([])
  const [siteImagesLoading, setSiteImagesLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<SiteImage | null>(null)
  const [pickTitle, setPickTitle] = useState('')
  const [pickCategory, setPickCategory] = useState('Mutfak Dolabı')
  const [addingFromSite, setAddingFromSite] = useState(false)

  useEffect(() => {
    fetchGallery()
    fetchSiteImages()
  }, [])

  const fetchSiteImages = async () => {
    try {
      const collected: SiteImage[] = []
      const projSnap = await getDocs(collection(db, 'projects'))
      projSnap.docs.forEach((d) => {
        const p = d.data() as any
        if (p.beforeImage) collected.push({ url: p.beforeImage, source: `Proje: ${p.title || p.slug} (Önce)`, defaultTitle: `${p.title || ''} — Önce`.trim(), defaultCategory: p.category || 'Mutfak Dolabı' })
        if (p.afterImage) collected.push({ url: p.afterImage, source: `Proje: ${p.title || p.slug} (Sonra)`, defaultTitle: `${p.title || ''} — Sonra`.trim(), defaultCategory: p.category || 'Mutfak Dolabı' })
        if (Array.isArray(p.gallery)) {
          p.gallery.forEach((url: string, i: number) => {
            collected.push({ url, source: `Proje: ${p.title || p.slug} (Galeri ${i + 1})`, defaultTitle: `${p.title || ''} — ${i + 1}`.trim(), defaultCategory: p.category || 'Mutfak Dolabı' })
          })
        }
      })
      const blogSnap = await getDocs(collection(db, 'blogs'))
      blogSnap.docs.forEach((d) => {
        const b = d.data() as any
        if (b.coverImage) collected.push({ url: b.coverImage, source: `Blog: ${b.title || b.slug}`, defaultTitle: b.title || '', defaultCategory: b.category || 'Mutfak Dolabı' })
      })
      const seen = new Set<string>()
      const unique = collected.filter((it) => {
        if (seen.has(it.url)) return false
        seen.add(it.url)
        return true
      })
      setSiteImages(unique)
    } catch (err) {
      console.error('Site görselleri çekilirken hata:', err)
    } finally {
      setSiteImagesLoading(false)
    }
  }

  const isAlreadyInGallery = (url: string) => items.some((it) => it.imageUrl === url)

  const selectSiteImage = (img: SiteImage) => {
    setSelectedImage(img)
    setPickTitle(img.defaultTitle)
    setPickCategory(img.defaultCategory)
  }

  const handleAddFromSite = async () => {
    if (!selectedImage) return
    setAddingFromSite(true)
    try {
      const newItem = {
        title: pickTitle || 'İsimsiz',
        category: pickCategory,
        imageUrl: selectedImage.url,
        createdAt: serverTimestamp()
      }
      const docRef = await addDoc(collection(db, 'gallery'), newItem)
      setItems([{ id: docRef.id, ...newItem, createdAt: new Date() } as any, ...items])
      setSelectedImage(null)
      setPickTitle('')
    } catch (err) {
      console.error('Hata:', err)
      alert('Galeriye eklerken hata oluştu.')
    } finally {
      setAddingFromSite(false)
    }
  }

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

      <Card className="border-cream">
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-wood-dark">Site içi görsellerden seç</h3>
            <p className="text-sm text-wood-medium/70 mt-1">Projelere ve blog yazılarına yüklediğin görseller — tıklayıp başlık ekleyerek galeriye gönder.</p>
          </div>

          {siteImagesLoading ? (
            <div className="text-center py-8 text-wood-medium"><Loader2 className="animate-spin inline" size={24} /></div>
          ) : siteImages.length === 0 ? (
            <div className="text-center py-8 text-wood-medium/70 text-sm">Proje veya blogda henüz görsel yok.</div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-[420px] overflow-y-auto p-1">
              {siteImages.map((img, i) => {
                const used = isAlreadyInGallery(img.url)
                const selected = selectedImage?.url === img.url
                return (
                  <button
                    key={img.url + i}
                    type="button"
                    onClick={() => selectSiteImage(img)}
                    title={img.source + (used ? ' — Zaten galeride' : '')}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selected ? 'border-gold ring-2 ring-gold/40' : used ? 'border-green-500/40 opacity-60' : 'border-cream hover:border-gold/50'
                    }`}
                  >
                    <Image src={img.url} alt={img.source} fill className="object-cover" sizes="120px" />
                    {used && (
                      <span className="absolute top-1 right-1 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                        <Check size={10} /> Eklendi
                      </span>
                    )}
                    {selected && (
                      <span className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                        <span className="bg-gold text-wood-dark rounded-full p-1.5"><Check size={14} /></span>
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {selectedImage && (
            <div className="flex flex-col md:flex-row gap-3 items-end pt-4 border-t border-cream">
              <div className="w-24 h-24 relative rounded-lg overflow-hidden border-2 border-gold flex-shrink-0">
                <Image src={selectedImage.url} alt="Seçili" fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-sm font-medium text-wood-dark">Başlık</label>
                <input
                  type="text"
                  value={pickTitle}
                  onChange={(e) => setPickTitle(e.target.value)}
                  placeholder="Galeride gözükecek başlık"
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none"
                />
                <p className="text-xs text-wood-medium/60">Kaynak: {selectedImage.source}</p>
              </div>
              <div className="w-full md:w-48 space-y-1">
                <label className="text-sm font-medium text-wood-dark">Kategori</label>
                <select
                  value={pickCategory}
                  onChange={(e) => setPickCategory(e.target.value)}
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
                onClick={handleAddFromSite}
                disabled={addingFromSite}
                className="w-full md:w-auto px-6 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {addingFromSite ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                Galeriye Ekle
              </button>
            </div>
          )}
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
