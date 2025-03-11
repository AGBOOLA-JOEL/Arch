import { SubmitInputProp } from "@/types/forms.type";
import React, { useState } from "react";

import { FaAsterisk } from "react-icons/fa";

const SubmitInput = ({
  type,
  isRequired,
  label,
  name,
  onChange,
  register,
}: SubmitInputProp) => {
  return (
    <div className="submit_input">
      <input
        type={type}
        placeholder={label}
        {...register(name)}
        name={name}
        onChange={onChange}
      />

      {isRequired && (
        <span>
          <FaAsterisk />
        </span>
      )}
    </div>
  );
};

export default SubmitInput;
