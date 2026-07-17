'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#111', color: '#e8e0d4', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '32rem', margin: '8rem auto', padding: '0 1rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8a86e', marginBottom: '1rem', fontWeight: 600 }}>
            Something went wrong
          </p>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            We hit a snag.
          </h1>
          <p style={{ color: '#999', fontSize: '1.125rem', marginBottom: '2.5rem' }}>
            Something unexpected happened. Try again, or reload the page.
          </p>
          <button
            onClick={reset}
            style={{
              backgroundColor: '#c8a86e',
              color: '#111',
              border: 'none',
              padding: '0.75rem 2rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.05em',
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
