const { test, expect } = require('@playwright/test');
import { HomePage } from '../pages/homePage.js';
import { ProductPage } from '../pages/productPage.js';
import { ProductDetailPage } from '../pages/ProductDetailPage.js';
import { CartPage } from '../pages/cartPage.js';
import testData from '../testData/data.json';


test('Croma User Registration and Login Flow', async ({ page, context  }) => {
     test.setTimeout(90000); // Give this test 90 seconds to finish
    // 1. Navigate to Croma
    const home      = new HomePage(page);
    const product   = new ProductPage(page);
    const cart      = new CartPage(page);
   
   
    await home.goTo();
   // await home.login(testData.email);
    // Step 2: Validate redirection to the correct page
  // Redirects usually land on the 'my-account' or dashboard page
 // await expect(page).toHaveURL('https://www.croma.com/my-account');
    
    await home.searchProduct(testData.search);
    // This method now returns the NEW tab
  //const newTab = await product.addToCart(testData.targetProduct);
   // await product.addToCart(testData.targetProduct);
     // 1. & 2. Trigger click and listen for the tab at the same time
  const [newPage] = await Promise.all([
    context.waitForEvent('page'), // Listener
    product.addToCart(testData.targetProduct) // Action that opens tab
  ]);
  // 3. (Optional but recommended) Wait for the new page to actually load
  await newPage.waitForLoadState('domcontentloaded');

   //console.log(newTab);
   // Wait for the product details page to load (you can adjust the selector as needed)
   //await expect(newTab.locator('//*[@data-testid="product-details"]')).toBeVisible({ timeout: 10000 });                 
     
    // 4. Initialize the NEW Page Object with the NEW tab
  const detailPage = new ProductDetailPage(newPage);
  //await detailPage.verifyDetailsVisible();
  await detailPage.addToCartButton();
//Loop through each product defined in your JSON
  for (const product of testData.targetProduct) {
    // This removes the container dependency and just looks for the link

    const row = await cart.productRow(product);
    console.log(`Checking for product in cart: ${product}`);
    console.log(`Locator for product "${product}": ${row}`);
    // 1. Verify product name is visible
    /* 
    const row = this.page.locator('.cart-item-container').filter({ hasText: 'LG 185 Litres' });
    await expect(row).toBeVisible({ timeout: 10000 });
    */
   await expect(page.locator(`//a[contains(text(), "${product}")]`))
    .toBeVisible({ timeout: 90000 });
    //await expect(row).toBeVisible({ timeout: 90000 });
    console.log(`Verified: ${product} is in cart and visible.`);
    //await cart.verifyCartItems(testData.targetProduct);
  }

    
})
