// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export { api };

import { jwtDecode } from "jwt-decode";
import useAuthStore from "@/_lib/store/auth-store";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/token/refresh")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          return parts.length === 2
            ? parts.pop()?.split(";").shift() || null
            : null;
        };

        const refreshToken = getCookie("refreshToken");
        if (!refreshToken) {
          useAuthStore.getState().logout();
          return Promise.reject(new Error("No refresh token"));
        }

        const response = await axios.post(`${baseURL}/auth/token/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        useAuthStore.getState().setAccessToken(accessToken);

        const decodedRef: any = jwtDecode(newRefreshToken);
        const refExpiresAt = decodedRef.exp * 1000;

        document.cookie = `refreshToken=${newRefreshToken}; Path=/; SameSite=Strict; Expires=${new Date(
          refExpiresAt
        ).toUTCString()}`;

        const decoded: any = jwtDecode(accessToken);
        document.cookie = `role=${
          decoded.role
        }; Path=/; SameSite=Strict; Expires=${new Date(
          refExpiresAt
        ).toUTCString()}`;

        processQueue(null, accessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export { api };
