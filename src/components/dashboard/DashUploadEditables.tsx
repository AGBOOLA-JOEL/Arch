"use client";
import { useForm } from "react-hook-form";
import DashUploadEdit from "./DashUploadEdit";
import { formatTime, fullFormatDate } from "@/_utils/formatdate";
import DashUploadType from "./DashUploadType";
import DashUploadPremium from "./DashUploadPremium";

const DashUploadEditables = ({
  data,
  setValue,
  watch,
}: {
  data: any;
  setValue: any;
  watch: any;
}) => {
  // your form logic here

  const uploadData = data;
  const builtshow = watch("built");
  return (
    <>
      {uploadData ? (
        <>
          <div className="dash_uploadheader">
            <p>
              Uploaded by {uploadData?.user?.user} on{" "}
              {fullFormatDate(uploadData?.date)}
            </p>
            <p>{uploadData?.projectName}</p>
          </div>
          <DashUploadType data={uploadData} setValue={setValue} />
          <DashUploadPremium data={uploadData} setValue={setValue} />
          <div className="dash_uploadeditmap">
            <DashUploadEdit
              label="Credit"
              name="name"
              placeholder={uploadData?.user?.user}
              setValue={setValue}
              type={"text"}
            />
            <DashUploadEdit
              label="Company/School"
              name="institutionOrFirm"
              placeholder={uploadData?.companyOrSchool}
              setValue={setValue}
              type={"text"}
            />
            <DashUploadEdit
              label="Website"
              name="website"
              placeholder={uploadData?.website}
              setValue={setValue}
              type={"text"}
            />
            <DashUploadEdit
              label="Email"
              name="email"
              placeholder={uploadData?.email}
              setValue={setValue}
              type={"text"}
            />
            <DashUploadEdit
              label="Country"
              name="country"
              placeholder={uploadData?.country}
              setValue={setValue}
              type={"text"}
            />
            <DashUploadEdit
              label="Consultant"
              name="consultant"
              placeholder={uploadData?.consultant}
              setValue={setValue}
              type={"text"}
            />
            <DashUploadEdit
              label="Client"
              name="client"
              placeholder={uploadData?.client}
              setValue={setValue}
              type={"text"}
            />
            <DashUploadEdit
              label="Size"
              name="size"
              placeholder={uploadData?.size}
              setValue={setValue}
              type="number"
            />
            {/* <div className="dash_uploadedit">
              <p>
                Project Type and Year <span>*</span>
              </p>
              <div>
                <AdminTypeEdit isBuilt={data.built} setBuilt={setBuilt} />
              </div>
            </div> */}
            {builtshow && (
              <DashUploadEdit
                label="Year"
                name="constructionYear"
                placeholder={data.constructionYear}
                setValue={setValue}
                type="number"
              />
            )}
          </div>
        </>
      ) : (
        <p className="dash_uploadunavail">Project info unavailbale</p>
      )}
    </>
  );
};

export default DashUploadEditables;
