import React from "react";
import { IoSendSharp } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useDetectClickOutside } from "react-detect-click-outside";
type SearchProp = {
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
};
const NavSearch = ({ setSearch }: SearchProp) => {
  const closeSearch = () => {
    setSearch(false);
  };
  const searchref = useDetectClickOutside({ onTriggered: closeSearch });

  return (
    <div className="nav_sch" ref={searchref}>
      <div className="nav_schinput">
        <CiSearch />
        <input type="text" placeholder="Search for anything.." />
      </div>

      <div className="nav_schbtn">
        <FaTimes onClick={closeSearch} />
        <IoSendSharp />
      </div>
    </div>
  );
};

export default NavSearch;
