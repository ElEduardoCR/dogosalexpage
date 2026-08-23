"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "./menu";

export interface CartLine {
  itemId: string;
  name: string;
  unitPrice: number;
  qty: number;
  image: string;
  notes?: string;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  add: (item: MenuItem, qty?: number) => void;
  remove: (itemId: string) => void;
  setQty: (itemId: string, qty: number) => void;
  setNotes: (itemId: string, notes: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  count: () => number;
  subtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      add: (item, qty = 1) => {
        const existing = get().lines.find((l) => l.itemId === item.id);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.itemId === item.id ? { ...l, qty: l.qty + qty } : l,
            ),
          });
        } else {
          set({
            lines: [
              ...get().lines,
              {
                itemId: item.id,
                name: item.name,
                unitPrice: item.price,
                qty,
                image: item.image,
              },
            ],
          });
        }
      },
      remove: (itemId) =>
        set({ lines: get().lines.filter((l) => l.itemId !== itemId) }),
      setQty: (itemId, qty) => {
        if (qty <= 0) {
          set({ lines: get().lines.filter((l) => l.itemId !== itemId) });
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.itemId === itemId ? { ...l, qty } : l,
          ),
        });
      },
      setNotes: (itemId, notes) =>
        set({
          lines: get().lines.map((l) =>
            l.itemId === itemId ? { ...l, notes } : l,
          ),
        }),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
      count: () => get().lines.reduce((acc, l) => acc + l.qty, 0),
      subtotal: () =>
        get().lines.reduce((acc, l) => acc + l.unitPrice * l.qty, 0),
    }),
    {
      name: "dogosalex-cart",
      partialize: (s) => ({ lines: s.lines }),
    },
  ),
);
