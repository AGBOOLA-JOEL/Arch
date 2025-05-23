import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Async interceptor to inject access token
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { api };
