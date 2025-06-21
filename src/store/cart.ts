import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  variantId?: string;
  productId?: string;
  quantity: number;
}

interface CartState {
  _hasHydrated: boolean;
  items: CartItem[];
  addItem: (item: { variantId?: string; productId?: string }) => void;
  removeItem: (item: { variantId?: string; productId?: string }) => void;
  updateQuantity: (
    item: { variantId?: string; productId?: string },
    quantity: number
  ) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      items: [],
      addItem: ({ variantId, productId }) =>
        set((state) => {
          // For products with variants, use variantId as the key
          const key = variantId || productId;
          if (!key) return state;

          const existingItem = state.items.find((item) => {
            if (variantId) {
              return item.variantId === variantId;
            }
            return item.productId === productId;
          });

          if (existingItem) {
            return {
              items: state.items.map((item) => {
                if (variantId && item.variantId === variantId) {
                  return { ...item, quantity: item.quantity + 1 };
                }
                if (productId && item.productId === productId) {
                  return { ...item, quantity: item.quantity + 1 };
                }
                return item;
              }),
            };
          }
          return {
            items: [...state.items, { variantId, productId, quantity: 1 }],
          };
        }),
      removeItem: ({ variantId, productId }) =>
        set((state) => ({
          items: state.items.filter((item) => {
            if (variantId) {
              return item.variantId !== variantId;
            }
            return item.productId !== productId;
          }),
        })),
      updateQuantity: ({ variantId, productId }, quantity) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (variantId && item.variantId === variantId) {
              return { ...item, quantity };
            }
            if (productId && item.productId === productId) {
              return { ...item, quantity };
            }
            return item;
          }),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true;
        }
      },
    }
  )
);

export default useCartStore;
