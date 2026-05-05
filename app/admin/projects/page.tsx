'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'
import { Plus, Edit, Trash2, ExternalLink, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  slug: string
  category: string
  location: string
  afterImage: string
}

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'))
      const projectData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[]
      
      setProjects(projectData)
    } catch (error) {
      console.error('Projeler çekilirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'projects', id))
        setProjects(projects.filter(p => p.id !== id))
      } catch (error) {
        console.error('Silinirken hata oluştu:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-wood-dark">Projeler</h2>
          <p className="text-wood-medium mt-1">Önce/Sonra dönüşüm projelerinizi yönetin.</p>
        </div>
        <Link 
          href="/admin/projects/new"
          className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Yeni Proje Ekle
        </Link>
      </div>

      <div className="bg-white border border-cream rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-wood-medium">Yükleniyor...</div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center text-wood-medium">
            Henüz proje bulunmuyor. Yeni bir proje ekleyerek başlayın.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream-light border-b border-cream">
                  <th className="px-6 py-4 font-semibold text-wood-dark w-24">Görsel</th>
                  <th className="px-6 py-4 font-semibold text-wood-dark">Proje Adı</th>
                  <th className="px-6 py-4 font-semibold text-wood-dark">Kategori</th>
                  <th className="px-6 py-4 font-semibold text-wood-dark">Konum</th>
                  <th className="px-6 py-4 font-semibold text-wood-dark text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-cream/50 hover:bg-cream/20 transition-colors">
                    <td className="px-6 py-4">
                      {project.afterImage ? (
                        <div className="w-16 h-12 relative rounded overflow-hidden">
                          <Image src={project.afterImage} alt={project.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-12 bg-cream flex items-center justify-center rounded text-wood-medium/50">
                          <ImageIcon size={20} />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-wood-dark">{project.title}</div>
                      <div className="text-sm text-wood-medium/60">/{project.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-wood-medium">{project.category}</td>
                    <td className="px-6 py-4 text-sm text-wood-medium">{project.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link 
                          href={`/projeler/${project.slug}`} 
                          target="_blank"
                          className="p-2 text-wood-medium hover:text-wood-dark hover:bg-cream rounded-lg transition-colors"
                          title="Sitede Görüntüle"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        <Link 
                          href={`/admin/projects/${project.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Düzenle"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(project.id)}
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
