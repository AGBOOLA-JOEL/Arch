import ProjectPage from "@/components/static-pages/ProjectPage";

export const revalidate = 60; // ISR every 60s

const Page = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/projects/public/all?pageSize=15`,
    {
      next: { revalidate: 60 },
    }
  );
  const projects = await res.json();

  return <ProjectPage initialProjects={projects.data.projects} />;
};

export default Page;
