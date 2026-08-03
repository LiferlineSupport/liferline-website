export interface ProductVariant {
  label: string
  value: string
  price?: number
  stripePriceId?: string
  // COGS in cents for this length, excluding the two end plugs. Only set on
  // products with per-end/finish configurable pricing (see plugCostCents).
  baseCogsCents?: number
}

export interface EndPlugOption {
  label: string
  value: string
}

export interface FinishOption {
  label: string
  value: string
}

export interface PlugCostTable {
  straight: { gold: number; nickel: number }
  rightAngle: { gold: number; nickel: number }
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
  // Per-end connector choice (straight / right angle) and finish (gold /
  // nickel-silver), each independently priced. When set, BuyButton renders
  // the two extra selector groups and price is computed via getConfigurablePrice
  // instead of getVariantPrice.
  endOptions?: EndPlugOption[]
  finishOptions?: FinishOption[]
  plugCostCents?: PlugCostTable
  image: string
  badge?: string
  featured?: boolean
}

// retail = COGS x 2.15 x 1.6, per company pricing model (HAT-266).
export const PRICING_MULTIPLIER = 2.15 * 1.6

function roundToNinetyFiveCents(cents: number): number {
  return Math.round(cents / 100) * 100 - 5
}

function cogsToRetail(cogsCents: number): number {
  return roundToNinetyFiveCents(cogsCents * PRICING_MULTIPLIER)
}

function plugCostCents(table: PlugCostTable, endValue: string, finishValue: string): number {
  const finishKey = finishValue === 'nickel' ? 'nickel' : 'gold'
  const endTable = endValue === 'right-angle' ? table.rightAngle : table.straight
  return endTable[finishKey]
}

// Reference plug costs, cents. Sourced from a quick public-retailer check
// (Markertek, Aug 2026), same as the estimates in HAT-304 - NOT wholesale
// account pricing. Confirm real cost from our Neutrik/Redco/Markertek
// accounts before any price computed from this table goes live.
const WORKHORSE_PLUG_COST_CENTS: PlugCostTable = {
  straight: { gold: 527, nickel: 431 },
  rightAngle: { gold: 747, nickel: 623 },
}

// Base COGS (cents) per length, excluding the two end plugs. Back-derived
// from the live 6/12/18" straight-straight-gold retail prices using the
// HAT-266 formula, so the configurable pricing reproduces today's prices
// exactly for that combination.
const WORKHORSE_BASE_COGS_CENTS: Record<string, number> = {
  '6in': 979,
  '12in': 1037,
  '18in': 1124,
}

export function getConfigurablePrice(
  product: Product,
  variantValue: string | undefined,
  endA: string | undefined,
  endB: string | undefined,
  finish: string | undefined
): number | undefined {
  if (!product.plugCostCents) return undefined
  const variant = product.variants.find((v) => v.value === variantValue) ?? product.variants[0]
  if (!variant || variant.baseCogsCents == null) return undefined

  const endAValue = endA ?? product.endOptions?.[0]?.value ?? 'straight'
  const endBValue = endB ?? product.endOptions?.[0]?.value ?? 'straight'
  const finishValue = finish ?? product.finishOptions?.[0]?.value ?? 'gold'

  const cogs =
    variant.baseCogsCents +
    plugCostCents(product.plugCostCents, endAValue, finishValue) +
    plugCostCents(product.plugCostCents, endBValue, finishValue)

  return cogsToRetail(cogs)
}

