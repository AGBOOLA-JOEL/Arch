"use client";
import DashStatus from "@/components/dashboard/DashStatus";
import ArchPagination from "@/components/general/ArchPagination";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";
import React, { useState } from "react";
import DashFilter from "@/components/dashboard/DashFilter";
import { useAdminPayment } from "@/_hooks/usePayment";

const Page = () => {
  const { pendingPayments, isLoading } = useAdminPayment();

  const [currentItems, setCurrentItems] = useState<any[]>([]);
  return (
    <>
      <>
        <DashFilter
          options={filterOptions}
          data={pendingPayments || []}
          filterField="paymentStatus"
          onFilter={setCurrentItems}
        />
      </>
      <div className="dash_statuspage">
        {!isLoading ? (
          <>
            <DashStatus
              type={"admin-payment"}
              data={currentItems}
              statustype="Approved"
            />
            {pendingPayments?.length > 0 && (
              <ArchPagination
                type="Columns"
                data={pendingPayments}
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

export const filterOptions = [
  { label: "All", value: "all", matchValue: "" },
  { label: "No Receipt", value: "pending", matchValue: "PENDING" },
  { label: "With Receipt", value: "with", matchValue: "UNDER-REVIEW" },
];
