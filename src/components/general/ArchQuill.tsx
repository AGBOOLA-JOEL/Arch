"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css"; // Ensure styles are imported

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type QuillProp = {
  fieldname: string;
  setValue: any;
};
function ArchQuill({ setValue, fieldname }: QuillProp) {
  const [quillState, setQuillState] = useState("");

  const handleEditorChange = (
    value: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    setQuillState(value);
    setValue(fieldname, JSON.stringify(editor.getContents()));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }], // Bullet list issue fixed
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list", // Ensure "list" is included
    // "bullet", // Bullet should now work
    "script",
    "indent",
    "direction",
    "size",
    "color",
    "background",
    "font",
    "align",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="arch_quill">
      <ReactQuill
        theme="snow"
        onChange={(value, delta, source, editor) =>
          handleEditorChange(value, delta, source, editor)
        }
        // onChange={handleEditorChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default ArchQuill;
