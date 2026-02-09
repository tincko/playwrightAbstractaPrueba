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
        await homePage.goToProduct('Samsung galaxy s6'); // Seleccionando un producto específico

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

        // La verificación ocurre dentro de checkOut mediante la comprobación del modal de éxito
    });

    test('User can sign up (Optional 1)', async ({ page }) => {
        const username = `testuser_${Date.now()}`;
        const password = 'password123';

        // Instanciar páginas
        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);

        await homePage.navigateTo();
        const result = await signupPage.signup(username, password);
        expect(result).toBe('Sign up successful.');
    });

    test('User can log in (Optional 2)', async ({ page }) => {
        // Se necesita un usuario válido. Crearé uno primero o asumiré que existe.
        // Creando un nuevo usuario para garantizar el éxito
        const username = `loginuser_${Date.now()}`;
        const password = 'password123';

        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);
        const loginPage = new LoginPage(page);

        await homePage.navigateTo();
        await signupPage.signup(username, password);

        // Ahora iniciar sesión
        await loginPage.login(username, password);

        // Verificar el éxito del inicio de sesión comprobando la visualización del nombre de usuario
        await expect(page.locator('#nameofuser')).toHaveText(`Welcome ${username}`);
    });

});
