"use client";

import { useForm, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { projectuploadschema } from "@/_utils/validation/projectupload";
import { useAdminProjectId } from "@/_hooks/useProjectStatus";
import DashUploadEditables from "@/components/dashboard/DashUploadEditables";
import { useParams } from "next/navigation";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";
import DashUploadCategories from "@/components/dashboard/DashUploadCategories";
import DashUploadType from "@/components/dashboard/DashUploadType";
import { useEffect, useState } from "react";
import DashUploadImages from "@/components/dashboard/DashUploadImages";
import DashUploadDetails from "@/components/dashboard/DashUploadDetails";
import ArchButton from "@/components/general/ArchButton";
import { useGenselectors } from "@/_lib/store/general-store";
import { DashUploadData } from "@/types/forms.type";
import useModalStore from "@/_lib/store/modal-store";
import { useUpload } from "@/_hooks/useUpload";

const Page = () => {
  const params = useParams();
  const [isStrict, setIsStrict] = useState(false);
  const [isDevice, setIsDevice] = useState(false);

  const uploadId = params?.uploadid;
  const { proid, status, isLoading } = useAdminProjectId(uploadId);
  const openToast = useGenselectors.use.openToast();
  const { openModal, closeModal } = useModalStore();
  const { uploadMutation } = useUpload(proid);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    resetField,
  } = useForm({
    resolver: yupResolver(projectuploadschema(isStrict)),
  });

  const onError = (errors: FieldErrors<DashUploadData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };
  const onSubmit = (data: any) => {
    openModal("loading");

    uploadMutation.mutate({ data, id: proid?.projectId, isDevice, isStrict });

    console.log(data);
  };
  return (
    <form
      className="dash_uploadpage"
      onSubmit={handleSubmit(onSubmit, onError)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent form submit on Enter
        }
      }}
    >
      {!isLoading ? (
        <>
          <DashUploadEditables data={proid} setValue={setValue} watch={watch} />

          <DashUploadCategories setValue={setValue} />
          <DashUploadImages
            data={proid}
            setValue={setValue}
            isStrict={isStrict}
            setIsStrict={setIsStrict}
            isDevice={isDevice}
            setIsDevice={setIsDevice}
            resetField={resetField}
          />
          <DashUploadDetails setValue={setValue} control={control} />
          <ArchButton name="Submit" type={"submit"} variant="primary" />
        </>
      ) : (
        <div className="dash_uploadskeleton">
          <SkeletonStatus />
        </div>
      )}
    </form>
  );
};

export default Page;
