import { Page } from '@playwright/test'
import { cartLocator } from '../enum/locator.enum'

export class CartPage {
  private page: Page
  cartPageUrl = 'https://www.saucedemo.com/cart.html'

  constructor(page: Page) {
    this.page = page
  }

  async goto(): Promise<void> {
    await this.page.goto(this.cartPageUrl)
  }

  async getAmountInventoryItem(): Promise<number> {
    try {
      const product = await this.page.locator(cartLocator.inventoryItem).allTextContents()
      return product.length
    } catch (e) {
      console.error('Error getAmountInventoryItem:', e)
    }
    return
  }

  async getInventoryProductNames(): Promise<string[]> {
    try {
      return await this.page.locator(cartLocator.inventoryName).allTextContents() || []
    } catch (e) {
      console.error('Error getInventoryProductNames:', e)
    }
    return []
  }

  async getInventoryProductPrice(): Promise<number[]> {
    try {
      const prices = await this.page.locator(cartLocator.inventoryPrice).allTextContents() || []
      return prices.map(price => parseFloat(price.replace('$', '')))
    } catch (e) {
      console.error('Error getInventoryProductPrice:', e)
    }
    return []
  }

  async getInventoryItem(): Promise<{ name: string; price: number }[]> {
    try {
      const names = await this.getInventoryProductNames()
      const prices = await this.getInventoryProductPrice()
      return names.map((name, index) => ({
        name: name.trim(),
        price: prices[index],
      }))
    } catch (e) {
      console.error('Error getInventoryItem:', e)
    }
    return []
  }

  async clickRemoveProducts(products: string[]): Promise<void> {
    for (const removeProducts of products) {
      await this.page.click(removeProducts)
    }
  }

  async clickContinueShoppingBtn(): Promise<void> {
    await this.page.click(cartLocator.continueShoppingBtn)
  }

  async clickCheckOutBtn(): Promise<void> {
    await this.page.click(cartLocator.checkOutBtn)
  }

  async isValidUrl(expectedUrl: string): Promise<boolean> {
    const url = this.page.url()
    return url === expectedUrl
  }
}