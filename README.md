# AutomatedTesting Project

This project is designed to automate the testing of the website `https://www.saucedemo.com/`. The automation framework uses [Playwright](https://playwright.dev/) for browser-based testing, ensuring that all functionalities work as expected.

## Test Cases
Login Test Cases
- TC-001: Input fields should display as the data that was filled.
- TC-002: Should show an error message if logging in without a username.
- TC-003: Should show an error message if logging in without a password.
- TC-004: Should show an error message if logging in with both fields blank.
- TC-005: Should log in successfully with valid credentials.
- TC-006: Should log in failure with an error message when using invalid credentials.

Product Test Cases
- TC-007: Adding all available products to the cart and then removing them, verifying that the cart updates correctly.
- TC-008: Product should correctly sort items from A to Z.
- TC-009: Product should correctly sort items from Z to A.
- TC-010: Product should correctly sort items from price low to high.
- TC-011: Product should correctly sort items from price high to low.
- TC-012: Should navigate to the cart page when clicking the cart icon.

Cart Test Cases
- TC-013: The cart badge should display the correct number of items currently in the cart.
- TC-014: The item name and price in the cart should match the selection from the product page.
- TC-015: Should remove the selected item from the cart and update the cart badge.
- TC-016: When clicking "Continue Shopping", should navigate back to the product page.
- TC-017: When clicking "Checkout", should proceed to the checkout information page.

Checkout Information Test Cases
- TC-018: When clicking "Cancel", should navigate back to the cart page.
- TC-019: When clicking "Continue" without any client information, should display an error message.
- TC-020: When clicking "Continue" with some client information, should display an error message.
- TC-021: When clicking "Continue" with all client information, should proceed to the checkout overview page.

Checkout Overview Test Cases
- TC-022: The cart badge should display the correct number of items currently in the cart.
- TC-023: The item name and price in the cart should match the selection from the product page.
- TC-024: Should correctly calculate the total, tax, and grand total.
- TC-025: When clicking "Cancel", should navigate back to the product page.
- TC-026: When clicking "Finish", should proceed to the checkout complete page.

Checkout Complete Test Cases
- TC-027: The cart badge number should be removed.
- TC-028: Display confirmation message after successful checkout.
- TC-029: When clicking "Back Home", should navigate back to the product page.


## Prerequisites

Before running the project, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (comes with Node.js) or pnpm
- A code editor (e.g., WebStorm or VSCode)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
      # or
   pnpm install
      # or
   yarn install
   ```

3. Ensure Playwright browsers are installed:
   ```bash
   pnpm playwright install
   ```

## Running Tests

To run tests, use the following commands:

1. Run all tests:
   ```bash
   pnpm exece playwright test
   ```

2. Run a specific test:
   ```bash
   pnpm exece playwright test <test-file-name>
   ```

3. Run tests in headed mode:
   ```bash
   pnpm exece playwright test --headed
   ```

4. To open last HTML report run:
   ```bash
    pnpm exec playwright show-report
   ```

### Example Test

```typescript
import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
   // Perform authentication steps. Replace these actions with your own.
   await page.goto('https://github.com/login');
   await page.getByLabel('Username or email address').fill('username');
   await page.getByLabel('Password').fill('password');
   await page.getByRole('button', { name: 'Sign in' }).click();
   // Wait until the page receives the cookies.
   //
   // Sometimes login flow sets cookies in the process of several redirects.
   // Wait for the final URL to ensure that the cookies are actually set.
   await page.waitForURL('https://github.com/');
   // Alternatively, you can wait until the page reaches a state where all cookies are set.
   await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

   // End of authentication steps.

   await page.context().storageState({ path: authFile });
});
```