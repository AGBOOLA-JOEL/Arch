import { useGenselectors } from "@/_lib/store/general-store";

export const copyToClipBoard = (
  data: string,
  openToast: (message: string, duration: number) => void
) => {
  //   const openToast = useGenselectors.use.openToast();
  const textToCopy = data;

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Text copied to clipboard");
        openToast("copied to clipboard", 3000);
        // Optionally, you can show a success message here
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard:", err);
        // Optionally, you can show an error message here
      });
  } else {
    console.error("Clipboard API not available");
    // Optionally, you can provide a fallback for browsers that don't support Clipboard API
  }
};
