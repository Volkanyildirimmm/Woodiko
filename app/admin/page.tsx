'use client'

import { useAuth } from '@/context/AuthContext'
import { useState, useEffect } from 'react'
import { collection, getCountFromServer } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Briefcase, Images, Wrench, Settings, Inbox, Eye } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [formCount, setFormCount] = useState('0')
  const [pageViews, setPageViews] = useState('0')

  useEffect(() => {
    const fetchFormCount = async () => {
      try {
        const snapshot = await getCountFromServer(collection(db, 'forms'))
        setFormCount(snapshot.data().count.toString())
      } catch (error) {
        console.error('Form sayısı alınamadı:', error)
      }
    }
    
    const fetchAnalytics = async () => {
      try {
        const snapshot = await getCountFromServer(collection(db, 'page_views'))
        setPageViews(snapshot.data().count.toString())
      } catch (error) {
        console.error('Görüntüleme sayısı alınamadı:', error)
      }
    }
    
    fetchFormCount()
    fetchAnalytics()
  }, [])

  const stats = [
    { name: 'Sayfa Görüntüleme', value: pageViews, icon: Eye, href: '/admin', color: 'text-indigo-500' },
    { name: 'Gelen Formlar', value: formCount, icon: Inbox, href: '/admin/forms', color: 'text-rose-500' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif font-bold text-wood-dark">Hoş Geldiniz, Admin</h2>
        <p className="text-wood-medium mt-1">Woodiko web sitesi yönetim paneline hoş geldiniz. (Giriş yapan: {user?.email})</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.name} href={stat.href} className="block h-full">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-cream h-full flex flex-col justify-between">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-wood-medium leading-tight">
                    {stat.name}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-wood-dark">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="border-cream flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-lg font-serif">Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <Link href="/admin/blog/new" className="block px-4 py-3 bg-cream-light hover:bg-cream rounded-lg text-wood-dark font-medium transition-colors">
              + Yeni Blog Yazısı Ekle
            </Link>
            <Link href="/admin/projects/new" className="block px-4 py-3 bg-cream-light hover:bg-cream rounded-lg text-wood-dark font-medium transition-colors">
              + Yeni Proje Ekle
            </Link>
            <Link href="/admin/gallery" className="block px-4 py-3 bg-cream-light hover:bg-cream rounded-lg text-wood-dark font-medium transition-colors">
              + Galeriye Görsel Yükle
            </Link>
          </CardContent>
        </Card>

        <Card className="border-cream bg-wood-dark text-cream flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-lg font-serif flex items-center gap-2">
              <Settings className="text-gold w-5 h-5" /> Site Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 justify-between">
            <p className="text-sm text-cream/70 mb-6">
              Google Analytics, Tag Manager, Facebook Pixel kodlarını ve sitenin iletişim bilgilerini Ayarlar sayfasından yönetebilirsiniz.
            </p>
            <div>
              <Link href="/admin/settings" className="inline-block px-4 py-2 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded transition-colors">
                Ayarlara Git
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
