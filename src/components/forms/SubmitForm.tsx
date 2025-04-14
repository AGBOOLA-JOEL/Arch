import React, { useState } from "react";
import SubmitInput from "./SubmitInput";
import { submitschema } from "@/_utils/validation/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, useForm } from "react-hook-form";
import { SubmitData } from "@/types/forms.type";
import ArchSelect from "../general/ArchSelect";
import { title } from "process";
import FormTextarea from "./FormTextarea";
import ArchTags from "../general/ArchTags";
import FormButton from "./FormButton";
import SubmitButton from "./SubmitButton";
import ArchTerms from "../general/ArchTerms";
import { projectcategory } from "@/data/forms.db";
import { useGenselectors } from "@/_lib/store/general-store";

const SubmitForm = () => {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [tag, setTag] = useState(["Autodesk Revit", "Sketchup"]);
  const [terms, setTerms] = useState(false);
  const [submit, setSubmit] = useState<SubmitData>({} as SubmitData);
  const openToast = useGenselectors.use.openToast();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(submitschema),
    mode: "onSubmit",
  });
  const toggleTerms = () => setTerms((prev) => !prev);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmit({ ...submit, [e.target.name]: e.target.value });
  };

  const onError = (errors: FieldErrors<SubmitData>) => {
    // for (const [fieldName, err] of Object.entries(errors)) {
    //   if (err?.message) {
    //     openToast(err.message, 2500);
    //     break;
    //   }
    // }

    const fieldPriority: (keyof SubmitData)[] = [
      "name",
      "username",
      "email",
      "agency",
      "web",
      "country",
      "projectCategory",
      "googleDriveLink",
      "built",
      "client",
      "location",
      "consult",
      "constructionYear",
      "softwares",
      "size",
      "terms",
    ];

    for (const field of fieldPriority) {
      const err = errors[field];
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };
  const onSubmit = (data: SubmitData) => {
    console.log(data, "submit data");
  };
  return (
    <form
      action=""
      className="submit_form"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      {[
        { label: "Project Name", name: "name", isRequired: true },
        { label: "Contact Name", name: "username", isRequired: true },
        { label: "Contact Email", name: "email", isRequired: true },
        { label: "Institution/Firm", name: "agency", isRequired: false },
        { label: "Website", name: "web", isRequired: false },
      ].map(({ label, name, isRequired }) => (
        <SubmitInput
          type={"text"}
          key={name}
          register={register}
          label={label}
          name={name}
          isRequired={isRequired}
          onChange={handleInputChange}
        />
      ))}

      {[
        {
          title: "Country",
          value: country,
          setValue: setCountry,
          options: ["Algeria", "Togo"],
        },
        {
          title: "Project Category",
          value: category,
          setValue: setCategory,
          options: projectcategory,
        },
      ].map(({ title, value, setValue, options }) => (
        <ArchSelect
          key={title}
          title={title}
          value={value}
          setValue={setValue}
          options={options}
        />
      ))}

      <FormTextarea
        name="googleDriveLink"
        label="Google drive link"
        onChange={handleInputChange}
        register={register}
        placeholder={
          "Please paste the sharelink from your google drive or dropbox here. And ensure that general access is set to anyone with the link can view."
        }
      />

      <ArchSelect
        title={"Project status"}
        value={status}
        setValue={setStatus}
        options={["Built", "Unbuilt"]}
      />
      {status === "Built" && (
        <>
          <SubmitInput
            type={"text"}
            register={register}
            label={"Consultants"}
            name={"consult"}
            isRequired={false}
            onChange={handleInputChange}
          />

          <ArchSelect
            title={"Construction Year"}
            value={year}
            setValue={setYear}
            options={["2002,2001"]}
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
              onChange={handleInputChange}
            />
          ))}
        </>
      )}
      {status === "Unbuilt" && (
        <ArchTags
          tag={tag}
          setTag={setTag}
          title="Add tags to indicate software used
        (press enter to add new tag)"
        />
      )}
      <SubmitInput
        type={"number"}
        register={register}
        label={"Project Size (in sq meters)"}
        name={"size"}
        isRequired={false}
        onChange={handleInputChange}
      />
      <ArchTerms onChange={toggleTerms} />
      <SubmitButton name={"Submit"} />
    </form>
  );
};

export default SubmitForm;
