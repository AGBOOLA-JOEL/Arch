"use client";
import { ArchTextareaProp } from "@/types/general.type";
import React, { useState } from "react";

const ArchTextarea = ({
  label,
  register,
  watch,
  placeholder,
  maxword,
}: ArchTextareaProp) => {
  const desc = watch("desc") || "";

  return (
    <div className="arch_textarea">
      <p>
        {label} (
        <span>
          <span>
            {desc.length} / {maxword}
          </span>
        </span>
        )
      </p>
      <textarea
        placeholder={placeholder}
        {...register("desc")}
        name={"desc"}
        maxLength={maxword}
      ></textarea>
    </div>
  );
};

export default ArchTextarea;
