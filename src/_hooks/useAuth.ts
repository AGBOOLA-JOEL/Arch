"use client";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/_lib/store/auth-store";
import { useGenselectors } from "@/_lib/store/general-store";
import useModalStore from "@/_lib/store/modal-store";
import axios from "axios";

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

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/auth/login`,
        data
        // JSON.stringify(data)
      );

      closeModal();

      return res.data;
    },
    onSuccess: (data) => {
      const { access_token, message } = data;
      login(access_token);
      openToast(message, 3000);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message;
      openToast(message, 3000);
      closeModal();
      logout();
    },
  });

  return { loginMutation };
};
