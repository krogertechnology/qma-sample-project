import { test, expect } from '@playwright/test';
import { loadData } from '@utils/data-loader';
import KrogerLoginPage from '@pages/kroger-login.page';
import KrogerDashboardPage from '@pages/kroger-dashboard.page';

// Type representing the structure of src/data/users.json
interface UsersData {
  '': Record<string, string>;
}

test.describe('Successful Login with Valid Kroger User Credentials', () => {

  test('should log in with valid credentials and redirect to account dashboard', async ({ page }) => {
    // Load credentials from users.json — ENV vars (e.g. VIKRAM311991_GMAIL_COM) are resolved automatically
    const users = loadData<UsersData>('users.json');
    const username = 'vikram311991@gmail.com';
    const password = users[''][username];

    const loginPage = new KrogerLoginPage(page);
    const dashboardPage = new KrogerDashboardPage(page);

    // Step 1: Navigate to the Kroger stage login page
    // Expected: Kroger login page loads successfully
    await page.goto('/signin');
    await expect(loginPage.signInHeading).toBeVisible();
    await expect(page).toHaveTitle(/Sign In/i);

    // Step 2: Enter the registered email address into the username field
    // Expected: The email address appears in the username field
    await loginPage.fillEmail(username);
    await expect(loginPage.emailInput).toHaveValue(username);

    // Step 3: Enter the valid password into the password field
    // Expected: Password is accepted and appears as masked input
    await loginPage.fillPassword(password);
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');

    // Step 4: Click the 'Sign In' button
    // Expected: The login form is submitted
    await expect(loginPage.signInButton).toBeEnabled();
    await loginPage.clickSignIn();

    // Step 5: Wait for navigation to complete after login
    // Expected: The application authenticates the user and redirects to the dashboard
    await page.waitForURL('**/account/dashboard**', { waitUntil: 'domcontentloaded' });

    // Step 6: Verify the user is redirected to their account dashboard
    // Expected: Dashboard page displays user-specific elements
    await expect(page).toHaveURL(/account\/dashboard/);
    await expect(page).toHaveTitle(/My Account/i);
    await expect(dashboardPage.welcomeHeading).toBeVisible();
    await expect(dashboardPage.accountNavButton).toBeVisible();
    await expect(dashboardPage.purchaseHistoryLink.first()).toBeVisible();
  });

});
