'use client'

import { useState, useRef, useMemo } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import 'react-quill/dist/quill.snow.css'

// Dinamik olarak Quill import
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Editör yükleniyor...</p> })

export default function NewBlogPage() {
  const router = useRouter()
  const quillRef = useRef<any>(null)
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Mutfak',
    author: 'Woodiko Ekibi',
    excerpt: '',
    content: '',
    seoTitle: '',
    seoDescription: '',
    focusKeywords: '',
    coverImageAlt: '',
    canonicalUrl: '', // Gelişmiş SEO
    tags: '', // Gelişmiş SEO
    conclusion: '', // Yazı sonu CTA özeti
  })

  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([])

  const addFaq = () => setFaqs(prev => [...prev, { question: '', answer: '' }])
  const removeFaq = (idx: number) => setFaqs(prev => prev.filter((_, i) => i !== idx))
  const updateFaq = (idx: number, field: 'question' | 'answer', value: string) => {
    setFaqs(prev => prev.map((f, i) => (i === idx ? { ...f, [field]: value } : f)))
  }

  // Özel Resim Yükleme (Firebase Storage içine ve Alt etiketli)
  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null
      if (!file) return

      const altText = window.prompt('Görsel için SEO odaklı Alt Etiketi (Alt Text) giriniz (Boş bırakabilirsiniz):')
      
      // Geçici yükleniyor durumu gösterebiliriz (basitçe alert ile uyaralım)
      const quill = quillRef.current?.getEditor()
      const range = quill?.getSelection(true)
      if (quill && range) {
        quill.insertText(range.index, 'Görsel yükleniyor...', { color: '#888' })
      }

      try {
        const fileRef = ref(storage, `blogs/content_${Date.now()}_${file.name}`)
        await uploadBytes(fileRef, file)
        const url = await getDownloadURL(fileRef)

        // İçerik görselini de Galeriye (Medya Kütüphanesine) ekle
        await addDoc(collection(db, 'gallery'), {
          title: 'Blog İçerik Görseli',
          category: 'Blog İçeriği',
          imageUrl: url,
          altText: altText || 'Blog Görseli',
          createdAt: serverTimestamp()
        })

        if (quill && range) {
          // Yükleniyor yazısını sil
          quill.deleteText(range.index, 20)
          
          // Resmi ekle
          quill.insertEmbed(range.index, 'image', url)
          quill.setSelection(range.index + 1)
          
          // Alt etiketini eklemek için DOM müdahalesi
          if (altText) {
            setTimeout(() => {
              const images = document.querySelectorAll('.ql-editor img')
              images.forEach((img) => {
                if (img.getAttribute('src') === url) {
                  img.setAttribute('alt', altText)
                  img.setAttribute('title', altText) // SEO için title da ekleyelim
                }
              })
              // Quill state'ini zorla güncellemek için boşluk ekle-sil
              quill.insertText(range.index + 1, ' ')
              quill.deleteText(range.index + 1, 1)
            }, 200)
          }
        }
      } catch (error) {
        console.error(error)
        alert('Görsel yüklenirken bir hata oluştu.')
        if (quill && range) quill.deleteText(range.index, 20)
      }
    }
  }

  // Quill Editor Modülleri
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [2, 3, 4, false] }], // H1 sayfa başlığı olacağı için H2'den başlatmak SEO için iyidir
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [])

  const handleSlugGenerate = () => {
    const generatedSlug = formData.title
      .toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    
    setFormData(prev => ({ ...prev, slug: generatedSlug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let coverImageUrl = ''
      
      if (imageFile) {
        const fileRef = ref(storage, `blogs/cover_${Date.now()}_${imageFile.name}`)
        await uploadBytes(fileRef, imageFile)
        coverImageUrl = await getDownloadURL(fileRef)

        // Kapak görselini Galeriye (Medya Kütüphanesine) ekle
        await addDoc(collection(db, 'gallery'), {
          title: formData.title,
          category: formData.category,
          imageUrl: coverImageUrl,
          altText: formData.coverImageAlt || formData.title,
          createdAt: serverTimestamp()
        })
      }

      // Etiketleri diziye çevir
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')

      const cleanedFaqs = faqs
        .map(f => ({ question: f.question.trim(), answer: f.answer.trim() }))
        .filter(f => f.question && f.answer)

      const blogData = {
        ...formData,
        tags: tagsArray,
        coverImage: coverImageUrl,
        faqs: cleanedFaqs,
        publishedAt: new Date().toISOString(),
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, 'blogs'), blogData)
      router.push('/admin/blog')
    } catch (error) {
      console.error('Hata:', error)
      alert('Yükleme sırasında bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-wood-dark">Yeni SEO Odaklı Blog</h2>
          <p className="text-wood-medium mt-1">İçeriğe görsel eklerken araç çubuğundaki resim ikonunu kullanın.</p>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="px-8 py-3 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
        >
          {loading ? <><Loader2 size={18} className="animate-spin" /> Kaydediliyor...</> : 'Yayınla'}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Card className="border-cream shadow-sm">
            <CardHeader>
              <CardTitle>İçerik Yazımı</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-wood-dark mb-1">Başlık (H1)</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-2 focus:ring-gold outline-none text-lg font-medium" 
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-wood-dark mb-1">
                  Kalıcı Bağlantı (URL / Slug) 
                  <button type="button" onClick={handleSlugGenerate} className="text-gold ml-2 text-xs hover:underline font-normal">Başlıktan Oluştur</button>
                </label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-2 focus:ring-gold outline-none font-mono text-sm bg-cream-light/50" 
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-wood-dark mb-1">Kısa Özet (Ana Sayfa ve Listeleme için)</label>
                <textarea 
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-2 focus:ring-gold outline-none min-h-[80px]" 
                  required
                />
              </div>

              <div className="h-auto pb-12">
                <label className="block text-sm font-bold text-wood-dark mb-1">Yazı İçeriği (H2, H3 hiyerarşisi kullanmaya özen gösterin)</label>
                <div className="bg-white border-cream rounded-lg overflow-hidden">
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={formData.content}
                    onChange={(val) => setFormData({...formData, content: val})}
                    modules={modules}
                    className="min-h-[400px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cream shadow-sm bg-amber-50/30">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center gap-2">Sıkça Sorulan Sorular (FAQ)</CardTitle>
              <CardDescription>
                Yazının sonuna gelecek modüler FAQ bölümü. Doldurursanız <strong>FAQPage schema (JSON-LD)</strong> otomatik eklenir — Google rich result + AI cite oranı için kritik.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {faqs.length === 0 && (
                <p className="text-xs text-amber-700/70 italic">Henüz soru eklenmedi. Aşağıdaki butona tıklayarak başlayın.</p>
              )}
              {faqs.map((faq, i) => (
                <div key={i} className="border border-amber-200 rounded-lg p-3 bg-white relative">
                  <button
                    type="button"
                    onClick={() => removeFaq(i)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded"
                    aria-label="Soruyu sil"
                  >
                    <Trash2 size={14} />
                  </button>
                  <label className="block text-xs font-semibold text-amber-900 mb-1">Soru #{i + 1}</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaq(i, 'question', e.target.value)}
                    placeholder="Örn: Mutfak dolabı ne kadar sürede teslim edilir?"
                    className="w-full px-3 py-1.5 border border-cream rounded text-sm font-medium mb-2 pr-8 focus:ring-2 focus:ring-amber-300 outline-none"
                  />
                  <label className="block text-xs font-semibold text-amber-900 mb-1">Cevap</label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(i, 'answer', e.target.value)}
                    placeholder="Net, kısa ve bilgi verici bir cevap yazın."
                    className="w-full px-3 py-1.5 border border-cream rounded text-sm min-h-[70px] focus:ring-2 focus:ring-amber-300 outline-none"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addFaq}
                className="w-full py-2.5 border-2 border-dashed border-amber-300 text-amber-700 hover:bg-amber-50 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Plus size={16} />
                Yeni Soru Ekle
              </button>
            </CardContent>
          </Card>

          <Card className="border-cream shadow-sm bg-emerald-50/30">
            <CardHeader>
              <CardTitle className="text-emerald-900">Sonuç / Özet Bölümü</CardTitle>
              <CardDescription>
                Yazının sonunda vurgulu CTA kutusunda gösterilecek özet metin. Boş bırakırsanız kutu görünmez. Birden fazla paragraf için boş satır bırakın.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={formData.conclusion}
                onChange={(e) => setFormData({ ...formData, conclusion: e.target.value })}
                placeholder="Örn: Bu yazı bittiğinde elinizde net bir karar olmalı: ölçü doğruysa kapağı, gövde yorgunsa komple yenileyin..."
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg text-sm min-h-[140px] focus:ring-2 focus:ring-emerald-300 outline-none bg-white"
              />
              <p className="text-xs text-emerald-700/70 mt-2">İpucu: Markdown link kullanabilirsiniz — <code className="bg-white px-1 rounded">[metin](/url)</code></p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-cream shadow-sm bg-blue-50/30">
            <CardHeader>
              <CardTitle className="text-blue-900">Gelişmiş SEO Ayarları</CardTitle>
              <CardDescription>Arama motorlarında üst sıralara çıkmak için buraları doldurun.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-wood-dark mb-1">SEO Title (max 60 krktr)</label>
                <input 
                  type="text" 
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({...formData, seoTitle: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm" 
                  maxLength={60}
                  placeholder="Başlıktan farklı daha vurucu bir SEO başlığı"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-wood-dark mb-1">Meta Description (max 160 krktr)</label>
                <textarea 
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({...formData, seoDescription: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm min-h-[100px]" 
                  maxLength={160}
                  placeholder="Google arama sonuçlarında çıkacak açıklama metni"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-wood-dark mb-1">Anahtar Kelimeler (Virgülle ayırın)</label>
                <input 
                  type="text" 
                  value={formData.focusKeywords}
                  onChange={(e) => setFormData({...formData, focusKeywords: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm" 
                  placeholder="mutfak dolabı, ankara mutfak, dekorasyon"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-wood-dark mb-1">Etiketler (Tags)</label>
                <input 
                  type="text" 
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm" 
                  placeholder="Modern, Ahşap, Tasarım"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-wood-dark mb-1">Canonical URL (Opsiyonel)</label>
                <input 
                  type="url" 
                  value={formData.canonicalUrl}
                  onChange={(e) => setFormData({...formData, canonicalUrl: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm bg-white" 
                  placeholder="https://..."
                />
                <p className="text-xs text-wood-medium mt-1">Eğer bu yazı başka bir siteden alıntıysa orijinal URL&apos;yi buraya girin.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cream shadow-sm">
            <CardHeader>
              <CardTitle>Görsel & Detaylar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-cream border border-cream rounded-lg">
                <label className="block text-sm font-bold text-wood-dark mb-2">Ana Kapak Fotoğrafı</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm bg-white rounded border border-cream/50 p-1" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-wood-dark mb-1">Kapak Görseli Alt Metni (SEO)</label>
                <input 
                  type="text" 
                  value={formData.coverImageAlt}
                  onChange={(e) => setFormData({...formData, coverImageAlt: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-2 focus:ring-gold outline-none text-sm" 
                  placeholder="Örn: Beyaz Lake Mutfak Dolabı"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-wood-dark mb-1">Kategori</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-2 focus:ring-gold outline-none"
                >
                  <option>Mutfak</option>
                  <option>Yatak Odası</option>
                  <option>Banyo</option>
                  <option>İlham & Dekorasyon</option>
                  <option>Malzeme & Bakım</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-wood-dark mb-1">Yazar</label>
                <input 
                  type="text" 
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-2 focus:ring-gold outline-none" 
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
