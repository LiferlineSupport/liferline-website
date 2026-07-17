# Forever Cables: Returns and Exchange Policy

## Policy Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Return window | 30 days from delivery | Standard for DTC e-commerce; long enough to be fair, short enough to avoid abuse |
| Condition | Unused, in original packaging | Can't resell used cables; consistent with industry |
| Return shipping | Customer pays for change-of-mind; we pay for defective or wrong item | Fair split; incentivizes careful ordering |
| Restocking fee | None | Builds trust; volume is too low to justify fee admin |
| Exchanges | Yes, for wrong length | Most common order error; easy to handle |
| Defective items | Covered by lifetime guarantee, not this policy | Keeps the guarantee page as the hero; no overlap |
| Refund method | Original payment method, 5 to 7 business days | Stripe handles this automatically |
| International | Customer pays all return shipping + customs | We can't control customs fees on returns |
| Sale/promo items | Same return policy as full-price | No exceptions; keeps it simple |

## Full Page Copy (liferline.com/returns)

### Returns and Exchanges

**We want you to be happy with your cables. If something is not right, here is how we handle it.**

#### Standard Returns

You can return any unused Forever Cable within 30 days of delivery for a full refund. The cable must be in its original packaging and in unused condition.

To start a return:
1. Email support@liferline.com with your order number and reason for return.
2. We will reply within one business day with return instructions.
3. Ship the cable back to us. You are responsible for return shipping on standard returns.
4. Once we receive and inspect the cable, we will issue a full refund to your original payment method within 5 to 7 business days.

#### Exchanges

Ordered the wrong length? It happens. We will exchange your unused cable for a different length at no extra charge (you just cover return shipping). If the new length costs more, we will send you a payment link for the difference. If it costs less, we will refund the difference.

To request an exchange, email support@liferline.com with your order number and the length you need.

#### Defective Cables

If your cable is defective or stops working, do not use this return policy. Your cable is covered by our lifetime guarantee, which is faster and better for you. We ship the replacement before you send anything back. Visit our guarantee page or email support@liferline.com.

#### Wrong Item Received

If we shipped you the wrong cable, email support@liferline.com. We will send the correct cable immediately and provide a prepaid return label for the wrong item. No cost to you.

#### International Orders

International customers are welcome to return cables under the same 30-day policy. Return shipping and any customs or duties on the return shipment are the customer's responsibility. We cannot reimburse customs fees.

#### Non-Returnable Items

We accept returns on all Forever Cables products. No exceptions.

#### Questions?

Email support@liferline.com. We reply within one business day.

## Short-Form Versions (Marketplace Listings)

### Etsy Return Policy Field
"30-day returns accepted on unused cables in original packaging. Buyer pays return shipping. Defective cables are covered by our lifetime guarantee at no cost. Exchanges available for wrong-length orders."

### Amazon Handmade Return Policy Field
"30-day return window. Item must be unused and in original packaging. Buyer pays return shipping for standard returns. Defective items covered by lifetime guarantee (free replacement shipped before you send anything back). Contact us for exchanges."

### Reverb Return Policy Field
"Returns accepted within 30 days. Cable must be unused, in original packaging. Buyer pays return shipping. Defective cables are covered by our free lifetime guarantee. Contact us at support@liferline.com."

## Implementation Notes

- The returns page should link to /guarantee for defective cable claims
- The guarantee page should link to /returns for standard return requests
- Footer navigation should include both links
- Stripe refunds can be issued from the Stripe Dashboard; no code needed
