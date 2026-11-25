const base = require('@playwright/test');
const {APiUtils} = require('./APiUtils.js');
const {request} = require('@playwright/test');

const loginPayLoad = { userEmail: 'rahulshettyw@gmail.com', userPassword: 'Learning@830$3mK3' };
const orderPayLoad = {
  orders: [{ country: 'India', productOrderedId: '6960eac0c941646b7a8b3e68' }]};

exports.customtest = base.test.extend({
  // use parameter is used for custom fixtures, it is used to pass the value to the test function
    authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('rahulshettyw@gmail.com');
    await page.locator('#userPassword').fill('Learning@830$3mK3');
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    await use(page);
    //tear down. imp to close the context after the test is done, otherwise it will keep the browser open and consume resources
    await context.close();





  },

  createOrder : async({},use)=>
  {
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   const response =  await apiUtils.createOrder(orderPayLoad);
   await use(response);
   await apiContext.dispose();

  },

  testDataForOrder : {

    productName : 'ADIDAS ORIGINAL'
  }
});








