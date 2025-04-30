import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { createSelectors } from "./create-selectors";
import { useNavstore } from "./nav-store";
 
type Subscription = {
  expiryDate: string | null;
  userPlan: string;
};

type UserPayload = {
  userId: string;
  username: string;
  email: string;
  institution: string;
  subscription: Subscription;
  verified: boolean;
  rank: string;
  role: "USER" | "ADMIN";
  exp: number;
};

type AuthState = {
  loggedIn: boolean | null;
  user: UserPayload | null;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loggedIn: false,
      user: null,
      accessToken: null,
      login: async (token) => {
        try {
          const decoded: UserPayload = jwtDecode(token);

          const expiresAt = decoded.exp * 1000; // Convert to milliseconds
          if (Date.now() > expiresAt) {
            set({ loggedIn: false, user: null, accessToken: null });
            return;
          }
          set({ loggedIn: true, user: decoded, accessToken: token });
          localStorage.setItem("accessToken", token);
          localStorage.setItem("expiresAt", String(expiresAt));
        } catch (error) {
          console.error("Invalid token", error);
        }
      },
      logout: async () => {
        set({ loggedIn: false, user: null, accessToken: null });
        await useAuthStore.persist.clearStorage();
        await useNavstore.persist.clearStorage();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("expiresAt");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ loggedIn: state.loggedIn }),
    }
  )
);

export default useAuthStore;

export const useAuthselectors = createSelectors(useAuthStore);
