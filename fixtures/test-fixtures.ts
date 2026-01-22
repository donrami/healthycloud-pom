import { test as base, expect } from '@playwright/test';
import { SearchPage } from '../pages/search-page';

type MyFixtures = {
    searchPage: SearchPage;
};

// Extend the base test with our fixtures
export const test = base.extend<MyFixtures>({
    searchPage: async ({ page }, use) => {
        // Create a new SearchPage instance and provide it to the test
        await use(new SearchPage(page));
    },
});

// Re-export expect so tests can import both from one place
export { expect };
