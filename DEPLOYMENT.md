# Deployment Guide

## Hostinger Node.js Deployment

The liferline.com website is hosted on Hostinger's Node.js hosting platform with automatic GitHub deployment.

### Configuration Requirements

The following must be configured in Hostinger's control panel:

1. **Application Root**: `/` (repository root)
2. **Node.js Version**: 20.x (specified in `.nvmrc`)
3. **Build Command**: `npm ci && npm run build`
4. **Start Command**: `npm start`
5. **Port**: Use environment variable `PORT` (Hostinger provides this automatically)
6. **GitHub Repository**: `LiferlineSupport/liferline-website`
7. **Branch**: `main` (auto-deploy on push)

### Environment Variables

Add these in Hostinger's environment variables section:

```
NODE_ENV=production
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-key>
STRIPE_SECRET_KEY=<your-stripe-secret>
```

### Deployment Process

When code is pushed to the `main` branch:

1. Hostinger detects the push via GitHub webhook
2. Hostinger pulls the latest code
3. Runs `npm ci` to install dependencies
4. Runs `npm run build` to build the Next.js application
5. Restarts the application with `npm start`

### Troubleshooting

**Symptom**: Site shows "We hit a snag" or JavaScript errors in browser console

**Cause**: Build artifacts not properly generated or deployed

**Solutions**:
1. Verify build command is set correctly in Hostinger panel
2. Check Hostinger deployment logs for build errors
3. Ensure Node.js version is 20.x
4. Verify all environment variables are set
5. Manually trigger rebuild in Hostinger panel

**Common Errors**:

- `ChunkLoadError: Loading chunk failed` - Build artifacts missing or not served correctly
- `404 on /_next/static/` files - Static file serving not configured properly
- `MIME type error` - Server returning HTML instead of JS files (build failed)

### Manual Deployment

If automatic deployment fails, you can manually deploy:

1. SSH into Hostinger server (if available)
2. Navigate to application directory
3. Run deployment script:
   ```bash
   chmod +x .hostinger-deploy.sh
   ./.hostinger-deploy.sh
   ```
4. Restart the application in Hostinger panel

### Verifying Deployment

After deployment, verify these URLs load correctly:

- `https://liferline.com/` - Homepage should load without errors
- `https://liferline.com/_next/static/chunks/webpack-*.js` - Should return JavaScript (not 404)
- Check browser console for errors (should be none)

Test in multiple browsers:
- Chrome
- Firefox
- Safari
- Edge
- Opera

Use the automated browser tests:
```bash
npm run test:browsers
```

### Build Artifacts

The following directories are generated during build and must NOT be committed to git:

- `.next/` - Next.js build output (gitignored)
- `node_modules/` - Dependencies (gitignored)

These are regenerated on each deployment by Hostinger.

### Static File Serving

Next.js requires proper static file serving for the `_next/` directory. Hostinger's Node.js hosting handles this automatically when using `npm start`.

If static files are not loading:
1. Verify `next.config.js` doesn't have conflicting settings
2. Check Hostinger's static file caching settings
3. Ensure the application is running on the correct port
