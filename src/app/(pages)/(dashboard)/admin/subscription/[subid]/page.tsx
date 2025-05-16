"use client";
import { useMsgById } from "@/_hooks/useMessages";
import { useReport } from "@/_hooks/useReport";
import { useSubscription } from "@/_hooks/useSubscription";
import { formatDate, fullFormatDate } from "@/_utils/formatdate";
import ArchBack from "@/components/general/ArchBack";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();

  const subId = params?.subid;

  const { subscriptions, isLoading } = useSubscription();
  const filterSubs = subscriptions.filter(
    (sub: any) => sub?.subscriptionId === subId
  );
  return (
    <>
      {!isLoading ? (
        filterSubs ? (
          <>
            {filterSubs.map((sub: any) => {
              return (
                <div className="dash_view" key={sub?.subscriptionId}>
                  {/* {id} */}
                  {/* slug 1 {slug[0]}
      slug 2{slug[1]} */}
                  <h1 className="dash_viewhead">
                    <span>From: {sub?.user?.username}</span>
                    <span>Date: {fullFormatDate(sub?.startDate)}</span>
                  </h1>
                  <div className="dash_viewcontent">
                    <h2 className="dash_viewsubject">Subscription details</h2>
                    <p>
                      Subscription Type: <span> {sub?.type}</span>
                    </p>
                    <p>
                      Subscription Plan: <span>{sub?.userPlan}</span>
                    </p>
                    <p>
                      Subscription Id: <span> {sub?.subscriptionId}</span>
                    </p>
                  </div>

                  <div className="dash_viewcontent">
                    <h2 className="dash_viewsubject">Subscription Period</h2>
                    <p>
                      Start Date: {"    "}
                      <span>{formatDate(sub?.startDate)}</span>
                    </p>
                    <p>
                      End Date:{"    "}
                      <span>{formatDate(sub?.expiryDate)}</span>
                    </p>
                    <p>
                      Status:{"    "}
                      <span>
                        {sub.isActive === "true" ? "Active" : "Expired"}
                      </span>
                    </p>
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
              <h2 className="dash_viewsubject">
                {" "}
                you have no subscription available
              </h2>
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
