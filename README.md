# Playwright Automation Framework

A TypeScript-based end-to-end test automation project using [Playwright](https://playwright.dev/). Tests run against the [SauceDemo](https://www.saucedemo.com) demo app.

## Project Structure

```
/
├── constants/
│   └── locators.ts        # All reusable XPath/CSS selectors (no test logic)
├── tests/
│   ├── login.spec.ts      # Login & logout test suite
│   └── cart.spec.ts       # Cart & checkout flow tests
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── package.json
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+

## Installation

```bash
# 1. Install project dependencies
npm install

# 2. Install Playwright browsers (Chromium, Firefox, WebKit)
npx playwright install
```

## Running Tests

```bash
# Run all tests (headless, all browsers)
npx playwright test

# Run tests in a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run with browser UI visible
npx playwright test --headed

# Run a specific test file
npx playwright test tests/login.spec.ts

# Run a specific test by name
npx playwright test --grep "successful login"
```

## Viewing Reports

```bash
# Open the HTML report after a test run
npx playwright show-report
```

## Adding New Locators

Add selectors to `constants/locators.ts` as named exports. Never hardcode XPath or CSS directly in test files.

```ts
// constants/locators.ts
export const MyPage = {
  submitButton: "//button[@type='submit']",
  headerTitle: ".page-header h1",
};
```

Then import in your test:

```ts
import { MyPage } from '../constants/locators';
await page.locator(MyPage.submitButton).click();
```

## Adding New Tests

Create a new file in `tests/` with the `.spec.ts` extension. Playwright auto-discovers all files matching `**/*.spec.ts`.

## CI Integration

Set the `CI` environment variable to `true` to enable:
- Single worker (no parallelism)
- 2 automatic retries on failure

```bash
CI=true npx playwright test
```
