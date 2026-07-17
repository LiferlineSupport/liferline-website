import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://liferline.com'),
  title: {
    default: 'Forever Cables by Liferline | Hand-Built Boutique Guitar Patch Cables',
    template: '%s | Liferline Cable Company',
  },
  description:
    'Boutique guitar patch cables hand-soldered in the USA with Mogami wire and Neutrik connectors. Every cable backed by a lifetime guarantee. Buy once, keep forever.',
  keywords: [
    'boutique guitar cables',
    'handmade guitar cables',
    'guitar patch cables',
    'custom patch cables',
    'best guitar patch cables',
    'pedalboard cables',
    'american made guitar cables',
    'lifetime guarantee guitar cable',
    'Mogami patch cable',
    'Neutrik guitar cable',
  ],
  openGraph: {
    title: 'Forever Cables by Liferline',
    description: 'Hand-Built. American-Made. Guaranteed for Life.',
    url: 'https://liferline.com',
    siteName: 'Liferline Cable Company',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Forever Cables by Liferline',
    description: 'Boutique guitar patch cables, hand-soldered in the USA. Guaranteed for life.',
  },
  alternates: {
    canonical: 'https://liferline.com',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <Script
          defer
          data-domain="liferline.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-bg text-cream font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
