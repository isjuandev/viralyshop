# PaseoCan — Landing de venta (Correa Retráctil Doble)

Landing page de alta conversión para el producto **Correa Retráctil Doble para Perros** de la marca **PaseoCan**, enfocada en el mercado colombiano con **pago contra entrega** (COD) y envío gratis.

## Descripción

Sitio de dropshipping de una sola página (one-page) diseñado para convertir visitantes de tráfico pagado en pedidos. El flujo de compra se cierra directamente por **WhatsApp** con un mensaje pre-armado que el cliente solo debe confirmar, además de registrar el pedido en una API externa de pre-órdenes.

## Stack

- **React 19** + **Vite 7** + **TypeScript**
- **Tailwind CSS 4** con el plugin de Vite
- **shadcn/ui** (Radix UI, CVA, tailwind-merge)
- **@vercel/blob** para subida de archivos (endpoint en `/api/upload.ts`)
- **pnpm** como gestor de paquetes

## Características

- **Persuasión conversacional:** Hero, problema/solución, cómo funciona, comparación, prueba social, garantía y FAQ.
- **Elementos de urgencia:** cuenta regresiva persistente (sessionStorage), modal de intención de salida, toasts de ventas recientes y botón flotante de WhatsApp.
- **Checkout por WhatsApp:** formulario de pedido que genera un mensaje con detalles de entrega (ciudad, dirección, barrio o recoger en oficina con cédula) y abre WhatsApp con el mensaje listo.
- **Registro de pre-órdenes:** envía el pedido a la API de pre-órdenes con clave de idempotencia para evitar duplicados.
- **Precios por paquete:** lógica de precio y descuento para 1 o 2 unidades (bundle pricing).
- **Tracking:** Meta Pixel integrado en el `head`.
- **Diseño responsivo** en español (CO) con sistema de temas.

## Estructura

```
├── api/
│   └── upload.ts              # Endpoint serverless de subida a Vercel Blob
├── public/                    # Imágenes y assets estáticos
├── src/
│   ├── components/            # Secciones de la landing + UI (shadcn)
│   ├── context/               # CountdownContext (cuenta regresiva)
│   ├── utils/
│   │   ├── whatsapp.js        # Construcción de mensaje y apertura de WhatsApp
│   │   ├── preorder.js        # Envío de pre-órdenes a la API
│   │   ├── pricing.js         # Precios y descuentos por bundle
│   │   ├── format.js          # Formato de precios (es-CO)
│   │   └── scroll.js
│   ├── constants.js           # Configuración (WhatsApp, producto, precios)
│   ├── App.jsx                # Composición de las secciones
│   └── main.tsx
├── components.json            # Config de shadcn/ui
├── index.html
├── package.json
└── vite.config.ts
```

## Configuración

La configuración del producto vive en `src/constants.js`:

```js
WHATSAPP_NUMBER = "573334322359"; // número para recibir pedidos
BASE_PRICE = 109000;              // precio (COP)
COMPARE_PRICE = 159000;           // precio de referencia
```

## Comandos

```bash
pnpm install        # instalar dependencias (pnpm requerido)
pnpm dev            # servidor de desarrollo
pnpm build          # typecheck + build de producción
pnpm preview        # previsualizar el build
```

## Deploy

El proyecto incluye un endpoint serverless en `api/` compatible con Vercel. Se requiere la variable de entorno `BLOB_READ_WRITE_TOKEN` para el módulo de subida de archivos.