"use client";
import { useAdminPayment } from "@/_hooks/usePayment";
import DashStatus from "@/components/dashboard/DashStatus";
import ArchPagination from "@/components/general/ArchPagination";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";

import React, { useState } from "react";

const Page = () => {
  const { rejectedPayments, isLoading } = useAdminPayment();

  const [currentItems, setCurrentItems] = useState<any[]>([]);
  return (
    <>
      <div className="dash_statuspage">
        {!isLoading ? (
          <>
            <DashStatus
              type={"admin-payment"}
              data={currentItems}
              statustype="Rejected"
            />
            {rejectedPayments.length > 0 && (
              <ArchPagination
                type="Columns"
                data={rejectedPayments}
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
