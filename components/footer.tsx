"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Instagram, Facebook, MessageCircle, MapPin, Clock } from "lucide-react";
import { RESTAURANT } from "@/lib/whatsapp";

const ITEMS = [
  "Dogo Clásico",
  "Dogo Especial",
  "Dogotote",
  "Hamburguesa Sencilla",
  "Hamburguesa Tocino",
  "Hamburguesa Especial",
  "Hamburguesa BBQ",
  "Hamburguesa Aguacatosa",
  "Hamburguesa Hawaii",
  "La Monster",
  "Burrito Especial",
  "Bebidas",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-cream">
      <div className="absolute inset-0 grain opacity-20" />
      <div className="glow -left-32 top-0 h-96 w-96 text-brand-500/15" />

      {/* Marquee */}
      <div className="relative border-y border-ink-700 bg-brand-500 py-4">
        <div className="flex w-max animate-marquee gap-12 px-6">
          {[...Array(3)].map((_, dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-12">
              {ITEMS.map((name) => (
                <span
                  key={`${dup}-${name}`}
                  className="flex items-center gap-6 font-display text-2xl uppercase tracking-wide text-white"
                >
                  {name}
                  <span className="text-white/60">●</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container-page relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-full ring-2 ring-brand-500/40">
              <Image
                src="/images/logo.png"
                alt="Dogos El Alex"
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="font-display text-2xl">DOGOS EL ALEX</div>
              <div className="font-script text-sm text-brand-400">desde 1990</div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-ink-300">
            Dogos, burgers y burritos con receta de casa. El sabor que ya es
            parte de la familia.
          </p>
          <div className="mt-6 flex gap-2">
            <SocialLink href="#" icon={<Instagram className="h-4 w-4" />} label="Instagram" />
            <SocialLink href="#" icon={<Facebook className="h-4 w-4" />} label="Facebook" />
            <SocialLink
              href={`https://wa.me/${RESTAURANT.whatsappE164}`}
              icon={<MessageCircle className="h-4 w-4" />}
              label="WhatsApp"
            />
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-brand-400">Menú</h4>
          <ul className="mt-4 space-y-2 text-sm text-ink-300">
            {ITEMS.slice(0, 6).map((i) => (
              <li key={i}>
                <a href="#menu" className="transition-colors hover:text-brand-400">
                  {i}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-brand-400">Más</h4>
          <ul className="mt-4 space-y-2 text-sm text-ink-300">
            {ITEMS.slice(6).map((i) => (
              <li key={i}>
                <a href="#menu" className="transition-colors hover:text-brand-400">
                  {i}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-brand-400">Contacto</h4>
          <ul className="mt-4 space-y-3 text-sm text-ink-300">
            <li className="flex items-start gap-2">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <a
                href={`https://wa.me/${RESTAURANT.whatsappE164}`}
                className="transition-colors hover:text-brand-400"
              >
                {RESTAURANT.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>{RESTAURANT.city}</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>{RESTAURANT.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-400 sm:flex-row">
          <div>
            © {new Date().getFullYear()} Dogos El Alex · Hecho con 🧡 en Chihuahua
          </div>
          <div>
            Síguenos en redes · <span className="text-brand-400">@dogoselalex</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-700 bg-ink-800 text-ink-300 transition-colors hover:border-brand-500 hover:bg-brand-500 hover:text-white"
    >
      {icon}
    </motion.a>
  );
}
