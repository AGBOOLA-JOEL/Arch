"use client";

import { useEffect, useState } from "react";

const DashUploadType = ({ data, setValue }: { data: any; setValue: any }) => {
  const [built, setBuilt] = useState<boolean | null>(data?.built ?? null);

  useEffect(() => {
    if (data?.built !== undefined) {
      setBuilt(data.built);
      setValue("built", data.built);
    }
  }, [data?.built, setValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isBuilt = e.target.value === "Built";
    setValue("built", isBuilt);
    setBuilt(isBuilt);
    console.log("Built:", isBuilt);
  };
  return (
    <div className="dash_uploadtype">
      <div className={`dash_uploadtypeinput ${built === false && "disabled"} `}>
        <p>Built Project (B): </p>
        <input
          type="radio"
          value="Built"
          name="isBuilt"
          checked={built === true}
          onChange={handleInputChange}
        />
      </div>

      <div className={`dash_uploadtypeinput ${built === true && "disabled"} `}>
        <p>Unbuilt Project (P): </p>
        <input
          type="radio"
          value="Unbuilt"
          name="isBuilt"
          checked={built === false}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default DashUploadType;
