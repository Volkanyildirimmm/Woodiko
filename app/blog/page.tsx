import { Metadata } from 'next'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { BLOG_POSTS, isPostLive } from '@/lib/blog-posts'
import { generateSEO } from '@/lib/seo'
import BlogListClient, { BlogListPost } from '@/components/blog/BlogListClient'

export const revalidate = 60

export const metadata: Metadata = generateSEO({
  title: 'Mobilya Rehberi — Blog',
  description:
    'Ankara\'da özel mobilya, mutfak dolabı, gardırop ve banyo üzerine uzman rehberler, fiyat analizleri ve sektör bilgisi. Woodiko Mobilya Rehberi.',
  path: '/blog',
})

export default function BlogPage() {
  // Yayında olan statik yazılar sunucuda hesaplanır → ilk HTML'de tüm
  // yazı kartları ve iç bağlantılar hazır (arama motorları için kritik).
  const initialPosts: BlogListPost[] = Object.entries(BLOG_POSTS)
    .filter(([, p]) => isPostLive(p))
    .map(([slug, p]) => ({
      id: `static-${slug}`,
      slug,
      title: p.title,
      excerpt: p.excerpt,
      coverImage: p.image,
      category: p.category || 'Genel',
      publishedAt: p.publishDate || p.modified || p.date,
      readTime: p.readTime,
    }))
    .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))

  return (
    <div className="pt-20">
      <section className="py-16 bg-wood-dark text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Mobilya Rehberi</h1>
            <p className="text-cream/70 max-w-lg mx-auto">Uzmanlarımızdan ilham, rehber ve sektör bilgisi.</p>
          </AnimatedSection>
        </div>
      </section>

      <BlogListClient initialPosts={initialPosts} />
    </div>
  )
}
