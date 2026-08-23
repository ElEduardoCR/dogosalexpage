"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { CATEGORIES, MENU } from "@/lib/menu";
import { MenuCard } from "./menu-card";
import { cn } from "@/lib/utils";

export function MenuSection() {
  const [active, setActive] = useState<string>("all");
  const items = active === "all" ? MENU : MENU.filter((m) => m.category === active);

  return (
    <section id="menu" className="relative py-20 sm:py-28">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block rounded-full border-2 border-brand-500/30 bg-brand-50 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-brand-600">
            Nuestro menú
          </div>
          <h2 className="mt-6 font-display text-5xl text-ink-900 sm:text-6xl lg:text-7xl">
            Todo <span className="text-brand-500">hecho</span> a la parrilla.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600">
            Receta de casa, ingredientes reales, porción generosa. Pide lo que
            se te antoje — llega calientito.
          </p>
        </motion.div>

        {/* Tabs */}
        <LayoutGroup>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            <CategoryPill
              id="all"
              label="Todo"
              emoji="✨"
              active={active === "all"}
              onClick={setActive}
            />
            {CATEGORIES.map((c) => (
              <CategoryPill
                key={c.id}
                id={c.id}
                label={c.label}
                emoji={c.emoji}
                active={active === c.id}
                onClick={setActive}
              />
            ))}
          </div>
        </LayoutGroup>

        {/* Grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <MenuCard item={item} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}

function CategoryPill({
  id,
  label,
  emoji,
  active,
  onClick,
}: {
  id: string;
  label: string;
  emoji: string;
  active: boolean;
  onClick: (id: string) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onClick(id)}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all",
        active
          ? "border-brand-500 text-white"
          : "border-ink-200 bg-white text-ink-700 hover:border-brand-500/50 hover:text-brand-600",
      )}
    >
      {active && (
        <motion.span
          layoutId="active-pill"
          className="absolute inset-0 -z-0 rounded-full bg-brand-500"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <span className="relative z-10">{emoji}</span>
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}
