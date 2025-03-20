// export default ImageDropBox;
import { Deleteicon } from "assets/svg/Deleteicon";
import React, { useState, useRef, useContext } from "react";
import { MdLockPerson } from "react-icons/md";
import "../../styles/compstyle/portbox.css";
import { mainContext } from "pages/hooks/Context";

const ArchPortDnd = ({ onImageChange, header, status }) => {
  return (
    <div className="portbox">
       
        <div
          // className="userpf_drop"
          className="port-img-select"
          style={{ width: "170px", height: "120px" }}
        >
          <label className="userpf_btn">browse and drop files</label>
        </div>

     

    
        <div className="portbox_lock">
          <MdLockPerson fill="#113A5A" />
        </div>
   
      <div
        
       
      >
         <p className="portbox_primary">primary</p>}
 <Deleteicon />}
      </div>
    </div>
  );
};

export default ArchPortDnd;
