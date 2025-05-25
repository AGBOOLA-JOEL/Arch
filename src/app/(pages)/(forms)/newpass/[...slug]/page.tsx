"use client";
import { useForms } from "@/_hooks/useForms";
import { useGenselectors } from "@/_lib/store/general-store";
import useModalStore from "@/_lib/store/modal-store";
import { passwordschema } from "@/_utils/validation/forms";
import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import { PasswordData } from "@/types/forms.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

const NewPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordschema),
  });
  const openToast = useGenselectors.use.openToast();
  const { openModal, closeModal } = useModalStore();
  const [pass, setPass] = useState<PasswordData>({} as PasswordData);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  };
  const params = useParams();
  const tokenid = (params?.slug as string[])?.[0];
  const userid = (params?.slug as string[])?.[1];

  const { passresetMutation } = useForms();

  const onError = (errors: FieldErrors<PasswordData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };

  const onSubmit = (data: PasswordData) => {
    openModal("loading");
    const { password, confirmPassword } = data;

    const apiData = {
      newPassword: password,
      confirmPassword,
    };
    passresetMutation.mutate({ data: apiData, token: tokenid, userid });
  };
  return (
    <form
      action=""
      className="newpass"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <h1 className="newpass_header">Forgot password?</h1>

      <div className="newpass_field">
        {[
          { label: "Enter new password", name: "password", isPassword: true },
          {
            label: "Confirm Password",
            name: "confirmPassword",
            isPassword: true,
          },
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
        {/* {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )} */}
      </div>

      <div className="newpass_button">
        <FormButton name={"Reset Password"} />
      </div>
    </form>
  );
};

export default NewPass;
