import DashStatus from "@/components/dashboard/DashStatus";

import React from "react";

const Page = () => {
  return (
    <div className="dash_statuspage">
      {[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }].map(({ id }) => (
        <div key={id}>
          <DashStatus type={"payment"} />
        </div>
      ))}
    </div>
  );
};

export default Page;
