"use client";
import { useMutation } from "@tanstack/react-query";
import { useGenselectors } from "@/_lib/store/general-store";
import useModalStore from "@/_lib/store/modal-store";

import { api } from "@/services/api";
import { useRouter } from "next/navigation";

export const useInfo = () => {
  const route = useRouter();
  const { closeModal } = useModalStore();
  const openToast = useGenselectors.use.openToast();

  const upgradeMutation = useMutation({
    mutationFn: async (data: number) => {
      const res = await api.post(`/payment/subscription/initialize`, {
        amount: data,
      });
      return res.data;
    },
    onSuccess: (res) => {
      route.push(`/dashboard/payment/message/${res?.data?.paymentId}`);
    },
    onError: (err: any) => {
      openToast(err?.response?.data?.message, 3000);
    },
  });

  return {
    upgradeMutation,
  };
};
