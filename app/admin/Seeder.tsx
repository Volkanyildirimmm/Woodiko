'use client'

import { useState } from 'react'
import { collection, writeBatch, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { PROJECTS } from '@/lib/projects'
import { SERVICES } from '@/lib/constants'
import { useAuth } from '@/context/AuthContext'

export default function Seeder() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSeed = async () => {
    if (!confirm('Tüm statik içerikleri (Projeler ve Hizmetler) Firebase\'e aktarmak istediğinize emin misiniz?')) return
    
    setLoading(true)
    setMessage('Aktarım başlıyor...')
    
    try {
      const batch = writeBatch(db)

      // 1. Projeleri ekle
      PROJECTS.forEach(project => {
        const docRef = doc(collection(db, 'projects'))
        batch.set(docRef, {
          title: project.title,
          slug: project.slug,
          location: project.location,
          category: project.category,
          style: project.style,
          duration: project.duration,
          area: project.area,
          summary: project.summary,
          challenge: project.challenge,
          solution: project.solution,
          materials: project.materials,
          beforeImage: project.before.src,
          afterImage: project.after.src,
          createdAt: new Date().toISOString()
        })
      })

      // 2. Hizmetleri ekle
      SERVICES.forEach(service => {
        const docRef = doc(collection(db, 'services'))
        batch.set(docRef, {
          title: service.title,
          slug: service.slug,
          description: service.description,
          icon: 'default-icon', // İkon string olarak eklenebilir
          createdAt: new Date().toISOString()
        })
      })

      await batch.commit()
      setMessage('✅ Veritabanı başarıyla aktarıldı! Artık bu içerikleri panellerden yönetebilirsiniz.')
    } catch (error) {
      console.error('Seed error:', error)
      setMessage('❌ Aktarım sırasında hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8 p-6 bg-cream border border-gold/30 rounded-xl">
      <h3 className="font-serif text-lg font-bold text-wood-dark mb-2">Sistemi Başlat (Veri Aktarımı)</h3>
      <p className="text-sm text-wood-medium/80 mb-4">
        Sitenin kendi kodları içinde bulunan statik projeleri ve hizmetleri tek tuşla Firebase veritabanına aktarabilirsiniz. 
        Bunu sadece bir kere yapmanız yeterlidir.
      </p>
      <button 
        onClick={handleSeed}
        disabled={loading}
        className="px-4 py-2 bg-gold hover:bg-gold-dark text-wood-dark font-medium rounded transition-colors disabled:opacity-50"
      >
        {loading ? 'Aktarılıyor...' : 'Statik İçerikleri Firebase\'e Aktar'}
      </button>
      {message && <p className="mt-3 text-sm font-medium text-wood-dark">{message}</p>}
    </div>
  )
}
