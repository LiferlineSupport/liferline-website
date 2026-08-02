# HAT-304: The Workhorse Configurator (Per-End Plug Type + Finish, Dynamic Pricing)

**Status:** Implemented and pricing approved for now (CEO, 2026-08-02) on branch `hat-304-workhorse-configurator`. Not merged, not deployed - awaiting explicit publish/deploy authorization.
**Author:** Pyotr (Founding Engineer)
**Date:** 2026-08-01

## What shipped

On the `hat-304-workhorse-configurator` branch, The Workhorse product page now has:

1. A "Connectors" group above the Length selector, with two independent pickers: End A and End B, each Straight or Right Angle.
2. A "Finish" group below the Length selector: Neutrik Gold or Neutrik Nickel/Silver.
3. Live price recalculation as length, either end, or finish changes.
4. The forced $69.95 starting price is gone. `product.price` (used in listings, SEO tags, and JSON-LD) is now the actual cheapest configurable combination: 6", straight/straight, nickel ($62.95).

Verified locally: `next build` compiles the changed files with zero type errors, and a dev-server smoke test confirmed the default combo (6", straight/straight, gold) still renders at $69.95 - the existing live price - and the new selector groups render in the specified positions.

## Data model (`lib/products.ts`)

Added to `Product`: `endOptions`, `finishOptions`, `plugCostCents` (a `{straight: {gold, nickel}, rightAngle: {gold, nickel}}` cost table). Added `baseCogsCents` to `ProductVariant` - the length's COGS with the plug pair excluded.

`getConfigurablePrice(product, variant, endA, endB, finish)` computes `retail = (baseCogsCents + plugCost(endA) + plugCost(endB)) x 2.15 x 1.6`, rounded to the nearest `X.95`, matching the HAT-266 formula and the existing price-ending convention.

This is intentionally generic (keyed off `plugCostCents`/`endOptions`/`finishOptions` on any `Product`), not Workhorse-specific, so it can be reused if The Right Angle or Stage Cable ever need the same treatment.

### Where the cost numbers came from

`WORKHORSE_BASE_COGS_CENTS` (979 / 1037 / 1124 cents for 6/12/18") was **back-derived**, not invented: I took the current live retail prices ($69.95/$71.95/$74.95), divided by the 3.44x multiplier to get implied COGS, then subtracted two gold-straight plugs' cost. Plugging these back through the formula reproduces today's three live prices exactly, so the new pricing is a strict generalization of what's already live, not a repricing.

`WORKHORSE_PLUG_COST_CENTS` is the part that is **not yet verified**:

| Part | Type | Source | Cost used |
|---|---|---|---|
| NP2X-B | Straight, gold | Markertek, 100-pack (from the HAT-304 ticket) | $5.27 |
| NP2X-BAG | Straight, nickel/black shell | Ticket's Zack Electronics figure ($4.31), corroborated by Markertek single-unit ($4.58) | $4.31 |
| NP2RX-B | Right angle, gold | Markertek single-unit ($7.57), discounted ~1.3% to approximate 100-pack rate (same ratio observed between NP2X-B single-unit and 100-pack pricing) | $7.47 rounded to $7.47 (used 747 cents) |
| NP2RX | Right angle, nickel | Markertek single-unit ($6.31), same ~1.3% discount applied | $6.23 (used 623 cents) |

One data-quality note worth flagging: the ticket's Zack Electronics reference for the nickel straight plug links a page titled "gold contacts" while describing it as the nickel part (NP2X-BAG). I checked Markertek's own NP2X-BAG listing directly and confirmed that part number is in fact nickel-contacts/black-shell - so the underlying part number in the ticket was right, the Zack page's title was just mislabeled.

**None of this is wholesale/account pricing.** Per the ticket, before any of these prices go live: confirm real cost for all four parts (especially the two right-angle costs, which had no ticket-provided reference at all and are pure retail-site estimates here) against our actual Neutrik/Redco/Markertek accounts.

## Stripe checkout architecture (app/api/checkout/route.ts)

The ticket asked me to evaluate pre-created Stripe Price objects per combination vs. a computed-price approach. Workhorse alone is 3 lengths x 2 ends x 2 ends x 2 finishes = 24 valid combinations (the ticket's estimate of 18 assumed a combined end-pair dropdown like hat-272's; independent per-end selectors make it 24). Recommendation: **dynamic `price_data`, not pre-created Price IDs** - implemented this way.

Why: 24 pre-created Price objects per product is manageable once, but every future length/end/finish addition means creating more Stripe objects and wiring more env vars by hand, and the price still has to be computed somewhere to decide *which* Price ID to use, so the formula logic doesn't go away either way. Computing `unit_amount` server-side in the checkout route and passing it via `price_data` means the formula lives in exactly one place (`getConfigurablePrice`), there's nothing to keep in sync in the Stripe dashboard, and adding a new length or connector type later is a code change, not a Stripe-console chore.

Non-configurable products (Right Angle, Custom Pack, Custom Pro Pack, Stage Cable) are untouched - they still resolve a pre-created Stripe Price ID exactly as before. The route branches on `product.plugCostCents` being set.

Server-side validation: `endA`/`endB`/`finish` from the request body are required to match one of `product.endOptions`/`finishOptions` or the request is rejected (400). This closes off a client sending an unrecognized value and silently landing on a fallback price.

Order metadata now carries `endA`, `endALabel`, `endB`, `endBLabel`, `finish`, `finishLabel` so fulfillment knows exactly what to build.

## Relationship to `origin/hat-272-connector-options-v2`

That branch (unmerged, on The Right Angle product) models connector choice as one combined dropdown (`connectorOptions: ConnectorOption[]`, values like `'straight-ra'`) with no finish axis and no per-combination pricing. HAT-304's `endOptions`/`finishOptions`/`plugCostCents` model supersedes that concept rather than extending it - two independent end-pickers is what this ticket asked for, and hat-272's single combined-value dropdown can't represent "gold + right-angle/right-angle" without either exploding into more combined string values or bolting a second axis on top of it.

I did not touch The Right Angle product in this change - out of scope per the ticket. Recommendation for a fast follow: migrate The Right Angle onto the same `endOptions`/`finishOptions`/`plugCostCents` model used here (it's generic, not Workhorse-specific) and let `hat-272-connector-options-v2` be superseded rather than merged, so the site doesn't end up with two different connector-picker UI patterns across products.

## Status update (2026-08-02)

CEO approved the plan/architecture (request_confirmation accepted 2026-08-01) and, on the plug-cost question, said: **use the retail pricing for now** - the public-retail-sourced `WORKHORSE_PLUG_COST_CENTS` values (527/431/747/623 cents) documented above are approved as the live numbers as-is, no wholesale account confirmation required before shipping this pass. CEO also said not to block this task on further Stripe deliverables; Stripe work resumes once they're satisfied with pricing and site content generally. The `price_data` checkout wiring already implemented stays as-is (it's necessary for the feature to check out correctly at all) but no further Stripe hardening/verification is being gated on for this task.

What's left is only the standing CLAUDE.md gate: no merge to main / no deploy without explicit CEO "publish" or "deploy" authorization. That has not been given yet - branch is ready whenever that word comes.

## Remaining, non-blocking

- Product copy (`specs`, `description`) still describes the Workhorse as gold-straight-only. Left untouched since copy changes need CEO brand-voice approval; a follow-up copy pass to reflect configurability is a small, separate change.
- Follow-up recommendation to migrate The Right Angle onto this same `endOptions`/`finishOptions`/`plugCostCents` model and retire `hat-272-connector-options-v2`, still open, not part of this task's scope.

## Files changed

- `lib/products.ts` - data model + `getConfigurablePrice`
- `components/BuyButton.tsx` - two new selector groups, live price wiring, checkout payload
- `app/api/checkout/route.ts` - dynamic `price_data` path, input validation, expanded metadata
