"use client";
import React from "react";
import Link from "next/link";
import { dashdata } from "@/data/dashboard.data";
import { useMessages } from "@/_hooks/useMessages";

const DashSidebar = () => {
  const { messages } = useMessages();
  const msgnotif = messages?.filter(
    (data: any) => data?.hasRead === false
  ).length;
  return (
    <nav className="dash_sidebar">
      <h1>Your links</h1>
      <ul className="dash_sidelinks">
        {dashdata.map((nav) => {
          return (
            <li key={nav.name}>
              <Link href={nav.route}>
                <nav.logo />
                <span>{nav.name}</span>
                {/* {nav.notif && (
                  <>
                    {nav.name === "Messages" && (
                      <span className="dash_sidenotif">
                        {nav.name === "Messages" && msgnotif}
                      </span>
                    )}
                  </>
                )} */}
                {nav.notif && nav.name === "Messages" && msgnotif > 0 && (
                  <span className="dash_sidenotif">{msgnotif}</span>
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
