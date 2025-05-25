"use client";
import { useForms } from "@/_hooks/useForms";
import { useGenselectors } from "@/_lib/store/general-store";
import useModalStore from "@/_lib/store/modal-store";
import { forgotschema } from "@/_utils/validation/forms";
import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import { ForgotData } from "@/types/forms.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

const ForgotPass = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(forgotschema),
  });
  const openToast = useGenselectors.use.openToast();
  const { openModal, closeModal } = useModalStore();
  const [forgot, setForgot] = useState<ForgotData>({} as ForgotData);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgot({ ...forgot, [e.target.name]: e.target.value });
  };
  const { forgotMutation } = useForms();

  const onError = (errors: FieldErrors<ForgotData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };

  const onSubmit = (data: ForgotData) => {
    openModal("loading");
    forgotMutation.mutate(data);
  };
  return (
    <form
      action=""
      className="forgot"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <h1 className="forgot_header">Forgot password?</h1>
      <div className="forgot_desc">
        <p>
          Enter your email address below to get a link to change your password
        </p>
      </div>

      <div className="forgot_field">
        <FormInput
          register={register}
          label={"Email"}
          name={"email"}
          isPassword={false}
          onChange={handleInputChange}
        />
      </div>

      <div className="forgot_button">
        <FormButton name={"Reset Password"} />
      </div>
    </form>
  );
};

export default ForgotPass;
