'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, updateDoc, doc, orderBy, query, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { CheckCircle2, Loader2, MessageCircle, Phone, Clock, Mail, MapPin, Trash2, Layers, Plus, X, Search, Filter } from 'lucide-react'
import { SERVICES } from '@/lib/constants'

type FormStatus = 'yeni' | 'incelendi' | 'gorusuldu' | 'fiyat_verildi' | 'olcu_alindi' | 'iptal'

interface FormSubmission {
  id: string
  service: string
  area: number
  budget: string
  district: string
  name: string
  phone: string
  email: string
  note?: string
  status: FormStatus
  createdAt: any
}

export default function FormsAdminPage() {
  const [forms, setForms] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  
  // Filters
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Add Manual Form
  const [isAdding, setIsAdding] = useState(false)
  const [newForm, setNewForm] = useState({
    name: '', phone: '', district: '', service: 'Mutfak Dolabı', note: '', status: 'gorusuldu' as FormStatus
  })
  const [addingLoading, setAddingLoading] = useState(false)

  useEffect(() => {
    fetchForms()
  }, [])

  const fetchForms = async () => {
    try {
      const q = query(collection(db, 'forms'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FormSubmission))
      setForms(data)
    } catch (error) {
      console.error('Formlar çekilirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: FormStatus) => {
    try {
      await updateDoc(doc(db, 'forms', id), { status: newStatus })
      setForms(forms.map(f => f.id === id ? { ...f, status: newStatus } : f))
    } catch (error) {
      console.error('Durum güncellenirken hata:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu formu/müşteriyi silmek istediğinize emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'forms', id))
        setForms(forms.filter(f => f.id !== id))
      } catch (error) {
        console.error('Silinirken hata:', error)
      }
    }
  }

  const handleAddManualForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddingLoading(true)
    try {
      const docRef = await addDoc(collection(db, 'forms'), {
        name: newForm.name,
        phone: newForm.phone,
        district: newForm.district,
        service: newForm.service,
        note: newForm.note,
        status: newForm.status,
        email: 'Belirtilmedi',
        area: 0,
        budget: 'Belirtilmedi',
        createdAt: serverTimestamp()
      })
      
      // Update local state to show immediately
      const addedForm: FormSubmission = {
        id: docRef.id,
        ...newForm,
        email: 'Belirtilmedi',
        area: 0,
        budget: 'Belirtilmedi',
        createdAt: { seconds: Math.floor(Date.now() / 1000) }
      }
      setForms([addedForm, ...forms])
      setIsAdding(false)
      setNewForm({ name: '', phone: '', district: '', service: 'Mutfak Dolabı', note: '', status: 'gorusuldu' })
    } catch (error) {
      console.error('Manuel eklenirken hata:', error)
      alert('Eklenirken bir hata oluştu.')
    } finally {
      setAddingLoading(false)
    }
  }

  const getStatusColor = (status: FormStatus) => {
    switch (status) {
      case 'yeni': return 'bg-rose-100 text-rose-700 border-rose-200'
      case 'incelendi': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'gorusuldu': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'fiyat_verildi': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'olcu_alindi': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'iptal': return 'bg-gray-100 text-gray-700 border-gray-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const filteredForms = forms.filter(form => {
    const matchStatus = filterStatus === 'all' || form.status === filterStatus
    const matchSearch = form.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        form.phone.includes(searchQuery)
    return matchStatus && matchSearch
  })

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-wood-dark">Gelen Formlar & Müşteriler</h2>
          <p className="text-wood-medium mt-1">Siteden gelen formları ve kendi eklediğiniz müşterileri yönetin.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-dark text-wood-dark font-bold rounded-lg transition-colors shadow-sm"
        >
          {isAdding ? <><X size={18} /> İptal Et</> : <><Plus size={18} /> Yeni Müşteri Ekle</>}
        </button>
      </div>

      {isAdding && (
        <Card className="border-gold bg-gold/5 shadow-md">
          <CardContent className="p-6">
            <h3 className="font-serif font-bold text-lg mb-4 text-wood-dark">Manuel Müşteri Kaydı</h3>
            <form onSubmit={handleAddManualForm} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Müşteri Adı <span className="text-red-500">*</span></label>
                <input required value={newForm.name} onChange={e => setNewForm({...newForm, name: e.target.value})} type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Telefon <span className="text-red-500">*</span></label>
                <input required value={newForm.phone} onChange={e => setNewForm({...newForm, phone: e.target.value})} type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Semt/İlçe</label>
                <input value={newForm.district} onChange={e => setNewForm({...newForm, district: e.target.value})} type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">İlgilendiği Hizmet</label>
                <select value={newForm.service} onChange={e => setNewForm({...newForm, service: e.target.value})} className="w-full p-2 border rounded-md bg-white">
                  {SERVICES.map(s => <option key={s.slug} value={s.title}>{s.title}</option>)}
                  <option value="Diğer">Diğer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mevcut Durum</label>
                <select value={newForm.status} onChange={e => setNewForm({...newForm, status: e.target.value as FormStatus})} className="w-full p-2 border rounded-md bg-white">
                  <option value="gorusuldu">Görüşüldü</option>
                  <option value="fiyat_verildi">Fiyat Verildi</option>
                  <option value="olcu_alindi">Ölçü Alındı</option>
                  <option value="yeni">Yeni Eklendi</option>
                </select>
              </div>
              <div className="lg:col-span-3">
                <label className="block text-sm font-medium mb-1">Not / Detay</label>
                <textarea value={newForm.note} onChange={e => setNewForm({...newForm, note: e.target.value})} className="w-full p-2 border rounded-md" rows={2}></textarea>
              </div>
              <div className="lg:col-span-3 flex justify-end">
                <button type="submit" disabled={addingLoading} className="px-6 py-2 bg-wood-dark hover:bg-wood-dark/90 text-cream rounded-md font-medium flex items-center gap-2">
                  {addingLoading ? <Loader2 className="animate-spin" size={16} /> : 'Müşteriyi Kaydet'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-cream shadow-sm">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-wood-medium/50" />
          <input 
            type="text" 
            placeholder="İsim veya telefon ile ara..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-cream rounded-lg outline-none focus:border-gold transition-colors text-sm"
          />
        </div>
        <div className="sm:w-64 relative">
          <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-wood-medium/50" />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-cream rounded-lg outline-none focus:border-gold transition-colors text-sm bg-white appearance-none cursor-pointer"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="yeni">Yeni Formlar</option>
            <option value="incelendi">İncelendi</option>
            <option value="gorusuldu">Görüşüldü</option>
            <option value="fiyat_verildi">Fiyat Verildi</option>
            <option value="olcu_alindi">Ölçü Alındı</option>
            <option value="iptal">İptal / Olumsuz</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center text-wood-medium">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : filteredForms.length === 0 ? (
        <div className="p-10 text-center text-wood-medium bg-white rounded-xl border border-cream shadow-sm">
          Bu kriterlere uygun kayıt bulunmuyor.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredForms.map((form) => (
            <Card key={form.id} className="border-cream overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Left info */}
                  <div className="p-5 md:w-1/3 bg-cream-light/50 border-r border-cream">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-serif font-bold text-lg text-gold shadow-sm shrink-0">
                        {form.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-wood-dark leading-tight">{form.name}</div>
                        <div className="text-xs text-wood-medium/60 mt-0.5">
                          {form.createdAt?.seconds ? formatDate(new Date(form.createdAt.seconds * 1000).toISOString()) : 'Manuel Kayıt'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <a href={`tel:${form.phone}`} className="flex items-center gap-2 text-sm text-wood-dark hover:text-gold transition-colors">
                        <Phone size={14} className="text-gold" /> {form.phone}
                      </a>
                      {form.email && form.email !== 'Belirtilmedi' && (
                        <a href={`mailto:${form.email}`} className="flex items-center gap-2 text-sm text-wood-dark hover:text-gold transition-colors truncate">
                          <Mail size={14} className="text-gold shrink-0" /> {form.email}
                        </a>
                      )}
                      {form.district && (
                        <div className="flex items-center gap-2 text-sm text-wood-dark">
                          <MapPin size={14} className="text-gold shrink-0" /> {form.district}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Details */}
                  <div className="p-5 md:w-2/3 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-serif font-bold text-wood-dark">{form.service}</h3>
                        {form.area > 0 && (
                          <div className="flex items-center gap-3 mt-1 text-xs text-wood-medium/80">
                            <span className="flex items-center gap-1"><Layers size={12} /> {form.area} m²</span>
                            <span className="flex items-center gap-1 text-gold font-semibold">{form.budget}</span>
                          </div>
                        )}
                      </div>
                      
                      <select 
                        value={form.status}
                        onChange={(e) => handleStatusChange(form.id, e.target.value as FormStatus)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-md border outline-none cursor-pointer shadow-sm ${getStatusColor(form.status)}`}
                      >
                        <option value="yeni">1. Yeni / İncelenecek</option>
                        <option value="incelendi">2. İncelendi</option>
                        <option value="gorusuldu">3. Müşteriyle Görüşüldü</option>
                        <option value="fiyat_verildi">4. Fiyat Teklifi Verildi</option>
                        <option value="olcu_alindi">5. Ölçü Alındı / Anlaşıldı</option>
                        <option value="iptal">X. İptal / Olumsuz</option>
                      </select>
                    </div>

                    <div className="flex-1 bg-white border border-cream rounded-md p-3 mb-4 text-sm">
                      <h4 className="text-[10px] font-bold text-wood-medium/50 uppercase tracking-wider mb-1">Müşteri Notu / Detay</h4>
                      <p className="text-wood-dark whitespace-pre-wrap">
                        {form.note || <span className="italic text-wood-medium/40">Not girilmemiş.</span>}
                      </p>
                    </div>

                    <div className="flex justify-end gap-2 mt-auto">
                      <a 
                        href={`https://wa.me/${form.phone.replace(/\D/g, '')}?text=Merhaba ${form.name.split(' ')[0]}, Woodiko'dan yazıyorum.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 font-medium rounded-md text-xs transition-colors flex items-center gap-1.5 border border-green-200"
                      >
                        <MessageCircle size={14} /> WhatsApp
                      </a>
                      <button 
                        onClick={() => handleDelete(form.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-100"
                        title="Kaydı Sil"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
