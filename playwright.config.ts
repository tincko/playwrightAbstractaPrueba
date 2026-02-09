import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests', // Directorio donde se ubican las pruebas
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  retries: 0,
  workers: 1, // Usar 1 worker para ejecución secuencial si es necesario, de lo contrario undefined para paralelo
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: 'https://www.demoblaze.com',
    trace: 'on-first-retry',
    headless: true, // Ejecución sin interfaz gráfica (headless) para mayor estabilidad en entorno CI/Agente
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

export default config;
