import {Page} from "@playwright/test";
import {loginLocator} from "../constans/test-case-name.constants";
import {removeSlashUrl} from "../utils";

export class LoginPage {
    private page: Page
    loginPageUrl = 'https://www.saucedemo.com'

    constructor(page: Page) {
        this.page = page
    }

    async goto() {
        await this.page.goto(this.loginPageUrl)
    }

    async fillUserNameAndPassword(username: string, password: string) {
        await this.page.locator(loginLocator.username).fill(username);
        await this.page.locator(loginLocator.password).fill(password);
    }

    async clickLogin() {
        await this.page.click(loginLocator.loginBtn);
    }

    async getUsername() {
       return  await this.page.locator(loginLocator.username).inputValue();
    }

    async getUserPassword() {
       return  await this.page.locator(loginLocator.password).inputValue();
    }

    async getErrorMessage() {
        try {
            return  await this.page.locator(loginLocator.errorMessage).textContent({ timeout: 1000 }) || "";
        } catch (e) {}
        return ""
    }

    isValidUrl() {
        const url = removeSlashUrl(this.page.url())
        return url === this.loginPageUrl
    }
}