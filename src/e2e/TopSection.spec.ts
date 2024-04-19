import { expect, test } from '@playwright/test';

test('As an User, I can see the heading when the page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Devices');
});
test('As an User, I can see the Add Device button when the page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Add Device')).toBeVisible();
});
test('As an User, When I click on the Add Device button, I can see the Add Device modal', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Add Device' }).click();
  await expect(page.getByRole('heading')).toContainText('Add/Edit Device');
});
test("As an User, When I click on the Add Device button, I can close it and don't see the modal anymore", async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Add Device' }).click();
  await expect(page.getByRole('heading')).toContainText('Add/Edit Device');
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByText('Add/Edit Device')).not.toBeVisible();
});
