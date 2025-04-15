"use client";
import { ArchSelectProp } from "@/types/general.type";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useDetectClickOutside } from "react-detect-click-outside";

const ArchSelect = ({ value, onChange, options, title }: ArchSelectProp) => {
  const [open, setOpen] = useState(false);
  const toggleDrop = () => setOpen((prev) => !prev);
  const handleClick = (select: any) => {
    onChange(select);
    setOpen(false);
  };
  const closeSelect = () => {
    setOpen(false);
  };
  const selectref = useDetectClickOutside({ onTriggered: closeSelect });

  return (
    <div className="arch_select" ref={selectref}>
      <button
        className="arch_selectbtn"
        onClick={toggleDrop}
        aria-expanded={open}
      >
        <span>{value || title}</span>
        <FaAngleDown />
      </button>
      {open && (
        <ul className={`arch_selectdrop ${options.length > 2 && "scroll"}`}>
          {options.map((select) => {
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

export default ArchSelect;
