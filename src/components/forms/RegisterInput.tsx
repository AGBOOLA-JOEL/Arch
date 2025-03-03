"use client";

import { useGenselectors } from "@/_lib/store/general-store";
import { RegInputProp } from "@/types/forms.type";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const RegisterInput = ({
  isPassword,
  label,
  name,
  onChange,
  register,
}: RegInputProp) => {
  const toggle = useGenselectors.use.toggle();
  const toggleState = useGenselectors.use.toggleState();

  return (
    <div className="reg_input">
      <input
        type={isPassword ? (toggle ? "password" : "text") : "text"}
        placeholder={label}
        {...register(name)}
        // value={value}
        name={name}
        onChange={onChange}
      />
      <label htmlFor="">{label}</label>
      {isPassword && (
        <div className="reg_inputtoggle" onClick={toggleState}>
          {!toggle ? <FaRegEye /> : <FaRegEyeSlash />}
        </div>
      )}
    </div>
  );
};

export default RegisterInput;
