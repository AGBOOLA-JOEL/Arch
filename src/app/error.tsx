"use client";

import ArchButton from "@/components/general/ArchButton";
import ArchFuzzy from "@/components/general/ArchFuzzy";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <div className="arch_notfound">
      <ArchFuzzy
        baseIntensity={0.2}
        hoverIntensity={0.1}
        enableHover={true}
        fontSize={"6rem"}
      >
        Something went wrong!
      </ArchFuzzy>
      <ArchFuzzy
        baseIntensity={0.2}
        hoverIntensity={0.1}
        enableHover={false}
        fontSize={"4rem"}
      >
        {error.message}
      </ArchFuzzy>
      <ArchButton
        variant="primary"
        name="Try again"
        type="button"
        onClick={() => {
          reset();
        }}
      />
    </div>
  );
}
