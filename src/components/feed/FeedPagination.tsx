import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ArchPaginationProps {
  data: any[];
  type: "Rows" | "Columns";
  setCurrentItems: (items: any[]) => void;
}

const FeedPagination: React.FC<ArchPaginationProps> = ({
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
    console.log("selected", event.selected);
  };

  return (
    <div className="feed_paginate">
      <div className="reactPaginate">
        <p>
          {itemOffset + 1} - {endOffset} of {data.length}
        </p>
        {/* <IoIosArrowBack />
        <IoIosArrowForward /> */}
      </div>
    </div>
  );
};

export default FeedPagination;
