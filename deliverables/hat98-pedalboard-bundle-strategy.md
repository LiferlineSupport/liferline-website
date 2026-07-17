# Forever Cables: Bundle & Multi-Pack Strategy

## Current State

The catalog already includes one bundle SKU:

| Product | Contents | Price | Savings vs Singles |
|---|---|---|---|
| The Pedalboard Pack | 2x6" + 2x12" + 2x18" Workhorse | $95 | ~12% vs 6 singles |

This is a solid anchor offer. The strategy below builds on it with additional options to capture different customer segments.

## Why Bundles Matter

A standard pedalboard needs 4 to 8 patch cables. Bundles drive:
- **Higher AOV:** Single Workhorse sells at $18. A 6-pack at $95 = 5.3x lift.
- **Lower fulfillment cost per unit:** One shipment vs six.
- **Better ad ROI:** One paid click nets $95+ instead of $18.
- **Decision simplification:** New players don't know what lengths they need. Bundles solve that.

## Recommended Bundle Lineup (3 SKUs)

### SKU 1: The Pedalboard Pack (already live)
- **Contents:** 2x 6" + 2x 12" + 2x 18" Workhorse
- **Price:** $95 (saves ~$13 vs 6 singles; ~12% discount)
- **COGS:** ~$42 (6 cables at ~$7 each)
- **Gross margin:** ~$53 (~56%)
- **Target:** Mid-size board, the "I want to wire everything at once" buyer
- **Badge:** "Best Value" (already set in code)

### SKU 2: The Starter Pack (new; recommended for launch)
- **Contents:** 3x 6" Workhorse
- **Price:** $47 (saves ~$7 vs 3 singles; ~13% discount)
- **COGS:** ~$21 (3 cables at ~$7 each)
- **Gross margin:** ~$26 (~55%)
- **Target:** Small board, first-time builder, impulse add-on
- **Why 3x6":** Most common first pedalboard setup is 3 to 5 pedals with short runs

### SKU 3: The Stage Bundle (Phase 2, post-launch)
- **Contents:** 2x Stage Cable 10ft
- **Price:** $69 (saves ~$7 vs 2 singles; ~9% discount)
- **COGS:** ~$28 (2 cables at ~$14 each)
- **Gross margin:** ~$41 (~59%)
- **Target:** Guitarist who needs guitar-to-board and board-to-amp cables
- **Hold for Phase 2:** Stage Cable has fewer SKUs; test single demand first

## Pricing Strategy

| Principle | Rationale |
|---|---|
| 10 to 16% bundle discount | Deep enough to feel real, shallow enough to protect margin |
| All bundles > 50% gross margin | Ensures bundles are not loss leaders |
| Round, memorable prices | $47, $95 are easy to quote and compare |
| Anchor with the biggest pack | Lead with Pedalboard Pack ($95) on homepage to make singles feel like a bargain |

## Stripe Implementation Steps

### For the Starter Pack (new):
1. In Stripe Dashboard, create Product: "Forever Cables, The Starter Pack (3x Workhorse 6")"
2. Set price: $47.00 USD, one-time
3. Copy the `price_xxx` ID
4. Add env var: `STRIPE_PRICE_STARTER_PACK=price_xxx`
5. Add product entry to `lib/products.ts`

### For the Stage Bundle (Phase 2):
1. Same flow: Product + Price in Stripe at $69.00
2. Env var: `STRIPE_PRICE_STAGE_BUNDLE=price_xxx`
3. Add to `lib/products.ts` when ready

### Code change for Starter Pack (products.ts):
```typescript
{
  id: 'starter-pack',
  slug: 'the-starter-pack',
  name: 'The Starter Pack',
  tagline: '3-Pack, 6" Workhorse',
  description:
    'Three 6-inch Workhorse patch cables to get your board started. Hand-built, lifetime guaranteed, ready to go.',
  longDescription:
    'Starting a pedalboard? The Starter Pack gives you three 6-inch Workhorse cables: enough to wire your first three pedals with room to grow. Every cable is built with Canare GS-6 wire and Neutrik connectors, and every one carries the Forever Cables lifetime guarantee.',
  specs: [
    '3x 6" Workhorse cables',
    'Canare GS-6 cable throughout',
    'Neutrik NP2X-B straight plugs',
    'Lifetime guarantee on every cable',
  ],
  price: 4700,
  currency: 'usd',
  stripePriceId: process.env.STRIPE_PRICE_STARTER_PACK ?? '',
  variants: [],
  image: '/products/the-starter-pack.png',
}
```

## Website Copy

### Bundle Section Header
"Outfit the whole board. Buy a pack and save up to 12%."

### The Starter Pack
- **Tagline:** "Three cables. One board. For life."
- **CTA:** "Start your board"

### The Pedalboard Pack (existing; refine if needed)
- **Tagline:** "Six cables, three lengths, one order."
- **CTA:** "Wire your whole board"

### The Stage Bundle (Phase 2)
- **Tagline:** "Guitar to board. Board to amp. Done."
- **CTA:** "Complete your rig"

## Launch Day Positioning

1. **Homepage hero:** Lead with The Pedalboard Pack ($95). Anchors the visitor on a higher-value purchase from the first impression.
2. **Below the fold:** The Starter Pack ($47) as the approachable entry point.
3. **Launch email subject:** "Wire your whole board in one order."
4. **Social post concept:** Flat-lay of 6 cables on a pedalboard, mid-wiring.
5. **Influencer seeding (see HAT-97):** Send The Pedalboard Pack. More visual, better hook than a single cable.

## Pre-Build Inventory Targets

| Product | Pre-build target | Cables needed |
|---|---|---|
| Workhorse 6" (single) | 15 units | 15 |
| Workhorse 12" (single) | 10 units | 10 |
| Workhorse 18" (single) | 5 units | 5 |
| Starter Pack (3x 6") | 8 packs | 24 |
| Pedalboard Pack (6-cable mix) | 5 packs | 30 |
| Stage Cable 10ft (single) | 10 units | 10 |
| Stage Cable 15ft (single) | 5 units | 5 |
| Stage Cable 20ft (single) | 3 units | 3 |
| **Total** | | **~102 cables** |

~102 cables at roughly 6 to 8 minutes each = 10 to 14 hours of build time.

## Next Steps

1. CEO: Create Starter Pack product + price in Stripe Dashboard
2. CEO: Share `price_xxx` ID for Starter Pack
3. Pyotr: Add Starter Pack to `lib/products.ts` and create product image
4. Pyotr: Add starter-pack env var to deployment config
5. Hold Stage Bundle for Phase 2 (after launch data shows Stage Cable demand)
