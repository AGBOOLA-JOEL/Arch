"use client";

import React from "react";
import dynamic from "next/dynamic";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
}

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ArchQuill: React.FC<QuillEditorProps> = ({ value }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      readOnly
      modules={{ toolbar: false }}
    />
  );
};

export default ArchQuill;
