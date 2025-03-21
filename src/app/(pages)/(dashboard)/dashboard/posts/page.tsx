"use client";
import { postformschema } from "@/_utils/validation/forms";
import FeedForm from "@/components/feed/FeedForm";
import SubmitInput from "@/components/forms/SubmitInput";
import ArchSelect from "@/components/general/ArchSelect";
import { PostFormData } from "@/types/dashboard.type";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [select, setSelect] = useState("");
  const [post, setPost] = useState<PostFormData>({} as PostFormData);
  const [textarea, setTextarea] = useState("");

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(postformschema),
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dash_postnew">
      <SubmitInput
        type={"text"}
        register={register}
        label={"Post title"}
        name={"title"}
        isRequired={false}
        onChange={handleInputChange}
      />
      <ArchSelect
        title={"---Select Category---"}
        value={select}
        setValue={setSelect}
        options={["News"]}
      />

      {select === "News" && (
        <FeedForm textarea={textarea} setTextarea={setTextarea} />
      )}
    </form>
  );
};

export default Page;
