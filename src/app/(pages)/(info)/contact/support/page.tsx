"use client";
import { useGenselectors } from "@/_lib/store/general-store";
import { contactsupportschema } from "@/_utils/validation/forms";
import FormInput from "@/components/forms/FormInput";
import ArchButton from "@/components/general/ArchButton";
import { ContactSupportData } from "@/types/forms.type";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

const ContactSupport = () => {
  const { register, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(contactsupportschema),
    mode: "onSubmit",
  });
  const openToast = useGenselectors.use.openToast();
  const issue = watch("issue") || "";

  const [support, setSupport] = useState<ContactSupportData>(
    {} as ContactSupportData
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupport({ ...support, [e.target.name]: e.target.value });
  };

  const onError = (errors: FieldErrors<ContactSupportData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };

  const onSubmit = (data: ContactSupportData) => {
    console.log("contact data", data);
  };
  return (
    <form
      action=""
      onSubmit={handleSubmit(onSubmit, onError)}
      className="contact_support"
    >
      <p>
        You are seeing this page because you contacted support in an attempt to
        download one or more <span>PREMIUM</span> projects.But before we proceed
        please kindly fill out the required details below.
      </p>

      <div>
        <h1>Your Full Address and Phone Number*</h1>
        {[
          { label: "Street", name: "street", isPassword: false },
          { label: "City", name: "city", isPassword: false },
          { label: "Postal Code", name: "postal", isPassword: false },
          { label: "Phone Number*", name: "number", isPassword: false },
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
      <div>
        <h1>Please tell us why you are interested in our premium projects*</h1>

        <div>
          {contactsupportdata.map((data) => {
            return (
              <div key={data.id}>
                <input
                  type="radio"
                  value={data.title}
                  {...register("issue")}
                  checked={issue === data.title ? true : false}
                />
                <p>{data.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <ArchButton type="submit" variant="white" name="Proceed" />
      </div>
    </form>
  );
};

export default ContactSupport;

const contactsupportdata = [
  {
    id: 1,
    title:
      "I am a student and i would like to use it as precedent studies for a school project",
  },
  {
    id: 2,
    title:
      "I am a registered professional and would like to study the project for future projects",
  },
  {
    id: 3,
    title: "The project i am downloading is of great interest to me",
  },
  {
    id: 4,
    title: "I just want to keep this project in my archive for later use",
  },
];
