const { test, expect } = require('@playwright/test');
export class HomePage {
  constructor(page) {
    this.page = page;
   // this.searchBox=page.locator("#searchV2")
    this.searchBox = page.getByPlaceholder('What are you looking for ?');

    //login locators
    this.loginSignupButton = page.getByTestId('myaccount');
    this.emailInput        = page.getByPlaceholder('Enter your Email ID or phone number');
    this.continueButton    = page.getByRole('button', { name: 'Continue' });
   
  }

  async goTo() {
    await this.page.goto('https://www.croma.com/');
  }

  async searchProduct(product) {
    await this.searchBox.fill(product, { timeout: 90000 });
    await this.page.keyboard.press('Enter');
    const products = this.page.locator('//*[@id="product-list-back"]/li//div[@data-testid="product-img"]');
// Waits up to 5s (default) for visibility before proceeding
//await expect(products).toBeVisible({ timeout: 80000 }); 
 await expect(this.page.getByTestId('product-img').first()).toBeVisible({ timeout: 90000 });
    //await this.page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });
    await this.page.screenshot({ path: `screenshots/homepage-${Date.now()}.png` });
   
  }

  async login(email) {
    await this.loginSignupButton.click();
    await this.emailInput.fill(email);
    await this.continueButton.click();
  }
}
