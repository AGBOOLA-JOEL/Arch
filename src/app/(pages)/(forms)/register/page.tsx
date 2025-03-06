"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { regschema } from "@/_utils/validation/forms";
import RegisterInput from "@/components/forms/RegisterInput";
import { useEffect, useState } from "react";
import { JoinData } from "@/types/forms.type";
import RegisterRole from "@/components/forms/RegisterRole";
import RegisterRule from "@/components/forms/RegisterRule";
import FormButton from "@/components/forms/FormButton";

const Register = () => {
  const [letter, setLetter] = useState(false);
  const [terms, setTerms] = useState(false);
  const [join, setJoin] = useState<JoinData>({} as JoinData);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(regschema),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoin({ ...join, [e.target.name]: e.target.value });
  };

  const { username, email, institution, password, confirmPassword, rank } =
    join;

  const toggleTerms = () => setTerms((prev) => !prev);
  const toggleNewsletter = () => setLetter((prev) => !prev);

  const onSubmit = () => {};
  return (
    <form action="" className="register" onSubmit={handleSubmit(onSubmit)}>
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
        <RegisterRole rank={rank} handleRoleChange={handleInputChange} />
      </div>
      <div className="reg_rulecheck">
        <RegisterRule
          handleTermsChange={toggleTerms}
          handleNewsChange={toggleNewsletter}
        />
      </div>

      <div className="reg_button">
        <FormButton name={"Register"} onClick={onSubmit} />
      </div>

      <h2 className="reg_signin">
        Already have an account?
        <span>Sign in</span>
      </h2>
    </form>
  );
};

export default Register;
