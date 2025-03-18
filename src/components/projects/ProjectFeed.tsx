import ProjectFeedInfo from "./ProjectFeedInfo";
import ProjectFeedImg from "./ProjectFeedImg";

const ProjectFeed = () => {
  return (
    <div>
      <ProjectFeedImg id="ggggg" data={["s", "2"]} />
      <h1 className="project_feedname">projectName</h1>
      <div className="project_feedmore">
        <p>location</p>
        <p>Read more {">>>"}</p>
      </div>
      <ProjectFeedInfo id={"sssss"} status={true} />
    </div>
  );
};

export default ProjectFeed;
