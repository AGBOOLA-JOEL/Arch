import { create } from "zustand";
import { createSelectors } from "./create-selectors";

type GenStoretype = {
  toggle: boolean;
  toggleState: () => void;

  toast: string | null;
  openToast: (message: string, duration?: number) => void;
  closeToast: () => void;
};
export const useGenstore = create<GenStoretype>((set) => ({
  toggle: false,
  toggleState: () => set((state) => ({ toggle: !state.toggle })),

  toast: null,
  openToast: (message, duration) => {
    set({ toast: message });

    // setTimeout(() => {
    //   set({ toast: null });
    // }, duration);
  },
  closeToast: () => set({ toast: null }),
}));

export const useGenselectors = createSelectors(useGenstore);

// // global state for toast notification
// interface ToastState {
//   toast: string | null;
//   openToast: (message: string, duration?: number) => void;
//   closeToast: () => void;
// }

// const useToastStore = create<ToastState>((set) => ({
//   toast: null,
//   openToast: (message, duration) => {
//     set({ toast: message });

//     setTimeout(() => {
//       set({ toast: null });
//     }, duration);
//   },
//   closeToast: () => set({ toast: null }),
// }));

// export default useToastStore;
