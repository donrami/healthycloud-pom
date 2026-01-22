import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
    readonly page: Page;
    
    readonly searchField: Locator;
    readonly searchButton: Locator;
    readonly suggestionsList: Locator;
    
    readonly cookiesPopUp: Locator;
    readonly acceptButton: Locator;
    
    readonly mapMarkers: Locator;

    constructor(page: Page) {
        this.page = page;        
      
        this.searchField = page.getByPlaceholder(/search|suche|ort|postleitzahl/i);
        this.searchButton = page.getByRole('button', { name: 'Gruppen suchen' });
        this.suggestionsList = page.locator('[role="option"], [class*="suggestion"], [class*="awesomplete"] li');
        
        this.cookiesPopUp = page.locator('#uc-main-dialog');
        this.acceptButton = page.getByRole('button', { name: /^Accept All$|^Alle akzeptieren$/i });
        
        this.mapMarkers = page.locator('.leaflet-marker-icon');
    }
   
    async goto(): Promise<void> {
        await this.page.goto('https://gruppenplatz.healthycloud.de/HC_GP_Public_Pages/');
        await this.page.waitForLoadState('networkidle');
    }
   
    async acceptCookiesIfVisible(): Promise<void> {
        try {
            await this.acceptButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.acceptButton.click();
            await this.page.waitForTimeout(500); 
            console.log('✓ DSGVO popup handled');
        } catch (error) {
           
            console.log('ℹ No DSGVO popup detected');
        }
    }
   
    async enterSearchTerm(text: string): Promise<void> {
        await this.searchField.fill(text);
    }
   
    async clickSearch(): Promise<void> {
        await this.searchButton.click();
    }
  
    async searchFor(text: string): Promise<void> {
        await this.enterSearchTerm(text);
        await this.clickSearch();
        // Wait for results to load
        await this.page.waitForTimeout(2000);
    }
   
    async selectSuggestion(index = 0): Promise<void> {
        await expect(this.suggestionsList.first()).toBeVisible({ timeout: 5000 });
        await this.suggestionsList.nth(index).click();
    }
   
    async hasMapMarkers(): Promise<boolean> {
        try {
            await this.mapMarkers.first().waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch {
            return false;
        }
    }
   
    async getSearchFieldValue(): Promise<string> {
        return await this.searchField.inputValue();
    }
}
