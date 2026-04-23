const { test, expect } = require('@playwright/test');
import { HomePage } from '../pages/homePage.js';
import { ProductPage } from '../pages/productPage.js';
import testData from '../testData/data.json';

test('Test refrigerator comparison feature', async ({ page }) => {
    const home      = new HomePage(page);
    const product   = new ProductPage(page);

     await home.goTo();
     await home.searchProduct(testData.search);
    // 2. Select Products
    await product.addProductToCompare(testData.models);
  
  /*for (const model of testData.models) {
    console.log(`Adding ${model} to comparison...`);
    await product.addProductToCompare(testData.models);
  }*/
})