'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'

interface Blog {
  id: string
  title: string
  slug: string
  category: string
  publishedAt: string
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'blogs'))
      const blogData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Blog[]
      
      setBlogs(blogData)
    } catch (error) {
      console.error('Bloglar çekilirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'blogs', id))
        setBlogs(blogs.filter(blog => blog.id !== id))
      } catch (error) {
        console.error('Silinirken hata oluştu:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-wood-dark">Blog Yönetimi</h2>
          <p className="text-wood-medium mt-1">Sitedeki tüm SEO uyumlu blog yazılarını buradan yönetebilirsiniz.</p>
        </div>
        <Link 
          href="/admin/blog/new"
          className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Yeni Yazı Ekle
        </Link>
      </div>

      <div className="bg-white border border-cream rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-wood-medium">Yükleniyor...</div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center text-wood-medium">
            Henüz blog yazısı bulunmuyor. Yeni bir yazı ekleyerek başlayın.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream-light border-b border-cream">
                  <th className="px-6 py-4 font-semibold text-wood-dark">Başlık</th>
                  <th className="px-6 py-4 font-semibold text-wood-dark">Kategori</th>
                  <th className="px-6 py-4 font-semibold text-wood-dark">Tarih</th>
                  <th className="px-6 py-4 font-semibold text-wood-dark text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-cream/50 hover:bg-cream/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-wood-dark">{blog.title}</div>
                      <div className="text-sm text-wood-medium/60">/{blog.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-wood-medium">{blog.category}</td>
                    <td className="px-6 py-4 text-sm text-wood-medium">
                      {new Date(blog.publishedAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link 
                          href={`/blog/${blog.slug}`} 
                          target="_blank"
                          className="p-2 text-wood-medium hover:text-wood-dark hover:bg-cream rounded-lg transition-colors"
                          title="Sitede Görüntüle"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        <Link 
                          href={`/admin/blog/${blog.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Düzenle"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(blog.id)}
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
