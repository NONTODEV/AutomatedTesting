import { expect } from '@playwright/test'
import { test } from '../pages/page'
import { EmptyInfo, LockedOutUser, StandardUser, userInformation } from '../resources/user'
import { ErrorEnum } from '../enum/error.enum'
import { isValidUrl } from '../utils'
import { PageURL } from '../enum/url.enum'

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto()
})

test('TC-001 = Input fields should display as the data that was filled', async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword(userInformation.username, userInformation.password)

  expect(await loginPage.getUsername()).toBe(userInformation.username)
  expect(await loginPage.getUserPassword()).toBe(userInformation.password)
})

test('TC-002 = Should show an error message if log in without a username', async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword(EmptyInfo, userInformation.username)

  await loginPage.clickLogin()
  const message = await loginPage.getErrorMessage()

  expect(message).toContain(ErrorEnum.usernameRequired)
  expect(await isValidUrl(await loginPage.getPageUrl(), PageURL.loginPageUrl)).toBe(true)
})

test('TC-003 = Should show an error message if log in without a password', async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword(userInformation.username, EmptyInfo)

  await loginPage.clickLogin()
  const message = await loginPage.getErrorMessage()

  expect(message).toContain(ErrorEnum.passwordRequired)
  expect(await isValidUrl(await loginPage.getPageUrl(), PageURL.loginPageUrl)).toBe(true)
})

test('TC-004 = Should show an error message if log in with both fields blank', async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword(EmptyInfo, EmptyInfo)

  await loginPage.clickLogin()
  const message = await loginPage.getErrorMessage()

  expect(message).toContain(ErrorEnum.required)
  expect(await isValidUrl(await loginPage.getPageUrl(), PageURL.loginPageUrl)).toBe(true)
})

test('TC-005 = Should logged in successfully with valid credentials', async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword(StandardUser.username, StandardUser.password)
  await loginPage.clickLogin()

  expect(await isValidUrl(await loginPage.getPageUrl(), PageURL.productPageUrl)).toBe(true)
})

test('TC-006 = Should logged in fails with an error message when using invalid credentials', async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword(LockedOutUser.username, LockedOutUser.password)
  await loginPage.clickLogin()

  const message = await loginPage.getErrorMessage()

  expect(message).toContain(ErrorEnum.userLockedOut)
  expect(await isValidUrl(await loginPage.getPageUrl(), PageURL.loginPageUrl)).toBe(true)
})
