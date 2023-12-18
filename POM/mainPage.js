
import { BasePage } from "./basePage";

export class MainPage extends BasePage {

    constructor(page, request) {
        super(page, request)
    }
    // Xpath locators
    // Header bar
    userAvatar = this.page.locator(`//div[@class = "user-avatar mr-2"]`)
    userName = this.page.locator(`//div[@class = "text-uppercase"]`)

    userDropdown = this.page.locator(`//a[@id = "dropdownUser"]`)
    logoutButton = this.page.locator(`//button[@class = "btn btn-link logout"]`)

    basketButton = this.page.locator(`//a[@id = "dropdownBasket"]`)
    basketItems = this.page.locator(`//span[@class = "basket-count-items badge badge-primary"]`)

    //Basket
    basketModal = this.page.locator(`//div[@class = "dropdown-menu dropdown-menu-right show"]`)

    basketItemLine = this.page.locator(`//li[@class = "basket-item list-group-item d-flex justify-content-start align-items-center"]`)
    deleteItemfromBasketButton = this.page.locator(`//i[@class= "actionDeleteProduct fa fa-trash fa-lg mr-4"]`)
    basketItemImage = this.page.locator(`//img[@class= "basket-item-poster mr-2"]`)
    basketItemName = this.page.locator(`//span[@class= "basket-item-title"]`)
    basketItemPrice = this.page.locator(`//span[@class= "basket-item-price"]`)
    basketItemCount = this.page.locator(`//span[@class= "basket-item-count badge badge-primary ml-auto"]`)

    basketPriceLabel = this.page.locator(`//span[@class = "basket_price"]/..`)
    basketPrice = this.page.locator(`//span[@class = "basket_price"]`)

    goToBasketButton = this.page.locator(`//a[@href= "/basket"]`)
    clearBasketButton = this.page.locator(`//a[@class= "btn btn-danger btn-sm mr-auto"]`)

    //Filter Bar
    searchByNameInput = this.page.locator(`//input[@id = "filterSearch"]`)
    searchByNameButton = this.page.locator(`//input[@id = "filterSearch"]/following-sibling::div/button"]`)

    searchByTypeDropdown = this.page.locator(`//span[@data-select2-id = "1"]`)
    searchByTypetypeInput = this.page.locator(`//span[@data-select2-id = "1"]//li//input`)

    searchByBrandDropdown = this.page.locator(`//span[@data-select2-id = "2"]`)

    priceFilterLabel = this.page.locator(`//div[@class = "input-group-prepend"]//span`)
    priceLowerLimit = this.page.locator(`//input[@name = "price-from"]`)
    priceUpperLimit = this.page.locator(`//input[@name = "price-to"]`)
    searchByPriceButton = this.page.locator(`//input[@name = "price-to"]/..//div//button`)

    discountOnlyCheckBox = this.page.locator(`//label[@class = "form-check-label"]`)
    discountOnlyLabel = this.page.locator(`//input[@name = "is-discount"]`)

    //Item List
    itemImage = this.page.locator(`//img[@class = "product_poster"]`)

    itemDiscount = this.page.locator(`//span[@class = "product_discount"]`)

    itemType = this.page.locator(`//small[@class = "product_type"]`)
    itemName = this.page.locator(`//div[@class = "product_name h6 mb-auto"]`)

    itemPriceLabel = this.page.locator(`//div[@class = "product_name h6 mb-auto"]/following-sibling::div[@class = "mt-3"]"]`)
    itemPrice = this.page.locator(`//span[@class = "product_price ml-1"]`)
    itemPrimaryPrice = this.page.locator(`//span[@class = "product_price ml-1"]/s`)

    itemsCountInput = this.page.locator(`//div[@class = "input-group mt-3"]/input`)
    itemsCountLabel = this.page.locator(`//div[@class = "input-group-append"]/span`)
    itemsCountNumber = this.page.locator(`//div[@class = "input-group-append"]/span/span`)

    addToBasketButton = this.page.locator(`//button[@class = "actionBuyProduct btn btn-primary mt-3"]`)
    addToBasketFullPriceItemButton = this.page.locator(`//div[@class = "note-item card h-100"]//button[@class = "actionBuyProduct btn btn-primary mt-3"]`)
    addToBasketDiscountItemButton = this.page.locator(`//div[@class = "note-item card h-100 hasDiscount"]//button[@class = "actionBuyProduct btn btn-primary mt-3"]`)

