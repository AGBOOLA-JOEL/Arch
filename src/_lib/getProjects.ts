// lib/fetchProjects.ts
import axios from "axios";

export const fetchProjects = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: any;
}) => {
  const [_key, { area, year, categories, search, type, pageSize }] = queryKey;

  const params = new URLSearchParams({
    area,
    year,
    categories,
    search,
    type,
    page: String(pageParam),
    pageSize: String(pageSize),
  });

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_CACHE_URL}/projects/public/all?${params}`
  );

  const projects = res.data.data.projects;
  return {
    projects,
    nextPage: pageParam + 1,
    hasMore: projects.length === Number(pageSize),
  };
};
