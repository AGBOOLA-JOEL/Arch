"use client";

import { useEffect, useState } from "react";

const DashUploadPremium = ({
  data,
  setValue,
}: {
  data: any;
  setValue: any;
}) => {
  const [premium, setPremium] = useState<boolean>(false);

  useEffect(() => {
    setValue("isPremium", false);
  }, [premium, setValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isPremium = e.target.value === "Premium";
    setValue("isPremium", isPremium);
    setPremium(isPremium);
  };
  return (
    <div className="dash_uploadtype">
      <div
        className={`dash_uploadtypeinput ${premium === true && "disabled"} `}
      >
        <p>Basic</p>
        <input
          type="radio"
          value="Basic"
          name="isPremium"
          checked={premium === false}
          onChange={handleInputChange}
        />
      </div>
      <div
        className={`dash_uploadtypeinput ${premium === false && "disabled"} `}
      >
        <p>Premium</p>
        <input
          type="radio"
          value="Premium"
          name="isPremium"
          checked={premium === true}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default DashUploadPremium;
