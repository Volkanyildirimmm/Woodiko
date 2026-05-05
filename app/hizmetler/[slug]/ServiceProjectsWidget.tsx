'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ImageIcon } from 'lucide-react'

interface ProjectData {
  slug: string
  title: string
  afterImage: string
}

export function ServiceProjectsWidget({ category }: { category: string }) {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, 'projects'),
          where('category', '==', category),
          orderBy('createdAt', 'desc'),
          limit(3)
        )
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map(doc => doc.data() as ProjectData)
        setProjects(data)
      } catch (error) {
        console.error("Projeler yüklenirken hata:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [category])

  if (loading || projects.length === 0) return null

  return (
    <div className="bg-cream rounded-xl p-5 border border-cream shadow-sm">
      <h3 className="font-serif text-lg font-bold text-wood-dark mb-4 border-b border-wood-medium/10 pb-2">Önceki İşlerimiz</h3>
      <div className="space-y-4">
        {projects.map((project) => (
          <Link key={project.slug} href={`/projeler/${project.slug}`} className="group flex gap-3 items-center">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-cream-light shrink-0">
              {project.afterImage ? (
                <Image
                  src={project.afterImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="64px"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-wood-medium/30">
                  <ImageIcon size={20} />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-wood-dark group-hover:text-gold transition-colors line-clamp-2 leading-tight">
                {project.title}
              </h4>
              <span className="text-xs text-wood-medium/60 mt-1 flex items-center gap-1 group-hover:text-gold/80 transition-colors">
                İncele <ArrowRight size={10} />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/projeler" className="block text-center text-xs font-semibold text-gold mt-4 pt-3 border-t border-wood-medium/10 hover:text-gold-dark transition-colors">
        Tüm Projeleri Gör
      </Link>
    </div>
  )
}
