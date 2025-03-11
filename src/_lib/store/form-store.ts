import { createWithEqualityFn } from "zustand/traditional";
import { createSelectors } from "./create-selectors";

type FormStoretype = {
  toggle: boolean;
  toggleForm: () => void;
};
export const useFormstore = createWithEqualityFn<FormStoretype>((set) => ({
  toggle: false,
  toggleForm: () => set((state) => ({ toggle: !state.toggle })),
}));

export const useFormselectors = createSelectors(useFormstore);
