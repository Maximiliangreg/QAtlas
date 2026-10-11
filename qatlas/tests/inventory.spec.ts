import { expect, test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { loginAsStandardUser } from '../utils/auth';

test.describe('Product inventory', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('sorts products by name in descending order', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('za');

    const names = await inventory.productNames();
    expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
  });

  test('sorts products by price from low to high', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('lohi');

    const prices = await inventory.productPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });
});
