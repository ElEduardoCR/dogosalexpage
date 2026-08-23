# Dogos El Alex · Web

Sitio web oficial de **Dogos El Alex** — dogos, burgers y burritos desde 1990, en Chihuahua.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (config en CSS, sin `tailwind.config.js`)
- **Motion** (ex-Framer Motion) — transiciones de página, layout, spring physics
- **Lenis** — smooth scroll
- **Zustand** — estado del carrito, persiste en `localStorage`
- **View Transitions API** nativa del browser
- **Sonner** — toasts
- **Lucide React** — iconos
- **next/font** — Anton, Inter, Caveat

## Pedidos en línea

El flujo de pedido es **carrito → WhatsApp**, sin pasarela de pago, sin base de datos:

1. Cliente navega el menú, agrega items.
2. Abre el carrito (drawer), revisa cantidades, edita notas.
3. Confirma → llena formulario (nombre, teléfono, pickup/delivery, dirección, método de pago).
4. Se abre WhatsApp con el pedido pre-formateado (Markdown-friendly).
5. El staff confirma por WhatsApp y procesa.

Para habilitar DiDi Food como canal alternativo, hay un CTA dedicado en la sección de contacto.

## Comandos

```bash
npm install      # Instalar deps
npm run dev      # Dev server
npm run build    # Build de producción
npm run start    # Servir build
npm run lint     # Lint
npm run typecheck
```

## Despliegue

Vercel-ready. Solo conectar el repo `ElEduardoCR/dogosalexpage` desde el dashboard de Vercel — detecta Next.js automáticamente.

Variables de entorno: ninguna requerida.

## Estructura

```
app/             # Rutas (App Router)
├── layout.tsx   # Providers, fuentes, smooth scroll, cart drawer
├── page.tsx     # Home (hero + menú + historia + contacto)
└── globals.css  # Tailwind v4 + tokens de marca

components/      # UI components
├── nav.tsx
├── hero.tsx
├── menu-section.tsx
├── menu-card.tsx
├── cart-drawer.tsx
├── checkout-form.tsx
├── story.tsx
├── contact.tsx
├── footer.tsx
├── smooth-scroll.tsx
└── floating-cta.tsx

lib/
├── menu.ts      # Data del menú (precios, descripciones, imágenes)
├── store.ts     # Zustand cart store + persist
├── whatsapp.ts  # Formateador del mensaje a WhatsApp
└── utils.ts     # cn() helper
```

## Personalizar menú

Editar `lib/menu.ts`. Cada item tiene:

```ts
{
  id: string;            // único
  name: string;          // nombre visible
  description: string;   // descripción corta
  price: number;         // MXN
  image: string;         // path en /public
  badge?: "Bestseller" | "Signature" | "Nuevo";
  category: "dogos" | "burgers" | "burritos" | "bebidas";
}
```

## Personalizar contacto

Editar `lib/whatsapp.ts`:

```ts
export const RESTAURANT = {
  whatsappDisplay: "(639) 190 0932",
  whatsappE164: "526391900932",   // 52 + 10 dígitos, sin espacios
  // ...
};
```

## Créditos

Hecho con 🧡 para Dogos El Alex.
