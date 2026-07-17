export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  currency: string
  stripePriceId: string
  variants: {
    label: string
    value: string
  }[]
  badge?: string
  featured?: boolean
}

export const products: Product[] = [
  {
    id: 'workhorse-6',
    name: 'The Workhorse',
    tagline: '6" Straight-to-Straight',
    description:
      'Our most popular pedalboard staple. Hand-soldered with Mogami W2319 cable and Neutrik straight plugs for a clean, tight connection every time.',
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
    name: 'The Right Angle',
    tagline: '6" Straight-to-Right-Angle',
    description:
      'Perfect for tight pedalboard layouts. One straight, one angled. Fits flush to any pedal housing and saves you precious board space.',
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
    name: 'The Pedalboard Pack',
    tagline: '6-Pack • Mixed Lengths',
    description:
      'Everything you need to wire your board in one shot. Includes two 6", two 12", and two 18" Workhorses, all hand-built, all guaranteed for life.',
    price: 9500,
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_PACK ?? '',
    variants: [],
    badge: 'Best Value',
    featured: true,
  },
  {
    id: 'stage-cable',
    name: 'The Stage Cable',
    tagline: '10ft Instrument Cable',
    description:
      'Hand-soldered with Mogami W2524 and Neutrik NP2X plugs. Dead quiet, tour-grade durable, guaranteed for life. Replace your cheapest cable first.',
    price: 3800,
    currency: 'usd',
    stripePriceId: process.env.STRIPE_PRICE_STAGE ?? '',
    variants: [
      { label: '10ft', value: '10ft' },
      { label: '15ft', value: '15ft' },
      { label: '20ft', value: '20ft' },
    ],
  },
]

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}
