import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#080806',
          borderRadius: 36,
        }}
      >
        <span
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 120,
            fontWeight: 700,
            color: '#c8973e',
          }}
        >
          F
        </span>
      </div>
    ),
    { ...size }
  )
}
