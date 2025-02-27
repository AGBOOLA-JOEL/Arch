"use client";
import dynamic from "next/dynamic";

const ArchSoon = dynamic(() => import("../components/general/ArchSoon"), {
  ssr: false,
});
const page = () => {
  return (
    <div className="portfolio">
      <ArchSoon soontitle="architectural portfolio" />;
    </div>
  );
};

export default page;
