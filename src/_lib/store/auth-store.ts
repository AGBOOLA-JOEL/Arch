import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
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
  loggedIn: boolean;
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
      logout: () => {
        set({ loggedIn: false, user: null, accessToken: null });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("expiresAt");
      },
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;
