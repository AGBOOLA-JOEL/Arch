"use client";
import React, { useState } from "react";

const FeedYear = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );

  const filteredYears = years.filter((year) =>
    year.toString().includes(searchTerm)
  );

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setSearchTerm("");
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
              className={`feed_yearitem ${
                selectedYear === year ? "selected" : ""
              }`}
              onClick={() => handleYearSelect(year)}
              role="option"
              aria-selected={selectedYear === year}
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
