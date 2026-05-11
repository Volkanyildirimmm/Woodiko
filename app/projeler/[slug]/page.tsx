import { Metadata } from 'next'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { PROJECTS } from '@/lib/projects'
import { generateSEO } from '@/lib/seo'
import ProjeDetayClient from './ProjeDetayClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let title = ''
  let summary = ''
  let afterImage = ''

  try {
    const snapshot = await getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc')))
    const doc = snapshot.docs.map((d) => d.data() as any).find((d) => d.slug === params.slug)
    if (doc) {
      const fallback = PROJECTS.find((p) => p.slug === doc.slug)
      title = doc.title || fallback?.title || ''
      summary = doc.summary || fallback?.summary || ''
      afterImage = doc.afterImage || fallback?.after.src || ''
    }
  } catch {}

  if (!title) {
    const fallback = PROJECTS.find((p) => p.slug === params.slug)
    if (!fallback) return {}
    title = fallback.title
    summary = fallback.summary
    afterImage = fallback.after.src
  }

  return generateSEO({
    title: `${title} — Önce & Sonra`,
    description: summary,
    image: afterImage,
    path: `/projeler/${params.slug}`,
  })
}

export default function ProjeDetayPage({ params }: { params: { slug: string } }) {
  return <ProjeDetayClient slug={params.slug} />
}
