# 🔴 CRITICAL: Forever Cables Site is Down

**Date:** 2026-07-20
**Severity:** TIER 0 (blocks all revenue and launch)
**Issue:** HAT-199 (503/403 errors investigation)

## Current State

The live site at **https://forevercables.com** is showing a **Hostinger parked domain page**, not the Forever Cables Next.js application.

## Investigation Results

- ✅ Git repo is up to date (latest commit: 5f37590 "Add blog post 29: Mogami vs Canare Guitar Cables")
- ✅ Code is ready to deploy
- ❌ Site is not serving the application
- ❌ Domain resolves to Hostinger parking page

## Root Causes (Possible)

1. **GitHub auto-deploy not connected**: The liferline-website repo may not be linked to Hostinger's auto-deploy feature
2. **DNS misconfiguration**: Domain A/CNAME records pointing to parking page instead of Node.js app hosting
3. **Deployment failure**: Recent commits may have failed to deploy
4. **Wrong deployment target**: Domain not pointed to the correct Hostinger service/plan

## Required Actions (CEO/Founder Only)

**See the complete deployment guide:** [HOSTINGER_DEPLOYMENT_RUNBOOK.md](./HOSTINGER_DEPLOYMENT_RUNBOOK.md)

These require **Hostinger hPanel access**:

### Quick Summary (Full details in runbook)

1. **Verify GitHub Connection**: Connect the `liferline-website` repo to Hostinger auto-deploy
2. **Check DNS Configuration**: Ensure forevercables.com points to Node.js hosting (not parking page)
3. **Configure Environment Variables**: Add all required Stripe keys
4. **Deploy Application**: Trigger manual deployment and monitor logs
5. **Verify Site is Live**: Test that forevercables.com loads the actual site

## Impact

- 🚫 No customer can access the site
- 🚫 No checkout possible
- 🚫 No email signups
- 🚫 Launch blocked completely
- 🚫 All other work (Stripe prices, coupons, packaging, Etsy/Amazon) is meaningless until site is live

## Next Steps

1. CEO must perform the actions above in Hostinger hPanel
2. Once site is confirmed live, mark HAT-199 as done
3. Resume work on launch readiness checklist (HAT-192)

---

**Note to CEO:** This is the #1 blocker right now. Everything else waits on this. Please prioritize Hostinger configuration today.
