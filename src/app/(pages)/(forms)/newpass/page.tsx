"use client";
import { passwordschema } from "@/_utils/validation/forms";
import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import { PasswordData } from "@/types/forms.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

const NewPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordschema),
  });

  const [pass, setPass] = useState<PasswordData>({} as PasswordData);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {};
  return (
    <form action="" className="newpass" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="newpass_header">Forgot password?</h1>

      <div className="newpass_field">
        {[
          { label: "Enter new password", name: "password", isPassword: true },
          {
            label: "Confirm Password",
            name: "confirmPassword",
            isPassword: true,
          },
        ].map(({ label, name, isPassword }) => (
          <FormInput
            key={name}
            register={register}
            label={label}
            name={name}
            isPassword={isPassword}
            onChange={handleInputChange}
          />
        ))}
        {/* {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )} */}
      </div>

      <div className="newpass_button">
        <FormButton name={"Reset Password"} onClick={onSubmit} />
      </div>
    </form>
  );
};

export default NewPass;
