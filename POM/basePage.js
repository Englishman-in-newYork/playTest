
export class BasePage {

    constructor(page, request){
        this.request = request
        this.page = page
        this.brandLink = this.page.locator(`a[class= "navbar-brand"]`)
    }

}