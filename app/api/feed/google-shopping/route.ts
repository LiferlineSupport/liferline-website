import { NextResponse } from 'next/server'
import { products, formatPrice } from '@/lib/products'

const BASE_URL = 'https://liferline.com'
const BRAND = 'Forever Cables'
const GOOGLE_CATEGORY = 'Arts & Entertainment > Hobbies & Creative Arts > Musical Instruments > Musical Instrument Accessories > String Instrument Accessories > Guitar Accessories'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function priceString(cents: number): string {
  return `${(cents / 100).toFixed(2)} USD`
}

interface FeedItem {
  id: string
  title: string
  description: string
  link: string
  imageLink: string
  price: string
  availability: string
  brand: string
  condition: string
  googleCategory: string
  identifierExists: boolean
  shipping: string
  customLabel0: string
}

function buildItems(): FeedItem[] {
  const items: FeedItem[] = []

  for (const product of products) {
    if (product.variants.length > 0) {
      for (const variant of product.variants) {
        const variantPrice = variant.price ?? product.price
        items.push({
          id: `${product.id}-${variant.value}`,
          title: `${product.name} ${variant.label} Guitar Cable`,
          description: escapeXml(product.description),
          link: `${BASE_URL}/products/${product.slug}`,
          imageLink: `${BASE_URL}${product.image}`,
          price: priceString(variantPrice),
          availability: 'in_stock',
          brand: BRAND,
          condition: 'new',
          googleCategory: GOOGLE_CATEGORY,
          identifierExists: false,
          shipping: 'US:::0.00 USD',
          customLabel0: product.slug === 'the-stage-cable' ? 'instrument-cable' : 'patch-cable',
        })
      }
    } else {
      items.push({
        id: product.id,
        title: `${product.name} Guitar Cable Bundle`,
        description: escapeXml(product.description),
        link: `${BASE_URL}/products/${product.slug}`,
        imageLink: `${BASE_URL}${product.image}`,
        price: priceString(product.price),
        availability: 'in_stock',
        brand: BRAND,
        condition: 'new',
        googleCategory: GOOGLE_CATEGORY,
        identifierExists: false,
        shipping: 'US:::0.00 USD',
        customLabel0: 'bundle',
      })
    }
  }

  return items
}

function buildXml(items: FeedItem[]): string {
  const itemsXml = items
    .map(
      (item) => `    <item>
      <g:id>${escapeXml(item.id)}</g:id>
      <title>${escapeXml(item.title)}</title>
      <description>${item.description}</description>
      <link>${item.link}</link>
      <g:image_link>${item.imageLink}</g:image_link>
      <g:price>${item.price}</g:price>
      <g:availability>${item.availability}</g:availability>
      <g:brand>${escapeXml(item.brand)}</g:brand>
      <g:condition>${item.condition}</g:condition>
      <g:google_product_category>${escapeXml(item.googleCategory)}</g:google_product_category>
      <g:identifier_exists>${item.identifierExists ? 'true' : 'false'}</g:identifier_exists>
      <g:shipping>${item.shipping}</g:shipping>
      <g:custom_label_0>${item.customLabel0}</g:custom_label_0>
    </item>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Forever Cables by Hatch Patch Cables</title>
    <link>${BASE_URL}</link>
    <description>Hand-built boutique guitar patch cables and instrument cables. Guaranteed for life.</description>
${itemsXml}
  </channel>
</rss>`
}

export async function GET() {
  const items = buildItems()
  const xml = buildXml(items)

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
