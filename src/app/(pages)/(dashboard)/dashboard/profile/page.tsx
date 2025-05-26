"use client";
import { useUpdateProfile, useUser } from "@/_hooks/useUser";
import { useGenselectors } from "@/_lib/store/general-store";
import { updateuserschema } from "@/_utils/validation/forms";
import SkeletonProfile from "@/components/skeleton/skeletonprofile";
import { UpdateuserData } from "@/types/forms.type";
import { useForm, FieldErrors } from "react-hook-form";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { yupResolver } from "@hookform/resolvers/yup";

const Profile = () => {
  const { user, isLoading, refetchUser } = useUser();
  const { updateUserMutation } = useUpdateProfile(refetchUser);
  const [open, setOpen] = useState(false);

  const [showInput, setShowInput] = useState<string | null>(null);

  const openToast = useGenselectors.use.openToast();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(updateuserschema),
    mode: "onSubmit",
  });

  const institution = watch("institution") || "";
  const rank = watch("rank") || "";

  const onError = (errors: FieldErrors<UpdateuserData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const onSubmit = (data: UpdateuserData) => {
    console.log(data, "mydata");
    updateUserMutation.mutate(data);
  };

  return (
    <form
      className="dash_profile"
      action=""
      onSubmit={handleSubmit(onSubmit, onError)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent form submit on Enter
        }
      }}
    >
      {!isLoading ? (
        <>
          <div className="dash_profavatar">
            <div className="dash_profimg">
              {/* <Image src="" width={0} height={0} alt="feed image" sizes="100vw" /> */}
            </div>

            <p>change picture</p>
          </div>

          <ul className="dash_profmap">
            {[
              {
                name: "Username",
                value: user?.username,
                editable: false,
              },
              {
                name: "Email",
                value: user?.email,
                editable: false,
              },
              {
                name: "Institution/Firm",
                value: user?.institution,
                editable: true,
                registername: "institution",
              },
              {
                name: "Status",
                value: user?.rank,
                editable: true,
                registername: "rank",
              },
            ].map(({ name, value, editable, registername }) => (
              <li key={name} className="dash_profdata">
                <div>
                  <p className="dash_profinput">
                    <span>{name}:</span>

                    {editable ? (
                      <>
                        {showInput === name ? (
                          <input
                            type="text"
                            placeholder={`input new ${registername}`}
                            {...register(
                              registername as "institution" | "rank"
                            )}
                          />
                        ) : (
                          <span>
                            {value ||
                              watch(registername as "institution" | "rank")}
                          </span>
                        )}
                      </>
                    ) : (
                      <span>{value}</span>
                    )}
                  </p>
                  {editable && (
                    // <>
                    //   {open && (
                    <button
                      type="button"
                      className="dash_profedit"
                      onClick={() => {
                        setOpen(true);
                        setShowInput((prev) => (prev === name ? null : name));
                      }}
                    >
                      <CiEdit />
                      <span>{showInput === name ? "confirm" : "edit"} </span>
                    </button>
                    //   )}
                    // </>
                  )}
                </div>
              </li>
            ))}

            <li className="dash_profdata">
              <div>
                <p>
                  <span>Account type:</span>
                  <span>
                    {user?.subscription?.premium ? "Premium" : "Basic"}
                  </span>
                </p>
              </div>
            </li>
          </ul>

          {open ? (
            <button className="dash_profchange" type={"submit"}>
              Save changes
            </button>
          ) : (
            <span
              // type="button"
              // className="dash_profchange"
              // onClick={() => {
              //   setOpen(true);
              //   if (open) {
              //     console.log("i am open");
              //   }
              // }}

              className="dash_profchange"
              onClick={() => setOpen(true)}
            >
              Edit Profile
            </span>
          )}
        </>
      ) : (
        <div className={"dash_profskeleton"}>
          <SkeletonProfile />
        </div>
      )}
    </form>
  );
};

export default Profile;
