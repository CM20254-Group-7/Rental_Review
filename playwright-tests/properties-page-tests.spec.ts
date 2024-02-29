import { test, expect } from '@playwright/test';

import { properties } from './helpers';

// This test uses 2 properties
const firstProperty = properties[0]; // 1 Test Road
const secondProperty = properties[1]; // 2 Test Road

test.describe('Properties page test', () => {
  test('General properties page test', async ({ page }) => {
    await page.goto('http://localhost:3000/properties');

    await page.goto('http://localhost:3000/properties');
    await expect(page.getByRole('main')).toContainText('Can\'t see your property?');

    await expect(page.getByRole('main')).toContainText(firstProperty.address);
    await expect(page.getByRole('main')).toContainText(secondProperty.address);
  });

  test('Property link 1 test', async ({ page }) => {
    await page.goto('http://localhost:3000/properties');
    await page.getByRole('link', { name: firstProperty.address }).click();
    await expect(page.getByRole('main')).toContainText(firstProperty.address);
  });

  test('Property link 2 test', async ({ page }) => {
    await page.goto('http://localhost:3000/properties');
    await page.getByRole('link', { name: secondProperty.address }).click();
    await expect(page.getByRole('main')).toContainText(secondProperty.address);
  });
});

test.describe('Property details page test', () => {
  test('Existing property test: Address', async ({ page }) => {
    await page.goto(`http://localhost:3000/properties/${firstProperty.id}`);
    await expect(page.getByRole('main')).toContainText(firstProperty.address);
  });

  test('Existing property test: Owner name', async ({ page }) => {
    await page.goto(`http://localhost:3000/properties/${secondProperty.id}`);
    await expect(page.getByRole('main')).toContainText(secondProperty.owner);
  });

  test('Nonexistent property test', async ({ page }) => {
    await page.goto('http://localhost:3000/properties/123');
    await expect(page.locator('h2')).toContainText('This page could not be found.');
  });

  test('PropertyId not provided test', async ({ page }) => {
    await page.goto('http://localhost:3000/properties');
    await expect(page.getByRole('main')).toContainText(firstProperty.address);
    await expect(page.getByRole('main')).toContainText(secondProperty.address);
  });

  // TODO: Add test for checking average property rating
  test('Average property rating test', async ({ page }) => {
    await page.goto('http://localhost:3000/properties/6a83d02b-9da1-4a4a-9719-05e8a8c9228d');
  });

  // TODO: Add test for checking average landlord rating
  test('Average landlord rating test', async ({ page }) => {
    await page.goto('http://localhost:3000/properties/6a83d02b-9da1-4a4a-9719-05e8a8c9228d');
  });
});
