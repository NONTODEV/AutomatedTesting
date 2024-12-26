import { Page } from '@playwright/test'

export class CheckOutInformationPage {
  private page: Page
  checkOutInformationPageUrl = 'https://www.saucedemo.com/checkout-step-one.html'

  constructor(page: Page) {
    this.page = page
  }

  async gotoCheckOutInformationPage(): Promise<void> {
    await this.page.goto(this.checkOutInformationPageUrl)
  }
}