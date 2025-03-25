import React from "react";
import { MdOutlinePendingActions } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { PiUserLight } from "react-icons/pi";
import { formatDate } from "@/_utils/formatdate";
import { FaRegCircleCheck } from "react-icons/fa6";
import { GrCurrency } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";

type DashStatusProp = {
  type: "messages" | "payment" | "project";
};
const DashStatus = ({ type }: DashStatusProp) => {
  return (
    <>
      {type === "messages" && (
        <div className="dash_status">
          <MdOutlinePendingActions className="dash_statusicon" />

          <div className="dash_statusdetail">
            <h1 className="dash_statustitle">Project approveds</h1>

            <div className="dash_statusinfo">
              <p className="dash_statusdata">
                <CiCalendar />
                <span>
                  {formatDate(
                    "Thu Dec 5 2024 21:50:26 GMT-00:00 (Coordinated Universal Time)"
                  )}
                </span>
              </p>

              <p className="dash_statusdata">
                <PiUserLight />
                <span>cache</span>
              </p>
            </div>
          </div>
        </div>
      )}
      {type === "payment" && (
        <div className="dash_status">
          <GrCurrency className="dash_statusicon" />

          <div className="dash_statusdetail">
            <h1 className="dash_statustitle">Payment id:11222222222222</h1>

            <div className="dash_statusinfo">
              <p className="dash_statusdata">
                <MdOutlinePayments />
                <span>Plan : Basic</span>
              </p>
              <p className="dash_statusdata">
                <BiCategory />
                <span>Type : none</span>
              </p>
              <p className="dash_statusdata">
                <CiCalendar />
                <span>
                  {formatDate(
                    "Thu Dec 5 2024 21:50:26 GMT-00:00 (Coordinated Universal Time)"
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashStatus;
