import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const VARIANTS: Record<string, { title: string; subtitle: string }> = {
  default: {
    title: 'Woodiko',
    subtitle: 'Ankara\'nın Özel Mobilya Ustası',
  },
  'mutfak-dolabi': {
    title: 'Mutfak Dolabı',
    subtitle: 'Ankara\'da Kişiye Özel Mutfak Tasarımı',
  },
  'yatak-odasi': {
    title: 'Yatak Odası',
    subtitle: 'Hayalinizdeki Yatak Odası Mobilyaları',
  },
  gardirop: {
    title: 'Gardırop',
    subtitle: 'Ölçülerinize Özel Gardırop Tasarımı',
  },
  'banyo-dolabi': {
    title: 'Banyo Dolabı',
    subtitle: 'Neme Dayanıklı, Şık Banyo Çözümleri',
  },
  'tv-unitesi': {
    title: 'TV Ünitesi',
    subtitle: 'Salonunuza Özel TV Ünitesi Tasarımı',
  },
  'giyinme-odasi': {
    title: 'Giyinme Odası',
    subtitle: 'Walk-in Closet ve Özel Giyinme Odası',
  },
  blog: {
    title: 'Mobilya Rehberi',
    subtitle: 'Woodiko Blog — İlham, İpucu, Rehber',
  },
}

const CREAM = '#F5F0E8'
const WOOD_DARK = '#2C1810'
const GOLD = '#C9A84C'

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const key = params.slug.replace(/\.(jpg|jpeg|png|webp)$/i, '')
  const variant = VARIANTS[key] ?? VARIANTS.default

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: WOOD_DARK,
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(201,168,76,0.18) 0%, transparent 55%), radial-gradient(circle at 15% 90%, rgba(92,58,33,0.55) 0%, transparent 50%)',
          padding: '72px 88px',
          color: CREAM,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              backgroundColor: '#5C3A21',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}
          >
            <span
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: CREAM,
                fontFamily: 'serif',
                lineHeight: 1,
              }}
            >
              W
            </span>
          </div>
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: 8,
              color: CREAM,
              fontFamily: 'serif',
            }}
          >
            WOODIKO
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              width: 120,
              height: 6,
              backgroundColor: GOLD,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: CREAM,
              lineHeight: 1.05,
              fontFamily: 'serif',
              maxWidth: 980,
            }}
          >
            {variant.title}
          </div>
          <div
            style={{
              fontSize: 38,
              color: 'rgba(245,240,232,0.72)',
              fontWeight: 400,
              maxWidth: 900,
            }}
          >
            {variant.subtitle}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(245,240,232,0.18)',
            paddingTop: 28,
          }}
        >
          <span
            style={{
              fontSize: 26,
              color: 'rgba(245,240,232,0.55)',
              letterSpacing: 2,
            }}
          >
            1982&apos;den bu yana Yıldırım Mobilya
          </span>
          <span
            style={{
              fontSize: 30,
              color: GOLD,
              fontWeight: 600,
              letterSpacing: 1.5,
            }}
          >
            woodiko.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
