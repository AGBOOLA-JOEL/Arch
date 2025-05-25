"use client";
import { useAuth } from "@/_hooks/useAuth";
import { useGenselectors } from "@/_lib/store/general-store";
import { loginschema } from "@/_utils/validation/forms";
import FormButton from "@/components/forms/FormButton";
import FormGoogle from "@/components/forms/FormGoogle";
import FormInput from "@/components/forms/FormInput";
import { LoginData } from "@/types/forms.type";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form";
import { signIn } from "next-auth/react";
import useModalStore from "@/_lib/store/modal-store";
import { useRouter } from "next/navigation";
import { useCart } from "@/_hooks/useCart";

const Login = () => {
  const { openModal, closeModal } = useModalStore();
  const openToast = useGenselectors.use.openToast();
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: yupResolver(loginschema),
    mode: "onSubmit",
  });

  const [login, setLogin] = useState<LoginData>({} as LoginData);
  const { refetchCart } = useCart();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  // const { loginMutation } = useAuth();

  const onError = (errors: FieldErrors<LoginData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };

  const onSubmit = async (data: LoginData) => {
    openModal("loading");

    const { username, password } = data;

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      closeModal();
      openToast(result.error, 4000);
      return;
    }

    // Delay navigation to allow the modal to show briefly
    setTimeout(() => {
      router.replace("/");
      closeModal();
      refetchCart();
    }, 500); // adjust timing for UX
  };
  return (
    <form
      action=""
      className="login"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="form_header">
        <p>sign in </p>
      </div>

      <div className="login_fields">
        {[
          { label: "Username", name: "username", isPassword: false },
          { label: "Password", name: "password", isPassword: true },
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
      <div className="login_forgot">
        <Link href="/forgot">forgot password?</Link>
      </div>

      <div className="login_button">
        <FormButton name={"Login"} />
      </div>

      <h2 className="login_join">
        Don’t have an account? <Link href="/register"> Click to create.</Link>
      </h2>

      <div className="login_google">
        <FormGoogle />
      </div>
    </form>
  );
};
export default Login;
