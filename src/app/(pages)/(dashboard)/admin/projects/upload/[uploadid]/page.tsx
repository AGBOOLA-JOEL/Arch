"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { projectuploadschema } from "@/_utils/validation/projectupload";
import { useAdminProjectId } from "@/_hooks/useProjectStatus";
import DashUploadEditables from "@/components/dashboard/DashUploadEditables";
import { useParams } from "next/navigation";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";
import DashUploadCategories from "@/components/dashboard/DashUploadCategories";

const Page = () => {
  const params = useParams();

  const uploadId = params?.uploadid;
  const { proid, status, isLoading } = useAdminProjectId(uploadId);

  const { register, handleSubmit, control, setValue, watch } = useForm({
    resolver: yupResolver(projectuploadschema),
  });
  const cat = watch("category");
  const subcat = watch("subCategory");
  const subclass = watch("subCategoryClass");

  return (
    <form className="dash_uploadpage">
      {!isLoading ? (
        <>
          {/* <DashUploadType /> */}
          <DashUploadEditables data={proid} setValue={setValue} />
          {cat}-{subcat}-{subclass}
          <DashUploadCategories setValue={setValue} />
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
