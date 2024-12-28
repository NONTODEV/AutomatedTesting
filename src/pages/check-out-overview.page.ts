import { Page } from '@playwright/test'
import { checkOutOverViewLocator } from '../enum/locator.enum'
import { calculateSubTotal, calculateTax, calculateTotal, removeSlashUrl } from '../utils'

export class CheckOutOverViewPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async getPageUrl(): Promise<string> {
    return removeSlashUrl(this.page.url())
  }

  async clickCancel(): Promise<void> {
    await this.page.click(checkOutOverViewLocator.cancelBtn)
  }

  async finishCancel(): Promise<void> {
    await this.page.click(checkOutOverViewLocator.finishBtn)
  }

  async getAmountInventoryItem(): Promise<number> {
    try {
      const product = await this.page.locator(checkOutOverViewLocator.inventoryItem).allTextContents()
      return product.length
    } catch (e) {
      console.error('Error getAmountInventoryItem:', e)
    }
    return
  }

  async getInventoryProductNames(): Promise<string[]> {
    try {
      return await this.page.locator(checkOutOverViewLocator.inventoryName).allTextContents() || []
    } catch (e) {
      console.error('Error getInventoryProductNames:', e)
    }
    return []
  }

  async getSubTotal(): Promise<number> {
    try {
      const subTotalText = await this.page.locator(checkOutOverViewLocator.subTotal).textContent({ timeout: 1000 })
      return parseFloat(subTotalText.replace('Item total: $', '').trim())
    } catch (e) {
      console.error('Error getSubTotal:', e)
    }
    return
  }

  async getTax(): Promise<number> {
    try {
      const taxText = await this.page.locator(checkOutOverViewLocator.tax).textContent({ timeout: 1000 })
      return parseFloat(taxText.replace('Tax: $', '').trim())
    } catch (e) {
      console.error('Error getSubTotal:', e)
    }
    return
  }

  async getTotal(): Promise<number> {
    try {
      const totalText = await this.page.locator(checkOutOverViewLocator.total).textContent({ timeout: 1000 })
      return parseFloat(totalText.replace('Total: $', '').trim())
    } catch (e) {
      console.error('Error getTotal:', e)
    }
    return
  }

  async getInventoryProductPrice(): Promise<number[]> {
    try {
      const prices = await this.page.locator(checkOutOverViewLocator.inventoryPrice).allTextContents() || []
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

  async calculateSubTotalPrice(): Promise<number> {
    try {
      const prices = await this.getInventoryProductPrice()
      return calculateSubTotal(prices)
    } catch (e) {
      console.error('Error calculateSubTotalPrice:', e)
    }
    return 0
  }

  async calculateTaxAmount(): Promise<number> {
    try {
      const subTotal = await this.calculateSubTotalPrice()
      return calculateTax(subTotal)
    } catch (e) {
      console.error('Error calculateTaxAmount:', e)
    }
    return 0
  }

  async calculateTotalPrice(): Promise<number> {
    try {
      const subTotal = await this.calculateSubTotalPrice()
      const tax = await this.calculateTaxAmount()
      return calculateTotal(subTotal, tax)
    } catch (e) {
      console.error('Error calculateTotalPrice:', e)
    }
    return 0
  }

  async isValidUrl(expectedUrl: string): Promise<boolean> {
    const url = this.page.url()
    return url === expectedUrl
  }
}