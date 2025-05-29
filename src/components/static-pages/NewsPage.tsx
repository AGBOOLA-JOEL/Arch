"use client";
import FeedFilter from "@/components/feed/FeedFilter";
import FeedMap from "@/components/feed/FeedMap";
import FeedSelect from "@/components/feed/FeedSelect";
import ArchPagination from "@/components/general/ArchPagination";
import React, { useState } from "react";
import FeedNewsSearch from "../feed/FeedNewsSearch";
import FeedPagination from "../feed/FeedPagination";
import ArchSpinner from "../general/ArchSpinner";
import ArchLoadmore from "../general/ArchLoadmore";
import ArchFade from "../general/ArchFade";

const NewsPage = ({ initialNews }: { initialNews: any[] }) => {
  const [news, setNews] = useState(initialNews);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <div className="feed_display">
      <div className="feed_displayheader">
        <FeedNewsSearch
          data={news}
          setData={setNews}
          setIsLoading={setIsLoading}
          page={page}
        />
      </div>

      {news.map((data) => {
        return (
          <ArchFade
            blur={true}
            duration={500}
            easing="ease-out"
            initialOpacity={0}
            key={data?.postId}
          >
            <FeedMap data={data} />
          </ArchFade>
        );
      })}

      {isLoading && (
        <div>
          <ArchSpinner />
        </div>
      )}

      <ArchLoadmore onLoadMore={handleLoadMore} isLoading={isLoading} />
      {/* <FeedMap /> */}

      {/* <div className="feed_displayPagination">
 
        <FeedPagination
          data={news}
          type={"Columns"}
          setCurrentItems={setCurrentItems}
        />
      </div> */}
    </div>
  );
};

export default NewsPage;
