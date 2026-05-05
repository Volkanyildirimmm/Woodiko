'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const [settings, setSettings] = useState({
    seo: {
      googleAnalyticsId: '',
      googleTagManagerId: '',
      googleSearchConsoleKey: '',
      facebookPixelId: '',
    },
    contact: {
      phone: '',
      whatsapp: '',
      email: '',
      address: '',
      mapUrl: '',
      workingHours: '',
    },
    social: {
      instagramUrl: '',
      facebookUrl: '',
      youtubeUrl: '',
    }
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'general')
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          // Merge existing settings with defaults to avoid undefined errors
          setSettings(prev => ({
            seo: { ...prev.seo, ...docSnap.data().seo },
            contact: { ...prev.contact, ...docSnap.data().contact },
            social: { ...prev.social, ...docSnap.data().social }
          }))
        }
      } catch (error) {
        console.error("Ayarlar yüklenirken hata:", error)
        setMessage({ text: 'Ayarlar yüklenemedi.', type: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleChange = (section: 'seo' | 'contact' | 'social', field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage({ text: '', type: '' })
    try {
      const docRef = doc(db, 'settings', 'general')
      await setDoc(docRef, settings, { merge: true })
      setMessage({ text: 'Ayarlar başarıyla kaydedildi.', type: 'success' })
      
      // Mesajı 3 saniye sonra gizle
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    } catch (error) {
      console.error("Ayarlar kaydedilirken hata:", error)
      setMessage({ text: 'Kaydetme işlemi başarısız oldu.', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="animate-pulse">Ayarlar yükleniyor...</div>
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-wood-dark">Site Ayarları</h2>
          <p className="text-wood-medium mt-1">SEO, iletişim ve sosyal medya bilgilerini yönetin.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {/* SEO & Tracking */}
      <Card className="border-cream">
        <CardHeader>
          <CardTitle>Google & Meta (SEO/Tracking)</CardTitle>
          <CardDescription>Analytics, Pixel ve Search console etiketlerinizi buraya girin.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-wood-dark">Google Analytics ID (örn: G-XXXXXXX)</label>
            <input 
              type="text" 
              value={settings.seo.googleAnalyticsId}
              onChange={(e) => handleChange('seo', 'googleAnalyticsId', e.target.value)}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
              placeholder="G-..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-wood-dark">Google Tag Manager ID</label>
            <input 
              type="text" 
              value={settings.seo.googleTagManagerId}
              onChange={(e) => handleChange('seo', 'googleTagManagerId', e.target.value)}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
              placeholder="GTM-..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-wood-dark">Google Search Console Verification Key</label>
            <input 
              type="text" 
              value={settings.seo.googleSearchConsoleKey}
              onChange={(e) => handleChange('seo', 'googleSearchConsoleKey', e.target.value)}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
              placeholder="HTML etiketindeki content içeriği"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-wood-dark">Facebook Pixel ID</label>
            <input 
              type="text" 
              value={settings.seo.facebookPixelId}
              onChange={(e) => handleChange('seo', 'facebookPixelId', e.target.value)}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
            />
          </div>
        </CardContent>
      </Card>

      {/* İletişim */}
      <Card className="border-cream">
        <CardHeader>
          <CardTitle>İletişim Bilgileri</CardTitle>
          <CardDescription>Sitedeki footer ve iletişim sayfasında gösterilecek bilgiler.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-wood-dark">Telefon (Gösterim)</label>
            <input 
              type="text" 
              value={settings.contact.phone}
              onChange={(e) => handleChange('contact', 'phone', e.target.value)}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
              placeholder="+90 507 734 75 21"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-wood-dark">WhatsApp Numarası (Sadece Rakam)</label>
            <input 
              type="text" 
              value={settings.contact.whatsapp}
              onChange={(e) => handleChange('contact', 'whatsapp', e.target.value)}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
              placeholder="905077347521"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-wood-dark">E-posta</label>
            <input 
              type="email" 
              value={settings.contact.email}
              onChange={(e) => handleChange('contact', 'email', e.target.value)}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
              placeholder="info@woodiko.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-wood-dark">Çalışma Saatleri</label>
            <input 
              type="text" 
              value={settings.contact.workingHours}
              onChange={(e) => handleChange('contact', 'workingHours', e.target.value)}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
              placeholder="Pzt-Cmt: 09:00 - 19:00"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-wood-dark">Açık Adres</label>
            <textarea 
              value={settings.contact.address}
              onChange={(e) => handleChange('contact', 'address', e.target.value)}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none min-h-[80px]" 
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-wood-dark">Google Maps Embed URL (src içi)</label>
            <input 
              type="text" 
              value={settings.contact.mapUrl}
              onChange={(e) => handleChange('contact', 'mapUrl', e.target.value)}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none text-xs font-mono" 
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Sosyal Medya */}
      <Card className="border-cream">
        <CardHeader>
          <CardTitle>Sosyal Medya Linkleri</CardTitle>
          <CardDescription>Tam URL olarak giriniz (https:// ile başlayan).</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-wood-dark">Instagram</label>
            <input 
              type="url" 
              value={settings.social.instagramUrl}
              onChange={(e) => handleChange('social', 'instagramUrl', e.target.value)}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-wood-dark">Facebook</label>
            <input 
              type="url" 
              value={settings.social.facebookUrl}
              onChange={(e) => handleChange('social', 'facebookUrl', e.target.value)}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-wood-dark">YouTube</label>
            <input 
              type="url" 
              value={settings.social.youtubeUrl}
              onChange={(e) => handleChange('social', 'youtubeUrl', e.target.value)}
              className="w-full px-4 py-2 border border-cream rounded-lg focus:ring-1 focus:ring-gold outline-none" 
            />
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
