"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useModalStore from "@/_lib/store/modal-store";
import { useNavigationBlockerStore } from "@/_lib/store/navigation-blocker-store";

export const useNavigationBlocker = () => {
  const pathname = usePathname();
  const router = useRouter(); // using router from next/navigation
  const { isBlocking } = useNavigationBlockerStore();
  const { openModal } = useModalStore();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url !== pathname && isBlocking) {
        // Use a delayed call to openModal to ensure it's not during render phase
        setTimeout(() => {
          openModal("profile");
        }, 0);
        // Block navigation if there are unsaved changes
        throw new Error("Blocked navigation due to unsaved changes.");
      }
    };

    // Override history.pushState and history.replaceState to catch navigation
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      handleRouteChange(args[2]?.toString() || "");
      return originalPushState.apply(this, args);
    };

    history.replaceState = function (...args) {
      handleRouteChange(args[2]?.toString() || "");
      return originalReplaceState.apply(this, args);
    };

    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      if (isBlocking) {
        e.preventDefault();
        // Prevent the unload event
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, [isBlocking, pathname, openModal]);
};
