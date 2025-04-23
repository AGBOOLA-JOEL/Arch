import { useGenselectors } from "@/_lib/store/general-store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useDownloadTemplate = () => {
  const openToast = useGenselectors.use.openToast();
  const download = useMutation({
    mutationFn: async () => {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/format/download`,
        responseType: "blob", // Treat response as a blob
      });

      // Create a temporary anchor element
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(new Blob([response.data]));
      downloadLink.setAttribute(
        "download",
        "Architectural submission template (ARCHCACHE).zip"
      );

      // Append the anchor element to the body and trigger a click event to start download
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Clean up
      document.body.removeChild(downloadLink);

      console.log("File downloaded successfully.");
    },
    onSuccess: () => {
      openToast("File downloaded successfully", 3000);
    },
    onError: (error) => {
      openToast("Failed to download template", 3000);
      console.error("Download failed:", error);
    },
  });

  return { download };
};
