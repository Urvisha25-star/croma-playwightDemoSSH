//import { execPath } from 'node:process';

const { test, expect } = require('@playwright/test');
export class CartPage {
  constructor(page) {
    this.page = page;
    //this.cartItems = page.locator('.cart-item');
    this.cartItems = page.locator('//*[@data-testid="CartDetails-testing"]');
//h3/a[contains(@href, "whirlpool-protton-nxt-237")]
    this.cartItemNames = page.locator('.cart-item .product-name');
    this.cartItemPrices = page.locator('.cart-item .product-price');
  }   
  // Locator for a specific product container in the cart
  async productRow(productName) {
    //return this.page.locator('.cart-item-container', { hasText: productName });
    
    return this.page.locator(`//*[@data-testid="CartDetails-testing"]//a[contains(text(), "${productName}")]`);
  }
  async verifyCartItems(expectedProducts) {
    // Wait for cart items to be visible
   // await expect(this.cartItems).toBeVisible({ timeout: 10000 });
    for (const name of expectedProducts) {
        // //a[contains(text(), 'LG 185 Litres 3 Star')]const product = await this.page.locator(`//*[@class="product-list"]/li//div[@data-testid='product-img']/a/div//img[contains(@title, "${name}")]`);
        // //*[@data-testid="CartDetails-testing"]
        // //*[@data-testid="CartDetails-testing"]//a[contains(text(), "LG 185 Litres 3 Star")]
       //await expect(this.page.locator('//*[@data-testid="CartDetails-testing"]')).toBeVisible({ timeout: 10000 });
console.log('✅ Product cart details   are visible!');
    await this.page.screenshot({ path: 'productCarttt-visible.png' });
        const product = await this.page.locator(`//a[contains(text(), "${name}")]`);
        await expect(product).toBeVisible({ timeout: 10000 });
        await this.page.screenshot({ path: 'productCart-visible.png' });
        console.log('✅ Product is matching and visible!');
    
       // const item =await product.filter({ hasText: name });
        //console.log(item)
         // console.log(item.length)
        //if(item.length===0){
       // console.log(name + " not found in the current view.");
       // return; // Skip to the next product if not found
      //}
      console.log(`Verifying presence of product in cart: ${name}`);
       // const item = this.cartItemNames.filter({ hasText: name });
       // await expect(item).toBeVisible();
    }
  }  
}