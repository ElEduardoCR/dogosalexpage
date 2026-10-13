"use client";

import { motion } from "motion/react";
import { MapPin, Clock, Phone, MessageCircle, Bike } from "lucide-react";
import { RESTAURANT } from "@/lib/whatsapp";

export function Contact() {
  return (
    <section id="contacto" className="relative py-20 sm:py-28">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block rounded-full border-2 border-brand-500/30 bg-brand-50 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-brand-600">
            Estamos para ti
          </div>
          <h2 className="mt-6 font-display text-5xl text-ink-900 sm:text-6xl lg:text-7xl">
            ¿Listo para
            <br />
            <span className="text-brand-500">pedir el tuyo?</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* WhatsApp — hero card */}
          <motion.a
            href={`https://wa.me/${RESTAURANT.whatsappE164}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5 }}
            className="group relative col-span-1 overflow-hidden rounded-3xl bg-[#25D366] p-8 text-white shadow-[0_20px_50px_-20px_rgba(37,211,102,0.5)] sm:col-span-2 lg:col-span-1"
          >
            <div className="absolute inset-0 grain opacity-20" />
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex h-full flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-4xl">WhatsApp</h3>
              <p className="mt-2 text-white/90">La forma más rápida de pedir.</p>
              <div className="mt-auto pt-6 font-display text-3xl">
                {RESTAURANT.whatsappDisplay}
              </div>
            </div>
          </motion.a>

          {/* Horario */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border-2 border-ink-100 bg-white p-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-display text-2xl text-ink-900">Horario</h3>
            <p className="mt-2 text-ink-500">Abiertos todos los días</p>
            <p className="mt-4 font-display text-3xl text-ink-900">
              19:00 – 02:00
            </p>
            <p className="mt-1 text-sm text-ink-400">Lun a Dom</p>
          </motion.div>

          {/* Ubicación */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border-2 border-ink-100 bg-white p-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-display text-2xl text-ink-900">Ubicación</h3>
            <p className="mt-2 text-ink-500">Estamos en</p>
            <p className="mt-4 font-display text-3xl text-ink-900">Chihuahua</p>
            <p className="mt-1 text-sm text-ink-400">Pide la dirección por WhatsApp</p>
          </motion.div>

          {/* Delivery */}
          <motion.a
            href="https://www.didifood.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6 }}
            className="group relative col-span-1 overflow-hidden rounded-3xl bg-brand-500 p-8 text-white shadow-[0_20px_50px_-20px_rgba(242,92,0,0.5)] sm:col-span-2"
          >
            <div className="absolute inset-0 grain opacity-20" />
            <div className="relative flex h-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                  <Bike className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-3xl">
                  También en DiDi Food
                </h3>
                <p className="mt-1 text-white/90">
                  Pide desde la app — te llega igual de calientito.
                </p>
              </div>
              <div className="rounded-full bg-white px-6 py-3 font-bold text-brand-600 transition-transform group-hover:scale-105">
                Abrir DiDi Food →
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
