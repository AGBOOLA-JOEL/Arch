"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { projectuploadschema } from "@/_utils/validation/projectupload";
import { useAdminProjectId } from "@/_hooks/useProjectStatus";
import DashUploadEditables from "@/components/dashboard/DashUploadEditables";
import { useParams } from "next/navigation";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";
import DashUploadCategories from "@/components/dashboard/DashUploadCategories";
import DashUploadType from "@/components/dashboard/DashUploadType";
import { useState } from "react";
import DashUploadImages from "@/components/dashboard/DashUploadImages";

const Page = () => {
  const params = useParams();

  const uploadId = params?.uploadid;
  const { proid, status, isLoading } = useAdminProjectId(uploadId);

  const { register, handleSubmit, control, setValue, watch } = useForm({
    resolver: yupResolver(projectuploadschema),
  });
  const builtshow = watch("built");
  const cat = watch("category");
  const subcat = watch("subCategory");
  const subclass = watch("subCategoryClass");
  const premium = watch("isPremium");

  return (
    <form className="dash_uploadpage">
      {!isLoading ? (
        <>
          {/* {premium ? "premium" : "basic"} */}
          {/* {builtshow ? "true" : "false"} */}
          <DashUploadEditables data={proid} setValue={setValue} watch={watch} />
          {/* {cat}-{subcat}-{subclass} */}
          <DashUploadCategories setValue={setValue} />
          <DashUploadImages data={proid} setValue={setValue} />
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
