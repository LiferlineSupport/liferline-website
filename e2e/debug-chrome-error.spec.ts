import { test, expect } from '@playwright/test';

test('capture Chrome console errors', async ({ page, browser }) => {
  const consoleLogs: string[] = [];
  const consoleErrors: string[] = [];

  // Capture console messages
  page.on('console', msg => {
    const text = `[${msg.type()}] ${msg.text()}`;
    consoleLogs.push(text);
    if (msg.type() === 'error') {
      consoleErrors.push(text);
    }
  });

  // Capture page errors
  page.on('pageerror', error => {
    consoleErrors.push(`[PAGE ERROR] ${error.message}`);
  });

  // Navigate to the page
  await page.goto('http://localhost:3001');

  // Wait for page to be fully loaded
  await page.waitForLoadState('networkidle');

  // Take a screenshot
  await page.screenshot({ path: 'chrome-error-screenshot.png', fullPage: true });

  // Log all console messages
  console.log('=== All Console Logs ===');
  consoleLogs.forEach(log => console.log(log));

  // Log errors specifically
  console.log('\n=== Console Errors ===');
  if (consoleErrors.length === 0) {
    console.log('No console errors detected');
  } else {
    consoleErrors.forEach(error => console.log(error));
  }

  // Check browser name
  console.log('\n=== Browser Info ===');
  console.log(`Browser: ${browser.browserType().name()}`);
});
