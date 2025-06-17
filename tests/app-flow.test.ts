import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/account-statement-organizer/');
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Account Statement Organizer');
});

test('upload file and press submit', async ({ page }) => {
  await page.goto('http://localhost:5173/account-statement-organizer/');

  page.on('filechooser', async fileChooser => {
    await fileChooser.setFiles(
      path.join(dirname, '../src/assets/demo-file.csv'),
    );
  });

  await page.getByText('Velg').click();

  await page
    .getByRole('button', { name: 'Organiser' })
    .click({ timeout: 10000 });

  await expect(
    page.getByText('Vent mens vi kategoriserer transaksjonene dine'),
  ).toBeVisible();

  await page.waitForTimeout(5000);

  await expect(page.getByRole('heading', { name: 'Utgifter' })).toBeVisible();
});
