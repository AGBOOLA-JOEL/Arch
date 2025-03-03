"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { regschema } from "@/_utils/validation/forms";
import RegisterInput from "@/components/forms/RegisterInput";
import { useState } from "react";
import { JoinData } from "@/types/forms.type";
import RegisterRole from "@/components/forms/RegisterRole";

const Join = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(regschema),
  });
  const [join, setJoin] = useState<JoinData>({} as JoinData);
  const { username, email, institution, password, confirmPassword, rank } =
    join;

  const handleInputChange = (e: any) => {
    setJoin({ ...join, [e.target.name]: e.target.value });
  };

  return (
    <form action="" className="register">
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
        <RegisterRole rank={rank} handleRolechange={handleInputChange} />
      </div>
    </form>
  );
};

export default Join;
