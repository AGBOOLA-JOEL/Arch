"use client";
import FeedFilter from "@/components/feed/FeedFilter";
import FeedSelect from "@/components/feed/FeedSelect";
import { useEffect, useRef, useState } from "react";
import FeedSearch from "./FeedSearch";
import axios from "axios";
import { useGenselectors } from "@/_lib/store/general-store";

const FeedNewsSearch = ({
  data,
  setData,
  setIsLoading,
  page,
}: {
  data: any[];
  setData: (value: any) => void;
  setIsLoading: (value: boolean) => void;
  page: number;
}) => {
  const [time, setTime] = useState("");
  const [sch, setSch] = useState("");
  const [search, setSearch] = useState("");
  const openToast = useGenselectors.use.openToast();
  const lastPageRef = useRef(page);

  useEffect(() => {
    const fetchNews = async () => {
      const baseUrl = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/news/public/all`;
      const url =
        baseUrl +
        "?" +
        new URLSearchParams({
          scholarship: sch.trim().toLowerCase(),
          sortBy: time.trim().toLowerCase(),
          search: search.trim(),
          // type: type.trim(),
          page: page.toString(),
        });

      const isPageIncrement = page > lastPageRef.current;
      const hasSearchParams = sch || time || search;

      if (hasSearchParams || isPageIncrement) {
        setIsLoading(true);
      }

      try {
        const response = await axios.get(url);
        const newNews = response.data.data.newsArray;

        if (isPageIncrement) {
          setData((prev: any[]) => [...prev, ...newNews]);
        } else {
          setData(newNews);
        }

        lastPageRef.current = page;
      } catch (err: any) {
        openToast("Error fetching news", 4000);
        // console.error("Error fetching projects:", err.message);
      } finally {
        if (hasSearchParams || isPageIncrement) {
          setIsLoading(false);
        }
      }
    };

    fetchNews();
  }, [sch, time, search, page]);

  return (
    <div className="feed_newssearch">
      <FeedSelect
        value={sch}
        setValue={setSch}
        options={["Local", "Global", "Technology", "Event"]}
        title={"Full scholarships"}
      />
      <FeedSelect
        value={time}
        setValue={setTime}
        options={["Top", "Recent", "Older"]}
        title={"Time"}
      />
      <FeedSearch value={search} setValue={setSearch} />
    </div>
  );
};

export default FeedNewsSearch;
