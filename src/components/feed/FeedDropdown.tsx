"use client";
import { FeedDropdownProp } from "@/types/general.type";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FiX } from "react-icons/fi";

import FeedArea from "./FeedArea";
import FeedYear from "./FeedYear";
import { useDetectClickOutside } from "react-detect-click-outside";
import FeedType from "./FeedType";

const FeedDropdown = ({ value, setValue, title }: FeedDropdownProp) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setValue((prev) => !prev);
    setOpen((prev) => !prev);
  };
  const closeSelect = () => {
    setOpen(false);
  };
  const selectref = useDetectClickOutside({ onTriggered: closeSelect });
  return (
    <div className="feed_dropdown" ref={selectref}>
      <button
        className={`feed_dropdownbtn ${value ? "selected" : ""}`}
        onClick={handleClick}
      >
        <span>{title}</span>
        {value == true ? (
          <FiX
          // onClick={() => {
          //   setValue((prev) => !prev);
          // }}
          />
        ) : (
          <FaAngleDown />
        )}
      </button>
      {open && (
        <>
          {title === "Area" && <FeedArea />}
          {title === "Year" && <FeedYear />}
          {title === "Type" && <FeedType />}
        </>
      )}
    </div>
  );
};

export default FeedDropdown;
