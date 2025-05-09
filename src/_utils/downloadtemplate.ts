import { useGenselectors } from "@/_lib/store/general-store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useNavselectors } from "@/_lib/store/nav-store";

export const useDownloadTemplate = ({ filename }: { filename: string }) => {
  const queryClient = useQueryClient(); // ✅ Add this
  const openToast = useGenselectors.use.openToast();
  const setCartLength = useNavselectors.use.setCartLength();
  const download = useMutation({
    mutationFn: async (route: string) => {
      const response = await api.get(`${route}`);
      // return response.data;
      // const response = await api.get(

      //    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}${route}`,
      //   responseType: "blob", // Treat response as a blob
      // );

      // Create a temporary anchor element
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(new Blob([response.data]));
      downloadLink.setAttribute("download", filename);

      // Append the anchor element to the body and trigger a click event to start download
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Clean up
      document.body.removeChild(downloadLink);

      console.log("File downloaded successfully.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      const { data } = await api.get(`/cart`); // ✅ manually fetch cart data after adding
      setCartLength(data?.data?.cart?.length || null);
      openToast("File downloaded successfully", 3000);
    },
    onError: (error: any) => {
      openToast(error?.response?.data?.message, 3000);
      // console.error("Download failed:", error);
    },
  });

  return { download };
};
