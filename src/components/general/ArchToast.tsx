"use client";
import { useGenselectors } from "@/_lib/store/general-store";
import { HiOutlineX } from "react-icons/hi";
import { LuInfo } from "react-icons/lu";

const ArchToast = () => {
  const closeToast = useGenselectors.use.closeToast();
  const toast = useGenselectors.use.toast();

  return (
    <>
      {toast && (
        <div className="arch_toast">
          <LuInfo />

          <p>{toast}</p>

          <HiOutlineX
            onClick={() => {
              closeToast();
            }}
          />
        </div>
      )}
    </>
  );
};

export default ArchToast;
