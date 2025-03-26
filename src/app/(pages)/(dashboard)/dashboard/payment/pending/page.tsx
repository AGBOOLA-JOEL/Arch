"use client";
import DashStatus from "@/components/dashboard/DashStatus";
import ArchPagination from "@/components/general/ArchPagination";

import React, { useState } from "react";

const Page = () => {
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  return (
    <>
      <div className="dash_statuspage">
        {[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }].map(
          ({ id }) => (
            <div key={id}>
              <DashStatus type={"payment"} />
            </div>
          )
        )}
      </div>
      <ArchPagination
        type="Columns"
        data={["1"]}
        setCurrentItems={setCurrentItems}
      />
    </>
  );
};

export default Page;
