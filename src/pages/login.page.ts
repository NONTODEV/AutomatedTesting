import { Page } from '@playwright/test'
import { loginLocator } from '../enum/locator.enum'
import { PageURL } from '../enum/url.enum'
import { removeSlashUrl } from '../utils'

export class LoginPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async getPageUrl(): Promise<string> {
    return removeSlashUrl(this.page.url())
  }

  async goto(): Promise<void> {
    await this.page.goto(PageURL.loginPageUrl)
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
}