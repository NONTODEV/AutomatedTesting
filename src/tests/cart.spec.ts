import { test } from '../pages/page'
import { StandardUser } from '../resources/user'
import { cartTestCaseName } from '../enum/test-case-name.enum'
import { cartLocator, productLocator } from '../enum/locator.enum'
import { expect } from '@playwright/test'

test.beforeEach(async ({ loginPage, productPage }) => {
  //Perform login before each test
  await loginPage.goto()
  await loginPage.fillUserNameAndPassword(StandardUser.username, StandardUser.password)
  await loginPage.clickLogin()

  // Navigate to the product page after logging in
  await productPage.goto()

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

test(cartTestCaseName.TC013, async ({ productPage, cartPage }) => {

  const amountProductInCart = await productPage.getAmountCart()
  const amountInventoryItem = await cartPage.getAmountInventoryItem()

  expect(amountProductInCart).toEqual(amountInventoryItem)
})

test(cartTestCaseName.TC014, async ({ productPage, cartPage }) => {

  const products = await productPage.getProducts()
  const inventoryItem = await cartPage.getInventoryItem()

  expect(products).toEqual(inventoryItem)
})

test(cartTestCaseName.TC015, async ({ cartPage }) => {
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

test(cartTestCaseName.TC016, async ({ productPage, cartPage }) => {
  await cartPage.clickContinueShoppingBtn()
  expect(await cartPage.isValidUrl(productPage.productPageUrl)).toBe(true)
})

test(cartTestCaseName.TC017, async ({ cartPage, checkOutInformationPage }) => {
  await cartPage.clickCheckOutBtn()
  expect(await cartPage.isValidUrl(checkOutInformationPage.checkOutInformationPageUrl)).toBe(true)
})
