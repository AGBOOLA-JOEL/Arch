"use client";
import { useMutation } from "@tanstack/react-query";
import { useGenselectors } from "@/_lib/store/general-store";
import useModalStore from "@/_lib/store/modal-store";

import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { ContactMoreData, PostNewsData } from "@/types/forms.type";

type ReportNewsType = {
  category: string[];
  reason: string | null;
};
export const useContact = () => {
  const { closeModal } = useModalStore();
  const openToast = useGenselectors.use.openToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactMoreData) => {
      const res = await api.post(`/report`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: (res) => {
      closeModal();
      openToast(res?.message, 3000);
    },
    onError: (err: any) => {
      closeModal();
      openToast(err?.response?.data?.message, 3000);
    },
  });

  return {
    contactMutation,
  };
};
