import ProjectFeedInfo from "./ProjectFeedInfo";
import ProjectFeedImg from "./ProjectFeedImg";
import Link from "next/link";

const ProjectFeed = ({ data }: { data: any }) => {
  return (
    <div>
      <ProjectFeedImg id={data?.projectId} data={data} />
      <h1 className="project_feedname">{data?.projectName}</h1>
      <div className="project_feedmore">
        <p>{data?.location}</p>
        <Link
          href={`/projects/${data?.projectId}/${
            data?.premium === true ? "premium" : "free"
          }`}
        >
          Read more {">>>"}
        </Link>
      </div>
      <ProjectFeedInfo id={data?.projectId} status={data?.built} data={data} />
    </div>
  );
};

export default ProjectFeed;
