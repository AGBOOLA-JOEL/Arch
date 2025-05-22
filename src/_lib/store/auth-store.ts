import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { createSelectors } from "./create-selectors";

type UserPayload = {
  userId: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  exp: number;
};

type AuthState = {
  accessToken: string | null;
  user: UserPayload | null;
  loggedIn: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  loggedIn: false,

  login: (accessToken, refreshToken) => {
    try {
      const decoded: UserPayload = jwtDecode(accessToken);
      const expiresAt = decoded.exp * 1000;
      if (Date.now() > expiresAt) throw new Error("Access token expired");

      const decodedRef: any = jwtDecode(refreshToken);
      const refExpiresAt = decodedRef.exp * 1000;
      if (Date.now() > refExpiresAt) throw new Error("Refresh token expired");

      document.cookie = `refreshToken=${refreshToken}; Path=/; SameSite=Strict; Expires=${new Date(
        refExpiresAt
      ).toUTCString()}`;
      document.cookie = `role=${
        decoded.role
      }; Path=/; SameSite=Strict; Expires=${new Date(
        refExpiresAt
      ).toUTCString()}`;

      set({ accessToken, user: decoded, loggedIn: true });
    } catch {
      set({ accessToken: null, user: null, loggedIn: false });
    }
  },

  logout: () => {
    document.cookie = "refreshToken=; Max-Age=0; Path=/; SameSite=Strict";
    document.cookie = "role=; Max-Age=0; Path=/; SameSite=Strict";
    set({ accessToken: null, user: null, loggedIn: false });

    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  },

  setAccessToken: (token) => {
    try {
      const decoded: UserPayload = jwtDecode(token);
      set({ accessToken: token, user: decoded, loggedIn: true });
    } catch {
      set({ accessToken: null, user: null, loggedIn: false });
    }
  },
}));

export default useAuthStore;
export const useAuthselectors = createSelectors(useAuthStore);
