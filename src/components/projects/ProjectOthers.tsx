import React from "react";
import ProjectFeedInfo from "./ProjectFeedInfo";

const ProjectOthers = () => {
  return (
    <div className="project_others">
      <div className="project_othershead">
        <p>Other Projects</p>
      </div>
      <div className="project_othersgrid">
        <div className="project_othersinfo">
          <div className="project_othersimage">
            {/* <Image src="" width={0} height={0} alt="feed image" sizes="100vw" /> */}
          </div>
          <ProjectFeedInfo id={"sssss"} status={true} />
        </div>
      </div>
    </div>
  );
};

export default ProjectOthers;
