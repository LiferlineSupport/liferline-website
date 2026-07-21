import { test, expect } from '@playwright/test';

test('homepage loads and styles are applied', async ({ page }) => {
  // Listen for console errors to catch potential JS/React hydration issues
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Liferline/);

  // Check if body has a specific style applied to confirm CSS is loaded
  // The layout.tsx applies bg-bg (from tailwind config) to the body.
  // We'll check the computed background color.
  const bodyBackgroundColor = await page.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });

  // Verify that it is NOT the default white/transparent background.
  // Depending on what bg-bg resolves to, we can just ensure it's not the default empty one.
  // It should be something like rgb(something, something, something)
  expect(bodyBackgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  expect(bodyBackgroundColor).not.toBe('rgb(255, 255, 255)');

  // No unhandled page errors should occur during load
  expect(errors).toEqual([]);
});
