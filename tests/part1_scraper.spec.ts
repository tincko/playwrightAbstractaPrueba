import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import * as fs from 'fs';
import * as path from 'path';

test('Part 1: Scrape first 2 pages of products', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo();

    const productsPage1 = await homePage.getProductData();
    console.log('Page 1 Products:', productsPage1);

    await homePage.goToNextPage();
    const productsPage2 = await homePage.getProductData();
    console.log('Page 2 Products:', productsPage2);

    const allProducts = [...productsPage1, ...productsPage2];

    // Formatear la salida
    const output = allProducts.map(p => `Name: ${p.name}\nPrice: ${p.price}\nLink: ${p.link}\n`).join('\n---\n\n');

    const filePath = path.join(__dirname, '..', 'scraped_products.txt');
    fs.writeFileSync(filePath, output);

    console.log(`Successfully wrote ${allProducts.length} products to ${filePath}`);
});
