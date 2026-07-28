# Price Comparison Table - HAT-264

**Generated:** 2026-07-28  
**Purpose:** Show price history and changes for Forever Cables products

## Summary

| Date | Event | Author | Change |
|------|-------|--------|--------|
| July 18, 2026 | Commit 5d9b83b | Paperclip User | Lower prices set ($22-$95) |
| July 25, 2026 | Commit b94c911 | Executive Director | Premium prices + spec upgrade ($39.99-$239.99) |
| July 28, 2026 | HAT-264 Investigation | Marshal Agent | CEO questioning current prices |

## Detailed Price Comparison

### The Workhorse (Patch Cable - Straight to Straight)

| Length | July 18 Price | July 25 Price | Live Price | Change | % Increase |
|--------|---------------|---------------|------------|--------|------------|
| 6"     | $22.00        | $39.99        | $39.99     | +$17.99 | +81.8% |
| 12"    | $22.00        | $44.99        | $44.99     | +$22.99 | +104.5% |
| 18"    | $22.00        | $49.99        | $49.99     | +$27.99 | +127.2% |

**Spec Changes:**
- Cable: Canare GS-6 → **Mogami W2319**
- Plugs: Neutrik NP2X-B → **Neutrik NP2X-B gold**

### The Right Angle (Patch Cable - Straight to Right-Angle)

| Length | July 18 Price | July 25 Price | Live Price | Change | % Increase |
|--------|---------------|---------------|------------|--------|------------|
| 6"     | $25.00        | $39.99        | $39.99     | +$14.99 | +59.9% |
| 12"    | $25.00        | $44.99        | $44.99     | +$19.99 | +79.9% |

**Spec Changes:**
- Cable: Canare GS-6 → **Mogami W2319**
- Plugs: Neutrik standard → **Neutrik gold-plated**

### The Pedalboard Pack (6 Patch Cables, Mixed Lengths)

| Item | July 18 Price | July 25 Price | Live Price | Change | % Increase |
|------|---------------|---------------|------------|--------|------------|
| 6-pack | $95.00 | $239.99 | $239.99 | +$144.99 | +152.6% |
| Per cable | $15.83 | $40.00 | $40.00 | +$24.17 | +152.6% |

**Contents:** 2x 6", 2x 12", 2x 18" Workhorse cables

**Spec Changes:**
- Cable: Canare GS-6 → **Mogami W2319**
- Plugs: Neutrik standard → **Neutrik gold-plated**

### The Stage Cable (Instrument Cable)

| Length | July 18 Price | July 25 Price | Live Price | Change | % Increase |
|--------|---------------|---------------|------------|--------|------------|
| 10ft   | $38.00        | $79.99        | $79.99     | +$41.99 | +110.5% |
| 15ft   | $44.00        | $99.99        | $99.99     | +$55.99 | +127.2% |
| 20ft   | $49.00        | $119.99       | $119.99    | +$70.99 | +144.9% |

**Spec Changes:**
- Cable: Mogami W2524 (unchanged)
- Plugs: Neutrik NP2X-B → **Neutrik NP2X-B gold**

## Component Specifications Comparison

### Before (July 18, 2026)

**Patch Cables (Workhorse, Right Angle):**
- Wire: Canare GS-6
- Connectors: Neutrik NP2X-B (standard black/silver)
- Construction: Hand-soldered
- Warranty: "Lifetime guarantee"

**Instrument Cables (Stage Cable):**
- Wire: Mogami W2524
- Connectors: Neutrik NP2X-B (standard black/silver)
- Construction: Hand-soldered
- Warranty: "Lifetime guarantee"

### After (July 25, 2026)

**Patch Cables (Workhorse, Right Angle):**
- Wire: **Mogami W2319** (upgrade from Canare)
- Connectors: **Neutrik NP2X-B gold-plated**
- Construction: Hand-soldered
- Warranty: **"Forever Guarantee"** (branding change)

**Instrument Cables (Stage Cable):**
- Wire: Mogami W2524 (no change)
- Connectors: **Neutrik NP2X-B gold-plated**
- Construction: Hand-soldered
- Warranty: **"Forever Guarantee"** (branding change)

## Pricing Rationale (from commit b94c911)

According to the July 25 commit message:

1. **"Implements premium pricing strategy from HAT-253 research"**
   - References another issue (HAT-253) that contains pricing research

2. **"Based on component cost analysis showing previous pricing was below cost"**
   - Suggests July 18 prices ($22-$95) were unprofitable

3. **"Pricing positions Forever Cables above Mogami Gold ($89.99 for 18ft)"**
   - Competitive positioning against Mogami brand
   - Forever Cables 18" patch cable at $49.99 vs Mogami Gold 18ft instrument cable at $89.99

4. **Component upgrades justify price increase:**
   - Mogami W2319 cable (premium over Canare GS-6)
   - Gold-plated Neutrik connectors (premium over standard)

## Verification Status

**Live Website Status (verified 2026-07-28):**
- ✅ All products display July 25 premium pricing
- ✅ Product descriptions mention Mogami W2319 and gold connectors
- ✅ Source code (`lib/products.ts`) matches live prices
- ✅ Deployment is working correctly

## Open Questions

1. **Who is "Executive Director"?**
   - Commit email: exec@hatchpatchcables.com
   - Did this person have authority to change prices?

2. **What is HAT-253?**
   - Referenced as source of pricing research
   - Need to review to understand pricing justification

3. **Were the spec changes real?**
   - Did components actually change from Canare to Mogami?
   - Are connectors actually gold-plated now?
   - Or were specs just corrected in the documentation?

4. **What does the CEO want?**
   - Keep premium pricing ($39.99-$239.99)?
   - Revert to lower pricing ($22-$95)?
   - Set entirely new prices?

---

**Next Action:** Awaiting CEO clarification on target pricing strategy.
