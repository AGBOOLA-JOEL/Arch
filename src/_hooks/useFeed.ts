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
    onSuccess: async (res) => {
      router.replace(`/news/${res?.data?.postId}`);
      closeModal();
      openToast(res?.description, 3000);

      await fetch("/api/revalidate/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET,
        }),
      });
    },
    onError: (err: any) => {
      openToast(
        err?.response?.data?.message ||
          "Error occured while creating news, try again later",
        3000
      );
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
