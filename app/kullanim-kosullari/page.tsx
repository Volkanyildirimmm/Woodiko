import { Metadata } from 'next'
import Link from 'next/link'
import { generateSEO } from '@/lib/seo'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

export const metadata: Metadata = generateSEO({
  title: 'Kullanım Koşulları',
  description:
    'Woodiko (Yıldırım Mobilya) web sitesinin kullanımına ilişkin koşullar, telif hakları, sorumluluk sınırlamaları ve geçerli hukuk.',
  path: '/kullanim-kosullari',
})

const LAST_UPDATE = '11 Mayıs 2026'

export default function TermsOfUsePage() {
  return (
    <div className="pt-20 min-h-screen bg-cream-light">
      <section className="py-12 bg-wood-dark text-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Kullanım Koşulları</h1>
            <p className="text-cream/70 max-w-2xl mx-auto text-sm leading-relaxed">
              Web sitemizi kullanırken geçerli olan koşullar, haklar ve sorumluluklar.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <article className="space-y-10 text-wood-medium/80 text-sm md:text-base leading-relaxed">
            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                1. Genel Hükümler
              </h2>
              <p>
                İşbu Kullanım Koşulları,{' '}
                <a href="https://woodiko.com" className="text-gold hover:underline">woodiko.com</a> web sitesini (&quot;Site&quot;) ziyaret eden ve kullanan tüm kişiler (&quot;Kullanıcı&quot;) ile <strong>Yıldırım Mobilya</strong> (Woodiko markası altında faaliyet göstermektedir; &quot;Woodiko&quot;) arasındaki ilişkiyi düzenler.
              </p>
              <p className="mt-3">
                Siteyi kullanmaya başladığınız andan itibaren bu koşulları kabul etmiş sayılırsınız. Koşulları kabul etmiyorsanız Site&apos;yi kullanmamanızı rica ederiz.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                2. Hizmetin Tanımı
              </h2>
              <p>
                Woodiko, Ankara&apos;da kişiye özel mobilya tasarımı, üretimi ve montajı hizmetleri sunmaktadır. Site, sunulan hizmetlerin tanıtımı, müşteri taleplerinin alınması ve iletişim sağlanması amacıyla kullanılır.
              </p>
              <p className="mt-3">
                Site üzerinden gerçekleştirilen tüm bilgi paylaşımı, fiyatlandırma ve teklifler bilgilendirme amaçlıdır. Bağlayıcı sözleşme, taraflar arasında ayrıca yapılacak yazılı sözleşme ile kurulur.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                3. Fikri Mülkiyet Hakları
              </h2>
              <p>
                Site&apos;deki tüm içerik, görseller, logolar, ürün fotoğrafları, proje görselleri, blog yazıları, tasarımlar ve metinler{' '}
                <strong>Yıldırım Mobilya</strong>&apos;ya aittir veya kullanım hakkı yasal olarak temin edilmiştir. 5846 sayılı Fikir ve Sanat Eserleri Kanunu ile diğer ilgili mevzuat kapsamında korunmaktadır.
              </p>
              <p className="mt-3">
                Yazılı izin alınmaksızın bu içeriklerin tamamının veya bir kısmının kopyalanması, çoğaltılması, dağıtılması, ticari amaçla kullanılması veya başka bir mecrada yayınlanması yasaktır.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                4. Kullanıcı Yükümlülükleri
              </h2>
              <p>Site&apos;yi kullanırken aşağıdaki kurallara uymayı kabul edersiniz:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1.5">
                <li>Doğru, güncel ve eksiksiz bilgi sağlamak</li>
                <li>Başkasının kimliğini veya iletişim bilgilerini kullanmamak</li>
                <li>Site&apos;nin işleyişini bozacak, yavaşlatacak veya zarar verecek davranışlardan kaçınmak</li>
                <li>Otomatik araçlar (bot, scraper vb.) ile yetkisiz veri toplamamak</li>
                <li>Site&apos;ye virüs, kötü amaçlı yazılım veya zararlı kod yüklememek</li>
                <li>Yürürlükteki kanunlara, kamu düzenine ve ahlaka aykırı kullanımdan kaçınmak</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                5. Teklif ve Fiyatlandırma
              </h2>
              <p>
                Site&apos;de yer alan fiyat aralıkları, m² hesaplamaları ve teklif formu çıktıları <strong>tahmini ve bilgi amaçlıdır</strong>. Nihai fiyat, ücretsiz keşif sonrası mekan ölçüleri, malzeme seçimi, donanım tercihleri ve işçilik kapsamına göre belirlenir.
              </p>
              <p className="mt-3">
                Web sitesi üzerinden alınan ön teklifler bağlayıcı sözleşme niteliğinde değildir. Sipariş süreci, taraflar arasında imzalanacak sözleşme ile başlar.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                6. Üçüncü Taraf Bağlantılar
              </h2>
              <p>
                Site, üçüncü taraflara ait sitelere (sosyal medya hesapları, ortak siteler vb.) bağlantılar içerebilir. Bu bağlantılar yalnızca bilgilendirme amacıyla sunulmuştur. Üçüncü taraf sitelerin içeriği, gizlilik uygulamaları veya hizmetleri Woodiko&apos;nun sorumluluğunda değildir.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                7. Sorumluluk Sınırlaması
              </h2>
              <p>
                Site&apos;deki bilgilerin doğru ve güncel olması için makul özen gösteriyoruz; ancak içeriklerin kesintisiz, hatasız ve eksiksiz olacağı garanti edilmez. Site&apos;deki bilgilere dayanılarak alınan kararlardan doğabilecek doğrudan veya dolaylı zararlardan Woodiko sorumlu tutulamaz.
              </p>
              <p className="mt-3">
                Site&apos;nin geçici olarak kesintiye uğraması, bakım/güncelleme nedeniyle erişilememesi veya teknik nedenlerle hata vermesi durumunda Woodiko&apos;nun herhangi bir sorumluluğu bulunmamaktadır.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                8. Gizlilik
              </h2>
              <p>
                Kişisel verilerinizin nasıl işlendiği, çerezlerin kullanımı ve haklarınız için lütfen{' '}
                <Link href="/gizlilik-politikasi" className="text-gold hover:underline">
                  Gizlilik Politikası
                </Link>
                ,{' '}
                <Link href="/kvkk-aydinlatma-metni" className="text-gold hover:underline">
                  KVKK Aydınlatma Metni
                </Link>{' '}
                ve{' '}
                <Link href="/cerez-politikasi" className="text-gold hover:underline">
                  Çerez Politikası
                </Link>
                &apos;nı inceleyiniz.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                9. Koşullarda Değişiklik
              </h2>
              <p>
                Woodiko, işbu Kullanım Koşulları&apos;nı önceden bildirimde bulunmaksızın değiştirme hakkını saklı tutar. Güncel sürüm her zaman bu sayfada yayınlanır ve yayın tarihinden itibaren geçerli olur. Site&apos;yi kullanmaya devam etmeniz, güncel koşulları kabul ettiğiniz anlamına gelir.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                10. Geçerli Hukuk ve Yetkili Mahkeme
              </h2>
              <p>
                İşbu Kullanım Koşulları, Türkiye Cumhuriyeti yasalarına tabidir. Doğabilecek uyuşmazlıkların çözümünde <strong>Ankara Mahkemeleri ve İcra Daireleri</strong> yetkilidir.
              </p>
              <p className="text-xs text-wood-medium/50 mt-4">Son güncelleme: {LAST_UPDATE}</p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-wood-dark mb-3">
                11. İletişim
              </h2>
              <p>Kullanım koşullarımız hakkında sorularınız için bize ulaşabilirsiniz:</p>
              <ul className="mt-2 space-y-1">
                <li>
                  <strong>Yıldırım Mobilya</strong>
                </li>
                <li>Adres: Şenyüz Sk. No:6/1 Siteler, Altındağ / Ankara</li>
                <li>Telefon: +90 507 734 75 21</li>
                <li>
                  E-posta:{' '}
                  <a href="mailto:info@woodiko.com" className="text-gold hover:underline">
                    info@woodiko.com
                  </a>
                </li>
              </ul>
            </section>

            <div className="pt-6 border-t border-wood-medium/10 flex flex-wrap gap-4 text-sm">
              <Link href="/kvkk-aydinlatma-metni" className="text-gold hover:underline">
                KVKK Aydınlatma Metni
              </Link>
              <Link href="/cerez-politikasi" className="text-gold hover:underline">
                Çerez Politikası
              </Link>
              <Link href="/gizlilik-politikasi" className="text-gold hover:underline">
                Gizlilik Politikası
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
