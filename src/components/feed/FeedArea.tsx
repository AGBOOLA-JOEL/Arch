"use client";
import { useGenselectors } from "@/_lib/store/general-store";
import React, { useState } from "react";

type AreaProp = {
  value?: string | number;
  setValue: (value: any) => void;
  setOpen: (value: boolean) => void;
};
const FeedArea = ({ setValue, setOpen }: AreaProp) => {
  const openToast = useGenselectors.use.openToast();
  const [input, setInput] = useState("");
  return (
    <div className="feed_area">
      <div className="feed_areainput">
        <input
          type="number"
          placeholder="Area in m2"
          onChange={(e: any) => {
            setInput(e.target.value);
          }}
        />

        <button
          className="feed_areaapply"
          onClick={() => {
            if (input !== "") {
              setOpen(false);
              setValue(input);
            } else {
              openToast("area field is empty", 3000);
            }
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FeedArea;
