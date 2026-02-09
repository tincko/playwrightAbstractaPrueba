import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginLink: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.locator('#login2');
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.locator('button[onclick="logIn()"]');
    }

    async login(username: string, password: string) {
        await this.loginLink.click();
        await this.page.waitForSelector('#logInModal.show');
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        // Usually wait for modal to close or welcome message
        await this.page.waitForSelector('#nameofuser', { state: 'visible' });
    }
}

export class SignupPage {
    readonly page: Page;
    readonly signupLink: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signupLink = page.locator('#signin2');
        this.usernameInput = page.locator('#sign-username');
        this.passwordInput = page.locator('#sign-password');
        this.signupButton = page.locator('button[onclick="register()"]');
    }

    async signup(username: string, password: string) {
        await this.signupLink.click();
        await this.page.waitForSelector('#signInModal.show');
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        // Setup dialog listener for "Sign up successful."
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.signupButton.click();
        const dialog = await dialogPromise;
        await dialog.accept();
        return dialog.message();
    }
}
