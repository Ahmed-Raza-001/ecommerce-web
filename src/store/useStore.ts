import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string | number) => boolean;
  clearWishlist: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],

      addToCart: (product: Product, quantity = 1) => {
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) => String(item.product.id) === String(product.id)
          );
          if (existingIndex > -1) {
            const updated = [...state.cart];
            updated[existingIndex].quantity += quantity;
            return { cart: updated };
          }
          return { cart: [...state.cart, { product, quantity }] };
        });
      },

      removeFromCart: (productId: string | number) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => String(item.product.id) !== String(productId)
          ),
        }));
      },

      updateQuantity: (productId: string | number, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter(
                (item) => String(item.product.id) !== String(productId)
              ),
            };
          }
          return {
            cart: state.cart.map((item) =>
              String(item.product.id) === String(productId)
                ? { ...item, quantity }
                : item
            ),
          };
        });
      },

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (product: Product) => {
        set((state) => {
          const exists = state.wishlist.some(
            (item) => String(item.id) === String(product.id)
          );
          if (exists) {
            return {
              wishlist: state.wishlist.filter(
                (item) => String(item.id) !== String(product.id)
              ),
            };
          }
          return { wishlist: [...state.wishlist, product] };
        });
      },

      isInWishlist: (productId: string | number) => {
        return get().wishlist.some(
          (item) => String(item.id) === String(productId)
        );
      },

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "jewellery-storefront-storage",
    }
  )
);
