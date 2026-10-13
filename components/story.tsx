"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Flame, Heart, Award, Clock } from "lucide-react";

const PILLARS = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Desde 1990",
    text: "Más de 35 años deleitando a Chihuahua. La receta no cambia — y la gente lo nota.",
  },
  {
    icon: <Flame className="h-5 w-5" />,
    title: "A la parrilla",
    text: "Todo lo que servimos pasa por la plancha. Recién hecho, calientito, sin atajos.",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Receta de casa",
    text: "Aderezos, cebolla caramelizada, queso fundido — hecho a la antigua, con cariño.",
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: "Porción generosa",
    text: "Si sales con hambre, no viniste a Dogos El Alex. Aquí siempre te quedas satisfecho.",
  },
];

export function Story() {
  return (
    <section id="nosotros" className="relative overflow-hidden py-20 sm:py-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-ink-900" />
      <div className="absolute inset-0 -z-10 grain opacity-40" />
      <div className="glow -left-32 top-1/3 h-96 w-96 text-brand-500/30" />
      <div className="glow -right-20 bottom-0 h-96 w-96 text-brand-700/40" />

      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-brand-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-700" />
              <Image
                src="/images/dogotote.jpg"
                alt="Dogotote — nuestro signature"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover mix-blend-luminosity opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-8 -right-8 hidden animate-float rounded-3xl bg-brand-500 p-6 text-white shadow-2xl [animation-duration:4s] sm:block">
              <div className="font-script text-2xl leading-none">desde</div>
              <div className="font-display text-6xl leading-none">1990</div>
              <div className="mt-2 text-xs uppercase tracking-widest opacity-80">
                Chihuahua, Chih.
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="absolute -left-6 -top-6 hidden h-20 w-20 items-center justify-center rounded-full bg-cream text-center font-display text-3xl text-brand-500 shadow-2xl sm:flex"
            >
              +35
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-cream">
                años
              </span>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-cream"
          >
            <div className="inline-block rounded-full border-2 border-brand-400/50 bg-brand-500/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-brand-300">
              Nuestra historia
            </div>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              El sabor que ya es
              <br />
              <span className="text-brand-400">parte de la familia.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-200">
              Empezamos en 1990 con una plancha, una receta de la casa, y la
              convicción de que la comida rápida también puede ser{" "}
              <em className="text-brand-300 not-italic">sabor de casa</em>. Hoy
              seguimos igual: mismos ingredientes, misma dedicación, mismo
              cariño. Solo que ahora te llega a la puerta.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="rounded-2xl border border-ink-700 bg-ink-800/50 p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
                    {p.icon}
                  </div>
                  <h3 className="mt-3 font-display text-xl">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-300">{p.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
