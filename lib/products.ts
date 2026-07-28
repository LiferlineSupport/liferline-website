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
  image: string
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
      'Our most popular guitar pedal patch cable. Hand-soldered with Mogami W2319 cable and Neutrik gold straight plugs. Ferrite-filtered, wax-secured, and individually certified before it ships.',
    longDescription:
      'The Workhorse is the guitar patch cable that started it all. Built with Mogami W2319 low-capacitance cable and Neutrik gold straight plugs, it delivers transparent tone transfer with zero coloration. Every joint is hand-soldered and reinforced with flat-wax aerospace-grade cable securing. A ferrite bead is inserted on the hot wire before soldering for EMI rejection. Then each cable is individually tested to certify continuity, shield integrity, capacitance, and impedance before it ships. Whether you are wiring a five-pedal grab-and-go board or a 20-pedal studio rig, The Workhorse keeps your signal clean and your setup reliable for life.',
    specs: [
      'Mogami W2319 cable',
      'Neutrik NP2X-B gold straight plugs',
      'Hand-soldered connections',
      'Flat-wax aerospace-grade cable securing',
      'Ferrite bead on hot wire (EMI rejection)',
      'Individually certified: continuity, shield, capacitance, impedance',
      'Available in 6", 12", and 18"',
      'Forever Guarantee',
    ],
    price: 6995,
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_WORKHORSE_6 ?? '',
    variants: [
      { label: '6"', value: '6in', price: 6995, stripePriceId: process.env.STRIPE_PRICE_WORKHORSE_6 ?? '' },
      { label: '12"', value: '12in', price: 7195, stripePriceId: process.env.STRIPE_PRICE_WORKHORSE_12 ?? '' },
      { label: '18"', value: '18in', price: 7495, stripePriceId: process.env.STRIPE_PRICE_WORKHORSE_18 ?? '' },
    ],
    image: '/products/the-workhorse.png',
    featured: true,
  },
  {
    id: 'workhorse-ra',
    slug: 'the-right-angle',
    name: 'The Right Angle',
    tagline: '6" Straight-to-Right-Angle',
    description:
      'The guitar pedal patch cable for tight layouts. One straight, one angled. Ferrite-filtered, wax-secured, and individually certified. Fits flush to any pedal housing.',
    longDescription:
      'Same Mogami W2319 cable and Neutrik gold build quality as The Workhorse, with a right-angle connector on one end for flush-mounted pedal jacks and tight pedalboard spacing. Like every Forever Cable, it gets a ferrite bead on the hot wire before soldering, flat-wax aerospace-grade securing at the cable entry, and individual certification testing. The angled plug sits flush against pedal housings and saves precious millimeters on crowded boards.',
    specs: [
      'Mogami W2319 cable',
      'Neutrik NP2RX-B gold right-angle + NP2X-B gold straight plugs',
      'Hand-soldered connections',
      'Flat-wax aerospace-grade cable securing',
      'Ferrite bead on hot wire (EMI rejection)',
      'Individually certified: continuity, shield, capacitance, impedance',
      'Available in 6" and 12"',
      'Forever Guarantee',
    ],
    price: 6995,
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_RIGHT_ANGLE ?? '',
    variants: [
      { label: '6"', value: '6in', price: 6995, stripePriceId: process.env.STRIPE_PRICE_RIGHT_ANGLE_6 ?? process.env.STRIPE_PRICE_RIGHT_ANGLE ?? '' },
      { label: '12"', value: '12in', price: 7195, stripePriceId: process.env.STRIPE_PRICE_RIGHT_ANGLE_12 ?? '' },
    ],
    image: '/products/the-right-angle.png',
  },
  {
    id: 'pedalboard-pack',
    slug: 'the-pedalboard-pack',
    name: 'The Pedalboard Pack',
    tagline: '6-Pack, Mixed Lengths',
    description:
      'Six guitar pedal patch cables to wire your entire pedalboard. Two 6", two 12", two 18" Workhorses. Every cable ferrite-filtered, wax-secured, and individually certified. All guaranteed forever.',
    longDescription:
      'Wire your entire pedalboard in one order. The Pedalboard Pack includes six Workhorse cables in a mix of lengths: two 6-inch, two 12-inch, and two 18-inch. Every cable is built with Mogami W2319 wire, Neutrik gold connectors, flat-wax aerospace securing, a ferrite bead on the hot wire, and individual certification testing. Every one carries the Forever Cables Forever Guarantee. You save over $100 compared to buying six cables individually.',
    specs: [
      '2x 6" Workhorse cables',
      '2x 12" Workhorse cables',
      '2x 18" Workhorse cables',
      'Mogami W2319 cable throughout',
      'Neutrik NP2X-B gold straight plugs',
      'Flat-wax aerospace-grade cable securing',
      'Ferrite bead on hot wire (EMI rejection)',
      'Each cable individually certified',
      'Forever Guarantee on every cable',
    ],
    price: 32995,
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_PACK ?? '',
    variants: [],
    image: '/products/the-pedalboard-pack.png',
    badge: 'Best Value',
    featured: true,
  },
  {
    id: 'pedalboard-pack-pro',
    slug: 'the-pedalboard-pack-pro',
    name: 'The Pedalboard Pack Pro',
    tagline: '7-Pack, Mixed Lengths',
    description:
      'Seven guitar pedal patch cables for larger pedalboard rigs. Three 6", two 12", two 18" Workhorses. Every cable ferrite-filtered, wax-secured, and individually certified. All guaranteed forever.',
    longDescription:
      'The Pedalboard Pack Pro covers larger rigs with seven Workhorse cables: three 6-inch, two 12-inch, and two 18-inch. Built with Mogami W2319 wire, Neutrik gold connectors, flat-wax aerospace securing, a ferrite bead on the hot wire, and individual certification testing on every cable. Every one carries the Forever Cables Forever Guarantee. You save over $120 compared to buying seven cables individually.',
    specs: [
      '3x 6" Workhorse cables',
      '2x 12" Workhorse cables',
      '2x 18" Workhorse cables',
      'Mogami W2319 cable throughout',
      'Neutrik NP2X-B gold straight plugs',
      'Flat-wax aerospace-grade cable securing',
      'Ferrite bead on hot wire (EMI rejection)',
      'Each cable individually certified',
      'Forever Guarantee on every cable',
    ],
    price: 38295,
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_PACK_PRO ?? '',
    variants: [],
    image: '/products/the-pedalboard-pack.png',
    badge: 'Pro Rig',
  },
  {
    id: 'pedalboard-pack-xl',
    slug: 'the-pedalboard-pack-xl',
    name: 'The Pedalboard Pack XL',
    tagline: '13-Pack, Mixed Lengths',
    description:
      'Thirteen guitar pedal patch cables for serious pedalboard builders. Five 6", four 12", four 18" Workhorses. Every cable ferrite-filtered, wax-secured, and individually certified. All guaranteed forever.',
    longDescription:
      'The Pedalboard Pack XL is built for serious pedalboard builders with thirteen Workhorse cables: five 6-inch, four 12-inch, and four 18-inch. Built with Mogami W2319 wire, Neutrik gold connectors, flat-wax aerospace securing, a ferrite bead on the hot wire, and individual certification testing on every cable. Every one carries the Forever Cables Forever Guarantee. You save over $225 compared to buying thirteen cables individually.',
    specs: [
      '5x 6" Workhorse cables',
      '4x 12" Workhorse cables',
      '4x 18" Workhorse cables',
      'Mogami W2319 cable throughout',
      'Neutrik NP2X-B gold straight plugs',
      'Flat-wax aerospace-grade cable securing',
      'Ferrite bead on hot wire (EMI rejection)',
      'Each cable individually certified',
      'Forever Guarantee on every cable',
    ],
    price: 71195,
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_PACK_XL ?? '',
    variants: [],
    image: '/products/the-pedalboard-pack.png',
    badge: 'XL Rig',
  },
  {
    id: 'stage-cable',
    slug: 'the-stage-cable',
    name: 'The Stage Cable',
    tagline: '10ft Instrument Cable',
    description:
      'A premium guitar and bass instrument cable, hand-soldered with Mogami W2524 and Neutrik gold plugs. Ferrite-filtered, wax-secured, individually certified. Dead quiet, tour-grade, guaranteed forever.',
    longDescription:
      'The Stage Cable is built for players who are done with instrument cables that crackle, fail, or color their tone. Mogami W2524 is a heavier-gauge, ultra-low-noise cable trusted by touring professionals. Every Stage Cable gets a ferrite bead inserted on the hot wire before soldering for EMI rejection, flat-wax aerospace-grade securing at both cable entries, and individual certification testing for continuity, shield integrity, capacitance, and impedance. Paired with Neutrik NP2X gold plugs and hand-soldered connections. Available in 10, 15, and 20-foot lengths. Guaranteed forever.',
    specs: [
      'Mogami W2524 instrument cable',
      'Neutrik NP2X-B gold straight plugs',
      'Hand-soldered connections',
      'Flat-wax aerospace-grade cable securing',
      'Ferrite bead on hot wire (EMI rejection)',
      'Individually certified: continuity, shield, capacitance, impedance',
      'Available in 10ft, 15ft, and 20ft',
      'Forever Guarantee',
    ],
    price: 13695,
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_STAGE_10 ?? process.env.STRIPE_PRICE_STAGE ?? '',
    variants: [
      { label: '10ft', value: '10ft', price: 13695, stripePriceId: process.env.STRIPE_PRICE_STAGE_10 ?? process.env.STRIPE_PRICE_STAGE ?? '' },
      { label: '15ft', value: '15ft', price: 17195, stripePriceId: process.env.STRIPE_PRICE_STAGE_15 ?? '' },
      { label: '20ft', value: '20ft', price: 20695, stripePriceId: process.env.STRIPE_PRICE_STAGE_20 ?? '' },
    ],
    image: '/products/the-stage-cable.png',
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

export function getBundleSavings(product: Product): { perUnit: number; totalIfSeparate: number; saved: number; cableCount: number } | null {
  const workhorse = products.find((p) => p.slug === 'the-workhorse')
  if (!workhorse) return null
  const p6 = workhorse.variants.find((v) => v.value === '6in')?.price ?? workhorse.price
  const p12 = workhorse.variants.find((v) => v.value === '12in')?.price ?? workhorse.price
  const p18 = workhorse.variants.find((v) => v.value === '18in')?.price ?? workhorse.price

  let totalIfSeparate: number
  let cableCount: number

  if (product.slug === 'the-pedalboard-pack') {
    // 2x 6", 2x 12", 2x 18"
    totalIfSeparate = p6 * 2 + p12 * 2 + p18 * 2
    cableCount = 6
  } else if (product.slug === 'the-pedalboard-pack-pro') {
    // 3x 6", 2x 12", 2x 18"
    totalIfSeparate = p6 * 3 + p12 * 2 + p18 * 2
    cableCount = 7
  } else if (product.slug === 'the-pedalboard-pack-xl') {
    // 5x 6", 4x 12", 4x 18"
    totalIfSeparate = p6 * 5 + p12 * 4 + p18 * 4
    cableCount = 13
  } else {
    return null
  }

  const saved = totalIfSeparate - product.price
  if (saved <= 0) return null
  return { perUnit: Math.round(product.price / cableCount), totalIfSeparate, saved, cableCount }
}
