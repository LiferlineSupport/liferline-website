import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NewsletterBanner from '@/components/NewsletterBanner'

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
    default: 'Forever Cables | Hand-Built Boutique Guitar Patch Cables | Liferline',
    template: '%s | Liferline',
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
  description:
    'Boutique guitar patch cables and instrument cables hand-soldered in the USA with Canare and Mogami wire and Neutrik connectors. Every cable backed by a lifetime guarantee. Buy once, keep forever.',
  keywords: [
    'guitar instrument cable',
    'guitar patch cables',
    'best guitar patch cables',
    'guitar pedal patch cables',
    'pedalboard cables',
    'best instrument cable for guitar',
    'best instrument cable',
    'best instrument cable for bass',
    'best patch cable for guitar pedals',
    'boutique guitar cables',
    'handmade guitar cables',
    'custom patch cables',
    'american made guitar cables',
    'lifetime guarantee guitar cable',
    'Canare GS-6 patch cable',
    'Mogami patch cable',
    'Neutrik guitar cable',
    'bass guitar instrument cable',
  ],
  openGraph: {
    title: 'Forever Cables by Hatch Patch Cables',
    description: 'Hand-Built. American-Made. Guaranteed for Life.',
    url: 'https://liferline.com',
    siteName: 'Forever Cables',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Forever Cables by Hatch Patch Cables' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forever Cables by Hatch Patch Cables',
    description: 'Boutique guitar patch cables, hand-soldered in the USA. Guaranteed for life.',
    images: ['/twitter-image'],
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
      <body className="bg-bg text-cream font-sans min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-accent focus:text-bg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Script
          defer
          data-domain="liferline.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        )}
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <NewsletterBanner />
      </body>
    </html>
  )
}
