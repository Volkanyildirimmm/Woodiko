import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { Clock, Calendar, ArrowLeft } from 'lucide-react'
import { generateSEO, articleSchema, breadcrumbSchema } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { BLOG_POSTS } from '@/lib/blog-posts'

const posts = BLOG_POSTS

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts[params.slug]
  if (!post) return {}
  return generateSEO({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    path: `/blog/${params.slug}`,
    keywords: post.keywords,
  })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug]
  if (!post) notFound()

  const article = articleSchema({
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    date: post.date,
    modified: post.modified,
    author: post.author,
    slug: params.slug,
  })

  const breadcrumb = breadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${params.slug}` },
  ])

  const contentLines = post.content.trim().split('\n')

  return (
    <div className="pt-20">
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-charcoal/60" />
      </div>

      <div className="bg-cream-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-wood-medium/60 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-wood-dark truncate max-w-xs">{post.title}</span>
          </nav>

          <div className="grid lg:grid-cols-4 gap-10">
            {/* Article */}
            <article className="lg:col-span-3">
              <AnimatedSection>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-xs font-semibold mb-4">
                  {post.category}
                </div>
                <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-wood-dark mb-4 leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-wood-medium/60 mb-8 pb-6 border-b border-cream">
                  <Image src={post.authorImage} alt={post.author} width={32} height={32} className="rounded-full object-cover" />
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                </div>

                <div className="prose prose-sm max-w-none text-wood-dark/80 leading-relaxed space-y-4">
                  {contentLines.map((line, i) => {
                    if (line.startsWith('## ')) return <h2 key={i} className="font-serif text-xl font-bold text-wood-dark mt-8 mb-3">{line.replace('## ', '')}</h2>
                    if (line.startsWith('### ')) return <h3 key={i} className="font-serif text-lg font-semibold text-wood-dark mt-6 mb-2">{line.replace('### ', '')}</h3>
                    if (line.startsWith('- ')) return <li key={i} className="ml-4 text-wood-medium/80">{line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}</li>
                    if (line.startsWith('1. ') || line.startsWith('2. ') || /^\d+\. /.test(line)) return <li key={i} className="ml-4 text-wood-medium/80">{line.replace(/^\d+\. /, '')}</li>
                    if (line.trim() === '') return null
                    if (line.startsWith('|')) return null
                    return <p key={i} className="text-wood-medium/80 leading-relaxed">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
                  })}
                </div>
              </AnimatedSection>
            </article>

            {/* Sidebar */}
            <AnimatedSection delay={0.1} className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-wood-dark rounded-xl p-5 text-cream">
                  <h3 className="font-serif font-bold text-base mb-3">Ücretsiz Teklif</h3>
                  <p className="text-cream/70 text-sm mb-4">Projeniz için fiyat öğrenin, 24 saatte dönelim.</p>
                  <Link
                    href="/teklif-al"
                    className="block w-full text-center py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold text-sm rounded transition-colors"
                  >
                    Teklif Al
                  </Link>
                </div>
                <div>
                  <h3 className="font-semibold text-wood-dark text-sm mb-3">İlgili Yazılar</h3>
                  <div className="space-y-3">
                    {post.related.map((slug) => {
                      const rel = posts[slug]
                      if (!rel) return null
                      return (
                        <Link key={slug} href={`/blog/${slug}`} className="flex gap-3 group">
                          <Image src={rel.image} alt={rel.title} width={60} height={60} className="rounded-lg object-cover shrink-0 w-14 h-14" />
                          <span className="text-xs text-wood-medium group-hover:text-gold transition-colors leading-snug font-medium">{rel.title}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="mt-8 pt-6 border-t border-cream">
            <Link href="/blog" className="inline-flex items-center gap-2 text-wood-medium hover:text-gold transition-colors text-sm font-medium">
              <ArrowLeft size={14} />
              Tüm Yazılar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
