// @ts-check
import { test, expect }  from '@playwright/test';
import { MainPage } from '../POM/mainPage';
import { LoginPage } from '../POM/loginPage';

test.describe("Test suit", ()=> {
  let loginPage
  let mainPage
  let discountItem
  let fullPriceItem
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    mainPage = new MainPage(page)
    await page.goto('https://enotes.pointschool.ru/login');
    await loginPage.loginUser("test", "test")
    await expect(page).toHaveURL("https://enotes.pointschool.ru")
    discountItem = await mainPage.getRandomDiscountId()
    fullPriceItem = await mainPage.getRandomFullPriceId()
  });

  test.afterEach(async ({})=> {
    await mainPage.clearBasket()
  })

  test('Test case 1', async ({ page }) => {
    await mainPage.basketButton.click()
    await expect (mainPage.basketModal).toBeVisible()

    await mainPage.goToBasketButton.click()
    await expect(page).toHaveURL("https://enotes.pointschool.ru/basket")
    await expect(mainPage.brandLink).toBeVisible() 
  });
  
  test('Test case 2', async ({ page }) => {
    let itemData = await mainPage.addItemsById(fullPriceItem)
    await expect (mainPage.basketItems).toHaveText("1")

    await mainPage.basketButton.click()
    await expect (mainPage.basketModal).toBeVisible()
    await expect(mainPage.basketItemPrice).toContainText(String(itemData[0].price * itemData[0].count))
    await expect(mainPage.basketItemName).toHaveText(itemData[0].name)
    await expect(mainPage.basketPrice).toHaveText(itemData.slice(-1))

    await mainPage.goToBasketButton.click()
    await expect(page).toHaveURL("https://enotes.pointschool.ru/basket")
    await expect(mainPage.brandLink).toBeVisible() 
  });

  test('Test case 3', async ({ page }) => {
    let itemData = await mainPage.addItemsById(discountItem)
    await expect (mainPage.basketItems).toHaveText("1")

    await mainPage.basketButton.click()
    await expect (mainPage.basketModal).toBeVisible()
    await expect(mainPage.basketItemPrice).toContainText(String(itemData[0].price * itemData[0].count))
    await expect(mainPage.basketItemName).toHaveText(itemData[0].name)
    await expect(mainPage.basketPrice).toHaveText(itemData.slice(-1))

    await mainPage.goToBasketButton.click()
    await expect(page).toHaveURL("https://enotes.pointschool.ru/basket")
    await expect(mainPage.brandLink).toBeVisible() 
  });

  test('Test case 4', async ({ page }) => {
    await mainPage.goToItemsPage(2)
    let firstItemData = await mainPage.addItemsById(9)
    await expect (mainPage.basketItems).toHaveText("1")
    await mainPage.goToItemsPage(1)

    let itemData = await mainPage.addItemsById(1,2,3,4,5,6,7,8)
    await expect (mainPage.basketItems).toHaveText("9")

    await mainPage.basketButton.click()
    await expect(mainPage.basketModal).toBeVisible()
    
    await expect(mainPage.basketItemPrice.nth(0)).toContainText(String(firstItemData[0].price * firstItemData[0].count))
    await expect(mainPage.basketItemName.nth(0)).toHaveText(firstItemData[0].name)

    await expect(mainPage.basketItemPrice.nth(1)).toContainText(String(itemData[0].price * itemData[0].count))
    await expect(mainPage.basketItemName.nth(1)).toHaveText(itemData[0].name)

    await expect(mainPage.basketItemPrice.nth(2)).toContainText(String(itemData[1].price * itemData[1].count))
    await expect(mainPage.basketItemName.nth(2)).toHaveText(itemData[1].name)

    await expect(mainPage.basketItemPrice.nth(3)).toContainText(String(itemData[2].price * itemData[2].count))
    await expect(mainPage.basketItemName.nth(3)).toHaveText(itemData[2].name)

    await expect(mainPage.basketItemPrice.nth(4)).toContainText(String(itemData[3].price * itemData[3].count))
    await expect(mainPage.basketItemName.nth(4)).toHaveText(itemData[3].name)

    await expect(mainPage.basketItemPrice.nth(5)).toContainText(String(itemData[4].price * itemData[4].count))
    await expect(mainPage.basketItemName.nth(5)).toHaveText(itemData[4].name)

    await expect(mainPage.basketItemPrice.nth(6)).toContainText(String(itemData[5].price * itemData[5].count))
    await expect(mainPage.basketItemName.nth(6)).toHaveText(itemData[5].name)

    await expect(mainPage.basketItemPrice.nth(7)).toContainText(String(itemData[6].price * itemData[6].count))
    await expect(mainPage.basketItemName.nth(7)).toHaveText(itemData[6].name)

    await expect(mainPage.basketItemPrice.nth(8)).toContainText(String(itemData[7].price * itemData[7].count))
    await expect(mainPage.basketItemName.nth(8)).toHaveText(itemData[7].name)

    await expect(mainPage.basketPrice).toHaveText(itemData.slice(-1) + firstItemData.slice(-1))

    await mainPage.goToBasketButton.click()
    await expect(page).toHaveURL("https://enotes.pointschool.ru/basket")
    await expect(mainPage.brandLink).toBeVisible() 
  });

  test('Test case 5', async ({ page }) => {
    let itemData = await mainPage.addItemsById(discountItem,discountItem,discountItem,
      discountItem,discountItem,discountItem,discountItem,discountItem,discountItem)
    await expect (mainPage.basketItems).toHaveText("9")

    await mainPage.basketButton.click()
    await expect (mainPage.basketModal).toBeVisible()
    await expect(mainPage.basketItemPrice).toContainText(String(itemData[0].price * itemData[0].count))
    await expect(mainPage.basketItemName).toHaveText(itemData[0].name)
    await expect(mainPage.basketPrice).toHaveText(itemData.slice(-1))

    await mainPage.goToBasketButton.click()
    await expect(page).toHaveURL("https://enotes.pointschool.ru/basket")
    await expect(mainPage.brandLink).toBeVisible() 
  });

})


