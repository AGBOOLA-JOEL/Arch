"use client";
import { useAuth } from "@/_hooks/useAuth";
import { loginschema } from "@/_utils/validation/forms";
import FormButton from "@/components/forms/FormButton";
import FormGoogle from "@/components/forms/FormGoogle";
import FormInput from "@/components/forms/FormInput";
import { LoginData } from "@/types/forms.type";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginschema),
    mode: "onChange",
  });

  const [login, setLogin] = useState<LoginData>({} as LoginData);

  // const { username, password } = login;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const { loginMutation } = useAuth();

  const onSubmit = (data: any) => {
    console.log("data", data);
    loginMutation.mutate(data);
    // loginMutation.mutate(data);
  };

  // const onSubmit = () => {};
  return (
    <form action="" className="login" onSubmit={handleSubmit(onSubmit)}>
      <div className="form_header">
        <p>sign in </p>
      </div>

      <div className="login_fields">
        {[
          { label: "Username", name: "username", isPassword: false },
          { label: "Password", name: "password", isPassword: true },
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
      </div>
      <div className="login_forgot">
        <p>forgot password?</p>
      </div>

      <div className="login_button">
        <FormButton name={"Login"} onClick={onSubmit} />
      </div>

      <h2 className="login_join">
        Don’t have an account? <span> Click to create.</span>
      </h2>

      <div className="login_google">
        <FormGoogle />
      </div>
    </form>
  );
};
export default Login;
