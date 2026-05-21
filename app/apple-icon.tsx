import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2C1810',
          color: '#C9A84C',
          fontSize: 120,
          fontWeight: 800,
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: -4,
        }}
      >
        W
      </div>
    ),
    { ...size }
  )
}
