"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { useCart } from "@/lib/store";
import { RESTAURANT } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#menu", label: "Menú" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = useCart((s) => s.count());
  const openCart = useCart((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 animate-slide-down transition-[background-color,box-shadow] duration-500",
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-[0_2px_30px_-20px_rgba(0,0,0,0.4)]"
            : "bg-transparent",
        )}
      >
        <div className="container-page flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-brand-500/40 group-hover:ring-brand-500 transition-all"
            >
              <Image
                src="/images/logo.png"
                alt="Dogos El Alex"
                width={48}
                height={48}
                priority
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className="hidden sm:block">
              <div className="font-display text-2xl leading-none text-ink-900">
                DOGOS EL ALEX
              </div>
              <div className="font-script text-sm text-brand-500 -mt-0.5">
                desde 1990
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-11 items-center gap-2 rounded-full bg-ink-900 px-4 text-sm font-semibold text-cream transition-all hover:scale-105 hover:bg-brand-500"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Pedido</span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1.5 -top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-brand-500 px-1.5 text-xs font-bold text-white ring-2 ring-cream"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 text-cream md:hidden"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 right-0 top-20 z-40 origin-top bg-cream/95 backdrop-blur-xl shadow-2xl md:hidden"
          >
            <nav className="container-page flex flex-col gap-1 py-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl px-4 py-3 text-lg font-semibold text-ink-800 hover:bg-brand-50 hover:text-brand-600"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href={`https://wa.me/${RESTAURANT.whatsappE164}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa mt-3 w-full"
              >
                Pedir por WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
