"use client";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/_lib/store/auth-store";
import { useGenselectors } from "@/_lib/store/general-store";
import useModalStore from "@/_lib/store/modal-store";
import axios from "axios";
import { JoinData, LoginData, SubmitData } from "@/types/forms.type";
import { useUser } from "./useUser";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

export const useAuth = () => {
  const { login, logout } = useAuthStore();
  const { openModal, closeModal } = useModalStore();
  const openToast = useGenselectors.use.openToast();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const expiresAt = localStorage.getItem("expiresAt");
    if (expiresAt && Date.now() > Number(expiresAt)) {
      logout();
    }
  }, [logout]);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
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
  const registerMutation = useMutation({
    mutationFn: async (data: Omit<JoinData, "letter" | "terms">) => {
      openModal("loading");

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/users/register`,
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      const { description } = data;
      closeModal();
      openToast(description, 3000);
      // navigate to checkmail page
      //then redirect to sign in page after
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message;
      closeModal();
      openToast(message, 3000);
    },
  });

  const newsletterMutation = useMutation({
    mutationFn: async (data: { email: string; username: string }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/newsletter-list`,
        {
          email: data.email,
          name: data.username,
        }
      );
      return res.data;
    },
  });

  const submitapi =
    user?.role === "USER"
      ? `/projects/submit-project`
      : `/projects/anonymous/submit-project`;
  const submitMutation = useMutation({
    mutationFn: async (data: Omit<SubmitData, "terms">) => {
      openModal("loading");
      const res = await api.post(submitapi, data);
      return res.data;
    },
    onSuccess: () => {
      // const { description } = data;
      router.push("/");
      closeModal();
      openToast("Project submitted ongoing review", 3000);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message;
      closeModal();
      openToast(message, 3000);
    },
  });

  return {
    loginMutation,
    newsletterMutation,
    registerMutation,
    submitMutation,
  };
};
