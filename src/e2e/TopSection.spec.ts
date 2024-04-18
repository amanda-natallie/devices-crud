import { expect, test } from '@playwright/test';

test('As an User, I can see the heading when the page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Devices');
});
test('As an User, I can see the Add Device button when the page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Add Device')).toBeVisible();
});
