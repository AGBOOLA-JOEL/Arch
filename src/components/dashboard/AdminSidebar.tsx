"use client";
import React, { useState } from "react";
import Link from "next/link";
import { admindashdata, dashdata } from "@/data/dashboard.data";
import { usePathname } from "next/navigation";
import { useSelectedLayoutSegments } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();

  //   const [drop, setDrop] = useState(false);

  const [isClicked, setIsClicked] = useState<string | null>(null);

  return (
    <nav className="dash_sidebar admin">
      <h1>Your links</h1>
      <ul className="dash_sidelinks">
        {admindashdata.map((nav) => {
          const isExactDashboard =
            pathname === "/admin" && nav.route === "/admin";
          const isSegmentMatch = segments.includes(nav.linkcolor || "");
          const isActive = isExactDashboard || isSegmentMatch;

          const openClicked = isClicked === nav.linkcolor;
          return (
            <li key={nav.name} className="dash_sidelist">
              <Link
                href={nav.route || ""}
                className={isActive ? "active" : ""}
                onClick={() => {
                  setIsClicked((prev) =>
                    prev === nav.linkcolor ? null : nav.linkcolor || null
                  );
                }}
              >
                <nav.logo />
                <span>{nav.name}</span>

                {/* {nav.notif && nav.name === "Messages" && msgnotif > 0 && (
                  <span className="dash_sidenotif">{msgnotif}</span>
                )}

                {nav.notif &&
                  nav.name === "Payment history" &&
                  paynotif > 0 && (
                    <span className="dash_sidenotif">{paynotif}</span>
                  )}
                {nav.notif && nav.name === "Project status" && pronotif > 0 && (
                  <span className="dash_sidenotif">{pronotif}</span>
                )} */}
              </Link>

              {nav.children && (
                <>
                  {openClicked && (
                    <div className="dash_sidechild">
                      {nav.children?.map((drop) => {
                        return (
                          <Link href={drop.route} key={drop.name}>
                            {drop.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AdminSidebar;
