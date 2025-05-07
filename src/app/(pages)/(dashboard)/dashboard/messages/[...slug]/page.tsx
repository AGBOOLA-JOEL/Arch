"use client";
import { useMsgById } from "@/_hooks/useMessages";
import { fullFormatDate } from "@/_utils/formatdate";
import ArchBack from "@/components/general/ArchBack";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id = (params?.slug as string[])?.[0];

  const { msgid, isLoading } = useMsgById(id);

  return (
    <>
      {!isLoading ? (
        msgid ? (
          <div className="dash_view">
            {/* {id} */}
            {/* slug 1 {slug[0]}
      slug 2{slug[1]} */}
            <h1 className="dash_viewhead">
              <span>From: {msgid?.sender?.username}</span>
              <span>Date: {fullFormatDate(msgid?.date)}</span>
            </h1>
            <div className="dash_viewcontent">
              <h2 className="dash_viewsubject">{msgid?.subject}</h2>
              <p>{msgid?.messageBody}</p>
            </div>
            <div className="dash_viewbtn">
              <ArchBack variant="primary" />
            </div>
          </div>
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
