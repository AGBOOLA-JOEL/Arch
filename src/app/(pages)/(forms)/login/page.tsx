"use client";
import { useAuth } from "@/_hooks/useAuth";
import { useGenselectors } from "@/_lib/store/general-store";
import { loginschema } from "@/_utils/validation/forms";
import FormButton from "@/components/forms/FormButton";
import FormGoogle from "@/components/forms/FormGoogle";
import FormInput from "@/components/forms/FormInput";
import { LoginData } from "@/types/forms.type";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form";

const Login = () => {
  const openToast = useGenselectors.use.openToast();
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: yupResolver(loginschema),
    mode: "onChange",
  });

  const [login, setLogin] = useState<LoginData>({} as LoginData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const { loginMutation } = useAuth();

  const onError = (errors: FieldErrors<LoginData>) => {
    Object.values(errors).forEach((err) => {
      if (err?.message) {
        openToast(err.message as string, 5000);
      }
    });
  };

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };
  return (
    <form
      action=""
      className="login"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
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
        <FormButton name={"Login"} />
      </div>

      <h2 className="login_join">
        Don’t have an account? <Link href="/register"> Click to create.</Link>
      </h2>

      <div className="login_google">
        <FormGoogle />
      </div>
    </form>
  );
};
export default Login;
