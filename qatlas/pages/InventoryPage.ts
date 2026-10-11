import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  private readonly productCards: Locator;
  private readonly sortSelect: Locator;

  constructor(private readonly page: Page) {
    this.productCards = page.locator('.inventory_item');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Products');
  }

  async addProductToCart(name: string): Promise<void> {
    const product = this.productCards.filter({ hasText: name });
    await expect(product).toHaveCount(1);
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortSelect.selectOption(option);
  }

  async productNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async productPrices(): Promise<number[]> {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map((price) => Number(price.replace('$', '')));
  }
}
