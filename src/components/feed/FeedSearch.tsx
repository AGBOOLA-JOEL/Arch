import React from "react";
import { Search } from "lucide-react";
type SearchProp = {
  setValue: (value: string) => void;
};
const FeedSearch = ({ setValue }: SearchProp) => {
  return (
    <div className="feed_search">
      <Search />
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default FeedSearch;
