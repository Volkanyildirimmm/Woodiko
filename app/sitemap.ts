import { MetadataRoute } from 'next'
import { SITE_URL, SERVICES } from '@/lib/constants'
import { PROJECTS } from '@/lib/projects'
import { BLOG_POSTS } from '@/lib/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/hizmetler`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/galeri`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/hakkimizda`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/teklif-al`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${SITE_URL}/iletisim`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/projeler`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE_URL}/hizmetler/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const blogPages: MetadataRoute.Sitemap = Object.entries(BLOG_POSTS).map(([slug, post]) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: post.modified ? new Date(post.modified) : new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${SITE_URL}/projeler/${p.slug}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...servicePages, ...blogPages, ...projectPages]
}
