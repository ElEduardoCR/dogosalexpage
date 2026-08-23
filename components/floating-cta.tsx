"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/store";
import { RESTAURANT } from "@/lib/whatsapp";

/**
 * Floating mobile CTA — aparece cuando el carrito no está abierto
 * y permite pedir el bestseller con un tap, o saltar al carrito.
 */
export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [0, 1]);
  const count = useCart((s) => s.count());
  const openCart = useCart((s) => s.open);
  const isOpen = useCart((s) => s.isOpen);

  useEffect(() => {
    const unsub = opacity.on("change", (v) => setVisible(v > 0.5));
    return () => unsub();
  }, [opacity]);

  if (isOpen) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: visible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
    >
      <div className="flex items-center gap-2 rounded-full border-2 border-ink-900 bg-cream p-1.5 shadow-2xl">
        <a
          href={`https://wa.me/${RESTAURANT.whatsappE164}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-bold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <button
          type="button"
          onClick={openCart}
          className="relative flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink-900 text-sm font-bold text-cream"
        >
          Ver pedido
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-brand-500 px-1.5 text-xs font-bold text-white">
              {count}
            </span>
          )}
        </button>
      </div>
    </motion.div>
  );
}
