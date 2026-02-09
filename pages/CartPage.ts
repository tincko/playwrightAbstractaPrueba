import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly placeOrderButton: Locator;
    readonly purchaseButton: Locator;
    readonly nameInput: Locator;
    readonly countryInput: Locator;
    readonly cityInput: Locator;
    readonly cardInput: Locator;
    readonly monthInput: Locator;
    readonly yearInput: Locator;
    readonly confirmationModal: Locator;
    readonly okButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.placeOrderButton = page.locator('button.btn-success', { hasText: 'Place Order' });
        this.nameInput = page.locator('#name');
        this.countryInput = page.locator('#country');
        this.cityInput = page.locator('#city');
        this.cardInput = page.locator('#card');
        this.monthInput = page.locator('#month');
        this.yearInput = page.locator('#year');
        this.purchaseButton = page.locator('button[onclick="purchaseOrder()"]', { hasText: 'Purchase' });
        this.confirmationModal = page.locator('.sweet-alert');
        this.okButton = page.locator('.confirm.btn.btn-lg.btn-primary');
    }

    async goToCart() {
        await this.page.goto('https://www.demoblaze.com/cart.html');
        await this.placeOrderButton.waitFor({ state: 'visible', timeout: 10000 });
    }

    async checkOut(details: { name: string; country: string; city: string; card: string; month: string; year: string }) {
        await this.placeOrderButton.click();
        await this.page.waitForSelector('#orderModal.show'); // Esperar a que aparezca el modal

        await this.nameInput.fill(details.name);
        await this.countryInput.fill(details.country);
        await this.cityInput.fill(details.city);
        await this.cardInput.fill(details.card);
        await this.monthInput.fill(details.month);
        await this.yearInput.fill(details.year);

        await this.purchaseButton.click();

        // Esperar a la alerta de éxito
        await this.confirmationModal.waitFor({ state: 'visible' });
        const success = await this.confirmationModal.locator('h2').textContent();

        if (success !== 'Thank you for your purchase!') {
            throw new Error(`Checkout failed: ${success}`);
        }

        await this.okButton.click();
    }
}
