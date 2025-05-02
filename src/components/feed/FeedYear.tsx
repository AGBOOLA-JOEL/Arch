"use client";
import React, { useState } from "react";

type YearProp = {
  value?: string | number;
  setValue: (value: any) => void;
  setOpen: (value: boolean) => void;
};
const FeedYear = ({ value, setValue, setOpen }: YearProp) => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );

  const filteredYears = years.filter((year) =>
    year.toString().includes(searchTerm)
  );

  const handleYearSelect = (year: number) => {
    setValue(year);
    setSearchTerm("");
    setOpen(false);
  };

  return (
    <div className="feed_year">
      <input
        type="number"
        placeholder="Search year"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoFocus
      />
      <ul className="feed_yearlist" role="listbox">
        {filteredYears.length > 0 ? (
          filteredYears.map((year: any) => (
            <li
              key={year}
              className={`feed_yearitem ${value === year ? "selected" : ""}`}
              onClick={() => handleYearSelect(year)}
              role="option"
              aria-selected={value === year}
            >
              {year}
            </li>
          ))
        ) : (
          <li className="feed_yearitem">No years found</li>
        )}
      </ul>
    </div>
  );
};

export default FeedYear;
