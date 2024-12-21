export enum loginTestCaseName {
  TC001 = 'TC-001 = Input fields should display as the data that was filled',
  TC002 = 'TC-002 = Should show an error message if log in without a username',
  TC003 = 'TC-003 = Should show an error message if log in without a password',
  TC004 = 'TC-004 = Should show an error message if log in with both fields blank',
  TC005 = 'TC-005 = Should logged in successfully with valid credentials',
  TC006 = 'TC-006 = Should logged in fails with an error message when using invalid credentials'
}

export enum loginLocator {
  username = '#user-name',
  password = '#password',
  loginBtn = '#login-button',
  errorMessage = '[data-test="error"]',
}