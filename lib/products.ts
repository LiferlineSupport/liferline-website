export interface ProductVariant {
  label: string
  value: string
  price?: number
  stripePriceId?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  longDescription: string
  specs: string[]
  price: number
  currency: string
  stripePriceId: string
  variants: ProductVariant[]
  badge?: string
  featured?: boolean
}

export const products: Product[] = [
  {
    id: 'workhorse-6',
    slug: 'the-workhorse',
    name: 'The Workhorse',
    tagline: '6" Straight-to-Straight',
    description:
      'Our most popular pedalboard staple. Hand-soldered with Mogami W2319 cable and Neutrik straight plugs for a clean, tight connection every time.',
    longDescription:
      'The Workhorse is the cable that started it all. Built with Mogami W2319 low-capacitance cable and Neutrik straight plugs, it delivers transparent tone transfer with zero coloration. Every joint is hand-soldered and stress-tested before it ships. Whether you are wiring a five-pedal grab-and-go board or a 20-pedal studio rig, The Workhorse keeps your signal clean and your setup reliable for years.',
    specs: [
      'Mogami W2319 cable',
      'Neutrik NP2X-B straight plugs',
      'Hand-soldered connections',
      'Available in 6", 12", and 18"',
      'Lifetime guarantee',
    ],
    price: 1800,
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_WORKHORSE_6 ?? '',
    variants: [
      { label: '6"', value: '6in' },
      { label: '12"', value: '12in' },
      { label: '18"', value: '18in' },
    ],
    featured: true,
  },
  {
    id: 'workhorse-ra',
    slug: 'the-right-angle',
    name: 'The Right Angle',
    tagline: '6" Straight-to-Right-Angle',
    description:
      'Perfect for tight pedalboard layouts. One straight, one angled. Fits flush to any pedal housing and saves you precious board space.',
    longDescription:
      'Same Mogami W2319 cable and Neutrik build quality as The Workhorse, with a right-angle connector on one end. The angled plug sits flush against pedal housings and saves precious millimeters on crowded boards. If your pedals have top-mounted jacks or you are running tight spacing, The Right Angle is the cable you need.',
    specs: [
      'Mogami W2319 cable',
      'Neutrik NP2RX-B right-angle + NP2X-B straight plugs',
      'Hand-soldered connections',
      'Available in 6" and 12"',
      'Lifetime guarantee',
    ],
    price: 2000,
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_RIGHT_ANGLE ?? '',
    variants: [
      { label: '6"', value: '6in' },
      { label: '12"', value: '12in' },
    ],
  },
  {
    id: 'pedalboard-pack',
    slug: 'the-pedalboard-pack',
    name: 'The Pedalboard Pack',
    tagline: '6-Pack, Mixed Lengths',
    description:
      'Everything you need to wire your board in one shot. Includes two 6", two 12", and two 18" Workhorses, all hand-built, all guaranteed for life.',
    longDescription:
      'Wire your entire pedalboard in one order. The Pedalboard Pack includes six Workhorse cables in a mix of lengths: two 6-inch, two 12-inch, and two 18-inch. Every cable is built with the same Mogami W2319 wire and Neutrik connectors as our singles, and every one carries the Forever Cables lifetime guarantee. You save compared to buying six cables individually, and you get the flexibility to handle any board layout.',
    specs: [
      '2x 6" Workhorse cables',
      '2x 12" Workhorse cables',
      '2x 18" Workhorse cables',
      'Mogami W2319 cable throughout',
      'Neutrik NP2X-B straight plugs',
      'Lifetime guarantee on every cable',
    ],
    price: 9500,
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_PACK ?? '',
    variants: [],
    badge: 'Best Value',
    featured: true,
  },
  {
    id: 'stage-cable',
    slug: 'the-stage-cable',
    name: 'The Stage Cable',
    tagline: '10ft Instrument Cable',
    description:
      'Hand-soldered with Mogami W2524 and Neutrik NP2X plugs. Dead quiet, tour-grade durable, guaranteed for life. Replace your cheapest cable first.',
    longDescription:
      'The Stage Cable is built for the run from your guitar to your amp or your board to your amp. Mogami W2524 is a heavier-gauge, ultra-low-noise instrument cable trusted by touring professionals worldwide. Paired with Neutrik NP2X plugs and hand-soldered connections, it delivers dead-quiet performance night after night. Available in 10, 15, and 20-foot lengths to fit any stage or studio setup.',
    specs: [
      'Mogami W2524 instrument cable',
      'Neutrik NP2X-B straight plugs',
      'Hand-soldered connections',
      'Available in 10ft, 15ft, and 20ft',
      'Lifetime guarantee',
    ],
    price: 3800,
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_STAGE_10 ?? process.env.STRIPE_PRICE_STAGE ?? '',
    variants: [
      { label: '10ft', value: '10ft', price: 3800, stripePriceId: process.env.STRIPE_PRICE_STAGE_10 ?? process.env.STRIPE_PRICE_STAGE ?? '' },
      { label: '15ft', value: '15ft', price: 4400, stripePriceId: process.env.STRIPE_PRICE_STAGE_15 ?? '' },
      { label: '20ft', value: '20ft', price: 4900, stripePriceId: process.env.STRIPE_PRICE_STAGE_20 ?? '' },
    ],
  },
]

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getVariantPriceId(product: Product, variantValue: string | undefined): string {
  if (variantValue) {
    const variant = product.variants.find((v) => v.value === variantValue)
    if (variant?.stripePriceId) return variant.stripePriceId
  }
  return product.stripePriceId
}

export function getVariantPrice(product: Product, variantValue: string | undefined): number {
  if (variantValue) {
    const variant = product.variants.find((v) => v.value === variantValue)
    if (variant?.price != null) return variant.price
  }
  return product.price
}
