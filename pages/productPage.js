const { test, expect } = require('@playwright/test');
export class ProductPage {
  constructor(page) {
    this.page               = page;
    this.sortDropdown       = page.locator("//div[@data-testid='sorting']/div[@class='sort-by']");
    this.discountOption     = page.locator("//div[@data-testid='sorting']/div[@class='sort-by']//ul/li[contains(text(), 'Discount (Descending)')]");
    this.prices             = page.locator("//*[@id='product-list-back']/li//*[@class='product-info']/div//span[@data-testid='new-price']");
    //this.firstProduct       = page.locator('.product-item').first();
    this.products           = page.locator('//*[@id="product-list-back"]/li//div[@data-testid="product-img"]');
    this.addToCartBtn       = page.getByRole('button', { name: 'Add to Cart' });
    this.cartIcon           = page.locator('.cart-icon');
    
  }
  /*Brand Filtering:
      o Objective: Ensure that the website's brand filter works as expected when selecting multiple brands (Samsung, LG, Whirlpool).
      o Implementation:
          ▪ Apply the brand filters for Samsung, LG, and Whirlpool.
          ▪ Verify that only products from these brands are displayed in the results. 
  */
  async filterBrands(brands) {

    // Expand the Brand filter if collapsed
 
    const brandFilter = await this.page.locator('//*[@class="cp-accordian typ-sm desktop"]//div[@id="panel1"]');
    if (brandFilter) {
      await brandFilter.click();
    }
     const firstBrandCheckbox  = await this.page.locator('input[type="checkbox"][id^="SG-ManufacturerDetails-Brand-"]');
    //const brandLabel          = await this.page.$eval('label[for^="SG-ManufacturerDetails-Brand-"]', el => el.textContent.trim());
    const brandLabel          = await this.page.$$eval('label[for^="SG-ManufacturerDetails-Brand-"]', els => els.map(el => el.textContent.replace(/\s*\(.*\)/, '').trim()));
 console.log("brnad label are---<"+brandLabel);
 //await this.page.pause();
  for (let i = 0; i < brands.length; i++) {
    const brand = brands[i];

    if (brandLabel.includes(brand)) {
      await this.page.locator(`input[type="checkbox"][id^="SG-ManufacturerDetails-Brand-${brand}"]`).check({ force: true });
      console.log(`${brand} is present ✅`);
      
     // await this.page.locator(`input[type="checkbox"][id^="SG-ManufacturerDetails-Brand-${brand}"]`).evaluate(node => node.checked = true);
    } else {
      console.log(`${brand} is NOT present ❌`);
    }
  }
  
  // Wait for the filter to apply and products to reload
 // await page.getByTestId('filterdatasub').waitFor({ state: 'visible' });
 // await expect(this.page.locator('//*[@id="applied-filters-mobile-desktop"]')).toBeVisible();
// await expect(await this.page.locator('//*[@id="applied-filters-mobile-desktop"]').waitFor({ state: 'visible' })).toBeVisible();
  // //*[@id="applied-filters-mobile-desktop"]
 
  await brandFilter.click();
  
// Wait for the filter tag to appear (proves the logic finished)
  await expect(this.page.getByTestId('plpdatael')).toBeVisible();
  
   await this.page.screenshot({ path: `screenshots/filterBrand-${Date.now()}.png` });

  // Get all product titles displayed
   const productTitles = await this.page.$$eval('.product-title', nodes => nodes.map(n => n.textContent.trim()));
  console.log(productTitles);
  console.log(brands);
  // ///////////////////////////////
 
 // Assert that each product title contains the selected brand name (case-insensitive)
for (const title of productTitles) {
  let matchedBrand = null;

  for (const brand of brands) {
    // Strict check: title should start with brand
    if (title.toLowerCase().startsWith(brand.toLowerCase())) {
      matchedBrand = brand;
      
      break;
    }
  }

  if (!matchedBrand) {
    console.log(`❌ Invalid brand in title: ${title}`);
  } else {
    
    console.log(`✅ ${matchedBrand} → ${title}`);
  }

}
  // /////////////////////////////
 
}
  /* Sorting by Discount:
      o Objective: Test the sorting functionality to ensure products are listed in descending order of discount.
      o Implementation:
        ▪ Apply the discount sort filter.
        ▪ Verify that the products are sorted correctly by discount percentage.
  */
  async sortByDiscount() {
    await this.sortDropdown.click();
    await this.discountOption.click();
    // Wait for the filter tag to appear (proves the logic finished)
  await expect(this.page.getByTestId('plpdatael')).toBeVisible({ timeout: 10000 });
  
   await this.page.screenshot({ path: `screenshots/SortDiscount-${Date.now()}.png` });

  }
  /*
  Price Extraction and Average Calculation:Price Calculation:
  o Objective: Calculate and print the average price of the top 10 discounted products.
  o Implementation:
    ▪ Extract the prices of the top 10 products after sorting by discount.
    ▪ Compute the average price and display it in the test output or report.
  */
  async getTop10Prices() {
    const totalprice = await this.prices.allTextContents();
    return totalprice.slice(0, 10).map(p => parseInt(p.replace(/[₹,]/g, '')));
  }

