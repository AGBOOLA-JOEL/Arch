// migrating
"use client";
import { TfiSearch } from "react-icons/tfi";
import { MdOutlineCancel } from "react-icons/md";
import { shallow } from "zustand/shallow";
import { useGenstore } from "@/app/lib/store/general-store";

const NavInput = () => {
  const { toggle, toggleState } = useGenstore(
    (state) => ({
      toggle: state.toggle,
      toggleState: state.toggleState,
    }),
    shallow
  );
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
