import { test, expect } from '@playwright/test';

/**
 * Cross-browser validation suite
 *
 * This test ensures the site loads correctly across all major browsers
 * without JavaScript errors, network failures, or rendering issues.
 *
 * Required to pass before any deployment to staging or production.
 */

test.describe('Cross-Browser Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Set up error tracking
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(`Console error: ${msg.text()}`);
      }
    });

    page.on('pageerror', error => {
      errors.push(`Page error: ${error.message}`);
    });

    // Store errors in page context for assertions
    await page.addInitScript(() => {
      (window as any).__testErrors = [];
    });
  });

  test('homepage loads without errors', async ({ page, browserName }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const networkErrors: string[] = [];

    // Track all errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });

    page.on('requestfailed', request => {
      networkErrors.push(`${request.url()} - ${request.failure()?.errorText}`);
    });

    // Navigate to homepage
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Verify page title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title).not.toBe('');

    // Verify critical content is visible
    await expect(page.locator('body')).toBeVisible();

    // Check for the main content
    const mainContent = page.locator('main, [role="main"]');
    await expect(mainContent.first()).toBeVisible();

    // Assert no errors occurred
    if (consoleErrors.length > 0) {
      console.error(`[${browserName}] Console errors:`, consoleErrors);
    }
    if (pageErrors.length > 0) {
      console.error(`[${browserName}] Page errors:`, pageErrors);
    }
    if (networkErrors.length > 0) {
      console.error(`[${browserName}] Network errors:`, networkErrors);
    }

    expect(consoleErrors, `Browser: ${browserName} - Should have no console errors`).toHaveLength(0);
    expect(pageErrors, `Browser: ${browserName} - Should have no page errors`).toHaveLength(0);
    expect(networkErrors, `Browser: ${browserName} - Should have no network errors`).toHaveLength(0);
  });

  test('JavaScript chunks load successfully', async ({ page, browserName }) => {
    const failedResources: string[] = [];

    page.on('requestfailed', request => {
      // Track failed requests, especially _next/static files
      failedResources.push(request.url());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify no failed requests
    expect(failedResources, `Browser: ${browserName} - All resources should load`).toHaveLength(0);

    // Verify critical Next.js chunks loaded
    const jsResources = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      return scripts.map(s => (s as HTMLScriptElement).src);
    });

    // Should have Next.js scripts loaded
    const hasNextScripts = jsResources.some(src => src.includes('/_next/static/'));
    expect(hasNextScripts, `Browser: ${browserName} - Should load Next.js scripts`).toBe(true);
  });

  test('MIME types are correct for JavaScript files', async ({ page, browserName }) => {
    const incorrectMimeTypes: string[] = [];

    page.on('response', async response => {
      const url = response.url();

      // Check only JavaScript files (.js extension) have correct MIME type
      if (url.includes('.js') && !url.includes('.json')) {
        const contentType = response.headers()['content-type'] || '';

        if (!contentType.includes('javascript') && !contentType.includes('application/json')) {
          incorrectMimeTypes.push(`${url} returned ${contentType}`);
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(incorrectMimeTypes, `Browser: ${browserName} - All JS files should have correct MIME type`).toHaveLength(0);
  });

  test('no React hydration errors', async ({ page, browserName }) => {
    const hydrationErrors: string[] = [];

    page.on('console', msg => {
      const text = msg.text();
      // Detect React hydration errors
      if (text.includes('Hydration') ||
          text.includes('did not match') ||
          text.includes('react.dev/errors')) {
        hydrationErrors.push(text);
      }
    });

    page.on('pageerror', error => {
      if (error.message.includes('Hydration') ||
          error.message.includes('react.dev/errors')) {
        hydrationErrors.push(error.message);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(hydrationErrors, `Browser: ${browserName} - Should have no React hydration errors`).toHaveLength(0);
  });

  test('page renders without error boundary', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for common error messages
    const bodyText = await page.textContent('body');

    expect(bodyText).not.toContain('Something went wrong');
    expect(bodyText).not.toContain('We hit a snag');
    expect(bodyText).not.toContain('Application error');
    expect(bodyText).not.toContain('An unexpected error has occurred');
  });

  test('critical navigation elements present', async ({ page, browserName }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify page structure exists (adjust selectors to match your site)
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Page should have content
    const text = await body.textContent();
    expect(text?.length || 0).toBeGreaterThan(100);
  });
});

test.describe('Production-Like Build Validation', () => {
  test.skip(({ }, testInfo) => {
    // Only run in CI or when explicitly testing production build
    return !process.env.CI && !process.env.TEST_PRODUCTION_BUILD;
  });

  test('production build loads without errors', async ({ page, browserName }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    page.on('pageerror', error => {
      errors.push(error.message);
    });

    page.on('requestfailed', request => {
      errors.push(`Failed: ${request.url()}`);
    });

    // In CI, this should test against a production build
    // locally running on a different port
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors, `Browser: ${browserName} - Production build should have no errors`).toHaveLength(0);
  });
});
