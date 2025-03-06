import { FormInputProp } from "@/types/forms.type";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const FormInput = ({
  isPassword,
  label,
  name,
  onChange,
  register,
}: FormInputProp) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="form_input">
      <input
        type={isPassword ? (toggle ? "text" : "password") : "text"}
        placeholder={label}
        {...register(name)}
        name={name}
        onChange={onChange}
      />

      {isPassword && (
        <div
          className="form_inputtoggle"
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

export default FormInput;
