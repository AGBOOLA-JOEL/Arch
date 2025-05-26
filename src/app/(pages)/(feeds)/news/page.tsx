// "use client";
// import FeedFilter from "@/components/feed/FeedFilter";
// import FeedMap from "@/components/feed/FeedMap";
// import FeedSelect from "@/components/feed/FeedSelect";
// import ArchPagination from "@/components/general/ArchPagination";
// import React, { useState } from "react";

// const Page = () => {
//   const [currentItems, setCurrentItems] = useState<any[]>([]);
//   const [value, setValue] = useState("");
//   const data = ["1"];

//   return (
//     <div className="feed_display">
//       <div className="feed_displayheader">
//         <FeedSelect
//           value={value}
//           setValue={setValue}
//           options={["Local", "Global", "Technology", "Event"]}
//           title={"Full scholarships"}
//         />
//         <FeedSelect
//           value={value}
//           setValue={setValue}
//           options={["Top", "Recent", "Older"]}
//           title={"Time"}
//         />
//         <FeedFilter title="All filter" value={value} setValue={setValue} />
//       </div>

//       <FeedMap />

//       <div className="feed_displayPagination">
//         <ArchPagination
//           data={data}
//           type={"Columns"}
//           setCurrentItems={setCurrentItems}
//         />
//       </div>
//     </div>
//   );
// };

// export default Page;

import NewsPage from "@/components/static-pages/NewsPage";

export const revalidate = 60; // ISR every 60s
const page = 1;
const Page = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/news/public/all?page=${page}`,
    {
      next: { revalidate: 60 },
    }
  );
  const projects = await res.json();

  return <NewsPage initialNews={projects.data.newsArray} />;
};

export default Page;
