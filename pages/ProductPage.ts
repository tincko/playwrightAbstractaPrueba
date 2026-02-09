import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('a.btn-success', { hasText: 'Add to cart' });
    }

    async addToCart() {
        // Listen for the dialog before clicking
        this.page.once('dialog', async (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });

        await this.addToCartButton.click();

        // Optionally wait for some visual confirmation if needed, but the alert is the main feedback
    }
}
