"use client";

import { useRouter } from "next/navigation";

type BtnProp = {
  variant: "white" | "primary";
};

const ArchBack = ({ variant }: BtnProp) => {
  const router = useRouter();
  return (
    <button className={`arch_button ${variant}`} onClick={() => router.back()}>
      Go back
    </button>
  );
};

export default ArchBack;