  async addProductToCompare(models) {
    console.log(models)
    const productTitles = await this.page.$$eval('.product-title', nodes => nodes.map(n => n.textContent.trim()));
  console.log(productTitles);
  // Assert that each product title contains the selected brand name (case-insensitive)
  for (const title of productTitles) {
      let matchedBrand = null;

      for (const model of models) {
        // Strict check: title should start with brand
        if (title.toLowerCase().startsWith(model.toLowerCase())) {
          matchedBrand = model;
          
          break;
        }
      }

  if (!matchedBrand) {
    console.log(`❌ Invalid brand in title: ${title}`);
  } else {  
    // Wait for the list container
    await this.page.waitForSelector(`//*[@class="product-list"]/li//div[@data-testid='product-img']/div/div/div/div/following::input[@name='addToCompare']`, { state: 'attached' });
    const checkboxes = await this.page.locator(`//*[@class="product-list"]/li//div[@data-testid='product-img']/div/div/div/div/following::input[@name='addToCompare']`);
    // 2. Loop through the models to check the corresponding elements
    for (let i = 0; i < models.length; i++) {
        // .nth(i) targets the 0th, 1st, and 2nd element
          await checkboxes.nth(i).check({ force: true });
      //await this.page.locator(`//*[@class="product-list"]/li//div[@data-testid='product-img']/div/div/div/div/following::input[@name='addToCompare']`).first().check({ force: true });
      console.log(`✅ ${matchedBrand} → ${title}`);
    }

  }

}
//await this.page.locator(`//*[contains(@class, 'compare-cta')]`).click();

}

async addToCart(productName) {

  /////////////////////////////
 
  for (const name of productName) {
    // Find the item by name and click it
   
    // This targets the LI (which has the text) then finds the IMG inside
    
      const t=this.products;

      const product = await this.page.locator(`//*[@class="product-list"]/li//div[@data-testid='product-img']/a/div//img[contains(@title, "${name}")]`);
      
      if(product.length===0){
        console.log(name + " not found in the current view.");
        return; // Skip to the next product if not found
      }
  

      while (!(await product.isVisible())) {
          console.log(productName + " not visible, scrolling down...");
        await this.page.mouse.wheel(0, 1000); // Scroll down
        //await product.waitFor({ state: 'attached' });
        await product.waitFor({ state: 'visible', timeout: 90000 }); 
       // await this.page.waitForTimeout(1000);  // Wait for new items to load
      }
      await product.scrollIntoViewIfNeeded(); 
      await product.click();
      
 
  // Perform your action (e.g., Add to Cart)
  //await newPage.getByRole('button', { name: 'Add to cart' }).click();
  
  // Go back to the list if necessary
  //await page.goBack();
}
  /////////////////////////////
    // Wait for the button to be visible and click
    //await this.addToCartBtn.waitFor({ state: 'visible' });
    //await this.addToCartBtn.click();
  }
}
