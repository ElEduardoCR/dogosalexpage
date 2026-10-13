import type { Metadata, Viewport } from "next";
import { Inter, Anton, Caveat } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-script",
  display: "swap",
  // Solo decora textos pequeños ("desde 1990"); no compite con el hero al cargar
  preload: false,
});

export const metadata: Metadata = {
  title: "Dogos El Alex · Desde 1990 — Dogos y Burgers en Chihuahua",
  description:
    "Salchicha de pavo, tocino gourmet y aderezos desde 1990. Pide por WhatsApp o DiDi Food. El sabor que ya es parte de la familia.",
  keywords: [
    "dogos chihuahua",
    "hamburguesas chihuahua",
    "dogo clásico",
    "la monster",
    "dogos el alex",
    "comida rápida chihuahua",
  ],
  openGraph: {
    title: "Dogos El Alex · Desde 1990",
    description:
      "El sabor que ya es parte de la familia. Dogos y burgers en Chihuahua.",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dogos El Alex · Desde 1990",
    description:
      "El sabor que ya es parte de la familia. Dogos y burgers en Chihuahua.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f25c00",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${anton.variable} ${caveat.variable}`}>
      <body className="bg-cream text-ink-900">
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "#141418",
              color: "#fff",
              border: "1px solid #f25c00",
            },
          }}
        />
      </body>
    </html>
  );
}
