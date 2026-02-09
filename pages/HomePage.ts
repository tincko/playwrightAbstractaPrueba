import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly productCards: Locator;
    readonly nextButton: Locator;
    readonly previousButton: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        // Los productos se cargan en #tbodyid
        this.productCards = page.locator('#tbodyid .card');
        this.nextButton = page.locator('#next2');
        this.previousButton = page.locator('#prev2');
        this.cartLink = page.locator('#cartur');
    }

    async navigateTo() {
        await this.page.goto('https://www.demoblaze.com');
        // Esperar a las tarjetas de productos - más confiable que networkidle
        await this.productCards.first().waitFor({ state: 'visible', timeout: 10000 });
    }

    async getProductData() {
        // Esperar a que al menos una tarjeta sea visible
        await this.productCards.first().waitFor({ state: 'visible' });

        const count = await this.productCards.count();
        const products = [];

        for (let i = 0; i < count; i++) {
            const card = this.productCards.nth(i);
            const nameElement = card.locator('.card-title a');
            const priceElement = card.locator('h5');

            const name = await nameElement.innerText();
            const price = await priceElement.innerText();
            const relativeLink = await nameElement.getAttribute('href');
            const fullLink = `https://www.demoblaze.com/${relativeLink}`;

            products.push({
                name: name.trim(),
                price: price.trim(),
                link: fullLink
            });
        }
        return products;
    }

    async goToNextPage() {
        await this.nextButton.click();
        // La verificación de que se cargaron nuevos productos podría hacerse comprobando si el primer producto cambia o similar
        // Para este sitio simple, una espera fija o networkidle suele ser suficiente ya que usa AJAX
        await this.page.waitForTimeout(2000);
    }

    async goToProduct(productName: string) {
        // Buscar producto por texto
        const productLink = this.page.getByRole('link', { name: productName });
        await productLink.click();
    }
}
