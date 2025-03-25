import DashStatus from "@/components/dashboard/DashStatus";

import React from "react";

const Page = () => {
  return (
    <div className="dash_statuspage">
      {[
        { id: 1, status: "unread" },
        { id: 2, status: "unread" },
        { id: 3, status: "unread" },
        { id: 4, status: "unread" },
        { id: 5, status: "unread" },
      ].map(({ id, status }) => (
        <div key={id} style={{ opacity: `${status === "unread" ? 1 : 0.5}` }}>
          <DashStatus type={"messages"} />
        </div>
      ))}
    </div>
  );
};

export default Page;
