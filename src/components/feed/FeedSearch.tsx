import React, { useState } from "react";
import { Search } from "lucide-react";
import { FiX } from "react-icons/fi";

type SearchProp = {
  value: string;
  setValue: (value: string) => void;
};
const FeedSearch = ({ value, setValue }: SearchProp) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setValue(input); // Trigger only on Enter
      console.log(input, "imput value");
    }
  };
  return (
    <div className={`feed_search  ${value ? "selected" : ""}`}>
      {value ? (
        <FiX
          size={20}
          onClick={() => {
            setValue("");
            setInput("");
            // setIsOpen(false);
          }}
        />
      ) : (
        <Search />
      )}

      <input
        type="text"
        placeholder="Search"
        disabled={value !== ""}
        // value={value}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default FeedSearch;
