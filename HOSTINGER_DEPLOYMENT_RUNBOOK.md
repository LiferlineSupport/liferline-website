# Hostinger Deployment Runbook: Forever Cables Website

**Date:** 2026-07-20  
**Status:** CRITICAL - Site currently down (parking page showing)  
**Owner:** CEO (requires Hostinger hPanel access)  
**Technical Contact:** Pyotr (Founding Engineer)

## Current Problem

The domain **forevercables.com** is showing a **Hostinger parking page** instead of the Forever Cables Next.js application. The code is ready and pushed to GitHub, but Hostinger is not deploying it.

## Prerequisites

- Access to Hostinger hPanel
- GitHub repository: `LiferlineSupport/liferline-website`
- Stripe API keys (for environment variables)

## Step-by-Step Deployment Guide

### Step 1: Access Hostinger hPanel

1. Go to [https://hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Log in with your Hostinger credentials
3. Navigate to the hosting plan where forevercables.com is hosted

### Step 2: Verify Node.js Hosting is Enabled

**Why:** The Forever Cables site is a Next.js app that requires Node.js hosting, not static hosting.

1. In hPanel, find your hosting plan
2. Look for "Node.js" or "Application Hosting" section
3. Verify that Node.js hosting is enabled for your plan
4. If not available, you may need to:
   - Upgrade your plan to one that supports Node.js applications
   - OR set up a separate VPS/cloud hosting option

**Expected:** Node.js version 18.x or higher should be available

### Step 3: Connect GitHub Repository

**Why:** This enables automatic deployment when you push to the main branch.

1. In hPanel, navigate to **Git** or **Auto Deploy** section
2. Click **Connect Repository** or **Add Git Repository**
3. Select **GitHub** as the provider
4. Authorize Hostinger to access your GitHub account
5. Select the repository: `LiferlineSupport/liferline-website`
6. Set the branch to deploy: `main`
7. Set the build command: `npm ci && npm run build`
8. Set the start command: `npm start`
9. Set the Node.js version: `18.x` (or latest LTS available)

**Critical Settings:**
- **Repository:** `LiferlineSupport/liferline-website`
- **Branch:** `main`
- **Build command:** `npm ci && npm run build`
- **Start command:** `npm start`
- **Port:** `3000` (Next.js default)

### Step 4: Configure Environment Variables

**Why:** The app needs these to connect to Stripe for payments.

1. In hPanel, navigate to **Environment Variables** section
2. Add the following variables:

```
STRIPE_SECRET_KEY=sk_live_... (or sk_test_... for testing)
STRIPE_PRICE_WORKHORSE_6=price_...
STRIPE_PRICE_RIGHT_ANGLE=price_...
STRIPE_PRICE_PACK=price_...
STRIPE_PRICE_STAGE=price_...
```

**Where to find these values:**
- `STRIPE_SECRET_KEY`: Stripe Dashboard > Developers > API Keys
- Price IDs: Stripe Dashboard > Products > [Product Name] > Pricing > Price ID

**Security note:** Never commit these to git. They should only exist in Hostinger's environment variables and your local `.env.local` file.

### Step 5: Configure DNS for forevercables.com

**Why:** The domain needs to point to your Node.js application, not the parking page.

1. In hPanel, go to **Domains** section
2. Find `forevercables.com`
3. Click **Manage** or **DNS Settings**
4. Verify the DNS records:

**Option A: If using Hostinger nameservers**
- Look for an **A record** or **CNAME** pointing to your application
- It should NOT point to the parking page IP
- Update it to point to your Node.js application endpoint

**Option B: If using external nameservers**
- Get the Node.js application URL from your hosting configuration
- Add an A record or CNAME in your DNS provider pointing to that URL

**Expected result:** DNS should resolve to your application, not the parking page

### Step 6: Deploy the Application

1. After setting up GitHub connection, trigger a manual deploy:
   - Click **Deploy** or **Deploy Now** in the Git section
   - Watch the deployment logs for errors
2. Monitor the build process:
   - Should show `npm ci` running
   - Should show `npm run build` running
   - Should show "Build successful" or similar message
   - Should show app starting on port 3000

**If the build fails:**
- Check the error message in the deployment logs
- Common issues:
  - Missing environment variables
  - Node.js version mismatch
  - Build timeout (Next.js builds can take 2-5 minutes)

### Step 7: Verify Deployment

1. Wait 2-5 minutes for the deployment to complete
2. Visit [https://forevercables.com](https://forevercables.com)
3. Confirm you see the **Forever Cables homepage** (not the parking page)
4. Test these pages:
   - Homepage: `/`
   - Catalog: `/cables`
   - Example product: `/cables/workhorse-six`
   - Blog: `/blog`
   - About: `/about`
5. Test the checkout flow:
   - Add a product to cart
   - Click "Buy Now"
   - Confirm Stripe Checkout loads (don't complete the purchase yet)

**Success criteria:**
- ✅ Homepage loads with Forever Cables branding
- ✅ Navigation works
- ✅ Product pages load
- ✅ Stripe Checkout opens when clicking "Buy Now"

### Step 8: Set Up Automatic Deployments

1. In hPanel, verify **Auto Deploy** is enabled
2. Confirm it's watching the `main` branch
3. Test by pushing a small change to the repo and verifying it auto-deploys

**Expected:** Any push to `main` branch should trigger automatic deployment within 5-10 minutes

## Troubleshooting

### Issue: Parking page still showing after deployment

**Possible causes:**
1. DNS cache: Wait 15-60 minutes for DNS propagation
2. Browser cache: Clear browser cache or try incognito mode
3. Wrong DNS configuration: Double-check DNS records point to application, not parking

**Solution:**
- Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo killall -HUP mDNSResponder` (Mac)
- Try accessing from a different device or network
- Check DNS propagation: [https://www.whatsmydns.net](https://www.whatsmydns.net)

### Issue: Build fails with "Module not found"

**Solution:**
- Verify all dependencies are in `package.json`
- Try locally: `npm ci && npm run build`
- If it works locally but fails on Hostinger, check Node.js version match

### Issue: App builds but doesn't start

**Possible causes:**
1. Wrong start command
2. Port conflict
3. Missing environment variables

**Solution:**
- Verify start command is `npm start` (not `npm run dev`)
- Check environment variables are set correctly
- Review application logs in hPanel

### Issue: "502 Bad Gateway" or "503 Service Unavailable"

**Possible causes:**
1. App crashed on startup
2. Port mismatch
3. Missing dependencies

**Solution:**
- Check application logs in hPanel
- Verify environment variables are set
- Try restarting the application

## Support Contacts

- **Hostinger Support:** [https://www.hostinger.com/contact](https://www.hostinger.com/contact)
- **Forever Cables Technical:** Pyotr (Founding Engineer)
- **GitHub Repository:** [https://github.com/LiferlineSupport/liferline-website](https://github.com/LiferlineSupport/liferline-website)

## Post-Deployment Checklist

After successful deployment:

- [ ] Site loads at forevercables.com (not parking page)
- [ ] All pages navigate correctly
- [ ] Stripe Checkout works
- [ ] Auto-deploy is configured and tested
- [ ] Environment variables are set
- [ ] DNS is correctly configured
- [ ] Update team: site is live
- [ ] Monitor for errors in first 24 hours
- [ ] Delete CRITICAL_SITE_DOWN.md from repo

## Next Steps After Site is Live

1. Test full checkout flow with a real purchase
2. Set up monitoring/uptime checks
3. Configure email notifications for deployment failures
4. Document the deployment process in the main README
5. Resume work on launch readiness (Stripe products, packaging, etc.)

---

**Last Updated:** 2026-07-20  
**Document Owner:** Pyotr (Founding Engineer)  
**Requires:** CEO with Hostinger hPanel access
