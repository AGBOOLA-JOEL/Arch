"use client";
import { useAdminProject, useProjectStatus } from "@/_hooks/useProjectStatus";
import { useUser } from "@/_hooks/useUser";
import DashStatus from "@/components/dashboard/DashStatus";
import ArchPagination from "@/components/general/ArchPagination";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";

import React, { useState } from "react";

const Page = () => {
  const { pendingProjects, isLoading } = useAdminProject();

  const [currentItems, setCurrentItems] = useState<any[]>([]);
  return (
    <>
      <div className="dash_statuspage">
        {!isLoading ? (
          <>
            <DashStatus
              type={"project"}
              statustype="Pending"
              data={currentItems}
            />
            {pendingProjects.length && (
              <ArchPagination
                type="Columns"
                data={pendingProjects}
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
