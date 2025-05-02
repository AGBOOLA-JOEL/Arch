import HomePage from "@/components/static-pages/HomePage";

const Page = async () => {
  const [projectsRes, newsRes] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/projects/public/all?pageSize=8`,
      {
        next: { revalidate: 60 },
      }
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/news/public/all?pageSize=2`,
      {
        next: { revalidate: 60 },
      }
    ),
  ]);

  const projectsData = await projectsRes.json();
  const newsData = await newsRes.json();

  return (
    <HomePage
      projects={projectsData?.data?.projects}
      news={newsData?.data?.newsArray}
    />
  );
};

export default Page;
