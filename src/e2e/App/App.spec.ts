import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Device Manager - NinjaOne');
});

test('has header', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toHaveText('Devices');
});
