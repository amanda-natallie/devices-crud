import { Page, expect } from '@playwright/test';

export const checkFormFieldsVisibility = async (page: Page) => {
  await expect(page.locator('form')).toContainText('System Name *');
  await expect(page.locator('form')).toContainText('Device Type *');
  await expect(page.locator('form')).toContainText('HDD Capacity (GB) *');
  await expect(page.locator('form')).toContainText('Submit');
  await expect(page.locator('form')).toContainText('Cancel');
};
