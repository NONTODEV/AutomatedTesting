import { test } from '../pages/page'
import { expect } from '@playwright/test'
import { isValidUrl } from '../utils'
import { setupTest } from '../utils/setup'
import { productLocator } from '../enum/locator.enum'
import { userInformation } from '../resources/user'
import { checkOutCompletePageUrl, productPageUrl } from '../constants/url.constants'

test.beforeEach(async ({ loginPage, productPage, cartPage, checkOutInformationPage }) => {
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
  await cartPage.clickCheckOutBtn()

  await checkOutInformationPage.fillInformation(
    userInformation.firstName,
    userInformation.lastName,
    userInformation.postalCode,
  )
  await checkOutInformationPage.clickContinueBtn()
})

test('TC-022 = The cart badge should displays the correct number of items currently in the cart',
  async ({ cartPage, checkOutOverViewPage }) => {
    const getCartInventoryItem = await cartPage.getAmountInventoryItem()
    const getOverViewInventoryItem = await checkOutOverViewPage.getAmountInventoryItem()

    expect(getCartInventoryItem).toEqual(getOverViewInventoryItem)
  })

test('TC-023 = The item name and price in the cart should match the selection from the product page',
  async ({ cartPage, checkOutOverViewPage }) => {
    const getCartInventoryItem = await cartPage.getInventoryItem()
    const getOverViewInventoryItem = await checkOutOverViewPage.getInventoryItem()

    const expectInventoryItems = ([
      { name: 'Sauce Labs Backpack', price: 29.99 },
      { name: 'Sauce Labs Bike Light', price: 9.99 },
      { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
      { name: 'Sauce Labs Onesie', price: 7.99 },
    ])

    expect(getOverViewInventoryItem).toEqual(expectInventoryItems)
    expect(getOverViewInventoryItem).toEqual(getCartInventoryItem)
  })

test('TC-024 = Should correctly calculate the total, tax, and grand total', async ({ checkOutOverViewPage }) => {
  ///get Price Total
  const getSubTotalPrice = await checkOutOverViewPage.getSubTotal()
  const getTax = await checkOutOverViewPage.getTax()
  const getTotal = await checkOutOverViewPage.getTotal()

  //calculate Price Total
  const subTotalPrice = await checkOutOverViewPage.calculateSubTotalPrice()
  const texPrice = await checkOutOverViewPage.calculateTaxAmount()
  const totalPrice = await checkOutOverViewPage.calculateTotalPrice()

  expect(getSubTotalPrice).toEqual(subTotalPrice)
  expect(getTax).toEqual(texPrice)
  expect(getTotal).toEqual(totalPrice)
})

test('TC-025 = When clicking "Cancel", should navigate back to the product page', async ({ checkOutOverViewPage }) => {
  await checkOutOverViewPage.clickCancel()

  expect(await isValidUrl(await checkOutOverViewPage.getPageUrl(), productPageUrl)).toBe(true)
})

test('TC-026 = When clicking "Finish", should process to the checkout complete page', async ({ checkOutOverViewPage }) => {
  await checkOutOverViewPage.finishCancel()

  expect(await isValidUrl(await checkOutOverViewPage.getPageUrl(), checkOutCompletePageUrl)).toBe(true)
})