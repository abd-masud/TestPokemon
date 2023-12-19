import { create } from 'zustand';

export const useCartCount = create<{ random: number; setRandom: () => void }>(
  (set) => ({
    random: 0,
    setRandom: () =>
      set((state: { random: number }) => ({
        random: Math.ceil(Math.random() * 500),
      })),
  })
);

type Store = {
  count: number;
  AddToCart: () => void;
  removeCartCount: () => void;
  CartStore: Array<string>;
  pushCartId: (id: string) => void;
  removeCartId: (id: string) => void;
};

const useCart = create<Store>((set) => ({
  count: 0,
  CartStore: [],
  AddToCart: () => set((state) => ({ count: state.count + 1 })),
  removeCartCount: () => set((state) => ({ count: state.count - 1 })),
  pushCartId: (id: string) => set((state) => ({ CartStore: [...state.CartStore, id] })),
  removeCartId: (id) => set((state) => {
    state.CartStore.splice(state.CartStore.indexOf(id), 1);

    return {
      CartStore: [...state.CartStore],
    };
  }),
}));

export default useCart;