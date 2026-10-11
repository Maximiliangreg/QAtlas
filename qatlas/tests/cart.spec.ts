import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';
import { loginAsStandardUser } from '../utils/auth';

test('adds a product to the cart and removes it', async ({ page }) => {
  const productName = 'Sauce Labs Backpack';
  await loginAsStandardUser(page);

  const inventory = new InventoryPage(page);
  await inventory.addProductToCart(productName);
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  const cart = new CartPage(page);
  await cart.open();
  await cart.expectProductCount(1);
  await cart.expectProduct(productName);
  await cart.removeProduct(productName);
  await cart.expectProductCount(0);
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
});
