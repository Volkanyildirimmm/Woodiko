import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { Clock, Calendar, ArrowLeft, ArrowRight, HelpCircle, Sparkles, ChevronDown } from 'lucide-react'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { generateSEO, articleSchema, breadcrumbSchema } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { BLOG_POSTS, isPostLive } from '@/lib/blog-posts'

export const revalidate = 60

const posts = BLOG_POSTS

type ResolvedPost = {
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  modified?: string
  author: string
  authorImage: string
  readTime: string
  keywords?: string[]
  related: string[]
  source: 'static' | 'firestore'
  rawContent: string
  htmlContent: string
  faqs: { q: string; a: string }[]
  conclusion: string
}

const DEFAULT_AUTHOR_IMAGE = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&q=80&fit=crop'

async function fetchFromFirestore(slug: string) {
  try {
    const q = query(collection(db, 'blogs'), where('slug', '==', slug), limit(1))
    const snap = await getDocs(q)
    if (snap.empty) return null
    return snap.docs[0].data() as any
  } catch (err) {
    console.error('Firestore blog lookup failed:', err)
    return null
  }
}

function toIsoDate(v: any): string {
  if (!v) return ''
  if (typeof v === 'string') return v
  if (typeof v?.toDate === 'function') return v.toDate().toISOString()
  if (v instanceof Date) return v.toISOString()
  return String(v)
}

async function resolvePost(slug: string): Promise<ResolvedPost | null> {
  const staticPost = posts[slug]
  if (staticPost) {
    // İleri tarihli (planlanmış) yazılar yayın tarihine kadar 404 döner
    if (!isPostLive(staticPost)) return null
    const { main, faqs, conclusion } = parseContent(staticPost.content)
    return {
      title: staticPost.title,
      excerpt: staticPost.excerpt,
      image: staticPost.image,
      category: staticPost.category,
      date: staticPost.date,
      modified: staticPost.modified,
      author: staticPost.author,
      authorImage: staticPost.authorImage,
      readTime: staticPost.readTime,
      keywords: staticPost.keywords,
      related: staticPost.related || [],
      source: 'static',
      rawContent: main,
      htmlContent: '',
      faqs,
      conclusion,
    }
  }

  const data = await fetchFromFirestore(slug)
  if (!data) return null

  const fbFaqs = Array.isArray(data.faqs)
    ? data.faqs
        .map((f: any) => ({ q: String(f.question || '').trim(), a: String(f.answer || '').trim() }))
        .filter((f: { q: string; a: string }) => f.q && f.a)
    : []

  const keywords = typeof data.focusKeywords === 'string'
    ? data.focusKeywords.split(',').map((k: string) => k.trim()).filter(Boolean)
    : []

  return {
    title: data.title || '',
    excerpt: data.excerpt || '',
    image: data.coverImage || '',
    category: data.category || 'Genel',
    date: toIsoDate(data.publishedAt || data.createdAt),
    modified: toIsoDate(data.updatedAt) || undefined,
    author: data.author || 'Woodiko Ekibi',
    authorImage: DEFAULT_AUTHOR_IMAGE,
    readTime: '5 dk okuma',
    keywords,
    related: [],
    source: 'firestore',
    rawContent: '',
    htmlContent: typeof data.content === 'string' ? data.content : '',
    faqs: fbFaqs,
    conclusion: typeof data.conclusion === 'string' ? data.conclusion : '',
  }
}

/** Henüz yayınlanmamış (planlı) bir blog yazısına giden iç bağlantı mı? Öyleyse 404'ü önlemek için link yerine düz metin gösteririz. */
function isScheduledBlogLink(href: string): boolean {
  if (!href.startsWith('/blog/')) return false
  const slug = href.slice('/blog/'.length).split(/[#?]/)[0]
  const p = posts[slug]
  return !!p && !isPostLive(p)
}

function renderInline(text: string): React.ReactNode {
  const tokens: React.ReactNode[] = []
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) tokens.push(text.slice(lastIndex, match.index))
    if (match[1] && match[2]) {
      const href = match[2]
      const isInternal = href.startsWith('/')
      tokens.push(
        isScheduledBlogLink(href) ? (
          // Planlı yazıya bağlantı: tarih gelene kadar düz metin (yayınlanınca otomatik link olur)
          <span key={key++} className="font-medium text-wood-dark">{match[1]}</span>
        ) : isInternal ? (
          <Link key={key++} href={href} className="text-gold hover:text-gold-dark underline underline-offset-2">{match[1]}</Link>
        ) : (
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark underline underline-offset-2">{match[1]}</a>
        )
      )
    } else if (match[3]) {
      tokens.push(<strong key={key++} className="font-semibold text-wood-dark">{match[3]}</strong>)
    }
    lastIndex = regex.lastIndex
  }
  if (lastIndex < text.length) tokens.push(text.slice(lastIndex))
  return tokens.length === 1 ? tokens[0] : <>{tokens}</>
}

