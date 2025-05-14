"use client";
import { useMsgById } from "@/_hooks/useMessages";
import { useReport } from "@/_hooks/useReport";
import { fullFormatDate } from "@/_utils/formatdate";
import ArchBack from "@/components/general/ArchBack";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();

  const reportId = params?.reportid;

  const { reports, isLoading } = useReport();

  const filterReport = reports.filter(
    (data: any) => data?.reportId === reportId
  );
  return (
    <>
      {!isLoading ? (
        filterReport ? (
          <>
            {filterReport.map((rep: any) => {
              return (
                <div className="dash_view" key={rep?.reportId}>
                  {/* {id} */}
                  {/* slug 1 {slug[0]}
      slug 2{slug[1]} */}
                  <h1 className="dash_viewhead">
                    <span>From: {rep?.userEmail}</span>
                    <span>Date: {fullFormatDate(rep?.receivedAt)}</span>
                  </h1>
                  <div className="dash_viewcontent">
                    <h2 className="dash_viewsubject">{rep?.reportId}</h2>
                    <p>{rep?.reportBody}</p>
                  </div>
                  <div className="dash_viewbtn">
                    <ArchBack variant="primary" />
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="dash_view">
            <div className="dash_viewcontent">
              <h2 className="dash_viewsubject"> you have no message</h2>
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
