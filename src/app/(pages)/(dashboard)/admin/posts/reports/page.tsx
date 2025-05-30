"use client";
import { useAdminProject, useProjectStatus } from "@/_hooks/useProjectStatus";
import { usePostReport } from "@/_hooks/useReport";
import { useUser } from "@/_hooks/useUser";
import DashStatus from "@/components/dashboard/DashStatus";
import ArchPagination from "@/components/general/ArchPagination";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";

import React, { useState } from "react";

const Page = () => {
  const { postReports, isLoading } = usePostReport();

  const [currentItems, setCurrentItems] = useState<any[]>([]);
  return (
    <>
      <div className="dash_statuspage">
        {!isLoading ? (
          <>
            <DashStatus type={"admin-postreport"} data={currentItems} />
            {postReports?.length > 0 && (
              <ArchPagination
                type="Columns"
                data={postReports}
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
