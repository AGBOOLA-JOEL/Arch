"use client";
import React, { useState } from "react";
import Link from "next/link";
import { admindashdata } from "@/data/dashboard.data";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  const [isClicked, setIsClicked] = useState<string | null>(null);

  return (
    <nav className="dash_sidebar admin">
      <h1>Your links</h1>
      <ul className="dash_sidelinks">
        {admindashdata.map((nav) => {
          // Handle linkcolor as an array
          const navLinkColors = Array.isArray(nav.linkcolor)
            ? nav.linkcolor
            : [nav.linkcolor || ""];

          const isExactDashboard =
            pathname === "/admin" && nav.route === "/admin";
          const isSegmentMatch = navLinkColors.some((color) =>
            segments.includes(color)
          );
          const isActive = isExactDashboard || isSegmentMatch;

          const openClicked =
            navLinkColors.includes(isClicked || "") ||
            nav.children?.some((child) =>
              Array.isArray(child.linkcolor)
                ? child.linkcolor.includes(isClicked || "")
                : [child.linkcolor || ""].includes(isClicked || "")
            );

          return (
            <li key={nav.name} className="dash_sidelist">
              <Link
                href={nav.route || "#"}
                className={isActive ? "active" : ""}
                onClick={() => {
                  const primaryColor = navLinkColors[0];
                  setIsClicked((prev) =>
                    prev === primaryColor ? null : primaryColor
                  );
                }}
              >
                <nav.logo />
                <span>{nav.name}</span>
              </Link>

              {nav.children && openClicked && (
                <div className="dash_sidechild">
                  {nav.children.map((drop) => (
                    <Link href={drop.route || "#"} key={drop.name}>
                      {drop.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AdminSidebar;
