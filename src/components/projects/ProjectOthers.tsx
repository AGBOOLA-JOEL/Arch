import React from "react";
import ProjectFeedInfo from "./ProjectFeedInfo";
import { useProject } from "@/_hooks/useProject";
import Image from "next/image";

const ProjectOthers = () => {
  const pageSize = 2;
  const { projects } = useProject(pageSize);
  return (
    <div className="project_others">
      <div className="project_othershead">
        <p>Other Projects</p>
      </div>
      <div className="project_othersgrid">
        {projects?.map((data: any) => {
          return (
            <div className="project_othersinfo" key={data?.projectId}>
              <div className="project_othersimage">
                <Image
                  // src=""
                  // width={0}
                  // height={0}
                  // alt="feed image"
                  // sizes="100vw"
                  priority
                  src={data?.coverImage || "/assets/images/noimage.png"}
                  alt={"project-coverimage"}
                  width={0}
                  height={0}
                  sizes={"100vw"}
                />
              </div>
              <ProjectFeedInfo id={data?.projectId} status={true} data={data} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectOthers;
