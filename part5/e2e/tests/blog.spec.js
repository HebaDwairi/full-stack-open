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

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('heba');
      await page.getByTestId('password').fill('1011');
      await page.getByRole('button', {name: 'login'}).click();
    });

    describe('after a new blog is submitted', () => {
      beforeEach(async({ page }) => {
        await page.getByRole('button', {name: 'create new blog'}).click();
        await page.getByTestId('title').fill('Canonical string reduction');
        await page.getByTestId('author').fill('Edsger W. Dijkstra');
        await page.getByTestId('url').fill('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html');
        await page.getByTestId('createBlog').click();
      });

      test('a new blog can be added', async({ page }) => {
        await expect(page.getByText('Canonical string reduction Edsger W. Dijkstra')).toBeVisible();
      });
  
      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', {name: 'view'}).click();
        await page.getByRole('button', {name: 'like'}).click();
        
        await expect(page.getByText('likes: 1')).toBeVisible();
      });
  
      test('a blog can be deleted by the user who added it', async ({ page }) => {
        await page.getByRole('button', {name: 'view'}).click();
        
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', {name: 'remove'}).click();

        await expect(page.getByText('Canonical string reduction Edsger W. Dijkstra')).not.toBeVisible();
      });
    });
  });
});