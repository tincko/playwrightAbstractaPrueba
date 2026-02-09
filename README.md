# Automatización de UI para Abstracta Playground

Este repositorio contiene pruebas de automatización de UI para el sitio de comercio electrónico Demoblaze como parte del proceso de selección (o ejercicio) de Abstracta.

## Estructura del Proyecto

- **pages/**: Contiene las clases del Modelo de Objetos de Página (Page Object Model - POM).
- **tests/**: Contiene las especificaciones de las pruebas.
  - `part1_scraper.spec.ts`: Extrae datos de productos de las primeras 2 páginas.
  - `part2_automation.spec.ts`: Automatiza el flujo de compra, registro, e inicio de sesión.
- **utils/**: Archivos de utilidad.
- `scraped_products.txt`: Archivo de salida generado por la Parte 1.

## Requisitos Previos

- Node.js (v14+)
- npm

## Configuración

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Instalar navegadores de Playwright:
   ```bash
   npx playwright install
   ```

## Ejecución de Pruebas

Para ejecutar todas las pruebas:
```bash
npx playwright test
```

Para ejecutar un archivo de prueba específico:
```bash
npx playwright test tests/part1_scraper.spec.ts
```

## Visualización de Reportes

Playwright genera un reporte HTML después de la ejecución.
```bash
npx playwright show-report
```

## Datos Extraídos

Después de ejecutar `part1_scraper.spec.ts`, los datos de los productos se guardarán en `scraped_products.txt` en el directorio raíz.
