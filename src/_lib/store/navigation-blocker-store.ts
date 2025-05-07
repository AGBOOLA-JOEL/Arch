// _lib/store/navigation-blocker-store.ts
import { create } from "zustand";

interface NavigationBlockerState {
  isBlocking: boolean;
  confirmed: boolean;
  setBlocking: (val: boolean) => void;
  setConfirmed: (val: boolean) => void;
}

export const useNavigationBlockerStore = create<NavigationBlockerState>(
  (set) => ({
    isBlocking: false,
    confirmed: false,
    setBlocking: (val) => set({ isBlocking: val }),
    setConfirmed: (val) => set({ confirmed: val }),
  })
);
