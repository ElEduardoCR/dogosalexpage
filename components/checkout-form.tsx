"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Bike, Store, Banknote, CreditCard, Send, Loader2 } from "lucide-react";
import { useCart } from "@/lib/store";
import { formatMXN } from "@/lib/menu";
import { cn } from "@/lib/utils";

export interface CheckoutData {
  customerName: string;
  customerPhone: string;
  mode: "pickup" | "delivery";
  address?: string;
  addressRef?: string;
  payment: "efectivo" | "transferencia";
  notes?: string;
}

export function CheckoutForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: CheckoutData) => void;
  onCancel: () => void;
}) {
  const subtotal = useCart((s) => s.subtotal());
  const [form, setForm] = useState<CheckoutData>({
    customerName: "",
    customerPhone: "",
    mode: "delivery",
    address: "",
    addressRef: "",
    payment: "efectivo",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof CheckoutData>(key: K, value: CheckoutData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof CheckoutData, string>> = {};
    if (!form.customerName.trim()) next.customerName = "¿Cómo te llamas?";
    if (!form.customerPhone.trim() || form.customerPhone.replace(/\D/g, "").length < 10)
      next.customerPhone = "Necesitamos un teléfono válido";
    if (form.mode === "delivery" && !form.address?.trim())
      next.address = "¿A dónde te lo llevamos?";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // pequeño delay para que se sienta "real"
    await new Promise((r) => setTimeout(r, 300));
    onSubmit(form);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Mode */}
      <div>
        <Label>¿Cómo lo recibes?</Label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <ModeOption
            active={form.mode === "delivery"}
            onClick={() => update("mode", "delivery")}
            icon={<Bike className="h-5 w-5" />}
            label="A domicilio"
            sublabel="Te lo llevamos"
          />
          <ModeOption
            active={form.mode === "pickup"}
            onClick={() => update("mode", "pickup")}
            icon={<Store className="h-5 w-5" />}
            label="Recoger"
            sublabel="Pasas a la sucursal"
          />
        </div>
      </div>

      {/* Customer */}
      <div>
        <Label>Tu nombre</Label>
        <Input
          value={form.customerName}
          onChange={(e) => update("customerName", e.target.value)}
          placeholder="¿Cómo te llamas?"
          error={errors.customerName}
        />
      </div>

      <div>
        <Label>Tu teléfono</Label>
        <Input
          type="tel"
          value={form.customerPhone}
          onChange={(e) => update("customerPhone", e.target.value)}
          placeholder="(639) 123 4567"
          error={errors.customerPhone}
        />
      </div>

      {/* Address (only if delivery) */}
      {form.mode === "delivery" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-3 overflow-hidden"
        >
          <div>
            <Label>Dirección de entrega</Label>
            <Input
              value={form.address ?? ""}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Calle, número, colonia"
              error={errors.address}
            />
          </div>
          <div>
            <Label className="text-ink-400">Referencia (opcional)</Label>
            <Input
              value={form.addressRef ?? ""}
              onChange={(e) => update("addressRef", e.target.value)}
              placeholder="Casa azul, junto al parque…"
            />
          </div>
        </motion.div>
      )}

      {/* Payment */}
      <div>
        <Label>¿Cómo pagas?</Label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <ModeOption
            active={form.payment === "efectivo"}
            onClick={() => update("payment", "efectivo")}
            icon={<Banknote className="h-5 w-5" />}
            label="Efectivo"
            sublabel="Al recibir"
          />
          <ModeOption
            active={form.payment === "transferencia"}
            onClick={() => update("payment", "transferencia")}
            icon={<CreditCard className="h-5 w-5" />}
            label="Transferencia"
            sublabel="Te pasamos datos"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <Label className="text-ink-400">Notas (opcional)</Label>
        <textarea
          value={form.notes ?? ""}
          onChange={(e) => update("notes", e.target.value)}
          rows={2}
          placeholder="Sin cebolla, extra queso, etc."
          className="mt-1.5 w-full resize-none rounded-2xl border-2 border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500"
        />
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-dashed border-brand-300 bg-brand-50/50 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-600">Subtotal del pedido</span>
          <span className="font-semibold text-ink-900">{formatMXN(subtotal)}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs text-ink-500">
          <span>Envío</span>
          <span>Se confirma por WhatsApp</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center justify-center gap-1 rounded-full border-2 border-ink-200 bg-white px-5 py-3 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          disabled={submitting}
          className="btn-primary flex-1"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Send className="h-4 w-4" />
              Enviar por WhatsApp
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}

function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "block text-xs font-bold uppercase tracking-wider text-ink-700",
        className,
      )}
    >
      {children}
    </label>
  );
}

function Input({
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <div>
      <input
        {...props}
        className={cn(
          "mt-1.5 w-full rounded-2xl border-2 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors",
          error
            ? "border-red-400 focus:border-red-500"
            : "border-ink-200 focus:border-brand-500",
          className,
        )}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs font-medium text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

function ModeOption({
  active,
  onClick,
  icon,
  label,
  sublabel,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "flex flex-col items-start gap-1 rounded-2xl border-2 p-3 text-left transition-all",
        active
          ? "border-brand-500 bg-brand-50 text-brand-700"
          : "border-ink-200 bg-white text-ink-700 hover:border-brand-300",
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full",
          active ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-600",
        )}
      >
        {icon}
      </div>
      <div className="text-sm font-bold">{label}</div>
      <div className="text-xs text-ink-500">{sublabel}</div>
    </motion.button>
  );
}
