"use client";

import React, { useState } from "react";

export default function DashImageControl({
  isStrict,
  setIsStrict,
  isDevice,
  setIsDevice,
}: {
  isStrict: boolean;
  setIsStrict: React.Dispatch<React.SetStateAction<boolean>>;
  isDevice: Boolean;
  setIsDevice: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const toggleMode = () => {
    setIsStrict(!isStrict);
  };

  const toggleSource = () => {
    if (isDevice === true) {
      setIsStrict(false);
    }
    setIsDevice(!isDevice);
  };

  return (
    <div className="dash_uploadimgcontrol">
      <h1 className="dash_uploadimgcontrol__title">Image validation control</h1>

      <div className="dash_uploadimgcontrol__controls">
        <div className="dash_uploadimgcontrol__toggle-group">
          <span
            className={`dash_uploadimgcontrol__label ${
              isStrict ? "" : "dash_uploadimgcontrol__label--active"
            }`}
          >
            Unstrict
          </span>
          <label className="dash_uploadimgcontrol__toggle">
            <input
              type="checkbox"
              className="dash_uploadimgcontrol__checkbox"
              checked={isStrict}
              onChange={toggleMode}
              disabled={!isDevice}
            />
            <span className="dash_uploadimgcontrol__slider"></span>
          </label>
          <span
            className={`dash_uploadimgcontrol__label ${
              isStrict ? "dash_uploadimgcontrol__label--active" : ""
            }`}
          >
            Strict
          </span>
        </div>

        <span
          className="dash_uploadimgcontrol__selector"
          onClick={toggleSource}
        >
          {isDevice ? "select from folder" : "select from device"}
        </span>
      </div>
    </div>
  );
}
