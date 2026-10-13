"use client";

import type { MenuItem } from "@/lib/menu";
import { useCart } from "@/lib/store";

/**
 * Botón mínimo que agrega un item y abre el carrito. Permite que secciones
 * como el Hero sean Server Components y solo este botón se hidrate.
 */
export function AddAndOpenCartButton({
  item,
  className,
  children,
}: {
  item: MenuItem;
  className?: string;
  children: React.ReactNode;
}) {
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);

  return (
    <button
      type="button"
      onClick={() => {
        add(item);
        openCart();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
