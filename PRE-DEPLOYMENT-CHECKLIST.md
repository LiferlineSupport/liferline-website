# Pre-Deployment Checklist

**CRITICAL**: This checklist MUST be completed before deploying any code changes to staging or production.

## Automated Checks (Required)

### 1. Cross-Browser Testing

Run the full browser test suite:

```bash
npm run test:browsers
```

This will test the site in:
- ✅ Chrome (Chromium)
- ✅ Firefox
- ✅ Mobile Chrome
- ⚠️ Safari (WebKit) — automated tests skipped (requires system dependencies), must test manually

**Expected result**: All tests pass with 0 errors

**If tests fail**:
1. Review the error output
2. Fix the issues
3. Re-run tests until all pass
4. Do not proceed to deployment until all tests pass

### 2. Production Build Test

Test a production build locally:

```bash
npm run build
npm start
```

Then in another terminal:
```bash
npm run test:production
```

**Expected result**: Production build runs without errors

### 3. GitHub Actions

Before merging to `main`, ensure GitHub Actions pass:

1. Push your branch to GitHub
2. Open a Pull Request
3. Wait for GitHub Actions to complete
4. Verify all checks are green ✅

## Manual Verification (Required)

### 1. Visual Testing

Test the following browsers manually (if available):

- [ ] Chrome (latest version)
- [ ] Firefox (latest version)  
- [ ] Safari (latest version)
- [ ] Edge (latest version)
- [ ] Opera (if required)

For each browser:
1. Open https://liferline.com (after deployment) or http://localhost:3000 (before deployment)
2. Open browser DevTools (F12)
3. Check Console tab - should have 0 errors (React DevTools warnings are OK)
4. Check Network tab - all resources should load (no 404s)
5. Navigate through the site - all pages should work

### 2. Console Error Check

In each browser:
1. Open DevTools Console
2. Reload the page
3. Look for errors (red text)
4. Common errors to watch for:
   - `ChunkLoadError`
   - `Failed to load resource: 404`
   - `MIME type` errors
   - `Hydration` errors
   - Any JavaScript exceptions

**Expected result**: 0 errors in console

### 3. Network Tab Check

In each browser's DevTools Network tab:
1. Reload the page
2. Check all requests are successful (green or 200/304 status)
3. Verify JavaScript files load correctly
4. Look for any failed requests (red)

**Expected result**: All network requests succeed

### 4. Mobile Testing

Test on real devices if possible:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)

Or use browser DevTools device emulation:
1. Open DevTools
2. Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
3. Select mobile device
4. Test the site

## Deployment Process

### Before Deployment

1. ✅ All automated tests pass
2. ✅ Manual browser testing complete
3. ✅ No console errors
4. ✅ No network errors
5. ✅ Mobile testing complete
6. ✅ GitHub Actions are green

### Hostinger Deployment

When you push to `main`:

1. Hostinger automatically detects the push
2. Hostinger runs:
   ```bash
   npm ci
   npm run build
   npm start
   ```
3. The site is deployed

### After Deployment

1. Visit https://liferline.com
2. Open DevTools in Chrome
3. Verify no console errors
4. Test key functionality:
   - [ ] Homepage loads
   - [ ] Products display correctly
   - [ ] Navigation works
   - [ ] Forms work (if applicable)
   - [ ] Checkout works (if applicable)

5. Test in other browsers (from the manual verification list)

### If Deployment Fails

If the site shows errors after deployment:

1. Check Hostinger deployment logs
2. Verify build command ran successfully
3. Check environment variables are set
4. Review DEPLOYMENT.md for troubleshooting steps

### Rollback Procedure

If the deployment has critical errors:

1. Immediately revert the last commit:
   ```bash
   git revert HEAD
   git push origin main
   ```

2. This triggers a new deployment with the previous working code

3. Fix the issues locally

4. Go through the full checklist again before redeploying

## Browser Compatibility Matrix

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | Latest  | ✅ Required |
| Firefox | Latest  | ✅ Required |
| Safari  | Latest  | ✅ Required |
| Edge    | Latest  | ✅ Required |
| Opera   | Latest  | ⚠️ Optional |
| Mobile Chrome | Latest | ✅ Required |
| Mobile Safari | Latest | ✅ Required |

## Common Issues

### Issue: "We hit a snag" error on production

**Cause**: Build artifacts not deployed or chunk loading failed

**Fix**:
1. Verify `next.config.js` does not have `output: 'standalone'`
2. Ensure Hostinger runs `npm run build`
3. Check build logs for errors
4. Verify Node.js version is 20.x

### Issue: ChunkLoadError in browser

**Cause**: JavaScript chunks returning 404 or wrong MIME type

**Fix**:
1. Verify `next.config.js` headers don't interfere with `_next/static` files
2. Rebuild the application
3. Clear Hostinger cache
4. Verify static file serving is enabled
5. Check `.next/` directory exists after build

**Note**: The custom headers in `next.config.js` must exclude `/_next/static` paths to avoid interfering with Next.js's automatic content-type handling.

### Issue: Tests pass locally but fail in CI

**Cause**: Environment differences or missing dependencies

**Fix**:
1. Check GitHub Actions logs
2. Ensure Playwright browsers are installed in CI
3. Verify Node.js version matches `.nvmrc`
4. Check for environment-specific code

## Emergency Contacts

If you're blocked on deployment:

1. Check Hostinger support documentation
2. Review GitHub Actions logs
3. Check this repository's Issues tab
4. Contact site administrator: support@liferline.com

## Notes

- This checklist should be updated as new browsers or requirements are added
- All team members must follow this checklist without exception
- Skipping steps can result in production outages
- When in doubt, run all tests again
