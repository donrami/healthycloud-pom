import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    // Look for tests in the tests folder
    testDir: './tests',

    // Run tests in parallel
    fullyParallel: true,

    // Fail build on CI if test.only is left in code
    forbidOnly: !!process.env.CI,

    // Retry failed tests on CI
    retries: process.env.CI ? 2 : 0,

    // Limit workers on CI
    workers: process.env.CI ? 1 : undefined,

    // HTML reporter for nice visual reports
    reporter: 'html',

    use: {
        // Capture screenshot on failure
        screenshot: 'only-on-failure',

        // Capture trace on first retry
        trace: 'on-first-retry',

        // Run headless on CI
        headless: false,
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
     
    ],
});
