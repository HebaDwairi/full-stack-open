const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset');
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'hebatullah',
        username: 'heba',
        password: '1011'
      }
    })

    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('login')).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('heba');
      await page.getByTestId('password').fill('1011');
      await page.getByRole('button', {name: 'login'}).click();

      await expect(page.getByText('hebatullah logged in')).toBeVisible();
    });

    test('fails with incorrect credentials', async ({ page }) => {
      await page.getByTestId('username').fill('hebaaaa');
      await page.getByTestId('password').fill('1011');
      await page.getByRole('button', {name: 'login'}).click();

      await expect(page.getByText('login failed: invalid username or password')).toBeVisible();
    });
  });
})