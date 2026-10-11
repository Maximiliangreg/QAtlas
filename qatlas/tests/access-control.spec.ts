import { expect, test } from '@playwright/test';

test('redirects unauthenticated visitors from the product catalog to login', async ({ page }) => {
  await page.goto('/inventory.html');

  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
