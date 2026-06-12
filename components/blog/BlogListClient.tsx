'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface BlogListPost {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage: string
  category: string
  publishedAt: string
  readTime?: string
}

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80'

export default function BlogListClient({ initialPosts }: { initialPosts: BlogListPost[] }) {
  // initialPosts sunucudan gelir → ilk HTML'de (SSR) tüm kartlar ve linkler hazır olur.
  const [posts, setPosts] = useState<BlogListPost[]>(initialPosts)
  const [activeCategory, setActiveCategory] = useState<string>('Tümü')

  // Firestore (admin) yazılarını istemcide ekle — progresif zenginleştirme.
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        const toIso = (v: any): string => {
          if (!v) return ''
          if (typeof v === 'string') return v
          if (typeof v?.toDate === 'function') return v.toDate().toISOString()
          if (v instanceof Date) return v.toISOString()
          return String(v)
        }
        const fbData: BlogListPost[] = snapshot.docs.map((doc) => {
          const d = doc.data()
          return {
            id: doc.id,
            slug: d.slug,
            title: d.title,
            excerpt: d.excerpt,
            coverImage: d.coverImage,
            category: d.category || 'Genel',
            publishedAt: toIso(d.publishedAt || d.createdAt),
            readTime: '5 dk okuma',
          }
        })
        if (fbData.length === 0) return
        const fbSlugs = new Set(fbData.map((p) => p.slug))
        const merged = [...fbData, ...initialPosts.filter((p) => !fbSlugs.has(p.slug))]
        merged.sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
        setPosts(merged)
      } catch (error) {
        console.error('Bloglar yüklenirken hata:', error)
      }
    }
    fetchBlogs()
  }, [initialPosts])

  const categories = ['Tümü', ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))]
  const filteredPosts = posts.filter((p) => activeCategory === 'Tümü' || p.category === activeCategory)
  const featured = filteredPosts.length > 0 ? filteredPosts[0] : null
  const rest = filteredPosts.length > 1 ? filteredPosts.slice(1) : []

  return (
    <section className="py-12 bg-cream-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <span
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${activeCategory === cat ? 'bg-gold text-wood-dark shadow-sm' : 'bg-white border border-cream text-wood-medium hover:bg-gold/10'}`}
            >
              {cat}
            </span>
          ))}
        </div>

        {filteredPosts.length === 0 || !featured ? (
          <div className="py-20 text-center text-wood-medium bg-white rounded-2xl border border-cream">
            Henüz bu kategoride blog yazısı bulunmuyor.
          </div>
        ) : (
          <>
            {/* Featured post */}
            <AnimatedSection key={`featured-${activeCategory}`} className="mb-10">
              <Link href={`/blog/${featured.slug}`} className="group grid md:grid-cols-2 gap-0 bg-cream rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-cream">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <Image
                    src={featured.coverImage || FALLBACK_IMG}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-gold text-wood-dark text-xs font-bold rounded-full">Öne Çıkan</span>
                  </div>
                </div>
                <div className="p-7 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={12} className="text-gold" />
                    <span className="text-gold text-xs font-semibold">{featured.category}</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-wood-dark mb-3 group-hover:text-gold transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-wood-medium/70 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-wood-medium/50">
                    <span className="flex items-center gap-1"><Clock size={11} />{featured.readTime}</span>
                    <span>{formatDate(featured.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>

            {/* Post grid */}
            <StaggerContainer key={`grid-${activeCategory}`} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block bg-cream rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-cream h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.coverImage || FALLBACK_IMG}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag size={11} className="text-gold" />
                        <span className="text-gold text-xs font-semibold">{post.category}</span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-wood-dark mb-2 group-hover:text-gold transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-wood-medium/60 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-wood-medium/40">
                        <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </>
        )}
      </div>
    </section>
  )
}
