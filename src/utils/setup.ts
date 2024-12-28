import { StandardUser } from '../resources/user'
import { LoginPage } from '../pages/login.page'
import { ProductPage } from '../pages/product.page'

export const setupTest = async (
  loginPage: LoginPage,
  productPage: ProductPage,
): Promise<void> => {
  await loginPage.goto()
  await loginPage.fillUserNameAndPassword(StandardUser.username, StandardUser.password)
  await loginPage.clickLogin()
  await productPage.goto()
}

