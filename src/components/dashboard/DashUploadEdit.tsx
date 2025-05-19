"use client";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

type EditProp = {
  label: string;
  name: string;
  placeholder: string;
  setValue: any;
  type: string;
};

const DashUploadEdit = ({
  label,
  name,
  placeholder,
  setValue,
  type,
}: EditProp) => {
  const [editMode, setEditMode] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const handleToggle = () => {
    if (editMode && inputVal.trim()) {
      setValue(name, inputVal); // update RHF field value
    }
    setEditMode(!editMode);
  };

  return (
    <div className="dash_uploadedit">
      <div className="dash_uploadedit_content">
        <span className="dash_uploadedit_label">{label}:</span>
        {!editMode ? (
          <p className="dash_uploadedit_value">
            {inputVal || placeholder || "Add a value"}
          </p>
        ) : (
          <input
            className="dash_uploadedit_input"
            type={type}
            value={inputVal}
            placeholder={placeholder}
            onChange={(e) => setInputVal(e.target.value)}
          />
        )}
      </div>
      <span className="dash_uploadedit_action" onClick={handleToggle}>
        <span className="dash_uploadedit_action_text">
          {editMode ? "save" : "edit"}
        </span>
        <CiEdit className="dash_uploadedit_icon" />
      </span>
    </div>
  );
};

export default DashUploadEdit;
