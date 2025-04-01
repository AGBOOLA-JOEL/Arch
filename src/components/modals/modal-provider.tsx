"use client";
import useModalStore from "@/_lib/store/modal-store";
import ModalLoading from "./modal-loading";
import { useEffect } from "react";
import ModalLogout from "./modal-logout";

const ModalProvider = () => {
  const { activeModal, closeModal } = useModalStore();

  useEffect(() => {
    if (activeModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [activeModal]);
  return (
    <div
      id="modal-root"
      style={{ display: `${activeModal !== null ? "flex" : "none"}` }}
    >
      {activeModal === "loading" && (
        <ModalLoading isOpen={true} onClose={closeModal} />
      )}

      {activeModal === "logout" && (
        <ModalLogout isOpen={true} onClose={closeModal} />
      )}
    </div>
  );
};

export default ModalProvider;
