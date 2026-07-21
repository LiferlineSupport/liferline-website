import { ImageResponse } from 'next/og'

export const alt = 'Forever Cables by Liferline'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#080806',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 72,
              fontWeight: 700,
              color: '#f0ece0',
              letterSpacing: '-1px',
            }}
          >
            Forever Cables
          </span>
          <span
            style={{
              fontSize: 20,
              color: '#c8973e',
              letterSpacing: '6px',
              textTransform: 'uppercase' as const,
            }}
          >
            by Liferline
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 48,
            gap: 40,
            color: '#888',
            fontSize: 18,
          }}
        >
          <span>Hand-Built</span>
          <span style={{ color: '#c8973e' }}>+</span>
          <span>American-Made</span>
          <span style={{ color: '#c8973e' }}>+</span>
          <span>Guaranteed for Life</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
