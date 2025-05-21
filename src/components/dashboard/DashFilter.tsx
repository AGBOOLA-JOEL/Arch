// "use client";

// import React, { useState, useEffect } from "react";

// interface FilterOption {
//   label: string; // Placeholder name like "Monthly"
//   value: string; // Value used to filter like "month"
//   matchValue: string; // Value expected in data.type like "Month", "YEARLY"
// }

// interface FilterComponentProps {
//   options: FilterOption[];
//   data: any[];
//   onFilter: (filtered: any[]) => void;
// }

// const DashFilter: React.FC<FilterComponentProps> = ({
//   options,
//   data,
//   onFilter,
// }) => {
//   const [activeFilter, setActiveFilter] = useState<string>("all");

//   const handleFilter = (filterType: string) => {
//     setActiveFilter(filterType);
//     if (filterType === "all") {
//       onFilter(data);
//     } else {
//       const selectedOption = options.find((opt) => opt.value === filterType);
//       if (!selectedOption) return;
//       const filteredData = data.filter((item) =>
//         item.type.includes(selectedOption.matchValue)
//       );
//       onFilter(filteredData.slice(0, 6));
//     }
//   };

//   return (
//     <div className="dash_filter">
//       {options.map((option) => (
//         <p
//           key={option.value}
//           className={`dash_filtervalue ${
//             activeFilter === option.value ? "all" : "unread"
//           }`}
//           onClick={() => handleFilter(option.value)}
//         >
//           {option.label}
//         </p>
//       ))}
//     </div>
//   );
// };

// export default DashFilter;

// "use client";

// import React, { useState } from "react";

// interface FilterOption {
//   label: string;
//   value: string;
//   matchValue: string;
// }

// interface FilterComponentProps {
//   options: FilterOption[];
//   data: any[];
//   onFilter: (filtered: any[]) => void;
// }

// const DashFilter: React.FC<FilterComponentProps> = ({
//   options,
//   data,
//   onFilter,
// }) => {
//   const [activeFilter, setActiveFilter] = useState<string>("all");

//   const handleFilter = (filterType: string) => {
//     setActiveFilter(filterType);

//     let filteredData: any[] = [];

//     if (filterType === "all") {
//       filteredData = data.slice(0, 6); // <-- slice here too
//     } else {
//       const selectedOption = options.find((opt) => opt.value === filterType);
//       if (!selectedOption) return;
//       filteredData = data
//         .filter((item) => item.type.includes(selectedOption.matchValue))
//         .slice(0, 6); // already slicing here
//     }

//     onFilter(filteredData);
//   };

//   return (
//     <div className="dash_filter">
//       {options.map((option) => (
//         <p
//           key={option.value}
//           className={`dash_filtervalue ${
//             activeFilter === option.value ? "all" : "unread"
//           }`}
//           onClick={() => handleFilter(option.value)}
//         >
//           {option.label}
//         </p>
//       ))}
//     </div>
//   );
// };

// export default DashFilter;

"use client";

import React, { useState } from "react";

interface FilterOption {
  label: string;
  value: string;
  matchValue: string;
}

interface FilterComponentProps {
  options: FilterOption[];
  data: any[];
  onFilter: (filtered: any[]) => void;
  filterField: string; // <-- New: field to filter by, e.g., "type" or "paymentStatus"
}

const DashFilter: React.FC<FilterComponentProps> = ({
  options,
  data,
  onFilter,
  filterField,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleFilter = (filterType: string) => {
    setActiveFilter(filterType);

    let filteredData: any[] = [];

    if (filterType === "all") {
      filteredData = data.slice(0, 6);
    } else {
      const selectedOption = options.find((opt) => opt.value === filterType);
      if (!selectedOption) return;

      filteredData = data
        .filter((item) =>
          item?.[filterField]?.includes(selectedOption.matchValue)
        )
        .slice(0, 6);
    }

    onFilter(filteredData);
  };

  return (
    <div className="dash_filter">
      {options?.map((option) => (
        <p
          key={option.value}
          className={`dash_filtervalue ${
            activeFilter === option.value ? "all" : "unread"
          }`}
          onClick={() => handleFilter(option?.value)}
        >
          {option?.label}
        </p>
      ))}
    </div>
  );
};

export default DashFilter;
