import { test } from '../pages/page'
import { expect } from '@playwright/test'
import { productLocator, sortProduct } from '../enum/locator.enum'
import { isValidUrl, sortNames, sortPrices } from '../utils'
import { setupTest } from '../utils/setup'
import { cartPageUrl } from '../constants/url.constants'

test.beforeEach(async ({ loginPage, productPage }) => {
  //Login and navigate to product page
  await setupTest(loginPage, productPage)
})

test('TC-007 = Adding all available products to the cart and then removing them, verifying that the cart updates correctly', async ({ productPage }) => {
  // test function add products
  const productsToAdd = [
    productLocator.addBackpack,
    productLocator.addBikeLight,
    productLocator.addTShirt,
  ]
  await productPage.clickAddOrRemoveProducts(productsToAdd)
  const addProductInCart = await productPage.getCart()

  expect(addProductInCart).toContain('3') // check has 3 products in carts

  // test function remove products
  const productsToRemove = [
    productLocator.removeBackpack,
    productLocator.removeBikeLight,
  ]
  await productPage.clickAddOrRemoveProducts(productsToRemove)
  const removeProductInCart = await productPage.getCart()

  expect(removeProductInCart).toContain('1') //  check has 1 product in carts
})

test('TC-008 = Product should correctly sorts items from A to Z', async ({ productPage }) => {
  await productPage.sortProduct(sortProduct.nameAZ)
  const productNames = await productPage.getProductNames()

  const sortedNames = sortNames(productNames, sortProduct.nameAZ)

  expect(productNames).toEqual(sortedNames)
})

test('TC-009 = Product should correctly sorts items from Z to A', async ({ productPage }) => {
  await productPage.sortProduct(sortProduct.nameZA)
  const productNames = await productPage.getProductNames()

  const sortedNames = sortNames(productNames, sortProduct.nameZA)

  expect(productNames).toEqual(sortedNames)
})

test('TC-010 = Product should correctly sorts items from price low to high', async ({ productPage }) => {
  await productPage.sortProduct(sortProduct.priceLH)
  const productPrice = await productPage.getProductPrice()

  const sortedPrice = sortPrices(productPrice, sortProduct.priceLH)

  expect(productPrice).toEqual(sortedPrice)
})

test('TC-011 = Product should correctly sorts items from price high to low', async ({ productPage }) => {
  await productPage.sortProduct(sortProduct.priceHL)
  const productPrice = await productPage.getProductPrice()

  const sortedPrice = sortPrices(productPrice, sortProduct.priceHL)

  expect(productPrice).toEqual(sortedPrice)
})

test('TC-012 = Should navigate to the cart page when clicking the cart icon', async ({ productPage }) => {
  await productPage.clickCart()

  const currentUrl = await productPage.getPageUrl()

  expect(await isValidUrl(currentUrl, cartPageUrl)).toBe(true)
})
