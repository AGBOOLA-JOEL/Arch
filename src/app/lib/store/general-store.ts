import { createWithEqualityFn } from "zustand/traditional";
import { createSelectors } from "./create-selectors";

type GenStoretype = {
  toggle: boolean;
  toggleState: () => void;
};
export const useGenstore = createWithEqualityFn<GenStoretype>((set) => ({
  toggle: false,
  toggleState: () => set((state) => ({ toggle: !state.toggle })),
}));

export const useGenselectors = createSelectors(useGenstore);
