'use client'

import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { useSiteSettings } from '@/context/SiteSettingsContext'

export function IletisimContactInfo() {
  const { contact } = useSiteSettings()
  const waNumber = contact.whatsapp.replace(/\D/g, '')

  return (
    <>
      <div>
        <h2 className="font-serif text-2xl font-bold text-wood-dark mb-6">Bize Ulaşın</h2>
        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-gold" />
            </div>
            <div>
              <p className="font-semibold text-wood-dark text-sm mb-1">Adres</p>
              <p className="text-wood-medium/70 text-sm">{contact.address}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
              <Phone size={18} className="text-gold" />
            </div>
            <div>
              <p className="font-semibold text-wood-dark text-sm mb-1">Telefon</p>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-wood-medium/70 text-sm hover:text-gold transition-colors">
                {contact.phone}
              </a>
            </div>
          </div>
          {waNumber && (
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                <MessageCircle size={18} className="text-gold" />
              </div>
              <div>
                <p className="font-semibold text-wood-dark text-sm mb-1">WhatsApp</p>
                <a
                  href={`https://wa.me/${waNumber}?text=Merhaba, bilgi almak istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wood-medium/70 text-sm hover:text-gold transition-colors"
                >
                  +{waNumber}
                </a>
              </div>
            </div>
          )}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
              <Mail size={18} className="text-gold" />
            </div>
            <div>
              <p className="font-semibold text-wood-dark text-sm mb-1">E-posta</p>
              <a href={`mailto:${contact.email}`} className="text-wood-medium/70 text-sm hover:text-gold transition-colors">
                {contact.email}
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
              <Clock size={18} className="text-gold" />
            </div>
            <div>
              <p className="font-semibold text-wood-dark text-sm mb-1">Çalışma Saatleri</p>
              <p className="text-wood-medium/70 text-sm">{contact.workingHours}</p>
              <p className="text-wood-medium/50 text-xs mt-0.5">Pazar günleri kapalı</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden h-56 bg-cream border border-cream">
        <iframe
          src={contact.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Woodiko konum haritası"
        />
      </div>
    </>
  )
}
