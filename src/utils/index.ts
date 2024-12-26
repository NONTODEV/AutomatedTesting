import { sortProduct } from '../constans/locator.constants'

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
