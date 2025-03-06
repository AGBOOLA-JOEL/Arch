"use client";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { v4 as uuid } from "uuid";

type SubmitSelectProp = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};
const SubmitSelect = ({ value, setValue }: SubmitSelectProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelectClick = (select: any) => {
    setValue(select);
    setIsOpen(false);
  };

  return (
    <div className="submitpr_select">
      <div
        className="submitpr_dropdown"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p>{value || "Project"}</p>
        <span
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <FaAngleDown />
        </span>
      </div>
      {isOpen && (
        <div className="submitpr_category">
          {categories.map((select, index) => {
            return (
              <p
                key={index}
                onClick={() => {
                  handleSelectClick(select.title);
                }}
              >
                {select.title}
              </p>
            );
          })}
        </div>
      )}
      <div></div>
    </div>
  );
};

export default SubmitSelect;

export const categories = [
  {
    id: 1,
    title: "Project",
    subtitle: [
      {
        id: uuid(),
        title: "Project1",
      },
      {
        id: uuid(),
        title: "Project2",
      },
    ],
  },

  {
    id: 3,
    title: "Comics",
  },
];
