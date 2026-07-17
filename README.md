# Hatch Patch Cables — Website

Next.js + Stripe e-commerce site for Forever Cables by Hatch Patch Cables.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Stripe Checkout** (server-side sessions)
- **Hostinger** (Node.js hosting, auto-deploys from GitHub main)

## Local development

```bash
npm install
cp .env.local.example .env.local
# Fill in your Stripe keys in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stripe setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create products and prices in the Stripe Dashboard
3. Copy the Price IDs (format: `price_...`) into `.env.local`
4. Add your Stripe Secret Key (`sk_live_...` or `sk_test_...` for testing)
5. Add these same env vars to your Hostinger environment configuration

## Deploying

Push to `main` — Hostinger auto-deploys.

Set these environment variables in Hostinger:
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_WORKHORSE_6`
- `STRIPE_PRICE_RIGHT_ANGLE`
- `STRIPE_PRICE_PACK`
- `STRIPE_PRICE_STAGE`

## Lifetime guarantee claims

Email: support@liferline.com
