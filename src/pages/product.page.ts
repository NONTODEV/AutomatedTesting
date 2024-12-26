import { Page } from '@playwright/test'
import { productLocator, sortProduct } from '../constans/locator.constants'

export class ProductPage {
  private page: Page
  productPageUrl = 'https://www.saucedemo.com/inventory.html'

  constructor(page: Page) {
    this.page = page
  }

  async goto(): Promise<void> {
    await this.page.goto(this.productPageUrl)
  }

  async clickAddOrRemoveProducts(products: string[]) {
    for (const productLocator of products) {
      await this.page.click(productLocator)
    }
  }

  async clickCart(): Promise<void> {
    await this.page.click(productLocator.cartBtn)
  }

  async getProductNames(): Promise<string[]> {
    try {
      return await this.page.locator(productLocator.getProductName).allTextContents() || []
    } catch (e) {
      console.error('Error fetching product names:', e)
    }
    return []
  }

  async getProductPrice(): Promise<number[]> {
    try {
      const prices = await this.page.locator(productLocator.getProductPrice).allTextContents() || []
      return prices.map(price => parseFloat(price.replace('$', '')))
    } catch (e) {
      console.error('Error fetching product prices:', e)
    }
    return []
  }

  async getCart(): Promise<string> {
    try {
      return await this.page.locator(productLocator.cartAmount).textContent({ timeout: 1000 })
    } catch (e) {
      console.error('Error getCart:', e)
    }
    return ''
  }

  async sortProduct(option: sortProduct): Promise<string[]> {
    try {
      return await this.page.locator(productLocator.sortProductBtn).selectOption(option)
    } catch (e) {
      console.error('Error sortProduct:', e)
    }
    return []
  }

  async isValidUrl(expectedUrl: string): Promise<boolean> {
    const url = this.page.url()
    return url === expectedUrl
  }
}