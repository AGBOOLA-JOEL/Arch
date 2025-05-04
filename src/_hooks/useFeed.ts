"use client";
import { useMutation } from "@tanstack/react-query";
import { useGenselectors } from "@/_lib/store/general-store";
import useModalStore from "@/_lib/store/modal-store";

import { api } from "@/services/api";
import { useRouter } from "next/navigation";

type ReportNewsType = {
  category: string[];
  reason: string | null;
};
export const useFeed = () => {
  const { closeModal } = useModalStore();
  const openToast = useGenselectors.use.openToast();

  const router = useRouter();

  const reportMutation = useMutation({
    mutationFn: async ({ data, id }: { data: ReportNewsType; id: any }) => {
      const res = await api.post(`/news/${id}/report`, data);
      return res.data;
    },
    onSuccess: () => {
      closeModal();
      openToast("Your report has been submitted successfully", 3000);
    },
    onError: () => {
      closeModal();
      openToast("Error reporting post, try again later", 3000);
    },
  });

  return {
    reportMutation,
  };
};
