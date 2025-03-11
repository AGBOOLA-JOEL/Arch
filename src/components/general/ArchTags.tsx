import { ArchTagProp } from "@/types/general.type";
import React from "react";
import { TagsInput } from "react-tag-input-component";

const ArchTags = ({ title, tag, setTag }: ArchTagProp) => {
  return (
    <div className="arch_tags">
      <h1>*{title}</h1>

      {/* <pre>{JSON.stringify(selected)}</pre> */}

      <TagsInput
        value={tag}
        onChange={setTag}
        name="tags"
        placeHolder="Enter tags"
      />
    </div>
  );
};

export default ArchTags;
