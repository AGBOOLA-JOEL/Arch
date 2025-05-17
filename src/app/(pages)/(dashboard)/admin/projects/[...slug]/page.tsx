"use client";
import {
  useActionProject,
  useAdminProject,
  useAdminProjectId,
} from "@/_hooks/useProjectStatus";
import useModalStore from "@/_lib/store/modal-store";
import { fullFormatDate } from "@/_utils/formatdate";
import DashClipboard from "@/components/dashboard/DashClipboard";
import ArchBack from "@/components/general/ArchBack";
import ArchButton from "@/components/general/ArchButton";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";

const Page = () => {
  const params = useParams();
  const { openModal } = useModalStore();
  const pathstatus = (params?.slug as string[])?.[0];
  const id = (params?.slug as string[])?.[1];
  const { proid, status, isLoading } = useAdminProjectId(id);
  const router = useRouter();
  const { unpublishMutation } = useActionProject();

  const rejectProject = () => {
    openModal("reject-project");
  };
  const approveProject = () => {
    router.push(`/admin/projects/upload/${id}`);
  };
  const unpublishProject = () => {
    openModal("loading");
    unpublishMutation.mutate(id);
  };

  if (pathstatus !== "message") {
    notFound(); // This will show the 404 page
  }
  return (
    <>
      {!isLoading ? (
        proid ? (
          <div className="dash_view">
            {/* {id} */}
            {/* slug 1 {slug[0]}
      slug 2{slug[1]} */}
            <h1 className="dash_viewhead">
              <span>{status} PROJECT</span>
              <span>{fullFormatDate(proid?.date)}</span>
            </h1>

            <div className="dash_viewcontent">
              <p>
                Project title: <span>{proid?.projectName}</span>{" "}
              </p>
              <p>
                Submitted by: <span>{proid?.user?.user}</span>{" "}
              </p>
              <p>
                Company/School: <span>{proid?.institutionOrFirm}</span>{" "}
              </p>
              <p>
                Website: <span>{proid?.website}</span>{" "}
              </p>
              <p>
                Email: <span>{proid?.email}</span>{" "}
              </p>
              <p>
                Country: <span>{proid?.country}</span>{" "}
              </p>
              <p>
                Consultant: <span>{proid?.consultant}</span>{" "}
              </p>
              <p>
                Client: <span> {proid?.client}</span>{" "}
              </p>
              <p>
                Size: <span> {proid?.size}</span>{" "}
              </p>
            </div>
            <div className="dash_viewcontent">
              <h2 className="dash_viewsubject">Google drive link:</h2>
              <div className="dash_viewclip">
                <DashClipboard value={proid?.googleDriveLink} />
              </div>
            </div>
            {status === "REJECTED" && (
              <div className="dash_viewcontent">
                <h2 className="dash_viewsubject">Rejection reason:</h2>
                <p>{proid?.reason}</p>
              </div>
            )}

            <div className="dash_viewbtn">
              {status === "PENDING" && (
                <>
                  <ArchButton
                    name="Approve & upload"
                    variant="white"
                    type="button"
                    onClick={approveProject}
                  />
                  <ArchButton
                    name="Reject project"
                    variant="white"
                    type="button"
                    onClick={rejectProject}
                  />
                </>
              )}
              {status === "APPROVED" && (
                <>
                  <ArchButton
                    name=" Unpublish project"
                    variant="white"
                    type="button"
                    onClick={unpublishProject}
                  />
                </>
              )}
              <ArchBack variant="primary" />
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
