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
  addSauceLabsOnesie = '#add-to-cart-sauce-labs-onesie',
  removeBackpack = '#remove-sauce-labs-backpack',
  removeBikeLight = '#remove-sauce-labs-bike-light',
  removeTShirt = '#remove-sauce-labs-bolt-t-shirt',
  cartAmount = '[data-test="shopping-cart-link"]',
  getProductName = '[data-test="inventory-item-name"]',
  getProductPrice = '[data-test="inventory-item-price"]',
  sortProductBtn = '[data-test="product-sort-container"]',
  cartBtn = '[data-test="shopping-cart-link"]',
}

export enum cartLocator {
  inventoryItem = '[data-test="inventory-item"]',
  inventoryName = '[data-test="inventory-item-name"]',
  inventoryPrice = '[data-test="inventory-item-price"]',
  removeBackpackInventory = '[data-test="remove-sauce-labs-backpack"]',
  removeBikeLightInventory = '[data-test="remove-sauce-labs-bike-light"]',
  continueShoppingBtn = '[data-test="continue-shopping"]',
  checkOutBtn = '[data-test="checkout"]',
}

export enum checkOutInformationLocator {
  cancelBtn = '[data-test="cancel"]',
  continueBtn = '[data-test="continue"]',
  errorMessage = '[data-test="error"]',
  firstname = '#first-name',
  lastname = '#last-name',
  postalCode = '#postal-code',
}

export enum checkOutOverViewLocator {
  inventoryItem = '[data-test="inventory-item"]',
  inventoryName = '[data-test="inventory-item-name"]',
  inventoryPrice = '[data-test="inventory-item-price"]',
  subTotal = '[data-test="subtotal-label"]',
  tax = '[data-test="tax-label"]',
  total = '[data-test="total-label"]',
  cancelBtn = '[data-test="cancel"]',
  finishBtn = '[data-test="finish"]',
}

export enum checkOutCompleteLocator {
  completeMessage = '[data-test="complete-header"]',
  backToHomePageBtn = '[data-test="back-to-products"]',
}

export enum sortProduct {
  nameAZ = 'az',
  nameZA = 'za',
  priceLH = 'lohi',
  priceHL = 'hilo'
}