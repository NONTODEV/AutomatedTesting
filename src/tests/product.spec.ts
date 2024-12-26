import { test } from '../pages/page'
import { productTestCaseName } from '../enum/test-case-name.enum'
import { expect } from '@playwright/test'
import { productLocator, sortProduct } from '../enum/locator.enum'
import { StandardUser } from '../resources/user'
import { sortNames, sortPrices } from '../utils'

test.beforeEach(async ({ loginPage, productPage }) => {
  //Perform login before each test
  await loginPage.goto()
  await loginPage.fillUserNameAndPassword(StandardUser.username, StandardUser.password)
  await loginPage.clickLogin()

  // Navigate to the product page after logging in
  await productPage.goto()
})

test(productTestCaseName.TC007, async ({ productPage }) => {
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

test(productTestCaseName.TC008, async ({ productPage }) => {
  await productPage.sortProduct(sortProduct.nameAZ)
  const productNames = await productPage.getProductNames()

  const sortedNames = sortNames(productNames, sortProduct.nameAZ)

  expect(productNames).toEqual(sortedNames)
})

test(productTestCaseName.TC009, async ({ productPage }) => {
  await productPage.sortProduct(sortProduct.nameZA)
  const productNames = await productPage.getProductNames()

  const sortedNames = sortNames(productNames, sortProduct.nameZA)

  expect(productNames).toEqual(sortedNames)
})

test(productTestCaseName.TC010, async ({ productPage }) => {
  await productPage.sortProduct(sortProduct.priceLH)
  const productPrice = await productPage.getProductPrice()

  const sortedPrice = sortPrices(productPrice, sortProduct.priceLH)

  expect(productPrice).toEqual(sortedPrice)
})

test(productTestCaseName.TC011, async ({ productPage }) => {
  await productPage.sortProduct(sortProduct.priceHL)
  const productPrice = await productPage.getProductPrice()

  const sortedPrice = sortPrices(productPrice, sortProduct.priceHL)

  expect(productPrice).toEqual(sortedPrice)
})

test(productTestCaseName.TC012, async ({ productPage ,cartPage}) => {
  await productPage.clickCart()
  expect(await productPage.isValidUrl(cartPage.cartPageUrl)).toBe(true)
})
