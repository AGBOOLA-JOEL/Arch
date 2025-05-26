"use client";
import { useMessages } from "@/_hooks/useMessages";
import DashStatus from "@/components/dashboard/DashStatus";
import ArchPagination from "@/components/general/ArchPagination";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";

import React, { useState } from "react";

const Page = () => {
  const { messages, isLoading, refetchMessages } = useMessages();

  const [currentItems, setCurrentItems] = useState<any[]>([]);
  return (
    <div className="dash_statuspage">
      {!isLoading ? (
        <>
          <DashStatus
            type={"messages"}
            data={currentItems}
            msgtype="all"
            refetch={refetchMessages}
          />
          {messages.length > 0 && (
            <ArchPagination
              type="Columns"
              data={messages}
              setCurrentItems={setCurrentItems}
            />
          )}
        </>
      ) : (
        <div className="dash_statusskeleton">
          <SkeletonStatus />
        </div>
      )}
    </div>
  );
};

export default Page;
