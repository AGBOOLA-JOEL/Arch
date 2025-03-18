import ProjectFeedInfo from "@/components/projects/ProjectFeedInfo";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectOthers from "@/components/projects/ProjectOthers";
import SideBar from "@/components/sidebar/SideBar";
import React from "react";

const Propage = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const { slug } = await params;
  return (
    <div className="project_single">
      <div className="project_singledisplay">
        <div className="project_singledetails">
          <p className="project_singletime">
            {/* by {singleData.user.user} */}
            Posted on 2-2-2022 at 9:45am
          </p>
          <p className="project_singletitle">Why you should not buy a house</p>
          {/* slug 1 {slug[0]}
        slug 2{slug[1]} */}
          <div className="project_singlegallery">
            <ProjectGallery />
          </div>
          <ProjectFeedInfo id={"sssss"} status={true} />
          <div className="project_singleupgrade">
            <p>
              Upgrade your account to access full project details and unlock all
              premium features!
            </p>
            <button>Upgrade Account</button>
          </div>
          {/* <div className="project_singlequill"></div> */}
        </div>
        <div className="project_singleothers">
          <ProjectOthers />
        </div>
      </div>

      <div className="project_singlesidebar">
        <SideBar />
      </div>
    </div>
  );
};

export default Propage;
