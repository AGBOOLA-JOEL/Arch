"use client";
import { useMessages } from "@/_hooks/useMessages";
import DashStatus from "@/components/dashboard/DashStatus";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";

import React from "react";

const Page = () => {
  const { messages, isLoading } = useMessages();
  return (
    <div className="dash_statuspage">
      {!isLoading ? (
        <DashStatus type={"messages"} data={messages} msgtype="all" />
      ) : (
        <div className="dash_statusskeleton">
          <SkeletonStatus />
        </div>
      )}
    </div>
  );
};

export default Page;
