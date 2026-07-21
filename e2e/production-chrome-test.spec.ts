import { test, expect } from '@playwright/test';

test('check production site in Chrome', async ({ page, browser }) => {
  const consoleLogs: string[] = [];
  const consoleErrors: string[] = [];
  const networkErrors: string[] = [];

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
    consoleErrors.push(`[PAGE ERROR] ${error.message}\n${error.stack}`);
  });

  // Capture network failures
  page.on('requestfailed', request => {
    networkErrors.push(`[NETWORK] ${request.url()} - ${request.failure()?.errorText}`);
  });

  try {
    // Navigate to production site
    console.log('Navigating to https://liferline.com...');
    await page.goto('https://liferline.com', { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for page to be fully loaded
    await page.waitForLoadState('domcontentloaded');

    // Take a screenshot
    await page.screenshot({ path: 'production-chrome-screenshot.png', fullPage: true });

    console.log('\n=== Page loaded successfully ===');
    console.log(`Title: ${await page.title()}`);

  } catch (error) {
    console.log('\n=== Navigation Error ===');
    console.log(error);
    await page.screenshot({ path: 'production-error-screenshot.png' });
  }

  // Log all console messages
  console.log('\n=== All Console Logs ===');
  if (consoleLogs.length === 0) {
    console.log('No console logs');
  } else {
    consoleLogs.forEach(log => console.log(log));
  }

  // Log errors specifically
  console.log('\n=== Console Errors ===');
  if (consoleErrors.length === 0) {
    console.log('No console errors detected');
  } else {
    consoleErrors.forEach(error => console.log(error));
  }

  // Log network errors
  console.log('\n=== Network Errors ===');
  if (networkErrors.length === 0) {
    console.log('No network errors detected');
  } else {
    networkErrors.forEach(error => console.log(error));
  }

  // Check browser name
  console.log('\n=== Browser Info ===');
  console.log(`Browser: ${browser.browserType().name()}`);
});
