"use client";
import React from "react";
import { MdOutlinePendingActions } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { PiUserLight } from "react-icons/pi";
import { formatDate } from "@/_utils/formatdate";
import { FaRegCircleCheck } from "react-icons/fa6";
import { GrCurrency } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { TbCategory } from "react-icons/tb";
import { useReadMessage } from "@/_hooks/useMessages";
import { useRouter } from "next/navigation";
import ArchBack from "../general/ArchBack";

type DashStatusProp = {
  type: "messages" | "payment" | "project";
  projecttype?: "Approved" | "Rejected" | "Pending";
  msgtype?: "all" | "unread";
  data: any;
};

const DashStatus = ({ type, projecttype, data, msgtype }: DashStatusProp) => {
  const { readmsgMutation } = useReadMessage();
  const mapdata = data;

  const router = useRouter();
  const handleMsgRead = (id: any) => {
    router.push(`/dashboard/messages/${id}`);
    readmsgMutation.mutate(id);
  };
  return (
    <>
      {type === "messages" && (
        <>
          {mapdata?.length > 0 ? (
            mapdata.map((msg: any) => {
              return (
                <div
                  key={msg?.messageId}
                  style={{ opacity: `${msg?.hasRead === false ? 1 : 0.5}` }}
                >
                  <div className="dash_status">
                    <MdOutlinePendingActions className="dash_statusicon" />

                    <div className="dash_statusdetail">
                      <h1
                        className="dash_statustitle"
                        onClick={() => handleMsgRead(msg?.messageId)}
                      >
                        {msg?.subject}
                      </h1>

                      <div className="dash_statusinfo">
                        <p className="dash_statusdata">
                          <CiCalendar />
                          <span>{formatDate(msg?.date)}</span>
                        </p>

                        <p className="dash_statusdata">
                          <PiUserLight />
                          <span>{msg?.sender?.username}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="dash_status">
              {" "}
              <div className="dash_statusdetail">
                <h1 className="dash_statustitle">
                  {msgtype === "unread"
                    ? "You have no unread messages"
                    : "Your messages are empty"}
                </h1>
              </div>
            </div>
          )}
        </>
      )}
      {type === "payment" && (
        <>
          {mapdata?.length > 0 ? (
            mapdata.map((data: any) => {
              return (
                <div key={data?.paymentId}>
                  <div className="dash_status">
                    <GrCurrency className="dash_statusicon" />

                    <div className="dash_statusdetail">
                      <h1
                        className="dash_statustitle"
                        onClick={() => {
                          router.push(`view/${data?.paymentId}`);
                        }}
                      >
                        Payment id:{data?.paymentId}hiisis
                      </h1>

                      <div className="dash_statusinfo">
                        <p className="dash_statusdata">
                          <MdOutlinePayments />
                          <span>
                            Plan :
                            {data?.user?.subscription?.currentUserPlan ||
                              "none"}
                          </span>
                        </p>

                        {data?.paymentStatus === "CONFIRMED-AND-SUBSCRIBED" && (
                          <p className="dash_statusdata">
                            <BiCategory />
                            <span>
                              Type :{" "}
                              {data?.user?.subscription?.subscriptionType ||
                                "none"}
                            </span>
                          </p>
                        )}

                        {data?.paymentStatus !== "CONFIRMED-AND-SUBSCRIBED" && (
                          <p className="dash_statusdata">
                            <CiCalendar />
                            <span>
                              {data?.paymentStatus} since:{" "}
                              {formatDate(data?.initializedAt)}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="dash_status">
              <div className="dash_statusdetail">
                <h1 className="dash_statustitle">
                  You have no payment messsage
                </h1>
              </div>
              <ArchBack variant="white" />
            </div>
          )}
        </>
        // <div className="dash_status">
        //   <GrCurrency className="dash_statusicon" />

        //   <div className="dash_statusdetail">
        //     <h1 className="dash_statustitle">Payment id:11222222222222</h1>

        //     <div className="dash_statusinfo">
        //       <p className="dash_statusdata">
        //         <MdOutlinePayments />
        //         <span>Plan : Basic</span>
        //       </p>
        //       <p className="dash_statusdata">
        //         <BiCategory />
        //         <span>Type : none</span>
        //       </p>
        //       <p className="dash_statusdata">
        //         <CiCalendar />
        //         <span>
        //           {formatDate(
        //             "Thu Dec 5 2024 21:50:26 GMT-00:00 (Coordinated Universal Time)"
        //           )}
        //         </span>
        //       </p>
        //     </div>
        //   </div>
        // </div>
      )}
      {type === "project" && (
        <>
          {mapdata?.length > 0 ? (
            mapdata.map((data: any) => {
              return (
                <div key={data?.projectId}>
                  <div className="dash_status">
                    {projecttype === "Approved" && (
                      <FaRegCheckCircle className="dash_statusicon" />
                    )}
                    {projecttype === "Rejected" && (
                      <GiCancel className="dash_statusicon" />
                    )}
                    {projecttype === "Pending" && (
                      <MdOutlinePendingActions className="dash_statusicon" />
                    )}

                    <div className="dash_statusdetail">
                      <h1
                        className="dash_statustitle"
                        onClick={() => {
                          router.push(`message/${data?.projectId}`);
                        }}
                      >
                        {data?.projectName}
                      </h1>

                      <div className="dash_statusinfo">
                        <p className="dash_statusdata">
                          <TbCategory />
                          <span>{data?.category || "none"}</span>
                        </p>
                        <p className="dash_statusdata">
                          <BiCategory />
                          <span>
                            {projecttype}{" "}
                            {projecttype === "Pending" ? "since" : "on"}{" "}
                            {formatDate(data?.updatedAt)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="dash_status">
              <div className="dash_statusdetail">
                <h1 className="dash_statustitle">
                  You have no {projecttype === "Approved" && "Approval"}
                  {projecttype === "Rejected" && "Rejection"}
                  {projecttype === "Pending" && "Pending"} messsage
                </h1>
              </div>
              <ArchBack variant="white" />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DashStatus;
