import { LoginPage } from './login.page'
import { test as base } from '@playwright/test'
import { ProductPage } from './product.page'
import { CartPage } from './cart.page'
import { CheckOutInformationPage } from './check-out-information.page'
import { CheckOutOverViewPage } from './check-out-overview.page'
import { CheckOutCompletePage } from './check-out-complete.page'

type baseFixtures = {
  loginPage: LoginPage,
  productPage: ProductPage,
  cartPage: CartPage,
  checkOutInformationPage: CheckOutInformationPage,
  checkOutOverViewPage: CheckOutOverViewPage,
  checkOutCompletePage: CheckOutCompletePage,
}

export const test = base.extend<baseFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page))
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page))
  },
  checkOutInformationPage: async ({ page }, use) => {
    await use(new CheckOutInformationPage(page))
  },
  checkOutOverViewPage: async ({ page }, use) => {
    await use(new CheckOutOverViewPage(page))
  },
  checkOutCompletePage: async ({ page }, use) => {
    await use(new CheckOutCompletePage(page))
  },
})