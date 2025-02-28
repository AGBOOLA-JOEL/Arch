"use client";
import dynamic from "next/dynamic";

const ArchSoon = dynamic(() => import("@components/general/ArchSoon"), {
  ssr: false,
});
const page = () => {
  return (
    <div className="compet">
      <ArchSoon soontitle="competitions page" />;
    </div>
  );
};

export default page;
