import { test } from '../pages/page'
import { cartLocator, productLocator } from '../enum/locator.enum'
import { expect } from '@playwright/test'
import { PageURL } from '../enum/url.enum'
import { isValidUrl } from '../utils'
import { setupTest } from '../utils/setup'

test.beforeEach(async ({ loginPage, productPage }) => {
  //Login and navigate to product page
  await setupTest(loginPage, productPage)

  //Add product to cart
  const productsToAdd = [
    productLocator.addBackpack,
    productLocator.addBikeLight,
    productLocator.addTShirt,
    productLocator.addSauceLabsOnesie,
  ]

  await productPage.clickAddOrRemoveProducts(productsToAdd)
  await productPage.clickCart()
})

test('TC-013 = The cart badge should displays the correct number of items currently in the cart', async ({ productPage, cartPage }) => {

  const amountProductInCart = await productPage.getAmountCart()
  const amountInventoryItem = await cartPage.getAmountInventoryItem()

  expect(amountProductInCart).toEqual(amountInventoryItem)
})

test('TC-014 = The item name and price in the cart should match the selection from the product page', async ({ productPage, cartPage }) => {

  const products = await productPage.getProducts()
  const inventoryItem = await cartPage.getInventoryItem()

  expect(products).toEqual(inventoryItem)
})

test('TC-015 = Should remove the selected item from the cart and update the cart badge', async ({ cartPage }) => {
  const getInventoryItem = await cartPage.getInventoryItem()

  const removeProductsInventoryItem = [
    cartLocator.removeBackpackInventory,
    cartLocator.removeBikeLightInventory,
  ]
  await cartPage.clickRemoveProducts(removeProductsInventoryItem)

  const inventoryItems = await cartPage.getInventoryItem()
  const amountInventoryItem = await cartPage.getAmountInventoryItem()

  const expectInventoryItems = ([
    { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
    { name: 'Sauce Labs Onesie', price: 7.99 },
  ])

  expect(amountInventoryItem).not.toEqual(getInventoryItem)
  expect(inventoryItems).toEqual(expectInventoryItems)
  expect(amountInventoryItem).toBe(2)
})

test('TC-016 = When clicking "Continue Shopping", should navigates back to the product page', async ({ cartPage }) => {
  await cartPage.clickContinueShoppingBtn()
  expect(await isValidUrl(await cartPage.getPageUrl(), PageURL.productPageUrl)).toBe(true)
})

test('TC-017 = When clicking "Checkout", should proceed to the checkout information page', async ({ cartPage }) => {
  await cartPage.clickCheckOutBtn()
  expect(await isValidUrl(await cartPage.getPageUrl(), PageURL.checkOutInformationPageUrl)).toBe(true)
})
