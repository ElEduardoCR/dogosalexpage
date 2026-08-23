export type CategoryId = "dogos" | "burgers" | "burritos" | "bebidas";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: "Bestseller" | "Signature" | "Nuevo";
  category: CategoryId;
  modifiers?: { id: string; label: string; priceDelta: number }[];
}

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
  emoji: string;
}

export const CATEGORIES: Category[] = [
  { id: "dogos", label: "Dogos", blurb: "Salchicha de pavo, tocino gourmet y aderezos de la casa.", emoji: "🌭" },
  { id: "burgers", label: "Burgers", blurb: "Carne 100% de res a la parrilla con pan brioche dorado.", emoji: "🍔" },
  { id: "burritos", label: "Burritos", blurb: "Sirloin marinado con la receta de la casa.", emoji: "🌯" },
  { id: "bebidas", label: "Bebidas", blurb: "Para acompañar como se debe.", emoji: "🥤" },
];

export const MENU: MenuItem[] = [
  // ─── DOGOS ─────────────────────────────────────────────
  {
    id: "dogo-clasico",
    name: "Dogo Clásico",
    description:
      "Salchicha de pavo, tocino gourmet, tomate y aderezos. El que todos se llevan desde 1990.",
    price: 42,
    image: "/images/dogo-clasico.jpg",
    badge: "Bestseller",
    category: "dogos",
  },
  {
    id: "dogo-especial",
    name: "Dogo Especial",
    description:
      "Doble salchicha de pavo, tocino gourmet, tomate, cebolla caramelizada, bañado en queso amarillo y aderezos.",
    price: 69,
    image: "/images/dogo-especial.jpg",
    category: "dogos",
  },
  {
    id: "dogotote",
    name: "Dogotote",
    description:
      "Nuestro hot dog XL signature. Para los que piden sin miedo. Generoso, contundente, unforgettable.",
    price: 69,
    image: "/images/dogotote.jpg",
    badge: "Signature",
    category: "dogos",
  },

  // ─── BURGERS ───────────────────────────────────────────
  {
    id: "burger-sencilla",
    name: "Hamburguesa Sencilla",
    description:
      "Carne 100% de res, queso amarillo rebanado, tomate, lechuga y aderezos.",
    price: 67,
    image: "/images/burger-sencilla.jpg",
    category: "burgers",
  },
  {
    id: "burger-tocino",
    name: "Hamburguesa Tocino",
    description: "Lo mejor de la Sencilla, con más tocino gourmet.",
    price: 75,
    image: "/images/burger-tocino.jpg",
    category: "burgers",
  },
  {
    id: "burger-especial",
    name: "Hamburguesa Especial",
    description:
      "Carne 100% de res, queso, salchicha de pavo, tocino gourmet, tomate, lechuga y aderezos. La favorita de la casa.",
    price: 80,
    image: "/images/burger-especial.jpg",
    badge: "Bestseller",
    category: "burgers",
  },
  {
    id: "burger-bbq",
    name: "Hamburguesa BBQ",
    description:
      "Carne 100% de res bañada en salsa BBQ, tocino gourmet, queso, tomate, lechuga y aderezos.",
    price: 80,
    image: "/images/burger-bbq.jpg",
    category: "burgers",
  },
  {
    id: "burger-aguacatosa",
    name: "Hamburguesa Aguacatosa",
    description:
      "Carne 100% de res, queso, aguacate, tocino gourmet, tomate, lechuga y aderezos.",
    price: 80,
    image: "/images/burger-aguacatosa.jpg",
    badge: "Bestseller",
    category: "burgers",
  },
  {
    id: "burger-hawaii",
    name: "Hamburguesa Hawaii",
    description:
      "Carne 100% de res, queso, jamón, piña en trocitos, tomate, lechuga y aderezos.",
    price: 80,
    image: "/images/burger-hawaii.jpg",
    category: "burgers",
  },
  {
    id: "burger-monster",
    name: "La Monster",
    description:
      "Todas las hamburguesas en una sola: doble carne, doble queso, tocino, salchicha, piña, jamón, salsa BBQ, aguacate, tomate, lechuga y aderezos.",
    price: 149,
    image: "/images/burger-monster.jpg",
    badge: "Signature",
    category: "burgers",
  },

  // ─── BURRITOS ──────────────────────────────────────────
  {
    id: "burrito-especial",
    name: "Burrito Especial",
    description:
      "Carne de sirloin marinada con la receta de la casa, acompañado de lechuga, tomate y aguacate.",
    price: 69,
    image: "/images/burrito-especial.jpg",
    category: "burritos",
  },

  // ─── BEBIDAS ───────────────────────────────────────────
  {
    id: "bebida-coca",
    name: "Coca-Cola",
    description: "Bien fría, 600 ml.",
    price: 27,
    image: "/images/bebida-coca.svg",
    category: "bebidas",
  },
  {
    id: "bebida-manzana",
    name: "Manzana-Soto",
    description: "El sabor de la nostalgia, bien fría.",
    price: 27,
    image: "/images/bebida-manzana.svg",
    category: "bebidas",
  },
  {
    id: "bebida-elite-fresa",
    name: "Elite Fresa",
    description: "Refrescante y dulce, 600 ml.",
    price: 27,
    image: "/images/bebida-elite.svg",
    category: "bebidas",
  },
  {
    id: "bebida-elite-uva",
    name: "Elite Uva",
    description: "Refrescante y dulce, 600 ml.",
    price: 27,
    image: "/images/bebida-elite.svg",
    category: "bebidas",
  },
  {
    id: "bebida-elite-toronja",
    name: "Elite Toronja",
    description: "Refrescante y dulce, 600 ml.",
    price: 27,
    image: "/images/bebida-elite.svg",
    category: "bebidas",
  },
  {
    id: "bebida-agua",
    name: "Agua / Pulpy",
    description: "Para refrescar el momento.",
    price: 25,
    image: "/images/bebida-agua.svg",
    category: "bebidas",
  },
];

export function formatMXN(n: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);
}
