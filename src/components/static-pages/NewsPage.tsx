"use client";
import FeedFilter from "@/components/feed/FeedFilter";
import FeedMap from "@/components/feed/FeedMap";
import FeedSelect from "@/components/feed/FeedSelect";
import ArchPagination from "@/components/general/ArchPagination";
import React, { useState } from "react";
import FeedNewsSearch from "../feed/FeedNewsSearch";
import FeedPagination from "../feed/FeedPagination";

const NewsPage = ({ initialNews }: { initialNews: any[] }) => {
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [news, setNews] = useState(initialNews);
  const [isLoading, setIsLoading] = useState(false);
  //   const data = ["1"];

  return (
    <div className="feed_display">
      <div className="feed_displayheader">
        <FeedNewsSearch />
      </div>

      {news.map((data) => {
        return <FeedMap data={data} key={data?.postId} />;
      })}
      {/* <FeedMap /> */}

      <div className="feed_displayPagination">
        {/* fix later */}
        <FeedPagination
          data={news}
          type={"Columns"}
          setCurrentItems={setCurrentItems}
        />
      </div>
    </div>
  );
};

export default NewsPage;
