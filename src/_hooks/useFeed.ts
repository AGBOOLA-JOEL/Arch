"use client";
import { useMutation } from "@tanstack/react-query";
import { useGenselectors } from "@/_lib/store/general-store";
import useModalStore from "@/_lib/store/modal-store";

import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { PostNewsData } from "@/types/forms.type";

type ReportNewsType = {
  category: string[];
  reason: string | null;
};
export const useFeed = () => {
  const { closeModal } = useModalStore();
  const openToast = useGenselectors.use.openToast();

  const router = useRouter();

  const postMutation = useMutation({
    mutationFn: async (data: PostNewsData) => {
      const res = await api.post(`/news/create-news`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      openToast("Your post has been published successfully", 3000);
    },
    onError: () => {
      openToast("Sorry, something went wrong. Please try again later.", 3000);
    },
  });

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
    postMutation,
    reportMutation,
  };
};
