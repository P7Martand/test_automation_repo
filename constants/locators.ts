/**
 * constants/locators.ts
 *
 * Central repository for all reusable XPath and CSS selectors.
 * Keep ONLY locator definitions here — no test logic.
 */

// ---------------------------------------------------------------------------
// Login Page (https://www.saucedemo.com)
// ---------------------------------------------------------------------------
export const LoginPage = {
    usernameInput: "//input[@id='user-name']",
    passwordInput: "//input[@id='password']",
    loginButton: "//input[@id='login-button']",
    errorMessage: "//h3[@data-test='error']",
};

// ---------------------------------------------------------------------------
// Products / Inventory Page
// ---------------------------------------------------------------------------
export const InventoryPage = {
    pageTitle: "//span[@class='title']",
    productList: "//div[@class='inventory_list']",
    productItem: "//div[@class='inventory_item']",
    /** Pass an index (0-based) to target a specific add-to-cart button */
    addToCartButton: (index: number) =>
        `(//button[contains(@id,'add-to-cart')])[${index + 1}]`,
    cartIcon: "//a[@class='shopping_cart_link']",
    cartBadge: "//span[@class='shopping_cart_badge']",
    sortDropdown: "//select[@class='product_sort_container']",
};

// ---------------------------------------------------------------------------
// Cart Page
// ---------------------------------------------------------------------------
export const CartPage = {
    cartTitle: "//span[@class='title']",
    cartItems: "//div[@class='cart_item']",
    checkoutButton: "//button[@id='checkout']",
    continueShoppingButton: "//button[@id='continue-shopping']",
    removeButton: (itemName: string) =>
        `//div[@class='cart_item'][.//div[text()='${itemName}']]//button`,
};

// ---------------------------------------------------------------------------
// Checkout Page
// ---------------------------------------------------------------------------
export const CheckoutPage = {
    firstNameInput: "//input[@id='first-name']",
    lastNameInput: "//input[@id='last-name']",
    postalCodeInput: "//input[@id='postal-code']",
    continueButton: "//input[@id='continue']",
    cancelButton: "//button[@id='cancel']",
    errorMessage: "//h3[@data-test='error']",
};

// ---------------------------------------------------------------------------
// Order Confirmation Page
// ---------------------------------------------------------------------------
export const ConfirmationPage = {
    confirmationHeader: "//h2[@class='complete-header']",
    confirmationText: "//div[@class='complete-text']",
    backHomeButton: "//button[@id='back-to-products']",
};

// ---------------------------------------------------------------------------
// Navigation / Header
// ---------------------------------------------------------------------------
export const Navigation = {
    menuButton: "//button[@id='react-burger-menu-btn']",
    logoutLink: "//a[@id='logout_sidebar_link']",
    allItemsLink: "//a[@id='inventory_sidebar_link']",
    resetAppStateLink: "//a[@id='reset_sidebar_link']",
};
