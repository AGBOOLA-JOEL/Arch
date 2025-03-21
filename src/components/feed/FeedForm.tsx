"use client";
import { useState } from "react";
import ArchTags from "../general/ArchTags";
import ArchDnd from "../general/ArchDnd";
import ArchTextarea from "../general/ArchTextarea";
import ArchQuill from "../general/ArchQuill";
import ArchButton from "../general/ArchButton";

type FeedFormProp = {
  textarea: string;
  setTextarea: React.Dispatch<React.SetStateAction<string>>;
};
const FeedForm = ({ textarea, setTextarea }: FeedFormProp) => {
  const [tag, setTag] = useState(["Autodesk Revit", "Sketchup"]);
  const handlePreviewClick = () => {};
  return (
    <>
      <ArchTags
        tag={tag}
        setTag={setTag}
        title="Add tags 
        (press enter to add new tag)"
      />
      <div className="dash_postnewdnd">
        <ArchDnd header="Choose a cover image" />
      </div>

      <ArchTextarea
        label={"Not more than 350 characters"}
        desc={"*Provide a short decription of your news"}
        maxword={350}
        textarea={textarea}
        setTextarea={setTextarea}
      />
      <ArchQuill />

      <div className="dash_postnewbtn">
        <ArchButton
          name="preview"
          onClick={handlePreviewClick}
          variant="white"
        />
        <ArchButton
          name="Submit"
          onClick={handlePreviewClick}
          variant="primary"
        />
      </div>
    </>
  );
};

export default FeedForm;
