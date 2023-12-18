import { WelcomePageHeader } from "./welcomePageHeader";

class RegisterPage extends WelcomePageHeader {

    constructor(page){
        super(page)
    }

    signUpLabel = this.page.locator(`div[class = "site-signup"] h1`)
    signUpHelper = this.page.locator(`div[class = "site-signup"] p`)

    loginFieldLabel = this.page.locator(`label[for = "inputName"]`)
    loginInputField = this.page.locator(`input[id = "inputName"]`)

    emailFieldLabel = this.page.locator(`label[for = "inputEmail"]`)
    emailInputField = this.page.locator(`input[id = "inputEmail"]`)

    passwordFieldLabel = this.page.locator(`label[for = "inputPassword"]`)
    passwordInputField = this.page.locator(`input[id = "inputPassword"]`)

    incorrectLogin = this.page.locator(`//label[@for = "inputName"]/following-sibling::div`)
    incorrectEmail = this.page.locator(`//label[@for = "inputEmail"]/following-sibling::div`)
    incorrectPassword = this.page.locator(`//label[@for = "inputPassword"]/following-sibling::div`)

    registerButton = this.page.locator(`button[type = 'submit']`)

    async registerNewUser(login, email, password){
        await this.loginInputField.fill(login)
        await this.emailInputField.fill(email)
        await this.passwordInputField.fill(password)
        await this.registerButton.click()
    }

}