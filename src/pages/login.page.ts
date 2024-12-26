import { Page } from '@playwright/test'
import { removeSlashUrl } from '../utils'
import { loginLocator } from '../enum/locator.enum'

export class LoginPage {
  private page: Page
  loginPageUrl = 'https://www.saucedemo.com'

  constructor(page: Page) {
    this.page = page
  }

  async goto(): Promise<void> {
    await this.page.goto(this.loginPageUrl)
  }

  async fillUserNameAndPassword(username: string, password: string): Promise<void> {
    await this.page.locator(loginLocator.username).fill(username)
    await this.page.locator(loginLocator.password).fill(password)
  }

  async clickLogin(): Promise<void> {
    await this.page.click(loginLocator.loginBtn)
  }

  async getUsername(): Promise<string> {
    return await this.page.locator(loginLocator.username).inputValue()
  }

  async getUserPassword(): Promise<string> {
    return await this.page.locator(loginLocator.password).inputValue()
  }

  async getErrorMessage(): Promise<string> {
    try {
      return (await this.page.locator(loginLocator.errorMessage).textContent({ timeout: 1000 })) || ''
    } catch (e) {
      console.error('Failed to retrieve error message:', e)
      return ''
    }
  }


  async isValidUrl(): Promise<boolean> {
    const url = removeSlashUrl(this.page.url())
    return url === this.loginPageUrl
  }
}