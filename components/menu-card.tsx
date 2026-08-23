"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "@/lib/menu";
import { formatMXN } from "@/lib/menu";
import { useCart } from "@/lib/store";
import { cn } from "@/lib/utils";

export function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [adding, setAdding] = useState(false);
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);

  const handleAdd = () => {
    add(item);
    setAdding(true);
    setTimeout(() => setAdding(false), 1200);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="card-product group flex h-full flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand-100 to-brand-300">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
        {item.badge && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-cream/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-600 shadow-md backdrop-blur">
            {item.badge === "Bestseller" && "⭐ "}
            {item.badge === "Signature" && "👑 "}
            {item.badge}
          </div>
        )}
        <div className="absolute right-3 top-3 rounded-full bg-ink-900/80 px-3 py-1.5 font-display text-lg text-white shadow-md backdrop-blur">
          {formatMXN(item.price)}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl leading-tight text-ink-900">
          {item.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
          {item.description}
        </p>

        <motion.button
          type="button"
          onClick={handleAdd}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "mt-4 flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition-all duration-300",
            adding
              ? "bg-ink-900 text-cream"
              : "bg-brand-500 text-white hover:bg-brand-600 hover:shadow-[0_10px_25px_-10px_rgba(242,92,0,0.6)]",
          )}
        >
          {adding ? (
            <>
              <Check className="h-4 w-4" />
              ¡Agregado!
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Agregar al pedido
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  );
}
