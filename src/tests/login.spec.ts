import { expect } from '@playwright/test'
import { loginTestCaseName } from '../enum/test-case-name.enum'
import { test } from '../pages/page'
import { LockedOutUser, StandardUser } from '../resources/user'

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto()
})

test(loginTestCaseName.TC001, async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword('username', 'password')

  expect(await loginPage.getUsername()).toBe('username')
  expect(await loginPage.getUserPassword()).toBe('password')
})

test(loginTestCaseName.TC002, async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword('', 'password')

  await loginPage.clickLogin()
  const message = await loginPage.getErrorMessage()

  expect(message).toContain('Username is required')
  expect(await loginPage.isValidUrl()).toBe(true)
})

test(loginTestCaseName.TC003, async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword('username', '')

  await loginPage.clickLogin()
  const message = await loginPage.getErrorMessage()

  expect(message).toContain('Password is required')
  expect(await loginPage.isValidUrl()).toBe(true)
})

test(loginTestCaseName.TC004, async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword('', '')

  await loginPage.clickLogin()
  const message = await loginPage.getErrorMessage()

  expect(message).toContain('is required')
  expect(await loginPage.isValidUrl()).toBe(true)
})

test(loginTestCaseName.TC005, async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword(StandardUser.username, StandardUser.password)
  await loginPage.clickLogin()

  expect(await loginPage.isValidUrl()).toBe(false)
})

test(loginTestCaseName.TC006, async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword(LockedOutUser.username, LockedOutUser.password)
  await loginPage.clickLogin()

  const message = await loginPage.getErrorMessage()

  expect(message).toContain('this user has been locked out.')
  expect(await loginPage.isValidUrl()).toBe(true)
})
