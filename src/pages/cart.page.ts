import { Page } from '@playwright/test'

export class CartPage {
  private page: Page
  cartPageUrl = 'https://www.saucedemo.com/cart.html'

  constructor(page: Page) {
    this.page = page
  }

  async goto():Promise<void> {
    await this.page.goto(this.cartPageUrl)
  }
}