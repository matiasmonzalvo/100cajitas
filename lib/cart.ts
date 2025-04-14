"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  selectedOption?: string | null;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (
    id: string,
    quantity: number,
    option?: string | null
  ) => void;
  removeFromCart: (id: string, option?: string | null) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (cartItem) =>
              cartItem.id === item.id &&
              cartItem.selectedOption === item.selectedOption
          );

          if (existingItemIndex !== -1) {
            // Item already exists, update quantity
            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex].quantity += item.quantity;
            return { cart: updatedCart };
          } else {
            // Add new item
            return { cart: [...state.cart, item] };
          }
        }),

      updateQuantity: (id, quantity, option) =>
        set((state) => {
          const updatedCart = state.cart.map((item) => {
            if (item.id === id && item.selectedOption === option) {
              return { ...item, quantity };
            }
            return item;
          });
          return { cart: updatedCart };
        }),

      removeFromCart: (id, option) =>
        set((state) => {
          const updatedCart = state.cart.filter(
            (item) => !(item.id === id && item.selectedOption === option)
          );
          return { cart: updatedCart };
        }),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);

export const useCart = () => {
  const store = useCartStore();
  return {
    cart: store.cart,
    addToCart: store.addToCart,
    updateQuantity: store.updateQuantity,
    removeFromCart: store.removeFromCart,
    clearCart: store.clearCart,
  };
};
