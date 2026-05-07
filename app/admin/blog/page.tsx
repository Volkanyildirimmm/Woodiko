'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'
import { Plus, Edit, Trash2, ExternalLink, Lock } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/blog-posts'

interface Blog {
  id: string
  title: string
  slug: string
  category: string
  publishedAt: string
  source?: 'firebase' | 'static'
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    const staticBlogs: Blog[] = Object.entries(BLOG_POSTS).map(([slug, p]) => ({
      id: `static-${slug}`,
      title: p.title,
      slug,
      category: p.category,
      publishedAt: p.modified || p.date,
      source: 'static',
    }))

    try {
      const querySnapshot = await getDocs(collection(db, 'blogs'))
      const fbBlogs = querySnapshot.docs.map(d => {
        const raw = d.data() as any
        const ts = raw.publishedAt || raw.createdAt
        return {
          id: d.id,
          title: raw.title,
          slug: raw.slug,
          category: raw.category || 'Genel',
          publishedAt: typeof ts === 'string' ? ts : ts?.toDate?.().toISOString?.() || '',
          source: 'firebase' as const,
        }
      }) as Blog[]

      const seen = new Set(fbBlogs.map(b => b.slug))
      const merged = [...fbBlogs, ...staticBlogs.filter(b => !seen.has(b.slug))]
      merged.sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
      setBlogs(merged)
    } catch (error) {
      console.error('Bloglar çekilirken hata:', error)
      setBlogs(staticBlogs)
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
                      <div className="font-medium text-wood-dark flex items-center gap-2">
                        {blog.title}
                        {blog.source === 'static' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-800 rounded">
                            <Lock size={10} /> KOD KAYNAKLI
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-wood-medium/60">/{blog.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-wood-medium">{blog.category}</td>
                    <td className="px-6 py-4 text-sm text-wood-medium">
                      {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('tr-TR') : '-'}
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
                        {blog.source === 'static' ? (
                          <span
                            className="p-2 text-wood-medium/40 cursor-not-allowed"
                            title="Bu yazı kod kaynaklıdır; düzenlemek için lib/blog-posts.ts dosyasını kullanın"
                          >
                            <Lock size={18} />
                          </span>
                        ) : (
                          <>
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
                          </>
                        )}
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
