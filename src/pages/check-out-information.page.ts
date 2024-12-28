import { Page } from '@playwright/test'
import { checkOutInformationLocator } from '../enum/locator.enum'
import { removeSlashUrl } from '../utils'

export class CheckOutInformationPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async getPageUrl(): Promise<string> {
    return removeSlashUrl(this.page.url())
  }

  async clickCancelBtn(): Promise<void> {
    await this.page.click(checkOutInformationLocator.cancelBtn)
  }

  async clickContinueBtn(): Promise<void> {
    await this.page.click(checkOutInformationLocator.continueBtn)
  }

  async fillInformation(firstname: string, lastname: string, postalCode: string): Promise<void> {
    await this.page.locator(checkOutInformationLocator.firstname).fill(firstname)
    await this.page.locator(checkOutInformationLocator.lastname).fill(lastname)
    await this.page.locator(checkOutInformationLocator.postalCode).fill(postalCode)
  }

  async getErrorMessage(): Promise<string> {
    try {
      return (await this.page.locator(checkOutInformationLocator.errorMessage).textContent({ timeout: 1000 })) || ''
    } catch (e) {
      console.error('Failed to retrieve error message:', e)
      return ''
    }
  }

  async isValidUrl(expectedUrl: string): Promise<boolean> {
    const url = this.page.url()
    return url === expectedUrl
  }
}