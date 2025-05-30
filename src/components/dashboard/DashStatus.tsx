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
import { usePathname, useRouter } from "next/navigation";
import ArchBack from "../general/ArchBack";
import { PiIdentificationBadgeBold } from "react-icons/pi";
import { FaClockRotateLeft } from "react-icons/fa6";
import { ImPriceTags } from "react-icons/im";
import { GrStatusInfo } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";

type DashStatusProp = {
  type:
    | "messages"
    | "payment"
    | "project"
    | "admin-report"
    | "admin-subscribe"
    | "admin-payment"
    | "admin-postreport";

  msgtype?: "all" | "unread";
  statustype?: "Approved" | "Rejected" | "Pending";
  data: any;
  refetch?: any;
};

const DashStatus = ({
  type,

  data,
  msgtype,
  statustype,
  refetch,
}: DashStatusProp) => {
  const { readmsgMutation } = useReadMessage(refetch);

  const mapdata = data;

  const router = useRouter();
  const pathname = usePathname();
  const pathsplit = pathname.split("/")[1];
  const handleMsgRead = (id: any) => {
    router.push(
      `${
        pathsplit === "admin" ? "/admin" : "/dashboard"
      }/messages/message/${id}`
    );
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
                  style={{ opacity: `${msg?.hasRead === false ? 0.5 : 1}` }}
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
              <ArchBack variant="white" />
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
                        Payment id:{data?.paymentId}
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
      )}
      {type === "project" && (
        <>
          {mapdata?.length > 0 ? (
            mapdata.map((data: any) => {
              return (
                <div key={data?.projectId}>
                  <div className="dash_status">
                    {statustype === "Approved" && (
                      <FaRegCheckCircle className="dash_statusicon" />
                    )}
                    {statustype === "Rejected" && (
                      <GiCancel className="dash_statusicon" />
                    )}
                    {statustype === "Pending" && (
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
                            {statustype}{" "}
                            {statustype === "Pending" ? "since" : "on"}{" "}
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
                  You have no {statustype === "Approved" && "Approval"}
                  {statustype === "Rejected" && "Rejection"}
                  {statustype === "Pending" && "Pending"} messsage
                </h1>
              </div>
              <ArchBack variant="white" />
            </div>
          )}
        </>
      )}

      {type === "admin-report" && (
        <>
          {mapdata?.length > 0 ? (
            mapdata.map((msg: any) => {
              return (
                <div
                  key={msg?.reportId}
                  // style={{ opacity: `${msg?.hasRead === false ? 1 : 0.5}` }}
                >
                  <div className="dash_status">
                    <MdOutlinePendingActions className="dash_statusicon" />

                    <div className="dash_statusdetail">
                      <h1
                        className="dash_statustitle"
                        onClick={() => {
                          router.push(`report/${msg?.reportId}`);
                        }}
                        // onClick={() => handleMsgRead(msg?.messageId)}
                      >
                        {msg?.userEmail}
                      </h1>

                      <div className="dash_statusinfo">
                        <p className="dash_statusdata">
                          <CiCalendar />
                          <span>{formatDate(msg?.receivedAt)}</span>
                        </p>

                        <p className="dash_statusdata">
                          <BiCategory />
                          <span>{msg?.category}</span>
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
                  No report available
                  {msgtype === "unread"
                    ? "You have no unread messages"
                    : "Your messages are empty"}
                </h1>
              </div>
            </div>
          )}
        </>
      )}

      {type === "admin-subscribe" && (
        <>
          {mapdata?.length > 0 ? (
            mapdata.map((sub: any) => {
              return (
                <div
                  key={sub?.subscriptionId}
                  // style={{ opacity: `${msg?.hasRead === false ? 1 : 0.5}` }}
                >
                  <div className="dash_status">
                    <MdOutlinePendingActions className="dash_statusicon" />

                    <div className="dash_statusdetail">
                      <h1
                        className="dash_statustitle"
                        onClick={() => {
                          router.push(`subscription/${sub?.subscriptionId}`);
                        }}
                      >
                        {sub?.user?.username}
                      </h1>

                      <div className="dash_statusinfo">
                        <p className="dash_statusdata">
                          <CiCalendar />
                          <span>{formatDate(sub?.startDate)}</span>
                        </p>

                        <p className="dash_statusdata">
                          <FaClockRotateLeft />
                          <span>{sub?.type || "none"}</span>
                        </p>
                        <p className="dash_statusdata">
                          <ImPriceTags />
                          <span>{sub?.userPlan || "none"}</span>
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
                <h1 className="dash_statustitle">No subscription available</h1>
              </div>
            </div>
          )}
        </>
      )}

      {type === "admin-payment" && (
        <>
          {mapdata?.length > 0 ? (
            mapdata.map((pay: any) => {
              return (
                <div key={pay?.paymentReference}>
                  <div className="dash_status">
                    {statustype === "Rejected" ? (
                      <MdOutlineCancel className="dash_statusicon" />
                    ) : (
                      <MdOutlinePendingActions className="dash_statusicon" />
                    )}

                    <div className="dash_statusdetail">
                      <h1
                        className="dash_statustitle"
                        onClick={() => {
                          router.push(`view/${pay?.paymentReference}`);
                        }}
                      >
                        {pay?.user?.username}
                      </h1>

                      <div className="dash_statusinfo">
                        <p className="dash_statusdata">
                          <CiCalendar />
                          <span>{formatDate(pay?.initializedAt)}</span>
                        </p>
                        <p className="dash_statusdata">
                          <ImPriceTags />
                          <span>
                            {pay?.user?.subscription?.currentUserPlan || "none"}
                          </span>
                        </p>

                        <p className="dash_statusdata">
                          <GrStatusInfo />
                          <span>{pay?.paymentStatus || "none"}</span>
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
                  You have no payment messsage
                </h1>
              </div>
            </div>
          )}
        </>
      )}
      {type === "admin-postreport" && (
        <>
          {mapdata?.length > 0 ? (
            mapdata.map((rep: any) => {
              return (
                <div
                  key={rep?.reportId}
                  // style={{ opacity: `${msg?.hasRead === false ? 1 : 0.5}` }}
                >
                  <div className="dash_status">
                    <MdOutlinePendingActions className="dash_statusicon" />

                    <div className="dash_statusdetail">
                      <h1
                        className="dash_statustitle"
                        onClick={() => {
                          router.push(`reports/${rep?.reportId}`);
                        }}
                        // onClick={() => handleMsgRead(msg?.messageId)}
                      >
                        {rep?.categories}
                      </h1>

                      <div className="dash_statusinfo">
                        <p className="dash_statusdata">
                          <CiCalendar />
                          <span>{formatDate(rep?.news?.date)}</span>
                        </p>

                        <p className="dash_statusdata">
                          <BiCategory />
                          <span>{rep?.status}</span>
                        </p>

                        <p className="dash_statusdata">
                          <BiCategory />
                          <span>{rep?.typeOfPost}</span>
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
                <h1 className="dash_statustitle">No report available</h1>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DashStatus;
