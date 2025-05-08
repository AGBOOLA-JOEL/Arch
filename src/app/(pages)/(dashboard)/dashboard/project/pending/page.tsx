"use client";
import { useProjectStatus } from "@/_hooks/useProjectStatus";
import { useUser } from "@/_hooks/useUser";
import DashStatus from "@/components/dashboard/DashStatus";
import ArchPagination from "@/components/general/ArchPagination";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";

import React, { useState } from "react";

const Page = () => {
  const { prostatus, isLoading } = useProjectStatus();
  const { user } = useUser();

  const filterData =
    prostatus
      ?.filter((data: any) => data?.user?.user === user?.username)
      .filter((data: any) => data?.status === "PENDING") || [];

  const [currentItems, setCurrentItems] = useState<any[]>([]);
  return (
    <>
      <div className="dash_statuspage">
        {!isLoading ? (
          <>
            <DashStatus
              type={"project"}
              projecttype="Pending"
              data={currentItems}
            />
            {filterData.length && (
              <ArchPagination
                type="Columns"
                data={filterData}
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
    </>
  );
};

export default Page;
