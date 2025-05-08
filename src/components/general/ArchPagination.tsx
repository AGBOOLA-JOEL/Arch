// import React, { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
// import {
//   IoIosArrowBack,
//   IoIosArrowForward,
//   IoIosArrowDown,
// } from "react-icons/io";

// interface ArchPaginationProps {
//   data: any[];
//   type: "Rows" | "Columns";
//   setCurrentItems: (items: any[]) => void;
// }

// const ArchPagination: React.FC<ArchPaginationProps> = ({
//   data,
//   type,
//   setCurrentItems,
// }) => {
//   const [itemsPerPage, setItemsPerPage] = useState(6);
//   const [itemOffset, setItemOffset] = useState(0);

//   const endOffset = itemOffset + itemsPerPage;
//   const pageCount = Math.ceil(data.length / itemsPerPage);

//   // ✅ Ensure dependency array length is constant
//   useEffect(() => {
//     setCurrentItems(data.slice(itemOffset, endOffset));
//   }, [itemOffset, endOffset, data]); // 🚀 Removed `setCurrentItems` from dependencies

//   const handlePageClick = (event: { selected: number }) => {
//     const newOffset = (event.selected * itemsPerPage) % data.length;
//     setItemOffset(newOffset);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="arch_paginate">
//       <div className="arch_paginateinput">
//         <p>{type} per page:</p>
//         <div className="arch_paginatedown">
//           <input
//             type="number"
//             min="2"
//             value={type === "Rows" ? itemsPerPage / 3 : itemsPerPage}
//             onChange={(e) => {
//               const newValue = parseInt(e.target.value, 10);
//               if (!isNaN(newValue)) {
//                 setItemsPerPage(type === "Rows" ? newValue * 3 : newValue);
//               }
//             }}
//           />
//           <label>{<IoIosArrowDown />}</label>
//         </div>
//       </div>

//       <div className="reactPaginate">
//         <p>
//           {itemOffset + 1} - {endOffset} of {data.length}
//         </p>
//         <ReactPaginate
//           previousLabel={<IoIosArrowBack />}
//           nextLabel={<IoIosArrowForward />}
//           containerClassName="paginate"
//           pageCount={pageCount}
//           onPageChange={handlePageClick}
//         />
//       </div>
//     </div>
//   );
// };

// export default ArchPagination;
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ArchPaginationProps {
  data: any[];
  type: "Rows" | "Columns";
  setCurrentItems: (items: any) => void;
}

const ArchPagination: React.FC<ArchPaginationProps> = ({
  data,
  type,
  setCurrentItems,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [itemOffset, setItemOffset] = useState(0);

  const pageCount = Math.ceil(data.length / itemsPerPage);
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    setCurrentItems(data.slice(itemOffset, endOffset));
  }, [itemOffset, itemsPerPage, endOffset]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="arch_paginate">
      <div className="arch_paginateinput">
        <p>{type} per page:</p>
        <div className="arch_paginatedown">
          <input
            type="number"
            min="2"
            value={type === "Rows" ? itemsPerPage / 3 : itemsPerPage}
            onChange={(e) => {
              const newValue = parseInt(e.target.value, 10);
              if (!isNaN(newValue) && newValue > 0) {
                setItemsPerPage(type === "Rows" ? newValue * 3 : newValue);
                setItemOffset(0); // Reset to the first page when itemsPerPage changes
              }
            }}
          />
        </div>
      </div>

      <div className="reactPaginate">
        <p>
          {itemOffset + 1} - {endOffset} of {data.length}
        </p>
        <ReactPaginate
          previousLabel={<IoIosArrowBack />}
          nextLabel={<IoIosArrowForward />}
          containerClassName="paginate"
          pageCount={pageCount}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
};

export default ArchPagination;
