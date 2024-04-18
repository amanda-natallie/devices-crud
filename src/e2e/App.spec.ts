import { expect, test } from '@playwright/test';

test('As an User, I can see the document title when page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Device Manager - NinjaOne');
});
