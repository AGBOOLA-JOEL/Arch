import Link from "next/link";
import React from "react";
import FeedOthersInfo from "./FeedOthersInfo";

type FeedProp = {
  name: string;
};
const FeedOthers = ({ name }: FeedProp) => {
  return (
    <div className="feed_others">
      <div className="feed_othershead">
        <p>Other {name}</p>
      </div>

      <div className="feed_othersgrid">
        {/* {newsFilter.map((singleData) => {
          return ( */}
        <FeedOthersInfo />

        {/* );
        })} */}
      </div>
    </div>
  );
};

export default FeedOthers;
