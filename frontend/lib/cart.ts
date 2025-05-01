"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ItemCustomization {
  itemId: string;
  options: Record<string, string>;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  selectedOption?: string | null;
  customizations?: ItemCustomization[];
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (
    id: string,
    quantity: number,
    option?: string | null,
    customizations?: ItemCustomization[]
  ) => void;
  removeFromCart: (
    id: string,
    option?: string | null,
    customizations?: ItemCustomization[]
  ) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          // Create a unique identifier based on product ID, option, and customizations
          const customizationsKey = item.customizations
            ? JSON.stringify(
                item.customizations.sort((a, b) =>
                  a.itemId.localeCompare(b.itemId)
                )
              )
            : "";

          const existingItemIndex = state.cart.findIndex((cartItem) => {
            const cartCustomizationsKey = cartItem.customizations
              ? JSON.stringify(
                  cartItem.customizations.sort((a, b) =>
                    a.itemId.localeCompare(b.itemId)
                  )
                )
              : "";

            return (
              cartItem.id === item.id &&
              cartItem.selectedOption === item.selectedOption &&
              cartCustomizationsKey === customizationsKey
            );
          });

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

      updateQuantity: (id, quantity, option, customizations) =>
        set((state) => {
          const customizationsKey = customizations
            ? JSON.stringify(
                customizations.sort((a, b) => a.itemId.localeCompare(b.itemId))
              )
            : "";

          const updatedCart = state.cart.map((item) => {
            const itemCustomizationsKey = item.customizations
              ? JSON.stringify(
                  item.customizations.sort((a, b) =>
                    a.itemId.localeCompare(b.itemId)
                  )
                )
              : "";

            if (
              item.id === id &&
              item.selectedOption === option &&
              itemCustomizationsKey === customizationsKey
            ) {
              return { ...item, quantity };
            }
            return item;
          });
          return { cart: updatedCart };
        }),

      removeFromCart: (id, option, customizations) =>
        set((state) => {
          const customizationsKey = customizations
            ? JSON.stringify(
                customizations.sort((a, b) => a.itemId.localeCompare(b.itemId))
              )
            : "";

          const updatedCart = state.cart.filter((item) => {
            const itemCustomizationsKey = item.customizations
              ? JSON.stringify(
                  item.customizations.sort((a, b) =>
                    a.itemId.localeCompare(b.itemId)
                  )
                )
              : "";

            return !(
              item.id === id &&
              item.selectedOption === option &&
              itemCustomizationsKey === customizationsKey
            );
          });
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

export type { ItemCustomization, CartItem };
