import React from "react";
import ArchButton from "../general/ArchButton";

type BtnProp = {
  id: string;
};
const ReportBtn = ({ id }: BtnProp) => {
  const handleBtn = () => {};
  return <ArchButton name="Report" onClick={handleBtn} />;
};

export default ReportBtn;
