"use client";
import FeedFilter from "@/components/feed/FeedFilter";
import FeedSelect from "@/components/feed/FeedSelect";
import { useState } from "react";

const FeedNewsSearch = () => {
  const [value, setValue] = useState("");
  return (
    <>
      {" "}
      <FeedSelect
        value={value}
        setValue={setValue}
        options={["Local", "Global", "Technology", "Event"]}
        title={"Full scholarships"}
      />
      <FeedSelect
        value={value}
        setValue={setValue}
        options={["Top", "Recent", "Older"]}
        title={"Time"}
      />
      <FeedFilter title="All filter" value={value} setValue={setValue} />
    </>
  );
};

export default FeedNewsSearch;