function parseContent(raw: string): { main: string; faqs: { q: string; a: string }[]; conclusion: string } {
  const trimmed = raw.trim()
  const faqMarker = '## Sıkça Sorulan Sorular'
  const faqIdx = trimmed.indexOf(faqMarker)
  if (faqIdx === -1) return { main: trimmed, faqs: [], conclusion: '' }

  const main = trimmed.slice(0, faqIdx).trim()
  const afterMarker = trimmed.slice(faqIdx + faqMarker.length)

  const sepRegex = /\n\s*---\s*\n/
  const sepMatch = afterMarker.match(sepRegex)
  const faqBody = sepMatch ? afterMarker.slice(0, sepMatch.index!).trim() : afterMarker.trim()
  const conclusion = sepMatch ? afterMarker.slice(sepMatch.index! + sepMatch[0].length).trim() : ''

  const faqs: { q: string; a: string }[] = []
  let currentQ: string | null = null
  let currentA: string[] = []
  for (const rawLine of faqBody.split('\n')) {
    const line = rawLine.trim()
    if (!line) continue
    const qMatch = line.match(/^\*\*(.+?)\*\*\s*$/)
    if (qMatch) {
      if (currentQ) faqs.push({ q: currentQ, a: currentA.join(' ').trim() })
      currentQ = qMatch[1]
      currentA = []
    } else if (currentQ) {
      currentA.push(line)
    }
  }
  if (currentQ) faqs.push({ q: currentQ, a: currentA.join(' ').trim() })

  return { main, faqs, conclusion }
}

function stripInlineMarkdown(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1').replace(/\*\*(.*?)\*\*/g, '$1')
}

function parseTableRow(row: string): string[] {
  let s = row.trim()
  if (s.startsWith('|')) s = s.slice(1)
  if (s.endsWith('|')) s = s.slice(0, -1)
  return s.split('|').map((c) => c.trim())
}

const isSeparatorRow = (cells: string[]) => cells.length > 0 && cells.every((c) => /^:?-{1,}:?$/.test(c))

/** Statik (markdown) yazılar için blok-bazlı render: başlık, liste, alıntı, yatay çizgi ve TABLO desteği. */
function renderMarkdown(md: string): React.ReactNode[] {
  const lines = md.split('\n')
  const nodes: React.ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    // Tablo: ardışık '|' satırları
    if (trimmed.startsWith('|')) {
      const rows: string[][] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(parseTableRow(lines[i]))
        i++
      }
      const sepIdx = rows.findIndex(isSeparatorRow)
      const header = sepIdx > 0 ? rows[sepIdx - 1] : rows[0]
      const body = rows.filter((r, idx) => idx !== (sepIdx >= 0 ? sepIdx : -1) && r !== header && !isSeparatorRow(r))
      nodes.push(
        <div key={key++} className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-wood-dark text-cream">
                {header.map((cell, ci) => (
                  <th key={ci} className="px-4 py-2.5 text-left font-semibold border border-wood-medium/30">{renderInline(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className="even:bg-cream/50 odd:bg-white">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2 border border-cream text-wood-medium/85 align-top">{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    if (trimmed === '') { i++; continue }
    if (trimmed === '---') { nodes.push(<hr key={key++} className="my-6 border-cream" />); i++; continue }
    if (trimmed.startsWith('## ')) { nodes.push(<h2 key={key++} className="font-serif text-xl font-bold text-wood-dark mt-8 mb-3">{trimmed.replace('## ', '')}</h2>); i++; continue }
    if (trimmed.startsWith('### ')) { nodes.push(<h3 key={key++} className="font-serif text-lg font-semibold text-wood-dark mt-6 mb-2">{trimmed.replace('### ', '')}</h3>); i++; continue }
    if (trimmed.startsWith('> ')) { nodes.push(<blockquote key={key++} className="border-l-4 border-gold pl-4 italic text-wood-medium/80 my-4">{renderInline(trimmed.replace('> ', ''))}</blockquote>); i++; continue }

    // Sırasız liste grubu
    if (trimmed.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) { items.push(lines[i].trim().slice(2)); i++ }
      nodes.push(
        <ul key={key++} className="list-disc ml-6 space-y-1.5 my-3 text-wood-medium/80">
          {items.map((it, ii) => <li key={ii}>{renderInline(it)}</li>)}
        </ul>
      )
      continue
    }

    // Sıralı liste grubu
    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^\d+\.\s/, '')); i++ }
      nodes.push(
        <ol key={key++} className="list-decimal ml-6 space-y-1.5 my-3 text-wood-medium/80">
          {items.map((it, ii) => <li key={ii}>{renderInline(it)}</li>)}
        </ol>
      )
      continue
    }

    nodes.push(<p key={key++} className="text-wood-medium/80 leading-relaxed">{renderInline(trimmed)}</p>)
    i++
  }

  return nodes
}

