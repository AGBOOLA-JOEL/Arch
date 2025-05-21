"use client";
import { useMutation } from "@tanstack/react-query";
import { useGenselectors } from "@/_lib/store/general-store";
import useModalStore from "@/_lib/store/modal-store";

import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { DashUploadData, PostNewsData } from "@/types/forms.type";
// import { setTimeout } from "timers/promises";

type UploadProjectType = {
  data: DashUploadData;
  isDevice: boolean;
  isStrict: boolean;
  id: string;
};
export const useUpload = (proid: any) => {
  const { closeModal } = useModalStore();
  const openToast = useGenselectors.use.openToast();

  const router = useRouter();

  const uploadMutation = useMutation({
    mutationFn: async ({ data, id, isDevice, isStrict }: UploadProjectType) => {
      const route = isDevice
        ? `/admin/projects/${id}/approve?strict_check=${
            isStrict ? "true" : "false"
          }`
        : `/admin/projects/${id}/approve-with-google-drive`;
      const res = await api.patch(route, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: async () => {
      try {
        await api.post("/email/send-mail", {
          name: proid?.user?.user, // update as needed
          email: proid?.user?.email,
        });
        console.log("Email sent");
      } catch (err) {
        setTimeout(() => {
          openToast("Error sending mail", 3000);
        }, 5000);
      }
      router.replace(`/admin/projects/approved`);
      closeModal();
      openToast("Project has been uploaded successfully", 3000);
    },
    onError: (error: any) => {
      closeModal();
      openToast(error?.response?.data?.message, 3000);
    },
  });

  return {
    uploadMutation,
  };
};
