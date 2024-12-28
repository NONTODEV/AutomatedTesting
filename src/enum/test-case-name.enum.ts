export enum loginTestCaseName {
  TC001 = 'TC-001 = Input fields should display as the data that was filled',
  TC002 = 'TC-002 = Should show an error message if log in without a username',
  TC003 = 'TC-003 = Should show an error message if log in without a password',
  TC004 = 'TC-004 = Should show an error message if log in with both fields blank',
  TC005 = 'TC-005 = Should logged in successfully with valid credentials',
  TC006 = 'TC-006 = Should logged in fails with an error message when using invalid credentials'
}

export enum productTestCaseName {
  TC007 = 'TC-007 = Adding all available products to the cart and then removing them, verifying that the cart updates correctly',
  TC008 = 'TC-008 = Product should correctly sorts items from A to Z',
  TC009 = 'TC-009 = Product should correctly sorts items from Z to A',
  TC010 = 'TC-010 = Product should correctly sorts items from price low to high',
  TC011 = 'TC-011 = Product should correctly sorts items from price high to low',
  TC012 = 'TC-012 = Should navigate to the cart page when clicking the cart icon'
}

export enum cartTestCaseName {
  TC013 = 'TC-013 = The cart badge should displays the correct number of items currently in the cart',
  TC014 = 'TC-014 = The item name and price in the cart should match the selection from the product page',
  TC015 = 'TC-015 = Should remove the selected item from the cart and update the cart badge',
  TC016 = 'TC-016 = When clicking "Continue Shopping", should navigates back to the product page',
  TC017 = 'TC-017 = When clicking "Checkout", should proceed to the checkout information page',
}

export enum checkOutInformationTestCaseName {
  TC018 = 'TC-018 = When clicking "Cancel", should navigate back to the cart page',
  TC019 = 'TC-019 = When clicking "Continue" without any client information, should display an error message',
  TC020 = 'TC-020 = When clicking "Continue" with some client information, should display an error message',
  TC021 = 'TC-021 = When clicking "Continue" with all client information, should proceed to the checkout overview page',
}

export enum checkOutOverViewTestCaseName {
  TC022 = 'TC-022 = The cart badge should displays the correct number of items currently in the cart',
  TC023 = 'TC-023 = The item name and price in the cart should match the selection from the product page',
  TC024 = 'TC-024 = Should correctly calculate the total, tax, and grand total',
  TC025 = 'TC-025 = When clicking "Cancel", should navigate back to the product page',
  TC026 = 'TC-026 = When clicking "Finish", should process to the checkout complete page',
}

export enum checkOutCompleteTestCaseName {
  TC027 = 'TC-027 = The cart badge number should be removed',
  TC028 = 'TC-028 = Display message',
  TC029 = 'TC-029 = When clicking "Back Home", should navigate back to the product page',
}

