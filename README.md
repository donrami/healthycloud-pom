# Gruppenplatz Tests

Playwright-based end-to-end tests for the Search & Map component using the Page Object Model pattern.

## Project Structure

```
healthycloud-pom/
├── tests/
│   └── search/
│       └── search.spec.ts      # Test cases (assertions live here)
├── pages/
│   └── search-page.ts          # Page Object (locators + actions)
├── fixtures/
│   └── test-fixtures.ts        # Provides page objects to tests
├── playwright.config.ts        # Playwright configuration
└── package.json
```
