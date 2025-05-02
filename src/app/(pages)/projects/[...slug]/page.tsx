"use client";
import React from "react";
import "react-quill-new/dist/quill.snow.css";
import ProjectFeedInfo from "@/components/projects/ProjectFeedInfo";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectOthers from "@/components/projects/ProjectOthers";
import SideBar from "@/components/sidebar/SideBar";
import { useParams } from "next/navigation";
import { useNews } from "@/_hooks/useNews";
import { useProjectById } from "@/_hooks/useProject";
import { useUser } from "@/_hooks/useUser";
import { useAuthselectors } from "@/_lib/store/auth-store";
// import ReactQuill from "react-quill-new";
import dynamic from "next/dynamic";
import SkeletonFeed from "@/components/skeleton/skeletonfeed";
import Link from "next/link";
import { formatDate, formatTime, fullFormatDate } from "@/_utils/formatdate";

const Propage = () => {
  const params = useParams();
  const { news } = useNews();
  const { user } = useUser();
  const authenticated = useAuthselectors.use.loggedIn();
  const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
  const id = (params?.slug as string[])?.[0];
  const type = (params?.slug as string[])?.[1];

  const { project, isLoading, isError } = useProjectById(type, id);
  const data = project;
  const offmodules = {
    toolbar: false,
  };

  const quillState = React.useMemo(() => {
    try {
      return JSON.parse(data?.projectStory || "{}");
    } catch (error) {
      return "";
    }
  }, [data?.projectStory]);

  return (
    <>
      {!isLoading ? (
        <div className="project_single" key={data?.projectId}>
          <div className="project_singledisplay">
            <div className="project_singledetails">
              <p className="project_singletime">
                {/* by {singleData.user.user} */}
                Posted on {fullFormatDate(data?.date)} at{" "}
                {formatTime(data?.date)}
              </p>
              <p className="project_singletitle">{data?.projectName}</p>
              {/* slug 1 {slug[0]}
      slug 2{slug[1]} */}
              <div className="project_singlegallery">
                <ProjectGallery data={data?.images || []} />
              </div>
              <ProjectFeedInfo id={data?.projectId} status={true} data={data} />
              {user?.subscription?.premium ? (
                <div className="project_singlequill">
                  <ReactQuill
                    theme="snow"
                    value={quillState}
                    readOnly
                    modules={offmodules}
                  />
                </div>
              ) : (
                <div className="project_singleupgrade">
                  <p>
                    Upgrade your account to access full project details and
                    unlock all premium features!
                  </p>
                  <button>Upgrade Account</button>
                </div>
              )}
            </div>
            <div className="project_singleothers">
              <ProjectOthers />
            </div>
          </div>

          <div className="project_singlesidebar">
            <SideBar news={news} />
          </div>
        </div>
      ) : (
        <>
          {!authenticated ? (
            <div className="project_singlelogin">
              <p>
                login or signup to view project full project details and unlock
                all premium features!
              </p>
              <Link href="/login">Login</Link>
            </div>
          ) : (
            <div className="project_singleskeleton">
              <SkeletonFeed />
            </div>
          )}{" "}
        </>
      )}
    </>
  );
};

export default Propage;
