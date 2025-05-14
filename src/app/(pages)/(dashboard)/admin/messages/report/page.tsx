// "use client";
// import { useMessages } from "@/_hooks/useMessages";
// import { useReport } from "@/_hooks/useReport";
// import DashStatus from "@/components/dashboard/DashStatus";
// import SkeletonStatus from "@/components/skeleton/skeletonstatus";

// import React from "react";

// const Page = () => {
//   const { reports, isLoading } = useReport();
//   return (
//     <div className="dash_statuspage">
//       {!isLoading ? (
//         <DashStatus type={"admin-report"} data={reports} />
//       ) : (
//         <div className="dash_statusskeleton">
//           <SkeletonStatus />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;

"use client";
import DashStatus from "@/components/dashboard/DashStatus";
import ArchPagination from "@/components/general/ArchPagination";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";

import React, { useState } from "react";
import { useReport } from "@/_hooks/useReport";

const Page = () => {
  const { reports, isLoading } = useReport();

  const [currentItems, setCurrentItems] = useState<any[]>([]);
  return (
    <>
      <div className="dash_statuspage">
        {!isLoading ? (
          <>
            <DashStatus type={"admin-report"} data={currentItems} />
            {reports?.length > 0 && (
              <ArchPagination
                type="Columns"
                data={reports}
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