export const products: Product[] = [
  {
    id: 'workhorse-6',
    slug: 'the-workhorse',
    name: 'The Workhorse',
    tagline: '6" Straight-to-Straight',
    description:
      'Hand-soldered in the USA, with Mogami W2319 cable and Neutrik gold straight plugs. Ferrite-interference filtered core, aerospace inspired strain relief, and individually tested and characterized by LiferLine Labs before it even gets packaged.',
    longDescription:
      'Hand-soldered in the USA, with Mogami W2319 cable and Neutrik gold straight plugs, ferrite interference filtering core, aerospace inspired strain relief, and individually tested and characterized by LiferLine Labs before it even gets packaged.',
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
    // Starting price: cheapest configurable combination (6", straight/straight, nickel).
    price: cogsToRetail(
      WORKHORSE_BASE_COGS_CENTS['6in'] + WORKHORSE_PLUG_COST_CENTS.straight.nickel * 2
    ),
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_WORKHORSE_6 ?? '',
    variants: [
      { label: '6"', value: '6in', price: 6995, stripePriceId: process.env.STRIPE_PRICE_WORKHORSE_6 ?? '', baseCogsCents: WORKHORSE_BASE_COGS_CENTS['6in'] },
      { label: '12"', value: '12in', price: 7195, stripePriceId: process.env.STRIPE_PRICE_WORKHORSE_12 ?? '', baseCogsCents: WORKHORSE_BASE_COGS_CENTS['12in'] },
      { label: '18"', value: '18in', price: 7495, stripePriceId: process.env.STRIPE_PRICE_WORKHORSE_18 ?? '', baseCogsCents: WORKHORSE_BASE_COGS_CENTS['18in'] },
    ],
    endOptions: [
      { label: 'Straight', value: 'straight' },
      { label: 'Right Angle', value: 'right-angle' },
    ],
    finishOptions: [
      { label: 'Neutrik Gold', value: 'gold' },
      { label: 'Neutrik Nickel/Silver', value: 'nickel' },
    ],
    plugCostCents: WORKHORSE_PLUG_COST_CENTS,
    image: '/products/the-workhorse-macro.png',
    featured: true,
  },
  {
    id: 'custom-pack',
    slug: 'the-custom-pack',
    name: 'The Custom Pack',
    tagline: '6-Pack, Mixed Lengths',
    description:
      'Six guitar pedal patch cables for larger pedalboard rigs. Two 6", two 12", two 18" Workhorses. Every cable ferrite-filtered, wax-secured, and individually certified. All guaranteed forever.',
    longDescription:
      'The Custom Pack covers larger rigs with six Workhorse cables: two 6-inch, two 12-inch, and two 18-inch. Built with Mogami W2319 wire, Neutrik gold connectors, flat-wax aerospace securing, a ferrite bead on the hot wire, and individual certification testing on every cable. Every one carries the Forever Cables Forever Guarantee. You save over $80 compared to buying six cables individually.',
    specs: [
      '2x 6" Workhorse cables',
      '2x 12" Workhorse cables',
      '2x 18" Workhorse cables',
      'Mogami W2319 cable throughout',
      'Mix of Neutrik NP2X-B gold straight and right-angle plugs',
      'Flat-wax aerospace-grade cable securing',
      'Ferrite bead on hot wire (EMI rejection)',
      'Each cable individually certified',
      'Forever Guarantee on every cable',
    ],
    price: 34995,
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_CUSTOM_PACK ?? '',
    variants: [],
    image: '/products/the-custom-pack.png',
    badge: 'Pro Rig',
  },
  {
    id: 'custom-pro-pack',
    slug: 'the-custom-pro-pack',
    name: 'The Custom Pro Pack',
    tagline: '14-Pack, Mixed Lengths',
    description:
      'Fourteen guitar pedal patch cables for serious pedalboard builders. Six 6", four 12", four 18" Workhorses. Every cable ferrite-filtered, wax-secured, and individually certified. All guaranteed forever.',
    longDescription:
      'The Custom Pro Pack is built for serious pedalboard builders with fourteen Workhorse cables: six 6-inch, four 12-inch, and four 18-inch. Built with Mogami W2319 wire, Neutrik gold connectors, flat-wax aerospace securing, a ferrite bead on the hot wire, and individual certification testing on every cable. Every one carries the Forever Cables Forever Guarantee. You save over $300 compared to buying fourteen cables individually.',
    specs: [
      '6x 6" Workhorse cables',
      '4x 12" Workhorse cables',
      '4x 18" Workhorse cables',
      'Mogami W2319 cable throughout',
      'Mix of Neutrik NP2X-B gold straight and right-angle plugs',
      'Flat-wax aerospace-grade cable securing',
      'Ferrite bead on hot wire (EMI rejection)',
      'Each cable individually certified',
      'Forever Guarantee on every cable',
    ],
    price: 69995,
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_CUSTOM_PRO_PACK ?? '',
    variants: [],
    image: '/products/the-custom-pro-pack.png',
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

  if (product.slug === 'the-custom-pack') {
    // 2x 6", 2x 12", 2x 18"
    totalIfSeparate = p6 * 2 + p12 * 2 + p18 * 2
    cableCount = 6
  } else if (product.slug === 'the-custom-pro-pack') {
    // 6x 6", 4x 12", 4x 18"
    totalIfSeparate = p6 * 6 + p12 * 4 + p18 * 4
    cableCount = 14
  } else {
    return null
  }

  const saved = totalIfSeparate - product.price
  if (saved <= 0) return null
  return { perUnit: Math.round(product.price / cableCount), totalIfSeparate, saved, cableCount }
}
