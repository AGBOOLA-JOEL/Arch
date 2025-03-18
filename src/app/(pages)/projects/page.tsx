import ArchPagination from "@/components/general/ArchPagination";
import ProjectFeed from "@/components/projects/ProjectFeed";

const Page = () => {
  return (
    <div className="projects_feed">
      <div className="project_feeddisplay">
        <ProjectFeed />
        <ProjectFeed />
        <ProjectFeed />
        <ProjectFeed />
        <ProjectFeed />
        <ProjectFeed />
      </div>
    </div>
  );
};

export default Page;
