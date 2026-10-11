import { test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { checkoutCustomer } from '../utils/test-data';
import { loginAsStandardUser } from '../utils/auth';

test('completes checkout from the product catalog through order confirmation', async ({ page }) => {
  const productName = 'Sauce Labs Backpack';
  await loginAsStandardUser(page);

  const inventory = new InventoryPage(page);
  await inventory.addProductToCart(productName);

  const cart = new CartPage(page);
  await cart.open();
  await cart.expectProduct(productName);
  await cart.startCheckout();

  const checkout = new CheckoutPage(page);
  await checkout.enterCustomerDetails(
    checkoutCustomer.firstName,
    checkoutCustomer.lastName,
    checkoutCustomer.postalCode,
  );
  await checkout.expectOverviewProduct(productName);
  await checkout.finishOrder();
  await checkout.expectOrderConfirmation();
});
