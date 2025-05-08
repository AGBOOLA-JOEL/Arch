"use client";
import DashStatus from "@/components/dashboard/DashStatus";
import ArchPagination from "@/components/general/ArchPagination";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";

import React, { useState } from "react";
import { usePaymentStatus } from "@/_hooks/usePayment";

const Page = () => {
  const { paystatus, isLoading } = usePaymentStatus();

  const filterData =
    paystatus?.filter((data: any) => data.paymentStatus === "REJECTED") || [];

  const [currentItems, setCurrentItems] = useState<any[]>([]);
  return (
    <>
      <div className="dash_statuspage">
        {!isLoading ? (
          <>
            <DashStatus type={"payment"} data={currentItems} />
            {filterData.length > 0 && (
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
