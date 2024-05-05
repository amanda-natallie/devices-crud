import { Page, expect } from '@playwright/test';

const devicesSelector = '[data-testid="devices-list"] > div > div > div > div';
export const checkFormFieldsVisibility = async (page: Page) => {
  await expect(page.getByText('System Name *')).toBeVisible();
  await expect(page.getByText('Device Type *')).toBeVisible();
  await expect(page.getByText('HDD Capacity (GB) *')).toBeVisible();
  await expect(page.getByText('Cancel')).toBeVisible();
  await expect(page.getByText('Submit')).toBeVisible();
};

export const checkNumberOfDevices = async (page: Page, expectedNumber: number) => {
  await expect(
    page
      .getByTestId('devices-list')
      .locator('> div > div > div')
      .evaluate(el => el.children.length),
  ).resolves.toBe(expectedNumber);
};

export const checkDevicesHDDOrder = async (page: Page, expectedOrder: number[]) => {
  const deviceElements = await page.$$(devicesSelector);

  const storagePromises = deviceElements.map(device =>
    device.$eval('p', element => element.textContent),
  );

  const storageTexts = await Promise.all(storagePromises);

  const actualOrder = storageTexts.map(text => parseInt(text?.match(/(\d+)/)?.[0] ?? '0', 10));
  const match = expectedOrder.every((size, index) => size === actualOrder[index]);
  expect(match).toBeTruthy();
};

export const checkDeviceNamesOrder = async (page: Page, expectedOrder: string[]) => {
  const deviceElements = await page.$$(devicesSelector);

  const namePromises = deviceElements.map(device =>
    device.$eval('h3', element => element.textContent?.trim() || ''),
  );

  const actualNames = await Promise.all(namePromises);
  const match = expectedOrder.every((name, index) => name === actualNames[index]);
  expect(match).toBeTruthy();
};

export const expectGetByTestIdToContainText = async (page: Page, testId: string, text: string) => {
  await expect(page.getByTestId(testId)).toContainText(text);
};

export const expectGetByTestIdToBeVisible = async (page: Page, testId: string) => {
  await expect(page.getByTestId(testId)).toBeVisible();
};
export const expectGetByTextToBeVisible = async (page: Page, text: string) => {
  await expect(page.getByText(text)).toBeVisible();
};

export const selectDeviceType = async (page: Page, deviceType: string) => {
  await page.getByTestId('device-list-wrapper').click();
  await page.getByRole('menuitemcheckbox', { name: deviceType }).click();
};

export const selectSortBy = async (page: Page, sortBy: string) => {
  await page.getByTestId('sort-select-wrapper').click();
  await page.getByRole('menuitemradio', { name: sortBy }).click();
};
