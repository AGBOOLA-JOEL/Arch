import { createWithEqualityFn } from "zustand/traditional";

type GenStoretype = {
  toggle: boolean;
  toggleState: () => void;
};
export const useGenstore = createWithEqualityFn<GenStoretype>((set) => ({
  toggle: false,
  toggleState: () => set((state) => ({ toggle: !state.toggle })),
}));
