import { Metadata } from 'next'
import Link from 'next/link'
import { generateSEO } from '@/lib/seo'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { CookieSettingsButton } from './CookieSettingsButton'

export const metadata: Metadata = generateSEO({
  title: 'Çerez Politikası',
  description:
    'Woodiko (woodiko.com) tarafından kullanılan çerezler, kullanım amaçları ve çerez tercihlerinizi nasıl yönetebileceğinize ilişkin bilgilendirme.',
  path: '/cerez-politikasi',
})

const LAST_UPDATE = '11 Mayıs 2026'

export default function CookiePolicyPage() {
  return (
    <div className="pt-20 min-h-screen bg-cream-light">
      <section className="py-12 bg-wood-dark text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Çerez Politikası</h1>
            <p className="text-cream/70 max-w-2xl mx-auto text-sm leading-relaxed">
              Sitede kullanılan çerez türleri, amaçları ve tercihlerinizi yönetme seçenekleri.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <article className="space-y-10 text-wood-medium/80 text-sm md:text-base leading-relaxed">
            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                Çerez Nedir?
              </h2>
              <p>
                Çerezler, web sitelerini ziyaret ettiğinizde tarayıcınıza küçük metin dosyaları olarak kaydedilen verilerdir. Web sitesinin işlevselliğini sağlamak, kullanıcı deneyimini iyileştirmek ve analitik veri toplamak için kullanılırlar.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                Kullandığımız Çerez Türleri
              </h2>

              <h3 className="font-serif text-lg font-bold text-wood-dark mt-5 mb-2">
                1. Zorunlu Çerezler
              </h3>
              <p>Sitenin temel işlevlerinin çalışması için gereklidir. Devre dışı bırakılamazlar.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Oturum çerezleri</li>
                <li>Güvenlik çerezleri</li>
                <li>Form gönderim çerezleri</li>
              </ul>

              <h3 className="font-serif text-lg font-bold text-wood-dark mt-5 mb-2">
                2. Analitik Çerezler
              </h3>
              <p>Ziyaretçi davranışlarını anonim olarak analiz etmemizi sağlar.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Google Analytics 4 (_ga, _gid)</li>
                <li>Hangi sayfaların ziyaret edildiği</li>
                <li>Sitede geçirilen süre</li>
                <li>Trafik kaynakları</li>
              </ul>

              <h3 className="font-serif text-lg font-bold text-wood-dark mt-5 mb-2">
                3. Pazarlama Çerezleri
              </h3>
              <p>
                Size ilgi alanlarınıza göre özelleştirilmiş içerik ve reklamlar sunmamızı sağlar.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Meta Pixel (_fbp, _fbc)</li>
                <li>Google Ads conversion takibi</li>
                <li>Yeniden pazarlama (remarketing) çerezleri</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                Çerez Tercihlerinizi Nasıl Yönetebilirsiniz?
              </h2>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li>
                  Sitedeki <CookieSettingsButton /> butonuyla dilediğiniz an tercihlerinizi güncelleyebilirsiniz.
                </li>
                <li>Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz.</li>
                <li>
                  Üçüncü taraf çerezleri için ilgili platformların opt-out araçlarını kullanabilirsiniz.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                Tarayıcı Bazlı Çerez Yönetimi
              </h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Chrome:</strong> Ayarlar &gt; Gizlilik ve güvenlik &gt; Çerezler ve diğer site verileri
                </li>
                <li>
                  <strong>Firefox:</strong> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Site Verileri
                </li>
                <li>
                  <strong>Safari:</strong> Tercihler &gt; Gizlilik &gt; Çerezler ve web sitesi verileri
                </li>
                <li>
                  <strong>Edge:</strong> Ayarlar &gt; Çerezler ve site izinleri
                </li>
              </ul>
            </section>

            <p className="text-xs text-wood-medium/50 pt-4 border-t border-wood-medium/10">
              Son güncelleme: {LAST_UPDATE}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-sm">
              <Link href="/kvkk-aydinlatma-metni" className="text-gold hover:underline">
                KVKK Aydınlatma Metni
              </Link>
              <Link href="/gizlilik-politikasi" className="text-gold hover:underline">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-kosullari" className="text-gold hover:underline">
                Kullanım Koşulları
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
