import { expect, test } from '@playwright/test';

import { checkFormFieldsVisibility } from './utils/form.assertions';

test('As an User, I am able to see the validation messages if I try to submit an empty form', async ({
  page,
}) => {
  await page.goto('/');
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
  await page.goto('/');
  await page.getByRole('button', { name: 'Add Device' }).click();
  await expect(page.getByRole('heading')).toContainText('Add Device');
  checkFormFieldsVisibility(page);
});

test('As an User, I am able to add a device and see the confirmation toast', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Add Device' }).click();
  await page.getByPlaceholder('Ex.: AMANDA_DESKTOP').click();
  await page.getByPlaceholder('Ex.: AMANDA_DESKTOP').fill('PLAYWRIGHT_TESt');
  await page.getByLabel('Device Type *').click();
  await page.getByLabel('Mac').click();
  await page.getByPlaceholder('Ex.: 4').click();
  await page.getByPlaceholder('Ex.: 4').fill('1024');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('list')).toContainText(
    'The devices list was successfully updated with device PLAYWRIGHT_TEST',
  );
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await expect(
    page
      .locator('div')
      .filter({ hasText: /^PLAYWRIGHT_TESTMac workstation - 1024 GB$/ })
      .nth(2),
  ).toBeVisible();
});

test('As an User, I am able to open the Edit Device modal and see the correct information', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('[id="radix-\\:rm\\:"]').click();
  await page.getByRole('menuitem', { name: 'Edit' }).click();
  await expect(page.getByRole('heading')).toContainText('Edit Device');
  await checkFormFieldsVisibility(page);
  await expect(page.getByPlaceholder('Ex.: AMANDA_DESKTOP')).toHaveAttribute(
    'value',
    expect.any(String),
  );
  await expect(page.getByPlaceholder('Ex.: 4')).toHaveAttribute('value', expect.any(Number));
});

test('As an User, I am able to open the edit modal, submit without making changes, and see the toast message', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('[id="radix-\\:rm\\:"]').click();
  await page.getByRole('menuitem', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('No changes were made. The')).toBeVisible();
});

test('As an User, I am able to edit an existing Device, see the confirmation toast after submit, and the updated device on the list', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('[id="radix-\\:rm\\:"]').click();
  await page.getByRole('menuitem', { name: 'Edit' }).click();
  await expect(page.getByPlaceholder('Ex.: AMANDA_DESKTOP')).toHaveAttribute(
    'value',
    expect.any(String),
  );
  await page.getByPlaceholder('Ex.: AMANDA_DESKTOP').click();
  await page.getByPlaceholder('Ex.: AMANDA_DESKTOP').fill('');
  await page.getByPlaceholder('Ex.: AMANDA_DESKTOP').fill('PLAYWRIGHT_EDIT');
  await expect(page.getByPlaceholder('Ex.: 4')).toHaveAttribute('value', expect.any(Number));
  await page.getByPlaceholder('Ex.: 4').click();
  await page.getByPlaceholder('Ex.: 4').fill('520');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('list')).toContainText(
    'The devices list was successfully updated with device PLAYWRIGHT_EDIT',
  );
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await expect(
    page
      .getByTestId('app-wrapper')
      .locator('div')
      .filter({ hasText: 'PLAYWRIGHT_EDITWindows' })
      .nth(3),
  ).toBeVisible();
});

test('As an User, I am able to see correct values on delete modal, then delete a Device and see the confirmation toast', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.locator('[id="radix-\\:r1m\\:"]').click();
  await page.getByRole('menuitem', { name: 'Delete' }).click();
  await expect(page.getByRole('paragraph')).toContainText(
    'You are about to delete the device PLAYWRIGHT_EDIT. This action cannot be undone.',
  );
  await expect(page.getByRole('heading')).toContainText('Delete device?');
  await expect(page.getByLabel('Delete device?')).toContainText('Delete');
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Device PLAYWRIGHT_EDIT')).toBeVisible();
});
