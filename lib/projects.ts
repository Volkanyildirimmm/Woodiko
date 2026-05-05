export interface Project {
  slug: string
  title: string
  location: string
  category: string
  style: string
  duration: string
  area: string
  summary: string
  challenge: string
  solution: string
  materials: string[]
  before: { src: string; alt: string }
  after: { src: string; alt: string }
  gallery: { src: string; alt: string }[]
  completedAt: string
  testimonial?: { name: string; text: string; rating: number }
}

export const PROJECTS: Project[] = [
  {
    slug: 'yasamkent-modern-mutfak',
    title: 'Yaşamkent Modern Mutfak',
    location: 'Yaşamkent, Ankara',
    category: 'Mutfak Dolabı',
    style: 'Modern',
    duration: '5 hafta',
    area: '14 m²',
    summary: 'Dar ve eski bir mutfağı, ada tasarımlı, tam donanımlı modern bir mutfağa dönüştürdük.',
    challenge: 'Mevcut mutfak 14 m² olmasına rağmen köşe kullanımı verimsizdi, depolama alanı yetersizdi ve mevcut tezgah son derece eskimişti. Müşteri, adalı bir mutfak istiyordu ancak alan buna izin vermiyordu.',
    solution: 'Köşeye Lemans mekanizması yerleştirerek o alanı tamamen işlevsel hale getirdik. Duvar boyunca uzanan üst dolaplar ve tavan yüksekliğini kullanan ek raf alanıyla depolama kapasitesini %60 artırdık. Küçük bir yarım ada ekleyerek hem ek tezgah alanı hem de oturma imkânı yarattık.',
    materials: [
      'Akrilik beyaz kapak (mat)',
      'Kompakt granit tezgah — antrasit',
      'Blum Legrabox çekmece sistemi',
      'Köşe için Lemans mekanizması',
      'Soft-close menteşe ve raylar',
      'LED altlık aydınlatması',
    ],
    before: {
      src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
      alt: 'Yaşamkent mutfak öncesi — eski ve verimsiz alan',
    },
    after: {
      src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
      alt: 'Yaşamkent mutfak sonrası — modern adalı mutfak',
    },
    gallery: [
      { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', alt: 'Mutfak çekmece detayı' },
      { src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80', alt: 'Mutfak genel görünüm' },
      { src: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=800&q=80', alt: 'Mutfak tezgah detayı' },
    ],
    completedAt: '2024-02-10',
    testimonial: {
      name: 'Selin & Emre Kaya',
      text: 'Küçük mutfağımızı bu kadar işlevsel ve güzel hale getireceklerini hayal edemezdik. Adalı mutfak hayalimizdi, Woodiko bunu gerçeğe dönüştürdü.',
      rating: 5,
    },
  },
  {
    slug: 'cayyolu-giyinme-odasi',
    title: 'Çayyolu Walk-in Closet',
    location: 'Çayyolu, Ankara',
    category: 'Giyinme Odası',
    style: 'Minimalist',
    duration: '4 hafta',
    area: '9 m²',
    summary: 'Depo olarak kullanılan 9 m²\'lik odayı lüks bir giyinme odasına çevirdik.',
    challenge: 'Oda uzun ve dar bir yapıya sahipti (2×4.5m), depo olarak kullanılıyor ve aydınlatması yetersizdi. Müşteri, tüm kıyafetlerini, ayakkabılarını ve aksesuarlarını ayrı ayrı düzenlemek istiyordu.',
    solution: 'İki uzun duvar boyunca simetrik raf ve elbise askılığı sistemi kurduk. Ortaya alçak bir adacık ekleyerek hem çekmece alanı hem de giyinme tezgâhı elde ettik. Gizli LED aydınlatma ile tüm raf ve askılıkları görebilir hale getirdik. Girişe tam boy ayna kapı ekledik.',
    materials: [
      'Mat lake MDF kapak — off-white',
      'Kadife iç çekmece kaplama',
      'Tam boy ayna kapı',
      'Gizli LED profil aydınlatma',
      'Alüminyum çerçeveli raf sistemleri',
      'Ahşap kaplama adacık tezgahı',
    ],
    before: {
      src: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
      alt: 'Çayyolu giyinme odası öncesi — dağınık depo odası',
    },
    after: {
      src: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
      alt: 'Çayyolu giyinme odası sonrası — lüks walk-in closet',
    },
    gallery: [
      { src: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80', alt: 'Giyinme odası raf detayı' },
      { src: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80', alt: 'Giyinme odası genel' },
      { src: 'https://images.unsplash.com/photo-1556909172-74b2297ef851?w=800&q=80', alt: 'Giyinme odası adacık' },
    ],
    completedAt: '2024-01-20',
    testimonial: {
      name: 'Ayşe Yılmaz',
      text: 'Her sabah bu odaya girdiğimde hâlâ inanamıyorum. Depo gibi bir odadan bu kadar şık bir giyinme odası çıkacağını kim düşünürdü?',
      rating: 5,
    },
  },
  {
    slug: 'umitkoey-klasik-gardirop',
    title: 'Ümitköy Klasik Gardırop',
    location: 'Ümitköy, Ankara',
    category: 'Gardırop',
    style: 'Klasik',
    duration: '3 hafta',
    area: '6 m²',
    summary: 'Yatak odası nişine tam oturan, klasik çizgili sürgülü gardırop projesi.',
    challenge: 'Yatak odası nişi standart dışı ölçüdeydi (280×240cm), hazır gardıroplar uymuyordu. Klasik stil isteyen müşteri, ayna ve ahşap kaplama kombinasyonu talep ediyordu.',
    solution: 'Nişin tam ölçüsüne göre 4 panelli sürgülü gardırop tasarladık. İki panel mat ayna, iki panel ise ceviz kaplama ile kapladık. İç kısımda çift kat elbise askılığı, çekmece bloku ve özel aksesuar bölmeleri oluşturduk.',
    materials: [
      'Ceviz kaplama kapak paneli',
      'Mat gri çerçeveli ayna paneller',
      'Alüminyum sürgülü ray sistemi',
      'Softclose mekanizma',
      'İç aksesuar: çift kat askılık, çekmece bloku',
      'LED iç aydınlatma',
    ],
    before: {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      alt: 'Ümitköy yatak odası gardırop öncesi',
    },
    after: {
      src: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80',
      alt: 'Ümitköy klasik gardırop sonrası',
    },
    gallery: [
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Gardırop kapı detayı' },
      { src: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80', alt: 'Gardırop iç görünüm' },
    ],
    completedAt: '2023-12-05',
    testimonial: {
      name: 'Mehmet Demir',
      text: 'Hazır gardıroplar uymuyordu, ölçüye göre yaptırmaktan başka çare yoktu. Woodiko hem fiyat hem kalite açısından harika bir iş çıkardı.',
      rating: 5,
    },
  },
  {
    slug: 'incek-banyo-yenileme',
    title: 'İncek Banyo Dolabı Yenileme',
    location: 'İncek, Ankara',
    category: 'Banyo Dolabı',
    style: 'Modern',
    duration: '2 hafta',
    area: '5 m²',
    summary: 'Nem ve şişme sorunlarıyla bozulan banyoyu, neme dayanıklı modern çözümlerle yeniledik.',
    challenge: 'Mevcut banyo dolabı nem nedeniyle şişmiş ve kullanılamaz hale gelmişti. Lavabo altı dolabı tamamen çürümüştü. Müşteri, hem işlevsel hem şık ama fazla yer kaplamayan bir çözüm istiyordu.',
    solution: 'Su geçirmez PVC kaplı MDF ile lavabo altı asma dolap, ayna dolap ve yan raf ünitesi tasarladık. Paslanmaz çelik aksesuarlar ve cam raflarla hem estetik hem dayanıklı bir sistem oluşturduk. Gizli kablo kanalları ile aydınlatmayı temiz entegre ettik.',
    materials: [
      'Su geçirmez PVC kaplı MDF',
      'Paslanmaz çelik kulplar ve aksesuarlar',
      'Temperli cam raflar',
      'Aydınlatmalı ayna dolap',
      'Neme dayanıklı menteşe ve raylar',
      'Seramik lavabo entegrasyonu',
    ],
    before: {
      src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
      alt: 'İncek banyo öncesi — nem hasarlı eski dolap',
    },
    after: {
      src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
      alt: 'İncek banyo sonrası — modern neme dayanıklı sistem',
    },
    gallery: [
      { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', alt: 'Banyo dolabı genel görünüm' },
    ],
    completedAt: '2024-03-01',
  },
  {
    slug: 'baglica-yatak-odasi-seti',
    title: 'Bağlıca Yatak Odası Seti',
    location: 'Bağlıca, Ankara',
    category: 'Yatak Odası',
    style: 'Modern',
    duration: '6 hafta',
    area: '20 m²',
    summary: 'Yeni evin boş büyük yatak odasını karyola, gardırop, şifonyer ve komodinlerle donattık.',
    challenge: 'Geniş oda (20m²) tamamen boştu. Müşteri yüksek tavandan faydalanmak istiyor, yatak başlığından TV ünitesine kadar her şeyin entegre olmasını talep ediyordu. Renk paleti olarak antrasit-doğal ahşap kombinasyonu seçildi.',
    solution: 'Tavan yüksekliğini kullanan gardırop duvarı, entegre yatak başlığı ve TV paneli, iki taraflı komodinler ve şifonyer tasarladık. Her parçanın birbiriyle uyumlu olması için tek elden üretim yaptık. Gizli LED aydınlatma ile oda ambiyansını tamamladık.',
    materials: [
      'Antrasit boyalı MDF kasalar',
      'Doğal meşe kaplama yüzeyler',
      'Ekolojik deri yatak başlığı kaplama',
      'Gizli LED profil aydınlatma',
      'Blum Tandembox çekmece sistemleri',
      'Cam ve ayna aksan paneller',
    ],
    before: {
      src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      alt: 'Bağlıca yatak odası öncesi — boş oda',
    },
    after: {
      src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
      alt: 'Bağlıca yatak odası sonrası — tam donanımlı set',
    },
    gallery: [
      { src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80', alt: 'Yatak odası genel görünüm' },
      { src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', alt: 'Yatak başlığı detayı' },
    ],
    completedAt: '2024-02-25',
    testimonial: {
      name: 'Burak & Merve Arslan',
      text: 'Boş odamıza girip nasıl dolduracağımızı hayal edemiyorduk. Zeynep Hanım\'ın tasarımları bizi ikna etti. Sonuç hayallerimizin ötesinde oldu.',
      rating: 5,
    },
  },
  {
    slug: 'cankaya-tv-duvar-unitesi',
    title: 'Çankaya TV Duvar Ünitesi',
    location: 'Çankaya, Ankara',
    category: 'TV Ünitesi',
    style: 'Minimalist',
    duration: '2 hafta',
    area: '8 m²',
    summary: 'Salonun tüm duvarını kaplayan, şömine entegrasyonlu TV ve kitaplık ünitesi.',
    challenge: 'Müşteri, TV\'nin oturma odasında dominant görünmesinden şikayetçiydi. Hem kitaplık hem depolama hem de TV ünitesi istiyordu. Duvar 4 metre genişliğindeydi.',
    solution: 'Tüm duvarı kaplayan, asimetrik kompozisyon tasarladık. Sol tarafa kitaplık ve kapalı depolama, ortaya gizli şömine modülü ve TV nişi, sağ tarafa ise dekorasyona açık açık raflar yerleştirdik. Ahşap kaplama ve mat siyah boyalı MDF kontrast oluşturdu.',
    materials: [
      'Doğal meşe kaplama açık raflar',
      'Mat siyah boyalı MDF kapalı dolaplar',
      'Elektrikli şömine modülü',
      'Gizli kablo yönetim kanalları',
      'LED arka panel aydınlatması',
      'Cam vitrin kapaklı bölmeler',
    ],
    before: {
      src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      alt: 'Çankaya salon öncesi — boş TV duvarı',
    },
    after: {
      src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      alt: 'Çankaya salon sonrası — duvar TV ünitesi',
    },
    gallery: [
      { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', alt: 'TV ünitesi genel görünüm' },
    ],
    completedAt: '2024-03-10',
  },
]
