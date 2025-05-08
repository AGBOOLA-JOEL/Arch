"use client";

import { usePaymentStatusId } from "@/_hooks/usePayment";

import { formatDate, fullFormatDate } from "@/_utils/formatdate";
import ArchBack from "@/components/general/ArchBack";
import ArchButton from "@/components/general/ArchButton";
import SkeletonStatus from "@/components/skeleton/skeletonstatus";
import Image from "next/image";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  // const  = (params?.slug as string[])?.[0];
  const id = (params?.slug as string[])?.[1];
  const { payid, status, isLoading } = usePaymentStatusId(id);

  return (
    <>
      {!isLoading ? (
        payid ? (
          <div className="dash_view">
            {/* {id} */}
            {/* slug 1 {slug[0]}
      slug 2{slug[1]} */}
            <h1 className="dash_viewhead">
              <span>From: Admin</span>
              <span>Date: {fullFormatDate(payid?.initializedAt)}</span>
            </h1>
            <div className="dash_viewcontent">
              <h2 className="dash_viewhead">PaymentId: {payid?.paymentId}</h2>
              {/* <h2 className="dash_viewhead">
                Payment Reference: {payid?.paymentReference}
              </h2> */}
              <h2 className="dash_viewsubject">
                Payment {status?.toLowerCase()}
              </h2>

              {status === "PENDING" && (
                <p>
                  kindly check your email for payment details if you have not
                  initialized a payment yet. We appreciate your patience and
                  understanding during this time.
                </p>
              )}

              {status === "UNDER-REVIEW" && (
                <>
                  <p>
                    We are currently processing your payment details. <br />
                    Please expect an update soon. We appreciate your patience
                    and understanding during this time.
                  </p>

                  {payid?.images.map((img: any) => {
                    return (
                      <Image
                        src={img.imageUrl}
                        alt="transactionimage"
                        width={0}
                        height={0}
                        sizes={"100vw"}
                      />
                    );
                  })}
                </>
              )}

              {status === "CONFIRMED-AND-SUBSCRIBED" && (
                <>
                  <h2 className="dash_viewhead">
                    Plan:{" "}
                    {payid?.user?.subscription?.currentUserPlan?.toLowerCase()}
                    {"    "}
                    Type:{" "}
                    {payid?.user?.subscription?.subscriptionType?.toLowerCase() ||
                      "none"}
                  </h2>

                  <p>Dear {payid?.user?.username}</p>
                  <p>
                    We are pleased to inform you that your subscription has been
                    successfully confirmed!
                  </p>

                  <p>
                    <span>Subscription Details:</span>{" "}
                  </p>
                  <p>
                    <span>
                      Start Date:
                      {formatDate(payid?.user?.subscription?.startDate)}
                    </span>
                    <br />
                    <span>
                      End Date:
                      {formatDate(payid?.user?.subscription?.expiryDate)}
                    </span>
                  </p>
                  <p>
                    Thank you for choosing us! We're excited to have you onboard
                    and look forward to providing you with great value during
                    this period.
                  </p>

                  <p>
                    If you have any questions or need assistance, feel free to
                    reach out to our support team.
                  </p>

                  <p>
                    Best regards,
                    <br /> Archcache.
                  </p>
                </>
              )}

              {status === "REJECTED" && (
                <p>
                  We regret to inform you that the payment for your subscription
                  with ref no: <span>{payid?.paymentReference}</span> has been
                  declined. For more details on the issue, please visit the
                  following link: [Payment Details URL]. <br />
                  Thank you for your understanding, and we encourage you to
                  review the details and attempt the payment again.
                </p>
              )}
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
              <ArchButton
                name={"Contact support"}
                variant="primary"
                type={"button"}
              />
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
