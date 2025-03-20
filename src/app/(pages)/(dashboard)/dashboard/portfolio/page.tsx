import ArchDnd from "@/components/general/ArchDnd";
import React from "react";

const Page = () => {
  return (
    <div className="dash_portfolio">
      <i className="dash_porttitle">Upload your portfolio image below:</i>
      <div className="dash_portcoverimg">
        <ArchDnd header={"Drop your image here"} />
      </div>
    </div>
  );
};

export default Page;
