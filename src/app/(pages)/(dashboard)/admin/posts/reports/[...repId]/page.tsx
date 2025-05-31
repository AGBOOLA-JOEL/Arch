"use client";
import "react-quill-new/dist/quill.snow.css";
import { usePostReportAction, usePostReportId } from "@/_hooks/useReport";
import { fullFormatDate } from "@/_utils/formatdate";
import ArchBack from "@/components/general/ArchBack";
import ArchButton from "@/components/general/ArchButton";
import Image from "next/image";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import React from "react";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";
import useModalStore from "@/_lib/store/modal-store";

const Page = () => {
  const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
  const params = useParams();
  const { openModal } = useModalStore();
  const reportId = params?.repId as string;

  const { postReportId, isLoading } = usePostReportId(reportId);
  const offmodules = {
    toolbar: false,
  };
  const quillState = React.useMemo(() => {
    try {
      return JSON.parse(postReportId?.news?.body || "{}");
    } catch (error) {
      return "";
    }
  }, [postReportId?.news?.body]);

  const { unpublishMutation } = usePostReportAction();

  const handleUnpublish = () => {
    openModal("admin-reportpost");
  };
  return (
    <>
      {!isLoading ? (
        postReportId ? (
          <div className="dash_view">
            <h1 className="dash_viewhead">
              <span>STATUS : {postReportId?.status}</span>
            </h1>
            <h1 className="dash_viewhead">
              <span>Title : {postReportId?.news?.title}</span>
              <span>{fullFormatDate(postReportId?.news?.date)}</span>
            </h1>

            <div className="dash_viewcontent">
              <h2 className="dash_viewsubject">
                Posted by : {postReportId?.news?.user?.username}
              </h2>
              <h2 className="dash_viewsubject">
                Reported by : {postReportId?.reporter?.username}
                <p>Categories : {postReportId?.categories}</p>
              </h2>
            </div>

            <div className="dash_viewcontent">
              <div className="dash_viewimage">
                <Image
                  src={
                    postReportId?.news?.image || "/assets/images/noimage.png"
                  }
                  alt="admin report image"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            </div>
            <div className="dash_viewcontent">
              <div></div>
              {postReportId?.news?.body && (
                <ReactQuill
                  theme="snow"
                  value={quillState}
                  readOnly
                  modules={offmodules}
                />
              )}
            </div>

            <div className="dash_viewbtn">
              {postReportId?.status === "UNRESOLVED" && (
                <ArchButton
                  name=" Unpublish news"
                  variant="white"
                  type="button"
                  onClick={handleUnpublish}
                />
              )}
              <ArchBack variant="primary" />
            </div>
          </div>
        ) : (
          <div className="dash_view">
            <div className="dash_viewcontent">
              <h2 className="dash_viewsubject"> You have no reports</h2>
            </div>
            <div className="dash_viewbtn">
              <ArchBack variant="white" />
            </div>
          </div>
        )
      ) : (
        <div className="dash_viewskeleton">
          <SkeletonStatus />
        </div>
      )}
    </>
  );
};

export default Page;
