"use client";

import { useGenselectors } from "@/_lib/store/general-store";
import { workschema } from "@/_utils/validation/forms";
import FormInput from "@/components/forms/FormInput";
import ArchButton from "@/components/general/ArchButton";
import { WorkData } from "@/types/forms.type";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

const Work = () => {
  const { register, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(workschema),
    mode: "onSubmit",
  });
  const openToast = useGenselectors.use.openToast();

  const [work, setWork] = useState<WorkData>({} as WorkData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWork({ ...work, [e.target.name]: e.target.value });
  };

  const onError = (errors: FieldErrors<WorkData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };

  const onSubmit = (data: WorkData) => {
    console.log("work data", data);
  };
  return (
    <form action="" onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <h1>Join our team</h1>
        <p>
          Are you driven to make a difference? Join our vibrant team of young
          ,proactive curators from across Africa .Together ,{"we're"} shaping
          the future ,creating impact,and inspiring change in our communities
        </p>
        <p>
          This is your chance to connect ,contribute and lead .volunteer with us
        </p>
      </div>

      <div>
        <h1>To join our team ,please fill out the form below</h1>

        <div>
          {[
            { label: "First Name", name: "firstName", isPassword: false },
            { label: "Last Name", name: "lastName", isPassword: false },
            { label: "Email", name: "email", isPassword: false },
            { label: "Home Address", name: "address", isPassword: false },
            { label: "Phone Number", name: "number", isPassword: false },
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
      </div>
      <div className="work_upload">
        <h1>Tell us more about yourself </h1>

        <textarea
          {...register("desc")}
          placeholder="Kindly provide a brief introduction about yourself ,highlighting your skills,experience and an explnation on why you are interested in volunteering with us"
          name={"desc"}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          placeholder="Attach file"
          onChange={(e: any) => {
            setValue("resume", e.target.files[0]);
          }}
        />

        <ArchButton type="submit" variant="white" name="Send" />
      </div>
    </form>
  );
};

export default Work;
