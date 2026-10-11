import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  private readonly cartItems: Locator;

  constructor(private readonly page: Page) {
    this.cartItems = page.locator('.cart_item');
  }

  async open(): Promise<void> {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async expectProductCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async expectProduct(name: string): Promise<void> {
    await expect(this.cartItems.filter({ hasText: name })).toHaveCount(1);
  }

  async removeProduct(name: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: name });
    await expect(item).toHaveCount(1);
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async startCheckout(): Promise<void> {
    await this.page.locator('[data-test="checkout"]').click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }
}
