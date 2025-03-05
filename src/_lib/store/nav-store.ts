import { createWithEqualityFn } from "zustand/traditional";
import { createSelectors } from "./create-selectors";

type NavStoretype = {
  toggle: boolean;
  toggleState: () => void;
};
export const useNavstore = createWithEqualityFn<NavStoretype>((set) => ({
  toggle: false,
  toggleState: () => set((state) => ({ toggle: !state.toggle })),
}));

export const useNavselectors = createSelectors(useNavstore);
