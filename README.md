# AutomatedTesting Project

This project is designed to automate the testing of the login page for the website `https://www.saucedemo.com/`. The automation framework uses [Playwright](https://playwright.dev/) for browser-based testing, ensuring that all functionalities of the login page work as expected.

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
   yarn install
   ```

3. Ensure Playwright browsers are installed:
   ```bash
   npx playwright install
   ```

## Project Structure

- **/constants/**
    - `test-case-name.constants.ts`: Stores descriptive names for test cases.

- **/pages/**
    - `loginPage.ts`: Contains methods for interacting with the login page, such as navigating, filling fields, and validating messages.

- **/resources/**
    - `user.ts`: Stores user credentials like `StandardUser` and `LockedOutUser`.

- **tests/**
    - Contains Playwright test files.

## Running Tests

To run tests, use the following commands:

1. Run all tests:
   ```bash
   npx playwright test
   ```

2. Run a specific test:
   ```bash
   npx playwright test <test-file-name>
   ```

3. Run tests in headed mode:
   ```bash
   npx playwright test --headed
   ```

## ESLint Integration

This project uses [ESLint](https://eslint.org/) to maintain clean and consistent code formatting. Code is automatically formatted according to the rules when saved in supported editors.

### Linting Commands

- Run ESLint:
  ```bash
  npx eslint .
  ```

- Fix linting issues:
  ```bash
  npx eslint . --fix
  ```

## Writing Tests

To create new tests:

1. Add a test case name in `test-case-name.constants.ts`.
2. Create a new test in the appropriate file under `tests/`.
3. Use methods from `loginPage.ts` to interact with the login page.

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

## License

This project is licensed under the MIT License. See the LICENSE file for details.

