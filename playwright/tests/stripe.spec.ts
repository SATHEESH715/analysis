import { test, expect } from '@playwright/test';

test.describe("Analysis reports page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the page title', async ({ page }) => {
    await expect(page.getByTestId('page-title')).toHaveText("Analysis reports");
  });

  test('lists the three static items', async ({ page }) => {
    await expect(page.locator('[data-testid^="item-row-"]')).toHaveCount(3);
  });

  test('shows the second item', async ({ page }) => {
    const row = page.getByTestId('item-row-22222222-2222-2222-2222-222222222222');
    await expect(row).toContainText("Rent arrears trend");
    await expect(row).toContainText("Draft");
  });

  for (let k = 0; k < 30; k++) {
    test(`cell check ${k + 1}`, async ({ page }) => {
      const row = page.locator('[data-testid^="item-row-"]').nth(k % 3);
      await expect(row.locator('td').nth(k % 4)).not.toBeEmpty();
    });
  }
});
