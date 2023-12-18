import { WelcomePageHeader } from "./welcomePageHeader";

export class LoginPage extends WelcomePageHeader {

    constructor(page){
        super(page)
    }
    //Css locators
    loginLabel = this.page.locator(`div[class = "site-login"] h1`)
    loginHelper = this.page.locator(`div[class = "site-login"] p`)

    loginFieldLabel = this.page.locator(`label[for = "loginform-username"]`)
    loginInputField = this.page.locator(`input[id = "loginform-username"]`)

    passwordFieldLabel = this.page.locator(`label[for = "loginform-password"]`)
    passwordInputField = this.page.locator(`input[id = "loginform-password"]`)

    incorrectLogin = this.page.locator(`div[class = "form-group field-loginform-username required has-error"] div[class = "invalid-feedback"]`)
    incorrectPassword = this.page.locator(`div[class = "form-group field-loginform-password required has-error"] div[class = "invalid-feedback"]`)

    invalidDataLabel = this.page.locator(`div[class = "form-group field-loginform-password required has-error"] div[class = "error-password-feedback mt-4"]`)

    rememberMeLabel = this.page.locator(`label[for = "loginform-rememberme"]`)
    rememberMeCheckBox = this.page.locator(`input[type = "checkbox"]`)

    loginButton = this.page.locator(`button[type = "submit"]`)

    async loginUser(login, password){
        await this.loginInputField.type(login)
        await this.passwordInputField.type(password)
        await this.page.waitForTimeout(100)
        await this.loginButton.click()
    }

}