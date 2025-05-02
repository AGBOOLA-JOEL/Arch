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
    // setDrop((prev) => !prev);
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
        <span>{value || title}</span>
        {value ? (
          <FiX
            onClick={() => {
              setValue("");
              setOpen(false);
            }}
          />
        ) : (
          <FaAngleDown
            className={`feed_dropdownsvg ${open === true ? "rotate" : ""}`}
          />
        )}
      </button>
      {open && (
        <>
          {title === "Area" && (
            <FeedArea setValue={setValue} setOpen={setOpen} />
          )}
          {title === "Year" && (
            <FeedYear value={value} setValue={setValue} setOpen={setOpen} />
          )}
          {title === "Type" && (
            <FeedType
              setValue={setValue}
              setOpen={setOpen}
              option={["Basic", "Premium"]}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FeedDropdown;
