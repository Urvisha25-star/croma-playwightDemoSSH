//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');
import { HomePage } from '../pages/homePage.js';
import { ProductPage } from '../pages/productPage.js';
import testData from '../testData/data.json';


test('E2E Refrigerator Flow using JSON', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);

  await home.goTo();
  await home.searchProduct(testData.search);

  await product.filterBrands(testData.brands);
  await product.sortByDiscount();

  const prices = await product.getTop10Prices();
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

  console.log('Average Price:', avg);
  expect(prices.length).toBeGreaterThan(0);

  //Product Comparison:
  
});
