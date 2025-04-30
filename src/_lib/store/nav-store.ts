// import { createWithEqualityFn } from "zustand/traditional";
import { persist, PersistOptions } from "zustand/middleware";
import { createSelectors } from "./create-selectors";
import { create } from "zustand";

type NavStoretype = {
  toggle: boolean;
  cartLength: number | null;
  setCartLength: (length: number) => void;
  toggleState: () => void;
};
// 🛠 Fix: extend PersistOptions properly

export const useNavstore = create<NavStoretype>()(
  persist(
    (set) => ({
      toggle: false,
      cartLength: null,
      toggleState: () => set((state) => ({ toggle: !state.toggle })),
      setCartLength: (cartLength) => set({ cartLength }),
    }),
    {
      name: "nav-storage",
      partialize: (state) => ({
        cartLength: state.cartLength,
      }),
    }
  )
);

export const useNavselectors = createSelectors(useNavstore);
