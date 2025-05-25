"use client";
import { useMutation } from "@tanstack/react-query";
import { useGenselectors } from "@/_lib/store/general-store";
import useModalStore from "@/_lib/store/modal-store";
import axios from "axios";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { PasswordData } from "@/types/forms.type";

export const useForms = () => {
  const { closeModal } = useModalStore();
  const openToast = useGenselectors.use.openToast();

  const router = useRouter();

  const verifymailMutation = useMutation({
    mutationFn: async ({
      userid,
      tokenid,
    }: {
      userid: string;
      tokenid: string;
    }) => {
      const res = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_BACKEND_URL
        }/auth/verify-email/${userid}${"?"}${"token"}=${tokenid}`
      );

      return res.data;
    },
    onSuccess: () => {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    },
  });

  const forgotMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}auth/request-password-reset`,
        data
      );

      return res.data;
    },
    onSuccess: () => {
      router.push("/check-mail/forgot");
      closeModal();
    },
    onError: () => {
      openToast("Something went wrong,try again later");
      closeModal();
    },
  });
  const passresetMutation = useMutation({
    mutationFn: async ({
      data,
      token,
      userid,
    }: {
      data: any;
      token: string;
      userid: string;
    }) => {
      const res = await axios.post(
        `${process.env.REACT_APP_CACHE_URL}/auth/reset-password/${token}/${userid}`,
        data
      );

      return res.data;
    },
    onSuccess: (data) => {
      openToast(data?.message, 3000);
      router.push("/check-mail/forgot");
      closeModal();
    },
    onError: () => {
      openToast("Something went wrong,try again later", 300);
      closeModal();
    },
  });

  return {
    forgotMutation,
    verifymailMutation,
    passresetMutation,
  };
};
