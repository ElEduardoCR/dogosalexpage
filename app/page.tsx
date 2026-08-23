import { Hero } from "@/components/hero";
import { MenuSection } from "@/components/menu-section";
import { Story } from "@/components/story";
import { Contact } from "@/components/contact";
import { FloatingCTA } from "@/components/floating-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MenuSection />
      <Story />
      <Contact />
      <FloatingCTA />
    </>
  );
}
