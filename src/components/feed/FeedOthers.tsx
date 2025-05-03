import Link from "next/link";
import React from "react";
import FeedOthersInfo from "./FeedOthersInfo";

type FeedProp = {
  name: string;
  data: any;
};
const FeedOthers = ({ name, data }: FeedProp) => {
  const infodata = data;
  return (
    <div className="feed_others">
      <div className="feed_othershead">
        <p>Other {name}</p>
      </div>

      <div className="feed_othersgrid">
        {/* {newsFilter.map((singleData) => {
          return ( */}

        {/* <FeedOthersInfo data={data} /> */}

        {infodata?.map((news: any) => (
          <FeedOthersInfo key={news.postId} data={news} />
        ))}

        {/* );
        })} */}
      </div>
    </div>
  );
};

export default FeedOthers;
