import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    // Directory where tests are located
    testDir: './tests',

    // Run tests in parallel
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,

    // Retry on CI only
    retries: process.env.CI ? 2 : 0,

    // Number of workers
    workers: process.env.CI ? 1 : undefined,

    // Reporter to use
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['list']
    ],

    // Shared settings for all projects
    use: {
        // Base URL for page.goto()
        baseURL: 'https://www.saucedemo.com',

        // Collect trace when retrying the failed test
        trace: 'on-first-retry',

        // Capture screenshot on failure
        screenshot: 'only-on-failure',

        // Capture video on failure
        video: 'retain-on-failure',

        // Browser viewport
        viewport: { width: 1280, height: 720 },

        // Action timeout
        actionTimeout: 15000,

        // Navigation timeout
        navigationTimeout: 30000,
    },

    // Configure projects for major browsers
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],

    // Output folder for test artifacts
    outputDir: 'test-results/',
});
