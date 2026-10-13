"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, X, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/store";
import { formatMXN } from "@/lib/menu";
import { CheckoutForm, type CheckoutData } from "./checkout-form";
import { buildWhatsAppUrl, RESTAURANT } from "@/lib/whatsapp";
import { toast } from "sonner";

export function CartDrawer() {
  const lines = useCart((s) => s.lines);
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);

  const [step, setStep] = useState<"cart" | "checkout">("cart");

  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setStep("cart"), 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSend = (info: CheckoutData) => {
    if (lines.length === 0) return;
    const url = buildWhatsAppUrl(lines, info);
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (!w) {
      toast.error("Pop-up bloqueado", {
        description: "Permite pop-ups para enviar el pedido por WhatsApp.",
      });
    } else {
      toast.success("¡Pedido listo!", {
        description: "WhatsApp se abrió con tu pedido pre-formateado.",
      });
      clear();
      close();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-ink-900/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed right-0 top-0 z-[70] flex h-screen w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-ink-100 bg-ink-900 px-6 py-5 text-cream">
              <div className="absolute inset-0 grain opacity-30" />
              <div className="relative">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-brand-400" />
                  <h2 className="font-display text-2xl">
                    {step === "cart" ? "Tu pedido" : "Datos de entrega"}
                  </h2>
                </div>
                <p className="mt-1 text-xs text-ink-300">
                  {step === "cart"
                    ? `${lines.length} ${lines.length === 1 ? "item" : "ítems"}`
                    : "Casi listo — confirma para enviar"}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="relative rounded-full p-2 transition-colors hover:bg-ink-700"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {step === "cart" ? (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-6 py-6"
                  >
                    {lines.length === 0 ? (
                      <EmptyState onClose={close} />
                    ) : (
                      <ul className="space-y-4">
                        <AnimatePresence initial={false}>
                          {lines.map((l) => (
                            <motion.li
                              key={l.itemId}
                              layout
                              initial={{ opacity: 0, x: 30 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 50, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm"
                            >
                              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-50">
                                <Image
                                  src={l.image}
                                  alt={l.name}
                                  fill
                                  sizes="80px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <h3 className="font-semibold text-ink-900 line-clamp-2">
                                    {l.name}
                                  </h3>
                                  <button
                                    type="button"
                                    onClick={() => remove(l.itemId)}
                                    className="rounded-full p-1 text-ink-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                    aria-label="Eliminar"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                                <div className="mt-1 text-sm text-ink-500">
                                  {formatMXN(l.unitPrice)} c/u
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                  <div className="flex items-center gap-1 rounded-full border border-ink-200 bg-white">
                                    <button
                                      type="button"
                                      onClick={() => setQty(l.itemId, l.qty - 1)}
                                      className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-brand-50 hover:text-brand-600 disabled:opacity-30"
                                      disabled={l.qty <= 1}
                                      aria-label="Restar"
                                    >
                                      <Minus className="h-3 w-3" />
                                    </button>
                                    <span className="min-w-6 text-center text-sm font-bold">
                                      {l.qty}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setQty(l.itemId, l.qty + 1)}
                                      className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-brand-50 hover:text-brand-600"
                                      aria-label="Sumar"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </button>
                                  </div>
                                  <div className="font-display text-lg text-brand-500">
                                    {formatMXN(l.unitPrice * l.qty)}
                                  </div>
                                </div>
                              </div>
                            </motion.li>
                          ))}
                        </AnimatePresence>
                      </ul>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="checkout"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-6"
                  >
                    <CheckoutForm
                      onCancel={() => setStep("cart")}
                      onSubmit={handleSend}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {lines.length > 0 && step === "cart" && (
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="border-t border-ink-100 bg-white px-6 py-5"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-500">Subtotal</span>
                  <span className="font-semibold text-ink-700">
                    {formatMXN(subtotal)}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span className="text-ink-500">Envío</span>
                  <span className="text-ink-400">Se confirma por WhatsApp</span>
                </div>
                <div className="mt-3 flex items-end justify-between border-t border-dashed border-ink-200 pt-3">
                  <span className="font-display text-2xl text-ink-900">Total</span>
                  <span className="font-display text-3xl text-brand-500">
                    {formatMXN(subtotal)}
                  </span>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep("checkout")}
                  className="btn-primary mt-5 w-full"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
                <a
                  href={`https://wa.me/${RESTAURANT.whatsappE164}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-center text-xs text-ink-400 transition-colors hover:text-brand-500"
                >
                  ¿Dudas? Escríbenos directo por WhatsApp
                </a>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="relative">
        <div className="absolute inset-0 animate-pulse-soft rounded-full bg-brand-200 blur-2xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-brand-100">
          <ShoppingBag className="h-10 w-10 text-brand-500" />
        </div>
      </div>
      <h3 className="mt-6 font-display text-3xl text-ink-900">
        Tu pedido está vacío
      </h3>
      <p className="mt-2 max-w-xs text-ink-500">
        Agrega lo que se te antoje — dogos, burgers, burritos o una bebida bien fría.
      </p>
      <button type="button" onClick={onClose} className="btn-primary mt-6">
        Ver el menú
      </button>
    </motion.div>
  );
}
