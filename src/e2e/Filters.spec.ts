import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });
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

test('As an User, I am able to search for a device', async ({ page }) => {
  await page.goto('/');
  const input = page.getByTestId('input-element');
  await input.focus();
  await input.fill('iPhone');
  await expect(input).toHaveValue('iPhone');
});

test('As an User, I am able to sort the devices by HDD Capacity in descending order', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByTestId('sort-select-wrapper').click();
  await page.getByRole('menuitemradio', { name: 'HDD Capacity (Descending)' }).click();
  await expect(page.getByTestId('sort-select-wrapper')).toHaveText(
    'Sort By: HDD Capacity (Descending)',
  );
});
test('As an User, I am able to sort the devices by Name in ascending order', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('sort-select-wrapper').click();
  await page.getByRole('menuitemradio', { name: 'Name (Ascending)' }).click();
  await expect(page.getByTestId('sort-select-wrapper')).toHaveText('Sort By: Name (Ascending)');
});
test('As an User, I am able to sort the devices by Name in descending order', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('sort-select-wrapper').click();
  await page.getByRole('menuitemradio', { name: 'Name (Descending)' }).click();
  await expect(page.getByTestId('sort-select-wrapper')).toHaveText('Sort By: Name (Descending)');
});
