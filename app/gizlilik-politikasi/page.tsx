import { Metadata } from 'next'
import Link from 'next/link'
import { generateSEO } from '@/lib/seo'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

export const metadata: Metadata = generateSEO({
  title: 'Gizlilik Politikası',
  description:
    'Woodiko (Yıldırım Mobilya) gizlilik politikası: web sitesi üzerinden topladığımız bilgiler, kullanım amaçları, üçüncü taraf hizmetler ve haklarınız.',
  path: '/gizlilik-politikasi',
})

const LAST_UPDATE = '11 Mayıs 2026'

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20 min-h-screen bg-cream-light">
      <section className="py-12 bg-wood-dark text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Gizlilik Politikası</h1>
            <p className="text-cream/70 max-w-2xl mx-auto text-sm leading-relaxed">
              Web sitemiz üzerinden topladığımız bilgiler ve bu bilgileri nasıl koruduğumuza dair açıklama.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <article className="space-y-10 text-wood-medium/80 text-sm md:text-base leading-relaxed">
            <section>
              <p>
                İşbu Gizlilik Politikası, <strong>Yıldırım Mobilya</strong> (Woodiko markası altında faaliyet göstermektedir; aşağıda &quot;Woodiko&quot; olarak anılacaktır) tarafından{' '}
                <a href="https://woodiko.com" className="text-gold hover:underline">woodiko.com</a> web sitesini ziyaret eden kullanıcıların bilgilerinin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
              </p>
              <p className="mt-3">
                Bu politika, KVKK kapsamındaki yükümlülüklerimize ek olarak hazırlanmıştır. Kişisel verilerinizin işlenmesine dair ayrıntılı bilgi için{' '}
                <Link href="/kvkk-aydinlatma-metni" className="text-gold hover:underline">
                  KVKK Aydınlatma Metni
                </Link>
                &apos;ni inceleyebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                1. Topladığımız Bilgiler
              </h2>
              <p>Web sitemiz üzerinden iki tür bilgi toplanır:</p>

              <h3 className="font-serif text-lg font-bold text-wood-dark mt-5 mb-2">
                a) Sizin Bizimle Paylaştığınız Bilgiler
              </h3>
              <p>
                Teklif formu, iletişim formu veya WhatsApp/e-posta üzerinden bize ulaştığınızda gönüllü olarak paylaştığınız bilgiler:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li>Ad, soyad</li>
                <li>Telefon numarası, e-posta adresi</li>
                <li>Semt/ilçe bilgisi</li>
                <li>Talep edilen hizmet türü, mekan ölçüleri, bütçe aralığı</li>
                <li>Mesaj içeriği ve ek notlar</li>
              </ul>

              <h3 className="font-serif text-lg font-bold text-wood-dark mt-5 mb-2">
                b) Otomatik Toplanan Bilgiler
              </h3>
              <p>
                Siteyi ziyaret ettiğinizde tarayıcınız ve cihazınız aracılığıyla otomatik olarak toplanan teknik bilgiler:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li>IP adresi (anonimleştirilmiş)</li>
                <li>Tarayıcı türü ve sürümü, işletim sistemi</li>
                <li>Cihaz türü (mobil/masaüstü)</li>
                <li>Ziyaret edilen sayfalar, sitede geçirilen süre</li>
                <li>Geldiğiniz kaynak (yönlendiren site veya arama motoru)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                2. Bilgileri Nasıl Kullanıyoruz?
              </h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Teklif hazırlamak ve sunmak</li>
                <li>Ücretsiz keşif randevusu organize etmek</li>
                <li>Talepleriniz hakkında sizinle iletişime geçmek</li>
                <li>Hizmet kalitemizi ve müşteri deneyimini iyileştirmek</li>
                <li>Web sitesi performansını ölçmek ve geliştirmek</li>
                <li>Yasal yükümlülüklerimizi yerine getirmek</li>
              </ul>
              <p className="mt-3">
                Bilgilerinizi <strong>asla</strong> üçüncü taraflara satmıyor veya pazarlama amacıyla paylaşmıyoruz.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                3. Üçüncü Taraf Hizmetler
              </h2>
              <p>
                Sitemizin işleyişi, ölçümlemesi ve iletişim altyapısı için aşağıdaki üçüncü taraf hizmet sağlayıcılarını kullanıyoruz:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1.5">
                <li>
                  <strong>Google Analytics 4 &amp; Google Ads</strong> — Anonim ziyaretçi analitiği ve dönüşüm ölçümü
                </li>
                <li>
                  <strong>Meta Pixel &amp; Conversion API</strong> — Reklam etkinliği ölçümü
                </li>
                <li>
                  <strong>Google Tag Manager</strong> — Etiket yönetimi
                </li>
                <li>
                  <strong>Firebase / Firestore</strong> — Form gönderimlerinin güvenli saklanması (Google Cloud altyapısı)
                </li>
                <li>
                  <strong>Resend</strong> — Form bildirim e-postalarının gönderimi
                </li>
                <li>
                  <strong>Hosting sağlayıcımız</strong> — Sunucu logları, sertifika yönetimi
                </li>
              </ul>
              <p className="mt-3">
                Bu hizmetler, kendi gizlilik politikalarına tabi olup verileri yalnızca tarafımıza hizmet sunmak amacıyla işler. Pazarlama ve analitik çerezleri yalnızca onayınız sonrası aktif olur.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                4. Çerezler
              </h2>
              <p>
                Web sitemiz, deneyiminizi iyileştirmek ve kullanım istatistiklerini ölçmek için çerezler kullanır. Çerez türleri ve tercihlerinizi nasıl yöneteceğiniz hakkında detaylı bilgi için{' '}
                <Link href="/cerez-politikasi" className="text-gold hover:underline">
                  Çerez Politikası
                </Link>
                &apos;na göz atın.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                5. Veri Saklama Süresi
              </h2>
              <p>
                Form gönderimleri ve iletişim kayıtları, talebinizin sonuçlanmasından itibaren ticari ve hukuki yükümlülüklerimiz çerçevesinde en fazla <strong>10 yıl</strong> süreyle saklanır. Pazarlama amaçlı analitik veriler ise üçüncü taraf platformların standart saklama süreleri (genellikle 14–26 ay) kapsamında tutulur.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                6. Veri Güvenliği
              </h2>
              <p>
                Bilgilerinizi yetkisiz erişim, kayıp ve değişikliklerden korumak için makul teknik ve idari güvenlik önlemleri alıyoruz:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li>Tüm site trafiği HTTPS/TLS ile şifrelenir</li>
                <li>Yönetim panellerine yalnızca yetkili personel kimlik doğrulama ile erişebilir</li>
                <li>Form verileri Google Cloud altyapısında erişim kontrollü olarak saklanır</li>
                <li>Üçüncü taraf hizmet sağlayıcılarımız endüstri standartlarında güvenlik önlemleri uygular</li>
              </ul>
              <p className="mt-3">
                Ancak internet üzerinden hiçbir veri aktarımının veya saklama yönteminin %100 güvenli olamayacağını belirtmek isteriz.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                7. Haklarınız
              </h2>
              <p>
                KVKK&apos;nın 11. maddesi kapsamında verilerinize erişme, düzeltme, silme ve işlemeye itiraz etme gibi haklarınız bulunmaktadır. Detaylı bilgi ve başvuru için{' '}
                <Link href="/kvkk-aydinlatma-metni" className="text-gold hover:underline">
                  KVKK Aydınlatma Metni
                </Link>
                &apos;ne bakabilir veya{' '}
                <a href="mailto:info@woodiko.com" className="text-gold hover:underline">
                  info@woodiko.com
                </a>{' '}
                adresine yazabilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                8. Çocukların Gizliliği
              </h2>
              <p>
                Web sitemiz 18 yaşın altındaki kullanıcılara yönelik değildir ve bilinçli olarak çocuklardan kişisel veri toplamayız. 18 yaş altı bir kullanıcının bize bilgi gönderdiğini fark edersek, bu bilgileri en kısa sürede sileriz.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                9. Politikadaki Değişiklikler
              </h2>
              <p>
                Bu Gizlilik Politikası zaman zaman güncellenebilir. Güncel sürüm her zaman bu sayfada yayınlanır; önemli değişikliklerde site üzerinde duyuru yapılır.
              </p>
              <p className="text-xs text-wood-medium/50 mt-4">Son güncelleme: {LAST_UPDATE}</p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                10. İletişim
              </h2>
              <p>Gizlilik politikamız hakkında sorularınız için bize ulaşabilirsiniz:</p>
              <ul className="mt-2 space-y-1">
                <li>
                  E-posta:{' '}
                  <a href="mailto:info@woodiko.com" className="text-gold hover:underline">
                    info@woodiko.com
                  </a>
                </li>
                <li>Telefon: +90 507 734 75 21</li>
                <li>Adres: Şenyüz Sk. No:6/1 Siteler, Altındağ / Ankara</li>
              </ul>
            </section>

            <div className="pt-6 border-t border-wood-medium/10 flex flex-wrap gap-4 text-sm">
              <Link href="/kvkk-aydinlatma-metni" className="text-gold hover:underline">
                KVKK Aydınlatma Metni
              </Link>
              <Link href="/cerez-politikasi" className="text-gold hover:underline">
                Çerez Politikası
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
