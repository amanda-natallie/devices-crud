import { expect, test } from '@playwright/test';

test('As an User, I can see the devices list and edit a device', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('app-wrapper')).toContainText('DESKTOP-SMART');
  await expect(page.getByTestId('app-wrapper')).toContainText('Windows workstation - 10 GB');
  await expect(page.getByTestId('options-menu-trigger').first()).toBeVisible();
  await page.getByTestId('options-menu-trigger').first().click();
  await page.getByRole('menuitem', { name: 'Edit' }).click();
  await expect(page.getByRole('heading')).toContainText('Add/Edit Device');
  await expect(page.getByLabel('Add/Edit Device')).toContainText('Submit');
  await page.getByRole('button', { name: 'Submit' }).click();
});
test('as an User, I can see the devices list and delete a device', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('app-wrapper')).toContainText('DESKTOP-SMART');
  await expect(page.getByTestId('app-wrapper')).toContainText('Windows workstation - 10 GB');
  await page.getByTestId('options-menu-trigger').first().click();
  await page.getByRole('menuitem', { name: 'Delete' }).click();
  await expect(page.getByLabel('Delete device?')).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText(
    'You are about to delete the device DESKTOP-0VCBIFF. This action cannot be undone.',
  );
  await page.getByRole('button', { name: 'Submit' }).click();
});
