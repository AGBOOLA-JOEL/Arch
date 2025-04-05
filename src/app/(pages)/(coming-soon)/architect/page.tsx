"use client";
import dynamic from "next/dynamic";

const ArchSoon = dynamic(() => import("@/components/general/ArchSoon"), {
  ssr: false,
});
const page = () => {
  return (
    <div className="arch_soonpages">
      <ArchSoon soontitle="architect info" />;
    </div>
  );
};

export default page;
