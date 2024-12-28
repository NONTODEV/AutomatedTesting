import { Page } from '@playwright/test'
import { checkOutCompleteLocator } from '../enum/locator.enum'
import { removeSlashUrl } from '../utils'

export class CheckOutCompletePage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async getPageUrl(): Promise<string> {
    return removeSlashUrl(this.page.url())
  }

  async clickBackToHomePage(): Promise<void> {
    await this.page.click(checkOutCompleteLocator.backToHomePageBtn)
  }

  async getMessage(): Promise<string> {
    try {
      return (await this.page.locator(checkOutCompleteLocator.completeMessage).textContent({ timeout: 1000 })) || ''
    } catch (e) {
      console.error('Error: getMessage:', e)
      return ''
    }
  }
}