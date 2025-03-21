"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type DashNavProp = {
  data: { name: string; route: string; linkstate: string | undefined }[];
};
const DashNavbar = ({ data }: DashNavProp) => {
  const pathname = usePathname();

  const linkState = (name: any) => {
    return pathname.split("/")[3] === name ? "active" : "";
  };
  return (
    <nav className="dash_navbar">
      <ul className="dash_navbarmap">
        {data.map((data) => (
          <li key={data.name} className={linkState(data.linkstate)}>
            <Link href={data.route}>{data.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DashNavbar;
