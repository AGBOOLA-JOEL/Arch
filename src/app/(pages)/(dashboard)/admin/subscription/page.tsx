"use client";
import DashStatus from "@/components/dashboard/DashStatus";
import ArchPagination from "@/components/general/ArchPagination";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";
import React, { useState } from "react";
import { useSubscription } from "@/_hooks/useSubscription";
import DashFilter from "@/components/dashboard/DashFilter";

const Page = () => {
  const { subscriptions, isLoading } = useSubscription();

  const [currentItems, setCurrentItems] = useState<any[]>([]);
  return (
    <>
      <>
        <DashFilter
          options={filterOptions}
          data={subscriptions || []}
          filterField="type"
          onFilter={setCurrentItems}
        />
      </>
      <div className="dash_statuspage">
        {!isLoading ? (
          <>
            <DashStatus type={"admin-subscribe"} data={currentItems} />
            {subscriptions?.length > 0 && (
              <ArchPagination
                type="Columns"
                data={subscriptions}
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
  { label: "Monthly", value: "month", matchValue: "Month" },
  { label: "Yearly", value: "year", matchValue: "YEARLY" },
  { label: "Quarterly", value: "quarter", matchValue: "QUARTER" },
];
