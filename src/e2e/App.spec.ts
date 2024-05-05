import { expect, test } from '@playwright/test';

import {
  checkFormFieldsVisibility,
  checkNumberOfDevices,
  expectGetByTestIdToBeVisible,
  expectGetByTestIdToContainText,
  expectGetByTextToBeVisible,
} from './utils/assertions';

test.describe.configure({ mode: 'parallel' });
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});
test.afterEach(async ({ page }) => {
  await page.close();
});
test.describe('When page loads', () => {
  test('As an User, I can see the document title when page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Device Manager - NinjaOne');
  });
  test('As an User, I am able to see the devices list title and 10 items', async ({ page }) => {
    await expectGetByTestIdToContainText(page, 'devices-list-title', 'Devices');
    await expectGetByTestIdToBeVisible(page, 'devices-list');
    await page.waitForTimeout(500);
    await checkNumberOfDevices(page, 10);
  });
  test('As an User, I can see the Filters when page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('filter-wrapper')).toBeVisible();
  });

  test('As an User, I can see the SearchInput when page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('search-input-wrapper')).toBeVisible();
  });

  test('As an User, I can see the DeviceList when page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('device-list-wrapper')).toBeVisible();
  });

  test('As an User, I can see the SortSelect when page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('sort-select-wrapper')).toBeVisible();
  });
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
    await expect(page.getByRole('heading')).toContainText('Add Device');
  });
  test("As an User, When I click on the Add Device button, I can close it and don't see the modal anymore", async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Add Device' }).click();
    await expect(page.getByRole('heading')).toContainText('Add Device');
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByText('Add/Edit Device')).not.toBeVisible();
  });
});
test.describe('Modals', () => {
  test('As an User, when I open the Add Device modal, I am able to see the validation messages if I try to submit an empty form', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Add Device' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expectGetByTextToBeVisible(page, 'System Name must be at least');
    await page.getByText('Device Type is required').click();
    await expectGetByTextToBeVisible(page, 'Device Type is required');
    await expectGetByTextToBeVisible(page, 'HDD Capacity must be greater');
  });

  test('As an User, I am able to open the Add Device modal and see the correct information', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Add Device' }).click();
    await expect(page.getByRole('heading')).toContainText('Add Device');
    await checkFormFieldsVisibility(page);
  });
  test('As an User, I am able to check device info on the list, then open the edit modal and see the selected device information on form', async ({
    page,
  }) => {
    const device = await page.getByTestId('device-item-MOCKED-HOME-ONE');
    await expect(device.getByRole('heading')).toContainText('MOCKED-HOME-ONE');
    await expect(device.getByRole('paragraph')).toContainText('Windows workstation - 50 GB');
    await device.getByTestId('options-menu-trigger').click();
    await page.getByRole('menuitem', { name: 'Edit' }).click();
    await expect(page.getByRole('heading')).toContainText('Edit Device');
    await checkFormFieldsVisibility(page);
    await expect(page.getByPlaceholder('e.g. AMANDA_DESKTOP')).toHaveValue('MOCKED-HOME-ONE');
    await expect(page.getByLabel('Device Type *')).toContainText('Windows');
    await expect(page.getByPlaceholder('e.g. 4')).toHaveValue('50');
  });
});
