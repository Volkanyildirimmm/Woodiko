import { Metadata } from 'next'
import Link from 'next/link'
import { generateSEO } from '@/lib/seo'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

export const metadata: Metadata = generateSEO({
  title: 'KVKK Aydınlatma Metni',
  description:
    '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Woodiko (Yıldırım Mobilya) tarafından yapılan kişisel veri işleme faaliyetleri hakkında aydınlatma metni.',
  path: '/kvkk-aydinlatma-metni',
  noIndex: false,
})

const LAST_UPDATE = '11 Mayıs 2026'

export default function KVKKPage() {
  return (
    <div className="pt-20 min-h-screen bg-cream-light">
      <section className="py-12 bg-wood-dark text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              KVKK Aydınlatma Metni
            </h1>
            <p className="text-cream/70 max-w-2xl mx-auto text-sm leading-relaxed">
              6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesine ilişkin bilgilendirme.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <article className="prose-woodiko space-y-10 text-wood-medium/80 text-sm md:text-base leading-relaxed">
            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                1. Veri Sorumlusu
              </h2>
              <p>
                <strong>Yıldırım Mobilya</strong> (Woodiko markası altında faaliyet göstermektedir)
              </p>
              <ul className="mt-2 space-y-1">
                <li>Adres: Şenyüz Sk. No:6/1 Siteler, Altındağ / Ankara</li>
                <li>
                  E-posta:{' '}
                  <a href="mailto:info@woodiko.com" className="text-gold hover:underline">
                    info@woodiko.com
                  </a>
                </li>
                <li>Telefon: +90 507 734 75 21</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                2. İşlenen Kişisel Veriler
              </h2>
              <p>
                woodiko.com web sitesini ziyaret ettiğinizde ve hizmetlerimizden faydalanmak için bizimle iletişime geçtiğinizde aşağıdaki kişisel verileriniz işlenmektedir:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1.5">
                <li>
                  <strong>Kimlik Verileri:</strong> Ad, soyad
                </li>
                <li>
                  <strong>İletişim Verileri:</strong> Telefon numarası, e-posta adresi, adres bilgisi
                </li>
                <li>
                  <strong>Müşteri Bilgileri:</strong> Talep edilen hizmet türü, proje detayları, mekan ölçüleri
                </li>
                <li>
                  <strong>İşlem Güvenliği Verileri:</strong> IP adresi, çerez bilgileri, tarayıcı bilgileri
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                3. Kişisel Verilerin İşlenme Amaçları
              </h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Teklif hazırlanması ve sunulması</li>
                <li>Ücretsiz keşif randevusu organizasyonu</li>
                <li>Sözleşmesel yükümlülüklerin yerine getirilmesi</li>
                <li>Müşteri memnuniyetinin sağlanması ve geliştirilmesi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>İletişim faaliyetlerinin yürütülmesi</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                4. Kişisel Verilerin Aktarılması
              </h2>
              <p>
                Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi kapsamında, gerekli olduğu durumlarda iş ortaklarımıza, tedarikçilerimize ve yasal yükümlülüklerimiz çerçevesinde yetkili kamu kurum ve kuruluşlarına aktarılabilmektedir.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                5. Kişisel Veri Toplama Yöntemi ve Hukuki Sebebi
              </h2>
              <p>
                Kişisel verileriniz; web sitemizdeki formlar, e-posta, telefon ve fiziki iletişim yöntemleri aracılığıyla toplanmaktadır. Hukuki sebepleri:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1.5">
                <li>Kanunlarda açıkça öngörülmesi (KVKK m.5/2-a)</li>
                <li>Bir sözleşmenin kurulması veya ifası (KVKK m.5/2-c)</li>
                <li>Veri sorumlusunun meşru menfaati (KVKK m.5/2-f)</li>
                <li>Açık rıza (KVKK m.5/1)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                6. Kişisel Veri Sahibi Olarak Haklarınız
              </h2>
              <p>KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1.5">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                <li>Eksik veya yanlış işlenmesi hâlinde düzeltilmesini isteme</li>
                <li>Silinmesini veya yok edilmesini isteme</li>
                <li>
                  İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme
                </li>
                <li>
                  Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme
                </li>
              </ul>
              <p className="mt-3">
                Haklarınızı kullanmak için{' '}
                <a href="mailto:info@woodiko.com" className="text-gold hover:underline">
                  info@woodiko.com
                </a>{' '}
                adresine yazılı başvuru yapabilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                7. Saklama Süresi
              </h2>
              <p>
                Kişisel verileriniz, ilgili mevzuatta öngörülen süreler ve işleme amacının gerekli kıldığı süre boyunca saklanır. Sürelerin sona ermesiyle birlikte silinir, yok edilir veya anonim hale getirilir.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                8. Değişiklikler
              </h2>
              <p>
                İşbu Aydınlatma Metni gerektiğinde güncellenebilir. Güncel sürüm her zaman bu sayfada yayınlanır.
              </p>
              <p className="text-xs text-wood-medium/50 mt-4">Son güncelleme: {LAST_UPDATE}</p>
            </section>

            <div className="pt-6 border-t border-wood-medium/10 flex flex-wrap gap-4 text-sm">
              <Link href="/cerez-politikasi" className="text-gold hover:underline">
                Çerez Politikası
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
