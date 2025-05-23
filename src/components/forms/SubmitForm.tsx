import React, { useState } from "react";
import SubmitInput from "./SubmitInput";
import { submitschema } from "@/_utils/validation/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { SubmitData } from "@/types/forms.type";
import ArchSelect from "../general/ArchSelect";
import FormTextarea from "./FormTextarea";
import ArchTags from "../general/ArchTags";
import SubmitButton from "./SubmitButton";
import ArchTerms from "../general/ArchTerms";
import { projectcategory, submitfieldPriority } from "@/data/forms.db";
import { useGenselectors } from "@/_lib/store/general-store";
import { useAuth } from "@/_hooks/useAuth";
import { useCountry } from "@/_hooks/useCountry";
import { useYear } from "@/_hooks/useYear";
import { useDownloadTemplate } from "@/_utils/downloadtemplate";

const SubmitForm = () => {
  const openToast = useGenselectors.use.openToast();
  const { submitMutation } = useAuth();
  const { country } = useCountry();
  const { year } = useYear();
  const { register, handleSubmit, control, watch, setValue } = useForm({
    resolver: yupResolver(submitschema),
    mode: "onSubmit",
    defaultValues: {
      projectCategory: "",
      country: "",
      softwares: ["Autodesk Revit", "Sketchup"],
    },
  });
  const status = watch("built");

  const onError = (errors: FieldErrors<SubmitData>) => {
    for (const field of submitfieldPriority) {
      const err = errors[field];
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };
  const onSubmit = (data: SubmitData) => {
    const { terms, ...apiData } = data;
    console.log(apiData, "submit data");
    // const { terms, ...apiData } = data;
    submitMutation.mutate(apiData);
  };
  return (
    <form
      action=""
      className="submit_form"
      onSubmit={handleSubmit(onSubmit, onError)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent form submit on Enter
        }
      }}
    >
      {[
        { label: "Project Name", name: "projectName", isRequired: true },
        { label: "Contact Name", name: "name", isRequired: true },
        { label: "Contact Email", name: "email", isRequired: true },
        {
          label: "Institution/Firm",
          name: "institutionOrFirm",
          isRequired: false,
        },
        { label: "Website", name: "website", isRequired: false },
      ].map(({ label, name, isRequired }) => (
        <SubmitInput
          type={"text"}
          key={name}
          register={register}
          label={label}
          name={name}
          isRequired={isRequired}
        />
      ))}

      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <ArchSelect
            title="Country"
            value={field.value}
            onChange={field.onChange} // Pass `onChange` from `react-hook-form`
            options={country} // Example options
          />
        )}
      />

      <span
        onClick={() => {
          console.log("country", country);
          console.log("year", year);
        }}
      >
        console
      </span>
      <Controller
        name="projectCategory"
        control={control}
        render={({ field }) => (
          <ArchSelect
            title="Project Category"
            value={field.value}
            onChange={field.onChange} // Pass `onChange` from `react-hook-form`
            options={projectcategory} // Example options
          />
        )}
      />

      <FormTextarea
        name="googleDriveLink"
        label="Google drive link"
        register={register}
        placeholder={
          "Please paste the sharelink from your google drive or dropbox here. And ensure that general access is set to anyone with the link can view."
        }
      />

      <Controller
        name="built"
        control={control}
        render={({ field }) => (
          <ArchSelect
            title="Project status"
            value={field.value}
            onChange={(val) => {
              field.onChange(val);
              setValue("constructionYear", "");
              setValue("consultant", "");
            }}
            options={["Built", "Unbuilt"]} // Example options
          />
        )}
      />
      {status === "Built" && (
        <>
          <SubmitInput
            type={"text"}
            register={register}
            label={"Consultants"}
            name={"consultant"}
            isRequired={false}
          />

          <Controller
            name="constructionYear"
            control={control}
            render={({ field }) => (
              <ArchSelect
                title="Construction Year"
                value={field.value}
                onChange={field.onChange} // Pass `onChange` from `react-hook-form`
                options={year} // Example options
              />
            )}
          />
        </>
      )}
      {status && (
        <>
          {[
            {
              label: "Client",
              name: "client",
              isRequired: status === "Built" ? true : false,
            },
            {
              label: "Project Location",
              name: "location",
              isRequired: status === "Unbuilt" ? true : false,
            },
          ].map(({ label, name, isRequired }) => (
            <SubmitInput
              type={"text"}
              key={name}
              register={register}
              label={label}
              name={name}
              isRequired={isRequired}
            />
          ))}
        </>
      )}
      {status === "Unbuilt" && (
        <Controller
          name="softwares"
          control={control}
          render={({ field }) => (
            <ArchTags
              // tag={field.value ?? []}
              tag={(field.value ?? []).filter(
                (v): v is string => typeof v === "string"
              )}
              setTag={field.onChange}
              title="Add tags to indicate software used
        (press enter to add new tag)"
            />
          )}
        />
      )}
      <SubmitInput
        type={"number"}
        register={register}
        label={"Project Size (in sq meters)"}
        name={"size"}
        isRequired={false}
      />

      <ArchTerms name="terms" register={register} />
      <SubmitButton name={"Submit"} />
    </form>
  );
};

export default SubmitForm;
