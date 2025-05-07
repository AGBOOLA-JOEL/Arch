"use client";
import { useMessages } from "@/_hooks/useMessages";
import DashStatus from "@/components/dashboard/DashStatus";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";

import React from "react";

const Page = () => {
  const { messages, isLoading } = useMessages();
  const filteredmsg = messages?.filter((data: any) => data?.hasRead === false);
  return (
    <div className="dash_statuspage">
      {!isLoading ? (
        <DashStatus type={"messages"} data={filteredmsg} msgtype="unread" />
      ) : (
        <div className="dash_statusskeleton">
          <SkeletonStatus />
        </div>
      )}
    </div>
  );
};

export default Page;
