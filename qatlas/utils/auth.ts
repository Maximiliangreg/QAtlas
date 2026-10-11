import type { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { validCredentials } from './test-data';

export async function loginAsStandardUser(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(validCredentials.username, validCredentials.password);
}
