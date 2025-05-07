"use client";

import { messageformschema } from "@/_utils/validation/forms";
import SubmitInput from "@/components/forms/SubmitInput";
import ArchButton from "@/components/general/ArchButton";
import ArchQuill from "@/components/general/ArchQuill";

import { MessageFormData } from "@/types/dashboard.type";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [message, setMessage] = useState<MessageFormData>(
    {} as MessageFormData
  );

  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(messageformschema),
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {};
  const handleBtnClick = () => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dash_compose">
      <SubmitInput
        type={"text"}
        register={register}
        label={"Post title"}
        name={"title"}
        isRequired={false}
        // onChange={handleInputChange}
      />

      <SubmitInput
        type={"text"}
        register={register}
        label={"Receipient"}
        name={"receipient"}
        isRequired={false}
        // onChange={handleInputChange}
      />

      <ArchQuill setValue={setValue} />

      <div className="dash_composebtn">
        <ArchButton name="Send message" type="submit" variant="disabled" />
      </div>
    </form>
  );
};

export default Page;
