import { test } from '../pages/page'
import { EmptyInfo, userInformation } from '../resources/user'
import { expect } from '@playwright/test'
import { isValidUrl } from '../utils'
import { setupTest } from '../utils/setup'
import { productLocator } from '../enum/locator.enum'
import { cartPageUrl, checkOutInformationPageUrl, checkOutOverViewPageUrl } from '../constants/url.constants'
import { firstNameRequired, lastNameRequired, postalCodeRequired } from '../constants/error.constants'

test.beforeEach(async ({ loginPage, productPage, cartPage }) => {
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
})

test('TC-018 = When clicking "Cancel", should navigate back to the cart page', async ({ checkOutInformationPage }) => {
  await checkOutInformationPage.clickCancelBtn()
  expect(await isValidUrl(await checkOutInformationPage.getPageUrl(), cartPageUrl)).toBe(true)
})

test('TC-019 = When clicking "Continue" without any client information, should display an error message', async ({ checkOutInformationPage }) => {
  await checkOutInformationPage.fillInformation(EmptyInfo, EmptyInfo, EmptyInfo)
  await checkOutInformationPage.clickContinueBtn()

  const message = await checkOutInformationPage.getErrorMessage()

  expect(message).toContain(firstNameRequired)
  expect(await isValidUrl(await checkOutInformationPage.getPageUrl(), checkOutInformationPageUrl)).toBe(true)
})

test('TC-020 = When clicking "Continue" with some client information, should display an error message', async ({ checkOutInformationPage }) => {
  //test fill firstname only
  await checkOutInformationPage.fillInformation(userInformation.firstName, EmptyInfo, EmptyInfo)
  await checkOutInformationPage.clickContinueBtn()

  //should throw message error Last Name is required
  expect(await checkOutInformationPage.getErrorMessage()).toContain(lastNameRequired)

  //test fill firstname and lastname
  await checkOutInformationPage.fillInformation(userInformation.firstName, userInformation.lastName, EmptyInfo)
  await checkOutInformationPage.clickContinueBtn()

  //should throw message error Postal Code is required
  expect(await checkOutInformationPage.getErrorMessage()).toContain(postalCodeRequired)

  expect(await isValidUrl(await checkOutInformationPage.getPageUrl(), checkOutInformationPageUrl)).toBe(true)
})

test('TC-021 = When clicking "Continue" with all client information, should proceed to the checkout overview page', async ({ checkOutInformationPage }) => {
  await checkOutInformationPage.fillInformation(
    userInformation.firstName,
    userInformation.lastName,
    userInformation.postalCode,
  )
  await checkOutInformationPage.clickContinueBtn()
  expect(await isValidUrl(await checkOutInformationPage.getPageUrl(), checkOutOverViewPageUrl)).toBe(true)
})
