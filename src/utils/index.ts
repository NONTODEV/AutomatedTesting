import { sortProduct } from '../enum/locator.enum'
import { PageURL } from '../enum/url.enum'

export const removeSlashUrl = (url: string): string => {
  let newURL = url

  if (url[url.length - 1] === '/') {
    newURL = url.substring(0, url.length - 1)
  }

  return newURL
}

export const sortNames = (names: string[], order: sortProduct.nameAZ | sortProduct.nameZA): string[] => {
  return order === sortProduct.nameAZ
    ? [...names].sort((a, z) => a.localeCompare(z))
    : [...names].sort((a, z) => z.localeCompare(a))
}

export const sortPrices = (prices: number[], order: sortProduct.priceLH | sortProduct.priceHL): number[] => {
  return order === sortProduct.priceLH
    ? [...prices].sort((l, h) => l - h)
    : [...prices].sort((l, h) => h - l)
}

export const calculateSubTotal = (prices: number[]): number => {
  return prices.reduce((total, price) => total + price, 0)
}

export const calculateTax = (itemTotal: number, taxRate: number = 0.08): number => {
  return parseFloat((itemTotal * taxRate).toFixed(2))
}

export const calculateTotal = (subTotal: number, tex: number): number => {
  return parseFloat((subTotal + tex).toFixed(2))
}

export const isValidUrl = async (page: string, expectedUrl: string): Promise<boolean> => {
  switch (expectedUrl) {
    case PageURL.loginPageUrl:
      return page === PageURL.loginPageUrl
    case PageURL.productPageUrl:
      return page === PageURL.productPageUrl
    case PageURL.cartPageUrl:
      return page === PageURL.cartPageUrl
    case PageURL.checkOutInformationPageUrl:
      return page === PageURL.checkOutInformationPageUrl
    case PageURL.checkOutOverViewPageUrl:
      return page === PageURL.checkOutOverViewPageUrl
    case PageURL.checkOutCompletePageUrl:
      return page === PageURL.checkOutCompletePageUrl
    default:
      return false
  }
}
