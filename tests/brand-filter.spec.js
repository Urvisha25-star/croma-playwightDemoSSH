const { test, expect } = require('@playwright/test');

/* Brand Filtering:
o Objective: Ensure that the website's brand filter works as expected when selecting multiple brands (Samsung, LG, Whirlpool).
o Implementation:
▪ Apply the brand filters for Samsung, LG, and Whirlpool.
▪ Verify that only products from these brands are displayed in the results.*/



// This test verifies that after filtering by a brand, only that brand's products are displayed

test('Croma Refrigerator Brand Filter displays only selected brand products', async ({ page }) => {
  // Go to the refrigerator search page
  await page.goto('https://www.croma.com/searchB?q=refrigerator%3Arelevance&text=refrigerator');

  // Wait for filters to load
  await page.waitForSelector('text=Brand');

  // Expand the Brand filter if collapsed
 
 const brandFilter = await page.locator('//*[@class="cp-accordian typ-sm desktop"]//div[@id="panel1"]');

  
  if (brandFilter) {
    await brandFilter.click();
  }

  // Select the first available brand
  //  in the filter list
  //SG-ManufacturerDetails-Brand-Samsung
 // const firstBrandCheckbox = await page.$('input[type="checkbox"][id^="checkbox_Brand_"]');
 const firstBrandCheckbox = await page.locator('input[type="checkbox"][id^="SG-ManufacturerDetails-Brand-"]');
 console.log(firstBrandCheckbox)
  
  const brandLabel = await page.$eval('label[for^="SG-ManufacturerDetails-Brand-"]', el => el.textContent.trim());
  console.log(brandLabel) //locator('input[type="checkbox"][id^="SG-ManufacturerDetails-Brand-"]')
//LG (112)
const match = brandLabel.match(/^([A-Za-z\s]+)\s*\(/);

const brandName = match ? match[1].trim() : null;
console.log(brandName); // Samsung Electronics
const test = await page.locator(`input[type="checkbox"][id^="SG-ManufacturerDetails-Brand-${brandName}"]`).check({ force: true });


 
  

  // Wait for the filter to apply and products to reload
 // await page.waitForLoadState('networkidle');
 await brandFilter.click();
 //await page.waitForTimeout(80000);

  // Get all product titles displayed
  const productTitles = await page.$$eval('.product-title', nodes => nodes.map(n => n.textContent.trim()));

  // Assert that each product title contains the selected brand name (case-insensitive)
  for (const title of productTitles) {
    //expect(title.toLowerCase()).toContain(brandLabel.toLowerCase());
    expect(title.toLowerCase()).toContain(brandName.toLowerCase());
  }
});
