"use client";
import { useAdminPayment } from "@/_hooks/usePayment";
import { useAdminProject, useProjectStatus } from "@/_hooks/useProjectStatus";
import { useUser } from "@/_hooks/useUser";
import DashStatus from "@/components/dashboard/DashStatus";
import ArchPagination from "@/components/general/ArchPagination";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";

import React, { useState } from "react";

const Page = () => {
  const { approvedProjects, isLoading } = useAdminProject();

  const [currentItems, setCurrentItems] = useState<any[]>([]);
  return (
    <>
      <div className="dash_statuspage">
        {!isLoading ? (
          <>
            <DashStatus
              type={"project"}
              statustype="Approved"
              data={currentItems}
            />
            {approvedProjects.length > 0 && (
              <ArchPagination
                type="Columns"
                data={approvedProjects}
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
