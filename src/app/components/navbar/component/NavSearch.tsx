import React from "react";
import { IoSendSharp } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const NavSearch = () => {
  return (
    <div className="nav_sch">
      <div className="nav_schinput">
        <CiSearch />
        <input type="text" placeholder="Search for anything.." />
      </div>

      <div className="nav_schbtn">
        <FaTimes />
        <IoSendSharp />
      </div>
    </div>
  );
};

export default NavSearch;
