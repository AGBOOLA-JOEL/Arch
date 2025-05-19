"use client";
import React, { useState } from "react";
import DashUploadDrive from "./DashUploadDrive";
import DashUploadDnd from "./DashUploadDnd";

const DashUploadImages = ({ data, setValue }: { data: any; setValue: any }) => {
  const [apiFolders, setApiFolders] = useState<any[]>([]);

  return (
    <div>
      <DashUploadDnd setValue={setValue} />
      <DashUploadDrive
        setApiFolders={setApiFolders}
        id={data?.googleDriveLink}
      />
    </div>
  );
};

export default DashUploadImages;
