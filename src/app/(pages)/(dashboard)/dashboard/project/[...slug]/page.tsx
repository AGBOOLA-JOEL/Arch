"use client";
import { useMsgById } from "@/_hooks/useMessages";
import { useProjectStatusId } from "@/_hooks/useProjectStatus";
import { fullFormatDate } from "@/_utils/formatdate";
import ArchBack from "@/components/general/ArchBack";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";
import Link from "next/link";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  // const  = (params?.slug as string[])?.[0];
  const id = (params?.slug as string[])?.[1];
  const { proid, status, isLoading } = useProjectStatusId(id);

  return (
    <>
      {!isLoading ? (
        proid ? (
          <div className="dash_view">
            {/* {id} */}
            {/* slug 1 {slug[0]}
      slug 2{slug[1]} */}
            <h1 className="dash_viewhead">
              <span>From: Admin</span>
              <span>Date: {fullFormatDate(proid?.date)}</span>
            </h1>
            <div className="dash_viewcontent">
              <h2 className="dash_viewsubject">
                Project {status?.toLowerCase()}
              </h2>

              {status === "PENDING" && (
                <p>
                  Your project <span>{proid?.projectName}</span> is awaiting
                  approval. <br />
                  We are currently reviewing the details of your project. <br />
                  Please expect an update soon. We appreciate your patience and
                  understanding.
                </p>
              )}

              {status === "APPROVED" && (
                <p>
                  We're excited to inform you that your project{" "}
                  <span>{proid?.projectName}</span> has been approved!. <br />
                  You can view the project details and status by following this
                  link:{" "}
                  <Link
                    href={`/projects/${id}/${
                      proid?.premium === true ? "premium" : "free"
                    }`}
                  >
                    Click here
                  </Link>
                  .<br /> Thank you for your support and cooperation!
                </p>
              )}

              {status === "REJECTED" && (
                <p>
                  We regret to inform you that your project{" "}
                  <span>{proid?.projectName}</span> has been rejected. For more
                  information and feedback, please visit the following link:
                  [Complaint URL]. <br />
                  Thank you for your understanding and we encourage you to
                  review the feedback and consider resubmission.
                </p>
              )}
              {/* <p>{msgid?.messageBody}</p> */}
            </div>
            <div className="dash_viewbtn">
              <ArchBack variant="white" />
            </div>
          </div>
        ) : (
          <div className="dash_view">
            <div className="dash_viewcontent">
              <h2 className="dash_viewsubject"> You have no message</h2>
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
