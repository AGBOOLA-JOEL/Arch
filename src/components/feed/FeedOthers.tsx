import Link from "next/link";
import React from "react";

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
        <div className="feed_othersinfo">
          <Link href={`/${"news"}/${""}`}>
            <div className="feed_othersimage">
              {/* <Image src="" width={0} height={0} alt="feed image" sizes="100vw" /> */}
            </div>

            <div className="feed_otherstext">
              <p>Architecture Beyond Design: Getting to Know BLOCO</p>
              <p>By Archcache on 5-2-2022</p>
            </div>
          </Link>
        </div>
        {/* );
        })} */}
      </div>
    </div>
  );
};

export default FeedOthers;
