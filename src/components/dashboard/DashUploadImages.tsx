"use client";
import React, { useEffect, useState } from "react";
import DashUploadDrive from "./DashUploadDrive";
import DashUploadDnd from "./DashUploadDnd";
import DashImageControl from "./DashImageControl";

const DashUploadImages = ({
  data,
  setValue,
  isStrict,
  setIsStrict,
  resetField,
}: {
  data: any;
  setValue: any;
  isStrict: boolean;
  setIsStrict: React.Dispatch<React.SetStateAction<boolean>>;
  resetField: any;
}) => {
  const [isDevice, setIsDevice] = useState(false);
  const strictFields = [
    "coverImage",
    "threeDImages",
    "sitePlan",
    "floorPlan",
    "elevations",
    "sections",
    "details",
    "otherImages",
  ];

  useEffect(() => {
    if (isStrict) {
      // Optional: prefill or enforce reset logic
    } else {
      // Reset only the strict-controlled fields
      strictFields.forEach((field: any) => {
        resetField(field, {
          keepDirty: false,
          keepTouched: false,
          defaultValue: null, // or [] for arrays
        });
      });
    }
  }, [isStrict]);
  return (
    <>
      <DashImageControl
        isStrict={isStrict}
        setIsStrict={setIsStrict}
        isDevice={isDevice}
        setIsDevice={setIsDevice}
      />

      {isDevice ? (
        <DashUploadDnd setValue={setValue} />
      ) : (
        <DashUploadDrive id={data?.googleDriveLink} setValue={setValue} />
      )}
    </>
  );
};

export default DashUploadImages;
