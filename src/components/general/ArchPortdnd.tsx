// export default ImageDropBox;

import React from "react";
import { MdLockPerson } from "react-icons/md";
import { GoTrash } from "react-icons/go";

const ArchPortDnd = () => {
  return (
    <div className="arch_portdnd">
      <div className="arch_portdndmap">
        <div className="arch_portdndlabel">
          <label>browse and drop files</label>
        </div>

        {/* <div className="arch_portdndlock">
          <MdLockPerson />
        </div> */}

        <div className="arch_portdndtrash">
          <p>primary</p>
          <GoTrash />
        </div>
      </div>
      {[{ id: 1 }, { id: 2 }, { id: 3 }].map(({ id }) => (
        <div className="arch_portdndmap" key={id}>
          <div className="arch_portdndlabel">
            <label>browse and drop files</label>
          </div>

          <div className="arch_portdndlock">
            <MdLockPerson />
          </div>

          <div className="arch_portdndtrash">
            {/* <p>primary</p>
            <GoTrash /> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArchPortDnd;
