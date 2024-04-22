import { Page, expect } from '@playwright/test';

export const checkFormFieldsVisibility = async (page: Page) => {
  await expect(page.getByText('System Name *')).toBeVisible();
  await expect(page.getByText('Device Type *')).toBeVisible();
  await expect(page.getByText('HDD Capacity (GB) *')).toBeVisible();
  await expect(page.getByText('Cancel')).toBeVisible();
  await expect(page.getByText('Submit')).toBeVisible();
};
