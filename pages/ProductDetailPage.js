const { expect } = require('@playwright/test'); 
class ProductDetailPage {
  constructor(page) {
    this.page = page;
   // this.detailsContainer = page.getByTestId('product-details');
    this.addButton = page.getByRole('button', { name: 'Add to Cart' });
  }

  async verifyDetailsVisible() {
   // await expect(this.detailsContainer).toBeVisible();
   var firstResult = await this.page.waitForSelector('//*[@data-testid="product-details"]');
console.log(` ${await firstResult.textContent()}`);
    await expect(this.page.locator('//*[@data-testid="product-details"]')).toBeVisible({ timeout: 10000 });
    console.log('✅ Product details are visible!');
    await this.page.screenshot({ path: 'product-visible.png' });
   
  }
  async addToCartButton() {
     // Wait for the button to be visible and click
     await this.page.mouse.wheel(0, 1000); 
    await this.addButton.waitFor({ state: 'visible' });
   
    await this.addButton.click();
    // await page.getByTestId('button-testing').getByRole('button', { name: 'Proceed to Cart' }).first().click();
    // //*/d
    // iv[@data-testid='button-testing']//button[@class='btn btn-default proceed-tocart']
await expect(this.page.locator('//*[@data-testid="button-testing"]//button[contains(@class, "btn btn-default proceed-tocart")]')).toBeVisible({ timeout: 10000 });
const currentUrl = this.page.url();
console.log('The URL is:', currentUrl);

console.log('✅ Product details pop up  are visible!');
    await this.page.screenshot({ path: 'product-visible.png' });
await this.page.locator('//*[@data-testid="button-testing"]//button[contains(@class, "btn btn-default proceed-tocart")]').click()
// https://www.croma.com/cart
const currentUrl1 = this.page.url();
console.log('The URL1 is:', currentUrl1);
await expect(this.page).toHaveURL(/.*cart/);
await expect(this.page.locator('//*[@data-testid="CartDetails-testing"]')).toBeVisible({ timeout: 10000 });
 await this.page.screenshot({ path: 'product1-visible.png' });
 
 //await this.page.goBack();

   // await this.page.getByRole('button', { name: 'Add to cart' }).click();
   // await this.addToCartButton.click();       
  }
}
module.exports = { ProductDetailPage };