"use client";
import { useState } from "react";
import ArchTags from "../general/ArchTags";
import ArchDnd from "../general/ArchDnd";
import ArchTextarea from "../general/ArchTextarea";
import ArchQuill from "../general/ArchQuill";
import ArchButton from "../general/ArchButton";
import { Controller } from "react-hook-form";
import ArchImageSelect from "../general/ArchImageSelect";

type FeedFormProp = {
  watch: any;
  register: any;
  control: any;
  setValue: any;
};
const FeedForm = ({ register, control, setValue, watch }: FeedFormProp) => {
  const handlePreviewClick = () => {};

  return (
    <>
      <Controller
        name="categories"
        control={control}
        render={({ field }) => (
          <ArchTags
            // tag={field.value ?? []}
            tag={(field.value ?? []).filter(
              (v: any): v is string => typeof v === "string"
            )}
            setTag={field.onChange}
            title="Add category 
            (press enter to add new category)"
          />
        )}
      />
      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <ArchTags
            // tag={field.value ?? []}
            tag={(field.value ?? []).filter(
              (v: any): v is string => typeof v === "string"
            )}
            setTag={field.onChange}
            title="Add tags  
            (press enter to add new tag)"
          />
        )}
      />

      <div className="dash_postnewdnd">
        {/* <ArchImageSelect setValue={setValue} header={"Choose a cover image"} /> */}
        {/* <p>* Choose a cover image</p>
        <input
          type="file"
          accept="image/*" // Specify accepted file types (in this case, images)
          // onChange={handleFileChange}
        /> */}
        <ArchDnd
          header="Choose a cover image"
          fieldname={"newsImage"}
          setValue={setValue}
        />
      </div>

      <ArchTextarea
        register={register}
        watch={watch}
        placeholder={"Not more than 350 characters"}
        label={"*Provide a short decription of your news"}
        maxword={350}
      />
      <ArchQuill fieldname={"newsBody"} setValue={setValue} />

      <div className="dash_postnewbtn">
        {/* <ArchButton 
          name="preview"
          onClick={handlePreviewClick}
          variant="white"
        /> */}
        <ArchButton
          name="Submit"
          type={"submit"}
          // onClick={handlePreviewClick}
          variant="primary"
        />
      </div>
    </>
  );
};

export default FeedForm;
