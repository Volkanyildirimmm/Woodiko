export const SITE_NAME = 'Woodiko'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://woodiko.com'
export const SITE_DESCRIPTION =
  '1982\'den bu yana Yıldırım Mobilya güvencesiyle Ankara\'da kişiye özel mobilya tasarımı ve üretimi. Mutfak dolabı, yatak odası, gardırop ve banyo dolabı için ücretsiz keşif randevusu alın.'
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+905077347521'

export const SERVICES = [
  {
    slug: 'mutfak-dolabi',
    title: 'Mutfak Dolabı',
    shortTitle: 'Mutfak',
    description: 'Mutfağınıza özel, ergonomik ve estetik dolap çözümleri.',
    icon: 'UtensilsCrossed',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  },
  {
    slug: 'yatak-odasi',
    title: 'Yatak Odası',
    shortTitle: 'Yatak Odası',
    description: 'Rüya yatak odanız için kişiselleştirilmiş mobilya setleri.',
    icon: 'Bed',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
  },
  {
    slug: 'gardirop',
    title: 'Gardırop',
    shortTitle: 'Gardırop',
    description: 'Giysi ve aksesuarlarınız için akıllıca tasarlanmış gardıroplar.',
    icon: 'DoorOpen',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    slug: 'banyo-dolabi',
    title: 'Banyo Dolabı',
    shortTitle: 'Banyo',
    description: 'Neme dayanıklı malzemelerle şık banyo depolama çözümleri.',
    icon: 'Bath',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
  },
  {
    slug: 'tv-unitesi',
    title: 'TV Ünitesi',
    shortTitle: 'TV Ünitesi',
    description: 'Oturma odanızı tamamlayan şık TV üniteleri ve duvar rafları.',
    icon: 'Tv',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  },
  {
    slug: 'giyinme-odasi',
    title: 'Giyinme Odası',
    shortTitle: 'Giyinme Odası',
    description: 'Hayalinizdeki giyinme odasını gerçeğe dönüştürüyoruz.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
  },
]

export const NAV_LINKS = [
  { href: '/', label: 'Anasayfa' },
  { href: '/hizmetler', label: 'Hizmetler' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/projeler', label: 'Projeler' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/blog', label: 'Blog' },
  { href: '/iletisim', label: 'İletişim' },
]

export const CONTACT_INFO = {
  address: 'Şenyüz Sk. No:6/1 Siteler, Altındağ / Ankara',
  phone: '+90 507 734 75 21',
  whatsapp: WHATSAPP_NUMBER,
  email: 'info@woodiko.com',
  hours: 'Pazartesi – Cumartesi: 09:00 – 18:30',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.5!2d32.5986!3d39.9512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f9b5b5b5b5b%3A0x0!2sSiteler%2C%20Alt%C4%B1nda%C4%9F%2C%20Ankara!5e0!3m2!1str!2str!4v1234567890',
}

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Selin Kaya',
    location: 'Yaşamkent, Ankara',
    text: 'Mutfak dolabımızı Woodiko\'ya yaptırdık, çok memnun kaldık. Hem tasarım hem de kalite açısından beklentilerimizi fazlasıyla karşıladı. Keşif aşamasından montaja kadar her şey profesyonelce yönetildi.',
    rating: 5,
    service: 'Mutfak Dolabı',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80&fit=crop',
  },
  {
    id: 2,
    name: 'Mehmet Demir',
    location: 'Çayyolu, Ankara',
    text: 'Yatak odamız için yaptırdığımız gardırop mükemmel oldu. Ölçülerimize tam uydu ve malzeme kalitesi gerçekten üst düzey. Usta ekip çok özenli çalıştı, hiçbir sorun yaşamadık.',
    rating: 5,
    service: 'Gardırop',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&q=80&fit=crop',
  },
  {
    id: 3,
    name: 'Ayşe Yılmaz',
    location: 'Ümitköy, Ankara',
    text: '10 yıllık garanti ve kişiye özel tasarım dediklerinde şüpheyle yaklaştım ama harika bir iş çıkardılar. Banyo dolabım hem şık hem çok kullanışlı. Fiyat-kalite dengesi mükemmel.',
    rating: 5,
    service: 'Banyo Dolabı',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&q=80&fit=crop',
  },
  {
    id: 4,
    name: 'Burak Arslan',
    location: 'Bağlıca, Ankara',
    text: 'Giyinme odası projem için birkaç firma ile görüştüm. Woodiko hem fiyat hem hizmet kalitesinde fark yarattı. Tasarımcıları isteklerimi çok iyi anladı ve harika bir sonuç ortaya çıktı.',
    rating: 5,
    service: 'Giyinme Odası',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&q=80&fit=crop',
  },
]

export const FAQ_ITEMS = [
  {
    question: 'Keşif randevusu ücretli mi?',
    answer:
      'Hayır, keşif randevumuz tamamen ücretsizdir. Uzmanlarımız evinize gelerek ölçüm alır, ihtiyaçlarınızı dinler ve size özel tasarım seçenekleri sunar.',
  },
  {
    question: 'Teslim süresi ne kadar?',
    answer:
      'Projenin büyüklüğüne göre değişmekle birlikte, ölçüm alındıktan sonra ortalama 4-6 hafta içinde montaj tamamlanmaktadır. Keşif randevusunda net bir takvim paylaşılır.',
  },
  {
    question: 'Hangi malzemeleri kullanıyorsunuz?',
    answer:
      'E1 sınıfı MDF ve sunta, full overlay menteşeler, Yumuşak kapanma sistemleri (damper), alüminyum profil ve doğal ahşap kaplama seçenekleri sunuyoruz. Tüm malzemelerimiz Türk Standartları Enstitüsü onaylıdır.',
  },
  {
    question: 'Garantiniz var mı?',
    answer:
      'Tüm ürünlerimizde 10 yıl yapısal garanti sunuyoruz. Menteşe ve ray gibi mekanik parçalarda ise üretici garantisi ek olarak geçerlidir.',
  },
  {
    question: 'Ankara dışına hizmet veriyor musunuz?',
    answer:
      'Şu anda yalnızca Ankara ve ilçelerine hizmet vermekteyiz. Yakın gelecekte Ankara çevresi illeri de kapsamımıza dahil etmeyi planlıyoruz.',
  },
  {
    question: 'Ödeme seçenekleriniz neler?',
    answer:
      'Sipariş onayında %30 kapora, montaj tamamlandığında kalan ödeme şeklinde çalışıyoruz. Nakit, havale/EFT ve kredi kartı ile ödeme kabul edilmektedir.',
  },
  {
    question: 'Fiyatlar nasıl belirleniyor?',
    answer:
      'Fiyatlandırmamız metrekare bazındadır ve seçilen malzeme, aksesuar ve tasarım karmaşıklığına göre değişir. Keşif sonrası size özel net fiyat teklifi sunulur.',
  },
  {
    question: 'Mevcut mobilyamı değiştirmeden sadece kapak yenileyebilir miyim?',
    answer:
      'Evet, sadece kapak ve aksesuar yenileme hizmeti de veriyoruz. Bu seçenek daha ekonomik bir çözüm arayan müşterilerimiz için idealdir.',
  },
]