    //Page counter
    pageNumberLink = this.page.locator(`//a[@class = "page-link"]`)

    //Support block
    supportFormLabel = this.page.locator(`//div[@class = "h3 text-center"]`)

    supportNameLabel = this.page.locator(`//label[@for = "inputName"]`)
    supportInputName = this.page.locator(`//input[@id = "inputName"]`)

    supportEmailLabel = this.page.locator(`//label[@for = "inputEmail"]`)
    supportInputEmail = this.page.locator(`//input[@id = "inputEmail"]`)

    supportMessageLabel = this.page.locator(`//label[@for = "inputMessage"]`)
    supportInputMessage = this.page.locator(`//textarea[@id = "inputMessage"]`)
    sendSupportMessageButton = this.page.locator(`//form[@class = "support-form submit-validation keyup-validation"]/button[@class= "btn btn-primary"]`)

    async clearBasket() {
        await this.page.goto('https://enotes.pointschool.ru')
        await this.page.waitForTimeout(1000)
        const items = await this.basketItems.textContent()
        if (await items == 0) {}
        else if(await items == "9"){
            await this.page.locator(`//div[@data-product = "4"]//button[@class = "actionBuyProduct btn btn-primary mt-3"]`).click()
            await this.page.waitForTimeout(1000)
            await this.basketButton.click()
            await this.clearBasketButton.click()
        }
        else if (await items > 0) {
            await this.basketButton.click()
            await this.clearBasketButton.click()
        }
        
    }

    async goToItemsPage(pageNumber){
        await this.page.locator(`//a[@data-page-number = "${pageNumber}"]`).click()
    }

    async findItemByName(itemName) {
        await searchByNameInput.fill(itemName)
        await searchByNameButton.click()
    }

    async getDiscountItemsIds(){

        let idArray = []
        const ids = await this.page.locator(`//div[@class = "note-item card h-100 hasDiscount"]`)
        const count = await ids.count()

        for(let i = 0; i< count; i++){
            let id = await ids.nth(i).getAttribute("data-product")
            idArray.push(id)
        }
        return idArray
    }

    async getFullPriceItemsIds(){

        let idArray = []
        const ids = await this.page.locator(`//div[@class = "note-item card h-100"]`)
        const count = await ids.count()

        for(let i = 0; i< count; i++){
            let id = await ids.nth(i).getAttribute("data-product")
            idArray.push(id)
        }
        return idArray
    }

    async getRandomDiscountId(){
        let ids = await this.getDiscountItemsIds()
        const random = ids[(Math.floor(Math.random()*ids.length))]
        return random
    }

    async getRandomFullPriceId(){
        let ids = await this.getFullPriceItemsIds()
        const random = ids[(Math.floor(Math.random()*ids.length))]
        return random
    }

    async addItemsById(...id) {
        let data = []
        let totalPrice = 0
        let itemLocators = id.map(el => `//div[@data-product = "${el}"]`)
        let buttonLocators = itemLocators.map(el => this.page.locator(el + `//button[@class = "actionBuyProduct btn btn-primary mt-3"]`))

        for (let i = 0; i < itemLocators.length; i++) {
            let itemData = {}
            itemData.id = id[i]
            itemData.name = await this.page.locator(itemLocators[i] + `//div[@class = "product_name h6 mb-auto"]`).textContent()
            let price = await this.page.locator(itemLocators[i] + `//span[@class = "product_price ml-1"]`).textContent()
            itemData.price = await price.match(/^[0-9 ]\S+/)
            itemData.image = await this.page.locator(itemLocators[i] + `//img[@class = "product_poster"]`).getAttribute('src')
            itemData.count = 1

            let counter = 0
            for (let dataItem of data) {

                if (dataItem.name == await itemData.name) { dataItem.count += 1; counter += 1 }
            }
            if (counter == 0) { data.push(itemData) }
        }
        //Total basket price
        for(let price of data){
            totalPrice += await price.price * price.count 
        }
        data.push(String(totalPrice))

        // click each item-button
        for(let button of buttonLocators){
            await button.click()
            await this.page.waitForTimeout(100)
        }
        
        // return array of added to basket objects [{id, name, price, image, count}, totalPrice] 
        return data
    }
}
