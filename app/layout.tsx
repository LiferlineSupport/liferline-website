import type { Metadata } from 'next'
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
  title: 'Liferline Cable Company — Hand-Built. American-Made. Guaranteed for Life.',
  description:
    'Boutique guitar patch cables hand-soldered in the USA. Every cable is built to last a lifetime — and backed by our lifetime guarantee.',
  openGraph: {
    title: 'Liferline Cable Company',
    description: 'Hand-Built. American-Made. Guaranteed for Life.',
    url: 'https://liferline.com',
    siteName: 'Liferline Cable Company',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-bg text-cream font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
