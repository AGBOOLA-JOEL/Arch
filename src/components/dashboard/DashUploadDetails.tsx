import React from "react";
import ArchQuill from "../general/ArchQuill";
import { Controller } from "react-hook-form";
import ArchTags from "../general/ArchTags";
const DashUploadDetails = ({
  setValue,
  control,
}: {
  setValue: any;
  control: any;
}) => {
  return (
    <div className="dash_uploaddetails">
      <Controller
        name="architect"
        control={control}
        render={({ field }) => (
          <ArchTags
            // tag={field.value ?? []}
            tag={(field.value ?? []).filter(
              (v: any): v is string => typeof v === "string"
            )}
            setTag={field.onChange}
            title="Add architect 
            (press enter to add new architect)"
          />
        )}
      />
      <ArchQuill fieldname={"projectStory"} setValue={setValue} />
    </div>
  );
};

export default DashUploadDetails;
