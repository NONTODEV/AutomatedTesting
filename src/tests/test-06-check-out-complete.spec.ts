import { test } from '../pages/page'
import { userInformation } from '../resources/user'
import { productLocator } from '../enum/locator.enum'
import { expect } from '@playwright/test'
import { PageURL } from '../enum/url.enum'
import { isValidUrl } from '../utils'
import { setupTest } from '../utils/setup'

test.beforeEach(async ({ loginPage, productPage, cartPage, checkOutInformationPage, checkOutOverViewPage }) => {
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
  await checkOutOverViewPage.finishCancel()
})

test('TC-027 = The cart badge number should be removed', async ({ cartPage }) => {
  const cartBadge = await cartPage.getInventoryItem()

  expect(cartBadge).toEqual([])
  expect(cartBadge).toHaveLength(0)
})

test('TC-028 = Display message', async ({ checkOutCompletePage }) => {
  const message = await checkOutCompletePage.getMessage()

  expect(message).toContain('Thank you for your order!')
})

test('TC-029 = When clicking "Back Home", should navigate back to the product page', async ({ checkOutCompletePage }) => {
  await checkOutCompletePage.clickBackToHomePage()

  expect(await isValidUrl(await checkOutCompletePage.getPageUrl(), PageURL.productPageUrl)).toBe(true)
})