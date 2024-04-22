import { expect, test } from '@playwright/test';

import { checkFormFieldsVisibility } from './utils/form.assertions';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe.parallel('When page loads', () => {
  test('As an User, I am able to see the devices list title and 12 items', async ({ page }) => {
    await expect(page.getByTestId('devices-list-title')).toContainText('Devices');
    await expect(page.getByTestId('devices-list')).toBeVisible();
    await expect(page.getByTestId('devices-list').evaluate(el => el.children.length)).resolves.toBe(
      12,
    );
  });
  test('As an User, when I open the Add Device modal, I am able to see the validation messages if I try to submit an empty form', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Add Device' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('System Name must be at least')).toBeVisible();
    await page.getByText('Device Type is required').click();
    await expect(page.getByText('Device Type is required')).toBeVisible();
    await expect(page.getByText('HDD Capacity must be greater')).toBeVisible();
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
    await expect(
      page.getByTestId('device-item-MOCKED-DESKTOP-SMART_WINDOWS_10').getByRole('heading'),
    ).toContainText('MOCKED-DESKTOP-SMART');
    await expect(
      page.getByTestId('device-item-MOCKED-DESKTOP-SMART_WINDOWS_10').getByRole('paragraph'),
    ).toContainText('Windows workstation - 10 GB');
    await page
      .getByTestId('device-item-MOCKED-DESKTOP-SMART_WINDOWS_10')
      .getByTestId('options-menu-trigger')
      .click();
    await page.getByRole('menuitem', { name: 'Edit' }).click();
    await expect(page.getByRole('heading')).toContainText('Edit Device');
    await checkFormFieldsVisibility(page);
    await expect(page.getByPlaceholder('e.g. AMANDA_DESKTOP')).toHaveValue('MOCKED-DESKTOP-SMART');
    await expect(page.getByLabel('Device Type *')).toContainText('Windows');
    await expect(page.getByPlaceholder('e.g. 4')).toHaveValue('10');
  });
});
test.describe.serial('When a device is added, updated or deleted', () => {
  test('As an User, I am able to add a new device, see the confirmation toast and see the new device on the devices list', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Add Device' }).click();
    await page.getByPlaceholder('e.g. AMANDA_DESKTOP').click();
    await page.getByPlaceholder('e.g. AMANDA_DESKTOP').fill('MOCKED-PLAYWRIGHT_WINDOWS_5GB');
    await page.getByLabel('Device Type *').click();
    await page.getByLabel('Windows').getByText('Windows').click();
    await page.getByPlaceholder('e.g. 4').click();
    await page.getByPlaceholder('e.g. 4').fill('5');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Successfully created new')).toBeVisible();
    await expect(page.getByText('Device: MOCKED-PLAYWRIGHT_WINDOWS_5GB, Type')).toBeVisible();
    await expect(
      page
        .getByTestId('app-wrapper')
        .locator('div')
        .filter({ hasText: 'MOCKED-PLAYWRIGHT_WINDOWS_5GBWindows' })
        .nth(3),
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
      page
        .getByTestId('app-wrapper')
        .locator('div')
        .filter({ hasText: 'MOCKED-PLAYWRIGHT_WINDOWS_4GBWindows' })
        .nth(3),
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
      page
        .getByTestId('app-wrapper')
        .locator('div')
        .filter({ hasText: 'MOCKED-PLAYWRIGHT_WINDOWS_4GBWindows' })
        .nth(3),
    ).not.toBeVisible();
  });
});
