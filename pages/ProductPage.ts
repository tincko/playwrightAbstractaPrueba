import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('a.btn-success', { hasText: 'Add to cart' });
    }

    async addToCart() {
        // Escuchar el diálogo antes de hacer clic
        this.page.once('dialog', async (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });

        await this.addToCartButton.click();

        // Opcionalmente esperar alguna confirmación visual si es necesario, pero la alerta es la respuesta principal
    }
}
