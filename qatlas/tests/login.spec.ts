import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { invalidCredentials, validCredentials } from '../utils/test-data';

test.describe('Login', () => {
  test('allows a user to log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validCredentials.username, validCredentials.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('shows an error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(invalidCredentials.username, invalidCredentials.password);

    await loginPage.expectLoginError('Username and password do not match');
    await expect(page).toHaveURL('/');
  });
});
