"use client";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { regschema } from "@/_utils/validation/forms";
import RegisterInput from "@/components/forms/RegisterInput";
import { useState } from "react";
import { JoinData } from "@/types/forms.type";
import RegisterRole from "@/components/forms/RegisterRole";
import RegisterRule from "@/components/forms/RegisterRule";
import FormButton from "@/components/forms/FormButton";
import { useGenselectors } from "@/_lib/store/general-store";
import { useAuth } from "@/_hooks/useAuth";
import Link from "next/link";

const Register = () => {
  const { registerMutation, newsletterMutation } = useAuth();
  const [join, setJoin] = useState<JoinData>({} as JoinData);
  const openToast = useGenselectors.use.openToast();
  const { register, handleSubmit } = useForm<JoinData>({
    resolver: yupResolver(regschema),
    mode: "onSubmit",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    if (name === "terms" || name === "letter") {
      setJoin({ ...join, [name]: checked });
    } else {
      setJoin({ ...join, [name]: value });
    }
  };

  const onError = (errors: FieldErrors<JoinData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };

  const onSubmit = (data: JoinData) => {
    const { terms, letter, ...apiData } = data;
    registerMutation.mutate(apiData);
    letter &&
      newsletterMutation.mutate({
        email: apiData.email,
        username: apiData.username,
      });
  };
  return (
    <form
      action=""
      className="register"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="form_header">
        <p>join us</p>
      </div>
      <div className="reg_fields">
        {[
          { label: "Username", name: "username", isPassword: false },
          { label: "Email", name: "email", isPassword: false },
          { label: "Institution/Firm", name: "institution", isPassword: false },
          { label: "Password", name: "password", isPassword: true },
          {
            label: "Re-enter Password",
            name: "confirmPassword",
            isPassword: true,
          },
        ].map(({ label, name, isPassword }) => (
          <RegisterInput
            key={name}
            register={register}
            label={label}
            name={name}
            isPassword={isPassword}
            onChange={handleInputChange}
          />
        ))}
      </div>

      <div className="reg_rolecheck">
        <RegisterRole
          rank={join.rank}
          handleRoleChange={handleInputChange}
          register={register}
        />
      </div>
      <div className="reg_rulecheck">
        <RegisterRule
          handleInputChange={handleInputChange}
          register={register}
        />
      </div>

      <div className="reg_button">
        <FormButton name={"Register"} />
      </div>

      <h2 className="reg_signin">
        Already have an account?
        <Link href="/login">Sign in</Link>
      </h2>
    </form>
  );
};

export default Register;
