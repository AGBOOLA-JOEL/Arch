"use client";
import { useGenselectors } from "@/_lib/store/general-store";
import { copyToClipBoard } from "@/_utils/copytoclipboard";
import React from "react";
import { MdCopyAll } from "react-icons/md";

const DashClipboard = ({ value }: { value: string }) => {
  const openToast = useGenselectors.use.openToast();
  return (
    <div className="dash_clipboard">
      <p>{value}</p>
      <span
        onClick={() => {
          copyToClipBoard(value, openToast);
        }}
      >
        <MdCopyAll />
      </span>
    </div>
  );
};

export default DashClipboard;
