import { FormTextareaProp } from "@/types/forms.type";
import React from "react";

const FormTextarea = ({
  label,
  name,
  onChange,
  register,
  placeholder,
}: FormTextareaProp) => {
  return (
    <div className="form_textarea">
      <label htmlFor="">{label}</label>
      <textarea
        placeholder={placeholder}
        type="text"
        {...register(name)}
        name={name}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default FormTextarea;
