"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css"; // Ensure styles are imported

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

function ArchQuill() {
  const [quillState, setQuillState] = useState("");

  const handleEditorChange = (content: string) => {
    // setQuillState(content);

    setQuillState(content);

    console.log("quill content", JSON.stringify(content));
    // console.log("quill content", content);
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
        value={quillState}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default ArchQuill;
