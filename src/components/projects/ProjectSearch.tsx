// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import FeedCategory from "../feed/FeedCategory";
// import FeedFilter from "../feed/FeedFilter";
// import FeedSearch from "../feed/FeedSearch";
// import FeedDropdown from "@/components/feed/FeedDropdown";
// import axios from "axios";

// const ProjectSearch = ({
//   data,
//   setData,
//   setIsLoading,
//   page,
// }: {
//   data: any[];
//   setData: (value: any) => void;
//   setIsLoading: (value: boolean) => void;
//   page: number;
// }) => {
//   const [area, setArea] = useState("");
//   const [year, setYear] = useState("");
//   const [type, setType] = useState("");

//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string>("");

//   const lastPageRef = useRef(page);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       const baseUrl = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/projects/public/all`;
//       const url =
//         baseUrl +
//         "?" +
//         new URLSearchParams({
//           area: area.trim(),
//           year: year.trim(),
//           categories: selectedCategory.trim(),
//           search: search.trim(),
//           type: type.trim(),
//           page: page.toString(),
//         });

//       setIsLoading(true);
//       try {
//         const response = await axios.get(url);
//         const newProjects = response.data.data.projects;

//         const isPageIncrement = page > lastPageRef.current;

//         if (isPageIncrement) {
//           setData((prev: any[]) => [...prev, ...newProjects]);
//         } else {
//           setData(newProjects);
//         }

//         lastPageRef.current = page;
//       } catch (err: any) {
//         console.error("Error fetching projects:", err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProjects();
//   }, [area, year, type, search, selectedCategory, page, setData, setIsLoading]);

//   return (
//     <>
//       <FeedCategory
//         selectedCategory={selectedCategory}
//         setSelectedCategory={setSelectedCategory}
//       />
//       <FeedDropdown value={area} setValue={setArea} title={"Area"} />
//       <FeedDropdown value={year} setValue={setYear} title={"Year"} />
//       {/* <FeedFilter value={filter} setValue={setFilter} title={"All Filter"} /> */}
//       <FeedSearch value={search} setValue={setSearch} />
//       <FeedDropdown value={type} setValue={setType} title={"Type"} />
//     </>
//   );
// };

// export default ProjectSearch;

"use client";

import React, { useEffect, useRef, useState } from "react";
import FeedCategory from "../feed/FeedCategory";
import FeedDropdown from "@/components/feed/FeedDropdown";
import FeedSearch from "../feed/FeedSearch";
import axios from "axios";
import { useGenselectors } from "@/_lib/store/general-store";

const ProjectSearch = ({
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
  const [area, setArea] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const openToast = useGenselectors.use.openToast();
  const lastPageRef = useRef(page);

  useEffect(() => {
    const fetchProjects = async () => {
      const baseUrl = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/projects/public/all`;
      const url =
        baseUrl +
        "?" +
        new URLSearchParams({
          area: area.trim(),
          year: year.trim(),
          categories: selectedCategory.trim(),
          search: search.trim(),
          type: type.trim(),
          page: page.toString(),
        });

      const isPageIncrement = page > lastPageRef.current;
      const hasSearchParams =
        area || year || type || search || selectedCategory;

      if (hasSearchParams || isPageIncrement) {
        setIsLoading(true);
      }

      try {
        const response = await axios.get(url);
        const newProjects = response.data.data.projects;

        if (isPageIncrement) {
          setData((prev: any[]) => [...prev, ...newProjects]);
        } else {
          setData(newProjects);
        }

        lastPageRef.current = page;
      } catch (err: any) {
        openToast("Error fetching projects", 4000);
        // console.error("Error fetching projects:", err.message);
      } finally {
        if (hasSearchParams || isPageIncrement) {
          setIsLoading(false);
        }
      }
    };

    fetchProjects();
  }, [area, year, type, search, selectedCategory, page]);

  return (
    <>
      <FeedCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <FeedDropdown value={area} setValue={setArea} title={"Area"} />
      <FeedDropdown value={year} setValue={setYear} title={"Year"} />
      <FeedSearch value={search} setValue={setSearch} />
      <FeedDropdown value={type} setValue={setType} title={"Type"} />
    </>
  );
};

export default ProjectSearch;
