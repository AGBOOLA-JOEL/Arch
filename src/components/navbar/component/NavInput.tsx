// migrating
"use client";
import { TfiSearch } from "react-icons/tfi";
import { MdOutlineCancel } from "react-icons/md";
import { useNavselectors } from "@/_lib/store/nav-store";

const NavInput = () => {
  const toggle = useNavselectors.use.toggle();
  const toggleState = useNavselectors.use.toggleState();
  return (
    <div className="navinput-container">
      {toggle ? (
        <MdOutlineCancel className="exp_navicon" onClick={toggleState} />
      ) : (
        <TfiSearch className="navicon" onClick={toggleState} />
      )}

      <input
        type="text"
        name="text"
        className={`navinput ${toggle ? "expanded" : ""}`}
        placeholder="Enter search"
        autoComplete="off"
      />
    </div>
  );
};

export default NavInput;
