"use client";
import { useFeed } from "@/_hooks/useFeed";
import { useGenselectors } from "@/_lib/store/general-store";
import useModalStore from "@/_lib/store/modal-store";
import { postnewsschema } from "@/_utils/validation/forms";
import FeedForm from "@/components/feed/FeedForm";
import SubmitInput from "@/components/forms/SubmitInput";
import ArchSelect from "@/components/general/ArchSelect";
import { PostNewsData } from "@/types/forms.type";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

const Page = () => {
  const [select, setSelect] = useState("News");
  const { postMutation } = useFeed();
  const { openModal } = useModalStore();
  // const [post, setPost] = useState<PostNewsData>({} as PostNewsData);

  const openToast = useGenselectors.use.openToast();
  const { register, handleSubmit, control, setValue, watch } = useForm({
    resolver: yupResolver(postnewsschema),
  });
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPost({ ...post, [e.target.name]: e.target.value });
  // };'
  const onError = (errors: FieldErrors<PostNewsData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };
  const onSubmit = (data: any) => {
    openModal("loading");
    postMutation.mutate(data);
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="dash_postnew"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent form submit on Enter
        }
      }}
    >
      <SubmitInput
        type={"text"}
        register={register}
        label={"Post title"}
        name={"title"}
        isRequired={false}
        // onChange={handleInputChange}
      />
      <ArchSelect
        title={"---Select Category---"}
        value={select}
        onChange={setSelect}
        options={["News"]}
      />

      {select === "News" && (
        <FeedForm
          control={control}
          setValue={setValue}
          watch={watch}
          register={register}
        />
      )}
    </form>
  );
};

export default Page;
