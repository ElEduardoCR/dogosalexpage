import Image from "next/image";
import { ArrowRight, Star, MapPin, Clock } from "lucide-react";
import { RESTAURANT } from "@/lib/whatsapp";
import { MENU } from "@/lib/menu";
import { AddAndOpenCartButton } from "./add-to-cart-button";

const bestsellers = MENU.filter((m) => m.badge === "Bestseller").slice(0, 3);

// Server Component: las animaciones de entrada son CSS para que el contenido
// (y la imagen LCP) se pinten con el HTML, sin esperar a la hidratación.
export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20"
    >
      {/* Decorative blobs */}
      <div className="glow -left-32 top-20 h-96 w-96 text-brand-300/40" />
      <div className="glow -right-20 top-40 h-80 w-80 text-brand-200/50" />
      <div className="glow left-1/2 bottom-0 h-72 w-[600px] -translate-x-1/2 text-brand-400/20" />

      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left: text */}
          <div className="relative z-10">
            <div className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border-2 border-brand-500/30 bg-brand-50/80 px-4 py-1.5 text-sm font-semibold text-brand-700">
              <Star className="h-3.5 w-3.5 fill-brand-500 text-brand-500" />
              El sabor de Chihuahua desde 1990
            </div>

            <h1 className="animate-fade-up font-display text-6xl leading-[0.95] text-ink-900 [animation-delay:100ms] sm:text-7xl lg:text-8xl">
              El que
              <br />
              todos <span className="text-brand-500">se llevan.</span>
            </h1>

            <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-ink-600 [animation-delay:250ms] sm:text-xl">
              35+ años de dogos, burgers y burritos con receta de casa. Ahora
              arma tu pedido en línea y recíbelo sin hacer fila.
            </p>

            <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:400ms]">
              <a href="#menu" className="btn-primary group">
                Ver menú
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <AddAndOpenCartButton item={bestsellers[0]} className="btn-ghost">
                Pedir el clásico
              </AddAndOpenCartButton>
            </div>

            <div className="mt-10 flex animate-fade-in flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-600 [animation-delay:550ms]">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand-500" />
                {RESTAURANT.city}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-500" />
                {RESTAURANT.hours}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-brand-500 text-brand-500" />
                Receta familiar
              </span>
            </div>
          </div>

          {/* Right: hero card */}
          <div className="relative animate-pop-in">
            <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-brand-500 shadow-float">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700" />
              <div className="absolute inset-0 grain" />
              <Image
                src={bestsellers[0].image}
                alt={bestsellers[0].name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 500px"
                className="object-cover mix-blend-luminosity opacity-90 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 animate-fade-up rounded-2xl bg-cream/95 p-5 [animation-delay:700ms] [animation-duration:500ms]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-500">
                      ⭐ El bestseller
                    </div>
                    <div className="mt-1 font-display text-3xl text-ink-900">
                      Dogo Clásico
                    </div>
                    <div className="mt-1 text-sm text-ink-500">
                      Salchicha de pavo, tocino y aderezos
                    </div>
                  </div>
                  <div className="shrink-0 rounded-full bg-brand-500 px-4 py-2 font-display text-2xl text-white">
                    $42
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-6 hidden animate-float rounded-2xl bg-white px-4 py-2.5 shadow-xl [animation-duration:3s] sm:block">
                <div className="text-xs font-bold uppercase text-ink-500">Desde</div>
                <div className="font-display text-2xl text-brand-500">1990</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bestseller strip */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {bestsellers.slice(1).map((item, i) => (
            <div
              key={item.id}
              className="animate-fade-up [animation-duration:500ms]"
              style={{ animationDelay: `${600 + i * 100}ms` }}
            >
              <AddAndOpenCartButton
                item={item}
                className="group flex h-full w-full items-center gap-4 rounded-3xl bg-white p-4 text-left shadow-[0_2px_20px_-10px_rgba(0,0,0,0.15)] transition-[box-shadow,translate] duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_-15px_rgba(242,92,0,0.4)]"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-brand-50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-500">
                    {item.badge}
                  </div>
                  <div className="mt-0.5 font-display text-xl text-ink-900">
                    {item.name}
                  </div>
                  <div className="mt-1 text-sm text-ink-500">Tap para agregar</div>
                </div>
                <div className="shrink-0 font-display text-2xl text-brand-500">
                  ${item.price}
                </div>
              </AddAndOpenCartButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
