"use client";
import { ArchSelectProp, FeedSelectProp } from "@/types/general.type";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useDetectClickOutside } from "react-detect-click-outside";
import { FiX } from "react-icons/fi";

const FeedSelect = ({ value, setValue, options, title }: FeedSelectProp) => {
  const [open, setOpen] = useState(false);
  const toggleDrop = () => setOpen((prev) => !prev);
  const handleClick = (select: any) => {
    setValue(select);
    setOpen(false);
  };
  const closeSelect = () => {
    setOpen(false);
  };
  const selectref = useDetectClickOutside({ onTriggered: closeSelect });

  return (
    <div className="feed_select" ref={selectref}>
      <button
        className={`feed_selectbtn ${value ? "selected" : ""}`}
        aria-expanded={open}
      >
        <span>{value || title}</span>
        {value ? (
          <FiX
            onClick={() => {
              setValue("");
            }}
          />
        ) : (
          <FaAngleDown onClick={toggleDrop} />
        )}
      </button>
      {open && (
        <ul className={`feed_selectdrop ${options?.length > 2 && "scroll"}`}>
          {options?.map((select) => {
            return (
              <li key={select} onClick={() => handleClick(select)}>
                {select}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FeedSelect;