export function generateStaticParams() {
  // Yalnızca yayında olan yazıları önceden üret; planlanmış (ileri tarihli)
  // yazılar tarihleri geldiğinde isteğe bağlı (on-demand) render edilir.
  return Object.entries(posts)
    .filter(([, p]) => isPostLive(p))
    .map(([slug]) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await resolvePost(params.slug)
  if (!post) return {}
  return generateSEO({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    path: `/blog/${params.slug}`,
    keywords: post.keywords,
  })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await resolvePost(params.slug)
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

  const faqs = post.faqs
  const conclusion = post.conclusion

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: stripInlineMarkdown(f.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripInlineMarkdown(f.a),
      },
    })),
  } : null

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
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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

                {post.source === 'static' ? (
                  <div className="max-w-none text-wood-dark/80 leading-relaxed">
                    {renderMarkdown(post.rawContent)}
                  </div>
                ) : (
                  <div
                    className="blog-content max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                  />
                )}
              </AnimatedSection>

              {faqs.length > 0 && (
                <AnimatedSection className="mt-12">
                  <section aria-labelledby="faq-heading" itemScope itemType="https://schema.org/FAQPage">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                        <HelpCircle size={20} className="text-gold" />
                      </div>
                      <h2 id="faq-heading" className="font-serif text-2xl font-bold text-wood-dark">
                        Sıkça Sorulan Sorular
                      </h2>
                    </div>
                    <div className="space-y-3">
                      {faqs.map((faq, i) => (
                        <details
                          key={i}
                          className="group bg-white border border-cream rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-gold/40 transition-all"
                          itemScope
                          itemProp="mainEntity"
                          itemType="https://schema.org/Question"
                        >
                          <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                            <h3
                              itemProp="name"
                              className="font-semibold text-wood-dark text-base leading-snug group-hover:text-gold transition-colors"
                            >
                              {renderInline(faq.q)}
                            </h3>
                            <ChevronDown
                              size={20}
                              className="text-gold shrink-0 transition-transform duration-300 group-open:rotate-180"
                            />
                          </summary>
                          <div
                            itemScope
                            itemProp="acceptedAnswer"
                            itemType="https://schema.org/Answer"
                            className="px-5 pb-5 pt-0"
                          >
                            <div className="pt-3 border-t border-cream">
                              <p itemProp="text" className="text-wood-medium/85 leading-relaxed text-sm">
                                {renderInline(faq.a)}
                              </p>
                            </div>
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                </AnimatedSection>
              )}

              {conclusion && (
                <AnimatedSection className="mt-12">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-wood-dark via-wood-dark to-charcoal text-cream p-7 md:p-9 shadow-lg">
                    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
                    <div className="relative">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 border border-gold/30 rounded-full text-gold text-xs font-semibold mb-4">
                        <Sparkles size={12} />
                        Sonuç
                      </div>
                      <div className="space-y-3 text-cream/90 leading-relaxed">
                        {conclusion.split(/\n+/).filter(Boolean).map((para, i) => (
                          <p key={i} className="text-[15px]">
                            {renderInline(para)}
                          </p>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <Link
                          href="/teklif-al"
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gold hover:bg-gold-dark text-wood-dark font-bold text-sm rounded-lg transition-colors"
                        >
                          Ücretsiz Keşif Randevusu
                          <ArrowRight size={16} />
                        </Link>
                        <a
                          href="tel:+905340215278"
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent border border-cream/30 hover:border-gold hover:text-gold text-cream text-sm font-medium rounded-lg transition-colors"
                        >
                          Hemen Ara: 0534 021 52 78
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}
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
                {post.related.some((slug) => posts[slug] && isPostLive(posts[slug])) && (
                  <div>
                    <h3 className="font-semibold text-wood-dark text-sm mb-3">İlgili Yazılar</h3>
                    <div className="space-y-3">
                      {post.related.map((slug) => {
                        const rel = posts[slug]
                        if (!rel || !isPostLive(rel)) return null
                        return (
                          <Link key={slug} href={`/blog/${slug}`} className="flex gap-3 group">
                            <Image src={rel.image} alt={rel.title} width={60} height={60} className="rounded-lg object-cover shrink-0 w-14 h-14" />
                            <span className="text-xs text-wood-medium group-hover:text-gold transition-colors leading-snug font-medium">{rel.title}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
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
