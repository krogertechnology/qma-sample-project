import { expect, type Page } from '@playwright/test';

/**
 * Page Object for the Kroger Sign In page.
 * Covers the OAuth-hosted login form at login-stage.kroger.com
 * reached by navigating to /signin on www-stage.kroger.com.
 */
export default class KrogerLoginPage {
  constructor(public page: Page) {}

  // ---- Actions ----

  /** Fill the Email Address field with the given username */
  async fillEmail(username: string) {
    await this.emailInput.fill(username);
  }

  /** Fill the Password field with the given password */
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  /** Click the Sign In submit button */
  async clickSignIn() {
    await this.signInButton.click();
  }

  /** Complete the full login flow: fill credentials and submit */
  async login(username: string, password: string) {
    await this.fillEmail(username);
    await this.fillPassword(password);
    await this.clickSignIn();
  }

  /** Assert that the login page is displayed */
  async expectLoginPageVisible() {
    await expect(this.signInHeading).toBeVisible();
  }

  // ---- Locators ----

  /** "Sign In" level-1 heading confirming the login page loaded */
  get signInHeading() {
    return this.page.getByRole('heading', { name: 'Sign In' });
  }

  /** Email Address text input */
  get emailInput() {
    return this.page.getByRole('textbox', { name: 'Email Address' });
  }

  /** Password text input */
  get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  /** "Sign In" submit button */
  get signInButton() {
    return this.page.getByRole('button', { name: 'Sign In' });
  }

  /** "Show Password" toggle button beside the password field */
  get showPasswordButton() {
    return this.page.getByRole('button', { name: 'Show Password' });
  }

  /** "Forgot Password?" link */
  get forgotPasswordLink() {
    return this.page.getByRole('link', { name: 'Forgot Password?' });
  }

  /** "Create an Account" link for new users */
  get createAccountLink() {
    return this.page.getByRole('link', { name: 'Create an Account' });
  }
}