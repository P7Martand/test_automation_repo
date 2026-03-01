import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage, Navigation } from '../constants/locators';

// ---------------------------------------------------------------------------
// Test Suite: Login Functionality (https://www.saucedemo.com)
// ---------------------------------------------------------------------------

const BASE_URL = 'https://www.saucedemo.com';

test.describe('Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    });

    test('successful login with valid credentials', async ({ page }) => {
        // Fill in credentials using locators from constants
        await page.locator(LoginPage.usernameInput).fill('standard_user');
        await page.locator(LoginPage.passwordInput).fill('secret_sauce');
        await page.locator(LoginPage.loginButton).click();

        // Assert the inventory page is shown
        await expect(page.locator(InventoryPage.pageTitle)).toHaveText('Products');
        await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
    });

    test('login fails with invalid password', async ({ page }) => {
        await page.locator(LoginPage.usernameInput).fill('standard_user');
        await page.locator(LoginPage.passwordInput).fill('wrong_password');
        await page.locator(LoginPage.loginButton).click();

        // Assert error message is displayed
        const errorMsg = page.locator(LoginPage.errorMessage);
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Epic sadface');
    });

    test('login fails with locked out user', async ({ page }) => {
        await page.locator(LoginPage.usernameInput).fill('locked_out_user');
        await page.locator(LoginPage.passwordInput).fill('secret_sauce');
        await page.locator(LoginPage.loginButton).click();

        const errorMsg = page.locator(LoginPage.errorMessage);
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('locked out');
    });

    test('login fails with empty credentials', async ({ page }) => {
        await page.locator(LoginPage.loginButton).click();

        const errorMsg = page.locator(LoginPage.errorMessage);
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Username is required');
    });
});

test.describe('Logout', () => {
    test.beforeEach(async ({ page }) => {
        // Login before each test
        await page.goto(BASE_URL);
        await page.locator(LoginPage.usernameInput).fill('standard_user');
        await page.locator(LoginPage.passwordInput).fill('secret_sauce');
        await page.locator(LoginPage.loginButton).click();
        await expect(page.locator(InventoryPage.pageTitle)).toBeVisible();
    });

    test('user can logout successfully', async ({ page }) => {
        await page.locator(Navigation.menuButton).click();
        await page.locator(Navigation.logoutLink).click();

        // Should redirect back to login page
        await expect(page).toHaveURL(BASE_URL + '/');
        await expect(page.locator(LoginPage.loginButton)).toBeVisible();
    });
});
