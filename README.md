# AutomatedTesting Project

This project is designed to automate the testing of the website `https://www.saucedemo.com/`. The automation framework uses [Playwright](https://playwright.dev/) for browser-based testing, ensuring that all functionalities work as expected.

## Features
- Automated navigation to the login page.
- Filling in username and password fields.
- Validating error messages for invalid or missing credentials.
- Ensuring that valid credentials successfully log in.
- Handling various user scenarios, including locked-out users.

## Prerequisites

Before running the project, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (comes with Node.js) or Yarn
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

## Writing Tests

To create new tests:

1. Add a test case name in `test-case-name.enum.ts`.
2. Create a new test in the appropriate file under `tests/`.

### Example Test

```typescript
import { test, expect } from '@playwright/test';
import { loginTestCaseName } from '../constants/test-case-name.constants';

// Example test case
test(loginTestCaseName.TC007, async ({ loginPage }) => {
    await loginPage.fillUserNameAndPassword('validUser', 'validPassword');
    await loginPage.clickLogin();
    expect(await loginPage.isLoggedIn()).toBe(true);
});
```

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/<your-feature-name>
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add <your-feature-description>"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/<your-feature-name>
   ```
5. Create a Pull Request.
