"use client";
import { IoArchive } from "react-icons/io5";
import { IoMdMailUnread } from "react-icons/io";
import { BsFillPostcardFill } from "react-icons/bs";
import { useMessages } from "@/_hooks/useMessages";
import { useUser } from "@/_hooks/useUser";
import { useProjectStatus } from "@/_hooks/useProjectStatus";
import { usePaymentStatus } from "@/_hooks/usePayment";

const Page = () => {
  const { user } = useUser();

  const { prostatus } = useProjectStatus();

  const approvedProject =
    prostatus
      ?.filter((data: any) => data?.user?.user === user?.username)
      .filter((data: any) => data?.status === "APPROVED") || [];
  const pendingProject =
    prostatus
      ?.filter((data: any) => data?.user?.user === user?.username)
      .filter((data: any) => data?.status === "PENDING") || [];

  const { paystatus } = usePaymentStatus();

  const pendingPayment =
    paystatus?.filter(
      (data: any) =>
        data?.paymentStatus === "PENDING" ||
        data?.paymentStatus === "UNDER-REVIEW"
    ) || [];
  const { messages } = useMessages();
  const filteredmsg = messages?.filter((data: any) => data?.hasRead === false);
  return (
    <div className="dash_stat">
      <div className="dash_statmap">
        {[
          {
            icon: <IoArchive />,
            title: "Your approved Projects",
            value: approvedProject?.length === 0 ? 0 : approvedProject?.length,
          },
          {
            icon: <IoArchive />,
            title: "Pending Projects",
            value: pendingProject?.length === 0 ? 0 : pendingProject?.length,
          },
          // { icon: <BsFillPostcardFill />, title: "Your posts", value: 0 },
          {
            icon: <IoMdMailUnread />,
            title: "Unread messages",
            value: filteredmsg?.length === 0 ? 0 : filteredmsg?.length,
          },
          {
            icon: <IoMdMailUnread />,
            title: "Pending payments",
            value: pendingPayment?.length === 0 ? 0 : pendingPayment?.length,
          },
        ].map(({ icon, title, value }) => (
          <div key={title} className="dash_statdata">
            {icon}
            <p>
              <span>{title}</span>
              <span>{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
