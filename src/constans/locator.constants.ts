export enum loginLocator {
  username = '#user-name',
  password = '#password',
  loginBtn = '#login-button',
  errorMessage = '[data-test="error"]',
}

export enum productLocator {
  addBackpack = '#add-to-cart-sauce-labs-backpack',
  addBikeLight = '#add-to-cart-sauce-labs-bike-light',
  addTShirt = '#add-to-cart-sauce-labs-bolt-t-shirt',
  removeBackpack = '#remove-sauce-labs-backpack',
  removeBikeLight = '#remove-sauce-labs-bike-light',
  removeTShirt = '#remove-sauce-labs-bolt-t-shirt',
  cartAmount = '[data-test="shopping-cart-link"]',
  getProductName = '[data-test="inventory-item-name"]',
  getProductPrice = '[data-test="inventory-item-price"]',
  sortProductBtn = '[data-test="product-sort-container"]',
  cartBtn = '[data-test="shopping-cart-link"]',
}

export enum sortProduct {
  nameAZ = 'az',
  nameZA = 'za',
  priceLH = 'lohi',
  priceHL = 'hilo'
}