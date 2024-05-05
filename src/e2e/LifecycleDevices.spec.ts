import { expect, test } from '@playwright/test';

import {
  checkDevicesHDDOrder,
  checkNumberOfDevices,
  expectGetByTestIdToContainText,
  selectDeviceType,
  selectSortBy,
} from './utils/assertions';

test.describe.configure({ mode: 'serial' });
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('When a device is added, updated or deleted', () => {
  test('As an User, I am able to add a new device, see the confirmation toast and see the new device on the devices list', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Add Device' }).click();
    await page.getByPlaceholder('e.g. AMANDA_DESKTOP').click();
    await page.getByPlaceholder('e.g. AMANDA_DESKTOP').fill('MOCKED-PLAYWRIGHT_WINDOWS_5GB');
    await page.getByText('Select a type').click();
    await page.getByLabel('Windows', { exact: true }).click();
    await page.getByPlaceholder('e.g. 4').click();
    await page.getByPlaceholder('e.g. 4').fill('5');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Successfully created new')).toBeVisible();
    await expect(page.getByText('Device: MOCKED-PLAYWRIGHT_WINDOWS_5GB, Type')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'MOCKED-PLAYWRIGHT_WINDOWS_5GB' }),
    ).toBeVisible();
  });
  test('As an User, I am able to open the edit modal, submit without making changes, and see the toast message', async ({
    page,
  }) => {
    await page.locator('[id="radix-\\:rm\\:"]').click();
    await page.getByRole('menuitem', { name: 'Edit' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('No changes were made. The')).toBeVisible();
  });

  test('As an User, I am able to edit a device, see the confirmation toast and see the updated device on the devices list', async ({
    page,
  }) => {
    await page.locator('[id="radix-\\:rm\\:"]').click();
    await page.getByRole('menuitem', { name: 'Edit' }).click();
    await expect(page.getByPlaceholder('e.g. AMANDA_DESKTOP')).toHaveValue(
      'MOCKED-PLAYWRIGHT_WINDOWS_5GB',
    );
    await expect(page.getByPlaceholder('e.g. 4')).toHaveValue('5');
    await page.getByPlaceholder('e.g. AMANDA_DESKTOP').click();
    await page.getByPlaceholder('e.g. AMANDA_DESKTOP').fill('MOCKED-PLAYWRIGHT_WINDOWS_4GB');
    await page.getByPlaceholder('e.g. 4').click();
    await page.getByPlaceholder('e.g. 4').fill('4');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Successfully updated the')).toBeVisible();
    await expect(page.getByText('Device: MOCKED-PLAYWRIGHT_WINDOWS_4GB, Type')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'MOCKED-PLAYWRIGHT_WINDOWS_4GB' }),
    ).toBeVisible();
  });

  test('As an User, I am able to delete a device and no longer see it on the list', async ({
    page,
  }) => {
    await page.locator('[id="radix-\\:rm\\:"]').click();
    await page.getByRole('menuitem', { name: 'Delete' }).click();
    await expect(page.getByRole('paragraph')).toContainText(
      'You are about to delete the device MOCKED-PLAYWRIGHT_WINDOWS_4GB. This action cannot be undone.',
    );
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByText('Device MOCKED-PLAYWRIGHT_WINDOWS_4GB')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'MOCKED-PLAYWRIGHT_WINDOWS_4GB' }),
    ).not.toBeVisible();
  });
});
test.describe('Combining Filters and Devices Actions', () => {
  test('As an User, I am able to filter devices by type Windows, search by name and sort by HDD Capacity in descending order. Then I can add a device and see the changes on the list', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 10);
    await selectDeviceType(page, 'Windows');
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill('A');
    await page.waitForTimeout(500);
    await selectSortBy(page, 'HDD Capacity (Descending)');
    await checkNumberOfDevices(page, 2);
    await page.getByRole('button', { name: 'Add Device' }).click();
    await page.getByPlaceholder('e.g. AMANDA_DESKTOP').fill('PLAYWRIGHT-WINDOWS');
    await page.getByText('Select a type').click();
    await page.getByLabel('Windows', { exact: true }).click();
    await page.getByPlaceholder('e.g. 4').click();
    await page.getByPlaceholder('e.g. 4').fill('305');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(500);
    await checkNumberOfDevices(page, 3);
    await expectGetByTestIdToContainText(page, 'devices-list', 'PLAYWRIGHT-WINDOWS');
    await checkDevicesHDDOrder(page, [305, 256, 256]);
  });
  test('As an User, I am able to filter devices by type Windows, search by name and sort by HDD Capacity in descending order. Then I can edit a device and see the changes on the list', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 10);
    await selectDeviceType(page, 'Windows');
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill('A');
    await page.waitForTimeout(500);
    await selectSortBy(page, 'HDD Capacity (Descending)');
    await checkNumberOfDevices(page, 3);
    await page
      .getByTestId('device-item-PLAYWRIGHT-WINDOWS')
      .getByTestId('options-menu-trigger')
      .click();
    await page.getByRole('menuitem', { name: 'Edit' }).click();
    await page.getByLabel('Device Type *').click();
    await page.getByLabel('Mac').click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByTestId('devices-list')).not.toContainText('PLAYWRIGHT-WINDOWS');
    await checkNumberOfDevices(page, 2);
  });
  test('As an User, I am able to filter devices by type Windows, search by name and sort by HDD Capacity in descending order. Then I can delete a device and see the changes on the list', async ({
    page,
  }) => {
    await checkNumberOfDevices(page, 10);
    await selectDeviceType(page, 'Windows');
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill('A');
    await page.waitForTimeout(500);
    await selectSortBy(page, 'HDD Capacity (Descending)');
    await checkNumberOfDevices(page, 2);
    await page
      .getByTestId('device-item-MOCKED-ARMANDO')
      .getByTestId('options-menu-trigger')
      .click();
    await page.getByRole('menuitem', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.waitForTimeout(500);
    await checkNumberOfDevices(page, 1);
    await checkDevicesHDDOrder(page, [256]);
  });
});
