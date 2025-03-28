"use client";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/_lib/store/auth-store";
import { useGenselectors } from "@/_lib/store/general-store";
import useModalStore from "@/_lib/store/modal-store";

export const useAuth = () => {
  const { login, logout } = useAuthStore();
  const { openModal, closeModal } = useModalStore();
  const openToast = useGenselectors.use.openToast();

  useEffect(() => {
    const expiresAt = localStorage.getItem("expiresAt");
    if (expiresAt && Date.now() > Number(expiresAt)) {
      logout();
    }
  }, [logout]);

  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      openModal("loading");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

      closeModal();

      if (!res.ok) throw new Error("Login failed");
      return res.json();
    },
    onSuccess: (data) => {
      const { access_token, message } = data;
      login(access_token);
      openToast(message, 5000);
    },
    onError: () => {
      closeModal();
      logout();
    },
  });

  return { loginMutation };
};
