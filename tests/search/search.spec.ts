import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Search Functionality', () => {

    test.beforeEach(async ({ searchPage }) => {
        // Navigate and handle cookie popup before each test
        await searchPage.goto();
        await searchPage.acceptCookiesIfVisible();
    });

    test('should perform a city search and display map markers', async ({ searchPage }) => {
        // Perform search for Hamburg
        await searchPage.searchFor('Hambu');

        // Map markers should appear
        const hasMarkers = await searchPage.hasMapMarkers();
        expect(hasMarkers).toBe(true);

        // Search field should retain the search term
        const fieldValue = await searchPage.getSearchFieldValue();
        expect(fieldValue).toBe('Hambu');
    });

    test('should handle empty search gracefully', async ({ searchPage }) => {
        // Click search without entering anything
        await searchPage.clickSearch();     
        await expect(searchPage.searchButton).toBeVisible();
    });

});
