// migrating
"use client";
import { TfiSearch } from "react-icons/tfi";
import { MdOutlineCancel } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";

type NavInputProp = {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
};

const NavInput = ({ isExpanded, setIsExpanded }: NavInputProp) => {
  const toggleInput = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="navinput-container">
      {isExpanded ? (
        <MdOutlineCancel className="exp_navicon" onClick={toggleInput} />
      ) : (
        <TfiSearch className="navicon" onClick={toggleInput} />
      )}

      <input
        type="text"
        name="text"
        className={`navinput ${isExpanded ? "expanded" : ""}`}
        placeholder="Enter search"
        autoComplete="off"
      />
    </div>
  );
};

export default NavInput;
