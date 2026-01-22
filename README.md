# Gruppenplatz E2E Tests (Page Object Model)

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

## Why This Structure?

**Page Object Model (POM)** separates:
- **WHERE things are** (locators) → `pages/`
- **WHAT we're testing** (assertions) → `tests/`

When OutSystems changes element IDs, you only update `pages/search-page.ts` — not every test file.

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

## Running Tests

```bash
# Run all tests (headless)
npm test

# Run with visible browser (recommended for learning)
npm run test:headed

# Debug mode with step-by-step inspector
npm run test:debug

# Interactive UI mode
npm run test:ui

# View HTML report after tests
npm run report
```

## Key Design Decisions

1. **Semantic locators over dynamic IDs**
   ```typescript
   // ✅ Good - survives OutSystems deployments
   this.searchButton = page.getByRole('button', { name: 'Gruppen suchen' });
   
   // ❌ Avoid - breaks on every deployment
   this.searchButton = page.locator('#b4-b2-b1-Button');
   ```

2. **Cookie handling in SearchPage**
   - Usercentrics DSGVO popup is handled in `acceptCookiesIfVisible()`
   - Called in `beforeEach` hook so every test starts clean

3. **Minimal test count**
   - Focus on core search functionality
   - "Structured thinking, not volume"
