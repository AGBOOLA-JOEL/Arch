"use client";
import SubmitForm from "@/components/forms/SubmitForm";
import SubmitInfo from "@/components/forms/SubmitInfo";
import ArchSelect from "@/components/general/ArchSelect";
import { useState } from "react";

const Submit = () => {
  const [select, setSelect] = useState("Project");
  return (
    <div className="submit">
      <SubmitInfo />

      <div className="submit_select">
        <ArchSelect
          title={"Project"}
          value={select}
          setValue={setSelect}
          options={["Comic", "Project"]}
        />
      </div>

      {select === "Comic" && <p>comic</p>}
      {select === "Project" && <SubmitForm />}
    </div>
  );
};

export default Submit;
