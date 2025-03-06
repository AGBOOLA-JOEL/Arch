"use client";
import { forgotschema } from "@/_utils/validation/forms";
import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import { ForgotData } from "@/types/forms.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotPass = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(forgotschema),
  });

  const [forgot, setForgot] = useState<ForgotData>({} as ForgotData);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgot({ ...forgot, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {};
  return (
    <form action="" className="forgot" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="forgot_header">Forgot password?</h1>
      <div className="forgot_desc">
        <p>
          Enter your email address below to get a link to change your password
        </p>
      </div>

      <div className="forgot_field">
        <FormInput
          register={register}
          label={"Email"}
          name={"email"}
          isPassword={false}
          onChange={handleInputChange}
        />
      </div>

      <div className="forgot_button">
        <FormButton name={"Reset Password"} onClick={onSubmit} />
      </div>
    </form>
  );
};

export default ForgotPass;
