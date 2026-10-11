# QAtlas

<!-- Banner: agrega aquí una imagen del proyecto. -->

[![CI](https://github.com/OWNER/REPOSITORY/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPOSITORY/actions/workflows/ci.yml)
[![Playwright](https://img.shields.io/badge/Playwright-1.56%2B-45ba4b?logo=playwright)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Reemplaza `OWNER/REPOSITORY` en el badge de CI con el repositorio de GitHub del proyecto.

## Índice / Contents

- [Español](#español)
- [English](#english)

## Español

### Descripción

QAtlas es un proyecto de automatización de pruebas end-to-end con Playwright y TypeScript para el sitio público de práctica [SauceDemo](https://www.saucedemo.com). Usa Page Object Model, almacena los datos de prueba fuera de los tests, genera reportes HTML y cubre login, control de acceso, catálogo, carrito y checkout.

### Stack

- [Playwright Test](https://playwright.dev/docs/test-intro)
- TypeScript
- Node.js

### Cómo instalar y correr las pruebas

Requisitos: Node.js 20 o superior y npm.

```bash
npm install
npx playwright install chromium
npm test
```

Para validar los tipos sin ejecutar las pruebas:

```bash
npm run typecheck
```

Para abrir el último reporte HTML:

```bash
npm run report
```

### Casos de prueba

| ID | Descripción | Resultado esperado |
|---|---|---|
| AUTH-001 | Inicio de sesión con credenciales válidas | Se abre el catálogo de productos. |
| AUTH-002 | Inicio de sesión con credenciales inválidas | Se muestra un mensaje de error y se mantiene la página de login. |
| AUTH-003 | Abrir el catálogo sin una sesión autenticada | El sitio redirige a la página de inicio de sesión. |
| INV-001 | Ordenar el catálogo por nombre descendente | Los nombres aparecen de Z a A. |
| INV-002 | Ordenar el catálogo por precio ascendente | Los precios aparecen de menor a mayor. |
| CART-001 | Agregar un producto y quitarlo del carrito | El producto aparece en el carrito y luego se elimina; el carrito queda vacío. |
| CHECK-001 | Completar una compra | Se muestran el producto en el resumen y la confirmación del pedido. |

### Hallazgos

SauceDemo no ofrece un control de interfaz para filtrar productos. El catálogo sí permite ordenar por nombre ascendente/descendente y precio ascendente/descendente; esos controles están cubiertos. No se simula un filtro inexistente. El test AUTH-003 comprueba el control de acceso del catálogo sin sesión.

Los workflows ejecutan las pruebas en cada push. Después de las ejecuciones en `main`, otro workflow publica el reporte en GitHub Pages. En la configuración del repositorio, selecciona **Settings → Pages → Build and deployment → GitHub Actions**.

### Estructura del proyecto

```text
qatlas/
├── pages/             # Page Objects
├── tests/             # Pruebas end-to-end
├── utils/             # Datos de prueba y utilidades
├── playwright.config.ts
├── package.json
└── LICENSE
```

Los workflows de GitHub Actions están en `.github/workflows/` en la raíz del repositorio.

## English

### Description

QAtlas is a Playwright and TypeScript end-to-end testing project for the public [SauceDemo](https://www.saucedemo.com) practice site. It uses the Page Object Model, keeps test data outside test files, generates HTML reports, and covers login, access control, inventory, cart, and checkout.

### Stack

- [Playwright Test](https://playwright.dev/docs/test-intro)
- TypeScript
- Node.js

### How to install and run the tests

Requirements: Node.js 20 or later and npm.

```bash
npm install
npx playwright install chromium
npm test
```

To type-check without running the tests:

```bash
npm run typecheck
```

Open the latest HTML report:

```bash
npm run report
```

### Test cases

| ID | Description | Expected result |
|---|---|---|
| AUTH-001 | Log in with valid credentials | The product catalog is displayed. |
| AUTH-002 | Log in with invalid credentials | An error is displayed and the login page remains open. |
| AUTH-003 | Open the catalog without an authenticated session | The site redirects to the login page. |
| INV-001 | Sort the catalog by descending name | Product names are ordered from Z to A. |
| INV-002 | Sort the catalog by ascending price | Prices are ordered from low to high. |
| CART-001 | Add a product and remove it from the cart | The product appears in the cart, then is removed and the cart is empty. |
| CHECK-001 | Complete a purchase | The product appears in the order summary and a confirmation is displayed. |

### Findings

SauceDemo does not provide a product-filter control in its UI. The inventory does support sorting by ascending/descending name and price, and those controls are covered. No nonexistent filter is simulated. AUTH-003 checks that the catalog enforces access control when no session is present.

The workflows run tests on every push. After runs on `main`, another workflow publishes the report to GitHub Pages. In repository settings, select **Settings → Pages → Build and deployment → GitHub Actions**.

### Project structure

```text
qatlas/
├── pages/             # Page Objects
├── tests/             # End-to-end tests
├── utils/             # Test data and utilities
├── playwright.config.ts
├── package.json
└── LICENSE
```

GitHub Actions workflows are located in `.github/workflows/` at the repository root.
