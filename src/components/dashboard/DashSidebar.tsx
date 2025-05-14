"use client";
import React from "react";
import Link from "next/link";
import { dashdata } from "@/data/dashboard.data";
import { useMessages } from "@/_hooks/useMessages";
import { usePaymentStatus } from "@/_hooks/usePayment";
import { useProjectStatus } from "@/_hooks/useProjectStatus";
import { useUser } from "@/_hooks/useUser";
import { usePathname } from "next/navigation";
import { useSelectedLayoutSegments } from "next/navigation";

const DashSidebar = () => {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  const { messages } = useMessages();
  const msgnotif = messages?.filter(
    (data: any) => data?.hasRead === false
  ).length;

  const { paystatus } = usePaymentStatus();

  const paynotif =
    paystatus?.filter(
      (data: any) =>
        data?.paymentStatus === "PENDING" ||
        data?.paymentStatus === "UNDER-REVIEW"
    ).length || [];

  const { prostatus } = useProjectStatus();
  const { user } = useUser();

  const pronotif =
    prostatus
      ?.filter((data: any) => data?.user?.user === user?.username)
      .filter((data: any) => data?.status === "PENDING").length || [];

  return (
    <nav className="dash_sidebar">
      <h1>Your links</h1>
      <ul className="dash_sidelinks">
        {dashdata.map((nav) => {
          const isExactDashboard =
            pathname === "/dashboard" && nav.route === "/dashboard";
          const isSegmentMatch = segments.includes(nav.linkcolor || "");
          const isActive = isExactDashboard || isSegmentMatch;
          return (
            <li key={nav.name} className="dash_sidelist">
              <Link href={nav.route} className={isActive ? "active" : ""}>
                <nav.logo />
                <span>{nav.name}</span>

                {nav.notif && nav.name === "Messages" && msgnotif > 0 && (
                  <span className="dash_sidenotif">{msgnotif}</span>
                )}

                {nav.notif &&
                  nav.name === "Payment history" &&
                  paynotif > 0 && (
                    <span className="dash_sidenotif">{paynotif}</span>
                  )}
                {nav.notif && nav.name === "Project status" && pronotif > 0 && (
                  <span className="dash_sidenotif">{pronotif}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DashSidebar;
