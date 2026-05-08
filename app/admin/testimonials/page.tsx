'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'
import { Plus, Edit, Trash2, Star, User } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  id: string
  name: string
  location: string
  text: string
  rating: number
  service: string
  image: string
  createdAt?: string
}

export default function TestimonialsListPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Testimonial[])
    } catch (error) {
      console.error('Yorumlar çekilirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'testimonials', id))
        setItems(items.filter((i) => i.id !== id))
      } catch (error) {
        console.error('Silinirken hata oluştu:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-wood-dark">Müşteri Yorumları</h2>
          <p className="text-wood-medium mt-1">Anasayfada gösterilen müşteri yorumlarını yönetin.</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Yeni Yorum Ekle
        </Link>
      </div>

      <div className="bg-white border border-cream rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-wood-medium">Yükleniyor...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-wood-medium">
            Henüz yorum bulunmuyor. Yeni bir yorum ekleyerek başlayın.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream-light border-b border-cream">
                  <th className="px-6 py-4 font-semibold text-wood-dark w-20">Avatar</th>
                  <th className="px-6 py-4 font-semibold text-wood-dark">Müşteri</th>
                  <th className="px-6 py-4 font-semibold text-wood-dark">Yorum</th>
                  <th className="px-6 py-4 font-semibold text-wood-dark">Hizmet</th>
                  <th className="px-6 py-4 font-semibold text-wood-dark w-28">Puan</th>
                  <th className="px-6 py-4 font-semibold text-wood-dark text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {items.map((t) => (
                  <tr key={t.id} className="border-b border-cream/50 hover:bg-cream/20 transition-colors">
                    <td className="px-6 py-4">
                      {t.image ? (
                        <div className="w-12 h-12 relative rounded-full overflow-hidden">
                          <Image src={t.image} alt={t.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-cream flex items-center justify-center rounded-full text-wood-medium/50">
                          <User size={20} />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-wood-dark">{t.name}</div>
                      <div className="text-sm text-wood-medium/60">{t.location}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-wood-medium max-w-md">
                      <p className="line-clamp-2 italic">&ldquo;{t.text}&rdquo;</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-wood-medium">{t.service}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating || 0 }).map((_, i) => (
                          <Star key={i} size={13} className="text-gold" fill="currentColor" />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/testimonials/${t.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Düzenle"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Sil"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
