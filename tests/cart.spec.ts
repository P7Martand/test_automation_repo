import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage, CartPage, CheckoutPage, ConfirmationPage } from '../constants/locators';

// ---------------------------------------------------------------------------
// Test Suite: Shopping Cart & Checkout Flow
// ---------------------------------------------------------------------------

const BASE_URL = 'https://www.saucedemo.com';

test.describe('Shopping Cart & Checkout', () => {
    test.beforeEach(async ({ page }) => {
        // Login before each test
        await page.goto(BASE_URL);
        await page.locator(LoginPage.usernameInput).fill('standard_user');
        await page.locator(LoginPage.passwordInput).fill('secret_sauce');
        await page.locator(LoginPage.loginButton).click();
        await expect(page.locator(InventoryPage.pageTitle)).toHaveText('Products');
    });

    test('add first product to cart and verify badge', async ({ page }) => {
        // Add the first product to cart
        await page.locator(InventoryPage.addToCartButton(0)).click();

        // Cart badge should show count of 1
        const cartBadge = page.locator(InventoryPage.cartBadge);
        await expect(cartBadge).toBeVisible();
        await expect(cartBadge).toHaveText('1');
    });

    test('navigate to cart after adding items', async ({ page }) => {
        await page.locator(InventoryPage.addToCartButton(0)).click();
        await page.locator(InventoryPage.cartIcon).click();

        // Should be on cart page
        await expect(page).toHaveURL(`${BASE_URL}/cart.html`);
        await expect(page.locator(CartPage.cartTitle)).toHaveText('Your Cart');
        await expect(page.locator(CartPage.cartItems)).toHaveCount(1);
    });

    test('complete full checkout flow', async ({ page }) => {
        // Add a product
        await page.locator(InventoryPage.addToCartButton(0)).click();

        // Go to cart
        await page.locator(InventoryPage.cartIcon).click();
        await expect(page).toHaveURL(`${BASE_URL}/cart.html`);

        // Proceed to checkout
        await page.locator(CartPage.checkoutButton).click();
        await expect(page).toHaveURL(`${BASE_URL}/checkout-step-one.html`);

        // Fill checkout details
        await page.locator(CheckoutPage.firstNameInput).fill('John');
        await page.locator(CheckoutPage.lastNameInput).fill('Doe');
        await page.locator(CheckoutPage.postalCodeInput).fill('12345');
        await page.locator(CheckoutPage.continueButton).click();

        // Should reach overview page
        await expect(page).toHaveURL(`${BASE_URL}/checkout-step-two.html`);

        // Finish checkout
        await page.locator("//button[@id='finish']").click();

        // Confirm order completed
        await expect(page.locator(ConfirmationPage.confirmationHeader)).toHaveText('Thank you for your order!');
        await expect(page.locator(ConfirmationPage.confirmationText)).toBeVisible();
    });

    test('continue shopping from cart', async ({ page }) => {
        await page.locator(InventoryPage.addToCartButton(0)).click();
        await page.locator(InventoryPage.cartIcon).click();

        await page.locator(CartPage.continueShoppingButton).click();

        // Should be back on inventory page
        await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
        await expect(page.locator(InventoryPage.pageTitle)).toHaveText('Products');
    });

    test('checkout fails with missing first name', async ({ page }) => {
        await page.locator(InventoryPage.addToCartButton(0)).click();
        await page.locator(InventoryPage.cartIcon).click();
        await page.locator(CartPage.checkoutButton).click();

        // Submit without filling fields
        await page.locator(CheckoutPage.continueButton).click();

        const errorMsg = page.locator(CheckoutPage.errorMessage);
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('First Name is required');
    });
});
