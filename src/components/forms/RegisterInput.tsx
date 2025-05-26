"use client";
import { FormInputProp } from "@/types/forms.type";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const RegisterInput = ({
  isPassword,
  label,
  name,
  onChange,
  register,
}: FormInputProp) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="reg_input">
      <input
        type={isPassword ? (toggle ? "text" : "password") : "text"}
        placeholder={label}
        {...register(name)}
        // value={value}
        name={name}
        onChange={onChange}
        autoComplete="off"
      />
      <label htmlFor="">{label}</label>
      {isPassword && (
        <div
          className="reg_inputtoggle"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {!toggle ? <FaRegEye /> : <FaRegEyeSlash />}
        </div>
      )}
    </div>
  );
};

export default RegisterInput;
