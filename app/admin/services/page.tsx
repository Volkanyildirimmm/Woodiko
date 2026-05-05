'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'

interface Service {
  id: string
  title: string
  slug: string
  description: string
}

export default function ServicesListPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'services'))
      const serviceData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[]
      
      setServices(serviceData)
    } catch (error) {
      console.error('Hizmetler çekilirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu hizmeti silmek istediğinize emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'services', id))
        setServices(services.filter(s => s.id !== id))
      } catch (error) {
        console.error('Silinirken hata oluştu:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-wood-dark">Hizmet Yönetimi</h2>
          <p className="text-wood-medium mt-1">Sitede sunduğunuz hizmetleri buradan yönetebilirsiniz.</p>
        </div>
        <Link 
          href="/admin/services/new"
          className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Yeni Hizmet Ekle
        </Link>
      </div>

      <div className="bg-white border border-cream rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-wood-medium">Yükleniyor...</div>
        ) : services.length === 0 ? (
          <div className="p-8 text-center text-wood-medium">
            Henüz hizmet bulunmuyor. Dashboard üzerinden sistemi başlatıp statik içerikleri aktarabilirsiniz.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream-light border-b border-cream">
                  <th className="px-6 py-4 font-semibold text-wood-dark">Hizmet Adı</th>
                  <th className="px-6 py-4 font-semibold text-wood-dark">Açıklama</th>
                  <th className="px-6 py-4 font-semibold text-wood-dark text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b border-cream/50 hover:bg-cream/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-wood-dark">{service.title}</div>
                      <div className="text-sm text-wood-medium/60">/{service.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-wood-medium">
                      {service.description.substring(0, 100)}...
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link 
                          href={`/admin/services/${service.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Düzenle"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(service.id)}
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
