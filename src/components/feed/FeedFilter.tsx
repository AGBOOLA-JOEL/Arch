"use client";
import { ArchSelectFilter } from "@/types/general.type";
import { FiX } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";

const FeedFilter = ({ value, setValue, title }: ArchSelectFilter) => {
  const handleClick = () => {
    setValue("All");
    if (value === "All") {
      setValue("");
    }
  };

  return (
    <button
      className={`feed_filter ${value ? "selected" : ""}`}
      onClick={handleClick}
    >
      {value === "All" ? <FiX /> : <CiFilter />}
      <span>{title}</span>
    </button>
  );
};

export default FeedFilter;
