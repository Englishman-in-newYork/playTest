import { BasePage } from "./basePage.js";

export class WelcomePageHeader extends BasePage {

    constructor(page){
        super(page)
    }

    // CSS locators
    mainPageLink = this.page.locator(`ul[class = "navbar-nav ml-auto d-flex align-items-stretch"] a[href= "/"]`)
    registerLink =  this.page.locator(`a[href= "/registration"]`)
    loginLink = this.page.locator(`a[href = "/login"]a[href= "/"]`)

    async goToMainPage(){
        await this.mainPageLink.click()
    }

    async goToRegister(){
        await this.registerLink.click()
    }

    async goToLogin(){
        await this.loginLink.click()
    }
}
