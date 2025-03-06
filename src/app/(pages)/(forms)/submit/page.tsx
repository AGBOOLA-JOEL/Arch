"use client";
import SubmitInfo from "@/components/forms/SubmitInfo";
import SubmitSelect from "@/components/forms/SubmitSelect";
import { useState } from "react";

const Submit = () => {
  const [value, setValue] = useState("");
  return (
    <div className="submit">
      <SubmitInfo />

      <SubmitSelect value={value} setValue={setValue} />
      {}
      {}
    </div>
  );
};

export default Submit;
