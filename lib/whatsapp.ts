import type { CartLine } from "./store";
import { formatMXN } from "./menu";

export const RESTAURANT = {
  name: "Dogos El Alex",
  whatsappDisplay: "(639) 190 0932",
  // E.164 MX format
  whatsappE164: "526391900932",
  city: "Chihuahua",
  address: "Chihuahua, Chih. (pide por WhatsApp para detalles)",
  hours: "Lun–Dom · 19:00 – 02:00",
  delivery: "DiDi Food",
};

export interface CheckoutInfo {
  customerName: string;
  customerPhone: string;
  mode: "pickup" | "delivery";
  address?: string;
  addressRef?: string;
  payment: "efectivo" | "transferencia";
  notes?: string;
}

export function buildWhatsAppUrl(lines: CartLine[], info: CheckoutInfo): string {
  const subtotal = lines.reduce((acc, l) => acc + l.unitPrice * l.qty, 0);
  const delivery = info.mode === "delivery" ? 35 : 0; // envío estimado
  const total = subtotal + delivery;

  const linesBlock = lines
    .map((l) => {
      const note = l.notes ? ` _(nota: ${l.notes})_` : "";
      return `• ${l.qty}× ${l.name} — ${formatMXN(l.unitPrice * l.qty)}${note}`;
    })
    .join("\n");

  const modeText =
    info.mode === "delivery"
      ? "🛵 *Delivery a domicilio*"
      : "🏪 *Recoger en sucursal*";

  const addressBlock =
    info.mode === "delivery"
      ? `\n📍 *Dirección:* ${info.address}\n${info.addressRef ? `   (${info.addressRef})\n` : ""}`
      : "";

  const paymentText =
    info.payment === "efectivo"
      ? "💵 Efectivo"
      : "💳 Transferencia";

  const message = `Hola *Dogos El Alex* 🍔🌭
Quiero hacer un pedido:

*${info.customerName}*
📞 ${info.customerPhone}
${modeText}${addressBlock}
💰 *Pago:* ${paymentText}

🧾 *Pedido:*
${linesBlock}

💵 Subtotal: ${formatMXN(subtotal)}
🛵 Envío: ${formatMXN(delivery)}
─────────────────
🟧 *Total: ${formatMXN(total)}*

${info.notes ? `\n📝 *Notas:* ${info.notes}\n` : ""}
¡Gracias! Desde 1990 deleitando a Chihuahua 🧡`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${RESTAURANT.whatsappE164}?text=${encoded}`;
}
