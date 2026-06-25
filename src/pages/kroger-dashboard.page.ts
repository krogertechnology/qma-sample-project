import { expect, type Page } from '@playwright/test';

/**
 * Page Object for the Kroger Account Dashboard page.
 * URL: /account/dashboard/
 * Title: "My Account - Kroger"
 */
export default class KrogerDashboardPage {
  constructor(public page: Page) {}

  // ---- Actions ----

  /** Assert that the dashboard is fully loaded and user-specific elements are visible */
  async expectDashboardVisible(fullName: string) {
    await expect(this.page).toHaveURL(/account\/dashboard/);
    await expect(this.page).toHaveTitle(/My Account/i);
    await expect(this.page.getByRole('heading', { name: new RegExp(`Welcome, ${fullName}`, 'i') })).toBeVisible();
    await expect(this.page.getByRole('button', { name: new RegExp(fullName, 'i') })).toBeVisible();
  }

  // ---- Locators ----

  /** Personalised welcome heading: "Welcome, Vikram Reddy" */
  get welcomeHeading() {
    return this.page.getByRole('heading', { name: /Welcome, Vikram Reddy/i });
  }

  /** Account nav button showing the user's name: "Vikram Reddy" */
  get accountNavButton() {
    return this.page.getByRole('button', { name: /Vikram Reddy/i });
  }

  /**
   * "Purchase History" navigation links.
   * There are two on the page (left-nav + card section); use .first() for the nav item.
   */
  get purchaseHistoryLink() {
    return this.page.getByRole('link', { name: 'Purchase History' });
  }

  /** Left-side "Profile" nav link */
  get profileNavLink() {
    return this.page.getByRole('link', { name: 'Profile' });
  }

  /** Left-side "Address Book" nav link */
  get addressBookNavLink() {
    return this.page.getByRole('link', { name: 'Address Book' });
  }

  /** Left-side "Preferences" nav link */
  get preferencesNavLink() {
    return this.page.getByRole('link', { name: 'Preferences' });
  }

  /** Left-side "Wallet" nav button */
  get walletNavButton() {
    return this.page.getByRole('button', { name: 'Wallet' });
  }

  /** Left-side "Points Summary" nav link */
  get pointsSummaryNavLink() {
    return this.page.getByRole('link', { name: 'Points Summary' });
  }

  /** Left-side "Community Rewards" nav link */
  get communityRewardsNavLink() {
    return this.page.getByRole('link', { name: 'Community Rewards' });
  }
}