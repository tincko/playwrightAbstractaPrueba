import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { LoginPage, SignupPage } from '../pages/UserPage';

test.describe('Part 2: Automation', () => {

    test('User can purchase a product', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        await homePage.navigateTo();
        await homePage.goToProduct('Samsung galaxy s6'); // Selecting a specific product

        await productPage.addToCart();

        await cartPage.goToCart();
        await cartPage.checkOut({
            name: 'Test User',
            country: 'USA',
            city: 'New York',
            card: '1234567890123456',
            month: '12',
            year: '2025'
        });

        // Verification happens inside checkOut via success modal check
    });

    test('User can sign up (Optional 1)', async ({ page }) => {
        const username = `testuser_${Date.now()}`;
        const password = 'password123';

        // Instantiate pages
        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);

        await homePage.navigateTo();
        const result = await signupPage.signup(username, password);
        expect(result).toBe('Sign up successful.');
    });

    test('User can log in (Optional 2)', async ({ page }) => {
        // Need a valid user. I'll create one first or assume one exists.
        // Making a new user to guarantee success
        const username = `loginuser_${Date.now()}`;
        const password = 'password123';

        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);
        const loginPage = new LoginPage(page);

        await homePage.navigateTo();
        await signupPage.signup(username, password);

        // Now login
        await loginPage.login(username, password);

        // Verify login success by checking the username display
        await expect(page.locator('#nameofuser')).toHaveText(`Welcome ${username}`);
    });

});
