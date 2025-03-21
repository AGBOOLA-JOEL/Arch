"use client";
import { ArchTextareaProp } from "@/types/general.type";
import React, { useState } from "react";

const ArchTextarea = ({
  label,

  textarea,
  setTextarea,
  desc,
  maxword,
}: ArchTextareaProp) => {
  const [textCount, setTextCount] = useState(0);
  const handleTextareaChange = (event: any) => {
    const inputValue = event.target.value;
    setTextCount(inputValue.length);

    if (inputValue.length <= maxword) {
      setTextarea(inputValue);
    }
  };
  return (
    <div className="arch_textarea">
      <p>
        {desc} (
        <span>
          {textCount} / {maxword}
        </span>
        )
      </p>
      <textarea
        placeholder={label}
        value={textarea}
        name={"description"}
        onChange={handleTextareaChange}
      ></textarea>
    </div>
  );
};

export default ArchTextarea;
