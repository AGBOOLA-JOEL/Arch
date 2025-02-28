"use client";
import dynamic from "next/dynamic";

const ArchSoon = dynamic(() => import("@components/general/ArchSoon"), {
  ssr: false,
});
const page = () => {
  return (
    <div className="archmedia">
      <ArchSoon soontitle="architectural media" />;
    </div>
  );
};

export default page;
