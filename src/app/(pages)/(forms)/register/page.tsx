"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { regschema } from "@/_utils/validation/forms";
import RegisterInput from "@/components/forms/RegisterInput";
import { useState } from "react";
import { JoinData } from "@/types/forms.type";
import RegisterRole from "@/components/forms/RegisterRole";
import RegisterRule from "@/components/forms/RegisterRule";
import FormButton from "@/components/forms/FormButton";

const Join = () => {
  const [letter, setLetter] = useState(false);
  const [checkTerms, setCheckterms] = useState(false);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(regschema),
  });
  const [join, setJoin] = useState<JoinData>({} as JoinData);
  const { username, email, institution, password, confirmPassword, rank } =
    join;

  const handleInputChange = (e: any) => {
    setJoin({ ...join, [e.target.name]: e.target.value });
  };

  const handleTermsChange = () => {
    if (checkTerms === false) {
      setCheckterms(true);
    } else {
      setCheckterms(false);
    }
    console.log("ceck terms", checkTerms);
  };

  const handleNewsChange = () => {
    if (letter === false) {
      setLetter(true);
    } else {
      setLetter(false);
    }
  };

  const onSubmit = () => {};
  return (
    <form action="" className="register" onSubmit={handleSubmit(onSubmit)}>
      <div className="form_header">
        <p>join us</p>
      </div>
      <div className="reg_fields">
        <RegisterInput
          register={register}
          isPassword={false}
          toggle={false}
          label={"Username"}
          name={"username"}
          onChange={handleInputChange}
        />
        <RegisterInput
          register={register}
          isPassword={false}
          toggle={false}
          label={"Email"}
          name={"email"}
          onChange={handleInputChange}
        />

        <RegisterInput
          register={register}
          isPassword={false}
          toggle={false}
          label={"Institution/Firm"}
          name={"institution"}
          onChange={handleInputChange}
        />

        <RegisterInput
          register={register}
          isPassword={true}
          toggle={false}
          label={"Password"}
          name={"password"}
          onChange={handleInputChange}
        />
        <RegisterInput
          register={register}
          isPassword={true}
          toggle={false}
          label={"Re-enter password"}
          name={"confirmPassword"}
          onChange={handleInputChange}
        />
      </div>

      <div className="reg_rolecheck">
        <RegisterRole rank={rank} handleRoleChange={handleInputChange} />
      </div>
      <div className="reg_rulecheck">
        <RegisterRule
          handleTermsChange={handleTermsChange}
          handleNewsChange={handleNewsChange}
        />
      </div>

      <div className="reg_button">
        <FormButton name={"Register"} onClick={onSubmit} width={86} />
      </div>

      <h2 className="reg_signin">
        Already have an account?
        <span>Sign in</span>
      </h2>
    </form>
  );
};

export default Join;
