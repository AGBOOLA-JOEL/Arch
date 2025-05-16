"use client";
import { useMsgById } from "@/_hooks/useMessages";
import { useActionPayment, useAdminReference } from "@/_hooks/usePayment";
import useModalStore from "@/_lib/store/modal-store";
import { formatDate, fullFormatDate } from "@/_utils/formatdate";
import ArchBack from "@/components/general/ArchBack";
import ArchButton from "@/components/general/ArchButton";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";
import Image from "next/image";
import { useParams } from "next/navigation";

const Page = () => {
  const { openModal } = useModalStore();
  const params = useParams();
  const id = (params?.slug as string[])?.[1];

  const { adminref, status, isLoading } = useAdminReference(id) as {
    adminref: any;
    status: string;
    isLoading: boolean;
  };
  const { confirmMutation } = useActionPayment();

  const handleSubscribe = () => {
    confirmMutation.mutate(id.toString());
  };
  const handleReject = () => {
    openModal("reject-payment");
  };
  return (
    <>
      {!isLoading ? (
        adminref ? (
          <div className="dash_view">
            <h1 className="dash_viewhead">
              <span>From: {adminref?.user?.username}</span>
              <span>Date: {fullFormatDate(adminref?.initializedAt)}</span>
            </h1>

            <div className="dash_viewcontent">
              <h2 className="dash_viewsubject">Payment Details</h2>
              <p>PaymentId: {adminref?.paymentId}</p>
              <p>Payment Reference: {adminref?.paymentReference}</p>
            </div>

            {status === "PENDING" && (
              <div className="dash_viewcontent">
                <p>User did not initilaize payment or send receipt yet</p>
              </div>
            )}
            {status === "UNDER-REVIEW" && (
              <div className="dash_viewcontent">
                <div className="dash_viewimage">
                  {adminref?.images?.map((img: any) => {
                    return (
                      <Image
                        key={img?.imageUrl}
                        src={img?.imageUrl || "/assets/images/noimage.png"}
                        alt="admin payment image"
                        width={0}
                        height={0}
                        sizes="100vw"
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {status === "REJECTED" && (
              <div className="dash_viewcontent">
                <p>
                  Initialization Date:{" "}
                  <span>{formatDate(adminref?.initializedAt)}</span>
                </p>
                <p>
                  Amount:{" "}
                  <span>
                    {adminref?.currency}
                    {adminref?.amount}
                  </span>{" "}
                </p>
                <p>
                  Reason for Rejection: [Reason Provided by Payment Processor]
                </p>

                <div className="dash_viewimage">
                  {adminref?.images?.map((img: any) => {
                    return (
                      <Image
                        key={img?.imageUrl}
                        src={img?.imageUrl || "/assets/images/noimage.png"}
                        alt="admin payment image"
                        width={0}
                        height={0}
                        sizes="100vw"
                      />
                    );
                  })}
                </div>
              </div>
            )}
            <div className="dash_viewbtn">
              {status === "UNDER-REVIEW" && (
                <>
                  <ArchButton
                    name="Subscribe user"
                    type="button"
                    variant="white"
                    onClick={handleSubscribe}
                  />
                  <ArchButton
                    name="Reject payment"
                    type="button"
                    variant="white"
                    onClick={handleReject}
                  />
                </>
              )}
              <ArchBack variant="primary" />
            </div>
          </div>
        ) : (
          <div className="dash_view">
            <div className="dash_viewcontent">
              <h2 className="dash_viewsubject"> You have no payment</h2>
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
